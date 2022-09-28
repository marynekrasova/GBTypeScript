
export function getUserData () {
  const avatar: string = localStorage.getItem('avatarUser');
  const name: string = localStorage.getItem('nameUser');
   console.log(`Name user ${name} and link avatar ${avatar}`);
}
export function getFavoritesAmount () {
  const count: number | string = localStorage.getItem('count');
  console.log(`Count ${count}`);
}
