export function preloadImages(images) {
  return Promise.all(
    images.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;

        img.onload = () => resolve(src);
        img.onerror = () => reject(`Error al cargar la imagen: ${src}`);
      });
    })
  );
}
