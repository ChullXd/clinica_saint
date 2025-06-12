import { styled } from "@mui/material";

export const GlobalStyles = styled("div")({
  margin: 0,
  padding: 0,
  height: "100vh",
  width: "100vw",
  overflow: "hidden",
  boxSizing: "border-box",
  backgroundColor: "#E5F0F5",
  "& *, & *:before, & *:after": {
    boxSizing: "border-box",
  },
  "& html, & body": {
    margin: 0,
    padding: 0,
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
  },
});