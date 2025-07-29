import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Business as BusinessIcon,
  Badge as BadgeIcon,
  LocalHospital as HospitalIcon,
  Assignment as HistoriaIcon,
  Folder as ArchivoIcon,
} from "@mui/icons-material";

interface EstablecimientoPacienteData {
  institucionSistema: string;
  unicodigo: string;
  establecimientoSalud: string;
  numeroHistoriaClinica: string;
  numeroArchivo: string;
  // Datos adicionales del paciente (desde admisión)
  nombreCompleto?: string;
  tipoIdentificacion?: string;
  fechaAdmision?: string;
}

export default function EstablecimientoPaciente() {
  const [datos, setDatos] = useState<EstablecimientoPacienteData>({
    institucionSistema: '',
    unicodigo: '',
    establecimientoSalud: '',
    numeroHistoriaClinica: '',
    numeroArchivo: '',
    nombreCompleto: '',
    tipoIdentificacion: '',
    fechaAdmision: '',
  });

  const [isLoading, setIsLoading] = useState(true);

  // Simular carga de datos desde la admisión del paciente
  useEffect(() => {
    // Simular llamada a API o base de datos
    const cargarDatosAdmision = async () => {
      setIsLoading(true);
      
      // Simular delay de carga
      setTimeout(() => {
        // Datos predeterminados del establecimiento
        const datosEstablecimiento = {
          institucionSistema: 'RPC',
          unicodigo: '64876',
          establecimientoSalud: 'RIVAMEDIC S. A.',
          numeroHistoriaClinica: '1234567890', // Cédula del paciente o 0
          numeroArchivo: 'EST-2025-001234', // Número generado por estadística
          // Datos adicionales simulados
          nombreCompleto: 'JUAN CARLOS PÉREZ GONZÁLEZ',
          tipoIdentificacion: 'CÉDULA DE CIUDADANÍA',
          fechaAdmision: new Date().toISOString().split('T')[0],
        };

        setDatos(datosEstablecimiento);
        setIsLoading(false);
      }, 1000);
    };

    cargarDatosAdmision();
  }, []);

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
              fontSize: "1rem",
            }}
          >
            A. DATOS DEL ESTABLECIMIENTO Y PACIENTE
          </Typography>

          {/* Primera fila - Datos del establecimiento */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 1.5 }}>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 31%' } }}>
              <TextField
                label="INSTITUCIÓN DEL SISTEMA"
                value={isLoading ? 'Cargando...' : datos.institucionSistema}
                fullWidth
                size="small"
                InputProps={{ 
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <BusinessIcon sx={{ fontSize: '1rem', color: '#1A3C6D' }} />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                helperText="Nombre de la institución según corresponda"
                FormHelperTextProps={{ sx: { fontSize: "0.7rem" } }}
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                    textTransform: 'uppercase'
                  },
                  '& .MuiInputBase-root': {
                    backgroundColor: '#f8f9fa'
                  }
                }}
              />
            </Box>
            
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 31%' } }}>
              <TextField
                label="UNICÓDIGO"
                value={isLoading ? 'Cargando...' : datos.unicodigo}
                fullWidth
                size="small"
                InputProps={{ 
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <BadgeIcon sx={{ fontSize: '1rem', color: '#1A3C6D' }} />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                helperText="Código único del establecimiento de salud"
                FormHelperTextProps={{ sx: { fontSize: "0.7rem" } }}
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                    textTransform: 'uppercase'
                  },
                  '& .MuiInputBase-root': {
                    backgroundColor: '#f8f9fa'
                  }
                }}
              />
            </Box>

            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 31%' } }}>
              <TextField
                label="ESTABLECIMIENTO DE SALUD"
                value={isLoading ? 'Cargando...' : datos.establecimientoSalud}
                fullWidth
                size="small"
                InputProps={{ 
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <HospitalIcon sx={{ fontSize: '1rem', color: '#1A3C6D' }} />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                helperText="Nombre completo del establecimiento"
                FormHelperTextProps={{ sx: { fontSize: "0.7rem" } }}
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                    textTransform: 'uppercase'
                  },
                  '& .MuiInputBase-root': {
                    backgroundColor: '#f8f9fa'
                  }
                }}
              />
            </Box>
          </Box>
          
          {/* Segunda fila - Datos del paciente */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%' } }}>
              <TextField
                label="N° HISTORIA CLÍNICA"
                value={isLoading ? 'Cargando...' : datos.numeroHistoriaClinica}
                fullWidth
                size="small"
                InputProps={{ 
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <HistoriaIcon sx={{ fontSize: '1rem', color: '#1A3C6D' }} />
                    </InputAdornment>
                  ),
                }}
                helperText="Cédula de ciudadanía, pasaporte o carnet de refugiado (0 si no tiene HC)"
                FormHelperTextProps={{ sx: { fontSize: "0.7rem" } }}
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '0.85rem',
                    fontWeight: 'bold'
                  },
                  '& .MuiInputBase-root': {
                    backgroundColor: '#f8f9fa'
                  }
                }}
              />
            </Box>
            
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%' } }}>
              <TextField
                label="N° ARCHIVO"
                value={isLoading ? 'Cargando...' : datos.numeroArchivo}
                fullWidth
                size="small"
                InputProps={{ 
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <ArchivoIcon sx={{ fontSize: '1rem', color: '#1A3C6D' }} />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                helperText="Número de archivo emitido por el área de estadística"
                FormHelperTextProps={{ sx: { fontSize: "0.7rem" } }}
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '0.85rem',
                    fontWeight: 'bold'
                  },
                  '& .MuiInputBase-root': {
                    backgroundColor: '#f8f9fa'
                  }
                }}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Datos Adicionales del Paciente */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 2 }}>
          <Typography
            variant="h6"
            sx={{
              mb: 1.5,
              fontWeight: "bold",
              color: "#1A3C6D",
              fontSize: "1rem",
            }}
          >
            INFORMACIÓN ADICIONAL DEL PACIENTE
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 1.5 }}>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%' } }}>
              <TextField
                label="NOMBRE COMPLETO DEL PACIENTE"
                value={isLoading ? 'Cargando...' : datos.nombreCompleto}
                fullWidth
                size="small"
                InputProps={{ readOnly: true }}
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                    textTransform: 'uppercase'
                  },
                  '& .MuiInputBase-root': {
                    backgroundColor: '#f8f9fa'
                  }
                }}
              />
            </Box>
            
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 23%' } }}>
              <TextField
                label="TIPO DE IDENTIFICACIÓN"
                value={isLoading ? 'Cargando...' : datos.tipoIdentificacion}
                fullWidth
                size="small"
                InputProps={{ readOnly: true }}
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  },
                  '& .MuiInputBase-root': {
                    backgroundColor: '#f8f9fa'
                  }
                }}
              />
            </Box>

            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 23%' } }}>
              <TextField
                label="FECHA DE ADMISIÓN"
                value={isLoading ? 'Cargando...' : datos.fechaAdmision}
                fullWidth
                size="small"
                InputProps={{ readOnly: true }}
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  },
                  '& .MuiInputBase-root': {
                    backgroundColor: '#f8f9fa'
                  }
                }}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}