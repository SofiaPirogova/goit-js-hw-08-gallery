import images from './gallery-items.js';
const ulGalleryEl = document.querySelector('.js-gallery');

const addNewImages = getNewImages(images);

// подключаем разметку в наш список
ulGalleryEl.insertAdjacentHTML('afterbegin', addNewImages);

// функция добавления картинок из внешнего файла
function getNewImages(images) {
    return images.map(image => {
        const { preview, original, description } = images;
     
        return `<li class="gallery__item">
  <a class="gallery__link" href=${original}>
    <img
      class="gallery__image"
      src=${preview}
      data-source=${original}
      alt=${description}
    />
  </a>
</li>`

    }).join('');
}