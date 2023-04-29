import { Box, styled, Stack, Container } from "@mui/material";
import LeftLayout from "./components/LeftLayout";
import Player from "./components/Player";
import { useState, useContext } from "react";
import { DataContext } from "./contex/DataProvider";
import Tabs from "../src/components/Tabs";
import AudioPlayer from "./components/AudioPlayer";

const BlurBox = styled(Box)`
  backdrop-filter: blur(100px);
`;

const MobileView = styled(Box)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("sm")]: {
    display: "flex",
  },
}));

const DesktopView = styled(Box)(({ theme }) => ({
  display: "block",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const App = () => {
  const { songContex } = useContext(DataContext);

 
  return (
    <>
      <DesktopView
      
        height="100vh"
        sx={{
          backgroundImage: `linear-gradient(
      to right,
      rgba(0, 0, 0, 0.6),
      rgba(0, 0, 0, 0.9)
    ),
    url(${songContex.photo});
    background-size: cover;
    transition: 'background-image 0.5s ease-in-out';
  `,
        }}
      >
        <BlurBox height="inherit">
          <Stack height="inherit" direction="row" spacing={0} justifyItems="center">
            <LeftLayout />
            <Player />
          </Stack>
        </BlurBox>
      </DesktopView>
      <MobileView
      height="100vh"
        sx={{
          backgroundImage: `linear-gradient(
    to right,
    rgba(0, 0, 0, 0.6),
    rgba(0, 0, 0, 0.9)
  ),
  url(${songContex.photo});
  background-size: cover;
  transition: 'background-image 0.5s ease-in-out';

`,
        }}
      >
        <BlurBox height="inherit">
          <Stack height="inherit" direction="column" spacing={0} justifyItems="center">
            <Tabs />
            <AudioPlayer bgColor="black" />
          </Stack>
        </BlurBox>
      </MobileView>
    </>
  );
};

export default App;
