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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  MonitorHeart as VitalesIcon,
  CalendarToday as FechaIcon,
  AccessTime as HoraIcon,
  Thermostat as TemperaturaIcon,
  Favorite as PulsoIcon,
  BloodtypeOutlined as PresionIcon,
  Air as RespiracionIcon,
  Opacity as OxigenoIcon,
  ChildCare as ReflexIcon,
  Restaurant as ToleranciaIcon,
  ColorLens as DeposicionIcon,
  Water as OrinaIcon,
  Person as ResponsableIcon,
} from "@mui/icons-material";

interface ConstantesVitalesData {
  fecha: string;
  hora: string;
  temperatura: string;
  pulso: string;
  presionArterial: string;
  frecuenciaRespiratoria: string;
  pulsioximetria: string;
  reflejoSuccion: string;
  toleranciaOral: string;
  deposicion: string;
  orina: string;
  responsable: string;
}

export default function ConstantesVitales() {
  const [constantes, setConstantes] = useState<ConstantesVitalesData>({
    fecha: '',
    hora: '',
    temperatura: '',
    pulso: '',
    presionArterial: '',
    frecuenciaRespiratoria: '',
    pulsioximetria: '',
    reflejoSuccion: '',
    toleranciaOral: '',
    deposicion: '',
    orina: '',
    responsable: '',
  });

  const handleChange = (field: keyof ConstantesVitalesData, value: string) => {
    setConstantes(prev => ({
      ...prev,
      [field]: ['reflejoSuccion', 'toleranciaOral', 'deposicion', 'orina'].includes(field) 
        ? value.toUpperCase() 
        : value,
    }));
  };

  // Lista de licenciadas de enfermería (simulado - debería venir de BD)
  const enfermeras = [
    'LCDA. MARÍA GONZÁLEZ',
    'LCDA. ANA RODRÍGUEZ',
    'LCDA. CARMEN LÓPEZ',
    'LCDA. PATRICIA MARTÍNEZ',
    'LCDA. SOFÍA HERNÁNDEZ',
    'LCDA. LAURA JIMÉNEZ',
    'LCDA. MÓNICA TORRES',
    'LCDA. ANDREA VÁSQUEZ',
  ];

  // Validación de rangos normales
  const getRangeColor = (field: string, value: string): string => {
    if (!value) return '#666';
    const numValue = parseFloat(value);
    
    switch (field) {
      case 'temperatura':
        return (numValue >= 36.5 && numValue <= 37.5) ? '#2e7d32' : '#d32f2f';
      case 'pulso':
        return (numValue >= 120 && numValue <= 160) ? '#2e7d32' : '#d32f2f';
      case 'frecuenciaRespiratoria':
        return (numValue >= 30 && numValue <= 60) ? '#2e7d32' : '#d32f2f';
      case 'pulsioximetria':
        return (numValue >= 95) ? '#2e7d32' : '#d32f2f';
      default:
        return '#666';
    }
  };

  return (
    <Box>
      {/* Sección I: Constantes Vitales */}
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
            <VitalesIcon sx={{ fontSize: '1.2rem' }} />
            I. CONSTANTES VITALES
          </Typography>

          {/* Primera fila - Fecha y Hora */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 2 }}>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%' } }}>
              <TextField
                label="FECHA"
                type="date"
                value={constantes.fecha}
                onChange={(e) => handleChange('fecha', e.target.value)}
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
                helperText="Fecha de registro DD/MM/YYYY"
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
                label="HORA"
                type="time"
                value={constantes.hora}
                onChange={(e) => handleChange('hora', e.target.value)}
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
                helperText="Hora de registro HH:MM"
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

          <Divider sx={{ my: 2 }} />

          {/* Constantes Vitales Principales */}
          <Typography
            variant="subtitle1"
            sx={{
              mb: 1.5,
              fontWeight: "bold",
              color: "#1A3C6D",
              fontSize: "0.9rem",
            }}
          >
            SIGNOS VITALES:
          </Typography>

          {/* Segunda fila - Temperatura y Pulso */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 1.5 }}>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%' } }}>
              <TextField
                label="TEMPERATURA °C"
                value={constantes.temperatura}
                onChange={(e) => handleChange('temperatura', e.target.value)}
                fullWidth
                size="small"
                placeholder="36.5 - 37.5"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TemperaturaIcon sx={{ fontSize: '1rem', color: '#1A3C6D' }} />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                helperText="Rango normal: 36.5°C - 37.5°C"
                FormHelperTextProps={{ sx: { fontSize: "0.7rem" } }}
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                    color: getRangeColor('temperatura', constantes.temperatura)
                  }
                }}
              />
            </Box>
            
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%' } }}>
              <TextField
                label="PULSO/MIN"
                value={constantes.pulso}
                onChange={(e) => handleChange('pulso', e.target.value)}
                fullWidth
                size="small"
                placeholder="120 - 160"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PulsoIcon sx={{ fontSize: '1rem', color: '#1A3C6D' }} />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                helperText="Rango normal: 120-160 lpm"
                FormHelperTextProps={{ sx: { fontSize: "0.7rem" } }}
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                    color: getRangeColor('pulso', constantes.pulso)
                  }
                }}
              />
            </Box>
          </Box>

          {/* Tercera fila - Presión Arterial y Frecuencia Respiratoria */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 1.5 }}>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%' } }}>
              <TextField
                label="PRESIÓN ARTERIAL (mmHg)"
                value={constantes.presionArterial}
                onChange={(e) => handleChange('presionArterial', e.target.value)}
                fullWidth
                size="small"
                placeholder="60/40 - 90/60"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PresionIcon sx={{ fontSize: '1rem', color: '#1A3C6D' }} />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                helperText="Formato: sistólica/diastólica"
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
                label="FRECUENCIA RESPIRATORIA/MIN"
                value={constantes.frecuenciaRespiratoria}
                onChange={(e) => handleChange('frecuenciaRespiratoria', e.target.value)}
                fullWidth
                size="small"
                placeholder="30 - 60"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <RespiracionIcon sx={{ fontSize: '1rem', color: '#1A3C6D' }} />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                helperText="Rango normal: 30-60 rpm"
                FormHelperTextProps={{ sx: { fontSize: "0.7rem" } }}
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                    color: getRangeColor('frecuenciaRespiratoria', constantes.frecuenciaRespiratoria)
                  }
                }}
              />
            </Box>
          </Box>

          {/* Cuarta fila - Pulsioximetría */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 2 }}>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%' } }}>
              <TextField
                label="PULSIOXIMETRÍA (%)"
                value={constantes.pulsioximetria}
                onChange={(e) => handleChange('pulsioximetria', e.target.value)}
                fullWidth
                size="small"
                placeholder="95 - 100"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <OxigenoIcon sx={{ fontSize: '1rem', color: '#1A3C6D' }} />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                helperText="Saturación de oxígeno normal: ≥95%"
                FormHelperTextProps={{ sx: { fontSize: "0.7rem" } }}
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                    color: getRangeColor('pulsioximetria', constantes.pulsioximetria)
                  }
                }}
              />
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Evaluación Neurológica y Funcional */}
          <Typography
            variant="subtitle1"
            sx={{
              mb: 1.5,
              fontWeight: "bold",
              color: "#1A3C6D",
              fontSize: "0.9rem",
            }}
          >
            EVALUACIÓN NEUROLÓGICA Y FUNCIONAL:
          </Typography>

          {/* Quinta fila - Reflejo Succión y Tolerancia Oral */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 1.5 }}>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%' } }}>
              <TextField
                label="REFLEJO SUCCIÓN"
                value={constantes.reflejoSuccion}
                onChange={(e) => handleChange('reflejoSuccion', e.target.value)}
                fullWidth
                size="small"
                placeholder="PRESENTE, AUSENTE, DÉBIL"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ReflexIcon sx={{ fontSize: '1rem', color: '#1A3C6D' }} />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                helperText="Evaluación del reflejo de succión"
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
                label="TOLERANCIA ORAL"
                value={constantes.toleranciaOral}
                onChange={(e) => handleChange('toleranciaOral', e.target.value)}
                fullWidth
                size="small"
                placeholder="BUENA, REGULAR, MALA"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ToleranciaIcon sx={{ fontSize: '1rem', color: '#1A3C6D' }} />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                helperText="Capacidad de alimentación oral"
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

          {/* Sexta fila - Deposición y Orina */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 2 }}>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%' } }}>
              <TextField
                label="DEPOSICIÓN"
                value={constantes.deposicion}
                onChange={(e) => handleChange('deposicion', e.target.value)}
                fullWidth
                size="small"
                placeholder="NORMAL, DURA, BLANDA, LÍQUIDA"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DeposicionIcon sx={{ fontSize: '1rem', color: '#1A3C6D' }} />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                helperText="Características de las deposiciones"
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
                label="ORINA"
                value={constantes.orina}
                onChange={(e) => handleChange('orina', e.target.value)}
                fullWidth
                size="small"
                placeholder="NORMAL, ESCASA, ABUNDANTE"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <OrinaIcon sx={{ fontSize: '1rem', color: '#1A3C6D' }} />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                helperText="Características de la diuresis"
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

          <Divider sx={{ my: 2 }} />

          {/* Responsable */}
          <Typography
            variant="subtitle1"
            sx={{
              mb: 1.5,
              fontWeight: "bold",
              color: "#1A3C6D",
              fontSize: "0.9rem",
            }}
          >
            RESPONSABLE DEL REGISTRO:
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%' } }}>
              <FormControl fullWidth size="small">
                <InputLabel sx={{ fontSize: "0.8rem" }}>LICENCIADA DE ENFERMERÍA</InputLabel>
                <Select
                  value={constantes.responsable}
                  onChange={(e) => handleChange('responsable', e.target.value)}
                  label="LICENCIADA DE ENFERMERÍA"
                  startAdornment={
                    <InputAdornment position="start">
                      <ResponsableIcon sx={{ fontSize: '1rem', color: '#1A3C6D' }} />
                    </InputAdornment>
                  }
                  sx={{ 
                    '& .MuiSelect-select': { 
                      fontSize: '0.85rem',
                      fontWeight: 'bold'
                    }
                  }}
                >
                  {enfermeras.map((enfermera) => (
                    <MenuItem key={enfermera} value={enfermera} sx={{ fontSize: '0.8rem' }}>
                      {enfermera}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>

        </CardContent>
      </Card>

    </Box>
  );
}