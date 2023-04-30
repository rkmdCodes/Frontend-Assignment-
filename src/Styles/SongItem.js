import { Box, styled, Typography } from "@mui/material";

export const SongTitle = styled(Typography)`
  font-family: "Varela Round";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  color: #ffffff;
`;

export const SongItemWrapper = styled(Box)`
  border-radius: 10px;
  padding: 12px;
  display: flex;
  margin: 10px;
  width: 80%;

  animation-name: fadeIn;
  animation-duration: 0.9s;
  animation-fill-mode: forwards;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const ArtistName = styled(Box)`
  font-family: "Varela Round";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: #ffffff;
  opacity: 0.6;
`;
