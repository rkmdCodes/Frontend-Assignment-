import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box, Typography, styled, Stack, Skeleton } from "@mui/material";
import { useQuery, gql } from "@apollo/client";
import SongItem from "./SongItem";
import { useContext } from "react";
import { DataContext } from "../contex/DataProvider";

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

const Tabs = () => {
  const classes = useStyles();
  const { clickedPlaylist } = useContext(DataContext);
  const {songContex} = useContext(DataContext);
  const [search, setSearchString] = useState("");
  const playlistId = clickedPlaylist.id;
  const playlistName = clickedPlaylist.name;

  const GET_SONGS = gql`
  query{
    getSongs(playlistId: ${playlistId},search:"${search}") {
      title,
      photo,
      duration,
      artist,
      url,
      _id
    }
  }`;

  const songs = useQuery(GET_SONGS, {
    variables: { playlistId: 1, search: "" },
  });

  return (
    <Box 
      sx={{
        display: {
          xs: "block",
          sm: "block",
          md: "block",
          lg: "block",
        },
        paddingLeft: "32px",
        overflow: "clip",
      }}
      flex={7}
    >
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
      <Box sx={{ overflow: "clip" }}>
        <Box  >
          <StyledStack
            direction="column"
            alignItems="left"
            marginLeft="20px"
            marginTop="22px"
            gap="5px"
            className={classes.root}
            style={{
              overflow: "auto",
              maxHeight: "100vh",
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
      </Box>
    </Box>
  );
};

export default Tabs;
