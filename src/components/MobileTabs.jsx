import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box, Typography, styled, Stack, Skeleton } from "@mui/material";
import { useQuery, gql } from "@apollo/client";
import SongItem from "./SongItem";
import { useContext } from "react";
import { DataContext } from "../contex/DataProvider";
import { GET_SONGS_SEARCH } from "../graphQL/query";
import Next from "../assets/Next.png";
import Prev from "../assets/Prev.png";
import {
  Loading,
  StyledInput,
  StyledStack,
  StyledName,
  Logo
} from "../Styles/TabStyles";

const useStyles = makeStyles({
  root: {
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
});

const MobileTabs = () => {
  const classes = useStyles();
  const { clickedPlaylist } = useContext(DataContext);
  const { setClickedPlaylist } = useContext(DataContext);
  const [search, setSearchString] = useState("");
  const playlistId = clickedPlaylist.id;
  const playlistName = clickedPlaylist.name;
  const { playlistList } = useContext(DataContext);

  const handleNext = () => {
    if (clickedPlaylist.id < playlistList.length)
      setClickedPlaylist({ ...clickedPlaylist, id: clickedPlaylist.id + 1 });
  };

  const handlePrev = () => {
    if (clickedPlaylist.id >= 2)
      setClickedPlaylist({ ...clickedPlaylist, id: clickedPlaylist.id - 1 });
  };

  const songs = useQuery(GET_SONGS_SEARCH, {
    variables: { playlistId: clickedPlaylist.id, search: search },
  });

  return (
    <Box
      maxHeight="70vh"
      sx={{
        display: {
          xs: "block",
          sm: "block",
          md: "block",
          lg: "block",
        },
        overflow: "clip",
      }}
    >
      <Stack direction="row" justifyContent="space-between" spacing={0}>
        <Box onClick={handlePrev}>
          <Logo paddingTop="32px" src={Prev} />
        </Box>
        <Box>
          <StyledName mt="15px" alignItem="flex-start">
            {playlistList.length
              ? playlistList[clickedPlaylist.id - 1].title
              : "Loading..."}
          </StyledName>
        </Box>
        <Box onClick={handleNext}>
          <Logo marginTop="32px" src={Next} />
        </Box>
      </Stack>

      <StyledInput
        fontFamily="Varela Round"
        color="white"
        type="search"
        placeholder="Search Songs"
        value={search}
        onChange={(event) => setSearchString(event.target.value)}
      />
      <Box sx={{ overflow: "clip" }}>
        <Box>
          <StyledStack
            direction="column"
            alignItems="left"
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
                    width: "85%",
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
                    width: "85%",
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
                    width: "85%",
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
                    width: "85%",
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
                    width: "85%",
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

export default MobileTabs;
