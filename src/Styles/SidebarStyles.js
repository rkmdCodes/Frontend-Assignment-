import { Box, Typography, styled } from "@mui/material";

export const Wrapper = styled(Box)`
  mt: "32px";
  display: flex;
  flex-direction: column;
`;

export const Logo = styled("img")({
  "margin-top": "32px",
  "margin-left": "32px",
});

export const PlaylistName = styled(Typography)`
  gap: "100px";
  font-family: "Varela Round";
  font-style: normal;
  font-size: 20px;
  color: #ffffff;
  opacity: 0.4;
`;
