export interface IUser {
  userName: string;
  avatar: string;
}
export interface ISearchFormData {
  checkIn: number | string;
  checkOut: number | string;
  maxPrice: number | string;
}
export interface IPlace {
  id: number;
  image: string;
  name: string;
  description: string;
  remoteness: number;
  bookedDates: number[];
  price: number;
}

