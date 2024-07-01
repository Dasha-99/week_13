let button = document.querySelector('.main__button');
let dateInput = document.getElementById('date-input');
let message = document.querySelector('.main__message');

button.addEventListener('mouseover', function () {
    button.style.cursor = 'pointer';
    button.style.backgroundColor = 'rgb(0, 128, 0)';
})

button.addEventListener('mouseout', function () {
    button.style.backgroundColor = 'rgba(96, 204, 96, 0.892)';
})

button.addEventListener('click', calculation);

/*dateInput.addEventListener('focus',function(){
    message.textContent ="";
});*/

function calculation() {
    let dateValue = dateInput.value;
    console.log(typeof (dateValue));
    if (dateValue.length === 0) {
        message.textContent = 'Пожалуйста, введите дату рождения.';
        message.style.color = 'red';
    }
    else {
        let dateBirthday = new Date(dateValue);
        let dateCurrent = new Date();
        if (dateBirthday < dateCurrent && dateBirthday.getFullYear() === dateCurrent.getFullYear()) {
            message.textContent = 'В этом году у вас уже был день рождения. Измените значение года, чтобы узнать, сколько дней осталось до вашего следующего дня рождения.';
        }
        else if (dateBirthday < dateCurrent) {
            message.textContent = 'Вы неверно ввели год для расчета. Измените значение года.'
        }
        else {
            let diffDays = Math.floor(Math.abs(dateCurrent - dateBirthday) / 1000 / 60 / 60 / 24);
            message.textContent = `До вашего дня рождения ${declensionWords(diffDays)}.`
            message.style.color = 'black';
        }
    }
}


function declensionWords(dayNumber) {
    let rightMessage;
    let lastNumber = dayNumber % 100;
    if (lastNumber % 10 === 1 && lastNumber !== 11) {
        rightMessage = `остался ${dayNumber} день`;
    }
    else if ([2, 3, 4].includes(lastNumber % 10) && ![12, 13, 14].includes(lastNumber)) {
        rightMessage = `осталось ${dayNumber} дня`;
    }
    else {
        rightMessage = `осталось ${dayNumber} дней`;
    }
    return rightMessage
}

