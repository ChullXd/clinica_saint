import { Box, Typography } from "@mui/material";
import ConstructionIcon from "@mui/icons-material/Construction";

const AnatomiaPatologica = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "400px",
        opacity: 0.3,
        color: "#1A3C6D",
      }}
    >
      <ConstructionIcon sx={{ fontSize: 80, mb: 2 }} />
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          letterSpacing: 2,
          textAlign: "center",
        }}
      >
        EN CONSTRUCCIÓN
      </Typography>
      <Typography
        variant="h6"
        sx={{
          mt: 1,
          fontStyle: "italic",
          textAlign: "center",
        }}
      >
        Anatomía Patológica
      </Typography>
    </Box>
  );
};

export default AnatomiaPatologica;
