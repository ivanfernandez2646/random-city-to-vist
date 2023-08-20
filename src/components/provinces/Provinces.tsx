import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { FC } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  filteredProvincesState,
  selectedProvinceState,
} from "../../state/State";

const Provinces: FC = () => {
  const [selectedProvince, setSelectedProvince] = useRecoilState(
      selectedProvinceState
    ),
    filteredProvinces = useRecoilValue(filteredProvincesState);

  const handleProvinceChange = (event: any) => {
    setSelectedProvince(JSON.parse(event.target.value));
  };

  return (
    <FormControl
      variant="filled"
      sx={{ m: 1, minWidth: 120 }}
      style={{ background: "lightblue" }}
    >
      <InputLabel id="select-province">Provincia</InputLabel>
      <Select
        labelId="select-province"
        id="select-province"
        value={JSON.stringify(selectedProvince) || ""}
        label="Province"
        onChange={handleProvinceChange}
      >
        {filteredProvinces.map((province) => (
          <MenuItem key={province.code} value={JSON.stringify(province)}>
            {province.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Provinces;
