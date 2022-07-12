export class Card {
  constructor(data, templateSelector, handleCardClick, userID, api, handleDeleteClick) {
    this._data = data;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
    this._userId = userID;
    this._cardOwnerId = data.owner._id;
    this._cardId = data._id;
    this._api = api;
    this._handleDeleteClick = handleDeleteClick;
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
    this._deleteBtn = this._element.querySelector('.element__delete-button');
    if (this._cardOwnerId === this._userId) {
      this._deleteBtn.addEventListener('click', () => {
        this._handleDeleteClick();
      })
    } else {
      this._deleteBtn.remove();
    };
    this._likeBtn = this._element.querySelector('.element__like-button');
    this._image = this._element.querySelector('.element__image');
    this._setEventListeners();

    this._image.src = this._data.link;
    this._image.alt = this._data.description;
    this._element.querySelector('.element__title').textContent = this._data.name;
    this._element.setAttribute('id', this._cardId);

    return this._element;
  }

  _toggleLike() {
    this._likeBtn.classList.toggle('element__like-button_active');
  }

  _setEventListeners() {
    //like button
    this._likeBtn.addEventListener('click', () => {
      this._toggleLike();
    });

    //image popup
    this._image.addEventListener('click', () => {
      this._handleCardClick(this._data);
    });
  }
}
