import {APIlocal} from "./api-local.js";
import {IUser} from "./interfaces.js";
import {renderUserBlock} from "./user.js";

export function getUserData (): IUser | null {
  const avatar: string = APIlocal.get('avatarUser');
  const name: string = APIlocal.get('nameUser');

   if (name)
     try {
     return {userName: name, avatar: avatar};
      }
      catch (e) {
     throw new Error(e)
      }
   return null;
}
export function getFavoritesAmount () {
  const count: number | string = APIlocal.get('count');
  renderUserBlock('Maria', "https://flomaster.club/uploads/posts/2021-11/1637950591_1-flomaster-club-p-risunki-solnishka-s-luchikami-dlya-detei-d-1.jpg", +count);
}
