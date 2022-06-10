import { openPopup, closePopup, imagePopup } from "./index.js";

export class Card {
  constructor(data, templateSelector) {
    this._link = data.link;
    this._name = data.name;
    this._description = data.description;
    this._templateSelector = templateSelector;
    openPopup;
    closePopup;
    imagePopup;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeBtn = this._element.querySelector('.element__like-button');
    this._image = this._element.querySelector('.element__image');
    this._setEventListeners();

    this._image.src = this._link;
    this._image.alt = this._description;
    this._element.querySelector('.element__title').textContent = this._name;

    return this._element;
  }

  _toggleLike() {
    this._likeBtn.classList.toggle('element__like-button_active');
  }

  _handleDelete() {
    this._element.remove();
  }

  _handleImagePopup() {
    const largeImage = imagePopup.querySelector('.popup__image');
    const imageCaption = imagePopup.querySelector('.popup__caption');
    largeImage.src = this._link;
    largeImage.alt = this._description;
    imageCaption.textContent = this._name;
    openPopup(imagePopup);
  }

  _setEventListeners() {
    //like button
    this._likeBtn.addEventListener('click', () => {
      this._toggleLike();
    });

    //delete button
    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._handleDelete();
    });

    //image popup
    this._image.addEventListener('click', () => {
      this._handleImagePopup();
    });

    imagePopup.addEventListener('click', (event) => {
      if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close-button')) {
        closePopup(imagePopup);
      }
    });
  }
}
