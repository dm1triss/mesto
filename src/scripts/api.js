// Конфигурация API
const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-33",
  headers: {
    authorization: "9578ca78-b7b3-4e0e-ab1d-7771d7443ca9",
    "Content-Type": "application/json",
  },
};

// Проверка ответа от сервера
const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

// Получение информации о пользователе
export const getInitialUser = () => {
  return fetch(`${config.baseUrl}/users/me`, { headers: config.headers }).then(checkResponse);
};

// Получение карточек
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, { headers: config.headers }).then(checkResponse);
};

// Редактирование профиля
export const updateUserProfile = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ name, about }),
  }).then(checkResponse);
};

// Добавление новой карточки
export const addNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({ name, link }),
  }).then(checkResponse);
};

// Удаление своей карточки
export const deleteMyCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
};

// Постановка лайка карточке
export const postLikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then(checkResponse);
};

// Удаление лайка карточки
export const deleteLikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
};

// Обновление аватара
export const updateAvatar = (avatarUrl) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ avatar: avatarUrl }),
  }).then(checkResponse);
};

// Загрузка данных пользователя и карточек
Promise.all([getInitialUser(), getInitialCards()])
  .then(([user, cards]) => {
    console.log("Данные пользователя:", user);
    console.log("Карточки:", cards);
  })
  .catch((err) => console.log("Ошибка при загрузке данных:", err));