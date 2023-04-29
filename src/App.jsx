import { Box, styled, Stack, Container } from "@mui/material";
import LeftLayout from "./components/LeftLayout";
import Player from "./components/Player";
import { useState, useContext } from "react";
import { DataContext } from "./contex/DataProvider";
import Tabs from "../src/components/Tabs";
import AudioPlayer from "./components/AudioPlayer";

const BlurBox = styled(Box)`
  backdrop-filter: blur(100px);
  background-size:cover;
`;


const DesktopView = styled(Box)(({ theme }) => ({

}));

const App = () => {
  const { songContex } = useContext(DataContext);

 
  return (
    
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
        <BlurBox  height="inherit">
          <Stack height="inherit" direction="row" spacing={0} justifyItems="center">
            <LeftLayout />
            <Player />
          </Stack>
        </BlurBox>
      </DesktopView>

  );
};

export default App;
