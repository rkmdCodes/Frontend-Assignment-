import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box, Typography, styled, Stack, Skeleton } from "@mui/material";
import { useQuery, gql } from "@apollo/client";
import SongItem from "./SongItem";

const StyledStack = styled(Stack)`
  "::hover": {
    backgroundColor: "#fff",
  },

}
`;

const Loading = styled(Skeleton)`

className={classes.songItem}

ml="10px"
width="80%"
`;

const useStyles = makeStyles({
  root: {
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
});

const StyledInput = styled("input")({
  "margin-left": "32px",
  "margin-top": "36px",
  width: "78%",
  height: "6%",
  background: "rgba(255, 255, 255, 0.06)",
  "border-radius": "10px",
  color: "#ffffff",
  "font-family": "Varela Round",
  "font-size": "20px",
  "padding-left": "20px",
  "padding-top": "2px",
  "::placeholder": {
    "padding-top": "2px",
    color: "white",
    "font-family": "Varela Round",
    opacity: "0.2",
    "font-size": "20px",
  },
  outline: "none",
  border: "none",
  "box-sizing": "border-box",
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
    <Box flex={7} sx={{ paddingLeft: "32px" }}>
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
        marginLeft="20px"
        marginTop="22px"
        gap="5px"
        className={classes.root}
        style={{
          height: "570px",
          overflow: "auto",
        }}
      >
        {!songs.loading &&
          songs.data.getSongs.map((song, index) => (
            <SongItem
              key={index}
              playlistId={playlistId}
              index={index}
              details={song}
            />
          ))}
        {songs.loading && (
          <Stack direction="column">
            <Loading
              sx={{
                bgcolor: "grey.999",
                borderRadius: "10px",
                mt: "0px",
                ml: "10px",
                width: "80%",
              }}
              animation="wave"
              variant="text"
              height={120}
            />
            <Loading
              sx={{
                bgcolor: "grey.999",
                borderRadius: "10px",
                mt: "0px",
                ml: "10px",
                width: "80%",
              }}
              animation="wave"
              variant="text"
              height={120}
            />
            <Loading
              sx={{
                bgcolor: "grey.999",
                borderRadius: "10px",
                mt: "0px",
                ml: "10px",
                width: "80%",
              }}
              animation="wave"
              variant="text"
              height={120}
            />
            <Loading
              sx={{
                bgcolor: "grey.999",
                borderRadius: "10px",
                mt: "0px",
                ml: "10px",
                width: "80%",
              }}
              animation="wave"
              variant="text"
              height={120}
            />
            <Loading
              sx={{
                bgcolor: "grey.999",
                borderRadius: "10px",
                mt: "0px",
                ml: "10px",
                width: "80%",
              }}
              animation="wave"
              variant="text"
              height={120}
            />
          </Stack>
        )}
      </StyledStack>
    </Box>
  );
};

export default Tabs;
