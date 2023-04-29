import React from "react";
import { Box, styled, Typography } from "@mui/material";
import { Avatar } from "@mui/material";
import { useContext } from "react";
import { DataContext } from "../contex/DataProvider";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  songItem: {
    "&:hover": {
      background: "rgba(255, 255, 255, 0.06)",
      transition: 'all 0.5s ease',
      transform: "scaleX(1.02)",
    },
  },
}));

const SongTitle = styled(Typography)`

  font-family: "Varela Round";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  color: #ffffff;
`;


const SongItemWrapper = styled(Box)`
  border-radius: 10px;
  padding: 12px;
  display: flex;
  margin: 10px;
  width: 80%;
 
  animation-name: fadeIn;
  animation-duration: 0.9s;
  animation-fill-mode: forwards;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ArtistName = styled(Box)`
  font-family: "Varela Round";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: #ffffff;
  opacity: 0.6;
`;

function formatDuration(durationInSeconds) {
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = durationInSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

const SongItem = ({ index, playlistId, details, setSongUrl }) => {
  const classes = useStyles();
  const { songContex } = useContext(DataContext);
  const { setSongContex } = useContext(DataContext);

  return (
    <SongItemWrapper
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
