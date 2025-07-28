import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Paper,
} from '@mui/material';

interface RecienNacidoData {
  fetoMuerto: string;
  apgar1min: string;
  apgar5min: string;
  apgar10min: string;
}

export default function RecienNacido() {
  const [data, setData] = useState<RecienNacidoData>({
    fetoMuerto: '',
    apgar1min: '',
    apgar5min: '',
    apgar10min: '',
  });

  const handleChange = (field: keyof RecienNacidoData, value: string) => {
    setData(prev => ({
      ...prev,
      [field]: field === 'fetoMuerto' ? value.toUpperCase() : value,
    }));
  };

  // Función para validar puntuación APGAR (0-10)
  const handleApgarChange = (field: keyof RecienNacidoData, value: string) => {
    // Solo números del 0-10
    const numericValue = value.replace(/[^0-9]/g, '');
    if (numericValue === '' || (parseInt(numericValue) >= 0 && parseInt(numericValue) <= 10)) {
      handleChange(field, numericValue);
    }
  };

  // Función para determinar el color según puntuación APGAR
  const getApgarColor = (score: string) => {
    const num = parseInt(score);
    if (num >= 7) return { color: '#2e7d32', bg: '#e8f5e8' }; // Verde - Normal
    if (num >= 4) return { color: '#f57c00', bg: '#fff8e1' }; // Naranja - Moderado
    if (num >= 0) return { color: '#d32f2f', bg: '#ffebee' }; // Rojo - Severo
    return { color: '#666', bg: '#f5f5f5' }; // Gris - Sin valor
  };

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
          J. DATOS DEL RECIÉN NACIDO
        </Typography>

        <Paper elevation={1} sx={{ p: 2, backgroundColor: '#f8f9fa' }}>
          {/* Información sobre APGAR */}
          <Box sx={{ 
            mb: 2, 
            p: 1.5, 
            backgroundColor: '#e3f2fd', 
            borderRadius: 1,
            border: '1px solid #bbdefb'
          }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#1A3C6D', mb: 0.5 }}>
              ESCALA DE APGAR
            </Typography>
            <Typography variant="caption" sx={{ color: '#1565c0', display: 'block' }}>
              • <strong>7-10:</strong> Normal (Verde) • <strong>4-6:</strong> Moderado (Naranja) • <strong>0-3:</strong> Severo (Rojo)
            </Typography>
          </Box>

          {/* Feto Muerto */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold', fontSize: '0.95rem' }}>
              • Feto Muerto
            </Typography>
            <TextField
              size="small"
              value={data.fetoMuerto}
              onChange={(e) => handleChange('fetoMuerto', e.target.value)}
              placeholder="SI / NO / OBSERVACIONES..."
              fullWidth
              multiline
              rows={2}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': { borderColor: '#1A3C6D' },
                  '&.Mui-focused fieldset': { borderColor: '#1A3C6D' },
                },
                '& .MuiInputLabel-root.Mui-focused': { color: '#1A3C6D' },
                '& input, & textarea': {
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                }
              }}
            />
          </Box>

          {/* APGAR Scores */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 'bold', fontSize: '0.95rem' }}>
              APGAR
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              {/* 1 minuto */}
              <Box sx={{ flex: 1, minWidth: 120 }}>
                <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block', mb: 0.5 }}>
                  ○ 1 minuto
                </Typography>
                <TextField
                  type="number"
                  size="small"
                  value={data.apgar1min}
                  onChange={(e) => handleApgarChange('apgar1min', e.target.value)}
                  placeholder="0-10"
                  inputProps={{ min: 0, max: 10 }}
                  fullWidth
                  sx={{ 
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: getApgarColor(data.apgar1min).bg,
                      '&:hover fieldset': { borderColor: getApgarColor(data.apgar1min).color },
                      '&.Mui-focused fieldset': { borderColor: getApgarColor(data.apgar1min).color },
                    },
                    '& .MuiInputLabel-root.Mui-focused': { color: getApgarColor(data.apgar1min).color },
                    '& input': {
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      color: getApgarColor(data.apgar1min).color,
                      textAlign: 'center'
                    }
                  }}
                />
              </Box>

              {/* 5 minutos */}
              <Box sx={{ flex: 1, minWidth: 120 }}>
                <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block', mb: 0.5 }}>
                  ○ 5 minutos
                </Typography>
                <TextField
                  type="number"
                  size="small"
                  value={data.apgar5min}
                  onChange={(e) => handleApgarChange('apgar5min', e.target.value)}
                  placeholder="0-10"
                  inputProps={{ min: 0, max: 10 }}
                  fullWidth
                  sx={{ 
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: getApgarColor(data.apgar5min).bg,
                      '&:hover fieldset': { borderColor: getApgarColor(data.apgar5min).color },
                      '&.Mui-focused fieldset': { borderColor: getApgarColor(data.apgar5min).color },
                    },
                    '& .MuiInputLabel-root.Mui-focused': { color: getApgarColor(data.apgar5min).color },
                    '& input': {
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      color: getApgarColor(data.apgar5min).color,
                      textAlign: 'center'
                    }
                  }}
                />
              </Box>

              {/* 10 minutos */}
              <Box sx={{ flex: 1, minWidth: 120 }}>
                <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block', mb: 0.5 }}>
                  ○ 10 minutos
                </Typography>
                <TextField
                  type="number"
                  size="small"
                  value={data.apgar10min}
                  onChange={(e) => handleApgarChange('apgar10min', e.target.value)}
                  placeholder="0-10"
                  inputProps={{ min: 0, max: 10 }}
                  fullWidth
                  sx={{ 
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: getApgarColor(data.apgar10min).bg,
                      '&:hover fieldset': { borderColor: getApgarColor(data.apgar10min).color },
                      '&.Mui-focused fieldset': { borderColor: getApgarColor(data.apgar10min).color },
                    },
                    '& .MuiInputLabel-root.Mui-focused': { color: getApgarColor(data.apgar10min).color },
                    '& input': {
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      color: getApgarColor(data.apgar10min).color,
                      textAlign: 'center'
                    }
                  }}
                />
              </Box>
            </Box>
          </Box>

          {/* Resumen APGAR */}
          {(data.apgar1min || data.apgar5min || data.apgar10min) && (
            <Box sx={{ 
              mt: 2, 
              p: 1.5, 
              backgroundColor: '#f3e5f5', 
              borderRadius: 1,
              border: '1px solid #ce93d8'
            }}>
              <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#7b1fa2', display: 'block', mb: 1 }}>
                RESUMEN APGAR:
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {data.apgar1min && (
                  <Typography variant="body2" sx={{ 
                    fontWeight: 'bold', 
                    color: getApgarColor(data.apgar1min).color,
                    backgroundColor: getApgarColor(data.apgar1min).bg,
                    px: 1,
                    py: 0.5,
                    borderRadius: 1
                  }}>
                    1 min: {data.apgar1min}/10
                  </Typography>
                )}
                {data.apgar5min && (
                  <Typography variant="body2" sx={{ 
                    fontWeight: 'bold', 
                    color: getApgarColor(data.apgar5min).color,
                    backgroundColor: getApgarColor(data.apgar5min).bg,
                    px: 1,
                    py: 0.5,
                    borderRadius: 1
                  }}>
                    5 min: {data.apgar5min}/10
                  </Typography>
                )}
                {data.apgar10min && (
                  <Typography variant="body2" sx={{ 
                    fontWeight: 'bold', 
                    color: getApgarColor(data.apgar10min).color,
                    backgroundColor: getApgarColor(data.apgar10min).bg,
                    px: 1,
                    py: 0.5,
                    borderRadius: 1
                  }}>
                    10 min: {data.apgar10min}/10
                  </Typography>
                )}
              </Box>
            </Box>
          )}
        </Paper>

        {/* Información médica */}
        <Box sx={{ 
          mt: 2, 
          p: 1.5, 
          backgroundColor: '#fff3e0', 
          borderRadius: 1,
          border: '1px solid #ffb74d'
        }}>
          <Typography variant="caption" sx={{ color: '#e65100', fontStyle: 'italic' }}>
            <strong>Nota:</strong> La escala APGAR evalúa la condición del recién nacido. 
            Registre las puntuaciones exactas en cada tiempo. Los valores se colorean automáticamente según el estado clínico.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
