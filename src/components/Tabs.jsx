import React from "react";
import { Box, Typography ,styled } from "@mui/material";
import { useQuery, gql } from "@apollo/client";
import SongItem from "./SongItem";

const Wrapper = styled(Box)`
  position: absolute;
  width: 432px;
  height: 862px;
  left: 280px;
  top: 32px;
  border: 2px solid green;
`;

const StyledName = styled(Typography)`
width: auto;
height: 36px;
margin-top:20px;
margin-left:10px;
font-family: 'Varela Round';
font-weight: 700;
font-size: 28px;
color: #FFFFFF;
`; 

const Tabs = ({ playlist }) => {
  console.log("inside tabs ", playlist);
  const playlistId = playlist.id;
  const playlistName = playlist.name;

  const GET_SONGS = gql`
  query {
    getSongs(playlistId: ${playlistId}) {
      title,
      photo,
      duration,
      artist,
    }
  }
`;

  const songs = useQuery(GET_SONGS);
  if (!songs.loading) console.log(songs.data.getSongs);

  return <Wrapper>
     <StyledName>{playlistName}</StyledName>
     {!songs.loading && 
         songs.data.getSongs.map((song)=><SongItem key={song.id} details={song}/>)
     } 
   </Wrapper>;
};

export default Tabs;
