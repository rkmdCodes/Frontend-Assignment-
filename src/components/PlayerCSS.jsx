import {styled,Container} from "@mui/material";

export const AlbumArt = styled("img")({
  height: "100%",
  width: "100%",
  maxHeight: "400px",
  minHeight: "400px",
  maxWidth: "400px",
  minWidth: "400px",
  borderRadius: "10px",
});



export const Wrapper = styled(Container)(({ theme }) => ({
    border: "2px solid aqua",
  }));
    