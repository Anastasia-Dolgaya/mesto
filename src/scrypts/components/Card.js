// убрала api из конструктора и вынесла логику постановки лайка в отдельную функцию, которую передаю в конструктор
export class Card {
  constructor(data, templateSelector, handleCardClick, userID, handleLikes, handleDeleteClick) {
    this._data = data;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
    this._userId = userID;
    this._cardOwnerId = data.owner._id;
    this._cardId = data._id;
    this._handleLikes = handleLikes;
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
    this._likeNumber = this._element.querySelector('.element__like-number');
    this._image = this._element.querySelector('.element__image');
    this._setEventListeners();

    this._image.src = this._data.link;
    this._image.alt = this._data.description;
    this._element.querySelector('.element__title').textContent = this._data.name;
    this._element.setAttribute('id', this._cardId);
    this.renderLike(this._data);

    return this._element;
  }

  isLiked(data) {
    return (data.likes.find(item => item._id === this._userId));
  }

  renderLike(data) {
    if (this.isLiked(data)) {
      this._likeBtn.classList.add('element__like-button_active');
    } else {
      this._likeBtn.classList.remove('element__like-button_active');
    }
    this._likeNumber.textContent = data.likes.length;
  }

  delete() {
    this._element.remove();
  }

  _setEventListeners() {
    //like button
    this._likeBtn.addEventListener('click', () => {
      this._handleLikes(this, this._cardId, this._likeBtn);
    });

    //image popup
    this._image.addEventListener('click', () => {
      this._handleCardClick(this._data);
    });
  }
}
