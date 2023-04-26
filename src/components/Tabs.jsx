import React , {useState} from "react";
import { Box, Typography ,styled } from "@mui/material";
import { useQuery, gql } from "@apollo/client";
import SongItem from "./SongItem";
import { useEffect } from "react";

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
 const [search, setSearchString] = useState("");
  const normal = ""; 
  const playlistId = playlist.id;
  const playlistName = playlist.name;
  const work = "S";
 
  const GET_SONGS = gql` 
  query{
    getSongs(playlistId: ${playlistId},search:"${search}") {
      title,
      photo,
      duration,
      artist,
    }
  }`;
  
  console.log("type = ",typeof(GET_SONGS));
  console.log("value = ",GET_SONGS);
  
  // const GET_SONGS = gql` 
  // query GetSongs($playlistId: Int!, $search: string!) {
  //   getSongs(playlistId: $playlistId, search: $search) {
  //     _id,
  //     artist,
  //     photo,
  //     url,
  //     title,
  //     duration,
  //   }
  // }
  // `;
  

  


  const songs =  useQuery(GET_SONGS, 
   {variables:{"playlistId":1,"search":""}},
  );


  console.log("songs array is = ",songs);


  return <Wrapper>
     <StyledName>{playlistName}</StyledName>
     <input type="text" placeholder="Search..." value={search} onChange={(event)=>setSearchString(event.target.value)}  />
     { !songs.loading && 
         songs.data.getSongs.map((song)=><SongItem key={song.id} details={song}/>)
     } 
   </Wrapper>;
};

export default Tabs;
