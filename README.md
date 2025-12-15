# Proyecto: Cartas del Personaje

Estructura creada:
- `backend/` : servidor Express (JavaScript)
  - `index.js` : servidor y API `/api/cards`
- `frontend/` : archivos estáticos (HTML/CSS/JS)
  - `index.html`, `styles.css`, `app.js`
  - `assets/images/` : carpeta para tus fotos locales

Cómo instalar dependencias (en Windows PowerShell):

```powershell
cd 'C:\Home\Doro\backend'; npm init -y; npm install express cors
```

Cómo ejecutar el servidor (desde `backend`):

```powershell
node index.js
```

Luego abre en el navegador `http://localhost:3000/`.

Decoración: la plantilla CSS usa neumorphism y efectos de "liquid glass" (backdrop-filter). Ajusta `styles.css` a tu gusto.

Agrega imágenes en `frontend/assets/images` con los nombres indicados en `backend/index.js` o actualiza las rutas en ese archivo.
