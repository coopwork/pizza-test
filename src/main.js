import { getRenderProducts, getPresentsList, sendDeliveryForm } from './api.js';
import { createProductCards, createPresentsList } from './createDOM.js';
import { fakePresents, fakeProducts } from './fakeData.js';
import { interactiveDOM } from './interactiveUI.js';
import { validation } from './validations.js';
import '../assets/libs/glightbox/glightbox.min.js'
import { Request } from './fetch.js';


export const jsonPlaceholder = new Request('https://jsonplaceholder.typicode.com');
export const localData = new Request(`../assets/data`);

document.addEventListener('DOMContentLoaded', async () => {
  const parentsBlocks = { // FAKE: can delete this
    presents: document.querySelector('[data-fetching="presents"]'),
    products: document.querySelector('[data-fetching="products"]'),
  }

  try {
    await getPresentsList(localData)
    createPresentsList({ parent: parentsBlocks.presents, presents: fakePresents }) // FAKE: can delete this
  } catch (error) {
    console.log('error from get presentation list', error);
  }
  try {
    await getRenderProducts(localData)
    createProductCards({ parent: parentsBlocks.products, products: fakeProducts }) // FAKE: can delete this
  } catch (error) {
    console.log('error from get products list', error);
  }
  try {
    await validation()
  } catch (error) {
    console.error('validation error', error);
  }

  try {
    interactiveDOM?.burger?.elements?.open?.forEach(element => {
      element.addEventListener('click', interactiveDOM.burger.actions.open)
    });

    interactiveDOM?.burger?.elements?.close?.forEach(element => {
      element.addEventListener('click', interactiveDOM.burger.actions.close)
    });
  } catch (error) {
    console.error('Burger has broken:', error);
  }

  try {
    const deliveryForm = document.querySelector('form.delivery__form');
    deliveryForm.addEventListener('submit', sendDeliveryForm)
  } catch (error) {
    console.error('Form error', error);
  }

  try {
    interactiveDOM?.modal?.elements?.open?.forEach(element => {
      element.addEventListener('click', interactiveDOM.modal.actions.open)
    });

    interactiveDOM?.modal?.elements?.close?.forEach(element => {
      element.addEventListener('click', interactiveDOM.modal.actions.close)
    });
  } catch (error) {
    console.error('Modal some error:', error);
  }

  try {
    const glightbox = GLightbox({
      touchNavigation: true,
      loop: true,
      autoplayVideos: true
    });
  } catch (error) {
    console.error('Glightbox error', error);
  }



})
