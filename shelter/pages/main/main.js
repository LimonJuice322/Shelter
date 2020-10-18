import './main.less';
import './main.html';

const data = [
  {
    "name": "Jennifer",
    "img": "../../assets/images/jennifer.png",
    "type": "Dog",
    "breed": "Labrador",
    "description": "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
    "age": "2 months",
    "inoculations": ["none"],
    "diseases": ["none"],
    "parasites": ["none"]
  },
  {
    "name": "Sophia",
    "img": "../../assets/images/sophia.png",
    "type": "Dog",
    "breed": "Shih tzu",
    "description": "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
    "age": "1 month",
    "inoculations": ["parvovirus"],
    "diseases": ["none"],
    "parasites": ["none"]
  },
  {
    "name": "Woody",
    "img": "../../assets/images/woody.png",
    "type": "Dog",
    "breed": "Golden Retriever",
    "description": "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
    "age": "3 years 6 months",
    "inoculations": ["adenovirus", "distemper"],
    "diseases": ["right back leg mobility reduced"],
    "parasites": ["none"]
  },
  {
    "name": "Scarlett",
    "img": "../../assets/images/scarlett.png",
    "type": "Dog",
    "breed": "Jack Russell Terrier",
    "description": "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
    "age": "3 months",
    "inoculations": ["parainfluenza"],
    "diseases": ["none"],
    "parasites": ["none"]
  },
  {
    "name": "Katrine",
    "img": "../../assets/images/katrine.png",
    "type": "Cat",
    "breed": "British Shorthair",
    "description": "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
    "age": "6 months",
    "inoculations": ["panleukopenia"],
    "diseases": ["none"],
    "parasites": ["none"]
  },
  {
    "name": "Timmy",
    "img": "../../assets/images/timmy.png",
    "type": "Cat",
    "breed": "British Shorthair",
    "description": "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
    "age": "2 years 3 months",
    "inoculations": ["calicivirus", "viral rhinotracheitis"],
    "diseases": ["kidney stones"],
    "parasites": ["none"]
  },
  {
    "name": "Freddie",
    "img": "../../assets/images/freddie.png",
    "type": "Cat",
    "breed": "British Shorthair",
    "description": "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
    "age": "2 months",
    "inoculations": ["rabies"],
    "diseases": ["none"],
    "parasites": ["none"]
  },
  {
    "name": "Charly",
    "img": "../../assets/images/charly.png",
    "type": "Dog",
    "breed": "Jack Russell Terrier",
    "description": "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
    "age": "8 years",
    "inoculations": ["bordetella bronchiseptica", "leptospirosis"],
    "diseases": ["deafness", "blindness"],
    "parasites": ["lice", "fleas"]
  }
]

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
      } else if (menu.classList.contains('nav-menu__list--show') && !menu.contains(evt.target)) {
        nav_btn.classList.toggle('nav-menu__toggler--open');
        menu.classList.toggle('nav-menu__list--show');
      }
})
