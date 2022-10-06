import { renderBlock } from './lib.js'
import {getFavoritesAmount} from "./get-date.js";
import {APIlocal} from "./api-local.js";
import {IPlace} from "./interfaces.js";

export function renderSearchStubBlock () {
  renderBlock(
    'search-results-block',
    `
    <div class="before-results-block">
      <img src="img/start-search.png" />
      <p>Чтобы начать поиск, заполните форму и&nbsp;нажмите "Найти"</p>
    </div>
    `
  )
}

export function renderEmptyOrErrorSearchBlock (reasonMessage: string) {
  renderBlock(
    'search-results-block',
    `
    <div class="no-results-block">
      <img src="img/no-results.png" />
      <p>${reasonMessage}</p>
    </div>
    `
  )
}
export function booking(id: string): void {
console.log(id);
}
const getFavoriteList = () => {
  return APIlocal.get('favoriteItems').split(',');
}
export function toggleFavoriteItem (id: string) {
  const favoritesItem = getFavoriteList();
  const findItem = favoritesItem.find(itemId => itemId === id);
  if (findItem) {
    const newFavoritesItem = favoritesItem.filter(itemId => itemId !== id)
    APIlocal.set('favoriteItems', newFavoritesItem.join())
  }
  else {
    favoritesItem.push(id);
    APIlocal.set('favoriteItems', favoritesItem.join())
  }
  const getFavoritesItemCount = localStorage.getItem('favoriteItems').split(',').length - 1;
  APIlocal.set('count', `${getFavoritesItemCount}`);
  getFavoritesAmount();
}

export function renderSearchResultsBlock (places: Array<IPlace>) {
  let itemContent = ''
  places.forEach(item => {
    itemContent += `
      <li class="result">
        <div class="result-container">
          <div class="result-img-container">
            <div class="favorites js-favoriteToggle1" id=${item.id}></div>
            <img class="result-img" src=${item.image} alt="">
          </div>
          <div class="result-info">
            <div class="result-info--header">
              <p>${item.name}</p>
              <p class="price">${item.price}&#8381;</p>
            </div>
            <div class="result-info--map"><i class="map-icon"></i> ${item.remoteness}км от вас</div>
            <div class="result-info--descr">${item.description}</div>
            <div class="result-info--footer">
              <div>
                <button id="${item.id}b" class="book">Забронировать</button>
              </div>
            </div>
          </div>
        </div>
      </li>
    `
  });
  renderBlock(
    'search-results-block',
    `
    <div class="search-results-header">
        <p>Результаты поиска</p>
        <div class="search-results-filter">
            <span><i class="icon icon-filter"></i> Сортировать:</span>
            <select>
                <option selected="">Сначала дешёвые</option>
                <option selected="">Сначала дорогие</option>
                <option>Сначала ближе</option>
            </select>
        </div>
    </div>
    <ul class="results-list">${itemContent}</ul>
`)

  const favoriteButton = document.querySelectorAll('.js-favoriteToggle1');
  for (let i = 0; i < favoriteButton.length; i++) {
    favoriteButton[i].addEventListener('click',
      () => {
        favoriteButton[i].classList.toggle('active');
        toggleFavoriteItem(favoriteButton[i].id);
      });
  }

  const book = document.querySelectorAll('.book');
  for (let i = 0; i < book.length; i++) {
    book[i].addEventListener('click',
      () => {
        booking(book[i].id);
      });
  }
}
