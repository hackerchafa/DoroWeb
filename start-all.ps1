# Inicia backend y abre la página en el navegador (usa el servidor del backend)
$scriptRoot = $PSScriptRoot
$backendPath = Join-Path $scriptRoot 'backend'

if (-not (Test-Path $backendPath)) {
  Write-Error "No se encontró la carpeta backend: $backendPath"
  exit 1
}

Write-Output "Iniciando backend..."
Start-Process -FilePath 'node' -ArgumentList 'index.js' -WorkingDirectory $backendPath

# Espera un poco para que el servidor arranque
Start-Sleep -Seconds 1

Write-Output "Abriendo navegador en http://localhost:3000/"
Start-Process 'http://localhost:3000/'

Write-Output "Listo. Usa 'start-backend.ps1' o 'start-frontend.ps1' individualmente si lo prefieres."
