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
  let isInteracting = false;
  let startX = 0;
  let startY = 0;
  let currentRotationX = 0;
  let currentRotationY = 0;
  let targetRotationX = 0;
  let targetRotationY = 0;
  let animationFrameId = null;

  // Función para obtener coordenadas (mouse o touch)
  const getCoordinates = (e) => {
    if (e.touches && e.touches[0]) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
  };

  // Función de animación suave usando requestAnimationFrame
  const animate = () => {
    // Interpolación suave (lerp) para movimiento fluido
    currentRotationX += (targetRotationX - currentRotationX) * 0.15;
    currentRotationY += (targetRotationY - currentRotationY) * 0.15;

    modalBody.style.transform = `translate3d(0, 0, 0) rotateX(${currentRotationX}deg) rotateY(${currentRotationY}deg)`;

    if (isInteracting || Math.abs(targetRotationX - currentRotationX) > 0.01 || Math.abs(targetRotationY - currentRotationY) > 0.01) {
      animationFrameId = requestAnimationFrame(animate);
    }
  };

  const onInteractionStart = (e) => {
    e.preventDefault();
    isInteracting = true;
    const coords = getCoordinates(e);
    startX = coords.x;
    startY = coords.y;
    modalBody.classList.add('dragging');
    
    // Iniciar animación
    if (!animationFrameId) {
      animationFrameId = requestAnimationFrame(animate);
    }
  };

  const onInteractionMove = (e) => {
    if (!isInteracting) return;
    e.preventDefault();

    const coords = getCoordinates(e);
    const deltaX = coords.x - startX;
    const deltaY = coords.y - startY;

    targetRotationY += deltaX * 0.5;
    targetRotationX -= deltaY * 0.5;

    // Limitar rotación X
    targetRotationX = Math.max(-30, Math.min(30, targetRotationX));

    startX = coords.x;
    startY = coords.y;
  };

  const onInteractionEnd = () => {
    isInteracting = false;
    modalBody.classList.remove('dragging');
  };

  // close handlers
  const close = () => {
    modal.setAttribute('aria-hidden', 'true');
    currentRotationX = 0;
    currentRotationY = 0;
    targetRotationX = 0;
    targetRotationY = 0;
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
    modalBody.style.transform = 'translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg)';
    
    // Remover eventos de mouse
    modalBody.removeEventListener('mousedown', onInteractionStart);
    document.removeEventListener('mousemove', onInteractionMove);
    document.removeEventListener('mouseup', onInteractionEnd);
    
    // Remover eventos táctiles
    modalBody.removeEventListener('touchstart', onInteractionStart);
    modalBody.removeEventListener('touchmove', onInteractionMove);
    modalBody.removeEventListener('touchend', onInteractionEnd);
    
    document.getElementById('modal-close').removeEventListener('click', close);
    document.getElementById('modal-backdrop').removeEventListener('click', close);
  };

  // Eventos de mouse (desktop)
  modalBody.addEventListener('mousedown', onInteractionStart);
  document.addEventListener('mousemove', onInteractionMove);
  document.addEventListener('mouseup', onInteractionEnd);
  
  // Eventos táctiles (móvil)
  modalBody.addEventListener('touchstart', onInteractionStart, { passive: false });
  modalBody.addEventListener('touchmove', onInteractionMove, { passive: false });
  modalBody.addEventListener('touchend', onInteractionEnd);
  
  document.getElementById('modal-close').addEventListener('click', close);
  document.getElementById('modal-backdrop').addEventListener('click', close);
}

window.addEventListener('DOMContentLoaded', loadCards);
