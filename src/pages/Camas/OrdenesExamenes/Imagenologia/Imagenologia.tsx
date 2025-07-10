import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import Solicitud from "./Solicitud";
import Informe from "./Informe";

const Imagenologia = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="imagenologia tabs"
          sx={{
            "& .MuiTab-root": {
              fontWeight: 700,
              fontSize: { xs: "0.9rem", sm: "1.0rem" },
              color: "#1A3C6D",
              textTransform: "none",
            },
            "& .Mui-selected": {
              color: "#4A90E2",
            },
          }}
        >
          <Tab label="Solicitud" />
          <Tab label="Informe" />
        </Tabs>
      </Box>
      <Box>
        {value === 0 && <Solicitud />}
        {value === 1 && <Informe />}
      </Box>
    </Box>
  );
};

export default Imagenologia;
