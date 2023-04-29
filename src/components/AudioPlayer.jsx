import React, { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { useState, useRef } from "react";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";
import { useContext } from "react";
import { DataContext } from "../contex/DataProvider";
import FastForwardIcon from "@mui/icons-material/FastForward";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import PendingIcon from "@mui/icons-material/Pending";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Box, styled, Button, Slider, Tooltip, Stack } from "@mui/material";

const PlayPauseButton = styled(Button)({
  color: "#fff",
  marginTop: "20px",
  backgroundColor: "#f50057",
  "&:hover": {
    backgroundColor: "#c51162",
  },
});

const CustomSlider = styled(Slider)({
  color: "#ffffff",
  alignItems: "center",
  marks: "false",
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

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(null);
  const [openVolume, setOpenVolume] = useState(false);
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
      _id,
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
        id:songs.data.getSongs[songContex.index + 1]._id
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
        id:songs.data.getSongs[songContex.index - 1]._id
      }));
    }
    
  };

  return (
    <Box>
    
      <CustomSlider
        marks={false}
        value={currentTime}
        min={0}
        max={duration}
        onChange={handleSeek}
      />
   
      
      <Stack direction="row" spacing={2} justifyContent="space-around">
        <Box>
          <RemoveCircleOutlineIcon
            sx={{ fontSize: "30px", color: "white", paddingTop: "12px" }}
          />
        </Box>
        <Stack
          marginBottom="200px"
          direction="row"
          spacing={3}
          justifyContent="space-around"
        >
          <FastRewindIcon
            onClick={handlePrev}
            sx={{
              fontSize: "30px",
              color: "white",
              opacity: "0.6",
              paddingTop: "12px",
            }}
          />
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
          <FastForwardIcon
            onClick={handleNext}
            sx={{
              fontSize: "30px",
              color: "white",
              opacity: "0.6",
              paddingTop: "12px",
            }}
          />
         
        </Stack>
    
        <Box>
        
        <Tooltip
      
        sx={{
          arrow: {
            borderRadius: '10px',
          },
        }}
        PopperProps={{
          disablePortal: true,
        }}
        onClose={() => setOpenVolume(false)}
        open={openVolume}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        title={
          <div
            style={{
              width: 100,
              borderRadius:"50px"
             
            }}
          >
          <CustomSlider
          value={volume}
            min={0}
           max={1}
           step={0.01}
           onChange={handleVolume}
           sx={{ width: 100 }}
         />
          </div>
        }
      >
        <Box onClick={() => setOpenVolume(!openVolume)}>
          <VolumeDownIcon  sx={{ fontSize: "30px", color: "white", paddingTop: "12px" }}/>
        </Box>
      </Tooltip>
        </Box>
      </Stack>
 
      <audio
        ref={audioRef}
        src={songContex.url}
        onTimeUpdate={handleTimeUpdate}
        onVolumeChange={handleVolumeChange}
      />
   
    </Box>
  );
};

export default AudioPlayer;
