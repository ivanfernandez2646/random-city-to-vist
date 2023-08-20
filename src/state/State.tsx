import { atom, selector } from "recoil";
import { Community } from "../types/Community";
import { Province } from "../types/Province";
import { City } from "../types/City";

export const communitiesState = atom<Community[]>({
  key: "communitiesState",
  default: [],
});

export const provincesState = atom<Province[]>({
  key: "provincesState",
  default: [],
});

export const citiesState = atom<Map<string, City[]>>({
  key: "citiesState",
  default: new Map(),
});

export const selectedCommunityState = atom<Community | undefined>({
  key: "selectedCommunityState",
  default: undefined,
});

export const selectedProvinceState = atom<Province | undefined>({
  key: "selectedProvinceState",
  default: undefined,
});

export const filteredProvincesState = selector<Province[]>({
  key: "filteredProvincesState",
  get: ({ get }) => {
    const provinces = get(provincesState),
      selectedCommunity = get(selectedCommunityState);

    if (!provinces || !selectedCommunity) {
      return [];
    }

    return provinces.filter(
      (province) => province.communityCode === selectedCommunity.code
    );
  },
});

export const randomCityState = selector<City | undefined>({
  key: "randomCityState",
  get: ({ get }) => {
    const selectedProvince = get(selectedProvinceState),
      filtredCities = get(citiesState).get(selectedProvince?.code || "");

    if (!selectedProvince || !filtredCities?.length) {
      return undefined;
    }

    return filtredCities[
      Math.floor(Math.random() * filtredCities.length)
    ] as City;
  },
});
