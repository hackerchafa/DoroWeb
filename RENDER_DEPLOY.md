# Guía de Despliegue en Render - Proyecto Doro

## ⚙️ Configuración Requerida

### Start Command (IMPORTANTE)
```
cd backend && node index.js
```

### Build Command
```
cd backend && npm install
```

### Environment
- **Node**

### Settings Recomendados
- **Region**: Oregon (mejor para plan gratuito)
- **Instance Type**: Free
- **Auto-Deploy**: Yes (para deployment automático en git push)

## 🔍 Verificación Post-Deployment

1. **Espera a que el build complete** (2-5 minutos)
2. **Verifica los logs**:
   - Deberías ver: `🚀 Server listening on port XXXX`
   - Deberías ver: `📁 Serving static files from: ...`

3. **Prueba la URL**:
   - Render te dará una URL como: `https://doro-app.onrender.com`
   - Debería redirigir a `/loading` automáticamente
   - Después de 6 segundos, debería ir a `/portal`

4. **Verifica en el navegador**:
   - Abre DevTools (F12)
   - Ve a la pestaña Network
   - Verifica que todos los archivos se carguen (200 OK):
     - styles.css
     - app.js
     - assets/images/...

## ❗ Problemas Comunes y Soluciones

### Problema 1: "Application failed to respond"
**Solución**: Verifica que el start command sea exactamente:
```
cd backend && node index.js
```

### Problema 2: Página en blanco
**Causas posibles**:
- Los archivos CSS/JS no se cargan
- Errores en JavaScript

**Solución**:
1. Abre DevTools → Console
2. Busca errores en rojo
3. Verifica en Network tab si hay 404 errors

### Problema 3: Las cartas no aparecen
**Causas**:
- Las imágenes no están en el repositorio
- La API `/api/cards` no responde

**Solución**:
1. Verifica que `frontend/assets/images/` tenga las imágenes en Git
2. Prueba la URL: `https://tu-app.onrender.com/api/cards`
3. Deberías ver un JSON con las cartas

### Problema 4: Las animaciones no funcionan
**Causas**:
- CSS no se está cargando correctamente
- Problemas de compatibilidad del navegador

**Solución**:
1. Haz Ctrl+Shift+R para forzar recarga
2. Prueba en modo incógnito
3. Verifica que styles.css se cargue (DevTools → Network)

### Problema 5: La animación de entrada no se ve
**Causa**: No estás accediendo desde la ruta raíz

**Solución**:
- Accede a la URL base: `https://tu-app.onrender.com/`
- NO accedas directamente a `/portal`

## 🔄 Redespliegue

Si haces cambios en el código:

1. **Commit los cambios**:
   ```powershell
   git add .
   git commit -m "Descripción de cambios"
   git push origin master
   ```

2. **Render detectará los cambios automáticamente** y hará un nuevo deploy

3. **Espera 2-5 minutos** para que el nuevo deploy complete

## 📊 Monitoreo

1. **Logs en tiempo real**:
   - Ve a Render Dashboard → Tu servicio → "Logs"
   - Verás todas las requests y mensajes del servidor

2. **Métricas**:
   - Render Dashboard → Tu servicio → "Metrics"
   - CPU, memoria, requests por minuto

## 🆘 Si nada funciona

1. **Verifica el repositorio**:
   ```powershell
   node verify-deploy.js
   ```

2. **Comprueba que todo esté en Git**:
   ```powershell
   git status
   git log -1
   ```

3. **Verifica la estructura**:
   ```
   Doro/
   ├── backend/
   │   ├── index.js
   │   └── package.json
   ├── frontend/
   │   ├── portal.html
   │   ├── loading.html
   │   ├── app.js
   │   ├── styles.css
   │   └── assets/
   │       └── images/
   └── render.yaml
   ```

4. **Borra y recrea el servicio en Render**:
   - A veces la cache puede causar problemas
   - Borra el servicio y créalo de nuevo desde cero

## ✅ Checklist de Deployment

- [ ] Todos los archivos están en Git
- [ ] Las imágenes están en `frontend/assets/images/`
- [ ] `node verify-deploy.js` pasa todas las verificaciones
- [ ] Git está pusheado a GitHub
- [ ] Start command es: `cd backend && node index.js`
- [ ] Build command es: `cd backend && npm install`
- [ ] Auto-deploy está activado
- [ ] El build completa sin errores
- [ ] Los logs muestran "Server listening on port..."
- [ ] La URL funciona y muestra la pantalla de carga
- [ ] Las cartas aparecen después de la carga
- [ ] Las animaciones funcionan
