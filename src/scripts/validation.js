export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
};

// Функция для валидации формы
export function enableValidation(form) {
  const inputs = form.querySelectorAll(validationConfig.inputSelector);
  const submitButton = form.querySelector(validationConfig.submitButtonSelector);

  let isFormValid = true;

  inputs.forEach((input) => {
    const errorMessage = input.nextElementSibling;
    const customErrorMessage = input.dataset.errorMessage;
    const regex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;

    if (input.name === "link") {
      const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
      if (urlRegex.test(input.value)) {
        input.classList.remove("input-error");
        errorMessage.textContent = "";
        errorMessage.classList.add("hidden");
        errorMessage.classList.remove("error-visible");
      } else {
        isFormValid = false;
        input.classList.add("input-error");
        errorMessage.textContent = "Введите адрес сайта.";
        errorMessage.classList.remove("hidden");
        errorMessage.classList.add("error-visible");
      }
    } else {
      if (input.value.trim() === "") {
        isFormValid = false;
        input.classList.add("input-error");
        errorMessage.textContent = "Вы пропустили это поле.";
        errorMessage.classList.remove("hidden");
        errorMessage.classList.add("error-visible");
      } else if (input.value.length === 1) {
        isFormValid = false;
        input.classList.add("input-error");
        errorMessage.textContent = input.validationMessage || "Недостаточно символов.";
        errorMessage.classList.remove("hidden");
        errorMessage.classList.add("error-visible");
      } else if (!regex.test(input.value)) {
        isFormValid = false;
        input.classList.add("input-error");
        errorMessage.textContent = customErrorMessage || "Недопустимые символы.";
        errorMessage.classList.remove("hidden");
        errorMessage.classList.add("error-visible");
      } else {
        input.classList.remove("input-error");
        errorMessage.textContent = "";
        errorMessage.classList.add("hidden");
        errorMessage.classList.remove("error-visible");
      }
    }
  });

  if (isFormValid) {
    submitButton.disabled = false;
    submitButton.classList.remove(validationConfig.inactiveButtonClass);
    submitButton.classList.add(validationConfig.submitButtonSelector);
  } else {
    submitButton.disabled = true;
    submitButton.classList.remove(validationConfig.submitButtonSelector);
    submitButton.classList.add(validationConfig.inactiveButtonClass);
  }
}

document.addEventListener("input", function (event) {
  if (event.target.matches(validationConfig.inputSelector)) {
    const form = event.target.closest(validationConfig.formSelector);
    if (form) {
      enableValidation(form);
    }
  }
});


export function clearValidation(form) {
  if (!form || !(form instanceof HTMLFormElement)) return;

  const inputs = form.querySelectorAll(validationConfig.inputSelector);
  const submitButton = form.querySelector(validationConfig.submitButtonSelector);

  inputs.forEach((input) => {
    const errorMessage = input.nextElementSibling;
    if (!errorMessage) return;

    input.classList.remove("input-error");
    errorMessage.textContent = "";
    errorMessage.classList.add("hidden");
    errorMessage.classList.remove("error-visible");
    input.value = "";
  });

  if (submitButton) { 
    submitButton.disabled = true;
    submitButton.classList.remove(validationConfig.submitButtonSelector);
    submitButton.classList.add(validationConfig.inactiveButtonClass);
  }
}