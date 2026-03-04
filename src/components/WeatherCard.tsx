import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { TiWeatherDownpour, TiWeatherSunny } from "react-icons/ti";
import { getWeatherData } from "../api/actions";

interface WeatherCardProps {
  cityQuery: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ cityQuery }) => {
  const [data, setData] = useState<WeatherData>();
  const [loadingState, setLoadingState] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!cityQuery) {
      setData(undefined);
      setError("");
      setLoadingState(false);
      return;
    }

    setLoadingState(true);
    getWeatherData(cityQuery)
      .then((res) => {
        setError("");
        setData(res);
      })
      .catch((error) => {
        setData(undefined);
        setError(error);
      })
      .finally(() => {
        setLoadingState(false);
      });
  }, [cityQuery]);

  return (
    <Card className="w-full max-w-[400px]">
      <CardHeader className="flex gap-3">
        <h2 className="text-lg font-semibold">Weather Data</h2>
      </CardHeader>
      <Divider />
      {loadingState ? (
        <CardBody>
          <div className="flex flex-col items-center">
            <p className="text-xl font-bold">Loading weather data...</p>
          </div>
        </CardBody>
      ) : data ? (
        <CardBody>
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold">{data.city}</h1>
            {data.temperature > 20 ? (
              <div>
                <TiWeatherSunny className="w-36 h-36" />
              </div>
            ) : (
              <div>
                <TiWeatherDownpour className="w-36 h-36" />
              </div>
            )}
            <p className="text-3xl font-bold">{data.temperature}°C</p>
            <p className="text-lg">Humidity: {data.humidity}%</p>
            <p className="text-lg">Wind: {data.wind} km/h</p>
            <p className="text-lg">Rain: {data.rain} %</p>

          </div>

        </CardBody>
      ) : (
        <CardBody>
          <div className="flex flex-col items-center">
            <p className="text-xl font-bold">Search for a city to view weather</p>
          </div>
        </CardBody>
      )}
      <Divider />
      <CardFooter>
        <div className="flex flex-col items-left">
          {error && <p className="text-xs text-red-600 ">{error}</p>}
          {data && (
            <p className="text-xs  text-gray-600 ">Last update successful.</p>
          )}
          {!data && !loadingState && (
            <p className="text-xs  text-gray-600 ">Waiting for input...</p>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default WeatherCard;
