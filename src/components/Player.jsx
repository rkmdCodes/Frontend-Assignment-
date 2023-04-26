import React from "react";
import {
  Box,
  styled,
  Button,
  Slider,
  Typography,
  Container,
  Card,
  CardMedia,
  CardActions,
  CardActionArea,
  CardContent,
} from "@mui/material";
import { useState, useRef } from "react";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";

const Wrapper = styled(Container)(({ theme }) => ({
  border: "2px solid aqua",
}));

const AlbumArt = styled("img")({});

const PlayPauseButton = styled(Button)({
  color: "#fff",
  marginTop: "20px",
  backgroundColor: "#f50057",
  "&:hover": {
    backgroundColor: "#c51162",
  },
});

const StyledControl = styled(Box)`
  border: 1px solid rgb(141, 141, 141);
  border-radius: 10px;
  color: rgb(218, 218, 218);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
`;

const SongName = styled(Typography)`
  width: 184px;
  height: 36px;
  font-family: "Basier Circle";
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 36px;
  color: #ffffff;
  flex: none;
  order: 0;
  flex-grow: 0;
`;

const CustomSlider = styled(Slider)({
  color: "#ffffff",
  "& .MuiSlider-rail": {
    height: 2,
  },
  "& .MuiSlider-track": {
    height: 2,
  },
  "& .MuiSlider-thumb": {
    width: 12,
    height: 12,
    marginTop: -5,
    marginLeft: -6,
    "&:hover, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&::before": {
      display: "none",
    },
  },
});

export default function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  };

  const handleVolumeChange = () => {
    setVolume(audioRef.current.volume);
  };

  const handleSeek = (e, value) => {
    audioRef.current.currentTime = value;
    setCurrentTime(value);
  };

  const handleVolume = (e, value) => {
    audioRef.current.volume = value;
    setVolume(value);
  };

  return (
    <Box flex={1} border="2px solid magenta">
      <Card sx={{ margin: 5, background: "transparent" }}>
        <CardMedia
          component="img"
          image="https://images.genius.com/e95f361c27487088fd9dddf8c967bf89.500x500x1.jpg"
          alt="cover image"
          style={{objectFit: "cover" }}
        />
        <CardContent>
          <SongName>Player</SongName>
          <audio
            ref={audioRef}
            src="https://pagalworld.nl/files/download/id/26691"
            onTimeUpdate={handleTimeUpdate}
            onVolumeChange={handleVolumeChange}
          />

          <StyledControl>
            <CustomSlider
              value={currentTime}
              min={0}
              max={duration}
              onChange={handleSeek}
            />

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {isPlaying ? (
                <PauseCircleFilledIcon
                  sx={{ fontSize: "50px" }}
                  onClick={togglePlay}
                />
              ) : (
                <PlayCircleIcon
                  sx={{ fontSize: "50px" }}
                  onClick={togglePlay}
                />
              )}

              <CustomSlider
                value={volume}
                min={0}
                max={1}
                step={0.01}
                onChange={handleVolume}
                sx={{ width: 100 }}
              />
            </Box>
          </StyledControl>
        </CardContent>
        <CardActions disableSpacing></CardActions>
      </Card>
    </Box>
  );

  // return (
  //   <Wrapper>
  //     <SongName>Player</SongName>
  //     <audio
  //       ref={audioRef}
  //       src="https://pagalworld.nl/files/download/id/26691"
  //       onTimeUpdate={handleTimeUpdate}
  //       onVolumeChange={handleVolumeChange}
  //     />
  //     <AlbumArt src={"https://images.genius.com/e95f361c27487088fd9dddf8c967bf89.500x500x1.jpg"} alt="cover image"/>
  //     <StyledControl>
  //       <CustomSlider
  //         value={currentTime}
  //         min={0}
  //         max={duration}
  //         onChange={handleSeek}
  //       />

  //       <Box sx={{ display: "flex", flexDirection: "row" ,justifyContent:"space-between"}}>
  //         {isPlaying ? (
  //           <PauseCircleFilledIcon
  //             sx={{ fontSize: "50px" }}
  //             onClick={togglePlay}
  //           />
  //         ) : (
  //           <PlayCircleIcon sx={{ fontSize: "50px" }} onClick={togglePlay} />
  //         )}

  //         <CustomSlider
  //           value={volume}
  //           min={0}
  //           max={1}
  //           step={0.01}
  //           onChange={handleVolume}
  //           sx={{ width: 100 }}
  //         />
  //       </Box>
  //     </StyledControl>
  //   </Wrapper>
  // );
}
