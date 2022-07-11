export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._data = data;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
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

    this._image.src = this._data.link;
    this._image.alt = this._data.description;
    this._element.querySelector('.element__title').textContent = this._data.name;

    return this._element;
  }

  _toggleLike() {
    this._likeBtn.classList.toggle('element__like-button_active');
  }

  _handleDelete() {
    this._element.remove();
    this._element = null;
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
      this._handleCardClick(this._data);
    });
  }
}
