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


const dataTemp = [
  {
    "id":"1",
    "title":"For You"
  },
  {
    "id":"2",
    "title":"Top Songs"
  },
  {
    "id":"3",
    "title":"Three"
  },
  {
    "id":"4",
    "title":"Five"
  }

]

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
  if (!playlists.loading) console.log(playlists.data.getPlaylists[0].title);

  return (
    <Box>
     <Logo src={LogoPng} />
      <Wrapper mt="28px" flex={1}>
      
       { !playlists.loading &&
          playlists.data.getPlaylists.map((playlist) => (
            <PlaylistName onClick={()=>setClickedPlaylist({id:playlist.id,name:playlist.title})} key={playlist.id}>{playlist.title}</PlaylistName>
          ))}

      </Wrapper>
      </Box>
  );
};

export default Sidebar;
