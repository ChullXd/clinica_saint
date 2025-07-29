import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  CalendarToday as CalendarIcon,
  MedicalServices as MedicalIcon,
  Business as QuirofanoIcon,
} from "@mui/icons-material";

interface DatosCirugiaData {
  fecha: string;
  procedimientoPropuesto: string;
  quirofano: string;
}

export default function DatosCirugia() {
  const [datosCirugia, setDatosCirugia] = useState<DatosCirugiaData>({
    fecha: new Date().toISOString().split('T')[0], // Fecha actual por defecto
    procedimientoPropuesto: '',
    quirofano: '',
  });

  const handleChange = (field: keyof DatosCirugiaData, value: string) => {
    // Convertir a mayúsculas solo el procedimiento propuesto
    const finalValue = field === 'procedimientoPropuesto' ? value.toUpperCase() : value;
    setDatosCirugia(prev => ({
      ...prev,
      [field]: finalValue,
    }));
  };

  // Formatear fecha para mostrar DD/MM/YYYY
  const formatearFecha = (fecha: string) => {
    if (!fecha) return '';
    const [year, month, day] = fecha.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <Box sx={{ p: 2 }}>
      <Card sx={{ boxShadow: 2 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography
            variant="h6"
            sx={{ 
              mb: 3, 
              fontWeight: "bold", 
              color: "#1A3C6D", 
              fontSize: "1rem",
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
     B. DATOS DE LA CIRUGÍA
          </Typography>

          <Box sx={{ 
            display: "flex", 
            flexWrap: "wrap", 
            gap: 2, 
            alignItems: 'flex-start'
          }}>
            {/* Campo Fecha */}
            <Box sx={{ flex: "1 1 250px", minWidth: '250px' }}>
              <TextField
                label="FECHA"
                type="date"
                value={datosCirugia.fecha}
                onChange={(e) => handleChange('fecha', e.target.value)}
                fullWidth
                variant="outlined"
                size="small"
                InputLabelProps={{ 
                  shrink: true,
                  sx: { fontSize: '0.9rem', fontWeight: 'bold' }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarIcon sx={{ fontSize: '1rem', color: '#1A3C6D' }} />
                    </InputAdornment>
                  ),
                }}
                helperText={`FORMATO: DD/MM/YYYY ${datosCirugia.fecha ? `(${formatearFecha(datosCirugia.fecha)})` : ''}`}
                sx={{ 
                  '& .MuiInputBase-input': { fontSize: '0.85rem' },
                  '& .MuiFormHelperText-root': { fontSize: '0.7rem' }
                }}
              />
            </Box>

            {/* Campo Procedimiento Propuesto */}
            <Box sx={{ flex: "2 1 350px", minWidth: '300px' }}>
              <TextField
                label="🔬 PROCEDIMIENTO PROPUESTO"
                value={datosCirugia.procedimientoPropuesto}
                onChange={(e) => handleChange('procedimientoPropuesto', e.target.value)}
                fullWidth
                variant="outlined"
                size="small"
                placeholder="DESCRIBA EL PROCEDIMIENTO QUIRÚRGICO A REALIZAR"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MedicalIcon sx={{ fontSize: '1rem', color: '#1A3C6D' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '0.85rem',
                    textTransform: 'uppercase'
                  },
                  '& .MuiInputLabel-root': { fontSize: '0.9rem', fontWeight: 'bold' }
                }}
                helperText="NOMBRE ESPECÍFICO DEL PROCEDIMIENTO QUIRÚRGICO"
              />
            </Box>

            {/* Campo Quirófano */}
            <Box sx={{ flex: "1 1 150px", minWidth: '150px' }}>
              <TextField
                label="QUIRÓFANO"
                type="number"
                value={datosCirugia.quirofano}
                onChange={(e) => {
                  const value = e.target.value;
                  // Solo permitir números positivos
                  if (value === '' || (parseInt(value) > 0 && parseInt(value) <= 20)) {
                    handleChange('quirofano', value);
                  }
                }}
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Nº"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <QuirofanoIcon sx={{ fontSize: '1rem', color: '#1A3C6D' }} />
                    </InputAdornment>
                  ),
                  inputProps: { 
                    min: 1, 
                    max: 20,
                    style: { fontSize: '0.85rem' }
                  }
                }}
                sx={{ 
                  '& .MuiInputLabel-root': { fontSize: '0.9rem', fontWeight: 'bold' }
                }}
                helperText="NÚMERO DEL QUIRÓFANO (1-20)"
              />
            </Box>
          </Box>

          {/* Resumen visual de los datos */}
          {(datosCirugia.fecha || datosCirugia.procedimientoPropuesto || datosCirugia.quirofano) && (
            <Card 
              variant="outlined" 
              sx={{ 
                mt: 3,
                p: 2, 
                backgroundColor: '#f0f8ff', 
                borderColor: '#1976d2',
                borderWidth: 1.5
              }}
            >
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  fontWeight: 'bold', 
                  color: '#1565c0', 
                  fontSize: '0.8rem', 
                  mb: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5
                }}
              >
                RESUMEN DE LA CIRUGÍA:
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                {datosCirugia.fecha && (
                  <Typography variant="caption" sx={{ fontSize: '0.75rem', color: '#0d47a1' }}>
                    <strong>FECHA PROGRAMADA:</strong> {formatearFecha(datosCirugia.fecha)}
                  </Typography>
                )}
                {datosCirugia.procedimientoPropuesto && (
                  <Typography variant="caption" sx={{ fontSize: '0.75rem', color: '#0d47a1' }}>
                    <strong>PROCEDIMIENTO:</strong> {datosCirugia.procedimientoPropuesto}
                  </Typography>
                )}
                {datosCirugia.quirofano && (
                  <Typography variant="caption" sx={{ fontSize: '0.75rem', color: '#0d47a1' }}>
                    <strong> QUIRÓFANO ASIGNADO:</strong> QUIRÓFANO #{datosCirugia.quirofano}
                  </Typography>
                )}
              </Box>
            </Card>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}