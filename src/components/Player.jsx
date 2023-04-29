import React from "react";
import { Box, styled, Typography, Stack } from "@mui/material";
import MobileTabs from "./MobileTabs";

const DesktopView = styled(Box)(({ theme }) => ({
  display: "block",
  [theme.breakpoints.down("md")]: {
    display: "none",

  },
}));

const MobileView = styled(Box)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("md")]: {
    display: "block",
    
  },
}));

import { useContext } from "react";
import { DataContext } from "../contex/DataProvider";
import { AlbumArt } from "./PlayerCSS";
import AudioPlayer from "./AudioPlayer";

const PhotoWrapper = styled(Box)`
  animation-name: fadeIn;
  animation-duration: 0.9s;
  animation-fill-mode: forwards;
  transition: "all 0.5s ease", @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const SongName = styled(Typography)`
  font-family: "Varela Round";
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  color: #ffffff;
`;

const ArtistName = styled(Box)`
  font-family: "Varela Round";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: #ffffff;
  opacity: 0.6;
`;

function Player() {
  const { songContex } = useContext(DataContext);
  const { setSongContex } = useContext(DataContext);
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
