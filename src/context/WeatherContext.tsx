import { createContext, Dispatch } from "react";
import { IForecastDays } from "../models/IWeather";

interface IWeatherContext {
  weather: IForecastDays;
  weatherDispatch: Dispatch<IActionWeather>;
}
export interface IActionWeather {
  type: WeatherEnum;
  payload: IForecastDays;
}

export enum WeatherEnum {
  ADDED,
}

export const WeatherContext = createContext<IWeatherContext>({
  weather: {
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
  },
  weatherDispatch: () => {},
});
