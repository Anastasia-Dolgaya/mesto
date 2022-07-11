export class Api {
  constructor(options) {
    this.url = options.url;
    this.headers = options.headers;
  }

  getUserData() {
    return fetch('https://nomoreparties.co/v1/cohort-45/users/me', {
      headers: this.headers
    })
    .then (res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(res.status)
    })
  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      headers: this.headers
    })
      .then (res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(res.status)
      })
  }

  updateUserData(data) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then (res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(res.status)
      })
  }

  updateUserAvatar(data) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: data.link,
      })
    })
      .then (res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(res.status)
      })
  }

  addNewCard(data) {
    return fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then (res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(res.status)
      })
  }
}
