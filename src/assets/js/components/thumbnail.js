export function updateActiveThumbnail(activeIndex) { 
  const galleryItems = document.querySelectorAll('.gallery-overlay img');

  // Verifica si hay imágenes en el contenedor
  if (!galleryItems || galleryItems.length === 0) {
    console.warn('No se encontraron imágenes en .gallery-overlay.');
    return;
  }

  if (activeIndex < 0 || activeIndex >= galleryItems.length) {
    console.error(`Índice fuera de rango: ${activeIndex}`);
    return;
  }

  console.log('galleryItems:', galleryItems);

  // Itera sobre las imágenes y actualiza la clase "active"
  galleryItems.forEach((item, index) => {
    if (index === activeIndex) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  console.log(`Miniatura activa actualizada al índice: ${activeIndex}`);
}


export function enableGalleryThumbnailClick(carouselId) {
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (galleryItems.length === 0) {
    console.warn('No se encontraron elementos de la galería.');
    return;
  }

  const carousel = document.getElementById(carouselId);

  if (!carousel) {
    console.error(`El carrusel con ID "${carouselId}" no está presente en el DOM.`);
    return;
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      try {
        const bootstrapCarousel = bootstrap.Carousel.getOrCreateInstance(carousel);

        if (bootstrapCarousel) {
          bootstrapCarousel.to(index);
        } else {
          console.error('No se pudo obtener la instancia del carrusel.');
        }
      } catch (error) {
        console.error('Error al interactuar con el carrusel:', error);
      }
    });
  });
}
