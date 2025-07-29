import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  InputAdornment,
} from '@mui/material';
import {
  Logout as AltaIcon,
  Person as VivoIcon,
  PersonOff as FallecidoIcon,
  LocalHospital as MedicaIcon,
  DirectionsWalk as VoluntariaIcon,
  CheckCircle as AsintomaticoIcon,
  Accessible as DiscapacidadIcon,
  Schedule as TiempoIcon,
  Hotel as EstadiasIcon,
  AccessTime as ReposoIcon,
  Save as GuardarIcon,
  Edit as EditarIcon,
  Info as InfoIcon,
  Warning as AlertaIcon,
} from '@mui/icons-material';

interface CondicionAlta {
  estadoVital: 'VIVO' | 'FALLECIDO' | '';
  tipoAlta: 'ALTA_MEDICA' | 'ALTA_VOLUNTARIA' | 'ASINTOMATICO' | 'DISCAPACIDAD' | 'RETIRO_NO_AUTORIZADO' | 'DEFUNCION_MENOS_48H' | 'DEFUNCION_MAS_48H' | '';
  diasEstadia: number;
  diasReposo: number;
  fechaAlta: string;
  horaAlta: string;
  editadoPor: string;
  fechaEdicion: string;
}

export default function AltaEgreso() {
  const [condicionAlta, setCondicionAlta] = useState<CondicionAlta>({
    estadoVital: '',
    tipoAlta: '',
    diasEstadia: 0,
    diasReposo: 0,
    fechaAlta: '',
    horaAlta: '',
    editadoPor: '',
    fechaEdicion: ''
  });

  const [modoEdicion, setModoEdicion] = useState(false);
  const [errores, setErrores] = useState<string[]>([]);

  // Cargar datos iniciales
  useEffect(() => {
    const condicionInicial: CondicionAlta = {
      estadoVital: 'VIVO',
      tipoAlta: 'ALTA_MEDICA',
      diasEstadia: 5,
      diasReposo: 30,
      fechaAlta: '2024-07-29',
      horaAlta: '14:30',
      editadoPor: 'Dr. Carlos Mendoza Silva',
      fechaEdicion: '2024-07-29 14:30'
    };

    setCondicionAlta(condicionInicial);
  }, []);

  // Validar formulario
  const validarFormulario = (): string[] => {
    const erroresValidacion: string[] = [];

    if (!condicionAlta.estadoVital) {
      erroresValidacion.push('Debe seleccionar el estado vital del paciente');
    }

    if (!condicionAlta.tipoAlta) {
      erroresValidacion.push('Debe seleccionar el tipo de alta/egreso');
    }

    if (condicionAlta.diasEstadia < 0) {
      erroresValidacion.push('Los días de estadía no pueden ser negativos');
    }

    if (condicionAlta.diasReposo < 0) {
      erroresValidacion.push('Los días de reposo no pueden ser negativos');
    }

    // Validaciones específicas según estado vital
    if (condicionAlta.estadoVital === 'FALLECIDO') {
      if (!['DEFUNCION_MENOS_48H', 'DEFUNCION_MAS_48H'].includes(condicionAlta.tipoAlta)) {
        erroresValidacion.push('Para paciente fallecido debe seleccionar tipo de defunción');
      }
    }

    if (condicionAlta.estadoVital === 'VIVO') {
      if (['DEFUNCION_MENOS_48H', 'DEFUNCION_MAS_48H'].includes(condicionAlta.tipoAlta)) {
        erroresValidacion.push('Para paciente vivo no puede seleccionar defunción');
      }
    }

    return erroresValidacion;
  };

  const handleEstadoVitalChange = (value: 'VIVO' | 'FALLECIDO') => {
    setCondicionAlta(prev => ({
      ...prev,
      estadoVital: value,
      tipoAlta: '' // Limpiar tipo de alta incompatible
    }));
  };

  const handleTipoAltaChange = (value: string) => {
    setCondicionAlta(prev => ({
      ...prev,
      tipoAlta: value as any
    }));
  };

  const handleDiasChange = (campo: 'diasEstadia' | 'diasReposo', valor: number) => {
    setCondicionAlta(prev => ({
      ...prev,
      [campo]: valor >= 0 ? valor : 0
    }));
  };

  const handleGuardar = () => {
    const erroresValidacion = validarFormulario();
    setErrores(erroresValidacion);

    if (erroresValidacion.length === 0) {
      setCondicionAlta(prev => ({
        ...prev,
        fechaEdicion: new Date().toLocaleString('es-CO'),
        editadoPor: 'Dr. Usuario Actual'
      }));
      setModoEdicion(false);
      console.log('Condición de alta guardada:', condicionAlta);
    }
  };

  // Opciones de tipo de alta según estado vital
  const getOpcionesTipoAlta = () => {
    if (condicionAlta.estadoVital === 'VIVO') {
      return [
        { value: 'ALTA_MEDICA', label: 'Alta médica', icon: <MedicaIcon sx={{ fontSize: '0.8rem' }} /> },
        { value: 'ALTA_VOLUNTARIA', label: 'Alta voluntaria', icon: <VoluntariaIcon sx={{ fontSize: '0.8rem' }} /> },
        { value: 'ASINTOMATICO', label: 'Asintomático', icon: <AsintomaticoIcon sx={{ fontSize: '0.8rem' }} /> },
        { value: 'DISCAPACIDAD', label: 'Discapacidad', icon: <DiscapacidadIcon sx={{ fontSize: '0.8rem' }} /> },
        { value: 'RETIRO_NO_AUTORIZADO', label: 'Retiro no autorizado', icon: <AltaIcon sx={{ fontSize: '0.8rem' }} /> }
      ];
    } else if (condicionAlta.estadoVital === 'FALLECIDO') {
      return [
        { value: 'DEFUNCION_MENOS_48H', label: 'Defunción menos de 48 horas', icon: <TiempoIcon sx={{ fontSize: '0.8rem' }} /> },
        { value: 'DEFUNCION_MAS_48H', label: 'Defunción más de 48 horas', icon: <TiempoIcon sx={{ fontSize: '0.8rem' }} /> }
      ];
    }
    return [];
  };

  const getDescripcionEstado = () => {
    switch (condicionAlta.tipoAlta) {
      case 'ALTA_MEDICA':
        return 'Paciente egresa por mejoría clínica con indicación médica';
      case 'ALTA_VOLUNTARIA':
        return 'Paciente solicita alta por voluntad propia';
      case 'ASINTOMATICO':
        return 'Paciente egresa sin síntomas activos';
      case 'DISCAPACIDAD':
        return 'Paciente egresa con algún grado de discapacidad';
      case 'RETIRO_NO_AUTORIZADO':
        return 'Paciente se retira sin autorización médica';
      case 'DEFUNCION_MENOS_48H':
        return 'Paciente falleció antes de las 48 horas de ingreso';
      case 'DEFUNCION_MAS_48H':
        return 'Paciente falleció después de las 48 horas de ingreso';
      default:
        return '';
    }
  };

  return (
    <Box>
      {/* Sección H: Condición de Alta/Egreso */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#1A3C6D",
                fontSize: "0.9rem",
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <AltaIcon sx={{ fontSize: '1rem' }} />
              H. CONDICIÓN DE ALTA/EGRESO
            </Typography>

            {/* Información de estado */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              {condicionAlta.estadoVital && (
                <Chip
                  icon={condicionAlta.estadoVital === 'VIVO' ? 
                    <VivoIcon sx={{ fontSize: '0.7rem' }} /> : 
                    <FallecidoIcon sx={{ fontSize: '0.7rem' }} />
                  }
                  label={condicionAlta.estadoVital}
                  size="small"
                  color={condicionAlta.estadoVital === 'VIVO' ? 'success' : 'error'}
                  sx={{ fontSize: '0.65rem', fontWeight: 'bold' }}
                />
              )}
              {condicionAlta.tipoAlta && (
                <Chip
                  label={condicionAlta.tipoAlta.replace(/_/g, ' ')}
                  size="small"
                  color="primary"
                  sx={{ fontSize: '0.65rem' }}
                />
              )}
            </Box>
          </Box>

          {/* Controles de edición */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            {!modoEdicion ? (
              <Button
                variant="contained"
                startIcon={<EditarIcon />}
                onClick={() => setModoEdicion(true)}
                sx={{ 
                  fontSize: '0.65rem', 
                  textTransform: 'none',
                  backgroundColor: '#1976d2'
                }}
              >
                Editar Condición
              </Button>
            ) : (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="contained"
                  startIcon={<GuardarIcon />}
                  onClick={handleGuardar}
                  sx={{ 
                    fontSize: '0.65rem', 
                    textTransform: 'none',
                    backgroundColor: '#4caf50',
                    '&:hover': { backgroundColor: '#388e3c' }
                  }}
                >
                  Guardar
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setModoEdicion(false);
                    setErrores([]);
                  }}
                  sx={{ fontSize: '0.65rem', textTransform: 'none' }}
                >
                  Cancelar
                </Button>
              </Box>
            )}
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* Errores de validación */}
          {errores.length > 0 && modoEdicion && (
            <Alert severity="error" sx={{ mb: 2, fontSize: '0.7rem' }}>
              <strong>Errores de validación:</strong>
              <ul style={{ margin: '0.5rem 0', paddingLeft: '1rem' }}>
                {errores.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </Alert>
          )}

          {/* Sección 1: Estado Vital (Marque con X) */}
          <Paper variant="outlined" sx={{ p: 1.5, mb: 2, backgroundColor: '#f8f9fa' }}>
            <Typography
              sx={{
                fontSize: '0.8rem',
                fontWeight: 'bold',
                color: '#1A3C6D',
                mb: 1.5,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <InfoIcon sx={{ fontSize: '1rem' }} />
              1. ESTADO VITAL (Marque con X):
            </Typography>

            <FormControl component="fieldset" disabled={!modoEdicion}>
              <RadioGroup
                value={condicionAlta.estadoVital}
                onChange={(e) => handleEstadoVitalChange(e.target.value as 'VIVO' | 'FALLECIDO')}
                sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}
              >
                <FormControlLabel
                  value="VIVO"
                  control={<Radio size="small" />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <VivoIcon sx={{ fontSize: '0.8rem', color: '#4caf50' }} />
                      <Typography sx={{ fontSize: '0.75rem' }}>Vivo</Typography>
                    </Box>
                  }
                  sx={{ 
                    mr: 3,
                    '& .MuiFormControlLabel-label': { fontSize: '0.75rem' }
                  }}
                />
                <FormControlLabel
                  value="FALLECIDO"
                  control={<Radio size="small" />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <FallecidoIcon sx={{ fontSize: '0.8rem', color: '#f44336' }} />
                      <Typography sx={{ fontSize: '0.75rem' }}>Fallecido</Typography>
                    </Box>
                  }
                  sx={{ 
                    '& .MuiFormControlLabel-label': { fontSize: '0.75rem' }
                  }}
                />
              </RadioGroup>
            </FormControl>
          </Paper>

          {/* Sección 2: Tipo de Alta (Marque con X) */}
          <Paper variant="outlined" sx={{ p: 1.5, mb: 2, backgroundColor: '#f8f9fa' }}>
            <Typography
              sx={{
                fontSize: '0.8rem',
                fontWeight: 'bold',
                color: '#1A3C6D',
                mb: 1.5,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <AltaIcon sx={{ fontSize: '1rem' }} />
              2. TIPO DE ALTA/EGRESO (Marque con X):
            </Typography>

            {condicionAlta.estadoVital ? (
              <FormControl component="fieldset" disabled={!modoEdicion}>
                <RadioGroup
                  value={condicionAlta.tipoAlta}
                  onChange={(e) => handleTipoAltaChange(e.target.value)}
                  sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
                >
                  {getOpcionesTipoAlta().map((opcion) => (
                    <FormControlLabel
                      key={opcion.value}
                      value={opcion.value}
                      control={<Radio size="small" />}
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          {opcion.icon}
                          <Typography sx={{ fontSize: '0.75rem' }}>
                            {opcion.label}
                          </Typography>
                        </Box>
                      }
                      sx={{ 
                        '& .MuiFormControlLabel-label': { fontSize: '0.75rem' },
                        ml: 0
                      }}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            ) : (
              <Alert severity="info" sx={{ fontSize: '0.7rem' }}>
                Seleccione primero el estado vital para ver las opciones de alta
              </Alert>
            )}

            {/* Descripción del tipo de alta seleccionado */}
            {condicionAlta.tipoAlta && (
              <Box sx={{ mt: 1.5, p: 1, backgroundColor: '#e3f2fd', borderRadius: 1, border: '1px solid #90caf9' }}>
                <Typography sx={{ fontSize: '0.7rem', color: '#1565c0', fontStyle: 'italic' }}>
                  <InfoIcon sx={{ fontSize: '0.7rem', mr: 0.5 }} />
                  {getDescripcionEstado()}
                </Typography>
              </Box>
            )}
          </Paper>

          {/* Sección 3: Días Numéricos */}
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
            {/* Días de Estadía */}
            <Paper variant="outlined" sx={{ p: 1.5, flex: 1, minWidth: '250px', backgroundColor: '#fff3e0' }}>
              <Typography
                sx={{
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                  color: '#f57c00',
                  mb: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <EstadiasIcon sx={{ fontSize: '1rem' }} />
                3. DÍAS DE ESTADÍA:
              </Typography>

              <TextField
                type="number"
                value={condicionAlta.diasEstadia}
                onChange={(e) => handleDiasChange('diasEstadia', parseInt(e.target.value) || 0)}
                disabled={!modoEdicion}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EstadiasIcon sx={{ fontSize: '0.8rem', color: '#f57c00' }} />
                    </InputAdornment>
                  ),
                  inputProps: { min: 0, style: { fontSize: '0.8rem', textAlign: 'center' } }
                }}
                sx={{
                  '& .MuiInputBase-root': {
                    fontSize: '0.8rem'
                  }
                }}
                helperText="Días totales de hospitalización"
              />

              <Typography sx={{ fontSize: '0.65rem', color: '#666', mt: 1, textAlign: 'center' }}>
                Calculado automáticamente desde ingreso hasta egreso
              </Typography>
            </Paper>

            {/* Días de Reposo */}
            <Paper variant="outlined" sx={{ p: 1.5, flex: 1, minWidth: '250px', backgroundColor: '#e8f5e8' }}>
              <Typography
                sx={{
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                  color: '#4caf50',
                  mb: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <ReposoIcon sx={{ fontSize: '1rem' }} />
                4. DÍAS DE REPOSO:
              </Typography>

              <TextField
                type="number"
                value={condicionAlta.diasReposo}
                onChange={(e) => handleDiasChange('diasReposo', parseInt(e.target.value) || 0)}
                disabled={!modoEdicion}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ReposoIcon sx={{ fontSize: '0.8rem', color: '#4caf50' }} />
                    </InputAdornment>
                  ),
                  inputProps: { min: 0, style: { fontSize: '0.8rem', textAlign: 'center' } }
                }}
                sx={{
                  '& .MuiInputBase-root': {
                    fontSize: '0.8rem'
                  }
                }}
                helperText="Días de incapacidad médica recomendada"
              />

              <Typography sx={{ fontSize: '0.65rem', color: '#666', mt: 1, textAlign: 'center' }}>
                Según protocolo de recuperación post-infarto
              </Typography>
            </Paper>
          </Box>

          {/* Resumen de condición de alta */}
          {condicionAlta.estadoVital && condicionAlta.tipoAlta && (
            <Paper variant="outlined" sx={{ p: 1.5, backgroundColor: '#f0f7ff', border: '2px solid #2196f3' }}>
              <Typography
                sx={{
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                  color: '#1565c0',
                  mb: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <InfoIcon sx={{ fontSize: '1rem' }} />
                📋 RESUMEN DE CONDICIÓN DE ALTA:
              </Typography>

              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, fontSize: '0.7rem' }}>
                <Typography><strong>Estado Vital:</strong> {condicionAlta.estadoVital}</Typography>
                <Typography><strong>Tipo de Alta:</strong> {condicionAlta.tipoAlta.replace(/_/g, ' ')}</Typography>
                <Typography><strong>Días Estadía:</strong> {condicionAlta.diasEstadia} días</Typography>
                <Typography><strong>Días Reposo:</strong> {condicionAlta.diasReposo} días</Typography>
                {condicionAlta.fechaAlta && (
                  <>
                    <Typography><strong>Fecha Alta:</strong> {condicionAlta.fechaAlta}</Typography>
                    <Typography><strong>Hora Alta:</strong> {condicionAlta.horaAlta}</Typography>
                  </>
                )}
              </Box>

              <Typography sx={{ fontSize: '0.7rem', color: '#1565c0', mt: 1, fontStyle: 'italic' }}>
                {getDescripcionEstado()}
              </Typography>
            </Paper>
          )}

          {/* Información de edición */}
          {condicionAlta.fechaEdicion && (
            <Typography sx={{ fontSize: '0.6rem', color: '#999', fontStyle: 'italic', mt: 1, textAlign: 'right' }}>
              Última edición: {condicionAlta.fechaEdicion} - {condicionAlta.editadoPor}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}