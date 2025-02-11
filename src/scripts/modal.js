export function openPopup(popup) {
  popup.classList.add('popup_is-animated');
  setTimeout(() => {
    popup.classList.add('popup_is-opened');
  }, 10);

  document.addEventListener('keydown', handleEscapeKey);
  popup.addEventListener('mousedown', handleOverlayClick);
}

export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  setTimeout(() => {
    popup.classList.remove('popup_is-animated');
  }, 300);

  document.removeEventListener('keydown', handleEscapeKey);
  popup.removeEventListener('mousedown', handleOverlayClick);
}

function handleEscapeKey(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

function handleOverlayClick(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.currentTarget);
  }
}