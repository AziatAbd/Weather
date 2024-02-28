import axios from "axios";
import { ReactNode, createContext, useEffect, useState } from "react";

interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

interface Condition {
  text: string;
  icon: string;
  code: number;
}

interface CurrentWeather {
  last_updated_epoch: number;
  last_updated: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: Condition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;
}

interface Forecastday {
  date: string;
  date_epoch: number;
  day: { maxtemp_c: string; mintemp_c: string; condition: Condition };
}

interface Forecast {
  forecastday: Forecastday[];
}

interface WeatherData {
  location: Location;
  current: CurrentWeather;
  forecast: Forecast;
}

type CitiesList = {
  name: string;
  url: string;
};

type CityContextType = {
  city: WeatherData | null;
  citiesList: CitiesList[];
  isLoading: boolean;
  error: boolean;
  setApi: (str: string) => void;
  getWeather: () => void;
};

type Props = {
  children: ReactNode;
};

export const CityContext = createContext<CityContextType | null>(null);

export const CityContextProvider = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [city, setCity] = useState<WeatherData | null>(null);
  const [citiesList, setCitiesList] = useState<CitiesList[]>([]);
  const [api, setApi] = useState<string>("");
  const [error, setError] = useState(false);

  const getWeather = async () => {
    setIsLoading(true);

    try {
      const { data } = await axios.get<WeatherData>(api);
      setCity(data);

      // Обновляем citiesList только если город еще не добавлен
      setCitiesList((prev) => {
        if (!prev.some((city) => city.name === data.location.region)) {
          return [
            ...prev,
            { name: data.location.region, url: api }, // Используем region вместо name
          ];
        }
        return prev;
      });
      setError(false);
    } catch (error) {
      setError(true);
      return error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getWeather();
  }, [api]);

  const data = {
    city,
    citiesList,
    isLoading,
    error,
    setApi,
    getWeather,
  };

  return <CityContext.Provider value={data}>{children}</CityContext.Provider>;
};
