// imports
import {Card} from './Card.js';
import { initialCards } from './initialCardsArr.js';
import { FormValidator } from './FormValidator.js';
import { config } from './config.js';

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

/*imagePopup */
const imagePopup = document.querySelector('.popup_content_image');

/*functions*/

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

function handleProfileEditForm(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(profilePopup);
}

function resetForm(form) {
  form.reset();
  const inputsArr = Array.from(form.querySelectorAll('.popup__input'));
  inputsArr.forEach((input) => {
    input.classList.remove('popup__input_invalid');
  });
  const errorsArr = Array.from(form.querySelectorAll('.popup__input-error'));
  errorsArr.forEach((error) => {
    error.classList.remove('popup__input-error_active');
    error.textContent = '';
  });
};

// Create and add new card by form submit

function handleCardAddForm(event) {
  event.preventDefault();
  const newCard = {
    link: linkInput.value,
    name: titleInput.value,
    description: ''
  };
  const card = new Card(newCard, '#element');
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);
  closePopup(cardPopup);
}

// Create and add initial cards

initialCards.forEach((item) => {
  const card = new Card(item, '#element');
  const cardElement = card.generateCard();
  cardsContainer.append(cardElement);
});

// EventListeners

profileOpenBtn.addEventListener('click', () => {
  resetForm(profileForm);
  const profileValidator = new FormValidator(config, profileForm);
  profileValidator.enableValidation();
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(profilePopup);
});

profileForm.addEventListener('submit', handleProfileEditForm);

cardAddBtn.addEventListener('click', () => {
  resetForm(cardForm);
  const cardAddValidator = new FormValidator(config, cardForm);
  cardAddValidator.enableValidation();
  openPopup(cardPopup);
});

cardForm.addEventListener('submit', (event) => {
  handleCardAddForm(event);
});

profilePopup.addEventListener('click', (event) => {
  if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close-button')) {
    closePopup(profilePopup);
  }
});

cardPopup.addEventListener('click', (event) => {
  if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close-button')) {
    closePopup(cardPopup);
  }
});

export {openPopup, closePopup, imagePopup};
