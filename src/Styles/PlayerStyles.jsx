import { Box, Typography, styled, Container } from "@mui/material";

export const AlbumArt = styled("img")({
  height: "100%",
  width: "100%",
  maxHeight: "400px",
  minHeight: "400px",
  maxWidth: "400px",
  minWidth: "400px",
  borderRadius: "10px",
});

export const DesktopView = styled(Box)(({ theme }) => ({
  display: "block",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

export const PhotoWrapper = styled(Box)`
  animation-name: fadeIn;
  animation-duration: 0.9s;
  animation-fill-mode: forwards;
  transition: "all 0.5s ease", @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const SongName = styled(Typography)`
  font-family: "Varela Round";
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  color: #ffffff;
`;

export const MobileView = styled(Box)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("md")]: {
    display: "block",
  },
}));

export const ArtistName = styled(Box)`
  font-family: "Varela Round";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: #ffffff;
  opacity: 0.6;
`;

export const Wrapper = styled(Container)(({ theme }) => ({
  border: "2px solid aqua",
}));
