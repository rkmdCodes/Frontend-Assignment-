import { useState } from "react";
import { Box, styled, Stack,Container } from "@mui/material";
import Sidebar from "./Sidebar";
import Tabs from "./Tabs";

const LeftLayout = ({setSongUrl}) => {
  const [clickedPlaylist, setClickedPlaylist] = useState({
    id: "1",
    name: "For You",
  });
  return (
    <Box flex={1} sx={{display:{xs:"none",sm:"block",md:"block"}}}>
      <Stack
        direction="row"
        spacing={5}
        justifyContent="space-between"
      >
        <Sidebar setClickedPlaylist={setClickedPlaylist} />
        <Tabs setSongUrl={setSongUrl} flexGrow={2} playlist={clickedPlaylist} search="Star" />
      </Stack>
    </Box>
  );
};

export default LeftLayout;
