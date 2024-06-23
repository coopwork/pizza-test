import { getRenderProducts, getPresentsList } from './api.js';
import { localData } from './main.js';

const actions = {
  'products': () => getRenderProducts(localData),
  'presents': () => getPresentsList(localData),
}

export function createPresentsList({ parent, presents }) {
  parent.textContent = ''
  parent.className = 'hero__presents'
  presents.forEach(present => {
    const
      item = document.createElement('div'),
      icon = document.createElement('img'),
      textContent = document.createElement('div'),
      title = document.createElement('h5'),
      text = document.createElement('p');

    item.className = 'hero__present__item'
    icon.setAttribute('src', present.icon)
    icon.setAttribute('alt', present.title)
    icon.setAttribute('loading', 'lazy')
    textContent.className = 'hero__present__item__text'
    title.className = 'color-primary uppercase'
    title.textContent = present.title
    text.className = 'color-secondary'
    text.textContent = present.description

    item.appendChild(icon)
    item.appendChild(textContent)
    textContent.appendChild(title)
    textContent.appendChild(text)

    parent.appendChild(item)
  });
}

export function createProductCards({ parent, products }) {
  parent.textContent = ''
  parent.className = 'products__list';
  products.forEach(product => {
    const
      card = document.createElement('article'),
      cardContent = document.createElement('div'),
      cardFooter = document.createElement('div'),
      cardFullImageLink = document.createElement('a'),
      cardImage = document.createElement('img'),
      cardTitle = document.createElement('h5'),
      cardDescription = document.createElement('p'),
      cardButton = document.createElement('button');

    card.className = 'card';
    cardContent.className = 'card__content';
    cardTitle.className = 'text-center';
    cardDescription.className = 'text-center';
    cardFooter.className = 'card__footer w-full';
    cardButton.className = 'btn btn-primary w-full';
    cardButton.textContent = 'В корзину';
    cardFullImageLink.className = 'glightbox';
    cardFullImageLink.setAttribute('data-gallery', 'products');
    cardFullImageLink.setAttribute('href', product.image);
    cardImage.setAttribute('src', product.image)
    cardImage.setAttribute('alt', product.title)
    cardImage.setAttribute('loading', 'lazy')
    cardTitle.textContent = product.title;
    cardDescription.textContent = product.description;

    card.appendChild(cardContent)
    card.appendChild(cardFooter)
    cardContent.appendChild(cardFullImageLink)
    cardFullImageLink.appendChild(cardImage)
    cardContent.appendChild(cardTitle)
    cardContent.appendChild(cardDescription)
    cardFooter.appendChild(cardButton)

    parent.appendChild(card)
  });
}

export function createReloadButton({ parent, action, text }) {
  parent.textContent = ''
  parent.className = ''

  const
    wrapper = document.createElement('div'),
    title = document.createElement('h6'),
    button = document.createElement('button');

  wrapper.style.display = 'flex'
  wrapper.style.flexDirection = 'column'
  wrapper.style.alignItems = 'center'
  wrapper.style.gap = '2.5rem'
  title.className = 'text-center'
  title.textContent = text

  button.className = 'btn btn-primary btn-lg'
  button.textContent = 'Обновить'
  button.addEventListener('click', actions[action]);

  wrapper.appendChild(title)
  wrapper.appendChild(button)

  parent.appendChild(wrapper)
}