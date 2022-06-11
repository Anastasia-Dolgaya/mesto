function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscPopupClose);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscPopupClose);
}

function handleEscPopupClose(event) {
  const popupActive = document.querySelector('.popup_opened');
  if (event.key === 'Escape') {
    closePopup(popupActive);
  };
}

function handleOverlayAndBtnPopupClose(event, popup) {
  if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close-button')) {
    closePopup(popup);
  }
}

export { openPopup, closePopup, handleEscPopupClose, handleOverlayAndBtnPopupClose };
