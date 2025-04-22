import axios from "axios";
import { IForecastDays } from "../models/IWeather";

export const getWeather = async (
  lat: number,
  lng: number
): Promise<IForecastDays> => {
  const response = await axios.get<IForecastDays>(
    `https://weather.googleapis.com/v1/forecast/days:lookup?key=${
      import.meta.env.VITE_GOOGLE_API_KEY
    }&location.latitude=${lat}&location.longitude=${lng}`
  );
  return response.data;
};
