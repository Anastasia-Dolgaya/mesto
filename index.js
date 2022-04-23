const popupOpenBtn = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseBtn = document.querySelector('.popup__close-button');

function popupToggle () {
  popup.classList.toggle('popup_opened');
};

popupOpenBtn.addEventListener('click', function (event) {
  event.preventDefault();
  popupToggle();
});

popupCloseBtn.addEventListener('click', function (event) {
  event.preventDefault();
  popupToggle();
});

const saveBtn = document.querySelector('.popup__save-button')
saveBtn.addEventListener('click', popupToggle);

const formElement = document.querySelector('.popup__container');
const nameInput = document.querySelector('.popup__field-name');
const jobInput = document.querySelector('.popup__field-job');

function formSubmitHandler (event) {
    event.preventDefault();
    let profileName = document.querySelector('.profile__name');
    let profileJob = document.querySelector('.profile__job');
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
}

formElement.addEventListener('submit', formSubmitHandler);

