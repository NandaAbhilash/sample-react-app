interface WeatherData {
  city: string;
  temperature: number;
  humidity: number;
  wind: number;
  rain: number;
}

interface SeismicData {
  city: string;
  magnitude: number | null;
  depth: number | null;
  latitude: string;
  longitude: string;
  timestamp: string | null;
}
