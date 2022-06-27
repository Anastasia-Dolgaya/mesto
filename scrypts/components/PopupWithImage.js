import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(data) {
    this._image = this._popup.querySelector('.popup__image');
    this._caption = this._popup.querySelector('.popup__caption');
    this._image.src = data.link;
    this._image.alt = data.description;
    this._caption.textContent = data.title;
    super.open();
  }
}
