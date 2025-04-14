export interface ISearch {
  search: boolean;
  age: number[];
  checks: IChecks[];
  date: string;
  price: number[];
  location: ILocation;
  mapZoom: number;
}

export interface IChecks {
  label: string;
  value: boolean;
}

export interface ILocation {
  lat: number;
  lng: number;
}
