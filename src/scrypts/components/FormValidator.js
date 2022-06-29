export class FormValidator {
  constructor(parameters, form) {
    this._formElement = form;
    this._parameters = parameters;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._parameters.inputSelector));
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

  _hasInvalidInput () {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  _toggleButtonState (buttonElement) {
    if (this._hasInvalidInput(this._inputList)) {
      buttonElement.classList.add(this._parameters.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._parameters.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  };

  initForm (addListeners) {
    const buttonElement = this._formElement.querySelector(this._parameters.submitButtonSelector);
    this._toggleButtonState(buttonElement);

    if (!addListeners) {
      return }

      this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement)
        this._toggleButtonState(buttonElement);
      });
    });
  };

  resetForm() {
    this._formElement.reset();
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
  };

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this.initForm(true);
  };
}
