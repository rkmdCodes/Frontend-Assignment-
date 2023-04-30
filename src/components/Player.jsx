import React from "react";
import { Box, styled, Typography, Stack } from "@mui/material";
import MobileTabs from "./MobileTabs";
import { useContext } from "react";
import { DataContext } from "../contex/DataProvider";
import { AlbumArt ,DesktopView,MobileView,PhotoWrapper,SongName,ArtistName } from "../Styles/PlayerStyles.jsx";
import AudioPlayer from "./AudioPlayer";


function Player() {
  const { songContex } = useContext(DataContext);
  return (
    <Box
      flex={1}
      sx={{ display: { xs: "flex", sm: "flex", md: "flex", lg: "flex" } }}
      alignItems="center"
      marginTop="20px"
      justifyContent="center"
    >
      <Stack  direction="column" spacing={0}>
        <DesktopView>
          <Box>
            <SongName>{songContex.title}</SongName>
            <ArtistName>{songContex.artist}</ArtistName>
          </Box>
          <PhotoWrapper paddingTop="20px">
            <AlbumArt alignContent="center" src={songContex.photo} />
          </PhotoWrapper>
        </DesktopView>
        <MobileView   >
          <MobileTabs/>
        </MobileView>
        <Box flex={2}>
          <AudioPlayer />
        </Box>
      </Stack>
    </Box>
  );
}

export default Player;
