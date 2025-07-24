import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Tabs,
  Tab,
  Button,
} from "@mui/material";
import EmergenciaHC from "./Emergencia/EmergenciaHC";
import AnamnesisHC from "./Anamnesis/AnamnesisHC";
import Evolucion from "./Evolucion/Evolucion";
import ProtocoloQuirurgico from "./ProtocoloQuirurgico/ProtocoloQuirurgico";
import ProtocoloAnestesiologo from "./ProtocoloAnestesiologo/ProtocoloAnestesiologo";


interface OrdenesProps {
  open: boolean;
  onClose: () => void;
}

 export const HistoriaClinicaForm: React.FC<OrdenesProps> = ({ open, onClose }) => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle
        sx={{
          backgroundColor: "#1A3C6D",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "1.2rem",
          py: 2,
        }}
      >
        HISTORIA CLÍNICA
      </DialogTitle>
      <DialogContent
        sx={{
          background: "#F4F8FB",
          pb: 2,
          borderBottomLeftRadius: "8px",
          borderBottomRightRadius: "8px",
          pt: 2,
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="ordenes examenes tabs"
            sx={{
              "& .MuiTab-root": {
                fontWeight: 800,
                fontSize: { xs: "1.0rem", sm: "1.2rem" },
                color: "#1A3C6D",
                textTransform: "none",
              },
              "& .Mui-selected": {
                color: "#4A90E2",
              },
            }}
          >
            <Tab label="EMERGENCIA" />
            <Tab label="ANAMNESIS" />
            <Tab label="EVOLUCIÓN" />
            <Tab label="PROTOCOLO QUIRÚRGICO" />
            <Tab label="PROTOCOLO ANESTESIÓLOGO" />
          </Tabs>
        </Box>
        <Box sx={{ minHeight: "400px" }}>
          {value === 0 && <EmergenciaHC />}
          {value === 1 && <AnamnesisHC />}
          {value === 2 && <Evolucion />}
          {value === 3 && <ProtocoloQuirurgico />}
          {value === 4 && <ProtocoloAnestesiologo />}
        </Box>
      </DialogContent>
      <DialogActions sx={{ background: "#F4F8FB", pb: 2, pt: 1 }}>
        <Button
          onClick={onClose}
          sx={{
            color: "#fff",
            background: "#e57373",
            borderRadius: 2,
            px: 3,
            textTransform: "none",
            fontWeight: "bold",
            "&:hover": { background: "#c62828" },
          }}
        >
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

