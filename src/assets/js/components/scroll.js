// Controla la visibilidad de la galería en cuadrícula al hacer scroll
export function setupScrollHandler(galleryOverlay, galleryGridWrapper, galleryGrid) {
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      const galleryThreshold = window.innerHeight * 0.2;
  
      if (scrollPosition > galleryThreshold) {
        galleryOverlay.classList.add('hidden');
        galleryGrid.classList.add('active');
        galleryGridWrapper.classList.add('active');
      } else {
        galleryOverlay.classList.remove('hidden');
        galleryGrid.classList.remove('active');
        galleryGridWrapper.classList.remove('active');
      }
    });
  }
  