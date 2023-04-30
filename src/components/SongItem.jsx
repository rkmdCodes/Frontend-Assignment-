import React from "react";
import { Box, styled, Typography } from "@mui/material";
import { Avatar } from "@mui/material";
import { useContext } from "react";
import { DataContext } from "../contex/DataProvider";
import { makeStyles } from "@mui/styles";
import { formatDuration } from "../utils/utilityFunctions";
import { SongTitle, SongItemWrapper, ArtistName } from "../Styles/SongItem";

const useStyles = makeStyles((theme) => ({
  songItem: {
    "&:hover": {
      background: "rgba(255, 255, 255, 0.06)",
      transition: "all 0.5s ease",
      transform: "scaleX(1.02)",
    },
  },
}));

const SongItem = ({ index, playlistId, details }) => {
  const classes = useStyles();

  const { songContex } = useContext(DataContext);
  const { setSongContex } = useContext(DataContext);
  const styleCurrent = {
    background: "",
    transition: "",
  };

  if (details._id === songContex.id) {
    styleCurrent.background = "rgba(255, 255, 255, 0.2)";
    styleCurrent.transition = "all 0.5s ease";
  }
  return (
    <SongItemWrapper
      style={styleCurrent}
      borderRadius="10px"
      padding="12px 12px 12px 12px"
      className={classes.songItem}
      display="flex"
      mt="10px"
      ml="10px"
      width="80%"
    >
      <Box display="flex" flex={1.2}>
        <Avatar
          alt="song pic"
          src={`${details.photo}`}
          style={{ width: "50px", height: "50px" }}
        />
      </Box>
      <Box
        flex={9}
        justifyContent="space-between"
        onClick={() =>
          setSongContex({
            photo: details.photo,
            url: details.url,
            index: index,
            playlist: playlistId,
            title: details.title,
            artist: details.artist,
            id: details._id,
          })
        }
        sx={{ display: "flex", marginLeft: "10px" }}
      >
        <Box>
          <SongTitle>{details.title}</SongTitle>
          <ArtistName>{details.artist}</ArtistName>
        </Box>

        <Box>
          <Typography color="#ffffff" float="right">
            {formatDuration(details.duration)}
          </Typography>
        </Box>
      </Box>
    </SongItemWrapper>
  );
};

export default SongItem;
