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
import EstablecimientoPaciente from "./EstablecimientoPaciente/EstablecimientoPaciente";
import AntecedentesPatologicosM from "./AntecedentePatologicosM/AntecedentesPatologicosM";
import AntecedentesPrenatalesRN from "./AntecedentesPrenatales/AntecedentesPrenatalesRN";
import AntecedentesNatales from "./AntecedentesNatales/AntecedentesNatales";
import Apgar from "./Apgar/Apgar";
import Intervnciones from "./Intervenciones/Intervnciones";
import Profilaxis from "./Profilasxis/Profilaxis";
import Vacunas from "./Vacunas/Vacunas";
import ConstantesVitales from "./ConstantesVitales/ConstantesVitales";
import ExamenFisico from "./ExameFisico/ExamenFisico";
import DiagnosticoInicial from "./DiagnosticoInicial/DiagnosticoInicial";
import TratamientoInicial from "./TratamientoInicial/TratamientoInicial";
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

export default function SubprocesoRecibimiento() {
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
                            Formulario 016 A-B MSP RECIEN NACIDO
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
                    <Tab label="ANTECEDENTES PATOLOGICOS MATERNOS" {...a11yProps(1)} />
                    <Tab label="ANTECEDENTES PRENATALES DE RECIEN NACIDOS" {...a11yProps(2)} />
                    <Tab label="ANTECEDENTES NATALES" {...a11yProps(3)} />
                    <Tab label="APGAR" {...a11yProps(4)} />
                    <Tab label="INTERVENCIONES" {...a11yProps(5)} />
                    <Tab label="PROFILAXIS" {...a11yProps(6)} />    
                    <Tab label="VACUNAS" {...a11yProps(7)} />
                    <Tab label="CONSTANTES VITALES" {...a11yProps(8)} />
                    <Tab label="EXAMEN FISICO" {...a11yProps(9)} />
                    <Tab label="DIAGNOSTICO INICIAL" {...a11yProps(10)} />
                    <Tab label="TRATAMIENTO INICIAL" {...a11yProps(11)} />
                    <Tab label="PROFESIONAL RESPONSABLE" {...a11yProps(12)} />

                </Tabs>
            </Box>

            {/* Contenido de las pestañas */}
            <TabPanel value={tabValue} index={0}>
                <EstablecimientoPaciente />
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
                <AntecedentesPatologicosM />
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
                <AntecedentesPrenatalesRN />
            </TabPanel>
            <TabPanel value={tabValue} index={3}>
                <AntecedentesNatales />
            </TabPanel>
            <TabPanel value={tabValue} index={4}>
                <Apgar />
            </TabPanel>
            <TabPanel value={tabValue} index={5}>
                <Intervnciones />
            </TabPanel>
            <TabPanel value={tabValue} index={6}>
                <Profilaxis />
            </TabPanel>
            <TabPanel value={tabValue} index={7}>
                <Vacunas />
            </TabPanel>
            <TabPanel value={tabValue} index={7}>
                <Vacunas />
            </TabPanel>
            <TabPanel value={tabValue} index={8}>
                <ConstantesVitales />
            </TabPanel>
            <TabPanel value={tabValue} index={9}>
                <ExamenFisico />
            </TabPanel>
            <TabPanel value={tabValue} index={10}>
                <DiagnosticoInicial />
            </TabPanel>
            <TabPanel value={tabValue} index={11}>
                <TratamientoInicial />
            </TabPanel>
            <TabPanel value={tabValue} index={12}>
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

