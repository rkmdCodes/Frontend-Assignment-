import { Box, styled, Stack, Container } from "@mui/material";
import LeftLayout from "./components/LeftLayout";
import Player from "./components/Player";
import {useState,useContext} from "react";
import { DataContext } from "./contex/DataProvider";

const BlurBox = styled(Box)`
backdrop-filter: blur(100px);
`;

const Leftpane = styled(Box)(({ theme }) => ({
  display: "flex",
  "flex-direction": "column",
}));

const App = () => {

  const {songContex} = useContext(DataContext);

  // const [songUrl, setSongUrl] = useState({
  //   photo: "https://images.genius.com/e95f361c27487088fd9dddf8c967bf89.500x500x1.jpg",
  //   url: "https://storage.googleapis.com/similar_sentences/Imagine%20Dragons%20-%20West%20Coast%20(Pendona.com).mp3",
  //   index:0,
  //   playlist:1,
  //   title:""
  // });
  return (
    <Box height="100vh"
    sx={{backgroundImage: `linear-gradient(
      to right,
      rgba(0, 0, 0, 0.6),
      rgba(0, 0, 0, 0.9)
    ),
    url(${songContex.photo});
    background-size: cover;
    transition: 'background-image 0.5s ease-in-out';
  `}}>
    <BlurBox height="100vh" >
    <Stack direction="row" spacing={0} justifyItems="center" >
      <LeftLayout />
      <Player />
    </Stack>
    </BlurBox>
  </Box>
  );
};

export default App;
