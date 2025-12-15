#!/usr/bin/env node

/**
 * Script de verificación para deployment en Render
 * Verifica que todos los archivos necesarios estén presentes
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando estructura del proyecto para Render...\n');

const checks = {
  passed: [],
  failed: []
};

// Verificar archivos críticos
const criticalFiles = [
  'backend/index.js',
  'backend/package.json',
  'frontend/portal.html',
  'frontend/loading.html',
  'frontend/app.js',
  'frontend/styles.css',
  'render.yaml'
];

criticalFiles.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    checks.passed.push(`✅ ${file}`);
  } else {
    checks.failed.push(`❌ ${file} - NO ENCONTRADO`);
  }
});

// Verificar carpeta de imágenes
const imagesDir = path.join(__dirname, 'frontend', 'assets', 'images');
if (fs.existsSync(imagesDir)) {
  const images = fs.readdirSync(imagesDir).filter(f => /\.(png|jpe?g|gif|webp)$/i.test(f));
  checks.passed.push(`✅ Carpeta de imágenes (${images.length} archivos)`);
  
  if (images.length === 0) {
    checks.failed.push('⚠️  No hay imágenes en assets/images');
  }
} else {
  checks.failed.push('❌ Carpeta assets/images - NO ENCONTRADA');
}

// Verificar package.json
const packagePath = path.join(__dirname, 'backend', 'package.json');
if (fs.existsSync(packagePath)) {
  const pkg = require(packagePath);
  if (pkg.dependencies && pkg.dependencies.express && pkg.dependencies.cors) {
    checks.passed.push('✅ Dependencias (express, cors)');
  } else {
    checks.failed.push('❌ Faltan dependencias en package.json');
  }
}

// Mostrar resultados
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
console.log('📋 RESULTADOS:\n');

if (checks.passed.length > 0) {
  console.log('✅ Verificaciones exitosas:\n');
  checks.passed.forEach(msg => console.log(`   ${msg}`));
  console.log('');
}

if (checks.failed.length > 0) {
  console.log('❌ Problemas encontrados:\n');
  checks.failed.forEach(msg => console.log(`   ${msg}`));
  console.log('');
}

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

if (checks.failed.length === 0) {
  console.log('🎉 ¡Todo listo para desplegar en Render!\n');
  console.log('Pasos siguientes:');
  console.log('1. git add .');
  console.log('2. git commit -m "Preparar para deployment"');
  console.log('3. git push origin master');
  console.log('4. Ir a render.com y crear nuevo Blueprint\n');
  process.exit(0);
} else {
  console.log('⚠️  Hay problemas que deben ser resueltos antes del deployment.\n');
  process.exit(1);
}
