// Exporta la función principal para rellenar el acordeón
export function populateAccordion(data, container) {
  container.innerHTML = ''; // Limpia cualquier contenido previo

  data.forEach((section, index) => {
    const isActive = index === 0 ? 'show' : ''; // Solo mostrar la primera sección por defecto

    // Construye los elementos principales del acordeón
    const accordionItem = `
      <div class="accordion-item">
        <h2 class="accordion-header" id="heading${index}">
          <button class="accordion-button ${isActive ? '' : 'collapsed'}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="${isActive ? 'true' : 'false'}" aria-controls="collapse${index}">
            ${section.title}
          </button>
        </h2>
        <div id="collapse${index}" class="accordion-collapse collapse ${isActive}" aria-labelledby="heading${index}" data-bs-parent="#accordionContainer">
          <div class="accordion-body">
            ${generateSectionContent(section.content)}
          </div>
        </div>
      </div>
    `;

    container.innerHTML += accordionItem;
  });
}

// Exporta también la función auxiliar para generar el contenido
export function generateSectionContent(contentArray) {
  return contentArray
    .map(item => {
      if (item.subtitle) {
        // Si hay subtítulo, lo muestra junto con la descripción
        return `
          <h5>${item.subtitle}</h5>
          <p>${item.description}</p>
        `;
      } else if (item.description) {
        // Si solo hay descripción, la muestra directamente
        return `<p>${item.description}</p>`;
      }
      return ''; // Maneja casos en los que no hay contenido válido
    })
    .join(''); // Junta todos los elementos en un solo string
}
