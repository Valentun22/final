export class AdvertisementResDto {
  advertisement_id: string;
  title: string;
  description: string;
  body: string;
  status: string;
  region: string;
  user_id: string;
  car: {
    car_id: string;
    year: number;
    color: string;
    mileage: number;
    prise: number;
    currency: string;
    accidents: string;
    image: string;
    availability_of_registration: string;
  };
}
