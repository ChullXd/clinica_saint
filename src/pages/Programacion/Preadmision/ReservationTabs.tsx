import React, { useState } from "react";
import { Box, Tabs, Tab, Paper } from "@mui/material";
import ExternalConsultation from "./ExternalConsultation";
import "./ConsultaExternaPage.css"; // Ajusta la ruta según tu estructura
import CirugíaPreadmision from "./CirugíaPreadmision";

const ReservationTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box className="root-container">
      <Paper
        elevation={8}
        className="reservation-container"
        sx={{
          borderRadius: 4,
          bgcolor: "#FFFFFF",
          border: "3px solid #4A90E2",
          width: "100%",
          mx: "auto",
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider", mt: -2 }}> {/* Mover pestañas más arriba */}
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="reservation tabs"
            sx={{
              "& .MuiTab-root": {
                fontWeight: 800,
                fontSize: { xs: "1.2rem", sm: "1.5rem" }, // Misma fuente que los títulos
                color: "#1A3C6D",
                textTransform: "none", // Evitar mayúsculas automáticas
              },
              "& .Mui-selected": {
                color: "#4A90E2", // Color seleccionado
              },
            }}
          >
            <Tab label="Cirugía" />
            <Tab label="Consulta Externa" />
          </Tabs>
        </Box>
        <Box>
          {value === 0 && <CirugíaPreadmision />}
          {value === 1 && <ExternalConsultation />}
        </Box>
      </Paper>
    </Box>
  );
};

export default ReservationTabs;