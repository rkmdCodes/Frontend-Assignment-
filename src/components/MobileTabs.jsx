import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box, Typography, styled, Stack, Skeleton } from "@mui/material";
import { useQuery, gql } from "@apollo/client";
import SongItem from "./SongItem";
import { useContext } from "react";
import { DataContext } from "../contex/DataProvider";
import Next from "../assets/Next.png";
import Prev from "../assets/Prev.png";

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
  "margin-top": "36px",
  "margin-left": "56px",
  "margin-left": "56px",
  width: "82%",
  height: "3rem",
  background: "rgba(255, 255, 255, 0.06)",
  "border-radius": "10px",
  color: "#ffffff",
  "font-family": "Varela Round",
  "font-size": "20px",
   alignItems:"center",
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
  
});

const Logo = styled("img")({
  "margin-top":"32px",
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



const MobileTabs = () => {
  const classes = useStyles();
  const { clickedPlaylist } = useContext(DataContext);
  const {  setClickedPlaylist } = useContext(DataContext);
  const [search, setSearchString] = useState("");
  const playlistId = clickedPlaylist.id;
  const playlistName = clickedPlaylist.name;
  const {playlistList} = useContext(DataContext);
  
  const handleNext = ()=>{
   if(clickedPlaylist.id < playlistList.length)
    setClickedPlaylist({...clickedPlaylist,id:clickedPlaylist.id+1});
  }

  const handlePrev = ()=>{
    if(clickedPlaylist.id >= 2)
     setClickedPlaylist({...clickedPlaylist,id:clickedPlaylist.id-1});
  }
  

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
    <Box maxHeight="70vh" 
      sx={{
        display: {
          xs: "block",
          sm: "block",
          md: "block",
          lg: "block",
        },
        
        overflow:"clip",
      }}
      
    >
    <Stack direction="row" justifyContent="space-between" spacing={0}>
    <Box onClick={handlePrev}><Logo src={Prev}/></Box>
      <Box>
        <StyledName mt="15px" alignItem="flex-start">
          { playlistList.length ? playlistList[clickedPlaylist.id-1].title : "Loading..."}
        </StyledName>
      </Box>      
      <Box onClick={handleNext} ><Logo src={Next}/></Box>
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
        <Box   >
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

export default MobileTabs;
