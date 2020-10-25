import './main.less';
import './main.html';

let pets = [];
let fullPetsList = []; // 48

const request = new XMLHttpRequest();
request.open('GET', 'pages/main/pets.json');
request.onload = () => {
  pets = JSON.parse(request.response);

  fullPetsList = (() => {
    let tempArr = [];

    for (let i = 0; i < 6; i++) {
      const newPets = pets;
      for (let j = pets.length; j > 0; j--) {
        let randIndex = Math.floor(Math.random() * j);
        const randElem = newPets.splice(randIndex, 1)[0];
        newPets.push(randElem);
      }
      tempArr = [...tempArr, ...newPets];
    }

    return tempArr;
  })();

  fullPetsList = sort863(fullPetsList);

  createPets(fullPetsList);

  for (let i = 0; i < (fullPetsList.length / 6); i++) {
    const stepList = fullPetsList.slice(i * 6, (i * 6) + 6);

    for (let j = 0; j < 6; j++) {
      stepList.forEach((item, index) => {
        if (item.name === stepList[j].name && (index !== j)) {
          document.querySelector('#test').children[(i * 6) + j].style.border = '5px solid red';
        }
      })
    }
  }
}

request.send();

const sort863 = (list) => {
  list = sort6recursively(list);

  return list;
}

const sort6recursively = (list) => {
  let length = list.length;

  for (let i = 0; i < (length / 6); i++) {
    const stepList = list.slice(i * 6, (i * 6) + 6);

    for (let j = 0; j < 6; j++) {
      const duplicatedElem = stepList.find((item, index) => {
        return (item.name === stepList[j].name && (index !== j));
      })
      if (duplicatedElem !== undefined) {
        const index = (i * 6) + j;
        const which8OfList = Math.trunc(index / 8);

        const elem = list.splice(index, 1)[0];
        list.splice(which8OfList * 8, 0, elem);

        sort6recursively(list);
      }
    }
  }

  return list
}

const createPets = (petsList) => {
  let slider = document.querySelector('#test');
  slider.innerHTML += createElements(petsList);
}

const createElements = (petsList) => {
  let str = '';
  for (let i = 0; i < petsList.length; i++) {
    str += `<img src="${get_src(petsList[i].img, petsList[i].name)}">`;
  }
  return str;
}

function get_random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function get_src(src, name) {
  let low_name = name.toLowerCase();
  let new_src = src.replace(low_name, `pets-${low_name}`).replace('images', 'img');
  return new_src.replace('../..', '');
}

/*
function get_current_indices(cards) {
  let current_indices = [];
  for (let card of cards) {
    let name = card.querySelector('.slider__name');
    data.forEach((item, index) => (item["name"] == name.innerHTML) ? current_indices.push(index) : '');
  }
  return current_indices;
}

function popup_over(evt) {
  if (!popup_background.contains(evt.target)) popup_close.classList.add('btn-close--hover');
  else if (popup_background.contains(evt.target)) popup_close.classList.remove('btn-close--hover');
}

const cards = document.querySelectorAll('.slider__item');
const popup = document.querySelector('.popup');
const popup_info = {
  name: popup.querySelector('.popup__name'),
  type: popup.querySelector('.popup__type'),
  img: popup.querySelector('img'),
  breed: popup.querySelector('.popup__breed'),
  description: popup.querySelector('.popup__description'),
  age: popup.querySelector('.popup__age'),
  inoculations: popup.querySelector('.popup__inoculations'),
  diseases: popup.querySelector('.popup__diseases'),
  parasites: popup.querySelector('.popup__parasites')
}
const popup_close = document.querySelector('.btn-close');
const popup_background = popup.querySelector('.popup__background');
let current_indices = get_current_indices(cards);

document.addEventListener('click', function(evt) {
  if (evt.target.parentNode.classList.contains('slider__item') || evt.target.classList.contains('slider__item')) {
    let current_name;
    if (evt.target.parentNode.classList.contains('slider__item')) {
      current_name = evt.target.parentNode.querySelector('.slider__name').innerHTML;
    } else if (evt.target.classList.contains('slider__item')) {
      current_name = evt.target.querySelector('.slider__name').innerHTML;
    }
    const current_index = data.indexOf(data.find(item => item["name"] == current_name));
    const current_item = data[current_index];

    for (let key of Object.keys(current_item)) {
      if (key == 'img') {
        popup_info[`${key}`].src = get_src(current_item["img"], current_item["name"]);
        popup_info[`${key}`].alt = current_item["name"];
      }
      popup_info[`${key}`].innerHTML = current_item[`${key}`];
    }

    popup.classList.remove('popup--close');

    document.addEventListener('mouseover', popup_over);
  } else if (!popup.classList.contains('popup--close') && !popup.querySelector('.popup__background').contains(evt.target)) {
    popup.classList.add('popup--close');
    document.removeEventListener('mouseover', popup_over);
  }
})

const btns = document.querySelectorAll('.slider__btn');
btns.forEach(btn => btn.addEventListener('click', function() {
  let indices = [];
  for (let i = 0; i < 3; i++) {
    let index;
    do {
      index = get_random(0, data.length);
    } while (indices.includes(index) || current_indices.includes(index))
    indices.push(index);
  }

  for (let card of cards) {
    const card_name = card.querySelector('.slider__name');
    const card_img = card.querySelector('img');

    card_name.innerHTML = data[indices[0]]['name'];
    card_img.alt = card_name.innerHTML;
    card_img.src = get_src(data[indices[0]]['img'], card_name.innerHTML);

    indices.shift();
  }

  current_indices = get_current_indices(cards);
}))

const nav_btn = document.querySelector('.nav-menu__toggler');
const menu = document.querySelector('.nav-menu__list');
document.addEventListener('click', function(evt) {
      if (evt.target == nav_btn && !menu.classList.contains('nav-menu__list--show')) {
        nav_btn.classList.toggle('nav-menu__toggler--open');
        menu.classList.toggle('nav-menu__list--show');
        document.body.classList.toggle('lock');
      } else if (menu.classList.contains('nav-menu__list--show') && !menu.contains(evt.target)) {
        nav_btn.classList.toggle('nav-menu__toggler--open');
        menu.classList.toggle('nav-menu__list--show');
        document.body.classList.toggle('lock');
      }
})
*/
