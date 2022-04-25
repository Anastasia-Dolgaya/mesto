const popupOpenBtn = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseBtn = document.querySelector('.popup__close-button');
const formElement = document.querySelector('.popup__container');
const nameInput = document.querySelector('.popup__field_type_name');
const jobInput = document.querySelector('.popup__field_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

function popupToggle () {
  popup.classList.toggle('popup_opened');
  if (!popup.classList.contains('.popup_opened')) {
    nameInput.value = profileName.innerText;
    jobInput.value = profileJob.innerText;
  }
};

function formSubmitHandler (event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupToggle ();
}

popupOpenBtn.addEventListener('click', popupToggle);

popupCloseBtn.addEventListener('click', popupToggle);

formElement.addEventListener('submit', formSubmitHandler);
