const popupOpenBtn = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseBtn = document.querySelector('.popup__close-button');
const formElement = document.querySelector('.popup__container');

function popupToggle () {
  popup.classList.toggle('popup_opened');
  if (!popup.classList.contains('.popup_opened')) {
    let nameInput = document.querySelector('.popup__field_type_name');
    let jobInput = document.querySelector('.popup__field_type_job');
    let profileName = document.querySelector('.profile__name');
    let profileJob = document.querySelector('.profile__job');
    nameInput.value = profileName.innerText;
    jobInput.value = profileJob.innerText;
  }
};

function formSubmitHandler (event) {
  event.preventDefault();
  let nameInput = document.querySelector('.popup__field_type_name');
  let jobInput = document.querySelector('.popup__field_type_job');
  let profileName = document.querySelector('.profile__name');
  let profileJob = document.querySelector('.profile__job');
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupToggle ();
}

popupOpenBtn.addEventListener('click', popupToggle);

popupCloseBtn.addEventListener('click', popupToggle);

formElement.addEventListener('submit', formSubmitHandler);
