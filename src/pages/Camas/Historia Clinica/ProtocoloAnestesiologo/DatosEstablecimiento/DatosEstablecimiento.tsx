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
  FormControlLabel,
  Radio,
  Divider
} from '@mui/material';

// Interfaces para los datos
interface PacienteData {
  primerApellido: string;
  segundoApellido: string;
  primerNombre: string;
  segundoNombre: string;
  sexo: string;
  edad: string;
  condicionEdad: string;
  talla: string;
  peso: string;
  imc: string;
  grupoFactor: string;
  consentimientoInformado: string;
}

interface EstablecimientoData {
  institucion: string;
  establecimiento: string;
  historiaClinica: string;
  numeroArchivo: string;
  fecha: string;
}

export default function DatosEstablecimiento() {
  // Estados para los datos del formulario
  const [paciente, setPaciente] = useState<PacienteData>({
    primerApellido: '',
    segundoApellido: '',
    primerNombre: '',
    segundoNombre: '',
    sexo: '',
    edad: '',
    condicionEdad: 'Años',
    talla: '',
    peso: '',
    imc: '',
    grupoFactor: '',
    consentimientoInformado: 'si'
  });

  const [establecimiento, setEstablecimiento] = useState<EstablecimientoData>({
    institucion: 'RPC',
    establecimiento: 'RIVAMEDIC S.A.',
    historiaClinica: '',
    numeroArchivo: '',
    fecha: new Date().toISOString().split('T')[0] // Formato YYYY-MM-DD
  });

  // Calcular IMC cuando cambian peso o talla
  useEffect(() => {
    if (paciente.peso && paciente.talla) {
      const pesoNum = parseFloat(paciente.peso);
      const tallaMetros = parseFloat(paciente.talla) / 100;
      
      if (pesoNum > 0 && tallaMetros > 0) {
        const imc = (pesoNum / (tallaMetros * tallaMetros)).toFixed(2);
        setPaciente({...paciente, imc});
      }
    }
  }, [paciente.peso, paciente.talla]);

  // Manejar cambios en los campos del paciente
  const handlePacienteChange = (campo: keyof PacienteData, valor: string) => {
    setPaciente({...paciente, [campo]: valor});
  };

  // Manejar cambios en los campos del establecimiento
  const handleEstablecimientoChange = (campo: keyof EstablecimientoData, valor: string) => {
    setEstablecimiento({...establecimiento, [campo]: valor});
  };

  return (
    <Box>
      {/* Sección A: Datos del Establecimiento */}
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
            A. DATOS DEL ESTABLECIMIENTO
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 1.5 }}>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 31%' } }}>
              <TextField
                label="INSTITUCIÓN DEL SISTEMA"
                value={establecimiento.institucion}
                onChange={(e) => handleEstablecimientoChange('institucion', e.target.value)}
                fullWidth
                size="small"
                InputProps={{ readOnly: true }}
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
              />
            </Box>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 31%' } }}>
              <TextField
                label="ESTABLECIMIENTO DE SALUD"
                value={establecimiento.establecimiento}
                onChange={(e) => handleEstablecimientoChange('establecimiento', e.target.value)}
                fullWidth
                size="small"
                InputProps={{ readOnly: true }}
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
              />
            </Box>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 31%' } }}>
              <TextField
                label="FECHA"
                type="date"
                value={establecimiento.fecha}
                onChange={(e) => handleEstablecimientoChange('fecha', e.target.value)}
                fullWidth
                size="small"
                InputLabelProps={{ 
                  sx: { fontSize: "0.8rem" },
                  shrink: true
                }}
              />
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%' } }}>
              <TextField
                label="N° HISTORIA CLÍNICA"
                value={establecimiento.historiaClinica}
                onChange={(e) => handleEstablecimientoChange('historiaClinica', e.target.value)}
                fullWidth
                size="small"
                helperText="Número de cédula, pasaporte o carnet de refugiado"
                FormHelperTextProps={{ sx: { fontSize: "0.7rem" } }}
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
              />
            </Box>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%' } }}>
              <TextField
                label="N° ARCHIVO"
                value={establecimiento.numeroArchivo}
                onChange={(e) => handleEstablecimientoChange('numeroArchivo', e.target.value)}
                fullWidth
                size="small"
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Datos del Paciente */}
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
            DATOS DEL PACIENTE
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 1.5 }}>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 23%' } }}>
              <TextField
                label="PRIMER APELLIDO"
                value={paciente.primerApellido}
                onChange={(e) => handlePacienteChange('primerApellido', e.target.value)}
                fullWidth
                size="small"
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
              />
            </Box>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 23%' } }}>
              <TextField
                label="SEGUNDO APELLIDO"
                value={paciente.segundoApellido}
                onChange={(e) => handlePacienteChange('segundoApellido', e.target.value)}
                fullWidth
                size="small"
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
              />
            </Box>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 23%' } }}>
              <TextField
                label="PRIMER NOMBRE"
                value={paciente.primerNombre}
                onChange={(e) => handlePacienteChange('primerNombre', e.target.value)}
                fullWidth
                size="small"
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
              />
            </Box>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 23%' } }}>
              <TextField
                label="SEGUNDO NOMBRE"
                value={paciente.segundoNombre}
                onChange={(e) => handlePacienteChange('segundoNombre', e.target.value)}
                fullWidth
                size="small"
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
              />
            </Box>
          </Box>

          <Divider sx={{ my: 1.5 }} />

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 1.5 }}>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 15%' } }}>
              <FormControl fullWidth size="small">
                <InputLabel sx={{ fontSize: "0.8rem" }}>SEXO</InputLabel>
                <Select
                  value={paciente.sexo}
                  label="SEXO"
                  onChange={(e) => handlePacienteChange('sexo', e.target.value)}
                  sx={{ fontSize: "0.8rem" }}
                >
                  <MenuItem value="M">Masculino</MenuItem>
                  <MenuItem value="F">Femenino</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 15%' } }}>
              <TextField
                label="EDAD"
                value={paciente.edad}
                onChange={(e) => handlePacienteChange('edad', e.target.value.replace(/\D/g, ''))}
                fullWidth
                size="small"
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
              />
            </Box>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 23%' } }}>
              <FormControl fullWidth size="small">
                <InputLabel sx={{ fontSize: "0.8rem" }}>CONDICIÓN EDAD</InputLabel>
                <Select
                  value={paciente.condicionEdad}
                  label="CONDICIÓN EDAD"
                  onChange={(e) => handlePacienteChange('condicionEdad', e.target.value)}
                  sx={{ fontSize: "0.8rem" }}
                >
                  <MenuItem value="Años">Años</MenuItem>
                  <MenuItem value="Meses">Meses</MenuItem>
                  <MenuItem value="Días">Días</MenuItem>
                  <MenuItem value="Horas">Horas</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 15%' } }}>
              <TextField
                label="TALLA (cm)"
                value={paciente.talla}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  handlePacienteChange('talla', value);
                }}
                fullWidth
                size="small"
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
              />
            </Box>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 15%' } }}>
              <TextField
                label="PESO (kg)"
                value={paciente.peso}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^\d.]/g, '');
                  handlePacienteChange('peso', value);
                }}
                fullWidth
                size="small"
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
              />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 15%' } }}>
              <TextField
                label="IMC"
                value={paciente.imc}
                InputProps={{ readOnly: true }}
                fullWidth
                size="small"
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
              />
            </Box>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 15%' } }}>
              <TextField
                label="GRUPO Y FACTOR"
                value={paciente.grupoFactor}
                onChange={(e) => handlePacienteChange('grupoFactor', e.target.value)}
                fullWidth
                size="small"
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
              />
            </Box>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 30%' } }}>
              <FormControl component="fieldset" sx={{ mt: 1 }}>
                <Typography sx={{ fontSize: "0.8rem", mb: 0.5, fontWeight: "medium" }}>
                  CONSENTIMIENTO INFORMADO
                </Typography>
                <RadioGroup
                  row
                  value={paciente.consentimientoInformado}
                  onChange={(e) => handlePacienteChange('consentimientoInformado', e.target.value)}
                >
                  <FormControlLabel 
                    value="si" 
                    control={<Radio size="small" />} 
                    label={<Typography sx={{ fontSize: "0.8rem" }}>SI</Typography>} 
                  />
                  <FormControlLabel 
                    value="no" 
                    control={<Radio size="small" />} 
                    label={<Typography sx={{ fontSize: "0.8rem" }}>NO</Typography>} 
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}