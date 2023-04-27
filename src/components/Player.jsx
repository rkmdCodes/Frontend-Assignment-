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
  Stack
} from "@mui/material";
import { useQuery, gql } from "@apollo/client";
import { useState, useRef } from "react";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";

const Wrapper = styled(Container)(({ theme }) => ({
  border: "2px solid aqua",
}));

const AlbumArt = styled("img")({
  'height':"100%",
  'width':"100%",
   'max-height':"400px",
   'max-width':"400px",
   'border-radius':"10px"
});

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

function Player({ songUrl, setSongUrl }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(null);

  const GET_SONGS = gql`
  query{
    getSongs(playlistId: ${songUrl.playlist},search:"") {
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
  }, [songUrl]);

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
    if (songUrl.index + 1 < songs.data.getSongs.length)
    {
      setSongUrl((value) => ({
        ...value,
        index: songUrl.index + 1,
        photo: songs.data.getSongs[songUrl.index + 1].photo,
        url: songs.data.getSongs[songUrl.index + 1].url,
      }));
    }
   
  };

  const handlePrev = () => {
    if (songUrl.index >= 1) {
      setSongUrl((value) => ({
        ...value,
        index: songUrl.index - 1,
        photo: songs.data.getSongs[songUrl.index - 1].photo,
        url: songs.data.getSongs[songUrl.index - 1].url,
      }));
    }
  };
 

    return (
      <Box flex={1} border="2px solid blue">  
      <Stack direction="column" spacing={1} >
        <Box  border="2px solid red" flex={8} >
           <SongName>{songs.data.getSongs[songUrl.index].title}</SongName>
          <AlbumArt src={songUrl.photo}/> 
        </Box>
        <Box border="2px solid green" flex={2}>
        </Box>
      </Stack>  
  </Box>
  
    )
  

  // return (
  //   <Box flex={1}>
  //     <button onClick={handleNext}>Next.js</button>
  //     <button onClick={handlePrev}>Previous</button>
      
  //     <Card sx={{ margin: 5, background: "transparent" }}>
  //       <CardMedia
  //         component="img"
  //         image={songUrl.photo}
  //         alt="cover image"
  //         style={{ objectFit: "cover" }}
  //       />
  //       <CardContent>
  //         <SongName>Player</SongName>
  //         <audio
  //           ref={audioRef}
  //           src={songUrl.url}
  //           onTimeUpdate={handleTimeUpdate}
  //           onVolumeChange={handleVolumeChange}
  //         />

  //         <StyledControl>
  //           <CustomSlider
  //             value={currentTime}
  //             min={0}
  //             max={duration}
  //             onChange={handleSeek}
  //           />

  //           <Box
  //             sx={{
  //               display: "flex",
  //               flexDirection: "row",
  //               justifyContent: "space-between",
  //             }}
  //           >
  //             {isPlaying ? (
  //               <PauseCircleFilledIcon
  //                 sx={{ fontSize: "50px" }}
  //                 onClick={togglePlay}
  //               />
  //             ) : (
  //               <PlayCircleIcon
  //                 sx={{ fontSize: "50px" }}
  //                 onClick={togglePlay}
  //               />
  //             )}

  //             <CustomSlider
  //               value={volume}
  //               min={0}
  //               max={1}
  //               step={0.01}
  //               onChange={handleVolume}
  //               sx={{ width: 100 }}
  //             />
  //           </Box>
  //         </StyledControl>
  //       </CardContent>
  //       <CardActions disableSpacing></CardActions>
  //     </Card>
  //   </Box>
  // );
}

export default Player;
