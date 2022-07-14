export class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _response(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  fetchUserData() {
    return fetch('https://nomoreparties.co/v1/cohort-45/users/me', {
      headers: this._headers
    })
      .then(res => {
        return this._response(res);
      })
  }

  fetchInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
      .then(res => {
        return this._response(res);
      })
  }

  updateUserData(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(res => {
        return this._response(res);
      })
  }

  updateUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.link,
      })
    })
      .then(res => {
        return this._response(res);
      })
  }

  addNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(res => {
        return this._response(res);
      })
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => {
        return this._response(res);
      })
  }

  fetchCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'GET',
      headers: this._headers
    })
      .then(res => {
        return this._response(res);
      })
  }

  fetchLikes(cardId, isLiked) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: this._headers
    })
      .then(res => {
        return this._response(res);
      })
  }
}
