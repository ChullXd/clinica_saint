import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    TextField,
    InputAdornment,
} from '@mui/material';
import {
    ChildCare as HijosIcon,
    Assignment as NotesIcon,
} from "@mui/icons-material";

interface AntecedentesPrenatalesData {
    antecedentesPrenatales: string;
}

export default function AntecedentesPrenatalesRN() {
    const [antecedentes, setAntecedentes] = useState<AntecedentesPrenatalesData>({
        antecedentesPrenatales: '',
    });

    const handleChange = (value: string) => {
        setAntecedentes({
            antecedentesPrenatales: value.toUpperCase(),
        });
    };

    return (
        <Box>
            {/* Sección C: Antecedentes Prenatales del Recién Nacido */}
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
                        C. ANTECEDENTES PRENATALES DEL RECIÉN NACIDO
                    </Typography>

                    {/* Campo de texto libre para antecedentes prenatales */}
                    <TextField
                        label="ANTECEDENTES PRENATALES"
                        value={antecedentes.antecedentesPrenatales}
                        onChange={(e) => handleChange(e.target.value)}
                        fullWidth
                        multiline
                        rows={6}
                        size="small"
                        placeholder="INGRESE LOS ANTECEDENTES PRENATALES DEL RECIÉN NACIDO...

INCLUYA INFORMACIÓN SOBRE:
- CONTROLES PRENATALES
- EDAD GESTACIONAL
- COMPLICACIONES DURANTE EL EMBARAZO
- MEDICAMENTOS ADMINISTRADOS
- ESTUDIOS REALIZADOS (ECOGRAFÍAS, LABORATORIOS)
- FACTORES DE RIESGO
- OTROS ANTECEDENTES RELEVANTES"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <NotesIcon sx={{
                                        fontSize: '1rem',
                                        color: '#1A3C6D',
                                        alignSelf: 'flex-start',
                                        mt: 1
                                    }} />
                                </InputAdornment>
                            ),
                        }}
                        InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                        helperText="Campo de texto libre para registrar todos los antecedentes prenatales relevantes del recién nacido"
                        FormHelperTextProps={{ sx: { fontSize: "0.7rem" } }}
                        sx={{
                            '& .MuiInputBase-input': {
                                fontSize: '0.85rem',
                                textTransform: 'uppercase',
                                lineHeight: 1.4
                            },
                            '& .MuiInputBase-root': {
                                alignItems: 'flex-start'
                            }
                        }}
                    />

                    {/* Contador de caracteres */}
                    {antecedentes.antecedentesPrenatales && (
                        <Box sx={{ mt: 1, textAlign: 'right' }}>
                            <Typography sx={{ fontSize: '0.7rem', color: '#666' }}>
                                Caracteres: {antecedentes.antecedentesPrenatales.length}
                            </Typography>
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
}