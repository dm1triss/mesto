import "./styles/index.css";
import { createCard, deleteCard } from "./scripts/card.js";
import { openPopup, closePopup,handleLikeClick } from "./scripts/modal.js";
import {enableValidation, clearValidation, validationConfig} from "./scripts/validation.js";
import { updateAvatar, updateUserProfile, addNewCard, getInitialCards, getInitialUser  } from "./scripts/api.js";

let userId;

// DOM-элементы
const placesList = document.querySelector(".places__list");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const editPopup = document.querySelector(".popup_type_edit");
const addPopup = document.querySelector(".popup_type_new-card");
const profileChangeAvatar = document.querySelector(".popup_type_change-avatar");
const profileImage = document.querySelector(".profile__image");
const editForm = document.forms["edit-profile"];
const addForm = document.forms["new-place"];
const avatarForm = document.forms["avatar"];
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const imagePopup = document.querySelector(".popup_type_image");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");
const popupClose = document.querySelectorAll(".popup__close")
const avatarInput = avatarForm.querySelector('input[name="link"]');
const editInput = editForm.elements.name;
const addInput = addForm.elements.name;
const linkInput = addForm.elements.link;
const descriptionInput = editForm.elements.description;

function openImagePopup(imageUrl, caption) {
  popupImage.src = imageUrl;
  popupImage.alt = caption;
  popupCaption.textContent = caption;
  openPopup(imagePopup);
}

editButton.addEventListener("click", () => {
  editForm.elements.name.value = profileTitle.textContent;
  editForm.elements.description.value = profileDescription.textContent;
  openPopup(editPopup);
});

addButton.addEventListener("click", () => {
  openPopup(addPopup);
});

editForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const saveButton = editForm.querySelector(".popup__button"); 

  saveButton.textContent = "Сохранение...";
  saveButton.disabled = true;

  updateUserProfile(editInput.value, descriptionInput.value)
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
      closePopup(editPopup);
      clearValidation(editForm, validationConfig);
    })
    .catch((err) => {
      console.error("Ошибка обновления профиля:", err);
      alert("Ошибка при обновлении профиля!");
    })
    .finally(() => {
      saveButton.textContent = "Сохранить";
      saveButton.disabled = false; 
    });
});

addForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const saveButton = addForm.querySelector(".popup__button"); 

  saveButton.textContent = "Сохранение...";
  saveButton.disabled = true;

  addNewCard(addInput.value, linkInput.value)
    .then((data) => {
      const cardElement = createCard(
        data,
        handleLikeClick,
        userId,
        deleteCard,
        openImagePopup
      );
      placesList.prepend(cardElement);
      closePopup(addPopup);
      clearValidation(addForm, validationConfig);
      addForm.reset(); 
    })
    .catch((err) => {
      console.error("Ошибка при добавлении карточки:", err);
      alert("Ошибка при добавлении карточки!");
    })
    .finally(() => {
      saveButton.textContent = "Создать";
      saveButton.disabled = false;
    });
});



avatarForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const saveButton = avatarForm.querySelector(".popup__button"); 

  saveButton.textContent = "Сохранение...";
  saveButton.disabled = true;

  updateAvatar(avatarInput.value)
    .then(() => {
      profileImage.style.backgroundImage = `url(${avatarInput.value})`;
      closePopup(profileChangeAvatar);
      clearValidation(avatarForm, validationConfig);
      avatarForm.reset(); 
    })
    .catch((err) => {
      console.error("Ошибка обновления аватара:", err);
      alert("Ошибка при обновлении аватара!");
    })
    .finally(() => {
      saveButton.textContent = "Сохранить";
      saveButton.disabled = false;
    });
});

 profileImage.addEventListener("click", () => {
  openPopup(profileChangeAvatar);
 }) 

 popupClose.forEach((button) => {
  button.addEventListener("click", () => {
    const popup = button.closest(".popup");
    closePopup(popup);
  });
});

Promise.all([getInitialUser(), getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    profileTitle.textContent = userData.name; 
    profileDescription.textContent = userData.about; 
    profileImage.style.backgroundImage = `url(${userData.avatar})`;

    cards.forEach((card) => {
      const cardElement = createCard(
        card,
        handleLikeClick,
        userId,
        deleteCard,
        openImagePopup
      );
      placesList.append(cardElement);
    });
  })
  .catch((err) => console.log("Ошибка при загрузке данных:", err));

  enableValidation(validationConfig);
