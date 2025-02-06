// Функция создания карточки 
export function createCard(fullCard, handleLikeClick, deleteCallback, handleImageClick) { 
 
  const template = document.querySelector("#card-template").content; 
  const cardElement = template.querySelector(".card").cloneNode(true); 
  // Получаем элементы карточки 
  const cardImage = cardElement.querySelector(".card__image"); 
  const deleteButton = cardElement.querySelector(".card__delete-button"); 
  const likeButton = cardElement.querySelector(".card__like-button"); 
  const cardTitle = cardElement.querySelector(".card__title"); 
 
  cardImage.src = fullCard.link; 
  cardImage.alt = fullCard.name; 
  cardTitle.textContent = fullCard.name; 
 
  // Обработчик удаления карточки 
  deleteButton.addEventListener("click", () => { 
    deleteCallback(cardElement); 
  }); 
 
  likeButton.addEventListener("click", handleLikeClick);
  
  cardImage.addEventListener('click', () => { 
    handleImageClick(fullCard.link, fullCard.name); 
  }); 
 
  return cardElement; 
} 
 
// Функция удаления карточки 
export function deleteCard(cardElement) { 
  cardElement.remove(); 
}