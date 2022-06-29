export class Popup {
  constructor(popupSelector){
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open(){
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close(){
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    };
  }

  _handleOverlayAndBtnPopupClose(event) {
    if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close-button')) {
      this.close();
    }
  }

  setEventListeners(){
    this._popup.addEventListener('click', (event) => this._handleOverlayAndBtnPopupClose(event));
  }
}
