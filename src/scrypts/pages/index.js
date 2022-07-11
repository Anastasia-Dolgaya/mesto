// imports
import { initialCards } from '../utils/initialCardsArr.js';
import { config } from '../utils/config.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { profileOpenBtn, cardAddBtn, avatarEditBtn } from '../utils/constants.js';
import { Api } from '../components/Api.js';
import { apiConfig } from '../utils/apiConfig.js';
import './index.css';

const api = new Api(apiConfig);

// данные профиля
const userInfo = new UserInfo({
  infoSelector: {
    name: '.profile__name',
    about: '.profile__job',
    avatar: '.profile__avatar'
  }
}, api)

// попап изменения аватара
const avatarPopup = new PopupWithForm({
  popupSelector: '.popup_content_avatar',
  handleFormSubmit: (data) => {
    avatarPopup.renderLoading(true);
    api.updateUserAvatar(data)
    .then((res) => {
      userInfo.setUserAvatar(res);
      avatarPopup.close();
    })
    .catch(err => console.log(`Ошибка: ${err}`))
    .finally(() => {
      avatarPopup.renderLoading(false);
    })
  }
})

// попап с картинкой
const imagePopup = new PopupWithImage('.popup_content_image');

// создаем карточки
const createCard = (origin) => {
  const userId = userInfo.getUserID();
  const card = new Card (origin, '#element', ()=>imagePopup.open(origin), userId, api);
  const cardElement = card.generateCard();
  return cardElement;
}

// попап с редактированием данных профиля
const profilePopup = new PopupWithForm ({
  popupSelector: '.popup_content_profile',
  handleFormSubmit: (data) => {
    profilePopup.renderLoading(true);
    api.updateUserData(data)
    .then(res => {
      userInfo.setUserInfo(res);
      profilePopup.close();
    })
    .catch(err => console.log(`Ошибка: ${err}`))
    .finally(() => {
      profilePopup.renderLoading(false);
    })
  }
});

const cardsList = new Section ({
  renderer: (item) => {
    return createCard(item);
    }
  },
  '.elements');

// сихнронизируем информацию профиля и отрисовываем карточки с сервера
Promise.all([api.getInitialCards(), userInfo.syncUserInfo()])
  .then(([cardsData]) => {
    cardsList.renderItems(cardsData);
  })
  .catch(err => console.log(`Ошибка: ${err}`))

// добавляем карточки через форму
const cardAddPopup = new PopupWithForm({
  popupSelector: '.popup_content_card',
  handleFormSubmit: (formData) => {
    cardAddPopup.renderLoading(true);
    api.addNewCard(formData)
    .then(res => {
      cardsList.addItem(res);
      cardAddPopup.close();
    })
    .catch(err => console.log(`Ошибка: ${err}`))
    .finally(() => {
      cardAddPopup.renderLoading(false);
    })
  }
});

// валидация форм
const profileValidator = new FormValidator(config, profilePopup.form);
const cardAddValidator = new FormValidator(config, cardAddPopup.form);
const avatarEditValidator = new FormValidator(config, avatarPopup.form);
profileValidator.enableValidation();
cardAddValidator.enableValidation();
avatarEditValidator.enableValidation();

// закрытие попапов
cardAddPopup.setEventListeners();
imagePopup.setEventListeners();
profilePopup.setEventListeners();
avatarPopup.setEventListeners();

// функции открытия попапов
const openCardAddPopup = () => {
  cardAddValidator.resetForm();
  cardAddValidator.initForm(false);
  cardAddPopup.open();
}

const openProfilePopup = () => {
  profileValidator.resetForm();
  profileValidator.initForm(false);
  userInfo.getUserInfo()
  .then(obj => {
    profilePopup.form.querySelector('.popup__input_type_name').value = obj.name;
    profilePopup.form.querySelector('.popup__input_type_about').value = obj.about;
    profilePopup.open();
  })
  .catch(err => console.log(`Ошибка: ${err}`))
}

const openAvatarPopup = () => {
  avatarEditValidator.resetForm();
  avatarEditValidator.initForm(false);
  avatarPopup.open();
}

// кнопки открытия попапов
cardAddBtn.addEventListener('click', openCardAddPopup);
profileOpenBtn.addEventListener('click', openProfilePopup);
avatarEditBtn.addEventListener('click', openAvatarPopup);

