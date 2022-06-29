// imports
import { initialCards } from '../utils/initialCardsArr.js';
import { config } from '../utils/config.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { profileOpenBtn, cardAddBtn } from '../utils/constants.js';
import './index.css';

// данные профиля
const profileInfo = new UserInfo({
  infoSelector: {
    name: '.profile__name',
    job: '.profile__job'
  }
})

// попап с картинкой
const imagePopup = new PopupWithImage('.popup_content_image');

const createCard = (origin) => {
  const card = new Card (origin, '#element', ()=>imagePopup.open(origin));
  const cardElement = card.generateCard();
  return cardElement;
}

// попап с данными профиля
const profilePopup = new PopupWithForm ({
  popupSelector: '.popup_content_profile',
  handleFormSubmit: (formData) => {
    profileInfo.setUserInfo(formData);
    profilePopup.close();
  }
});

// добавляем начальные карточки
const cardsList = new Section ({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    cardsList.addItem(cardElement);
    }
  },
  '.elements');

// добавляем карточки через форму
const cardAddPopup = new PopupWithForm({
  popupSelector: '.popup_content_card',
  handleFormSubmit: (formData) => {
    const cardElement = createCard(formData);
    cardsList.addItem(cardElement);
    cardAddPopup.close();
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

// функции открытия попапов
const openCardAddPopup = () => {
  cardAddValidator.resetForm();
  cardAddValidator.initForm(false);
  cardAddPopup.open();
}

const openProfilePopup = () => {
  profileValidator.resetForm();
  profileValidator.initForm(false);
  const info = profileInfo.getUserInfo();
  profilePopup.form.querySelector('.popup__input_type_name').value = info.name;
  profilePopup.form.querySelector('.popup__input_type_job').value = info.job;
  profilePopup.open();
}

// кнопки открытия попапов
cardAddBtn.addEventListener('click', openCardAddPopup);
profileOpenBtn.addEventListener('click', openProfilePopup);
