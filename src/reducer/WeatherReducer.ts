import { IActionWeather, WeatherEnum } from "../context/WeatherContext";
import { IForecastDays } from "../models/IWeather";

export const WeatherReducer = (
  weather: IForecastDays,
  action: IActionWeather
) => {
  switch (action.type) {
    case WeatherEnum.ADDED:
      return action.payload;
    default:
      return weather;
  }
};
