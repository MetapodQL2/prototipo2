// Configuración inicial del mapa
const map = L.map('map').setView([-53.15243436583237, -70.89831916909965], 14);

// Cargar tiles de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Leer archivo JSON
fetch('./puntos.json')
  .then(response => response.json())
  .then(data => {
    // Acceso a los puntos de destino desde el JSON
    const puntos = data.points;

    // Obtener ubicación actual del usuario
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const userLocation = [position.coords.latitude, position.coords.longitude];
        console.log('Ubicación actual:', userLocation);

        // Agregar marcador de ubicación actual
        L.marker(userLocation).addTo(map).bindPopup("Tu ubicación").openPopup();

        // Crear rutas hacia los puntos
        puntos.forEach(punto => {
          L.Routing.control({
            waypoints: [
              L.latLng(userLocation[0], userLocation[1]),
              L.latLng(punto.coordinates[0], punto.coordinates[1])
            ],
            routeWhileDragging: true,
            show: false
          }).addTo(map);

          enableGalleryThumbnailClick();

          // Agregar marcador en el destino
          L.marker(punto.coordinates).addTo(map).bindPopup(punto.name);
        });
      });
    } else {
      alert('La geolocalización no está habilitada en este navegador.');
    }
  })
  .catch(err => console.error('Error al cargar JSON:', err));
