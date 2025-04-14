import { RouterProvider } from "react-router";
import "./App.css";
import { Router } from "./Router";
import { SearchContext } from "./context/SearchContext";
import { useReducer } from "react";
import { SearchReducer } from "./reducer/SearchReducer";

function App() {
  const [search, searchDispatch] = useReducer(SearchReducer, {
    search: false,
    age: [0, 100],
    date: "",
    price: [0, 1000],
    checks: [],
    location: { lat: 60.1282, lng: 18.6435 },
    mapZoom: 4,
  });

  return (
    <>
      <SearchContext.Provider value={{ search, searchDispatch }}>
        <RouterProvider router={Router}></RouterProvider>
      </SearchContext.Provider>
    </>
  );
}

export default App;
