// imports
import { config } from '../utils/config.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithText } from '../components/PopupWithText.js';
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

// попап подтверждения удаления карточки
const deleteConfirmPopup = new PopupWithText ({
  popupSelector: '.popup_content_confirmation',
  handleFormSubmit: (card) => {
    api.deleteCard(card._cardId)
      .then(() => {
        deleteConfirmPopup.close();
        card.delete();
      })
      .catch(err => console.log(`Ошибка: ${err}`))
  }
})

function handleLikes(card, cardId, button) {
  if (button.classList.contains('element__like-button_active')) {
    api.fetchLikes(cardId, true)
    .then(data => {
      card.renderLike(data);
    })
    .catch(err => console.log(`Ошибка: ${err}`))
  } else {
    api.fetchLikes(cardId, false)
    .then(data => {
      card.renderLike(data);
    })
    .catch(err => console.log(`Ошибка: ${err}`))
  }
}

// создаем карточки
const createCard = (origin) => {
  const userId = userInfo.getUserID();
  const card = new Card (origin, '#element', ()=>imagePopup.open(origin), userId, handleLikes, ()=>deleteConfirmPopup.open(card));
  const cardElement = card.generateCard();
  return cardElement;
}

// создаем секцию
const cardsList = new Section ({
  renderer: (item) => {
    return createCard(item);
    }
  },
  '.elements');

// сихнронизируем информацию профиля и отрисовываем карточки с сервера
Promise.all([api.fetchInitialCards(), api.fetchUserData()])
  .then(([cardsData, userData]) => {
    userInfo.syncUserInfo(userData);
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
profileValidator.initForm();
cardAddValidator.initForm();
avatarEditValidator.initForm();

// закрытие попапов
cardAddPopup.setEventListeners();
imagePopup.setEventListeners();
profilePopup.setEventListeners();
avatarPopup.setEventListeners();
deleteConfirmPopup.setEventListeners();

// функции открытия попапов
const openCardAddPopup = () => {
  cardAddValidator.resetForm();
  cardAddValidator.toggleButtonState();
  cardAddPopup.open();
}

const openProfilePopup = () => {
  profileValidator.resetForm();
  const profileData = userInfo.getUserInfo();
  profilePopup.form.querySelector('.popup__input_type_name').value = profileData.name;
  profilePopup.form.querySelector('.popup__input_type_about').value = profileData.about;
  profileValidator.toggleButtonState();
  profilePopup.open();
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

