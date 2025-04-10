import { createContext, Dispatch } from "react";
import { ISearch } from "../models/ISearch";

interface ISearchContext {
  search: ISearch;
  searchDispatch: Dispatch<IActionSearch>;
}
export interface IActionSearch {
  type: SearchEnum;
  payload: ISearch;
}

export enum SearchEnum {
  SEARCH,
}

export const SearchContext = createContext<ISearchContext>({
  search: {
    age: [0, 100],
    price: [0, 1000],
    date: "",
    checks: [
      {
        label: "",
        value: true,
      },
    ],
  },
  searchDispatch: () => {},
});
