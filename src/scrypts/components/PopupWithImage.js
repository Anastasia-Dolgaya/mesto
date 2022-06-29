import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__image');
    this._caption = this._popup.querySelector('.popup__caption');
  }

  open(data) {
    this._image.src = data.link;
    // description указан для массива начальных карточек
    this._image.alt = data.description ? data.description : data.title;
    this._caption.textContent = data.title;
    super.open();
  }
}
