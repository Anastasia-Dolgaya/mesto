// imports
import { Card } from './Card.js';
import { initialCards } from './initialCardsArr.js';
import { FormValidator } from './FormValidator.js';
import { config } from './config.js';
import { openPopup, closePopup, handleOverlayAndBtnPopupClose } from './utils/utils.js';

/*profilePopup*/
const profilePopup = document.querySelector('.popup_content_profile');
const profileOpenBtn = document.querySelector('.profile__edit-button');
const profileForm = profilePopup.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

/*cardPopup*/
const cardPopup = document.querySelector('.popup_content_card');
const cardAddBtn = document.querySelector('.profile__add-button');
const cardForm = cardPopup.querySelector('.popup__form');

/*cards*/
const cardsContainer = document.querySelector('.elements');
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');

// FormValidators
const profileValidator = new FormValidator(config, profileForm);
const cardAddValidator = new FormValidator(config, cardForm);

/*functions*/

function handleProfileEditForm(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(profilePopup);
}

function createCard(origin) {
  const card = new Card(origin, '#element');
  return card;
}

// Create and add new card by form submit

function handleCardAddForm(event) {
  event.preventDefault();
  const newCard = {
    link: linkInput.value,
    name: titleInput.value,
    description: ''
  };
  const card = createCard(newCard);
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);
  closePopup(cardPopup);
}

// Create and add initial cards

initialCards.forEach((item) => {
  const card = createCard(item);
  const cardElement = card.generateCard();
  cardsContainer.append(cardElement);
});

// EventListeners

profileOpenBtn.addEventListener('click', () => {
  profileValidator.resetForm();
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(profilePopup);
});

profileForm.addEventListener('submit', handleProfileEditForm);

cardAddBtn.addEventListener('click', () => {
  cardAddValidator.resetForm();
  cardAddValidator.initForm(false);
  openPopup(cardPopup);
});

cardForm.addEventListener('submit', (event) => {
  handleCardAddForm(event);
});

profilePopup.addEventListener('click', (event) => {
  handleOverlayAndBtnPopupClose(event, profilePopup);
});

cardPopup.addEventListener('click', (event) => {
  handleOverlayAndBtnPopupClose(event, cardPopup);
});

profileValidator.enableValidation();
cardAddValidator.enableValidation();
