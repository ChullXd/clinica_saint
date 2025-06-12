import { styled } from "@mui/material/styles";

export const Sidebar = styled("div")<{ open: boolean }>(({ theme, open }) => ({
  width: "250px",
  background: "linear-gradient(180deg, #005A9C 0%, #003087 100%)",
  color: "#fff",
  fontFamily: "'Inter', sans-serif",
  height: "100%",
  borderTopRightRadius: "20px",
  position: "absolute",
  top: "40px",
  left: 0,
  transform: open ? "translateX(0)" : "translateX(-100%)",
  transition: "transform 0.3s ease-in-out",
  zIndex: 1000,
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.up("md")]: {
    position: "relative",
    transform: "none",
    top: 0,
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    borderTopRightRadius: 0,
  },
  [theme.breakpoints.up("lg")]: {
    width: "300px",
  },
}));