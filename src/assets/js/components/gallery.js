//import { enableGalleryThumbnailClick } from './thumbnail.js';

document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.getElementById('carouselExample');
  
  // Habilitar clic en miniaturas
  //enableGalleryThumbnailClick(carousel);
});

// Configura las imágenes en la galería superpuesta y en la cuadrícula
export function setupGallery(images, carouselInner, carouselIndicators, galleryOverlay, galleryGrid) {
  // Validaciones iniciales
  if (!images || images.length === 0) {
    console.warn('No se proporcionaron imágenes para configurar la galería.');
    return;
  }

  if (!carouselInner || !carouselIndicators || !galleryOverlay || !galleryGrid) {
    console.error('Uno o más contenedores de la galería no están disponibles en el DOM.');
    return;
  }

  images.forEach((src, index) => {
    // Configuración de indicadores del carrusel
    const indicator = document.createElement('button');
    indicator.type = 'button';
    indicator.dataset.bsTarget = '#carouselExample';
    indicator.dataset.bsSlideTo = index;
    if (index === 0) indicator.classList.add('active');
    carouselIndicators.appendChild(indicator);

    // Configuración de elementos del carrusel
    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');
    if (index === 0) carouselItem.classList.add('active');

    const img = document.createElement('img');
    img.src = src;
    img.alt = `Imagen ${index + 1}`;
    img.classList.add('d-block', 'w-100');
    img.loading = 'lazy'; // Lazy loading
    carouselItem.appendChild(img);
    carouselInner.appendChild(carouselItem);

    // Configuración de la galería superpuesta
    const overlayImg = document.createElement('img');
    overlayImg.src = src;
    overlayImg.alt = `Miniatura ${index + 1}`;
    overlayImg.classList.add('gallery-item');
    overlayImg.loading = 'lazy'; // Lazy loading
    galleryOverlay.appendChild(overlayImg);

    // Configuración de la galería en cuadrícula
    const gridImg = document.createElement('img');
    gridImg.src = src;
    gridImg.alt = `Miniatura ${index + 1}`;
    gridImg.loading = 'lazy';
    galleryGrid.appendChild(gridImg);
  });

  console.log('Galería configurada correctamente.');
}
