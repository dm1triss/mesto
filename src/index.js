import './styles/index.css';
import { createCard, deleteCard } from './scripts/card.js';
import { initialCards } from './scripts/cards.js';
import { openPopup, closePopup } from './scripts/modal.js';

// DOM-элементы
const placesList = document.querySelector(".places__list");
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_new-card');
const editForm = document.forms['edit-profile'];
const addForm = document.forms['new-place'];
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

function handleLikeClick(event) {
  event.target.classList.toggle('card__like-button_is-active');
}
function openImagePopup(imageUrl, caption) {
  const imagePopup = document.querySelector('.popup_type_image');
  const popupImage = imagePopup.querySelector('.popup__image');
  const popupCaption = imagePopup.querySelector('.popup__caption');

  popupImage.src = imageUrl;
  popupImage.alt = caption;
  popupCaption.textContent = caption;

  openPopup(imagePopup);
}

editButton.addEventListener('click', () => {
  editForm.elements.name.value = profileTitle.textContent;
  editForm.elements.description.value = profileDescription.textContent;
  openPopup(editPopup);
});

addButton.addEventListener('click', () => {
  openPopup(addPopup);
});

editForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const nameInput = editForm.elements.name;
  const descriptionInput = editForm.elements.description;

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  closePopup(editPopup);
});

addForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const placeNameInput = addForm.elements['place-name'];
  const linkInput = addForm.elements.link;

  const newCard = {
    name: placeNameInput.value,
    link: linkInput.value,
  };

  const cardElement = createCard(newCard, handleLikeClick, deleteCard, openImagePopup);
  placesList.prepend(cardElement);

  addForm.reset();
  closePopup(addPopup);
});

document.querySelectorAll('.popup__close').forEach(button => {
  button.addEventListener('click', () => {
    const popup = button.closest('.popup');
    closePopup(popup);
  });
});

// Отображение начальных карточек
initialCards.forEach((fullCard) => {
  const cardElement = createCard(fullCard, handleLikeClick, deleteCard, openImagePopup);
  placesList.append(cardElement);
});