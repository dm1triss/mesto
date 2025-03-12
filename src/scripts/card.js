import { postLikeCard, deleteMyCard, deleteLikeCard } from "./api.js";

// Функция создания карточки
export function createCard(
  fullCard,
  handleLikeClick,
  userId,
  deleteCallback,
  handleImageClick
) {
  const template = document.querySelector("#card-template").content;
  const cardElement = template.querySelector(".card").cloneNode(true);

  // Получаем элементы карточки
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLike = cardElement.querySelector(".card__like-counter");

  // Устанавливаем данные карточки
  cardImage.src = fullCard.link;
  cardImage.alt = fullCard.name;
  cardTitle.textContent = fullCard.name;

  // Устанавливаем количество лайков с сервера
  let countLike = fullCard.likes.length;
  cardLike.textContent = countLike;
  cardLike.style.display = countLike > 0 ? "block" : "none";

  // Проверяем, ставил ли пользователь лайк
  let isLiked = fullCard.likes.some((like) => like._id === userId);
  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  }

  // Показываем кнопку удаления только для владельца карточки
  if (fullCard.owner._id === userId) {
    deleteButton.style.display = "block";
    deleteButton.addEventListener("click", () => {
      deleteMyCard(fullCard._id)
        .then(() => {
          deleteCallback(cardElement);
        })
        .catch((err) => console.error("Ошибка удаления карточки:", err));
    });
  } else {
    deleteButton.style.display = "none";
  }

  // Обработчик лайка
  likeButton.addEventListener("click", () => {
    if (isLiked) {
      deleteLikeCard(fullCard._id)
        .then((updatedCard) => {
          isLiked = false;
          countLike = updatedCard.likes.length;
          cardLike.textContent = countLike;
          cardLike.style.display = countLike > 0 ? "block" : "none";
          likeButton.classList.remove("card__like-button_is-active");
        })
        .catch((err) => console.error("Ошибка удаления лайка:", err));
    } else {
      postLikeCard(fullCard._id)
        .then((updatedCard) => {
          isLiked = true;
          countLike = updatedCard.likes.length;
          cardLike.textContent = countLike;
          cardLike.style.display = "block";
          likeButton.classList.add("card__like-button_is-active");
        })
        .catch((err) => console.error("Ошибка добавления лайка:", err));
    }
  });

  // Обработчик клика по изображению
  cardImage.addEventListener("click", () => {
    handleImageClick(fullCard.link, fullCard.name);
  });

  return cardElement;
}

// Функция удаления карточки
export function deleteCard(cardElement) {
  cardElement.remove();
}
