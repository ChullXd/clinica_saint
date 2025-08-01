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
import ConsentimientoInformado from "./ConsentimientoInformado/ConsentimientoInformado";
import CirugiaSegura from "./CirugiaSegura/CirugiaSegura";
import SubprocesoRecibimiento from "./SubprocesoRecibimiento/SubprocesoRecibimiento";
import Interconsulta from "./Interconsulta/Interconsulta";
import Epicrisis from "./Epicrisi/Epicrisis";
import Transferencia from "./Transferencia/Transferencia";


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
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            aria-label="ordenes examenes tabs"
            sx={{
              "& .MuiTab-root": {
                fontWeight: 800,
                fontSize: { xs: "0.85rem", sm: "1.0rem" },
                color: "#1A3C6D",
                textTransform: "none",
                minWidth: { xs: "120px", sm: "150px" },
              },
              "& .Mui-selected": {
                color: "#4A90E2",
              },
              "& .MuiTabs-scrollButtons": {
                color: "#1A3C6D",
                "&.Mui-disabled": {
                  opacity: 0.3,
                },
              },
            }}
          >
            <Tab label="EMERGENCIA" />
            <Tab label="ANAMNESIS" />
            <Tab label="EVOLUCIÓN" />
            <Tab label="PROTOCOLO QUIRÚRGICO" />
            <Tab label="PROTOCOLO ANESTESIÓLOGO" />
            <Tab label="CONSENTIMIENTO INFORMADO" />
            <Tab label="CIRUGIA SEGURA" />
            <Tab label="RECIEN NACIDO" />
            <Tab label="INTERCONSULTA" />
            <Tab label="EPICRISIS" />
            <Tab label="TRANSFERENCIA" />
          </Tabs>
        </Box>
        <Box sx={{ minHeight: "400px" }}>
          {value === 0 && <EmergenciaHC />}
          {value === 1 && <AnamnesisHC />}
          {value === 2 && <Evolucion />}
          {value === 3 && <ProtocoloQuirurgico />}
          {value === 4 && <ProtocoloAnestesiologo />}
          {value === 5 && <ConsentimientoInformado />}
          {value === 6 && <CirugiaSegura />}
          {value === 7 && <SubprocesoRecibimiento />}
          {value === 8 && <Interconsulta />}
          {value === 9 && <Epicrisis />}
          {value === 10 && <Transferencia />}       
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

