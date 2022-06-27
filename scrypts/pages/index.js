// imports
import { Card } from '../components/Card.js';
import { initialCards } from '../components/initialCardsArr.js';
import { FormValidator } from '../components/FormValidator.js';
import { config } from '../components/config.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { profileOpenBtn, cardAddBtn } from '../utils/constants.js';

// попап с картинкой
const imagePopup = new PopupWithImage('.popup_content_image');

// данные профиля
const profileInfo = new UserInfo({
  infoSelector: {
    name: '.profile__name',
    job: '.profile__job'
  }
})

// попап с данными профиля
const profilePopup = new PopupWithForm ({
  popupSelector: '.popup_content_profile',
  handleFormSubmit: (formData) => {
    profileInfo.setUserInfo(formData);
  }
});

// добавляем начальные карточки
const cardsList = new Section ({
  items: initialCards,
  renderer: (item) => {
    const card = new Card (item, '#element', imagePopup.open.bind(imagePopup));
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
    }
  },
  '.elements');

// добавляем карточки через форму
const cardAddPopup = new PopupWithForm({
  popupSelector: '.popup_content_card',
  handleFormSubmit: (formData) => {
    const card = new Card(formData, '#element', imagePopup.open.bind(imagePopup));
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
  }
});

// рендерим карточки
cardsList.renderItems();

// валидация форм
const profileValidator = new FormValidator(config, profilePopup.form);
const cardAddValidator = new FormValidator(config, cardAddPopup.form);
profileValidator.enableValidation();
cardAddValidator.enableValidation();

// закрытие попапов
cardAddPopup.setEventListeners();
imagePopup.setEventListeners();
profilePopup.setEventListeners();

// кнопки открытия попапов
cardAddBtn.addEventListener('click', () => {
  cardAddValidator.resetForm();
  cardAddValidator.initForm(false);
  cardAddPopup.open();
});

profileOpenBtn.addEventListener('click', () => {
  profileValidator.resetForm();
  const info = profileInfo.getUserInfo();
  profilePopup.form.querySelector('.popup__input_type_name').value = info.name;
  profilePopup.form.querySelector('.popup__input_type_job').value = info.job;
  profilePopup.open();
});
