import { IActionSearch, SearchEnum } from "../context/SearchContext";
import { ISearch } from "../models/ISearch";

export const SearchReducer = (
  search: ISearch,
  action: IActionSearch
): ISearch => {
  switch (action.type) {
    case SearchEnum.SEARCH:
      return action.payload;
    default:
      return search;
  }
};
