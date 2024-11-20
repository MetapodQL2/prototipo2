const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function optimizeImages(inputDir, outputDir) {
  if (!fs.existsSync(inputDir)) {
    throw new Error(`El directorio de entrada no existe: ${inputDir}`);
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const files = fs.readdirSync(inputDir).filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));

  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file);

    if (fs.existsSync(outputPath)) continue;

    console.log(`Optimizando: ${inputPath} -> ${outputPath}`);
    
    try {
      await sharp(inputPath)
        .resize(1920, 1080, { fit: 'inside' })
        .toFile(outputPath);
    } catch (err) {
      console.error(`Error optimizando ${file}: ${err.message}`);
      continue; // Saltar al siguiente archivo en caso de error
    }
  }
}

module.exports = { optimizeImages };
