import React from "react";
import { Box, Typography,Button ,styled } from "@mui/material";
import LogoPng from "../assets/Vector.png";
import { useQuery, gql } from "@apollo/client";
import Tabs from "../components/Tabs";

const Wrapper = styled(Box)`
  mt:'32px';
  display: flex;
  flex-direction: column;
  
`;


const Logo = styled("img")({
  "margin-top":"32px",
  "margin-left":"32px"
});

const PlaylistName = styled(Typography)`
gap:"100px";
font-family: 'Varela Round';
font-style: normal;
font-size: 20px;
color: #FFFFFF;
opacity: 0.4;
`; 

const GET_PLAYLISTS = gql`
  query {
    getPlaylists {
      id
      title
    }
  }
`;

const Sidebar = ({setClickedPlaylist}) => {
  const playlists = useQuery(GET_PLAYLISTS);

  return (
    <Box>
     <Logo src={LogoPng} />
      <Wrapper mt="28px" gap="10px" marginLeft="32px" flex={3}>
      
       { !playlists.loading &&
          playlists.data.getPlaylists.map((playlist) => (
            <PlaylistName onClick={()=>setClickedPlaylist({id:playlist.id,name:playlist.title})} key={playlist.id}>{playlist.title}</PlaylistName>
          ))}

      </Wrapper>
      </Box>
  );
};

export default Sidebar;
