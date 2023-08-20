import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { FC } from "react";

import { useRecoilState, useRecoilValue } from "recoil";
import { communitiesState, selectedCommunityState } from "../../state/State";

const Communities: FC = () => {
  const [selectedCommunity, setSelectedCommunity] = useRecoilState(
      selectedCommunityState
    ),
    communities = useRecoilValue(communitiesState);

  const handleCommunityChange = (event: any) => {
    setSelectedCommunity(JSON.parse(event.target.value));
  };

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
