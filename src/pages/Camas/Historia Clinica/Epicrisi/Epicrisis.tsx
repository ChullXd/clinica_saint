import React, { useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Paper,
    Typography,
} from "@mui/material";
import {
    Assignment as FormIcon,
} from "@mui/icons-material";
import EstablecimientoPaciente from "./EstablecimientoPaciente/EstablecimientoPaciente";
import ResumenCuadro from "./ResumenCuadro/ResumenCuadro";
import ResumenEvolucion from "./ResumenEvolucion/ResumenEvolucion";
import HallazgosRelevantes from "./HallazgosRelevantes/HallazgosRelevantes";
import ResumenTratamiento from "./ResumenTratamiento/ResumenTratamiento";
import AltaEgreso from "./AltaEgreso/AltaEgreso";
import DiagnosticoAlta from "./DiagnosticoAlta/DiagnosticoAlta";
import DatosProfesional from "../ProtocoloQuirurgico/ProfecionalResponsable/Responsable";
import MedicoTratante from "./MedicosTrantes/MedicoTratante";
import IndicacionesAlta from "./IndicacionesAlta/IndicacionesAlta";


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
            {value === index && <Box sx={{ pt: 1 }}>{children}</Box>}
        </div>
    );
}

// Propiedades de accesibilidad para las pestañas

export default function Informe() {
    // Estado para controlar la pestaña activa
    const [tabValue, setTabValue] = useState(0);

    // Función para cambiar de pestaña


    return (
        <Paper elevation={1} sx={{ p: 2, m: 2 }}>
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
                            FORMULARIO 006 MSP EPICRISIS
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
            <TabPanel value={tabValue} index={0}>
                <EstablecimientoPaciente />
            </TabPanel>
              <TabPanel value={tabValue} index={0}>
                <ResumenCuadro />
            </TabPanel>
              <TabPanel value={tabValue} index={0}>
                <ResumenEvolucion />
            </TabPanel>
             <TabPanel value={tabValue} index={0}>
                <HallazgosRelevantes />
            </TabPanel>
            <TabPanel value={tabValue} index={0}>
                <ResumenTratamiento />
            </TabPanel>
            <TabPanel value={tabValue} index={0}>
                <IndicacionesAlta />
            </TabPanel>
           
            <TabPanel value={tabValue} index={0}>
                <DiagnosticoAlta />
            </TabPanel>
            <TabPanel value={tabValue} index={0}>
                <AltaEgreso />
            </TabPanel>
            <TabPanel value={tabValue} index={0}>
                <MedicoTratante />
            </TabPanel>
            <TabPanel value={tabValue} index={0}>
                <DatosProfesional />
            </TabPanel>


        </Paper>
    );
}

