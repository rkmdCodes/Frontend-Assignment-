import React from 'react'
import {Box,styled} from '@mui/material';


const Wrapper = styled(Box)`
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 32px;
border:2px solid aqua;
position: absolute;
width: 480px;
height: 692.24px;
left: 874px;
top: 101px;

`;


const Player = () => {
  return (
    <Wrapper>Player</Wrapper>
  )
}

export default Player