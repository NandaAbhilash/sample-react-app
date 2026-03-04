import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { getSeismicData } from "../api/actions";

interface SeismicProps {
  cityQuery: string;
}

const Seismic: React.FC<SeismicProps> = ({ cityQuery }) => {
  const [data, setData] = useState<SeismicData>();
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
    getSeismicData(cityQuery)
      .then((res) => {
        setError("");
        setData(res);
      })
      .catch((err) => {
        setData(undefined);
        setError(String(err));
      })
      .finally(() => {
        setLoadingState(false);
      });
  }, [cityQuery]);

  const formattedTimestamp = useMemo(() => {
    if (!data?.timestamp) {
      return "N/A";
    }

    const parsedDate = new Date(data.timestamp);
    if (Number.isNaN(parsedDate.getTime())) {
      return data.timestamp;
    }

    return parsedDate.toLocaleString();
  }, [data?.timestamp]);

  return (
    <Card className="w-full max-w-[400px]">
      <CardHeader className="flex gap-3">
        <h2 className="text-lg font-semibold">Seismic Data</h2>
      </CardHeader>
      <Divider />
      {loadingState ? (
        <CardBody>
          <div className="flex flex-col items-center">
            <p className="text-xl font-bold">Loading seismic data...</p>
          </div>
        </CardBody>
      ) : data ? (
        <CardBody>
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold capitalize">{data.city}</h1>
            <p className="text-3xl font-bold">
              Magnitude: {data.magnitude !== null ? data.magnitude : "N/A"}
            </p>
            <p className="text-lg">Depth: {data.depth !== null ? `${data.depth} km` : "N/A"}</p>
            <p className="text-lg">Latitude: {data.latitude}</p>
            <p className="text-lg">Longitude: {data.longitude}</p>
            <p className="text-lg">Event Time: {formattedTimestamp}</p>
          </div>
        </CardBody>
      ) : (
        <CardBody>
          <div className="flex flex-col items-center">
            <p className="text-xl font-bold">Search for a city to view seismic data</p>
          </div>
        </CardBody>
      )}
      <Divider />
      <CardFooter>
        <div className="flex flex-col items-left">
          {error && <p className="text-xs text-red-600">{error}</p>}
          {data && <p className="text-xs text-gray-600">Last update successful.</p>}
          {!data && !loadingState && (
            <p className="text-xs text-gray-600">Waiting for input...</p>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default Seismic;
