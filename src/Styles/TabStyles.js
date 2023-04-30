import { Box, Typography, styled, Stack, Skeleton } from "@mui/material";

export const StyledStack = styled(Stack)`
"::hover": {
  backgroundColor: "#fff",
},
}
`;

export const Loading = styled(Skeleton)`
ml="10px";
width="80%";
`;

export const StyledInput = styled("input")({
  "margin-left": "32px",
  "margin-top": "36px",
  width: "78%",
  height: "3rem",
  background: "rgba(255, 255, 255, 0.06)",
  "border-radius": "10px",
  color: "#ffffff",
  "font-family": "Varela Round",
  "font-size": "20px",
  "padding-left": "20px",
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
  "box-sizing": "border-box",
});

export const StyledName = styled(Typography)`
  width: auto;
  height: 36px;
  font-family: "Varela Round";
  font-weight: 700;
  font-size: 32px;
  color: #ffffff;
  border: "0px";
`;
