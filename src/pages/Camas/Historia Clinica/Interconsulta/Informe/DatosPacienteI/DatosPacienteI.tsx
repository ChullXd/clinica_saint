import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  Radio,
  InputAdornment,
  Chip,
  Divider,
  Alert,
} from '@mui/material';
import {
  Business as InstitucionIcon,
  LocationOn as EstablecimientoIcon,
  Assignment as HistoriaIcon,
  FolderSpecial as ArchivoIcon,
  Description as HojaIcon,
  Person as PacienteIcon,
  Wc as SexoIcon,
  Cake as EdadIcon,
  Schedule as CondicionIcon,
  LocationOn,
} from "@mui/icons-material";

interface PacienteData {
  // Datos del establecimiento
  institucionSistema: string;
  unicodigo: string;
  establecimientoSalud: string;
  numeroHistoriaClinica: string;
  numeroArchivo: string;
  numeroHoja: string;
  
  // Datos del paciente
  primerApellido: string;
  segundoApellido: string;
  primerNombre: string;
  segundoNombre: string;
  sexo: string;
  edad: string;
  condicionEdad: string;
}

export default function DatosPacienteI() {
  const [paciente, setPaciente] = useState<PacienteData>({
    // Datos predeterminados del establecimiento
    institucionSistema: 'RPC',
    unicodigo: '64876',
    establecimientoSalud: 'RIVAMEDIC S.A.',
    numeroHistoriaClinica: '',
    numeroArchivo: '',
    numeroHoja: '001',
    
    // Datos del paciente (vacíos - se llenan desde admisión)
    primerApellido: '',
    segundoApellido: '',
    primerNombre: '',
    segundoNombre: '',
    sexo: '',
    edad: '',
    condicionEdad: 'años',
  });

  // Simular carga de datos desde la hoja de emergencia 008
  useEffect(() => {
    // Simulación de datos que vendrían de la admisión
    const datosAdmision = {
      numeroHistoriaClinica: '1234567890',
      numeroArchivo: 'EST-2024-001234',
      primerApellido: 'GONZÁLEZ',
      segundoApellido: 'MARTÍNEZ',
      primerNombre: 'MARÍA',
      segundoNombre: 'ALEJANDRA',
      sexo: 'femenino',
      edad: '28',
      condicionEdad: 'años',
    };

    // Simular delay de carga
    setTimeout(() => {
      setPaciente(prev => ({
        ...prev,
        ...datosAdmision
      }));
    }, 1000);
  }, []);

  const handleChange = (field: keyof PacienteData, value: string) => {
    setPaciente(prev => ({
      ...prev,
      [field]: field.includes('Nombre') || field.includes('Apellido') ? value.toUpperCase() : value,
    }));
  };

  return (
    <Box>
      {/* Sección A: Datos del Establecimiento y Paciente */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 2 }}>
          <Typography
            variant="h6"
            sx={{
              mb: 1.5,
              fontWeight: "bold",
              color: "#1A3C6D",
              fontSize: "0.9rem",
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <InstitucionIcon sx={{ fontSize: '1rem' }} />
            A. DATOS DEL ESTABLECIMIENTO Y PACIENTE
          </Typography>

          {/* Datos del Establecimiento */}
          <Typography
            variant="subtitle1"
            sx={{
              mb: 1.5,
              fontWeight: "bold",
              color: "#1A3C6D",
              fontSize: "0.8rem",
            }}
          >
            DATOS DEL ESTABLECIMIENTO:
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 2 }}>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%', lg: '1 1 32%' } }}>
              <TextField
                label="INSTITUCIÓN DEL SISTEMA"
                value={paciente.institucionSistema}
                fullWidth
                size="small"
                disabled
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <InstitucionIcon sx={{ fontSize: '0.9rem', color: '#1A3C6D' }} />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{ sx: { fontSize: "0.75rem" } }}
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    color: '#1A3C6D'
                  }
                }}
              />
            </Box>

            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%', lg: '1 1 32%' } }}>
              <TextField
                label="UNICÓDIGO"
                value={paciente.unicodigo}
                fullWidth
                size="small"
                disabled
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOn sx={{ fontSize: '0.9rem', color: '#1A3C6D' }} />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{ sx: { fontSize: "0.75rem" } }}
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    color: '#1A3C6D'
                  }
                }}
              />
            </Box>

            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 100%', lg: '1 1 32%' } }}>
              <TextField
                label="ESTABLECIMIENTO DE SALUD"
                value={paciente.establecimientoSalud}
                fullWidth
                size="small"
                disabled
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EstablecimientoIcon sx={{ fontSize: '0.9rem', color: '#1A3C6D' }} />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{ sx: { fontSize: "0.75rem" } }}
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    color: '#1A3C6D'
                  }
                }}
              />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 2 }}>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%', lg: '1 1 32%' } }}>
              <TextField
                label="NÚMERO DE HISTORIA CLÍNICA"
                value={paciente.numeroHistoriaClinica}
                onChange={(e) => handleChange('numeroHistoriaClinica', e.target.value)}
                fullWidth
                size="small"
                disabled
                placeholder="Cédula / Pasaporte / Carnet refugiado"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <HistoriaIcon sx={{ fontSize: '0.9rem', color: '#1A3C6D' }} />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{ sx: { fontSize: "0.75rem" } }}
                helperText="Desde admisión del paciente"
                FormHelperTextProps={{ sx: { fontSize: "0.65rem" } }}
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }
                }}
              />
            </Box>

            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%', lg: '1 1 32%' } }}>
              <TextField
                label="NÚMERO DE ARCHIVO"
                value={paciente.numeroArchivo}
                onChange={(e) => handleChange('numeroArchivo', e.target.value)}
                fullWidth
                size="small"
                disabled
                placeholder="Emitido por estadística"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ArchivoIcon sx={{ fontSize: '0.9rem', color: '#1A3C6D' }} />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{ sx: { fontSize: "0.75rem" } }}
                helperText="Área de estadística"
                FormHelperTextProps={{ sx: { fontSize: "0.65rem" } }}
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }
                }}
              />
            </Box>

            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%', lg: '1 1 32%' } }}>
              <TextField
                label="No. HOJA"
                value={paciente.numeroHoja}
                onChange={(e) => handleChange('numeroHoja', e.target.value)}
                fullWidth
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <HojaIcon sx={{ fontSize: '0.9rem', color: '#1A3C6D' }} />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{ sx: { fontSize: "0.75rem" } }}
                helperText="Número de hoja"
                FormHelperTextProps={{ sx: { fontSize: "0.65rem" } }}
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }
                }}
              />
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Datos del Paciente */}
          <Typography
            variant="subtitle1"
            sx={{
              mb: 1.5,
              fontWeight: "bold",
              color: "#1A3C6D",
              fontSize: "0.8rem",
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <PacienteIcon sx={{ fontSize: '0.9rem' }} />
            DATOS DEL PACIENTE (DESDE HOJA DE EMERGENCIA 008):
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 2 }}>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%' } }}>
              <TextField
                label="PRIMER APELLIDO"
                value={paciente.primerApellido}
                onChange={(e) => handleChange('primerApellido', e.target.value)}
                fullWidth
                size="small"
                disabled
                InputLabelProps={{ sx: { fontSize: "0.75rem" } }}
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }
                }}
              />
            </Box>

            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%' } }}>
              <TextField
                label="SEGUNDO APELLIDO"
                value={paciente.segundoApellido}
                onChange={(e) => handleChange('segundoApellido', e.target.value)}
                fullWidth
                size="small"
                disabled
                InputLabelProps={{ sx: { fontSize: "0.75rem" } }}
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }
                }}
              />
            </Box>

            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%' } }}>
              <TextField
                label="PRIMER NOMBRE"
                value={paciente.primerNombre}
                onChange={(e) => handleChange('primerNombre', e.target.value)}
                fullWidth
                size="small"
                disabled
                InputLabelProps={{ sx: { fontSize: "0.75rem" } }}
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }
                }}
              />
            </Box>

            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%' } }}>
              <TextField
                label="SEGUNDO NOMBRE"
                value={paciente.segundoNombre}
                onChange={(e) => handleChange('segundoNombre', e.target.value)}
                fullWidth
                size="small"
                disabled
                InputLabelProps={{ sx: { fontSize: "0.75rem" } }}
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }
                }}
              />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 2 }}>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 32%' } }}>
              <FormControl fullWidth size="small" disabled>
                <InputLabel sx={{ fontSize: "0.75rem" }}>SEXO</InputLabel>
                <Select
                  value={paciente.sexo}
                  onChange={(e) => handleChange('sexo', e.target.value)}
                  label="SEXO"
                  startAdornment={
                    <InputAdornment position="start">
                      <SexoIcon sx={{ fontSize: '0.9rem', color: '#1A3C6D' }} />
                    </InputAdornment>
                  }
                  sx={{ 
                    '& .MuiSelect-select': { 
                      fontSize: '0.8rem',
                      fontWeight: 'bold'
                    }
                  }}
                >
                  <MenuItem value="masculino" sx={{ fontSize: '0.8rem' }}>MASCULINO</MenuItem>
                  <MenuItem value="femenino" sx={{ fontSize: '0.8rem' }}>FEMENINO</MenuItem>
                  <MenuItem value="intersex" sx={{ fontSize: '0.8rem' }}>INTERSEX</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 32%' } }}>
              <TextField
                label="EDAD"
                value={paciente.edad}
                onChange={(e) => handleChange('edad', e.target.value)}
                fullWidth
                size="small"
                disabled
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EdadIcon sx={{ fontSize: '0.9rem', color: '#1A3C6D' }} />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{ sx: { fontSize: "0.75rem" } }}
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }
                }}
              />
            </Box>

            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 32%' } }}>
              <FormControl fullWidth size="small" disabled>
                <InputLabel sx={{ fontSize: "0.75rem" }}>CONDICIÓN EDAD</InputLabel>
                <Select
                  value={paciente.condicionEdad}
                  onChange={(e) => handleChange('condicionEdad', e.target.value)}
                  label="CONDICIÓN EDAD"
                  startAdornment={
                    <InputAdornment position="start">
                      <CondicionIcon sx={{ fontSize: '0.9rem', color: '#1A3C6D' }} />
                    </InputAdornment>
                  }
                  sx={{ 
                    '& .MuiSelect-select': { 
                      fontSize: '0.8rem',
                      fontWeight: 'bold'
                    }
                  }}
                >
                  <MenuItem value="horas" sx={{ fontSize: '0.8rem' }}>HORAS</MenuItem>
                  <MenuItem value="días" sx={{ fontSize: '0.8rem' }}>DÍAS</MenuItem>
                  <MenuItem value="meses" sx={{ fontSize: '0.8rem' }}>MESES</MenuItem>
                  <MenuItem value="años" sx={{ fontSize: '0.8rem' }}>AÑOS</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </CardContent>
      </Card>

    

    </Box>
  );
}