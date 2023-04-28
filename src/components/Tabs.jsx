import React, { useState } from "react";
import { makeStyles } from '@mui/styles';
import { Box, Typography, styled, Stack } from "@mui/material";
import { useQuery, gql } from "@apollo/client";
import SongItem from "./SongItem";

const StyledStack = styled(Stack)`
  "::hover": {
    backgroundColor: "#fff",
  },

}
`;

const useStyles = makeStyles({
  root: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
});


const StyledInput = styled("input")({
  "margin-left": "32px",
  "margin-top": "36px",
  width: "78%",
  height: "6%",
  background: "rgba(255, 255, 255, 0.08)",
  "opacity":"0.2",
  "border-radius": "10px",
  color: "#ffffff",
  "backdrop-filter": "blur(200px)",
   "input:focus":{
    outline: 'none'
  },
  "::placeholder":{
    "margin-left":"10px",
    "color": "white",
    "font-family":"Varela Round",
    "opacity":"1.0",
    "font-size":"20px",
  }
});

const StyledName = styled(Typography)`
  width: auto;
  height: 36px;
  font-family: "Varela Round";
  font-weight: 700;
  font-size: 32px;
  color: #ffffff;
  border: "0px";
`;

const Tabs = ({ playlist, setSongUrl }) => {
  const classes = useStyles();
  const [search, setSearchString] = useState("");
  const playlistId = playlist.id;
  const playlistName = playlist.name;
 
  

  const GET_SONGS = gql`
  query{
    getSongs(playlistId: ${playlistId},search:"${search}") {
      title,
      photo,
      duration,
      artist,
      url,
    }
  }`;


  const songs = useQuery(GET_SONGS, {
    variables: { playlistId: 1, search: "" },
  });

  return (
    <Box flex={7} sx={{paddingLeft:"32px"}}>
      <StyledName mt="30px" ml="32px">
        {playlistName}
      </StyledName>
      <StyledInput
        fontFamily="Varela Round"
        color="white"
        type="search"
        placeholder="Search Songs"
        value={search}
        onChange={(event) => setSearchString(event.target.value)}
      />
      <StyledStack
        direction="column"
        alignItems="left"
        marginLeft="32px"
        marginTop="22px"
        gap="18px"
        className={classes.root}
        style={{
          height: "570px",
          overflow: "auto",
          
        }}
      >
        {!songs.loading &&
          songs.data.getSongs.map((song,index) => (
            <SongItem  key={index} playlistId={playlistId} index={index}  details={song} />
          ))}
      </StyledStack>
    </Box>
  );
};

export default Tabs;
