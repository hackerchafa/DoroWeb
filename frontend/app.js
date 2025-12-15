async function loadCards(){
  try{
    const res = await fetch('/api/cards');
    const allCards = await res.json();
    
    // Paginación: 12 cartas por página
    const cardsPerPage = 12;
    let currentPage = 1;
    const totalPages = Math.ceil(allCards.length / cardsPerPage);

    function renderCards(page){
      const start = (page - 1) * cardsPerPage;
      const end = start + cardsPerPage;
      const paginatedCards = allCards.slice(start, end);

      const container = document.getElementById('cards');
      container.innerHTML = '';
      
      paginatedCards.forEach(card => {
        const el = document.createElement('article');
        el.className = 'card';
        el.dataset.cardId = card.id;
        el.dataset.cardName = card.name;
        el.dataset.cardDesc = card.description;
        el.dataset.cardTrap = card.trap || false;
        el.innerHTML = `
          <img class="media" src="${card.image}" alt="${card.name}">
          <p class="desc">${card.description}</p>
        `;

        // click: abrir modal con animación 360
        el.addEventListener('click', (e) => {
          openCardModal(card);
        });
        container.appendChild(el);
      });

      // Actualizar info de página
      document.getElementById('page-info').textContent = `Página ${page} de ${totalPages}`;
      
      // Actualizar estado de botones
      document.getElementById('prev-btn').disabled = page === 1;
      document.getElementById('next-btn').disabled = page === totalPages;
    }

    // Event listeners para paginación
    document.getElementById('prev-btn').addEventListener('click', () => {
      if(currentPage > 1){
        currentPage--;
        renderCards(currentPage);
        window.scrollTo({top: 0, behavior: 'smooth'});
      }
    });

    document.getElementById('next-btn').addEventListener('click', () => {
      if(currentPage < totalPages){
        currentPage++;
        renderCards(currentPage);
        window.scrollTo({top: 0, behavior: 'smooth'});
      }
    });

    // Renderizar primera página
    renderCards(1);

  }catch(err){
    console.error('Error cargando cartas', err);
    document.getElementById('cards').textContent = 'No se pudieron cargar las cartas.';
  }
}

function openCardModal(card){
  const modal = document.getElementById('card-modal');
  const img = document.getElementById('modal-image');
  const modalBody = modal.querySelector('.modal-body');
  const name = document.getElementById('modal-name');
  const desc = document.getElementById('modal-desc');
  const trap = document.getElementById('modal-trap');

  img.src = card.image;
  img.alt = card.name || 'Carta';
  name.textContent = '';
  desc.textContent = card.description || 'Descripción próximamente...';
  trap.textContent = card.trap ? '⚠️ TRAMPA' : '';

  modal.setAttribute('aria-hidden', 'false');

  // Variables para rotación interactiva
  let isMouseDown = false;
  let startX = 0;
  let startY = 0;
  let currentRotationX = 0;
  let currentRotationY = 0;

  const onMouseDown = (e) => {
    isMouseDown = true;
    startX = e.clientX;
    startY = e.clientY;
    modalBody.classList.add('dragging');
  };

  const onMouseMove = (e) => {
    if (!isMouseDown) return;

    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;

    currentRotationY += deltaX * 0.5;
    currentRotationX -= deltaY * 0.5;

    // Limitar rotación X
    currentRotationX = Math.max(-30, Math.min(30, currentRotationX));

    modalBody.style.transform = `rotateX(${currentRotationX}deg) rotateY(${currentRotationY}deg)`;

    startX = e.clientX;
    startY = e.clientY;
  };

  const onMouseUp = () => {
    isMouseDown = false;
    modalBody.classList.remove('dragging');
  };

  // close handlers
  const close = () => {
    modal.setAttribute('aria-hidden', 'true');
    currentRotationX = 0;
    currentRotationY = 0;
    modalBody.style.transform = 'rotateX(0deg) rotateY(0deg)';
    modalBody.removeEventListener('mousedown', onMouseDown);
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    document.getElementById('modal-close').removeEventListener('click', close);
    document.getElementById('modal-backdrop').removeEventListener('click', close);
  };

  modalBody.addEventListener('mousedown', onMouseDown);
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
  document.getElementById('modal-close').addEventListener('click', close);
  document.getElementById('modal-backdrop').addEventListener('click', close);
}

window.addEventListener('DOMContentLoaded', loadCards);
