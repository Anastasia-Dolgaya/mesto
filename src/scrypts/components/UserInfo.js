export class UserInfo {
  constructor({infoSelector}, api) {
    this._info = infoSelector;
    this._name = document.querySelector(this._info.name);
    this._about = document.querySelector(this._info.about);
    this._avatar = document.querySelector(this._info.avatar)
    this._api = api;
  }

  syncUserInfo() {
    return this.getUserInfo()
      .then((data) => {
        this._data = data;
        this.setUserInfo(data);
        this.setUserAvatar(data);
        return this._data;
      })
      .catch(err => console.log(`Ошибка: ${err}`))
  }

  getUserID() {
    return this._data._id;
  }

  getUserInfo() {
    return this._api.fetchUserData();
  }

  setUserInfo(obj) {
    if (obj.name) {
      this._name.textContent = obj.name;
    }
    if (obj.about) {
      this._about.textContent = obj.about;
    }
  }

  setUserAvatar(obj) {
    if (obj.avatar) {
      this._avatar.src = obj.avatar;
    }
  }
}
