const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__input-error_active'
};

const showInputError = (formElement, inputElement, errorMessage, parameters) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(parameters.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(parameters.errorClass);
};

const hideInputError = (formElement, inputElement, parameters) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(parameters.inputErrorClass);
  errorElement.classList.remove(parameters.errorClass);
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement, parameters) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, parameters);
  } else {
    hideInputError(formElement, inputElement, parameters);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement, parameters) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(parameters.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(parameters.inactiveButtonClass);
  }
};

const setEventListeners = (formElement, parameters) => {
  const inputList = Array.from(formElement.querySelectorAll(parameters.inputSelector));
  const buttonElement = formElement.querySelector(parameters.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, parameters);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, parameters)
      toggleButtonState(inputList, buttonElement, parameters);
    });
  });
};

const enableValidation = (parameters) => {
  const formList = Array.from(document.querySelectorAll(parameters.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, parameters);
  });
};

enableValidation(config);
