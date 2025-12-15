# Abre el `index.html` del frontend en el navegador por defecto
$frontendFile = Join-Path $PSScriptRoot 'frontend\index.html'
if (Test-Path $frontendFile) {
  Write-Output "Abriendo frontend: $frontendFile"
  Start-Process $frontendFile
} else {
  Write-Error "No se encontró 'frontend/index.html' en: $frontendFile"
}
