import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Community } from "../../types/Community";
import { GeoApi } from "../../services/GeoApi";
import { Province } from "../../types/Province";

type ProvincesProps = {
  selectedCommunity: Community | undefined;
  selectedProvince: Province | undefined;
  handleProvinceChange: (event: SelectChangeEvent) => void;
};

const Provinces: FC<ProvincesProps> = ({
  selectedCommunity,
  selectedProvince,
  handleProvinceChange,
}) => {
  const [provinces, setProvinces] = useState<Community[]>([]);

  useEffect(() => {
    if (selectedCommunity) {
      GeoApi.getProvincesByCommunity(selectedCommunity).then((provinces) => {
        setProvinces(provinces);
      });
    }
  }, [selectedCommunity]);

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
        {provinces.map((province) => (
          <MenuItem key={province.code} value={JSON.stringify(province)}>
            {province.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Provinces;
