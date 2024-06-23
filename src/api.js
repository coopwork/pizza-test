import { createProductCards, createPresentsList, createReloadButton } from './createDOM.js';
import { interactiveDOM } from './interactiveUI.js';
import { jsonPlaceholder } from './main.js';


export async function getPresentsList(request) {
  const parent = document.querySelector('[data-fetching="presents"]');
  try {
    const presents = await request.get('/presents.json')
    createPresentsList({ parent, presents })
  } catch (error) {
    createReloadButton({ parent, action: 'presents', text: 'Произошла ошибка загрузки данных, нажмите обновить' })
  }
}

export async function getRenderProducts(request) {
  const parent = document.querySelector('[data-fetching="products"]');
  try {
    const products = await request.get('/products.json')
    createProductCards({ parent, products })
  } catch (error) {
    createReloadButton({ parent, action: 'products', text: 'Произошла ошибка загрузки данных, нажмите обновить' })
  }
}

export async function sendDeliveryForm(event) {
  event.preventDefault()

  const
    formErrorElement = event.target.querySelector('.form__errors'),
    addFormError = (error) => {
      const li = document.createElement('li');
      li.textContent = error;
      formErrorElement.appendChild(li);
    },
    formData = new FormData(event.target),
    deliveryData = {
      name: formData.get('name'),
      address: formData.get('address'),
      tel: formData.get('phone').replace(/\s/g, '').replace(/[()]/g, ''),
    };

  formErrorElement.textContent = ''

  if (deliveryData.name.length < 2) {
    addFormError('Имя должно содержать минимум 2 символа')
    return
  }

  if (!deliveryData.address.trim()) {
    addFormError('Некорректный адрес')
    return
  }

  if (deliveryData.tel.length < 12) {
    addFormError('Некорректный номер телефона')
    return
  }

  const response = await jsonPlaceholder.post('/posts', deliveryData)

  if (+response.id > 100) {
    const modalContent = document.createElement('h4');

    modalContent.className = 'color-accent text-center'
    modalContent.textContent = 'Спасибо за заказ!'

    interactiveDOM.modal.actions.open({ content: modalContent, timerMS: 10000 })
    return
  }

  addFormError('Ошибка сервера! Неудалось оформить заказ')

}