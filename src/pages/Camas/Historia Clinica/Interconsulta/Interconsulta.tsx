
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
import Solicitud from "./Solicitud/Solicitud";
import Informe from "./Informe/Informe";

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

export default function Interconsulta() {
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
                            FORMULARIO 007 MSP INTERCONSULTA
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
                    <Tab label="SOLICITUD" {...a11yProps(0)} />
                    <Tab label="INFORME" {...a11yProps(1)} />
                  

                </Tabs>
            </Box>

            {/* Contenido de las pestañas */}
            <TabPanel value={tabValue} index={0}>
                <Solicitud />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
                <Informe />
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

