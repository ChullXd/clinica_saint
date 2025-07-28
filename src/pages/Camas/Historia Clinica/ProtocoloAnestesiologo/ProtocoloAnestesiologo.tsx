
import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper,
  Button,
  Divider,
  Card,
  CardContent,
} from "@mui/material";
import {
  Save as SaveIcon,
  Print as PrintIcon,
  Edit as EditIcon,
  Assignment as FormIcon,
} from "@mui/icons-material";
import DatosEstablecimiento from "./DatosEstablecimiento/DatosEstablecimiento";
import PrioridadAtencion from "./PrioridadAtencion/PrioridadAtencion";
import RegionOperativaForm from "./RegionOperativa/RegionOperativaForm";
import RegistroTransanestesico from "./RegistroTransanestesico/RegistroTransanestesico";
import DrogasAdministradas from "./DrogasAdministradas/DrogasAdministradas";
import TecnicaAnestesica from "./TecnicaAnestesica/TecnicaAnestesica";
import Perdidas from "./Perdidas/Perdidas";
import AccesosVasculares from "./AccesosVasculares/AccesosVasculares";
import ReposicionVolemica from "./ReposicionVolemica/ReposicionVolemica";
import RecienNacido from "./RecienNacido/RecienNacido";
import TiempoTranscurridos from "./TiemposTranscurridos/TiempoTranscurridos";
import TecnicasEspeciales from "./TecnicasEspeciales/TecnicasEspeciales";
import TemperaturaCorporal from "./MantenimientoTC/TemperaturaCorporal";
import Incidentes from "./Incidentes/Incidentes";
import ResultadoExamenes from "./ResultadoExamenes/ResultadoExamenes";
import Observacion from "./Observacion/Observacion";
import CondicionEgreso from "./CondicionEgreso/CondicionEgreso";
import ProfesionalResponsable from "./ProfesionalResponsable/ProfesionalResponsable";

// Importar los componentes de formularios existentes


// Interfaz para las propiedades del panel de pestañas
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// Componente para el panel de cada pestaña
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`protocolo-tab-panel-${index}`}
      aria-labelledby={`protocolo-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

// Propiedades de accesibilidad para las pestañas
function a11yProps(index: number) {
  return {
    id: `protocolo-tab-${index}`,
    "aria-controls": `protocolo-tab-panel-${index}`,
  };
}

export default function ProtocoloAnestesiologo() {
  // Estado para controlar la pestaña activa
  const [tabValue, setTabValue] = useState(0);

  // Función para cambiar de pestaña
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Paper elevation={3} sx={{ p: 2, m: 2 }}>
      {/* Encabezado */}
      <Card sx={{ mb: 3, boxShadow: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "left" }}>
            <FormIcon sx={{ fontSize: 36, color: "#1A3C6D", mr: 2 }} />
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "#1A3C6D",
                textAlign: "center",
              }}
            >
              FORMULARIO 018 A-B MSP PROTOCOLO ANESTESIÓLOGO
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Navegación por pestañas */}
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            "& .MuiTab-root": {
              fontSize: "0.8rem",
              fontWeight: "medium",
              color: "#1A3C6D",
              minHeight: "40px",
            },
            "& .Mui-selected": {
              fontWeight: "bold",
            },
          }}
        >
          <Tab label="DATOS DEL ESTABLECIMIENTO" {...a11yProps(0)} />
          <Tab label="SERVICIO Y PRIORIDAD DE ATENCIÓN" {...a11yProps(1)} />
          <Tab label="REGIÓN OPERATORIA" {...a11yProps(2)} />
          <Tab label="REGISTRO TRANSANESTESICO" {...a11yProps(3)} />
          <Tab label="DROGAS ADMINISTRADAS" {...a11yProps(4)} />
          <Tab label="TÉCNICA ANESTÉSICA" {...a11yProps(5)} />
          <Tab label="ACCESOS VASCULARES" {...a11yProps(6)} />
          <Tab label="REPOSICIÓN VOLEMICA" {...a11yProps(7)} />
          <Tab label="PERDIDAS" {...a11yProps(8)} />
          <Tab label="DATOS RECIEN NACIDO" {...a11yProps(9)} />
          <Tab label="TIEMPO TRANSCURRIDO" {...a11yProps(10)} />
          <Tab label="TECNICAS ESPECIALES" {...a11yProps(11)} />
          <Tab label="MANTENIMIENTO TEMPERATURA CORPORAL" {...a11yProps(12)} />
          <Tab label="INCIDENTES" {...a11yProps(13)} />
          <Tab label="RESULTADO DE EXÁMENES" {...a11yProps(14)} />
          <Tab label="OBSERVACIONES" {...a11yProps(15)} />
          <Tab label="CONDICION DE EGRESO" {...a11yProps(16)} />
          <Tab label="DATOS DEL PROFESIONAL RESPONSABLE" {...a11yProps(17)} />


        </Tabs>
      </Box>

      {/* Contenido de las pestañas */}
      <TabPanel value={tabValue} index={0}>
        <DatosEstablecimiento />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <PrioridadAtencion />
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <RegionOperativaForm />
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <RegistroTransanestesico />
      </TabPanel>

      <TabPanel value={tabValue} index={4}>
        <DrogasAdministradas />
      </TabPanel>

      <TabPanel value={tabValue} index={5}>
        <TecnicaAnestesica />
      </TabPanel>

      <TabPanel value={tabValue} index={6}>
        <AccesosVasculares />
      </TabPanel>

      <TabPanel value={tabValue} index={7}>
        <ReposicionVolemica />
      </TabPanel>

      <TabPanel value={tabValue} index={8}>
        <Perdidas />
      </TabPanel>

      <TabPanel value={tabValue} index={9}>
        <RecienNacido />
      </TabPanel>

      <TabPanel value={tabValue} index={10}>
        <TiempoTranscurridos />
      </TabPanel>

      <TabPanel value={tabValue} index={11}>
        <TecnicasEspeciales />
      </TabPanel>

       <TabPanel value={tabValue} index={12}>
        <TemperaturaCorporal />
      </TabPanel>

       <TabPanel value={tabValue} index={13}>
        <Incidentes />
      </TabPanel>

       <TabPanel value={tabValue} index={14}>
        <ResultadoExamenes />
      </TabPanel>

      <TabPanel value={tabValue} index={15}>
        <Observacion />
      </TabPanel>

      <TabPanel value={tabValue} index={16}>
        <CondicionEgreso />
      </TabPanel>

      <TabPanel value={tabValue} index={17}>
        <ProfesionalResponsable />
      </TabPanel>
      
      <Divider sx={{ mt: 4, mb: 2 }} />

      <Box sx={{ display: "flex", justifyContent: "center", gap: 1.5, flexWrap: "wrap" }}>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          size="small"
          sx={{
            background: "#1A3C6D",
            "&:hover": { background: "#274472" },
            fontSize: "0.8rem"
          }}
        >
          GUARDAR
        </Button>
        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          size="small"
          sx={{
            color: "#1A3C6D",
            borderColor: "#1A3C6D",
            fontSize: "0.8rem"
          }}
        >
          EDITAR
        </Button>
        <Button
          variant="outlined"
          startIcon={<PrintIcon />}
          size="small"
          sx={{
            color: "#1A3C6D",
            borderColor: "#1A3C6D",
            fontSize: "0.8rem"
          }}
        >
          IMPRIMIR
        </Button>
      </Box>
    </Paper>
  );
}
