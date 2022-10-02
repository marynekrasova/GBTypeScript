import {APIlocal} from "./api-local";
import {IUser} from "./interfaces";

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
  console.log(`Count ${count}`);
}
