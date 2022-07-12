import { Popup } from "./Popup";

export class PopupWithText extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._button = this._popup.querySelector('.popup__save-button');
  }

  open(data) {
    super.open();
    return this._cardId = data._id;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._cardId);
    })
  }
}
