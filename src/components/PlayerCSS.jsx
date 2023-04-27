import {styled} from "@mui/material";

export const AlbumArt = styled("img")({
    'height':"100%",
    'width':"100%",
     'max-height':"400px",
     'max-width':"400px",
     'border-radius':"10px"
  });
  
export const Wrapper = styled(Container)(({ theme }) => ({
    border: "2px solid aqua",
  }));
    