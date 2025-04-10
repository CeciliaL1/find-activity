export interface ISearch {
  age: number[];
  checks: IChecks[];
  date: number;
  price: number[];
}

export interface IChecks {
  label: string;
  value: boolean;
}
