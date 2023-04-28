import React, { useEffect } from "react";
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
  Stack,
} from "@mui/material";
import { useQuery, gql } from "@apollo/client";
import { useState, useRef } from "react";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";
import { useContext } from "react";
import { DataContext } from "../contex/DataProvider";
import { AlbumArt, Wrapper } from "./PlayerCSS";

import FastForwardIcon from "@mui/icons-material/FastForward";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import PendingIcon from "@mui/icons-material/Pending";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const PlayPauseButton = styled(Button)({
  color: "#fff",
  marginTop: "20px",
  backgroundColor: "#f50057",
  "&:hover": {
    backgroundColor: "#c51162",
  },
});

const PhotoWrapper = styled(Box)`
 
  animation-name: fadeIn;
  animation-duration: 0.9s;
  animation-fill-mode: forwards;
  transition: 'all 0.5s ease',
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const StyledControl = styled(Box)`
  border: 1px solid white;
  border-radius: 10px;
  color: rgb(218, 218, 218);
  background-color: transparent;
`;

const SongName = styled(Typography)`
font-family: "Varela Round";
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
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

const CustomSlider = styled(Slider)({
  color: "#ffffff",
  alignItems:"center",
  marks:"false",
  "& .MuiSlider-rail": {
    height: 5,
  },
  "& .MuiSlider-track": {
    height: 5,
  },
  "& .MuiSlider-thumb": {
    width: 0,
    height: 0,
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

function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(null);

  const { songContex } = useContext(DataContext);
  const { setSongContex } = useContext(DataContext);

  const GET_SONGS = gql`
  query{
    getSongs(playlistId: ${songContex.playlist},search:"") {
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

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.currentTime = 0;
      playAudio();
      setCurrentTime(0);
    }
  }, [songContex]);

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

  const playAudio = () => {
    if (audioRef !== null) {
      audioRef.current.play();
      setIsPlaying(true);
    } else setIsPlaying(false);
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

  const handleNext = () => {
    if (songContex.index + 1 < songs.data.getSongs.length) {
      setSongContex((value) => ({
        ...value,
        index: songContex.index + 1,
        photo: songs.data.getSongs[songContex.index + 1].photo,
        url: songs.data.getSongs[songContex.index + 1].url,
        title: songs.data.getSongs[songContex.index + 1].title,
      }));
    }
  };

  const handlePrev = () => {
    if (songContex.index >= 1) {
      setSongContex((value) => ({
        ...value,
        index: songContex.index - 1,
        photo: songs.data.getSongs[songContex.index - 1].photo,
        url: songs.data.getSongs[songContex.index - 1].url,
        title: songs.data.getSongs[songContex.index - 1].title,
      }));
    }
  };

  return (
    <Box
      flex={1}
      display="flex"
      alignItems="center"
      marginTop="20px" 
      justifyContent="center"
    >
      <Stack direction="column" spacing={0}>
      <Box >
      <SongName>{songContex.title}</SongName>
      <ArtistName>{songContex.artist}</ArtistName>
      </Box>
        
        <Stack >
          <PhotoWrapper paddingTop="20px" >
            <AlbumArt alignContent="center" src={songContex.photo} />
          </PhotoWrapper>
        </Stack>
        <Box  flex={2}>
          <CustomSlider
            marks={false}
            value={currentTime}
            min={0}
            max={duration}
            onChange={handleSeek}
          />
          <Stack direction="row" spacing={2} justifyContent="space-around">
            <Box >
              <RemoveCircleOutlineIcon
                sx={{ fontSize: "30px", color: "white",paddingTop:"12px" }}
              />
            </Box>
            <Stack
              marginBottom="200px"
            
              direction="row"
              spacing={3}
              justifyContent="space-around"
            >
              <FastRewindIcon onClick={handlePrev} sx={{ fontSize: "30px", color: "white",opacity:"0.6" ,paddingTop:"12px"}} />
              <Box>
                {isPlaying ? (
                  <PauseCircleFilledIcon
                    sx={{
                      fontSize: "60px",
                      color: "white",
                
                    }}
                    onClick={togglePlay}
                  />
                ) : (
                  <PlayCircleIcon
                    sx={{ fontSize: "60px", color: "white" }}
                    onClick={togglePlay}
                  />
                )}
              </Box>
              <FastForwardIcon onClick={handleNext} sx={{ fontSize: "30px", color: "white",opacity:"0.6",paddingTop:"12px" }} />
              {/* <StyledControl >
           <Box
             sx={{
               display: "flex",
               flexDirection: "",
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
        */}
            </Stack>
            <Box >
              <VolumeDownIcon sx={{ fontSize: "30px", color: "white" ,paddingTop:"12px"}} />
            </Box>
          </Stack>
          <audio
            ref={audioRef}
            src={songContex.url}
            onTimeUpdate={handleTimeUpdate}
            onVolumeChange={handleVolumeChange}
          />
        </Box>
      </Stack>
    </Box>
  );

  // return (
  //   <Box flex={1}>
  //     <button >Next.js</button>
  //     <button }>Previous</button>

  //     <Card sx={{ margin: 5, background: "transparent" }}>
  //       <CardMedia
  //         component="img"
  //         image={songUrl.photo}
  //         alt="cover image"
  //         style={{ objectFit: "cover" }}
  //       />
  //       <CardContent>
  //         <SongName>Player</SongName>

  //       </CardContent>
  //       <CardActions disableSpacing></CardActions>
  //     </Card>
  //   </Box>
  // );
}

export default Player;
