let buttonElement = document.querySelector('.form__button');
let checkboxYes = document.querySelector('.form__checkbox-label--yes');
let checkboxNo = document.querySelector('.form__checkbox-label--no');
let nameSubtitle = document.querySelector('.form__subtitle--name');
let nameInput = document.getElementById('input-name');

const pictureArray = ["icon1.png", "icon2.png", "icon3.png", "icon4.png", "icon5.png", "icon6.png", "icon7.png", "icon8.png", "icon9.png"]
const options = {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false
};

buttonElement.addEventListener('click', addComment);

checkboxYes.addEventListener('click', changeCheckbox);
checkboxNo.addEventListener('click', changeCheckbox);

function changeCheckbox() {
    checkboxYes.classList.toggle('checked');
    checkboxNo.classList.toggle('checked');
    nameSubtitle.style.display = nameSubtitle.style.display === 'none' ? 'block' : 'none';
    nameInput.style.display = nameInput.style.display === 'none' ? 'block' : 'none';
}

function addComment() {
    let commentform = document.getElementById('input-comment');

    if (!(commentform.value)) {
        return
    }

    const title = document.createElement('h3');
    if (!nameInput.value && checkboxYes.classList.contains('checked')) {
        nameInput.required = true;
        return
    }
    else if (nameInput.required) {
        nameInput.required = false;
    }
    title.textContent = (nameInput.value && checkboxYes.classList.contains('checked')) ? checkName(nameInput.value) : 'Username';
    title.classList.add('chat__subtitle');

    const picture = document.createElement('img');
    let pictureUrl = document.getElementById('input-url');
    if (pictureUrl.value) {
        picture.src = pictureUrl.value;
    }
    else {
        let randomNumber = Math.floor(Math.random() * pictureArray.length);
        picture.src = `./assets/images/${pictureArray[randomNumber]}`;
    }
    picture.classList.add('chat__photo');

    const timeElement = document.createElement('p');
    let currentTime = new Date();
    timeElement.textContent = currentTime.toLocaleString('en-GB', options);

    const pElement = document.createElement('p');
    pElement.textContent = checkSpam(commentform.value);
    pElement.classList.add('chat__text');


    const containerName = document.createElement('div');
    containerName.append(picture, title, timeElement);
    containerName.classList.add('chat__container');

    const containerComment = document.createElement('div');
    containerComment.append(containerName, pElement);
    containerComment.classList.add('chat__comment')
    const chatContainer = document.querySelector('.chat__comments-container');
    chatContainer.prepend(containerComment);

    nameInput.value = '';
    pictureUrl.value = '';
    commentform.value = '';
    if (!checkboxYes.classList.contains('checked')) {
        changeCheckbox();
    }
}

function checkName(text) {
    text = text.trim();
    text = text.replace(/[0-9]|[*.,+_=&$#@!%:;{}()]/g, '');
    text = text.toLowerCase()
    text = text.replace(text[0], text[0].toUpperCase());
    return text
}

function checkSpam(text) {
    text = text.trim();
    text = text.replace(/viagra|XXX/gi, '***');
    return text
}
