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
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');

/*cards*/
const initialCards = [
  {
    name: 'Двуглавая сопка',
    link: './images/dvuglavaya-sopka.jpg',
    description: 'Осенний горный пейзаж'
  },

  {
    name: 'Каменная река',
    link: './images/kamennaya-reka.jpg',
    description: 'Каменные глыбы на фоне гор'
  },

  {
    name: 'Аракульские шиханы',
    link: './images/arakul.jpg',
    description: 'Отвесные скалы на фоне зеленого леса'
  },

  {
    name: 'Коркинский разрез',
    link: './images/korkino.jpg',
    description: 'Огромный карьер с сетью дорог'
  },

  {
    name: 'Озеро Тургояк',
    link: './images/turgoyak.jpg',
    description: 'Мелкая рябь на озере с ледовой коркой'
  },

  {
    name: 'Таганай',
    link: './images/taganai.jpg',
    description: 'Скамейка на краю обрыва на фоне гор'
  },
]

const elementTemplate = document.querySelector('#element').content;
const cardsContainer = document.querySelector('.elements');

/*imagePopup */
const imagePopup = document.querySelector('.popup_content_image');
const largeImage = imagePopup.querySelector('.popup__image');
const imageCaption = imagePopup.querySelector('.popup__caption');

/*functions*/

function openPopup(popup, parameters) {
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

function toggleLike(event) {
  event.target.classList.toggle('element__like-button_active');
}

function handleDelete(event) {
  event.target.closest('.element').remove();
}

function handleImagePopup(name, imgLink, imgAlt) {
  largeImage.src = imgLink;
  largeImage.alt = imgAlt;
  imageCaption.textContent = name;
  openPopup(imagePopup, config);
}

function cloneAndInitCard(name, imgLink, imgAlt) {
  // clone
  const cardElement = elementTemplate.querySelector('.element').cloneNode(true);

  // add content
  const cardImage = cardElement.querySelector('.element__image');
  cardImage.src = imgLink;
  cardImage.alt = imgAlt;
  cardElement.querySelector('.element__title').textContent = name;

  //like button
  cardElement.querySelector('.element__like-button').addEventListener('click', toggleLike);

  //delete button
  cardElement.querySelector('.element__delete-button').addEventListener('click', handleDelete);

  //image popup
  cardImage.addEventListener('click', () => handleImagePopup(name, imgLink, imgAlt));
  return cardElement;
}

function handleCardAddForm(event) {
  event.preventDefault();
  const cardElement = cloneAndInitCard(titleInput.value, linkInput.value, '');
  cardsContainer.prepend(cardElement);
  closePopup(cardPopup);
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

initialCards.forEach(card => {
  const cardElement = cloneAndInitCard(card.name, card.link, card.description);
  cardsContainer.append(cardElement);
});

profileOpenBtn.addEventListener('click', () => {
  resetForm(profileForm);
  nameInput.value = profileName.innerText;
  jobInput.value = profileJob.innerText;
  openPopup(profilePopup, config);
  initForm(profilePopup, config, false);
});

profileForm.addEventListener('submit', handleProfileEditForm);

cardAddBtn.addEventListener('click', () => {
  resetForm(cardForm);
  openPopup(cardPopup, config);
  initForm(cardPopup, config, false);
});

cardForm.addEventListener('submit', (event) => {
  handleCardAddForm(event);v
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

imagePopup.addEventListener('click', (event) => {
  if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close-button')) {
    closePopup(imagePopup);
  }
});
