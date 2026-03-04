import "./App.css";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import NavBar from "./components/NavBar";
import Seismic from "./components/Seismic";
import WeatherCard from "./components/WeatherCard";

const App = () => {
  const [cityInput, setCityInput] = useState("");
  const [cityQuery, setCityQuery] = useState("");

  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="flex flex-1 overflow-auto flex-col items-center justify-center h-full w-full p-4 gap-6">
        <form
          className="w-full max-w-4xl"
          onSubmit={(e) => {
            e.preventDefault();
            setCityQuery(cityInput.trim());
          }}
        >
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Input
              id="cityname"
              type="text"
              label="City"
              value={cityInput}
              onChange={(e) => {
                setCityInput(e.target.value);
              }}
            />
            <Button className="sm:min-w-32" color="primary" type="submit">
              Search
            </Button>
          </div>
        </form>
        <div className="w-full max-w-4xl flex flex-col md:flex-row items-center md:items-stretch justify-center gap-6">
          <WeatherCard cityQuery={cityQuery} />
          <Seismic cityQuery={cityQuery} />
        </div>
      </div>
    </div>
  );
};

export default App;
