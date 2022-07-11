export class UserInfo {
  constructor({infoSelector}, api) {
    this._info = infoSelector;
    this._name = document.querySelector(this._info.name);
    this._about = document.querySelector(this._info.about);
    this._avatar = document.querySelector(this._info.avatar)
    this._api = api;
  }

  getUserInfo() {
    return this._api.getUserData()
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
      console.log(this._avatar, obj);
      this._avatar.src = obj.avatar;
    }
  }
}
