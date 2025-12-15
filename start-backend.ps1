# Inicia el backend (node index.js) en una nueva process
$backendPath = Join-Path $PSScriptRoot 'backend'
Write-Output "Iniciando backend en: $backendPath"
if (-not (Test-Path $backendPath)) {
  Write-Error "No se encontró la carpeta backend en: $backendPath"
  exit 1
}
Start-Process -FilePath 'node' -ArgumentList 'index.js' -WorkingDirectory $backendPath
Write-Output "Backend iniciado (proceso separado)."
