import {renderSearchFormBlock, search} from './search-form.js'
import { renderSearchStubBlock } from './search-results.js'
import { renderUserBlock } from './user.js'
import { renderToast } from './lib.js'
import {getFavoritesAmount, getUserData} from "./get-date.js";

window.addEventListener('DOMContentLoaded', () => {
  renderUserBlock('Maria', "https://flomaster.club/uploads/posts/2021-11/1637950591_1-flomaster-club-p-risunki-solnishka-s-luchikami-dlya-detei-d-1.jpg", 0);
  renderSearchFormBlock()
  renderSearchStubBlock()
  renderToast(
    {text: 'Это пример уведомления. Используйте его при необходимости', type: 'success'},
    {name: 'Понял', handler: () => {console.log('Закрыли')}}
  )
  getUserData()
  getFavoritesAmount()
})
