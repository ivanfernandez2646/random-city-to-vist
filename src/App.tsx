import { useEffect, useState } from "react";
import logo from "./logo.png";
import "./App.css";
import { GeoApi } from "./services/GeoApi";
import { Community } from "./types/Community";
import { Province } from "./types/Province";
import { City } from "./types/City";
import { SelectChangeEvent } from "@mui/material";
import Communities from "./components/communities/Communities";
import Provinces from "./components/provinces/Provinces";
import AutorenewIcon from "@mui/icons-material/Autorenew";

function App() {
  const [selectedCommunity, setSelectedCommunity] = useState<Community>();
  const [selectedProvince, setSelectedProvince] = useState<Province>();
  const [randomCity, setRandomCity] = useState<City>();

  const handleCommunityChange = (event: SelectChangeEvent) => {
    setSelectedCommunity(JSON.parse(event.target.value));
  };

  const handleProvinceChange = (event: any) => {
    setSelectedProvince(JSON.parse(event.target.value));
  };

  const handleRefreshNewCity = (event: any) => {
    generateNewCity();
  };

  useEffect(() => {
    generateNewCity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProvince]);

  function generateNewCity(): void {
    if (selectedProvince) {
      GeoApi.getRandomCityByProvince(selectedProvince).then((city) =>
        setRandomCity(city)
      );
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Communities
          handleCommunityChange={handleCommunityChange}
          selectedCommunity={selectedCommunity}
        />
        <Provinces
          handleProvinceChange={handleProvinceChange}
          selectedCommunity={selectedCommunity}
          selectedProvince={selectedProvince}
        />
        <h1>{randomCity?.name || "SIN SELECCIÓN"}</h1>
        {randomCity ? (
          <AutorenewIcon
            fontSize="large"
            color="secondary"
            onClick={handleRefreshNewCity}
            style={{ cursor: "pointer" }}
          />
        ) : (
          <></>
        )}
      </header>
    </div>
  );
}

export default App;
