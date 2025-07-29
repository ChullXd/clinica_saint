import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  Divider,
  Chip,
} from '@mui/material';
import {
  Timer as TimerIcon,
  Assignment as ApgarIcon,
  TrendingUp as TotalIcon,
} from "@mui/icons-material";

interface ApgarData {
  apgar1Min: string;
  apgar5Min: string;
  apgar10Min: string;
}

export default function Apgar() {
  const [apgarScores, setApgarScores] = useState<ApgarData>({
    apgar1Min: '',
    apgar5Min: '',
    apgar10Min: '',
  });

  const handleChange = (field: keyof ApgarData, value: string) => {
    // Validar que solo se ingresen números del 0 al 10
    if (value === '' || (/^\d+$/.test(value) && parseInt(value) >= 0 && parseInt(value) <= 10)) {
      setApgarScores(prev => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  // Calcular total si hay valores
  const calcularTotal = (): number => {
    const scores = [apgarScores.apgar1Min, apgarScores.apgar5Min, apgarScores.apgar10Min];
    const validScores = scores.filter(score => score !== '').map(score => parseInt(score));
    return validScores.length > 0 ? validScores.reduce((sum, score) => sum + score, 0) : 0;
  };

  // Determinar color según el score APGAR
  const getApgarColor = (score: string): string => {
    if (!score) return '#666';
    const numScore = parseInt(score);
    if (numScore >= 7) return '#2e7d32'; // Verde - Normal
    if (numScore >= 4) return '#f57c00'; // Naranja - Moderado
    return '#d32f2f'; // Rojo - Severo
  };

  // Interpretación del APGAR
  const getApgarInterpretacion = (score: string): string => {
    if (!score) return '';
    const numScore = parseInt(score);
    if (numScore >= 7) return 'NORMAL';
    if (numScore >= 4) return 'MODERADO';
    return 'SEVERO';
  };

  return (
    <Box>
      {/* Sección E: APGAR */}
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
            <ApgarIcon sx={{ fontSize: '1.2rem' }} />
            E. APGAR
          </Typography>

          {/* Campos de APGAR */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 2 }}>
            {/* 1 Minuto */}
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 22%' } }}>
              <TextField
                label="1 MINUTO"
                type="number"
                value={apgarScores.apgar1Min}
                onChange={(e) => handleChange('apgar1Min', e.target.value)}
                fullWidth
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TimerIcon sx={{ fontSize: '1rem', color: '#1A3C6D' }} />
                    </InputAdornment>
                  ),
                  inputProps: { min: 0, max: 10 }
                }}
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                helperText="Score 0-10"
                FormHelperTextProps={{ sx: { fontSize: "0.7rem" } }}
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: getApgarColor(apgarScores.apgar1Min)
                  }
                }}
              />
              {apgarScores.apgar1Min && (
                <Chip
                  label={getApgarInterpretacion(apgarScores.apgar1Min)}
                  size="small"
                  sx={{
                    mt: 0.5,
                    fontSize: '0.65rem',
                    fontWeight: 'bold',
                    backgroundColor: getApgarColor(apgarScores.apgar1Min),
                    color: 'white',
                    width: '100%'
                  }}
                />
              )}
            </Box>

            {/* 5 Minutos */}
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 22%' } }}>
              <TextField
                label="5 MINUTOS"
                type="number"
                value={apgarScores.apgar5Min}
                onChange={(e) => handleChange('apgar5Min', e.target.value)}
                fullWidth
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TimerIcon sx={{ fontSize: '1rem', color: '#1A3C6D' }} />
                    </InputAdornment>
                  ),
                  inputProps: { min: 0, max: 10 }
                }}
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                helperText="Score 0-10"
                FormHelperTextProps={{ sx: { fontSize: "0.7rem" } }}
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: getApgarColor(apgarScores.apgar5Min)
                  }
                }}
              />
              {apgarScores.apgar5Min && (
                <Chip
                  label={getApgarInterpretacion(apgarScores.apgar5Min)}
                  size="small"
                  sx={{
                    mt: 0.5,
                    fontSize: '0.65rem',
                    fontWeight: 'bold',
                    backgroundColor: getApgarColor(apgarScores.apgar5Min),
                    color: 'white',
                    width: '100%'
                  }}
                />
              )}
            </Box>

            {/* 10 Minutos */}
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 22%' } }}>
              <TextField
                label="10 MINUTOS"
                type="number"
                value={apgarScores.apgar10Min}
                onChange={(e) => handleChange('apgar10Min', e.target.value)}
                fullWidth
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TimerIcon sx={{ fontSize: '1rem', color: '#1A3C6D' }} />
                    </InputAdornment>
                  ),
                  inputProps: { min: 0, max: 10 }
                }}
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                helperText="Score 0-10"
                FormHelperTextProps={{ sx: { fontSize: "0.7rem" } }}
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: getApgarColor(apgarScores.apgar10Min)
                  }
                }}
              />
              {apgarScores.apgar10Min && (
                <Chip
                  label={getApgarInterpretacion(apgarScores.apgar10Min)}
                  size="small"
                  sx={{
                    mt: 0.5,
                    fontSize: '0.65rem',
                    fontWeight: 'bold',
                    backgroundColor: getApgarColor(apgarScores.apgar10Min),
                    color: 'white',
                    width: '100%'
                  }}
                />
              )}
            </Box>

            {/* Total */}
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 22%' } }}>
              <TextField
                label="TOTAL"
                value={calcularTotal()}
                fullWidth
                size="small"
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <TotalIcon sx={{ fontSize: '1rem', color: '#1A3C6D' }} />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                helperText="Suma automática"
                FormHelperTextProps={{ sx: { fontSize: "0.7rem" } }}
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: '#1A3C6D'
                  },
                  '& .MuiInputBase-root': {
                    backgroundColor: '#f0f8ff'
                  }
                }}
              />
              {calcularTotal() > 0 && (
                <Chip
                  label={`SUMA: ${calcularTotal()}`}
                  size="small"
                  color="primary"
                  sx={{
                    mt: 0.5,
                    fontSize: '0.65rem',
                    fontWeight: 'bold',
                    width: '100%'
                  }}
                />
              )}
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Interpretación y progreso */}
          {(apgarScores.apgar1Min || apgarScores.apgar5Min || apgarScores.apgar10Min) && (
            <Card variant="outlined" sx={{ backgroundColor: '#f8f9fa' }}>
              <CardContent sx={{ p: 2 }}>
                <Typography sx={{ fontSize: "0.75rem", fontWeight: "bold", color: "#1A3C6D", mb: 1 }}>
                  INTERPRETACIÓN APGAR:
                </Typography>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                  {apgarScores.apgar1Min && (
                    <Chip
                      label={`1 min: ${apgarScores.apgar1Min} - ${getApgarInterpretacion(apgarScores.apgar1Min)}`}
                      size="small"
                      sx={{
                        backgroundColor: getApgarColor(apgarScores.apgar1Min),
                        color: 'white',
                        fontSize: '0.65rem',
                        fontWeight: 'bold'
                      }}
                    />
                  )}
                  {apgarScores.apgar5Min && (
                    <Chip
                      label={`5 min: ${apgarScores.apgar5Min} - ${getApgarInterpretacion(apgarScores.apgar5Min)}`}
                      size="small"
                      sx={{
                        backgroundColor: getApgarColor(apgarScores.apgar5Min),
                        color: 'white',
                        fontSize: '0.65rem',
                        fontWeight: 'bold'
                      }}
                    />
                  )}
                  {apgarScores.apgar10Min && (
                    <Chip
                      label={`10 min: ${apgarScores.apgar10Min} - ${getApgarInterpretacion(apgarScores.apgar10Min)}`}
                      size="small"
                      sx={{
                        backgroundColor: getApgarColor(apgarScores.apgar10Min),
                        color: 'white',
                        fontSize: '0.65rem',
                        fontWeight: 'bold'
                      }}
                    />
                  )}
                </Box>

                <Typography sx={{ fontSize: '0.7rem', color: '#666', mt: 1 }}>
                  <strong>Escala:</strong> 7-10 Normal (Verde) | 4-6 Moderado (Naranja) | 0-3 Severo (Rojo)
                </Typography>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}