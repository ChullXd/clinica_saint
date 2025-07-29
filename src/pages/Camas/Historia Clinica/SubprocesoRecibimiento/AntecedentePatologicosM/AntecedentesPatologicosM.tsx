import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Divider,
  InputAdornment,
} from '@mui/material';
import {
  Assignment as ObservacionesIcon,
  PregnantWoman as EmbarazoIcon,
  ChildCare as HijosIcon,
  LocalHospital as HospitalIcon,
} from "@mui/icons-material";

interface AntecedentesPatologicosMData {
  observaciones: string;
  numeroGestas: string;
  numeroPartos: string;
  numeroCesareas: string;
  numeroHijosVivos: string;
  numeroHijosMuertos: string;
}

export default function AntecedentesPatologicosM() {
  const [antecedentes, setAntecedentes] = useState<AntecedentesPatologicosMData>({
    observaciones: '',
    numeroGestas: '',
    numeroPartos: '',
    numeroCesareas: '',
    numeroHijosVivos: '',
    numeroHijosMuertos: '',
  });

  const handleChange = (field: keyof AntecedentesPatologicosMData, value: string) => {
    setAntecedentes(prev => ({
      ...prev,
      [field]: field === 'observaciones' ? value.toUpperCase() : value,
    }));
  };

  return (
    <Box>
      {/* Sección B: Antecedentes Patológicos Maternos */}
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
            B. ANTECEDENTES PATOLÓGICOS MATERNOS
          </Typography>

          {/* Observaciones */}
          <Box sx={{ mb: 2 }}>
            <TextField
              label="OBSERVACIONES"
              value={antecedentes.observaciones}
              onChange={(e) => handleChange('observaciones', e.target.value)}
              fullWidth
              multiline
              rows={4}
              size="small"
              placeholder="INGRESE LAS OBSERVACIONES DE ANTECEDENTES PATOLÓGICOS MATERNOS..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ObservacionesIcon sx={{ fontSize: '1rem', color: '#1A3C6D', alignSelf: 'flex-start', mt: 1 }} />
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
              helperText="Campo de texto libre para antecedentes patológicos maternos"
              FormHelperTextProps={{ sx: { fontSize: "0.7rem" } }}
              sx={{ 
                '& .MuiInputBase-input': { 
                  fontSize: '0.85rem',
                  textTransform: 'uppercase'
                }
              }}
            />
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Datos y Antecedentes Obstétricos */}
          <Typography
            variant="subtitle1"
            sx={{
              mb: 1.5,
              fontWeight: "bold",
              color: "#1A3C6D",
              fontSize: "0.9rem",
            }}
          >
            DATOS Y ANTECEDENTES OBSTÉTRICOS DE LA MADRE:
          </Typography>

          {/* Primera fila - Gestas, Partos, Cesáreas */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 1.5 }}>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 31%' } }}>
              <TextField
                label="NÚMERO DE GESTAS"
                type="number"
                value={antecedentes.numeroGestas}
                onChange={(e) => handleChange('numeroGestas', e.target.value)}
                fullWidth
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmbarazoIcon sx={{ fontSize: '1rem', color: '#1A3C6D' }} />
                    </InputAdornment>
                  ),
                  inputProps: { min: 0, max: 20 }
                }}
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                helperText="Total de embarazos"
                FormHelperTextProps={{ sx: { fontSize: "0.7rem" } }}
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '0.85rem',
                    fontWeight: 'bold'
                  }
                }}
              />
            </Box>
            
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 31%' } }}>
              <TextField
                label="NÚMERO DE PARTOS"
                type="number"
                value={antecedentes.numeroPartos}
                onChange={(e) => handleChange('numeroPartos', e.target.value)}
                fullWidth
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <HijosIcon sx={{ fontSize: '1rem', color: '#1A3C6D' }} />
                    </InputAdornment>
                  ),
                  inputProps: { min: 0, max: 20 }
                }}
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                helperText="Partos vaginales"
                FormHelperTextProps={{ sx: { fontSize: "0.7rem" } }}
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '0.85rem',
                    fontWeight: 'bold'
                  }
                }}
              />
            </Box>

            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 31%' } }}>
              <TextField
                label="NÚMERO DE CESÁREAS"
                type="number"
                value={antecedentes.numeroCesareas}
                onChange={(e) => handleChange('numeroCesareas', e.target.value)}
                fullWidth
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <HospitalIcon sx={{ fontSize: '1rem', color: '#1A3C6D' }} />
                    </InputAdornment>
                  ),
                  inputProps: { min: 0, max: 20 }
                }}
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                helperText="Cesáreas realizadas"
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
          
          {/* Segunda fila - Hijos vivos y muertos */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%' } }}>
              <TextField
                label="NÚMERO DE HIJOS VIVOS"
                type="number"
                value={antecedentes.numeroHijosVivos}
                onChange={(e) => handleChange('numeroHijosVivos', e.target.value)}
                fullWidth
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <HijosIcon sx={{ fontSize: '1rem', color: '#2e7d32' }} />
                    </InputAdornment>
                  ),
                  inputProps: { min: 0, max: 20 }
                }}
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                helperText="Hijos nacidos vivos"
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
                label="NÚMERO DE HIJOS MUERTOS"
                type="number"
                value={antecedentes.numeroHijosMuertos}
                onChange={(e) => handleChange('numeroHijosMuertos', e.target.value)}
                fullWidth
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <HijosIcon sx={{ fontSize: '1rem', color: '#d32f2f' }} />
                    </InputAdornment>
                  ),
                  inputProps: { min: 0, max: 20 }
                }}
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                helperText="Hijos fallecidos (mortinatos + neonatales)"
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

          <Divider sx={{ my: 1.5 }} />

          {/* Resumen de datos obstétricos */}
          {(antecedentes.numeroGestas || antecedentes.numeroPartos || antecedentes.numeroCesareas || 
            antecedentes.numeroHijosVivos || antecedentes.numeroHijosMuertos) && (
            <Box sx={{ backgroundColor: '#f8f9fa', p: 1.5, borderRadius: 1 }}>
              <Typography sx={{ fontSize: "0.75rem", fontWeight: "bold", color: "#1A3C6D", mb: 0.5 }}>
                RESUMEN OBSTÉTRICO:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, fontSize: '0.7rem', color: '#666' }}>
                {antecedentes.numeroGestas && (
                  <span><strong>Gestas:</strong> {antecedentes.numeroGestas}</span>
                )}
                {antecedentes.numeroPartos && (
                  <span><strong>Partos:</strong> {antecedentes.numeroPartos}</span>
                )}
                {antecedentes.numeroCesareas && (
                  <span><strong>Cesáreas:</strong> {antecedentes.numeroCesareas}</span>
                )}
                {antecedentes.numeroHijosVivos && (
                  <span><strong>Vivos:</strong> {antecedentes.numeroHijosVivos}</span>
                )}
                {antecedentes.numeroHijosMuertos && (
                  <span><strong>Muertos:</strong> {antecedentes.numeroHijosMuertos}</span>
                )}
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}