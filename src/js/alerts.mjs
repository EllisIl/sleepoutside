import { getData } from './productData.mjs'

const alerts = await getData('alerts');
const sectionEl = document.querySelector('main');

function findAlert() {
    if (alerts.length >= 1){
        const alertEl = document.createElement('section');
        alertEl.classList.add("alert-list");
        alerts.forEach(element => {
            const infoEl = document.createElement('p');
            infoEl.innerHTML = element.message;
            infoEl.style.color = element.color;
            infoEl.style.backgroundColor = element.background;
            alertEl.appendChild(infoEl);
        });
        sectionEl.prepend(alertEl);
    }
}

findAlert();