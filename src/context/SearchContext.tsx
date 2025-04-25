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
    search: false,
    age: [0, 100],
    price: [0, 1000],
    date: "",
    checks: [
      {
        label: "",
        value: true,
        searchWord: "",
      },
    ],
    location: { lat: 0, lng: 0 },
    mapZoom: 0,
  },
  searchDispatch: () => {},
});
