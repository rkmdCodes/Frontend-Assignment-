import { useState, useContext } from "react";
import { Box, styled, Stack } from "@mui/material";
import LeftLayout from "../components/LeftLayout";
import Player from "../components/Player";
import { DataContext } from "../contex/DataProvider";

const BlurBox = styled(Box)`
  backdrop-filter: blur(100px);
  background-size: cover;
`;

const DesktopView = styled(Box)(({ theme }) => ({}));

const Home = () => {
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
      <BlurBox height="inherit">
        <Stack
          height="inherit"
          direction="row"
          spacing={0}
          justifyItems="center"
        >
          <LeftLayout />
          <Player />
        </Stack>
      </BlurBox>
    </DesktopView>
  );
};

export default Home;
