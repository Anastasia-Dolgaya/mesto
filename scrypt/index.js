/*popupProfile*/
const popupProfile = document.querySelector('.popup_type_profile');
const popupOpenBtn = document.querySelector('.profile__edit-button');
const popupCloseBtn = document.querySelector('.popup__close-button_place_profile');
const profileForm = document.querySelector('.popup__form_type_profile');
const nameInput = document.querySelector('.popup__field_type_name');
const jobInput = document.querySelector('.popup__field_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

/*popupCard*/
const popupCard = document.querySelector('.popup_type_card');
const cardAddBtn = document.querySelector('.profile__add-button');
const cardAddCloseBtn = document.querySelector('.popup__close-button_place_card');
const cardForm = document.querySelector('.popup__form_type_card');
const titleInput = document.querySelector('.popup__field_type_title');
const linkInput = document.querySelector('.popup__field_type_link');

/*Cards*/
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

/*popupImage */
const popupImage = document.querySelector('.popup_type_image');
const imageCloseBtn = document.querySelector('.popup__close-button_place_image');

/*Functions*/

function popupProfileOpen () {
  popupProfile.classList.add('popup_opened');
  nameInput.value = profileName.innerText;
  jobInput.value = profileJob.innerText;
};

function popupProfileClose () {
  popupProfile.classList.remove('popup_opened');
}

function formSubmitHandler (event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupProfileClose ();
}


initialCards.forEach(card => {
  // клонируем
  const cardElement = elementTemplate.querySelector('.element').cloneNode(true);

  // наполняем содержимым
  cardElement.querySelector('.element__image').src = card.link;
  cardElement.querySelector('.element__image').alt = card.description;
  cardElement.querySelector('.element__title').textContent = card.name;


  cardElement.querySelector('.element__like-button').addEventListener('click', function(event) {
    event.target.classList.toggle('element__like-button_active');
  })

  cardElement.querySelector('.element__delete-button').addEventListener('click', function() {
    cardElement.remove();
  })

  cardElement.querySelector('.element__image').addEventListener('click', function() {
    popupImage.querySelector('.popup__image').src = card.link;
    popupImage.querySelector('.popup__image').alt = card.description;
    popupImage.querySelector('.popup__caption').textContent = card.name;
    popupImage.classList.add('popup_opened');
  })

  // отображаем на странице
  cardsContainer.append(cardElement);
})

function cardAddPopupOpen () {
  popupCard.classList.add('popup_opened');
}

function cardAddPopupClose () {
  popupCard.classList.remove('popup_opened');
}

function cardAddHandler (event) {
  event.preventDefault();
  const cardElement = elementTemplate.querySelector('.element').cloneNode(true);
  // наполняем содержимым
  cardElement.querySelector('.element__image').src = linkInput.value;
  cardElement.querySelector('.element__title').textContent = titleInput.value;
  popupImage.querySelector('.popup__image').src = linkInput.value;
  popupImage.querySelector('.popup__caption').textContent = titleInput.value;

  cardElement.querySelector('.element__like-button').addEventListener('click', function(event) {
    event.target.classList.toggle('element__like-button_active');
  })

  cardElement.querySelector('.element__delete-button').addEventListener('click', function() {
    cardElement.remove();
  })

  cardElement.querySelector('.element__image').addEventListener('click', function() {
    popupImage.classList.add('popup_opened');
  })

  // отображаем на странице
  cardsContainer.prepend(cardElement);
  cardAddPopupClose ()
}

function popupImageClose() {
  popupImage.classList.remove('popup_opened');
}

popupOpenBtn.addEventListener('click', popupProfileOpen);

popupCloseBtn.addEventListener('click', popupProfileClose);

profileForm.addEventListener('submit', formSubmitHandler);

cardAddBtn.addEventListener('click', cardAddPopupOpen);

cardAddCloseBtn.addEventListener('click', cardAddPopupClose);

cardForm.addEventListener('submit', cardAddHandler);

imageCloseBtn.addEventListener('click', popupImageClose);

