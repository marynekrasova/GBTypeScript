import { renderBlock } from './lib.js'
import {getFavoritesAmount} from "./get-date.js";
import {APIlocal} from "./api-local.js";
import {IPlace} from "./interfaces";

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
const getFavoriteList = () => {
  return localStorage.getItem('favoriteItems').split(',');
}
export function toggleFavoriteItem (id: string) {
  const favoritesItem = getFavoriteList();
  const findItem = favoritesItem.find(itemId => itemId === id);
  if (findItem) {
    const newFavoritesItem = favoritesItem.filter(itemId => itemId !== id)
    localStorage.setItem('favoriteItems', newFavoritesItem.join())
  }
  else {
    favoritesItem.push(id);
    localStorage.setItem('favoriteItems', favoritesItem.join())
  }
  const getFavoritesItemCount = localStorage.getItem('favoriteItems').split(',').length - 1;
  APIlocal.set('count', `${getFavoritesItemCount}`);
  getFavoritesAmount();
}

export function renderSearchResultsBlock (places: Array<IPlace>) {
  let itemContent = ''
  places.forEach(item => {
    itemContent += `
      <li class="result" id=${item.id}>
        <div class="result-container">
          <div class="result-img-container">
            <div class="favorites js-favoriteToggle1"></div>
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
                <button>Забронировать</button>
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

  const favoriteButton1 = document.querySelector('.js-favoriteToggle1');
  const favoriteButton2 = document.querySelector('.js-favoriteToggle2');

  favoriteButton1.addEventListener('click',
    () => {
    favoriteButton1.classList.toggle('active');
    toggleFavoriteItem('1');
  });
  favoriteButton2.addEventListener('click',
    () => {
      favoriteButton2.classList.toggle('active');
      toggleFavoriteItem('2');
    });
}
