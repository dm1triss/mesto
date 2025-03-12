export const validationConfig = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error'
}); 

// Функция для валидации формы
export function enableValidation(form) {
  const inputs = form.querySelectorAll(".popup__input");
  const submitButton = form.querySelector(".popup__button");

  let isFormValid = true;

  inputs.forEach((input) => {
    const errorMessage = input.nextElementSibling;
    const customErrorMessage = input.dataset.errorMessage;
    const regex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;

    if (input.name === "link") {
      const urlRegex =
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
      if (urlRegex.test(input.value)) {
        input.style.borderBottom = "";
        errorMessage.textContent = "";
        errorMessage.style.display = "none";
      } else {
        isFormValid = false;
        input.style.borderBottom = "1px solid #f00";
        errorMessage.textContent = "Введите адрес сайта.";
        errorMessage.style.display = "block";
      }
    } else if (input.value.trim() === "") {
      isFormValid = false;
      input.style.borderBottom = "1px solid #f00";
      errorMessage.textContent = "Вы пропустили это поле.";
      errorMessage.style.display = "block";
    } else if (input.value.length === 1) {
      isFormValid = false;
      input.style.borderBottom = "1px solid #f00";
      errorMessage.textContent = input.validationMessage;
      errorMessage.style.display = "block";
    } else if (!regex.test(input.value)) {
      isFormValid = false;
      input.style.borderBottom = "1px solid #f00";
      errorMessage.style.display = "block";
      errorMessage.textContent = customErrorMessage;
    } else {
      input.style.borderBottom = "";
      errorMessage.textContent = "";
      errorMessage.style.display = "none";
    }
  });

  if (isFormValid) {
    submitButton.disabled = false;
    submitButton.classList.remove("popup__button_disabled");
    submitButton.classList.add("submitButton");
  } else {
    submitButton.disabled = true;
    submitButton.classList.remove("submitButton");
    submitButton.classList.add("popup__button_disabled");
  }
}

// Обработчик события input для всех форм
document.addEventListener("input", function (event) {
  if (event.target.classList.contains("popup__input")) {
    const form = event.target.closest(".popup__form");
    enableValidation(form);
  }
});

export function clearValidation(form, validationConfig) {
  const inputs = form.querySelectorAll(validationConfig.inputSelector);
  const submitButton = form.querySelector(validationConfig.submitButtonSelector);

  inputs.forEach((input) => {
    const errorMessage = input.nextElementSibling;
    input.style.borderBottom = "";
    errorMessage.textContent = "";
    input.value = "";
    errorMessage.style.display = "none";
  });
  
  submitButton.disabled = true;
  submitButton.classList.remove(validationConfig.submitButtonSelector); 
  submitButton.classList.add(validationConfig.inactiveButtonClass); 
}