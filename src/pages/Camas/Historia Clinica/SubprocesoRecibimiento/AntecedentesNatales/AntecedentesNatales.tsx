import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    TextField,
    InputAdornment,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Chip,
    Divider,
} from '@mui/material';
import {
    ChildCare as HijosIcon,
    Water as LiquidoIcon,
    Warning as SufrimientoIcon,
    CalendarToday as FechaIcon,
    AccessTime as HoraIcon,
    Timeline as EdadIcon,
    Assessment as CapurroIcon,
} from "@mui/icons-material";

interface AntecedentesNatalesData {
    // Líquido Amniótico
    liquidoCantidad: string;
    liquidoColor: string;
    liquidoOlor: string;
    liquidoCaracteristicas: string;

    // Sufrimiento fetal
    sufrimientoFetal: string;

    // Datos de nacimiento
    fechaNacimiento: string;
    horaNacimiento: string;
    edadGestacional: string;
    capurro: string;
}

export default function AntecedentesNatales() {
    const [antecedentes, setAntecedentes] = useState<AntecedentesNatalesData>({
        liquidoCantidad: '',
        liquidoColor: '',
        liquidoOlor: '',
        liquidoCaracteristicas: '',
        sufrimientoFetal: '',
        fechaNacimiento: '',
        horaNacimiento: '',
        edadGestacional: '',
        capurro: '',
    });

    const handleChange = (field: keyof AntecedentesNatalesData, value: string) => {
        setAntecedentes(prev => ({
            ...prev,
            [field]: ['liquidoCantidad', 'liquidoColor', 'liquidoOlor', 'liquidoCaracteristicas', 'edadGestacional', 'capurro'].includes(field)
                ? value.toUpperCase()
                : value,
        }));
    };

    return (
        <Box>
            {/* Sección D: Antecedentes Natales del Recién Nacido */}
            <Card sx={{ mb: 3 }}>
                <CardContent sx={{ p: 2 }}>
                    <Typography
                        variant="h6"
                        sx={{
                            mb: 1.5,
                            fontWeight: "bold",
                            color: "#1A3C6D",
                            fontSize: "1rem",
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                        }}
                    >
                        <HijosIcon sx={{ fontSize: '1.2rem' }} />
                        D. ANTECEDENTES NATALES DEL RECIÉN NACIDO
                    </Typography>

                    {/* Líquido Amniótico */}
                    <Card variant="outlined" sx={{ mb: 2, backgroundColor: '#f8f9fa' }}>
                        <CardContent sx={{ p: 2 }}>
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    mb: 1.5,
                                    fontWeight: "bold",
                                    color: "#1976d2",
                                    fontSize: "0.9rem",
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1
                                }}
                            >
                                <LiquidoIcon sx={{ fontSize: '1rem' }} />
                                LÍQUIDO AMNIÓTICO:
                            </Typography>

                            {/* Primera fila - Cantidad y Color */}
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 1.5 }}>
                                <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%' } }}>
                                    <TextField
                                        label="CANTIDAD"
                                        value={antecedentes.liquidoCantidad}
                                        onChange={(e) => handleChange('liquidoCantidad', e.target.value)}
                                        fullWidth
                                        size="small"
                                        placeholder="NORMAL, OLIGOHIDRAMNIOS, POLIHIDRAMNIOS"
                                        InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                                        helperText="Ej: Normal, Anormal, Oligohidramnios, Polihidramnios"
                                        FormHelperTextProps={{ sx: { fontSize: "0.7rem" } }}
                                        sx={{
                                            '& .MuiInputBase-input': {
                                                fontSize: '0.85rem',
                                                textTransform: 'uppercase'
                                            }
                                        }}
                                    />
                                </Box>

                                <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%' } }}>
                                    <TextField
                                        label="COLOR"
                                        value={antecedentes.liquidoColor}
                                        onChange={(e) => handleChange('liquidoColor', e.target.value)}
                                        fullWidth
                                        size="small"
                                        placeholder="CLARO, TEÑIDO, MECONIAL"
                                        InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                                        helperText="Ej: Claro, Teñido, Meconial, Sanguinolento"
                                        FormHelperTextProps={{ sx: { fontSize: "0.7rem" } }}
                                        sx={{
                                            '& .MuiInputBase-input': {
                                                fontSize: '0.85rem',
                                                textTransform: 'uppercase'
                                            }
                                        }}
                                    />
                                </Box>
                            </Box>

                            {/* Segunda fila - Olor y Características */}
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                                <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%' } }}>
                                    <TextField
                                        label="OLOR"
                                        value={antecedentes.liquidoOlor}
                                        onChange={(e) => handleChange('liquidoOlor', e.target.value)}
                                        fullWidth
                                        size="small"
                                        placeholder="NORMAL, FÉTIDO"
                                        InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                                        helperText="Ej: Normal, Fétido, Sui Géneris"
                                        FormHelperTextProps={{ sx: { fontSize: "0.7rem" } }}
                                        sx={{
                                            '& .MuiInputBase-input': {
                                                fontSize: '0.85rem',
                                                textTransform: 'uppercase'
                                            }
                                        }}
                                    />
                                </Box>

                                <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%' } }}>
                                    <TextField
                                        label="CARACTERÍSTICAS"
                                        value={antecedentes.liquidoCaracteristicas}
                                        onChange={(e) => handleChange('liquidoCaracteristicas', e.target.value)}
                                        fullWidth
                                        size="small"
                                        placeholder="DESCRIPCIÓN ADICIONAL"
                                        InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                                        helperText="Otras características observadas"
                                        FormHelperTextProps={{ sx: { fontSize: "0.7rem" } }}
                                        sx={{
                                            '& .MuiInputBase-input': {
                                                fontSize: '0.85rem',
                                                textTransform: 'uppercase'
                                            }
                                        }}
                                    />
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>

                    {/* Sufrimiento Fetal */}
                    <Card variant="outlined" sx={{ mb: 2, backgroundColor: '#fff3e0' }}>
                        <CardContent sx={{ p: 2 }}>
                            <FormControl component="fieldset">
                                <FormLabel
                                    component="legend"
                                    sx={{
                                        fontSize: "0.9rem",
                                        fontWeight: "bold",
                                        color: "#f57c00",
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                        mb: 1
                                    }}
                                >
                                    <SufrimientoIcon sx={{ fontSize: '1rem' }} />
                                    SUFRIMIENTO FETAL:
                                </FormLabel>
                                <RadioGroup
                                    row
                                    value={antecedentes.sufrimientoFetal}
                                    onChange={(e) => handleChange('sufrimientoFetal', e.target.value)}
                                    sx={{ gap: 3 }}
                                >
                                    <FormControlLabel
                                        value="SI"
                                        control={<Radio size="small" />}
                                        label={
                                            <Chip
                                                label="SÍ"
                                                size="small"
                                                variant={antecedentes.sufrimientoFetal === 'SI' ? 'filled' : 'outlined'}
                                                color="error"
                                                sx={{ fontSize: '0.7rem', fontWeight: 'bold' }}
                                            />
                                        }
                                    />
                                    <FormControlLabel
                                        value="NO"
                                        control={<Radio size="small" />}
                                        label={
                                            <Chip
                                                label="NO"
                                                size="small"
                                                variant={antecedentes.sufrimientoFetal === 'NO' ? 'filled' : 'outlined'}
                                                color="success"
                                                sx={{ fontSize: '0.7rem', fontWeight: 'bold' }}
                                            />
                                        }
                                    />
                                </RadioGroup>
                            </FormControl>
                        </CardContent>
                    </Card>

                    <Divider sx={{ my: 2 }} />

                    {/* Datos de Nacimiento */}
                    <Typography
                        variant="subtitle1"
                        sx={{
                            mb: 1.5,
                            fontWeight: "bold",
                            color: "#1A3C6D",
                            fontSize: "0.9rem",
                        }}
                    >
                        DATOS DE NACIMIENTO:
                    </Typography>

                    {/* Primera fila - Fecha y Hora */}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 1.5 }}>
                        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%' } }}>
                            <TextField
                                label="FECHA DE NACIMIENTO"
                                type="date"
                                value={antecedentes.fechaNacimiento}
                                onChange={(e) => handleChange('fechaNacimiento', e.target.value)}
                                fullWidth
                                size="small"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <FechaIcon sx={{ fontSize: '1rem', color: '#1A3C6D' }} />
                                        </InputAdornment>
                                    ),
                                }}
                                InputLabelProps={{
                                    sx: { fontSize: "0.8rem" },
                                    shrink: true
                                }}
                                helperText="Formato: DD/MM/YYYY"
                                FormHelperTextProps={{ sx: { fontSize: "0.7rem" } }}
                                sx={{
                                    '& .MuiInputBase-input': {
                                        fontSize: '0.85rem',
                                        fontWeight: 'bold'
                                    }
                                }}
                            />
                        </Box>

                        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%' } }}>
                            <TextField
                                label="HORA DE NACIMIENTO"
                                type="time"
                                value={antecedentes.horaNacimiento}
                                onChange={(e) => handleChange('horaNacimiento', e.target.value)}
                                fullWidth
                                size="small"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <HoraIcon sx={{ fontSize: '1rem', color: '#1A3C6D' }} />
                                        </InputAdornment>
                                    ),
                                }}
                                InputLabelProps={{
                                    sx: { fontSize: "0.8rem" },
                                    shrink: true
                                }}
                                helperText="Formato: HH:MM (24 horas)"
                                FormHelperTextProps={{ sx: { fontSize: "0.7rem" } }}
                                sx={{
                                    '& .MuiInputBase-input': {
                                        fontSize: '0.85rem',
                                        fontWeight: 'bold'
                                    }
                                }}
                            />
                        </Box>
                    </Box>

                    {/* Segunda fila - Edad Gestacional y Capurro */}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%' } }}>
                            <TextField
                                label="EDAD GESTACIONAL"
                                value={antecedentes.edadGestacional}
                                onChange={(e) => handleChange('edadGestacional', e.target.value)}
                                fullWidth
                                size="small"
                                placeholder="EJ: 38 SEMANAS, 39+2"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EdadIcon sx={{ fontSize: '1rem', color: '#1A3C6D' }} />
                                        </InputAdornment>
                                    ),
                                }}
                                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                                helperText="Semanas de gestación al momento del parto"
                                FormHelperTextProps={{ sx: { fontSize: "0.7rem" } }}
                                sx={{
                                    '& .MuiInputBase-input': {
                                        fontSize: '0.85rem',
                                        textTransform: 'uppercase'
                                    }
                                }}
                            />
                        </Box>

                        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%' } }}>
                            <TextField
                                label="CAPURRO"
                                value={antecedentes.capurro}
                                onChange={(e) => handleChange('capurro', e.target.value)}
                                fullWidth
                                size="small"
                                placeholder="EJ: 38 SEMANAS, SCORE: 35"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <CapurroIcon sx={{ fontSize: '1rem', color: '#1A3C6D' }} />
                                        </InputAdornment>
                                    ),
                                }}
                                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                                helperText="Método de Capurro para edad gestacional"
                                FormHelperTextProps={{ sx: { fontSize: "0.7rem" } }}
                                sx={{
                                    '& .MuiInputBase-input': {
                                        fontSize: '0.85rem',
                                        textTransform: 'uppercase'
                                    }
                                }}
                            />
                        </Box>
                    </Box>

                    <Divider sx={{ my: 1.5 }} />

                    {/* Resumen de datos natales */}
                    {(Object.values(antecedentes).some(value => value)) && (
                        <Box sx={{ backgroundColor: '#f8f9fa', p: 1.5, borderRadius: 1 }}>
                            <Typography sx={{ fontSize: "0.75rem", fontWeight: "bold", color: "#1A3C6D", mb: 0.5 }}>
                                RESUMEN DE ANTECEDENTES NATALES:
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, fontSize: '0.7rem', color: '#666' }}>
                                {antecedentes.fechaNacimiento && (
                                    <Chip label={`Fecha: ${antecedentes.fechaNacimiento}`} size="small" />
                                )}
                                {antecedentes.horaNacimiento && (
                                    <Chip label={`Hora: ${antecedentes.horaNacimiento}`} size="small" />
                                )}
                                {antecedentes.sufrimientoFetal && (
                                    <Chip
                                        label={`Sufrimiento Fetal: ${antecedentes.sufrimientoFetal}`}
                                        size="small"
                                        color={antecedentes.sufrimientoFetal === 'SI' ? 'error' : 'success'}
                                    />
                                )}
                                {antecedentes.edadGestacional && (
                                    <Chip label={`EG: ${antecedentes.edadGestacional}`} size="small" />
                                )}
                                {antecedentes.liquidoCantidad && (
                                    <Chip label={`LA: ${antecedentes.liquidoCantidad}`} size="small" />
                                )}
                            </Box>
                        </Box>
                    )}
                </CardContent>
            </Card>

        </Box>
    );
}