/*profilePopup*/
const profilePopup = document.querySelector('.popup_content_profile');
const popupOpenBtn = document.querySelector('.profile__edit-button');
const popupCloseBtn = profilePopup.querySelector('.popup__close-button');
const profileForm = profilePopup.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__field_type_name');
const jobInput = document.querySelector('.popup__field_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

/*cardPopup*/
const cardPopup = document.querySelector('.popup_content_card');
const cardAddBtn = document.querySelector('.profile__add-button');
const cardAddCloseBtn = cardPopup.querySelector('.popup__close-button');
const cardForm = cardPopup.querySelector('.popup__form');
const titleInput = document.querySelector('.popup__field_type_title');
const linkInput = document.querySelector('.popup__field_type_link');

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
const imageCloseBtn = imagePopup.querySelector('.popup__close-button');
const largeImage = imagePopup.querySelector('.popup__image');

/*functions*/

function openProfilePopup() {
  profilePopup.classList.add('popup_opened');
  nameInput.value = profileName.innerText;
  jobInput.value = profileJob.innerText;
};

function closeProfilePopup() {
  profilePopup.classList.remove('popup_opened');
}

function formSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeProfilePopup();
}

function cloneAndInitCard(name, imgLink, imgAlt) {
  // clone
  const cardElement = elementTemplate.querySelector('.element').cloneNode(true);

  // add content
  cardElement.querySelector('.element__image').src = imgLink;
  cardElement.querySelector('.element__image').alt = imgAlt;
  cardElement.querySelector('.element__title').textContent = name;

  //like button
  cardElement.querySelector('.element__like-button').addEventListener('click', (event) => {
    event.target.classList.toggle('element__like-button_active');
  })

  //delete button
  cardElement.querySelector('.element__delete-button').addEventListener('click', () => {
    cardElement.remove();
  })

  //image popup
  cardElement.querySelector('.element__image').addEventListener('click', () => {
    largeImage.src = imgLink;
    largeImage.alt = imgAlt;
    imagePopup.querySelector('.popup__caption').textContent = name;
    imagePopup.classList.add('popup_opened');
  })
  return cardElement;
}

initialCards.forEach(card => {
  const cardElement = cloneAndInitCard(card.name, card.link, card.description);
  cardsContainer.append(cardElement);
})

function openCardAddPopup() {
  cardPopup.classList.add('popup_opened');
}

function closeCardAddPopup() {
  cardPopup.classList.remove('popup_opened');
}

function cardAddHandler(event) {
  event.preventDefault();
  const cardElement = cloneAndInitCard(titleInput.value, linkInput.value, '');
  // отображаем на странице
  cardsContainer.prepend(cardElement);
  closeCardAddPopup();
}

function closeImagePopup() {
  imagePopup.classList.remove('popup_opened');
}

popupOpenBtn.addEventListener('click', openProfilePopup);

popupCloseBtn.addEventListener('click', closeProfilePopup);

profileForm.addEventListener('submit', formSubmitHandler);

cardAddBtn.addEventListener('click', openCardAddPopup);

cardAddCloseBtn.addEventListener('click', closeCardAddPopup);

cardForm.addEventListener('submit', cardAddHandler);

imageCloseBtn.addEventListener('click', closeImagePopup);
