import { initCarousel } from './components/carousel.js';
import { setupGallery } from './components/gallery.js';
import { updateActiveThumbnail } from './components/thumbnail.js';
import { preloadImages } from './utilities/preload.js';
import { populateAccordion } from './utilities/jsonProcessor.js';

// Función principal para inicializar la aplicación
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Inicializa tooltips de Bootstrap
    const tooltipElements = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipElements.forEach((el) => new bootstrap.Tooltip(el));

    // Verifica si el contenedor principal existe
    const mainContainer = document.querySelector('.main-container');
    if (!mainContainer) throw new Error('El elemento .main-container no se encuentra en el DOM.');

    const imagePath = mainContainer.dataset.imagePath;
    const jsonPath = document.getElementById('accordionContainer')?.dataset.json;

    // Configuración de imágenes dinámicas
    if (imagePath) await setupDynamicImages(imagePath);

    // Configuración de la galería
    setupGalleryTab();

    // Configuración del acordeón (si aplica)
    if (jsonPath) await setupAccordion(jsonPath);
  } catch (error) {
    console.error('Error inicializando la página:', error);
    alert('Error al inicializar la página: ' + error.message);
  }
});

// Carga y configuración dinámica de imágenes
async function setupDynamicImages(imagePath) {
  try {
    // Solicita las imágenes al servidor
    const images = await fetch(imagePath).then(res => res.json());

    // Pre-carga las imágenes (opcional)
    preloadImages(images);

    // Identifica los contenedores del DOM
    const carouselInner = document.getElementById('carousel-inner');
    const carouselIndicators = document.getElementById('carousel-indicators');
    const galleryOverlay = document.getElementById('galleryOverlay');
    const galleryGrid = document.getElementById('galleryGrid');

    // Configura la galería con las imágenes
    setupGallery(images, carouselInner, carouselIndicators, galleryOverlay, galleryGrid);

    console.log('Imágenes dinámicas configuradas correctamente.');
  } catch (error) {
    console.error('Error al configurar imágenes dinámicas:', error);
  }
}

// Configuración de la pestaña Galería
function setupGalleryTab() {
  const galleryTab = document.querySelector('#galeria-tab');
  const carousel = document.getElementById('carouselExample');

  if (galleryTab && carousel) {
    galleryTab.addEventListener('click', () => {
      initCarousel(carousel, updateActiveThumbnail);
    });
  }
}

// Configuración del acordeón
async function setupAccordion(jsonPath) {
  try {
    // Solicita datos JSON
    const data = await fetch(jsonPath).then(res => res.json());

    // Identifica el contenedor del acordeón
    const accordionContainer = document.getElementById('accordionContainer');
    if (!accordionContainer) {
      console.warn('El contenedor del acordeón no se encontró en el DOM.');
      return;
    }

    // Pobla el acordeón con los datos
    populateAccordion(data, accordionContainer);
    console.log('Acordeón configurado correctamente.');
  } catch (error) {
    console.error('Error al configurar el acordeón:', error);
  }
}
