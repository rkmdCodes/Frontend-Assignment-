import React from "react";
import { Box, styled, Typography } from "@mui/material";
import { Avatar } from "@mui/material";

const SongTitle = styled(Typography)`
  width: auto;
  height: auto;
  font-family: "Varela Round";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  color: #ffffff;
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
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

const SongItem = ({index, playlistId, details, setSongUrl}) => {
  return (
    <Box display="flex" mt="10px" ml="10px" width="80%">
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
          setSongUrl({
            photo: details.photo,
            url: details.url,
            index:index,
            playlist:playlistId
          })
        }
        sx={{ display: "flex", marginLeft: "10px" }}
      >
        <Box >
          <SongTitle>{details.title}</SongTitle>
          <ArtistName>{details.artist}</ArtistName>
        </Box>

        <Box>
          <Typography color="#ffffff" float="right">
            {formatDuration(details.duration)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SongItem;
