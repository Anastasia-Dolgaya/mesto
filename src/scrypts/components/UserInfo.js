export class UserInfo {
  constructor({infoSelector}) {
    this._info = infoSelector;
    this._name = document.querySelector(this._info.name);
    this._about = document.querySelector(this._info.about);
    this._avatar = document.querySelector(this._info.avatar)
  }

  syncUserInfo(data) {
    this._data = data;
    this.setUserInfo(data);
    this.setUserAvatar(data);
  }

  getUserID() {
    return this._data._id;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent
    }
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
