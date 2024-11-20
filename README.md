/project-root
├── /src
│   ├── /assets
│   │   ├── /css
│   │   │   ├── /components          # CSS específicos para componentes
│   │   │   │   ├── carousel.css     # Estilos para el carrusel
│   │   │   │   ├── gallery.css      # Estilos para la galería
│   │   │   │   ├── accordion.css    # Estilos para el acordeón
│   │   │   └── main.css             # Estilos generales usados en todas las plantillas
│   │   ├── /images
│   │   │   ├── /optimized           # Imágenes optimizadas para producción
│   │   │   │   ├── page1            # Imágenes específicas para Página 1
│   │   │   │   ├── page2            # Imágenes específicas para Página 2
│   │   │   │   ├── page3            # Imágenes específicas para Página 3
│   │   │   │   └── ...              # Hasta Página 8
│   │   │   ├── /originales          # Imágenes originales sin optimizar
│   │   │   │   ├── page1            # Imágenes específicas para Página 1
│   │   │   │   ├── page2            # Imágenes específicas para Página 2
│   │   │   │   ├── page3            # Imágenes específicas para Página 3
│   │   │   │   └── ...              # Hasta Página 8
│   │   ├── /js
│   │   │   ├── /components          # Scripts específicos para componentes
│   │   │   │   ├── carousel.js      # Lógica del carrusel
│   │   │   │   ├── gallery.js       # Lógica de la galería
│   │   │   │   ├── accordion.js     # Lógica del acordeón
│   │   │   ├── /utilities           # Utilidades reutilizables
│   │   │   │   ├── jsonProcessor.js # Procesamiento de JSON
│   │   │   │   ├── preload.js       # Función para pre-cargar imágenes
│   │   │   └── main.js              # Script principal usado en todas las plantillas
│   ├── /data
│   │   ├── /information             # Datos específicos de cada página
│   │   │   ├── page1.json           # Datos de la Página 1
│   │   │   ├── page2.json           # Datos de la Página 2
│   │   │   └── ...                  # Hasta Página 8
│   │   ├── /rutamiento              # Datos relacionados con rutas en mapas
│   │       └── puntos.json          # Coordenadas o puntos para rutas
│   ├── /routes  
│   │   └── routes.js                       
│   ├── /utils    
│   │   └── imageProcessor.js                   
│   ├── /views                       # Plantillas EJS para renderizar páginas
│   │   ├── page1.ejs                # Plantilla de Página 1
│   │   ├── page2.ejs                # Plantilla de Página 2
│   │   └── ...                      # Hasta Página 8
├── app.js                           # Archivo principal del servidor (Express)
├── webpack.config.js                # Configuración para Webpack
├── package.json                     # Dependencias y scripts del proyecto
└── README.md                        # Documentación del proyecto