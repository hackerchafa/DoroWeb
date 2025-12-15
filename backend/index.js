const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// Log de requests para debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Serve frontend static files con headers correctos
app.use(express.static(path.join(__dirname, '..', 'frontend'), {
  setHeaders: (res, filepath) => {
    if (filepath.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    } else if (filepath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));

// Serve assets con cache
app.use('/assets', express.static(path.join(__dirname, '..', 'frontend', 'assets'), {
  maxAge: '1d'
}));

// Ruta para la pantalla de carga
app.get('/loading', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'loading.html'));
});

// Ruta para la página principal del portal
app.get('/portal', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'portal.html'));
});

// Genera dinámicamente las cartas a partir de las imágenes en frontend/assets/images

function loadCardsFromImages(){
  const imagesDir = path.join(__dirname, '..', 'frontend', 'assets', 'images');
  let files = [];
  try{
    files = fs.readdirSync(imagesDir);
  }catch(err){
    console.warn('No se pudo leer la carpeta de imágenes:', imagesDir, err.message);
    files = [];
  }

  const imageFiles = files.filter(f => /\.(png|jpe?g|webp)$/i.test(f));

  // Base de descripciones por número
  const descriptions = {
    'doro1': 'Doro ama las naranjas y siempre lleva una consigo. Es un personaje alegre y aventurero.',
    'doro2': 'Una versión tranquila de Doro disfrutando de un momento de paz.',
    'doro3': 'Doro en su mejor forma, listo para cualquier aventura que se le presente.',
    'doro4': 'Un Doro juguetón mostrando su lado más divertido.',
    'doro5': 'Doro meditando bajo las estrellas, reflexionando sobre sus próximas aventuras.',
    'doro6': 'Doro rodeado de naturaleza, su lugar favorito para estar.',
  };

  const cards = imageFiles.map((file, idx) => {
    const name = path.parse(file).name;
    const isTrap = file.startsWith('trampa_');
    
    // Generar descripción basada en el nombre o usar default
    let desc = descriptions[name];
    if(!desc){
      if(isTrap){
        desc = `¡Cuidado! Esta es una carta trampa. Podría sorprenderte de formas inesperadas.`;
      } else {
        desc = `Una fascinante carta de Doro. Descubre sus secretos interactuando con ella.`;
      }
    }
    
    return {
      id: idx + 1,
      name: name,
      image: `/assets/images/${file}`,
      description: desc,
      trap: isTrap
    };
  });

  return cards;
}

app.get('/api/cards', (req, res) => {
  const cards = loadCardsFromImages();
  console.log(`Cargando ${cards.length} cartas`);
  res.json(cards);
});

// Ruta raíz (/) redirige a loading
app.get('/', (req, res) => {
  res.redirect('/loading');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server listening on port ${PORT}`);
  console.log(`📁 Serving static files from: ${path.join(__dirname, '..', 'frontend')}`);
  console.log(`🖼️  Images directory: ${path.join(__dirname, '..', 'frontend', 'assets', 'images')}`);
});
