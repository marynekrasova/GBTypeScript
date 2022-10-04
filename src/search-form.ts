import { renderBlock } from './lib.js'
import {ISearchFormData} from "./interfaces.js";
import {renderSearchResultsBlock, toggleFavoriteItem} from "./search-results.js";
import {place} from "./date.js";

function dateToUnixStamp(date) {
  return date.getTime() / 1000;
}

function responseToJson(requestPromise) {
  return requestPromise
    .then((response) => {
      return response.text()
    })
    .then((response) => {
      return JSON.parse(response)
    })
}
export function search ({checkIn, checkOut, maxPrice}: ISearchFormData) {
  renderSearchResultsBlock (place);
  // let url = `http://localhost:3030/places?` +
  //   `checkIn=${dateToUnixStamp(checkIn)}&` +
  //   `checkOut=${dateToUnixStamp(checkOut)}&` +
  //   `coordinates=59.9386,30.3141`
  //
  // if (maxPrice != null) {
  //   url += `&maxPrice=${maxPrice}`
  // }
  // return responseToJson(fetch(url))
}

export function renderSearchFormBlock () {
  const dateObj: Date = new Date();
  const datePlus2 = new Date(dateObj.getDate() + 2 * 86400000);

  const minDate = dateObj.toLocaleDateString('en-CA');
  const curDate = dateObj.toLocaleDateString('en-CA');
  const minOutDate = datePlus2.toLocaleDateString('en-CA');

  dateObj.setMonth(dateObj.getMonth() + 2);
  dateObj.setDate(0);
   const maxOutDate = dateObj.toLocaleDateString('en-CA');

  renderBlock(
    'search-form-block',
    `
    <form>
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" disabled value="Санкт-Петербург" />
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
          <!--<div class="providers">
            <label><input type="checkbox" name="provider" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div>--!>
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" type="date" value="${curDate}" min="${minDate}" max="${maxOutDate}" name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" value="${curDate}" min="${minOutDate}" max="${maxOutDate}" name="checkout" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="text" value="" name="price" class="max-price" />
          </div>
            <div>
            <div><div class="button-search" id='searchAp'>Найти</div></div>
          </div>
        </div>
      </fieldset>
    </form>
    `
  )
  const checkIn = document.getElementById('check-in-date');
  const checkOut = document.getElementById('check-in-date');
  const maxPrice = document.getElementById('max-price');
  let checkInValue: string = '';
  let checkOutValue: string = '';
  let maxPriceValue: string = '';
  checkIn.addEventListener('change', (event) => {
     checkInValue = event.target.value;
  });
  checkOut.addEventListener('change', (event) => {
    checkOutValue = event.target.value;
  });
  maxPrice.addEventListener('change', (event) => {
    maxPriceValue = event.target.value;
  });
  const buttonSearchAp = document.getElementById('searchAp');
  buttonSearchAp.addEventListener('click',
    () => {
    search({checkIn: checkInValue,checkOut: checkOutValue, maxPrice: maxPriceValue})
    });
}
