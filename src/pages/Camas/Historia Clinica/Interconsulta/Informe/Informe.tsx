import React, { useState } from "react";
import {
    Box,
    Paper,
} from "@mui/material";
import DatosPacienteI from "./DatosPacienteI/DatosPacienteI";
import Interconsulta from "../Interconsulta";
import ResumenCritico from "./ResumenCritico/ResumenCritico";
import Diagnostico from "../Solicitud/Diagnostico/Diagnostico";
import PlanDiagnostico from "./PlanDiagnostico/PlanDiagnostico";
import PlanTerapeutico from "./PlanTerapeutico/PlanTerapeutico";
import ProfesionalResponsable from "../Solicitud/ProfesionalResponsable/ProfesionalResponsable";
import ProfesionalResponsableI from "./ProfesionalResponsable/ProfesionalResponsableI";
import InterconsultaI from "./Interconsulta/Interconsulta";
import DiagnosticoI from "./Diagnostico/DiagnosticoI";

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

            <TabPanel value={tabValue} index={0}>
                <DatosPacienteI />
            </TabPanel>
            <TabPanel value={tabValue} index={0}>
                <InterconsultaI />
            </TabPanel>
            <TabPanel value={tabValue} index={0}>
                <ResumenCritico />
            </TabPanel>
            <TabPanel value={tabValue} index={0}>
                <DiagnosticoI />
            </TabPanel>
            <TabPanel value={tabValue} index={0}>
                <PlanDiagnostico />
            </TabPanel>
            <TabPanel value={tabValue} index={0}>
                <PlanTerapeutico />
            </TabPanel>
            <TabPanel value={tabValue} index={0}>
                <ProfesionalResponsableI />
            </TabPanel>
            


        </Paper>
    );
}

