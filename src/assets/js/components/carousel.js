// Inicializa el carrusel
export function initCarousel(carousel, updateThumbnailCallback) {
    if (carousel) {
      const bootstrapCarousel = new bootstrap.Carousel(carousel, {
        interval: 5000, // Intervalo de 5 segundos
        ride: 'carousel',
      });
  
      // Vincula el evento de cambio de diapositiva con la actualización de miniaturas
      carousel.addEventListener('slide.bs.carousel', (event) => {
        if (typeof event.to !== 'undefined') {
          updateThumbnailCallback(event.to); // Actualiza la miniatura activa
        }
      });
    } else {
      console.error('El elemento del carrusel no se encuentra en el DOM.');
    }
  }
  