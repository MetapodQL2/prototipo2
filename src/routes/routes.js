const express = require('express');
const path = require('path');
const fs = require('fs');
const { optimizeImages } = require('../utils/imageProcessor.js'); // Función de optimización

const router = express.Router();

router.get('/images', async (req, res) => {
  const pageName = req.query.page;

  console.log(`Solicitud recibida para imágenes de la página: ${pageName}`);
  
  if (!pageName) {
    console.warn('Falta el parámetro "page".');
    return res.status(400).json({ error: 'El parámetro "page" es requerido' });
  }

  const originalDir = path.join(__dirname, `../assets/images/originales/${pageName}`);
  const optimizedDir = path.join(__dirname, `../assets/images/optimized/${pageName}`);

  try {
    // Paso 1: Validar directorio original
    if (!fs.existsSync(originalDir)) {
      console.warn(`El directorio ${originalDir} no existe.`);
      return res.status(404).json({ error: `No se encontraron imágenes originales para ${pageName}` });
    }
    console.log(`Directorio original encontrado: ${originalDir}`);
    
    // Paso 2: Crear directorio optimizado si no existe
    if (!fs.existsSync(optimizedDir)) {
      console.log(`El directorio optimizado ${optimizedDir} no existe. Creándolo...`);
      fs.mkdirSync(optimizedDir, { recursive: true });
      console.log(`Directorio optimizado creado: ${optimizedDir}`);
    }

    // Paso 3: Leer imágenes originales
    const originalFiles = fs.readdirSync(originalDir).filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));
    console.log(`Imágenes originales encontradas en ${originalDir}:`, originalFiles);

    if (originalFiles.length === 0) {
      console.warn(`No hay imágenes válidas en el directorio ${originalDir}.`);
      return res.status(404).json({ error: `No hay imágenes disponibles para ${pageName}` });
    }

    // Paso 4: Validar si las imágenes ya están optimizadas
    const optimizedFiles = fs.readdirSync(optimizedDir).filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));
    console.log(`Imágenes optimizadas encontradas en ${optimizedDir}:`, optimizedFiles);

    if (optimizedFiles.length < originalFiles.length) {
      console.log(`Optimizando imágenes para ${pageName}...`);
      try {
        await optimizeImages(originalDir, optimizedDir);
      } catch (optimizeError) {
        console.error('Error al optimizar las imágenes:', optimizeError.message);
        return res.status(500).json({ error: 'Error al optimizar las imágenes', details: optimizeError.message });
      }
    }

    // Paso 5: Retornar las rutas de las imágenes optimizadas
    const updatedFiles = fs.readdirSync(optimizedDir).filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));
    console.log(`Imágenes listas para enviar:`, updatedFiles);
    res.json(updatedFiles.map(file => `/assets/images/optimized/${pageName}/${file}`));
  } catch (error) {
    console.error('Error al procesar las imágenes:', error.stack);
    res.status(500).json({ error: 'Error al procesar las imágenes', details: error.message });
  }

});
module.exports = router;
