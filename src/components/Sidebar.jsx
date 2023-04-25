import React from "react";
import { Box, Typography,Button ,styled } from "@mui/material";
import LogoPng from "../assets/Vector.png";
import { useQuery, gql } from "@apollo/client";
import Tabs from "../components/Tabs";

const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;
  border: 2px solid yellow;
  position: absolute;
  width: 150px;
  height: 176px;
  left: 32px;
  top: 102px;
`;

const Logo = styled("img")({
  position: "absolute",
  left: "0.71%",
  right: "0.71%",
  top: "1.18%",
  bottom: "0.29%",
});

const PlaylistName = styled(Button)`
width: auto;
height: auto;
font-family: 'Varela Round';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 22px;
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
  if (!playlists.loading) console.log(playlists.data.getPlaylists[0].title);

  return (
    <Box>
      <Logo src={LogoPng} />
      <Wrapper>
        {!playlists.loading &&
          playlists.data.getPlaylists.map((playlist) => (
            <PlaylistName onClick={()=>setClickedPlaylist({id:playlist.id,name:playlist.title})} key={playlist.id}>{playlist.title}</PlaylistName>
          ))}
      </Wrapper>
    </Box>
  );
};

export default Sidebar;
