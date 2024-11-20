const express = require('express');
const path = require('path');
const imageRoutes = require('./src/routes/routes.js');

const app = express();

// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views')); // Define el directorio de vistas

// Middleware para parsear JSON y datos codificados
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'src/assets')));
app.use('/assets', express.static(path.join(__dirname, 'src/assets')));
app.use('/optimized', express.static(path.join(__dirname, 'src/assets/images/optimized')));
app.use('/data', express.static(path.join(__dirname, 'src/data')));

console.log('Ruta de assets:', path.join(__dirname, 'src/assets'));
console.log('Ruta de imágenes optimizadas:', path.join(__dirname, 'src/assets/images/optimized'));

// Servir archivos de Bootstrap desde node_modules
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));


// Primero, define las rutas de la API
app.use('/api', imageRoutes); // Todas las rutas de API tendrán el prefijo "/api"

// Redirigir la raíz a la página inicial
app.get('/', (req, res) => {
  res.redirect('/page1'); // Página inicial
});

// Luego, define las rutas dinámicas para las páginas
// Rutas dinámicas para las páginas
app.get('/:page', (req, res) => {
  const page = req.params.page;
  const validPages = ['page1', 'page2', 'page3', 'page4', 'page5', 'page6', 'page7', 'page8'];

  if (!validPages.includes(page)) {
    return res.status(404).send('Error 404: La página que buscas no existe.');
  }

  res.render(page, {
    title: `Página ${page}`,
    content: `Bienvenido a la ${page}`,
  });
});

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).send('Error 404: La página que buscas no existe.');
});

// Manejo de errores generales
app.use((err, req, res, next) => {
  console.error(`Error en ${req.method} ${req.url}:`, err.message);
  console.error('Stack trace:', err.stack);

  res.status(500).send('Error interno del servidor. Intenta nuevamente más tarde.');
});


// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
