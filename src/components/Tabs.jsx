import React, { useState } from "react";
import { makeStyles } from '@mui/styles';
import { Box, Typography, styled, Stack } from "@mui/material";
import { useQuery, gql } from "@apollo/client";
import SongItem from "./SongItem";
import { useEffect } from "react";
const Wrapper = styled(Box)``;

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
  width: "65%",
  height: "8%",
  background: "transparent",
  "border-radius": "5px",
  color: "#ffffff",
});

const StyledName = styled(Typography)`
  margin-top: "32px";
  margin-left: "32px";
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
      url,
    }
  }`;

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

  const songs = useQuery(GET_SONGS, {
    variables: { playlistId: 1, search: "" },
  });

  return (
    <Wrapper flex={2}>
      <StyledName mt="30px" ml="32px">
        {playlistName}
      </StyledName>
      <StyledInput
        fontFamily="Varela Round"
        color="white"
        type="search"
        placeholder="Search..."
        value={search}
        onChange={(event) => setSearchString(event.target.value)}
      />

      <Stack
        direction="column"
        alignItems="left"
        className={classes.root}
        style={{
          height: "70%",
          overflow: "auto",
        }}
      >
        {!songs.loading &&
          songs.data.getSongs.map((song) => (
            <SongItem setSongUrl={setSongUrl} key={song.id} details={song} />
          ))}
      </Stack>
    </Wrapper>
  );
};

export default Tabs;
