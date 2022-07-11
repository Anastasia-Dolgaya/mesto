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
      this._setUserInfo(data);
      this._setUserAvatar(data);
      return this._data;
    })
  }

  getUserID() {
    return this._data._id;
  }

  getUserInfo() {
    return this._api.getUserData();
  }

  _setUserInfo(obj) {
    if (obj.name) {
      this._name.textContent = obj.name;
    }
    if (obj.about) {
      this._about.textContent = obj.about;
    }
  }

  _setUserAvatar(obj) {
    if (obj.avatar) {
      this._avatar.src = obj.avatar;
    }
  }
}
