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

type CommunitiesProps = {
  selectedCommunity: Community | undefined;
  handleCommunityChange: (event: SelectChangeEvent) => void;
};

const Communities: FC<CommunitiesProps> = ({
  selectedCommunity,
  handleCommunityChange,
}) => {
  const [communities, setCommunities] = useState<Community[]>([]);

  useEffect(() => {
    GeoApi.getCommunities().then((communities) => {
      setCommunities(communities);
    });
  }, []);

  return (
    <FormControl
      variant="filled"
      sx={{ m: 1, minWidth: 120 }}
      style={{ background: "wheat" }}
    >
      <InputLabel id="select-community">Comunidad</InputLabel>
      <Select
        labelId="select-community"
        id="select-community"
        value={JSON.stringify(selectedCommunity) || ""}
        label="Community"
        onChange={handleCommunityChange}
      >
        {communities.map((community) => (
          <MenuItem key={community.code} value={JSON.stringify(community)}>
            {community.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Communities;
