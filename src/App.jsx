import {Box , styled} from "@mui/material";
import LeftLayout from "./components/LeftLayout";
import Player from "./components/Player";

const Wrapper = styled(Box)`
 border:2px solid red;
 display:flex;
 background:gray;
 height:100vh;
 width:100vw;
`;

const Leftpane = styled(Box)`
display:flex;
border:2px solid blue;
width:auto;
height:auto;
`;


const App = ()=>{

  return (
   <Wrapper> 
       <Leftpane>
         <LeftLayout/>
       </Leftpane>
       <Box>
           <Player/>
       </Box>
   
   
   </Wrapper>
  )

}


export default App;