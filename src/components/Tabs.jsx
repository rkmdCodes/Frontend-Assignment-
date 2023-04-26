import React, { useState } from "react";
import { Box, Typography, styled , Stack} from "@mui/material";
import { useQuery, gql } from "@apollo/client";
import SongItem from "./SongItem";
import { useEffect } from "react";
const Wrapper = styled(Box)`
  border: 2px solid green;
`;

const StyledInput = styled('input')({
   'margin-left':"32px",
   'margin-top':'36px',
   'width':'65%',
   'height':'8%',
   'background':'transparent',
   'border-radius':'5px',
   'color':'#ffffff',
});

const StyledName = styled(Typography)`
  margin-top:"32px";
  margin-left:"32px";
  width: auto;
  height: 36px; 
  font-family: "Varela Round";
  font-weight: 700;
  font-size: 32px;
  color: #ffffff;
  border:'0px'
`;

const Tabs = ({ playlist }) => {
  const [search, setSearchString] = useState("");
  const normal = "";
  const playlistId = playlist.id;
  const playlistName = playlist.name;
  const work = "S";

  // const GET_SONGS = gql`
  // query{
  //   getSongs(playlistId: ${playlistId},search:"${search}") {
  //     title,
  //     photo,
  //     duration,
  //     artist,
  //   }
  // }`;

  const dataTemp = [
    {
      id: "1",
      title: "For You",
      artist: "Rajat",
      photo:
        "https://images.genius.com/e95f361c27487088fd9dddf8c967bf89.500x500x1.jpg",
    },
    {
      id: "2",
      title: "Top Songs",
      artist: "Rajat",
      photo:
        "https://images.genius.com/e95f361c27487088fd9dddf8c967bf89.500x500x1.jpg",
    },
    {
      id: "3",
      title: "Three",
      artist: "Rajat",
      photo:
        "https://images.genius.com/e95f361c27487088fd9dddf8c967bf89.500x500x1.jpg",
    },
    {
      id: "4",
      title: "Five",
      artist: "Rajat",
      photo:
        "https://images.genius.com/e95f361c27487088fd9dddf8c967bf89.500x500x1.jpg",
    },
    {
      id: "5",
      title: "Summer Vibes",
      artist: "Emma",
      photo:
        "https://images.genius.com/e95f361c27487088fd9dddf8c967bf89.500x500x1.jpg",
    },
    {
      id: "6",
      title: "Throwback Jams",
      artist: "Sophie",
      photo:
        "https://images.genius.com/e95f361c27487088fd9dddf8c967bf89.500x500x1.jpg",
    },
    
  ];

  // console.log("type = ",typeof(GET_SONGS));
  // console.log("value = ",GET_SONGS);

  //old
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

  // const songs =  useQuery(GET_SONGS,
  //  {variables:{"playlistId":1,"search":""}},
  // );

  // console.log("songs array is = ",songs);

  return (
    <Wrapper flex={2}>
      <StyledName mt="30px" ml="32px">{playlistName}</StyledName>
      <StyledInput
      fontFamily="Varela Round"
       color="white"
        type="search"
        placeholder="Search..."
        value={search}
        onChange={(event) => setSearchString(event.target.value)}
      />
      {/*{ !songs.loading && 
         songs.data.getSongs.map((song)=><SongItem key={song.id} details={song}/>)
     } */}
     <Stack direction="column" alignItems="left">
      {dataTemp.map((song) => (
        <SongItem marginLeft="32px" key={song.id} details={song} />
      ))}
      </Stack>
    </Wrapper>
  );
};

export default Tabs;
