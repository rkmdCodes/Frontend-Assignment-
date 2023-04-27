import { Box, styled, Stack, Container } from "@mui/material";
import LeftLayout from "./components/LeftLayout";
import Player from "./components/Player";
import { useState } from "react";



const BlurBox = styled(Box)`
backdrop-filter: blur(100px);
`;

const Wrapper = styled(Box)`
`;


const Leftpane = styled(Box)(({ theme }) => ({
  display: "flex",
  "flex-direction": "column",
}));

const App = () => {

  const [songUrl, setSongUrl] = useState({
    photo: "https://images.genius.com/e95f361c27487088fd9dddf8c967bf89.500x500x1.jpg",
    url: "https://storage.googleapis.com/similar_sentences/Imagine%20Dragons%20-%20West%20Coast%20(Pendona.com).mp3",
    index:0,
    playlist:1
  });
  return (
    <Wrapper height="100vh"
    sx={{backgroundImage: `linear-gradient(
      to right,
      rgba(0, 0, 0, 0.6),
      rgba(0, 0, 0, 0.9)
    ),
    url(${songUrl.photo});
    background-size: cover;
    
  `}}>
    <BlurBox height="100vh" >
    <Stack direction="row" spacing={0} justifyItems="center" >
      <LeftLayout setSongUrl={setSongUrl} />
      <Player songUrl={songUrl} setSongUrl={setSongUrl}/>
    </Stack>
    </BlurBox>
  </Wrapper>
  
      
    
  );
};

export default App;
