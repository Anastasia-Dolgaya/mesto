import { config } from "./validate.js";

export class FormValidator {
  constuctor(parameters, form) {
    // this._formSelector = parameters.formSelector
    // this._inputSelector = parameters.inputSelector;
    // this._submitButtonSelector = parameters.submitButtonSelector;
    // this._inactiveButtonClass = parameters.inactiveButtonClass;
    // this._inputErrorClass = parameters.inputErrorClass;
    // this._errorClass = parameters.errorClass;
    this._form = form;
  }

  _showInputError (formElement, inputElement, errorMessage, parameters) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(parameters.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(parameters.errorClass);
  };

  _hideInputError (formElement, inputElement, parameters) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(parameters.inputErrorClass);
    errorElement.classList.remove(parameters.errorClass);
    errorElement.textContent = '';
  };

  _isValid (formElement, inputElement, parameters) {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, parameters);
    } else {
      hideInputError(formElement, inputElement, parameters);
    }
  };

  _hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  _toggleButtonState (inputList, buttonElement, parameters) {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(parameters.inactiveButtonClass);
    } else {
      buttonElement.classList.remove(parameters.inactiveButtonClass);
    }
  };

  _initForm (formElement, parameters, addEvents) {
    const inputList = Array.from(formElement.querySelectorAll(parameters.inputSelector));
    const buttonElement = formElement.querySelector(parameters.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, parameters);

    if (!addEvents) {
      return;
    }

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement, parameters)
        toggleButtonState(inputList, buttonElement, parameters);
      });
    });
  };

  enableValidation (parameters) {
    formElement = this._form;
    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });

      initForm(formElement, parameters, true);
    };
}
