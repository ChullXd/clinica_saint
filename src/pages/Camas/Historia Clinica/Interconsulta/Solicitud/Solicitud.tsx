

import React, { useState } from "react";
import {
    Box,
    Paper,
} from "@mui/material";
import EstablecimientoPaciente from "./EstablecimientoPaciente/EstablecimientoPaciente";
import Caracteristicas from "./Caracteristicas/Caracteristicas";
import CuadroClinico from "./CuadroClinico/CuadroClinico";
import ExamenesProcedimientos from "./ExamenesProcedimientos/ExamenesProcedimientos";
import PlanTerapeutico from "./PlanTerapeutico/PlanTerapeutico";
import ProfesionalResponsable from "./ProfesionalResponsable/ProfesionalResponsable";
import Diagnostico from "./Diagnostico/Diagnostico";


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
            {value === index && <Box sx={{ pt: 1 }}>{children}</Box>}
        </div>
    );
}

// Propiedades de accesibilidad para las pestañas

export default function Solicitud() {
    // Estado para controlar la pestaña activa
    const [tabValue, setTabValue] = useState(0);

    // Función para cambiar de pestaña


    return (
        <Paper elevation={1} sx={{ p: 2, m: 2 }}>

            <TabPanel value={tabValue} index={0}>
                <EstablecimientoPaciente />
            </TabPanel>
            <TabPanel value={tabValue} index={0}>
                <Caracteristicas />
            </TabPanel>
            <TabPanel value={tabValue} index={0}>
                <CuadroClinico />
            </TabPanel>
            <TabPanel value={tabValue} index={0}>
                <ExamenesProcedimientos />
            </TabPanel>
            <TabPanel value={tabValue} index={0}>
                <Diagnostico />
            </TabPanel>
            <TabPanel value={tabValue} index={0}>
                <PlanTerapeutico />
            </TabPanel>
            <TabPanel value={tabValue} index={0}>
                <ProfesionalResponsable />
            </TabPanel>


        </Paper>
    );
}

