import React from 'react'
import {Box,styled,Typography} from "@mui/material";
import {Avatar} from "@mui/material"; 

const SongTitle = styled(Typography)`
width: auto;
height: auto;
font-family: 'Varela Round';
font-style: normal;
font-weight: 400;
font-size: 18px;
line-height: 24px;
color: #FFFFFF;
`;

const ArtistName = styled(Box)`
width: auto;
height: auto;
font-family: 'Varela Round';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 24px;
color: #FFFFFF;
opacity: 0.6;

`;



const SongItem = ({details}) => {

  return (
    <Box mt="10px" ml="10px">
    <Box display={"flex"}> 
    <Avatar alt="song pic" src={`${details.photo}`} />
    <Box sx={{display:"flex",flexDirection:"column" , marginLeft:"10px"}}>
       <SongTitle>{details.title}</SongTitle>
       <ArtistName>{details.artist}</ArtistName>
    </Box>
    </Box>
      
    </Box>
  )
}

export default SongItem
