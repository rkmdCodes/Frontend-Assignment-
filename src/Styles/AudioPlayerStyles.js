import { styled, Slider } from "@mui/material";

export const CustomSlider = styled(Slider)({
  color: "#ffffff",
  alignItems: "center",
  marks: "false",
  "& .MuiSlider-rail": {
    height: 5,
  },
  "& .MuiSlider-track": {
    height: 5,
  },
  "& .MuiSlider-thumb": {
    width: 0,
    height: 0,
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
