import React, { useState, useRef, useEffect } from "react";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, Typography, IconButton, Button } from "@mui/material";
import { Menu as MenuIcon, Person as PersonIcon } from "@mui/icons-material";
import SidebarMenu from "./pages/SidebarMenu/SidebarMenu";
import logoHorizontal from "./assets/png/LogoHorizontal.png";
import logo from "./assets/png/Logo1.png";
import ReservationTabs from "./pages/Programacion/Preadmision/ReservationTabs";

const theme = createTheme();

const GlobalStyles = styled("div")({
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

const TopBanner = styled("div")(({ theme }) => ({
  width: "100%",
  height: "40px",
  backgroundColor: "#fff",
  color: "#005A9C",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  fontFamily: "'Inter', sans-serif",
  fontSize: "14px",
  padding: theme.spacing(0, 2),
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  position: "relative",
  zIndex: 1001,
  [theme.breakpoints.down("sm")]: {
    fontSize: "12px",
  },
}));

const MainContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  height: "calc(100vh - 40px)",
  width: "100%",
  backgroundColor: "#E5F0F5",
  overflow: "hidden",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    height: "100%",
  },
}));

const MainContent = styled("main")(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(3),
  backgroundColor: "#fff",
  borderRadius: "20px",
  margin: theme.spacing(2),
  width: "calc(100% - 40px)",
  height: "calc(100% - 40px)",
  overflowY: "auto",
}));

const UserProfile = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  color: "#005A9C",
}));

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState("dashboard");
  const [isSmallLogo, setIsSmallLogo] = useState(false);
  const sidebarListRef = useRef<HTMLDivElement | null>(null);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handlePageSelect = (page: string) => {
    setSelectedPage(page);
    if (window.innerWidth < 900) {
      setSidebarOpen(false);
    }
  };

  const handleLogout = () => {
    // Lógica de logout sin navegación (puedes implementar redirección manual si es necesario)
    console.log("Logout clicked");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (sidebarListRef.current) {
        const scrollTop = sidebarListRef.current.scrollTop;
        setIsSmallLogo(scrollTop > 50);
      }
    };

    const currentRef = sidebarListRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  // Renderizado dinámico basado en selectedPage
  const renderContent = () => {
    switch (selectedPage) {
      case "PREADMISION":
        return <ReservationTabs />;
      default:
        return <Typography>Selecciona una opción del menú</Typography>; // Placeholder por defecto
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles>
        <Box
          sx={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <TopBanner>
            <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <IconButton
                onClick={handleSidebarToggle}
                sx={{ color: "#808080", display: { md: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <img
                src={logo}
                alt="Clinica Saint Logo"
                style={{ width: "24px", height: "24px", objectFit: "contain" }}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <UserProfile>
                <PersonIcon />
                <Typography variant="body2">User Admin</Typography>
              </UserProfile>
              <Button variant="contained" color="primary" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          </TopBanner>
          <MainContainer>
            <SidebarMenu
              open={sidebarOpen}
              selectedPage={selectedPage}
              handlePageSelect={handlePageSelect}
              isSmallLogo={isSmallLogo}
              sidebarListRef={sidebarListRef}
            />
            <MainContent>
              {renderContent()}
            </MainContent>
          </MainContainer>
        </Box>
      </GlobalStyles>
    </ThemeProvider>
  );
};

export default App;