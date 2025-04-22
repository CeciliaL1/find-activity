export interface IForecastDays {
  foreCastDays: IWeather[];
}

interface IWeather {
  dayTimeForecast: IDaytimeForecast;
  feelsLikeMaxTemperature: ITemp;
  feelsLikeMinTemperature: ITemp;
  interval: IInterval;
  maxTemperature: ITemp;
  minTemperature: ITemp;
  sunEvents: ISunEvents;
}
/**********************************************
 * Interface for IDayForeCast
 ************************************************/

interface IDaytimeForecast {
  uvIndex: number;
  precipitation: IPrecipitation;
  relativeHumidity: number;
  weatherCondition: IWeatherCondition;
  wind: IWind;
}

/* Models for wind */
interface IWind {
  direction: IWindDirection;
  gust: IWindGust;
  speed: IWindGust;
}

interface IWindDirection {
  degrees: number;
  cardinal: string;
}

interface IWindGust {
  value: number;
  unit: string;
}
/* Models for weathercondition */
interface IWeatherCondition {
  description: IWeatherDescription;
  iconBaseUri: string;
  type: string;
}

interface IWeatherDescription {
  text: string;
  languageCode: string;
}

/* Models for Precipitation */
interface IPrecipitation {
  probability: IPropability;
  gpf: IUnit;
  snowQpf: IUnit;
}

interface IPropability {
  percent: number;
  type: string;
}
interface IUnit {
  quantity: number;
  unit: string;
}

/*****************************************************
 * interface for ITemp
 *****************************************************/

interface ITemp {
  degrees: number;
  unit: string;
}

/*********************************************
 * interface for Interval
 *******************************************/
interface IInterval {
  endTime: string;
  startTime: string;
}

/************************************************
 * interface for sunEvents
 ************************************************/
interface ISunEvents {
  sunriseTime: string;
  sunsetTime: string;
}
