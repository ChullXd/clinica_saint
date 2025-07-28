import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Paper,
  Alert,
} from '@mui/material';

interface TiempoTranscurridosData {
  duracionAnestesia: string;
  duracionCirugia: string;
}

export default function TiempoTranscurridos() {
  const [data, setData] = useState<TiempoTranscurridosData>({
    duracionAnestesia: '',
    duracionCirugia: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

  const handleChange = (field: keyof TiempoTranscurridosData, value: string) => {
    // Solo permitir números y texto relacionado con tiempo
    const cleanValue = value.replace(/[^0-9\s]/g, '');
    
    setData(prev => ({
      ...prev,
      [field]: cleanValue,
    }));

    // Limpiar error si se ingresa un valor
    if (cleanValue.trim()) {
      setErrors(prev => ({
        ...prev,
        [field]: false,
      }));
    }
  };

  // Validar campos obligatorios
  const validateField = (field: keyof TiempoTranscurridosData) => {
    const isEmpty = !data[field].trim();
    setErrors(prev => ({
      ...prev,
      [field]: isEmpty,
    }));
    return !isEmpty;
  };

  // Función para formatear la duración con "minutos"
  const formatDuration = (value: string) => {
    if (!value.trim()) return '';
    const numericValue = value.replace(/[^0-9]/g, '');
    return numericValue ? `${numericValue} minutos` : '';
  };

  // Función para comparar tiempos
  const getTimeComparison = () => {
    const anestesia = parseInt(data.duracionAnestesia.replace(/[^0-9]/g, '')) || 0;
    const cirugia = parseInt(data.duracionCirugia.replace(/[^0-9]/g, '')) || 0;
    
    if (anestesia && cirugia) {
      const diferencia = anestesia - cirugia;
      return { anestesia, cirugia, diferencia };
    }
    return null;
  };

  const timeComparison = getTimeComparison();

  return (
    <Card sx={{ mb: 2, boxShadow: 3 }}>
      <CardContent sx={{ p: 2 }}>
        <Typography
          variant="h6"
          sx={{ 
            mb: 2, 
            fontWeight: "bold", 
            color: "#1A3C6D",
            borderBottom: '2px solid #1A3C6D',
            pb: 0.5
          }}
        >
          K. TIEMPOS TRANSCURRIDOS
        </Typography>

        {/* Alerta de campos obligatorios */}
        <Alert severity="info" sx={{ mb: 2, fontSize: '0.85rem' }}>
          <strong>Campos Obligatorios:</strong> Ambos tiempos son requeridos para guardar el protocolo.
        </Alert>

        <Paper elevation={1} sx={{ p: 2, backgroundColor: '#f8f9fa' }}>
          {/* Duración de Anestesia */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold', fontSize: '0.95rem' }}>
              • Duración Anestesia <span style={{ color: '#d32f2f' }}>*</span>
            </Typography>
            <TextField
              type="text"
              size="small"
              value={data.duracionAnestesia}
              onChange={(e) => handleChange('duracionAnestesia', e.target.value)}
              onBlur={() => validateField('duracionAnestesia')}
              placeholder="Ej: 120 minutos"
              error={errors.duracionAnestesia}
              helperText={
                errors.duracionAnestesia 
                  ? "Este campo es obligatorio" 
                  : "Ingrese solo números, se agregará 'minutos' automáticamente"
              }
              fullWidth
              InputProps={{
                endAdornment: data.duracionAnestesia && (
                  <Typography variant="caption" sx={{ color: '#666', ml: 1 }}>
                    minutos
                  </Typography>
                )
              }}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': { borderColor: errors.duracionAnestesia ? '#d32f2f' : '#1A3C6D' },
                  '&.Mui-focused fieldset': { borderColor: errors.duracionAnestesia ? '#d32f2f' : '#1A3C6D' },
                },
                '& .MuiInputLabel-root.Mui-focused': { color: errors.duracionAnestesia ? '#d32f2f' : '#1A3C6D' },
                '& input': {
                  fontSize: '1rem',
                  fontWeight: 500,
                }
              }}
            />
          </Box>

          {/* Duración de Cirugía */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold', fontSize: '0.95rem' }}>
              • Duración de Cirugía <span style={{ color: '#d32f2f' }}>*</span>
            </Typography>
            <TextField
              type="text"
              size="small"
              value={data.duracionCirugia}
              onChange={(e) => handleChange('duracionCirugia', e.target.value)}
              onBlur={() => validateField('duracionCirugia')}
              placeholder="Ej: 120 minutos"
              error={errors.duracionCirugia}
              helperText={
                errors.duracionCirugia 
                  ? "Este campo es obligatorio" 
                  : "Ingrese solo números, se agregará 'minutos' automáticamente"
              }
              fullWidth
              InputProps={{
                endAdornment: data.duracionCirugia && (
                  <Typography variant="caption" sx={{ color: '#666', ml: 1 }}>
                    minutos
                  </Typography>
                )
              }}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': { borderColor: errors.duracionCirugia ? '#d32f2f' : '#1A3C6D' },
                  '&.Mui-focused fieldset': { borderColor: errors.duracionCirugia ? '#d32f2f' : '#1A3C6D' },
                },
                '& .MuiInputLabel-root.Mui-focused': { color: errors.duracionCirugia ? '#d32f2f' : '#1A3C6D' },
                '& input': {
                  fontSize: '1rem',
                  fontWeight: 500,
                }
              }}
            />
          </Box>

          {/* Resumen de tiempos */}
          {timeComparison && (
            <Box sx={{ 
              mt: 2, 
              p: 2, 
              backgroundColor: '#e8f5e8', 
              borderRadius: 1,
              border: '1px solid #c8e6c9'
            }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#2e7d32', mb: 1 }}>
                📊 RESUMEN DE TIEMPOS:
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 2 }}>
                <Box sx={{ 
                  backgroundColor: '#fff', 
                  p: 1.5, 
                  borderRadius: 1, 
                  border: '1px solid #e0e0e0',
                  textAlign: 'center',
                  minWidth: 120
                }}>
                  <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#1976d2', display: 'block' }}>
                    ANESTESIA
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                    {timeComparison.anestesia} min
                  </Typography>
                </Box>

                <Box sx={{ 
                  backgroundColor: '#fff', 
                  p: 1.5, 
                  borderRadius: 1, 
                  border: '1px solid #e0e0e0',
                  textAlign: 'center',
                  minWidth: 120
                }}>
                  <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#f57c00', display: 'block' }}>
                    CIRUGÍA
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#f57c00', fontWeight: 'bold' }}>
                    {timeComparison.cirugia} min
                  </Typography>
                </Box>

                <Box sx={{ 
                  backgroundColor: '#fff', 
                  p: 1.5, 
                  borderRadius: 1, 
                  border: '1px solid #e0e0e0',
                  textAlign: 'center',
                  minWidth: 120
                }}>
                  <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#7b1fa2', display: 'block' }}>
                    DIFERENCIA
                  </Typography>
                  <Typography variant="h6" sx={{ 
                    color: timeComparison.diferencia >= 0 ? '#2e7d32' : '#d32f2f', 
                    fontWeight: 'bold' 
                  }}>
                    {timeComparison.diferencia > 0 ? '+' : ''}{timeComparison.diferencia} min
                  </Typography>
                </Box>
              </Box>

              {/* Interpretación */}
              <Box sx={{ 
                p: 1, 
                backgroundColor: timeComparison.diferencia >= 10 ? '#fff3e0' : '#e3f2fd',
                borderRadius: 1,
                border: `1px solid ${timeComparison.diferencia >= 10 ? '#ffb74d' : '#bbdefb'}`
              }}>
                <Typography variant="caption" sx={{ 
                  color: timeComparison.diferencia >= 10 ? '#e65100' : '#1565c0',
                  fontWeight: 'bold'
                }}>
                  {timeComparison.diferencia >= 10 
                    ? '⚠️ La anestesia excede significativamente el tiempo quirúrgico'
                    : timeComparison.diferencia >= 0
                      ? '✅ Tiempos dentro de parámetros normales'
                      : '⚠️ La cirugía excedió el tiempo de anestesia (revisar registro)'
                  }
                </Typography>
              </Box>
            </Box>
          )}
        </Paper>

        {/* Información adicional */}
        <Box sx={{ 
          mt: 2, 
          p: 1.5, 
          backgroundColor: '#fff3e0', 
          borderRadius: 1,
          border: '1px solid #ffb74d'
        }}>
          <Typography variant="caption" sx={{ color: '#e65100', fontStyle: 'italic' }}>
            <strong>Nota:</strong> Los tiempos deben registrarse en minutos. 
            La duración de anestesia típicamente incluye inducción, mantenimiento y despertar. 
            La duración de cirugía es el tiempo quirúrgico efectivo.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}