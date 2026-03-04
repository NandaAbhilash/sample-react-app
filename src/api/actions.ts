import axios, { AxiosError } from "axios";

const API_URL = "https://cautious-space-winner-g479w7v4rgqr39x55-3000.app.github.dev/api";
const SEISMIC_API_URL = "https://65ca483b3b05d29307e01640.mockapi.io/api/seismic";

export const getWeatherData = async (city: string): Promise<WeatherData> => {
  return new Promise<WeatherData>((resolve, reject) => {
    axios
      .get(`${API_URL}/weather/${city}`)
      .then((res) => {
        resolve({
          city: city,
          temperature: res.data.temperature,
          humidity: res.data.humidity,
          wind: res.data.wind,
          rain: res.data.rain,
        });
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response?.status === 404) {
            reject("City not found");
          } else {
            // It's a good practice to reject with an Error object
            reject(axiosError.message);
          }
        } else {
          // Handle non-Axios errors
          reject("An unknown error occurred");
        }
      });
  });
};

export const getSeismicData = async (city: string): Promise<SeismicData> => {
  return new Promise<SeismicData>((resolve, reject) => {
    axios
      .get(`${SEISMIC_API_URL}/${city.toLowerCase()}`)
      .then((res) => {
        const payload = res.data;
        const rawMagnitude = payload?.magnitude ?? payload?.magnitute;
        const rawDepth = payload?.depth;
        const rawTimestamp = payload?.timestamp ?? payload?.time;

        resolve({
          city: payload?.id ?? city,
          magnitude:
            rawMagnitude === undefined || rawMagnitude === null
              ? null
              : Number(rawMagnitude),
          depth:
            rawDepth === undefined || rawDepth === null ? null : Number(rawDepth),
          latitude: String(payload?.latitude ?? "N/A"),
          longitude: String(payload?.longitude ?? "N/A"),
          timestamp: rawTimestamp ? String(rawTimestamp) : null,
        });
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response?.status === 404) {
            reject("Seismic data not found");
          } else {
            reject(axiosError.message);
          }
        } else {
          reject("An unknown error occurred");
        }
      });
  });
};
