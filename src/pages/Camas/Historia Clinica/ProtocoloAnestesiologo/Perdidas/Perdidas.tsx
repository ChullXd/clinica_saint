import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Paper,
  Divider,
} from '@mui/material';

interface PerdidasData {
  sangrado: string;
  diuresis: string;
  otros: string;
}

export default function Perdidas() {
  const [data, setData] = useState<PerdidasData>({
    sangrado: '',
    diuresis: '',
    otros: '',
  });

  const [total, setTotal] = useState<number>(0);

  const handleChange = (field: keyof PerdidasData, value: string) => {
    // Solo permitir números y punto decimal
    const numericValue = value.replace(/[^0-9.]/g, '');
    
    setData(prev => ({
      ...prev,
      [field]: numericValue,
    }));
  };

  // Calcular total automáticamente
  useEffect(() => {
    const suma = (parseFloat(data.sangrado) || 0) + 
                  (parseFloat(data.diuresis) || 0) + 
                  (parseFloat(data.otros) || 0);
    setTotal(suma);
  }, [data]);

  const campos = [
    { key: 'sangrado', label: '• Sangrado', placeholder: '150', color: '#d32f2f' },
    { key: 'diuresis', label: '• Diuresis', placeholder: '500', color: '#ffa000' },
    { key: 'otros', label: '• Otros', placeholder: '0', color: '#388e3c' },
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
          I. PÉRDIDAS
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
          (Campos numéricos - Ingrese las cantidades en mililitros)
        </Typography>

        <Paper elevation={1} sx={{ p: 2, backgroundColor: '#f8f9fa' }}>
          {/* Campos de pérdidas */}
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
            {campos.map(campo => (
              <TextField
                key={campo.key}
                label={campo.label}
                type="number"
                size="small"
                value={data[campo.key as keyof PerdidasData]}
                onChange={(e) => handleChange(campo.key as keyof PerdidasData, e.target.value)}
                placeholder={campo.placeholder}
                InputProps={{
                  endAdornment: <Typography variant="caption" sx={{ color: '#666', fontSize: '0.75rem' }}>ml</Typography>
                }}
                sx={{ 
                  flex: 1, 
                  minWidth: 180,
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': { borderColor: campo.color },
                    '&.Mui-focused fieldset': { borderColor: campo.color },
                  },
                  '& .MuiInputLabel-root.Mui-focused': { color: campo.color },
                  '& .MuiInputLabel-root': { fontSize: '0.85rem' },
                  '& input': {
                    fontSize: '0.9rem',
                    fontWeight: 500,
                  }
                }}
              />
            ))}
          </Box>

          <Divider sx={{ my: 1.5 }} />

          {/* Total */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            backgroundColor: '#ffebee',
            p: 1.5,
            borderRadius: 1,
            border: '2px solid #d32f2f'
          }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#d32f2f', fontSize: '1rem' }}>
                TOTAL PÉRDIDAS
              </Typography>
              <Typography variant="h4" sx={{ 
                fontWeight: 'bold', 
                color: '#d32f2f',
                lineHeight: 1
              }}>
                {total.toFixed(0)} ML
              </Typography>
              {total > 0 && (
                <Typography variant="caption" sx={{ color: '#666', fontStyle: 'italic', display: 'block', mt: 0.5 }}>
                  Suma automática de todos los campos
                </Typography>
              )}
            </Box>
          </Box>

          {/* Resumen por tipo */}
          {total > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#1A3C6D', display: 'block', mb: 1 }}>
                DESGLOSE DE PÉRDIDAS:
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {data.sangrado && parseFloat(data.sangrado) > 0 && (
                  <Paper sx={{ p: 1, backgroundColor: '#ffebee', borderLeft: '4px solid #d32f2f' }}>
                    <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#d32f2f', display: 'block' }}>
                      Sangrado:
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#d32f2f', fontWeight: 'bold' }}>
                      {parseFloat(data.sangrado).toFixed(0)} ml
                    </Typography>
                  </Paper>
                )}
                
                {data.diuresis && parseFloat(data.diuresis) > 0 && (
                  <Paper sx={{ p: 1, backgroundColor: '#fff8e1', borderLeft: '4px solid #ffa000' }}>
                    <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#f57c00', display: 'block' }}>
                      Diuresis:
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#f57c00', fontWeight: 'bold' }}>
                      {parseFloat(data.diuresis).toFixed(0)} ml
                    </Typography>
                  </Paper>
                )}
                
                {data.otros && parseFloat(data.otros) > 0 && (
                  <Paper sx={{ p: 1, backgroundColor: '#e8f5e8', borderLeft: '4px solid #388e3c' }}>
                    <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#2e7d32', display: 'block' }}>
                      Otros:
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
                      {parseFloat(data.otros).toFixed(0)} ml
                    </Typography>
                  </Paper>
                )}
              </Box>
            </Box>
          )}

          {/* Indicador de balance */}
          {total > 0 && (
            <Box sx={{ 
              mt: 2, 
              p: 1.5, 
              backgroundColor: total > 500 ? '#ffebee' : '#e8f5e8', 
              borderRadius: 1,
              border: `1px solid ${total > 500 ? '#ffcdd2' : '#c8e6c9'}`
            }}>
              <Typography variant="caption" sx={{ 
                color: total > 500 ? '#d32f2f' : '#2e7d32', 
                fontWeight: 'bold',
                display: 'block'
              }}>
                {total > 500 
                  ? '⚠️ PÉRDIDAS SIGNIFICATIVAS - Considerar reposición' 
                  : '✅ PÉRDIDAS DENTRO DE PARÁMETROS NORMALES'
                }
              </Typography>
            </Box>
          )}
        </Paper>

        {/* Nota informativa */}
        <Box sx={{ 
          mt: 2, 
          p: 1.5, 
          backgroundColor: '#fff3e0', 
          borderRadius: 1,
          border: '1px solid #ffb74d'
        }}>
          <Typography variant="caption" sx={{ color: '#e65100', fontStyle: 'italic' }}>
            <strong>Nota:</strong> Registre las pérdidas exactas en mililitros (ml). 
            El total se calcula automáticamente. Monitoree el balance hídrico durante el procedimiento.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}