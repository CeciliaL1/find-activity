import { RouterProvider } from "react-router";
import "./App.css";
import { Router } from "./Router";
import { SearchContext } from "./context/SearchContext";
import {  useReducer } from "react";
import { SearchReducer } from "./reducer/SearchReducer";
import { WeatherContext } from "./context/WeatherContext";
import { WeatherReducer } from "./reducer/WeatherReducer";

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

  const [weather, weatherDispatch] = useReducer(WeatherReducer, {
    forecastDays: [
      {
        dayTimeForecast: {
          uvIndex: 0,
          precipitation: {
            probability: {
              percent: 0,
              type: "",
            },
            gpf: {
              quantity: 0,
              unit: "",
            },
            snowQpf: {
              quantity: 0,
              unit: "",
            },
          },
          relativeHumidity: 0,
          weatherCondition: {
            description: { text: "", languageCode: "" },
            iconBaseUri: "",
            type: "",
          },
          wind: {
            direction: { degrees: 0, cardinal: "" },
            gust: { value: 0, unit: "" },
            speed: { value: 0, unit: "" },
          },
        },
        maxTemperature: { degrees: 0, unit: "" },
        minTemperature: { degrees: 0, unit: "" },
        feelsLikeMaxTemperature: { degrees: 0, unit: "" },
        feelsLikeMinTemperature: { degrees: 0, unit: "" },
        interval: { endTime: "", startTime: "" },
        sunEvents: { sunriseTime: "", sunsetTime: "" },
      },
    ],
  });

  return (
    <>
      <SearchContext.Provider value={{ search, searchDispatch }}>
        <WeatherContext.Provider value={{ weather, weatherDispatch }}>
          <RouterProvider router={Router}></RouterProvider>
        </WeatherContext.Provider>
      </SearchContext.Provider>
    </>
  );
}

export default App;
