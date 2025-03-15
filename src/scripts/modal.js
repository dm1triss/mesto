// Открытие попапа
export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscapeKey);
  popup.addEventListener('mousedown', handleOverlayClick);
}

// Закрытие попапа
export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscapeKey);
  popup.removeEventListener('mousedown', handleOverlayClick);
}
// Обработка нажатия Escape
function handleEscapeKey(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  }
}

// Обработка клика по оверлею
function handleOverlayClick(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.currentTarget);
  }
}