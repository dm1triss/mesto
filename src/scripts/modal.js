import { clearValidation, validationConfig } from './validation.js'; 

export function openPopup(popup) { 
  popup.classList.add('popup_is-opened'); 
  popup.classList.add('popup_is-animated');

  document.addEventListener('keydown', handleEscapeKey); 
  popup.addEventListener('mousedown', handleOverlayClick); 
} 
 
export function closePopup(popup) { 
  popup.classList.remove('popup_is-opened'); 
  resetPopupForm(popup);
  clearValidation(popup, validationConfig);
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

export function handleLikeClick(event) { 
  event.target.classList.toggle("card__like-button_is-active"); 
}

function handleOverlayClick(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.currentTarget);
  }
}

export function resetPopupForm(popup) {
  const form = popup.querySelector('.popup__form');
  if (form) {
    clearValidation(form, validationConfig);
    form.reset();
  }
}
