import { renderBlock } from './lib.js'
import {APIlocal} from "./api-local.js";

export function renderUserBlock (name: string, avatar: string, favoriteItemsAmount?: number) {
  const items: number | string = Boolean(favoriteItemsAmount) ? favoriteItemsAmount : 'ничего нет';

  APIlocal.set('nameUser', name);
  APIlocal.set('avatarUser', avatar);
  renderBlock(
    'user-block',
    `
    <div class="header-container">
      <img class="avatar" src="${avatar}" alt="Wade Warren" />
      <div class="info">
          <p class="name">${name}</p>
          <p class="fav">
            <i class="heart-icon${Boolean(favoriteItemsAmount) ? ' active' : ''}"></i>${items}
          </p>
      </div>
    </div>
    `
  )
}
