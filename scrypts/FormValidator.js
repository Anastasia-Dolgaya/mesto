export class FormValidator {
  constructor(parameters, form) {
    this._formElement = form;
    this._parameters = parameters;
  }

  _showInputError (inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._parameters.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._parameters.errorClass);
  };

  _hideInputError (inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._parameters.inputErrorClass);
    errorElement.classList.remove(this._parameters.errorClass);
    errorElement.textContent = '';
  };

  _isValid (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  _toggleButtonState (inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._parameters.inactiveButtonClass);
    } else {
      buttonElement.classList.remove(this._parameters.inactiveButtonClass);
    }
  };

  initForm (addListeners) {
    const inputList = Array.from(this._formElement.querySelectorAll(this._parameters.inputSelector));
    const buttonElement = this._formElement.querySelector(this._parameters.submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);

    if (!addListeners) {
      return }

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement)
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  resetForm() {
    this._formElement.reset();
    const inputsArr = Array.from(this._formElement.querySelectorAll('.popup__input'));
    inputsArr.forEach((input) => {
      input.classList.remove('popup__input_invalid');
    });
    const errorsArr = Array.from(this._formElement.querySelectorAll('.popup__input-error'));
    errorsArr.forEach((error) => {
      error.classList.remove('popup__input-error_active');
      error.textContent = '';
    });
  };

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this.initForm(true);
  };
}
