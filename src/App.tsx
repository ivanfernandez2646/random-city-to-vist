import { useEffect } from "react";
import logo from "./logo.png";
import "./App.css";
import { GeoApi } from "./services/GeoApi";
import { Community } from "./types/Community";
import { Province } from "./types/Province";
import Communities from "./components/communities/Communities";
import Provinces from "./components/provinces/Provinces";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import {
  useRecoilRefresher_UNSTABLE,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import {
  citiesState,
  communitiesState,
  provincesState,
  randomCityState,
  selectedProvinceState,
} from "./state/State";

function App() {
  const [, setCommunities] = useRecoilState(communitiesState),
    [, setProvinces] = useRecoilState(provincesState),
    [cities, setCities] = useRecoilState(citiesState),
    selectedProvince = useRecoilValue(selectedProvinceState),
    randomCity = useRecoilValue(randomCityState),
    refreshRandomCity = useRecoilRefresher_UNSTABLE(randomCityState);

  useEffect(() => {
    Promise.all([GeoApi.getCommunities(), GeoApi.getProvinces()]).then(
      ([communities, provinces]: [Community[], Province[]]) => {
        setCommunities(communities);
        setProvinces(provinces);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRefreshNewCity = (event: any) => {
    generateNewCity();
  };

  useEffect(() => {
    if (!selectedProvince) {
      return;
    }

    if (cities.get(selectedProvince.code)) {
      refreshRandomCity();
      return;
    }

    GeoApi.getCitiesByProvince(selectedProvince).then((fetchedCities) => {
      setCities(new Map(cities.set(selectedProvince.code, fetchedCities)));
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProvince]);

  function generateNewCity(): void {
    if (selectedProvince) {
      refreshRandomCity();
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Communities />
        <Provinces />
        <h1>{randomCity?.name}</h1>
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
