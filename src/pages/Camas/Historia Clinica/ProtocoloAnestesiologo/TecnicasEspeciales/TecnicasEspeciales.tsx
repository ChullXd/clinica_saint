import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  FormControlLabel,
  Checkbox,
  Paper,
} from '@mui/material';

interface TecnicasEspecialesData {
  hemodilucion: boolean;
  autotransfusion: boolean;
  hipotension: boolean;
  hipotermia: boolean;
  circulacionExtracorporea: boolean;
}

export default function TecnicasEspeciales() {
  const [data, setData] = useState<TecnicasEspecialesData>({
    hemodilucion: false,
    autotransfusion: false,
    hipotension: false,
    hipotermia: false,
    circulacionExtracorporea: false,
  });

  const handleChange = (field: keyof TecnicasEspecialesData, value: boolean) => {
    setData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const tecnicas = [
    { key: 'hemodilucion', label: '• Hemodilución', color: '#1976d2' },
    { key: 'autotransfusion', label: '• Autotransfusión', color: '#d32f2f' },
    { key: 'hipotension', label: '• Hipotensión', color: '#f57c00' },
    { key: 'hipotermia', label: '• Hipotermia', color: '#7b1fa2' },
    { key: 'circulacionExtracorporea', label: '• Circulación Extracorpórea', color: '#388e3c' },
  ];

  // Contar técnicas seleccionadas
  const tecnicasSeleccionadas = Object.values(data).filter(Boolean).length;

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
          L. TÉCNICAS ESPECIALES
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
          (Campo de selección para marcar con una X las técnicas utilizadas)
        </Typography>

        <Paper elevation={1} sx={{ p: 2, backgroundColor: '#f8f9fa' }}>
          {/* Lista de técnicas especiales */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {tecnicas.map(tecnica => (
              <FormControlLabel
                key={tecnica.key}
                control={
                  <Checkbox
                    checked={data[tecnica.key as keyof TecnicasEspecialesData]}
                    onChange={(e) => handleChange(tecnica.key as keyof TecnicasEspecialesData, e.target.checked)}
                    sx={{ 
                      color: tecnica.color,
                      '&.Mui-checked': { 
                        color: tecnica.color 
                      },
                      '& .MuiSvgIcon-root': { 
                        fontSize: 20 
                      }
                    }}
                  />
                }
                label={
                  <Typography sx={{ 
                    fontSize: '0.95rem', 
                    fontWeight: 500,
                    color: data[tecnica.key as keyof TecnicasEspecialesData] ? tecnica.color : '#333'
                  }}>
                    {tecnica.label}
                  </Typography>
                }
                sx={{ 
                  margin: 0,
                  padding: 1,
                  borderRadius: 1,
                  border: '1px solid transparent',
                  backgroundColor: data[tecnica.key as keyof TecnicasEspecialesData] 
                    ? `${tecnica.color}15` 
                    : 'transparent',
                  '&:hover': {
                    backgroundColor: `${tecnica.color}10`,
                    border: `1px solid ${tecnica.color}40`
                  }
                }}
              />
            ))}
          </Box>

          {/* Resumen de técnicas seleccionadas */}
          {tecnicasSeleccionadas > 0 && (
            <Box sx={{ 
              mt: 2, 
              p: 1.5, 
              backgroundColor: '#e8f5e8', 
              borderRadius: 1,
              border: '1px solid #c8e6c9'
            }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#2e7d32', mb: 1 }}>
                ✓ TÉCNICAS SELECCIONADAS ({tecnicasSeleccionadas}):
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {tecnicas.map(tecnica => {
                  const isSelected = data[tecnica.key as keyof TecnicasEspecialesData];
                  if (!isSelected) return null;
                  
                  return (
                    <Box
                      key={tecnica.key}
                      sx={{ 
                        backgroundColor: tecnica.color,
                        color: 'white',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: '0.85rem',
                        fontWeight: 'bold'
                      }}
                    >
                      {tecnica.label.replace('• ', '')}
                    </Box>
                  );
                })}
              </Box>
            </Box>
          )}

          {/* Información sobre las técnicas */}
          {tecnicasSeleccionadas === 0 && (
            <Box sx={{ 
              mt: 2, 
              p: 1.5, 
              backgroundColor: '#f5f5f5', 
              borderRadius: 1,
              border: '1px solid #e0e0e0',
              textAlign: 'center'
            }}>
              <Typography variant="body2" sx={{ color: '#666', fontStyle: 'italic' }}>
                No se han seleccionado técnicas especiales
              </Typography>
            </Box>
          )}
        </Paper>

        {/* Información adicional sobre técnicas especiales */}
        <Box sx={{ 
          mt: 2, 
          p: 1.5, 
          backgroundColor: '#fff3e0', 
          borderRadius: 1,
          border: '1px solid #ffb74d'
        }}>
          <Typography variant="caption" sx={{ color: '#e65100', fontStyle: 'italic' }}>
            <strong>Nota:</strong> Las técnicas especiales requieren consideraciones adicionales de monitoreo y manejo. 
            Marque todas las técnicas utilizadas durante el procedimiento anestésico-quirúrgico.
          </Typography>
        </Box>

        {/* Alertas específicas para técnicas críticas */}
        {(data.circulacionExtracorporea || data.hipotermia) && (
          <Box sx={{ 
            mt: 2, 
            p: 1.5, 
            backgroundColor: '#ffebee', 
            borderRadius: 1,
            border: '1px solid #f8bbd9'
          }}>
            <Typography variant="caption" sx={{ color: '#d32f2f', fontWeight: 'bold' }}>
              ⚠️ ALERTA: Técnicas de alto riesgo seleccionadas. 
              Asegurar monitoreo especializado y protocolos específicos.
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}