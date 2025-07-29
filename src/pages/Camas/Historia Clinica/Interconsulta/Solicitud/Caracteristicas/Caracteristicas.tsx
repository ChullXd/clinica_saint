import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputAdornment,
  Chip,
  Divider,
  Alert,
  Paper,
} from '@mui/material';
import {
  Assignment as SolicitudIcon,
  LocalHospital as ServicioIcon,
  Emergency as EmergenciaIcon,
  PersonSearch as ConsultaIcon,
  Hotel as HospitalizacionIcon,
  MedicalServices as EspecialidadIcon,
  Bed as CamaIcon,
  Room as SalaIcon,
  PriorityHigh as UrgenciaIcon,
  Description as MotivoIcon,
  MonitorHeart as EKGIcon,
  Assessment as ValoracionIcon,
  Receipt as EstadoCuentaIcon,
} from "@mui/icons-material";

interface CaracteristicasData {
  servicio: string;
  especialidad: string;
  numeroCama: string;
  numeroSala: string;
  urgente: string;
  especialidadConsultada: string;
  descripcionMotivo: string;
  ordenEKG: string;
  cargarEstadoCuenta: boolean;
}

export default function Caracteristicas() {
  const [caracteristicas, setCaracteristicas] = useState<CaracteristicasData>({
    servicio: '',
    especialidad: '',
    numeroCama: '',
    numeroSala: '',
    urgente: '',
    especialidadConsultada: '',
    descripcionMotivo: '',
    ordenEKG: '',
    cargarEstadoCuenta: false,
  });

  const handleChange = (field: keyof CaracteristicasData, value: string | boolean) => {
    setCaracteristicas(prev => {
      const newState = {
        ...prev,
        [field]: typeof value === 'string' ? 
          (field === 'especialidad' || field === 'especialidadConsultada' || field === 'descripcionMotivo' ? 
            value.toUpperCase() : value) : 
          value,
      };

      // Auto-activar carga al estado de cuenta si se selecciona EKG
      if (field === 'ordenEKG' && value !== '') {
        newState.cargarEstadoCuenta = true;
      } else if (field === 'ordenEKG' && value === '') {
        newState.cargarEstadoCuenta = false;
      }

      return newState;
    });
  };

  const servicios = [
    { value: 'emergencia', label: 'EMERGENCIA', icon: <EmergenciaIcon sx={{ fontSize: '0.9rem' }} /> },
    { value: 'consulta_externa', label: 'CONSULTA EXTERNA', icon: <ConsultaIcon sx={{ fontSize: '0.9rem' }} /> },
    { value: 'hospitalizacion', label: 'HOSPITALIZACIÓN', icon: <HospitalizacionIcon sx={{ fontSize: '0.9rem' }} /> },
  ];

  const opcionesEKG = [
    { value: 'ekg', label: 'EKG', icon: <EKGIcon sx={{ fontSize: '0.9rem' }} /> },
    { value: 'ekg_valoracion', label: 'EKG + VALORACIÓN', icon: <ValoracionIcon sx={{ fontSize: '0.9rem' }} /> },
  ];

  return (
    <Box>
      {/* Sección B: Características de la Solicitud */}
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
            <SolicitudIcon sx={{ fontSize: '1rem' }} />
            B. CARACTERÍSTICAS DE LA SOLICITUD, MOTIVO Y PRIORIDAD DE ATENCIÓN
          </Typography>

          {/* Servicio */}
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
            <ServicioIcon sx={{ fontSize: '0.9rem' }} />
            SERVICIO:
          </Typography>

          <FormControl component="fieldset" fullWidth sx={{ mb: 2 }}>
            <RadioGroup
              value={caracteristicas.servicio}
              onChange={(e) => handleChange('servicio', e.target.value)}
              sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}
            >
              {servicios.map((servicio) => (
                <Paper
                  key={servicio.value}
                  variant="outlined"
                  sx={{
                    p: 1,
                    backgroundColor: caracteristicas.servicio === servicio.value ? '#e3f2fd' : '#f8f9fa',
                    borderColor: caracteristicas.servicio === servicio.value ? '#1976d2' : '#e0e0e0',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: '#f0f0f0',
                    }
                  }}
                  onClick={() => handleChange('servicio', servicio.value)}
                >
                  <FormControlLabel
                    value={servicio.value}
                    control={<Radio size="small" />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        {servicio.icon}
                        <Typography sx={{ fontSize: '0.75rem', fontWeight: 'bold' }}>
                          {servicio.label}
                        </Typography>
                      </Box>
                    }
                    sx={{ m: 0 }}
                  />
                </Paper>
              ))}
            </RadioGroup>
          </FormControl>

          {/* Campos específicos según servicio */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 2 }}>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%', lg: '1 1 32%' } }}>
              <TextField
                label="ESPECIALIDAD"
                value={caracteristicas.especialidad}
                onChange={(e) => handleChange('especialidad', e.target.value)}
                fullWidth
                size="small"
                placeholder="ESPECIFICAR ESPECIALIDAD"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EspecialidadIcon sx={{ fontSize: '0.9rem', color: '#1A3C6D' }} />
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

            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%', lg: '1 1 32%' } }}>
              <TextField
                label="No. CAMA"
                value={caracteristicas.numeroCama}
                onChange={(e) => handleChange('numeroCama', e.target.value)}
                fullWidth
                size="small"
                type="number"
                placeholder="000"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CamaIcon sx={{ fontSize: '0.9rem', color: '#1A3C6D' }} />
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

            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%', lg: '1 1 32%' } }}>
              <TextField
                label="No. SALA"
                value={caracteristicas.numeroSala}
                onChange={(e) => handleChange('numeroSala', e.target.value)}
                fullWidth
                size="small"
                type="number"
                placeholder="000"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SalaIcon sx={{ fontSize: '0.9rem', color: '#1A3C6D' }} />
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
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Urgente */}
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
            <UrgenciaIcon sx={{ fontSize: '0.9rem' }} />
            URGENTE:
          </Typography>

          <FormControl component="fieldset" fullWidth sx={{ mb: 2 }}>
            <RadioGroup
              row
              value={caracteristicas.urgente}
              onChange={(e) => handleChange('urgente', e.target.value)}
              sx={{ justifyContent: 'center', gap: 3 }}
            >
              <Paper
                variant="outlined"
                sx={{
                  p: 1,
                  backgroundColor: caracteristicas.urgente === 'si' ? '#ffebee' : '#f8f9fa',
                  borderColor: caracteristicas.urgente === 'si' ? '#d32f2f' : '#e0e0e0',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: '#f0f0f0',
                  }
                }}
                onClick={() => handleChange('urgente', 'si')}
              >
                <FormControlLabel
                  value="si"
                  control={<Radio size="small" color="error" />}
                  label={
                    <Typography sx={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#d32f2f' }}>
                      SÍ
                    </Typography>
                  }
                  sx={{ m: 0 }}
                />
              </Paper>

              <Paper
                variant="outlined"
                sx={{
                  p: 1,
                  backgroundColor: caracteristicas.urgente === 'no' ? '#e8f5e8' : '#f8f9fa',
                  borderColor: caracteristicas.urgente === 'no' ? '#4caf50' : '#e0e0e0',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: '#f0f0f0',
                  }
                }}
                onClick={() => handleChange('urgente', 'no')}
              >
                <FormControlLabel
                  value="no"
                  control={<Radio size="small" color="success" />}
                  label={
                    <Typography sx={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#4caf50' }}>
                      NO
                    </Typography>
                  }
                  sx={{ m: 0 }}
                />
              </Paper>
            </RadioGroup>
          </FormControl>

          <Divider sx={{ my: 2 }} />

          {/* Especialidad consultada y motivo */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 2 }}>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%' } }}>
              <TextField
                label="ESPECIALIDAD CONSULTADA"
                value={caracteristicas.especialidadConsultada}
                onChange={(e) => handleChange('especialidadConsultada', e.target.value)}
                fullWidth
                size="small"
                placeholder="ESPECIALIDAD A CONSULTAR"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EspecialidadIcon sx={{ fontSize: '0.9rem', color: '#1A3C6D' }} />
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

            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%' } }}>
              <TextField
                label="DESCRIPCIÓN DEL MOTIVO"
                value={caracteristicas.descripcionMotivo}
                onChange={(e) => handleChange('descripcionMotivo', e.target.value)}
                fullWidth
                size="small"
                multiline
                rows={3}
                placeholder="DESCRIBIR EL MOTIVO DE LA INTERCONSULTA..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1 }}>
                      <MotivoIcon sx={{ fontSize: '0.9rem', color: '#1A3C6D' }} />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{ sx: { fontSize: "0.75rem" } }}
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '0.8rem',
                    lineHeight: 1.5
                  }
                }}
              />
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Orden de Electrocardiograma */}
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
            <EKGIcon sx={{ fontSize: '0.9rem' }} />
            ORDEN DE ELECTROCARDIOGRAMA:
          </Typography>

          <FormControl component="fieldset" fullWidth sx={{ mb: 2 }}>
            <RadioGroup
              value={caracteristicas.ordenEKG}
              onChange={(e) => handleChange('ordenEKG', e.target.value)}
              sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}
            >
              {opcionesEKG.map((opcion) => (
                <Paper
                  key={opcion.value}
                  variant="outlined"
                  sx={{
                    p: 1.5,
                    backgroundColor: caracteristicas.ordenEKG === opcion.value ? '#fff3e0' : '#f8f9fa',
                    borderColor: caracteristicas.ordenEKG === opcion.value ? '#f57c00' : '#e0e0e0',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: '#f0f0f0',
                    }
                  }}
                  onClick={() => handleChange('ordenEKG', opcion.value)}
                >
                  <FormControlLabel
                    value={opcion.value}
                    control={<Radio size="small" color="warning" />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        {opcion.icon}
                        <Typography sx={{ fontSize: '0.75rem', fontWeight: 'bold' }}>
                          {opcion.label}
                        </Typography>
                      </Box>
                    }
                    sx={{ m: 0 }}
                  />
                </Paper>
              ))}
            </RadioGroup>
          </FormControl>

          {/* Indicador de carga al estado de cuenta */}
          {caracteristicas.ordenEKG && (
            <Alert 
              severity="info" 
              sx={{ 
                fontSize: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <EstadoCuentaIcon sx={{ fontSize: '1rem' }} />
              <Box>
                <Typography sx={{ fontSize: '0.75rem', fontWeight: 'bold' }}>
                  CARGA AUTOMÁTICA AL ESTADO DE CUENTA
                </Typography>
                <Typography sx={{ fontSize: '0.7rem' }}>
                  El {caracteristicas.ordenEKG === 'ekg' ? 'EKG' : 'EKG + VALORACIÓN'} será cargado automáticamente al estado de cuenta del paciente.
                </Typography>
              </Box>
            </Alert>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}