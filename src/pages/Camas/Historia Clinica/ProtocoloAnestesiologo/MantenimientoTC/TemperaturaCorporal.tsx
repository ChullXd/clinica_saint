import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  FormControlLabel,
  Checkbox,
  TextField,
  Paper,
} from '@mui/material';

interface TemperaturaCorporalData {
  mantaTermica: boolean;
  calentamientoFluidos: boolean;
  otros: string;
}

export default function TemperaturaCorporal() {
  const [data, setData] = useState<TemperaturaCorporalData>({
    mantaTermica: false,
    calentamientoFluidos: false,
    otros: '',
  });

  const handleCheckboxChange = (field: 'mantaTermica' | 'calentamientoFluidos', value: boolean) => {
    setData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTextChange = (value: string) => {
    setData(prev => ({
      ...prev,
      otros: value.toUpperCase(),
    }));
  };

  // Contar métodos seleccionados
  const metodosSeleccionados = (data.mantaTermica ? 1 : 0) + 
                              (data.calentamientoFluidos ? 1 : 0) + 
                              (data.otros.trim() ? 1 : 0);

  const checkboxes = [
    { 
      key: 'mantaTermica', 
      label: '• Manta térmica', 
      color: '#f57c00',
      icon: '🔥'
    },
    { 
      key: 'calentamientoFluidos', 
      label: '• Calentamiento de fluidos', 
      color: '#1976d2',
      icon: '💧'
    },
  ];

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
          M. MANTENIMIENTO TEMPERATURA CORPORAL
        </Typography>

        <Typography
          variant="caption"
          sx={{ 
            mb: 2, 
            color: "#666",
            fontStyle: 'italic',
            backgroundColor: '#f0f7ff',
            p: 1,
            borderRadius: 1,
            border: '1px solid #e3f2fd',
            display: 'block'
          }}
        >
          (Campo de selección para marcar con una X los métodos utilizados)
        </Typography>

        <Paper elevation={1} sx={{ p: 2, backgroundColor: '#f8f9fa' }}>
          {/* Checkboxes para métodos predefinidos */}
          <Box sx={{ mb: 2 }}>
            {checkboxes.map(checkbox => (
              <FormControlLabel
                key={checkbox.key}
                control={
                  <Checkbox
                    checked={data[checkbox.key as keyof Pick<TemperaturaCorporalData, 'mantaTermica' | 'calentamientoFluidos'>]}
                    onChange={(e) => handleCheckboxChange(checkbox.key as 'mantaTermica' | 'calentamientoFluidos', e.target.checked)}
                    sx={{ 
                      color: checkbox.color,
                      '&.Mui-checked': { 
                        color: checkbox.color 
                      },
                      '& .MuiSvgIcon-root': { 
                        fontSize: 20 
                      }
                    }}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontSize: '1.2rem' }}>
                      {checkbox.icon}
                    </Typography>
                    <Typography sx={{ 
                      fontSize: '0.95rem', 
                      fontWeight: 500,
                      color: data[checkbox.key as keyof Pick<TemperaturaCorporalData, 'mantaTermica' | 'calentamientoFluidos'>] ? checkbox.color : '#333'
                    }}>
                      {checkbox.label}
                    </Typography>
                  </Box>
                }
                sx={{ 
                  margin: 0,
                  mb: 1,
                  padding: 1,
                  borderRadius: 1,
                  border: '1px solid transparent',
                  backgroundColor: data[checkbox.key as keyof Pick<TemperaturaCorporalData, 'mantaTermica' | 'calentamientoFluidos'>] 
                    ? `${checkbox.color}15` 
                    : 'transparent',
                  '&:hover': {
                    backgroundColor: `${checkbox.color}10`,
                    border: `1px solid ${checkbox.color}40`
                  },
                  width: '100%'
                }}
              />
            ))}
          </Box>

          {/* Campo de texto para "Otros" */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography sx={{ fontSize: '1.2rem' }}>🌡️</Typography>
              • Otros
            </Typography>
            <TextField
              size="small"
              value={data.otros}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder="Ej: CALENTADOR DE AMBIENTE, POSICIÓN CORPORAL, ETC..."
              fullWidth
              multiline
              rows={2}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  backgroundColor: data.otros.trim() ? '#4caf5015' : 'transparent',
                  '&:hover fieldset': { borderColor: '#4caf50' },
                  '&.Mui-focused fieldset': { borderColor: '#4caf50' },
                },
                '& .MuiInputLabel-root.Mui-focused': { color: '#4caf50' },
                '& input, & textarea': {
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                }
              }}
            />
          </Box>

          {/* Resumen de métodos seleccionados */}
          {metodosSeleccionados > 0 && (
            <Box sx={{ 
              mt: 2, 
              p: 1.5, 
              backgroundColor: '#e8f5e8', 
              borderRadius: 1,
              border: '1px solid #c8e6c9'
            }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#2e7d32', mb: 1 }}>
                🌡️ MÉTODOS DE MANTENIMIENTO SELECCIONADOS ({metodosSeleccionados}):
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {data.mantaTermica && (
                  <Box sx={{ 
                    backgroundColor: '#f57c00',
                    color: 'white',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5
                  }}>
                    🔥 Manta térmica
                  </Box>
                )}
                
                {data.calentamientoFluidos && (
                  <Box sx={{ 
                    backgroundColor: '#1976d2',
                    color: 'white',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5
                  }}>
                    💧 Calentamiento de fluidos
                  </Box>
                )}
                
                {data.otros.trim() && (
                  <Box sx={{ 
                    backgroundColor: '#4caf50',
                    color: 'white',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5
                  }}>
                    🌡️ {data.otros}
                  </Box>
                )}
              </Box>
            </Box>
          )}

          

          {/* Recomendación de temperatura */}
          <Box sx={{ 
            mt: 2, 
            p: 1.5, 
            backgroundColor: '#e3f2fd', 
            borderRadius: 1,
            border: '1px solid #bbdefb'
          }}>
            <Typography variant="caption" sx={{ color: '#1565c0', fontWeight: 'bold', display: 'block', mb: 0.5 }}>
              📋 RECOMENDACIÓN CLÍNICA:
            </Typography>
            <Typography variant="caption" sx={{ color: '#1565c0' }}>
              Mantener temperatura corporal central entre 36°C - 37°C. 
              La hipotermia perioperatoria puede aumentar el riesgo de complicaciones.
            </Typography>
          </Box>
        </Paper>

      
      </CardContent>
    </Card>
  );
}