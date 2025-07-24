import React, { useState } from 'react';
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
  FormControlLabel,
  Radio,
  Autocomplete,
  Divider
} from '@mui/material';

// Interface para los datos del servicio
interface ServicioData {
  diagnosticoPreoperatorio: string;
  diagnosticoPostoperatorio: string;
  anestesiologo: string;
  ayudante: string;
  cirujano: string;
  cirugiaPropuesta: string;
  cirugiaRealizada: string;
  instrumentista: string;
  circulante: string;
  especialidad: string;
  quirofano: string;
  otros: string;
  prioridad: string;
}

export default function PrioridadAtencion() {
  // Lista simulada de diagnósticos CIE-10
  const diagnosticosCIE10 = [
    { codigo: 'A00', descripcion: 'Cólera' },
    { codigo: 'A01', descripcion: 'Fiebres tifoidea y paratifoidea' },
    { codigo: 'K35.8', descripcion: 'Apendicitis aguda, no especificada' },
    { codigo: 'K80.0', descripcion: 'Cálculo de la vesícula biliar con colecistitis aguda' },
    { codigo: 'S72.0', descripcion: 'Fractura del cuello del fémur' },
    { codigo: 'K40.9', descripcion: 'Hernia inguinal unilateral o no especificada, sin obstrucción ni gangrena' },
    { codigo: 'N20.0', descripcion: 'Cálculo del riñón' },
    { codigo: 'K29.7', descripcion: 'Gastritis, no especificada' }
  ];

  // Lista simulada de médicos para búsqueda
  const listaMedicos = [
    { id: 1, nombre: 'Dr. Juan Pérez', especialidad: 'Anestesiología' },
    { id: 2, nombre: 'Dra. María López', especialidad: 'Anestesiología' },
    { id: 3, nombre: 'Dr. Roberto Gómez', especialidad: 'Cirugía General' },
    { id: 4, nombre: 'Dra. Ana Rodríguez', especialidad: 'Cirugía General' },
    { id: 5, nombre: 'Dr. Carlos Jiménez', especialidad: 'Traumatología' },
    { id: 6, nombre: 'Dra. Laura Sánchez', especialidad: 'Cirugía Cardiovascular' }
  ];

  // Lista de personal circulante
  const listaCirculantes = [
    { id: 101, nombre: 'Lic. Patricia Mendoza' },
    { id: 102, nombre: 'Lic. Fernando Ruiz' },
    { id: 103, nombre: 'Lic. Carla Hernández' }
  ];

  // Estado para los datos del formulario
  const [servicio, setServicio] = useState<ServicioData>({
    diagnosticoPreoperatorio: '',
    diagnosticoPostoperatorio: '',
    anestesiologo: '',
    ayudante: '',
    cirujano: '',
    cirugiaPropuesta: '',
    cirugiaRealizada: '',
    instrumentista: '',
    circulante: '',
    especialidad: '',
    quirofano: '',
    otros: '',
    prioridad: 'electivo'
  });

  // Estado para almacenar los objetos completos de los diagnósticos
  const [diagPreopSeleccionado, setDiagPreopSeleccionado] = useState<any>(null);
  const [diagPostopSeleccionado, setDiagPostopSeleccionado] = useState<any>(null);

  // Estado para almacenar los objetos completos de los médicos/personal
  const [anestesiologoSeleccionado, setAnestesiologoSeleccionado] = useState<any>(null);
  const [cirujanoSeleccionado, setCirujanoSeleccionado] = useState<any>(null);
  const [circulanteSeleccionado, setCirculanteSeleccionado] = useState<any>(null);

  // Manejar cambios en los campos del formulario
  const handleServicioChange = (campo: keyof ServicioData, valor: string) => {
    setServicio({...servicio, [campo]: valor});
  };

  return (
    <Box>
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
            B. SERVICIO Y PRIORIDAD DE ATENCIÓN
          </Typography>

          {/* Diagnósticos */}
          <Box sx={{ mb: 2 }}>
            <Typography sx={{ fontSize: "0.9rem", fontWeight: "medium", color: "#1A3C6D", mb: 1 }}>
              DIAGNÓSTICOS
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 1.5, mb: 1.5 }}>
              <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 50%' } }}>
                <Autocomplete
                  options={diagnosticosCIE10}
                  getOptionLabel={(option) => `${option.codigo} - ${option.descripcion}`}
                  renderInput={(params) => (
                    <TextField 
                      {...params} 
                      label="DIAGNÓSTICO PREOPERATORIO" 
                      size="small" 
                      InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                    />
                  )}
                  value={diagPreopSeleccionado}
                  onChange={(e, value) => {
                    setDiagPreopSeleccionado(value);
                    handleServicioChange('diagnosticoPreoperatorio', value ? `${value.codigo} - ${value.descripcion}` : '');
                  }}
                  isOptionEqualToValue={(option, value) => option.codigo === value?.codigo}
                  sx={{ '& .MuiAutocomplete-input': { fontSize: '0.8rem' } }}
                />
              </Box>
              <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 50%' } }}>
                <Autocomplete
                  options={diagnosticosCIE10}
                  getOptionLabel={(option) => `${option.codigo} - ${option.descripcion}`}
                  renderInput={(params) => (
                    <TextField 
                      {...params} 
                      label="DIAGNÓSTICO POSTOPERATORIO" 
                      size="small" 
                      InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                    />
                  )}
                  value={diagPostopSeleccionado}
                  onChange={(e, value) => {
                    setDiagPostopSeleccionado(value);
                    handleServicioChange('diagnosticoPostoperatorio', value ? `${value.codigo} - ${value.descripcion}` : '');
                  }}
                  isOptionEqualToValue={(option, value) => option.codigo === value?.codigo}
                  sx={{ '& .MuiAutocomplete-input': { fontSize: '0.8rem' } }}
                />
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Personal */}
          <Box sx={{ mb: 2 }}>
            <Typography sx={{ fontSize: "0.9rem", fontWeight: "medium", color: "#1A3C6D", mb: 1 }}>
              PERSONAL QUIRÚRGICO
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 1.5, mb: 1.5 }}>
              <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 50%' } }}>
                <Autocomplete
                  options={listaMedicos.filter(m => m.especialidad === 'Anestesiología')}
                  getOptionLabel={(option) => option.nombre}
                  renderInput={(params) => (
                    <TextField 
                      {...params} 
                      label="ANESTESIÓLOGO(A)" 
                      size="small" 
                      InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                    />
                  )}
                  value={anestesiologoSeleccionado}
                  onChange={(e, value) => {
                    setAnestesiologoSeleccionado(value);
                    handleServicioChange('anestesiologo', value ? value.nombre : '');
                  }}
                  isOptionEqualToValue={(option, value) => option.id === value?.id}
                  sx={{ '& .MuiAutocomplete-input': { fontSize: '0.8rem' } }}
                />
              </Box>
              <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 50%' } }}>
                <TextField
                  label="AYUDANTE"
                  value={servicio.ayudante}
                  onChange={(e) => handleServicioChange('ayudante', e.target.value)}
                  fullWidth
                  size="small"
                  InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                  InputProps={{ sx: { fontSize: "0.8rem" } }}
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 1.5, mb: 1.5 }}>
              <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 50%' } }}>
                <Autocomplete
                  options={listaMedicos.filter(m => m.especialidad !== 'Anestesiología')}
                  getOptionLabel={(option) => option.nombre}
                  renderInput={(params) => (
                    <TextField 
                      {...params} 
                      label="CIRUJANO" 
                      size="small" 
                      InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                    />
                  )}
                  value={cirujanoSeleccionado}
                  onChange={(e, value) => {
                    setCirujanoSeleccionado(value);
                    handleServicioChange('cirujano', value ? value.nombre : '');
                    // Si hay cirujano seleccionado, actualizar también la especialidad
                    if (value) {
                      handleServicioChange('especialidad', value.especialidad);
                    }
                  }}
                  isOptionEqualToValue={(option, value) => option.id === value?.id}
                  sx={{ '& .MuiAutocomplete-input': { fontSize: '0.8rem' } }}
                />
              </Box>
              <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 50%' } }}>
                <TextField
                  label="INSTRUMENTISTA"
                  value={servicio.instrumentista}
                  onChange={(e) => handleServicioChange('instrumentista', e.target.value)}
                  fullWidth
                  size="small"
                  InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                  InputProps={{ sx: { fontSize: "0.8rem" } }}
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 1.5, mb: 1.5 }}>
              <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 50%' } }}>
                <Autocomplete
                  options={listaCirculantes}
                  getOptionLabel={(option) => option.nombre}
                  renderInput={(params) => (
                    <TextField 
                      {...params} 
                      label="CIRCULANTE" 
                      size="small" 
                      InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                    />
                  )}
                  value={circulanteSeleccionado}
                  onChange={(e, value) => {
                    setCirculanteSeleccionado(value);
                    handleServicioChange('circulante', value ? value.nombre : '');
                  }}
                  isOptionEqualToValue={(option, value) => option.id === value?.id}
                  sx={{ '& .MuiAutocomplete-input': { fontSize: '0.8rem' } }}
                />
              </Box>
              <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 50%' } }}>
                <TextField
                  label="ESPECIALIDAD"
                  value={servicio.especialidad}
                  onChange={(e) => handleServicioChange('especialidad', e.target.value)}
                  fullWidth
                  size="small"
                  InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                  InputProps={{ sx: { fontSize: "0.8rem" } }}
                />
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Cirugía */}
          <Box sx={{ mb: 2 }}>
            <Typography sx={{ fontSize: "0.9rem", fontWeight: "medium", color: "#1A3C6D", mb: 1 }}>
              DATOS DE LA CIRUGÍA
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 1.5, mb: 1.5 }}>
              <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 50%' } }}>
                <TextField
                  label="CIRUGÍA PROPUESTA"
                  value={servicio.cirugiaPropuesta}
                  onChange={(e) => handleServicioChange('cirugiaPropuesta', e.target.value)}
                  fullWidth
                  size="small"
                  multiline
                  rows={2}
                  InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                  InputProps={{ sx: { fontSize: "0.8rem" } }}
                />
              </Box>
              <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 50%' } }}>
                <TextField
                  label="CIRUGÍA REALIZADA"
                  value={servicio.cirugiaRealizada}
                  onChange={(e) => handleServicioChange('cirugiaRealizada', e.target.value)}
                  fullWidth
                  size="small"
                  multiline
                  rows={2}
                  InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                  InputProps={{ sx: { fontSize: "0.8rem" } }}
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 1.5, mb: 1.5 }}>
              <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 30%' } }}>
                <TextField
                  label="QUIRÓFANO"
                  value={servicio.quirofano}
                  onChange={(e) => handleServicioChange('quirofano', e.target.value)}
                  fullWidth
                  size="small"
                  InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                  InputProps={{ sx: { fontSize: "0.8rem" } }}
                />
              </Box>
              <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 70%' } }}>
                <TextField
                  label="OTROS"
                  value={servicio.otros}
                  onChange={(e) => handleServicioChange('otros', e.target.value)}
                  fullWidth
                  size="small"
                  InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                  InputProps={{ sx: { fontSize: "0.8rem" } }}
                />
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Prioridad */}
          <Box sx={{ mb: 1 }}>
            <Typography sx={{ fontSize: "0.9rem", fontWeight: "medium", color: "#1A3C6D", mb: 1 }}>
              PRIORIDAD
            </Typography>
            
            <FormControl component="fieldset">
              <RadioGroup
                row
                value={servicio.prioridad}
                onChange={(e) => handleServicioChange('prioridad', e.target.value)}
              >
                <FormControlLabel 
                  value="emergente" 
                  control={<Radio size="small" />} 
                  label={<Typography sx={{ fontSize: "0.8rem" }}>Emergente</Typography>} 
                />
                <FormControlLabel 
                  value="urgente" 
                  control={<Radio size="small" />} 
                  label={<Typography sx={{ fontSize: "0.8rem" }}>Urgente</Typography>} 
                />
                <FormControlLabel 
                  value="electivo" 
                  control={<Radio size="small" />} 
                  label={<Typography sx={{ fontSize: "0.8rem" }}>Electivo</Typography>} 
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}