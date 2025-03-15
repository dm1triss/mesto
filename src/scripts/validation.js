export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error", 
  inputInvalidClass: "popup__input_invalid", 
  errorVisibleClass: "error-visible",
  errorHiddenClass: "hidden",
};

// Функция для показа ошибки
const showInputError = (input, errorMessage, config) => {
  const errorElement = input.nextElementSibling;
  if (errorElement) {
    errorElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.remove(config.errorHiddenClass);
    errorElement.classList.add(config.errorVisibleClass);
    input.classList.add(config.inputInvalidClass);
  }
};

// Функция для скрытия ошибки
export const hideInputError = (input, config) => {
  const errorElement = input.nextElementSibling;
  if (errorElement) {
    errorElement.classList.remove(config.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(config.errorVisibleClass);
    errorElement.classList.add(config.errorHiddenClass);
    input.classList.remove(config.inputInvalidClass);
  }
};

const checkInputValidity = (input, config) => {
  const customErrorMessage = input.dataset.errorMessage;
  const regex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;

  if (input.name === "link") {
    const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    if (!urlRegex.test(input.value)) {
      showInputError(input, "Введите адрес сайта.", config);
      return false;
    }
  } else if (input.value.trim() === "") {
    showInputError(input, "Вы пропустили это поле.", config);
    return false;
  } else if (input.value.length === 1) {
    showInputError(input, input.validationMessage || "Недостаточно символов.", config);
    return false;
  } else if (!regex.test(input.value)) {
    showInputError(input, customErrorMessage || "Недопустимые символы.", config);
    return false;
  }

  hideInputError(input, config);
  return true;
};

const toggleButtonState = (inputs, submitButton, config) => {
  const isFormValid = inputs.every(input => checkInputValidity(input, config));
  submitButton.disabled = !isFormValid;
  submitButton.classList.toggle(config.inactiveButtonClass, !isFormValid);
};

export const enableValidation = (config) => {
  const forms = document.querySelectorAll(config.formSelector);

  forms.forEach(form => {
    const inputs = Array.from(form.querySelectorAll(config.inputSelector));
    const submitButton = form.querySelector(config.submitButtonSelector);

    inputs.forEach(input => {
      input.addEventListener("input", () => {
        checkInputValidity(input, config);
        toggleButtonState(inputs, submitButton, config);
      });
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      toggleButtonState(inputs, submitButton, config);
    });
  });
};

export const clearValidation = (form, config) => {
  if (!form || !(form instanceof HTMLFormElement)) return;

  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const submitButton = form.querySelector(config.submitButtonSelector);

  inputs.forEach(input => {
    hideInputError(input, config);
    input.value = "";
  });

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.classList.add(config.inactiveButtonClass);
  }
};

export const clearErrors = (form, config) => {
  if (!form || !(form instanceof HTMLFormElement)) return;

  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  inputs.forEach(input => hideInputError(input, config));
};