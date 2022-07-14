export class FormValidator {
  constructor(parameters, form) {
    this._formElement = form;
    this._parameters = parameters;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._parameters.inputSelector));
    this._button = this._formElement.querySelector(this._parameters.submitButtonSelector);
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

  toggleButtonState () {
    if (this._hasInvalidInput()) {
      this._button.classList.add(this._parameters.inactiveButtonClass);
      this._button.disabled = true;
    } else {
      this._button.classList.remove(this._parameters.inactiveButtonClass);
      this._button.disabled = false;
    }
  };

  initForm () {
    this.toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement)
        this.toggleButtonState();
      });
    });
  };

  resetForm() {
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
  };
}
