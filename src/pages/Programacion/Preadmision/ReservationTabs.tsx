import React, { useState } from "react";
import { Box, Tabs, Tab, Paper } from "@mui/material";
import CirugíaPreadmision from "./CirugíaPreadmision";
import ExternalConsultation from "./ExternalConsultation";
import "./ConsultaExternaPage.css";

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
        <Box sx={{ borderBottom: 1, borderColor: "divider", mt: -2 }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="reservation tabs"
            sx={{
              "& .MuiTab-root": {
                fontWeight: 800,
                fontSize: { xs: "1.2rem", sm: "1.5rem" },
                color: "#1A3C6D",
                textTransform: "none",
              },
              "& .Mui-selected": {
                color: "#4A90E2",
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