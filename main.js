import images from './gallery-items.js';
const ulGalleryEl = document.querySelector('.js-gallery');

const addNewImages = getNewImages(images);

let currentImageForSwipe;

// подключаем разметку в наш список
ulGalleryEl.insertAdjacentHTML('afterbegin', addNewImages);

// функция добавления картинок из внешнего файла
function getNewImages(images) {
  return images.map(image => {
    const { preview, original, description } = image;

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
};
// работа с модальным окном
const modalEl = document.querySelector('.js-lightbox');
const currentImg = document.querySelector(".lightbox__image");
const buttonCloseEl = document.querySelector('[data-action="close-lightbox"]');
// это событие на нажатие на картинку
ulGalleryEl.addEventListener('click', onClickImages);

// это событие на нажатие на кнопку закрытия
buttonCloseEl.addEventListener('click', closeModal);

// закрытие по оверлею
modalEl.addEventListener('click', onListenOverlay);

function onClickImages(e) {
  e.preventDefault();
  if (!e.target.classList.contains('gallery__image')) return;
  const nowImage = e.target;
  const newImage = nowImage.dataset.source;
// записываем в див картинку новые альт и срс, берем их статически альт с картинки, на которую был клик
  // и срси берем из новой картинки, которой присваем дата соурс с картинки клика
  currentImg.src = newImage; 
  currentImg.alt = nowImage.alt;
  openModal();

// для свайпов вправо влево, необходима новая переменная,можно использовать потому что глобально череp let
  currentImageForSwipe = nowImage;
};

function openModal() {
  modalEl.classList.add('is-open');
};

function closeModal() {
  modalEl.classList.remove('is-open');
   currentImg.src = "";
};

function onListenOverlay(e) {
  if (!e.target.classList.contains('lightbox__overlay')) return;
  closeModal();
};

// выход по эскейпу
window.addEventListener('keydown', onEscapeModal);

function onEscapeModal(e) {
  if (e.code === 'Escape') {
    closeModal();
  };
};


// перелистывание модалки

window.addEventListener('keydown', onRightButton);
window.addEventListener('keydown', onLeftButton);

const imagesForSwipe = document.querySelectorAll('.gallery__image');


function getIndexOfImage(arr) {
  return [...arr].indexOf(currentImageForSwipe);
};

function onRightButton(e) {
    console.log(e.code);
  if (e.code === 'ArrowRight') {
    let indexOfMassive = getIndexOfImage(imagesForSwipe);
    
    if (indexOfMassive + 1 > imagesForSwipe.length - 1 ) {
      currentImageForSwipe = imagesForSwipe[0];
    } else {
      currentImageForSwipe = imagesForSwipe[indexOfMassive + 1];
    };
    currentImg.src = currentImageForSwipe.dataset.source;
    currentImg.alt = currentImageForSwipe.alt;
  };

};

function  onLeftButton (e) {
  if (e.code === 'ArrowLeft') {
   let indexOfMassive = getIndexOfImage(imagesForSwipe);
    
    if (indexOfMassive - 1 < 0) {
      currentImageForSwipe = imagesForSwipe[imagesForSwipe.length - 1];
    } else {
      currentImageForSwipe = imagesForSwipe[indexOfMassive - 1];
    };
    currentImg.src = currentImageForSwipe.dataset.source;
    currentImg.alt = currentImageForSwipe.alt;
  };

};