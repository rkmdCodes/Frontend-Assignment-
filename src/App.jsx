import { Box, styled, Stack,Container } from "@mui/material";
import LeftLayout from "./components/LeftLayout";
import Player from "./components/Player";
import {useState} from "react";

const Wrapper = styled(Container)`
  
  background: black;
`;

const Leftpane = styled(Box)(({ theme }) => ({
  display: "flex",
  "flex-direction": "column",

}));

const App = () => {
 
  const [songUrl, setSongUrl] = useState({
    photo:"",
    url:"",
  });
  console.log("this is song",songUrl);
  return (
    <Box  bgcolor={"black"} height="100vh" >
      <Stack 
        direction="row"
        spacing={0}
        justifyItems="center"
      >
        <LeftLayout setSongUrl={setSongUrl}  />
        <Player songUrl={songUrl} />
      </Stack>
    </Box>
  );
};

export default App;
