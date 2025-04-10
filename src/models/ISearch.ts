export interface ISearch {
  age: number[];
  checks: IChecks[];
  date: string;
  price: number[];
}

export interface IChecks {
  label: string;
  value: boolean;
}
