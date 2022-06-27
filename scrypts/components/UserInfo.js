export class UserInfo {
  constructor({infoSelector}) {
    this._info = infoSelector;
    this._name = document.querySelector(this._info.name);
    this._job = document.querySelector(this._info.job);
  }

  getUserInfo() {
    this._userData = {};
    this._userData.name = this._name.textContent;
    this._userData.job = this._job.textContent;
    return this._userData;
  }

  setUserInfo(formData) {
    this._name.textContent = formData.name;
    this._job.textContent = formData.job;
  }
}
