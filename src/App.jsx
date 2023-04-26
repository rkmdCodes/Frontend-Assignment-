import { Box, styled, Stack,Container } from "@mui/material";
import LeftLayout from "./components/LeftLayout";
import Player from "./components/Player";

const Wrapper = styled(Container)`
  border: 2px solid red;
  background: black;
`;

const Leftpane = styled(Box)(({ theme }) => ({
  display: "flex",
  "flex-direction": "column",
  border: "2px solid blue",
}));

const App = () => {
  return (
    <Box  bgcolor={"black"} height="100vh" >
      <Stack 
        direction="row"
        spacing={0}
        justifyItems="center"
      >
        <LeftLayout  />
        <Player  />
      </Stack>
    </Box>
  );
};

export default App;
