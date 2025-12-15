# Proyecto: Cartas del Personaje Doro 🎴

Una aplicación web interactiva que muestra cartas de personajes con efectos visuales modernos y animaciones.

## 📁 Estructura del Proyecto

```
Doro/
├── backend/           # Servidor Express (Node.js)
│   ├── index.js      # API y servidor
│   └── package.json  # Dependencias del backend
├── frontend/         # Archivos estáticos
│   ├── index.html    # Página de inicio
│   ├── loading.html  # Pantalla de carga
│   ├── portal.html   # Portal principal
│   ├── app.js        # Lógica del frontend
│   ├── styles.css    # Estilos (neumorphism + liquid glass)
│   └── assets/
│       └── images/   # Imágenes de las cartas
└── render.yaml       # Configuración para Render.com
```

## 🚀 Ejecución Local

### Instalar dependencias:
```powershell
cd backend
npm install
```

### Ejecutar el servidor:
```powershell
npm start
```

Abre tu navegador en `http://localhost:3000/`

## 🌐 Despliegue en Render

### Verificación Previa

Antes de desplegar, ejecuta el script de verificación:
```powershell
node verify-deploy.js
```

### Opción 1: Usando render.yaml (Recomendado)

1. **Sube tu proyecto a GitHub**
   ```powershell
   git add .
   git commit -m "Preparar para despliegue en Render"
   git push origin master
   ```

2. **Crea un nuevo proyecto en Render**
   - Ve a [Render.com](https://render.com)
   - Inicia sesión o crea una cuenta
   - Click en "New +" → "Blueprint"
   - Conecta tu repositorio de GitHub
   - Render detectará automáticamente el archivo `render.yaml`
   - Click en "Apply" para crear el servicio

3. **¡Listo!** Render desplegará tu aplicación automáticamente

### Opción 2: Configuración Manual

1. En Render, selecciona "New +" → "Web Service"
2. Conecta tu repositorio
3. Configura:
   - **Name**: doro-app (o el que prefieras)
   - **Environment**: Node
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && node index.js`
   - **Branch**: master (o main)
   - **Region**: Oregon (recomendado para plan gratuito)

4. Click en "Create Web Service"

### 🐛 Solución de Problemas Comunes

#### Las cartas no se ven o las animaciones no funcionan

1. **Verifica que los archivos estáticos se sirvan correctamente:**
   - Abre la consola del navegador (F12)
   - Revisa si hay errores 404 en archivos CSS/JS
   - Verifica que `styles.css` y `app.js` se carguen

2. **Revisa los logs en Render:**
   - Ve a tu servicio en Render Dashboard
   - Click en "Logs"
   - Busca errores de servidor

3. **Verifica las rutas de imágenes:**
   - Las imágenes deben estar en `frontend/assets/images/`
   - Las rutas en el código deben ser relativas: `/assets/images/nombre.jpg`

4. **Cache del navegador:**
   - Haz Ctrl+Shift+R para forzar recarga sin cache
   - O usa modo incógnito para probar

5. **Animación de entrada no se ve:**
   - Verifica que `/loading` redirija correctamente a `/portal`
   - Revisa que `loading.html` tenga el GIF de carga

#### Comando de Inicio Correcto

El start command debe ser exactamente:
```
cd backend && node index.js
```

**NO uses:**
- ❌ `npm start` (puede no funcionar si el environment no está configurado)
- ❌ `node backend/index.js` (el working directory debe ser backend/)

### Variables de Entorno (Opcionales)
- `PORT`: Render lo asigna automáticamente
- `NODE_ENV`: production

## 🎨 Características

- **Diseño Neumórfico**: Efectos de sombra y relieve modernos
- **Efecto Liquid Glass**: Uso de `backdrop-filter` para efectos de vidrio
- **Pantalla de Carga Animada**: Transición suave al portal
- **Cartas Dinámicas**: Generadas automáticamente desde las imágenes
- **Cartas Trampa**: Sistema de cartas especiales con efectos sorpresa
- **Responsive**: Adaptable a diferentes tamaños de pantalla

## 📝 Personalización

### Agregar nuevas imágenes:
1. Coloca las imágenes en `frontend/assets/images/`
2. Usa el formato: `doro1.png`, `doro2.jpg`, etc.
3. Para cartas trampa: `trampa_nombre.png`

### Modificar descripciones:
Edita el objeto `descriptions` en [backend/index.js](backend/index.js)

### Personalizar estilos:
Edita [frontend/styles.css](frontend/styles.css)

## 🛠️ Tecnologías

- **Backend**: Node.js + Express
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Hosting**: Render.com
- **Control de Versiones**: Git

## 📦 Dependencias

```json
{
  "express": "^5.1.0",
  "cors": "^2.8.5"
}
```

## 🔗 URLs del Proyecto

- **Local**: http://localhost:3000
- **Producción**: https://doro-app.onrender.com (después del despliegue)

## 📄 Licencia

ISC
