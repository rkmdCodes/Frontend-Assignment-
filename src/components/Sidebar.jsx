import React from "react";
import { Box, Typography,Button ,styled } from "@mui/material";
import LogoPng from "../assets/Vector.png";
import { useQuery, gql } from "@apollo/client";
import Tabs from "../components/Tabs";
import { useContext } from "react";
import { DataContext } from "../contex/DataProvider";

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

const Sidebar = () => {
  const playlists = useQuery(GET_PLAYLISTS);
  const { setClickedPlaylist } = useContext(DataContext);
  const { clickedPlaylist } = useContext(DataContext);
  const {playlistList}  = useContext(DataContext);
  const {setPlaylistList}  = useContext(DataContext);
   if(!playlists.loading && playlistList.length === 0)
      setPlaylistList([...playlists.data.getPlaylists]);
  console.log(playlistList);
  const styleCurrent = {
    opacity: "0.4",
  };
 
  return (
    <Box sx={{display:{xs:"none",sm:"none",md:"block",lg:"block"}}}>
     <Logo src={LogoPng} />
      <Wrapper mt="28px" gap="10px" marginLeft="32px" flex={3}>
       
       { !playlists.loading &&
          playlists.data.getPlaylists.map((playlist,index) => {
            {
            
             if(playlist.id === clickedPlaylist.id)
             {
              return <PlaylistName style={{opacity:"0.8"}} onClick={()=>setClickedPlaylist({id:playlist.id,name:playlist.title})} key={playlist.id}>{playlist.title}</PlaylistName>
              }
            }
            return <PlaylistName style={styleCurrent} onClick={()=>setClickedPlaylist({id:playlist.id,name:playlist.title})} key={playlist.id}>{playlist.title}</PlaylistName>
       })}

      </Wrapper>
      </Box>
  );
};

export default Sidebar;
