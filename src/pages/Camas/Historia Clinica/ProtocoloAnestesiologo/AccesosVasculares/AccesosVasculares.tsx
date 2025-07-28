import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Paper,
} from '@mui/material';

interface AccesoVascularData {
  tipo: 'ivPeriferico1' | 'ivPeriferico2' | 'ivPeriferico3' | 'ivCentral' | 'intraArterial' | 'otro' | '';
  calibre: string;
  sitio: string;
}

export default function AccesosVasculares() {
  const [data, setData] = useState<AccesoVascularData>({
    tipo: '',
    calibre: '',
    sitio: '',
  });

  const handleChange = (field: keyof AccesoVascularData, value: string) => {
    setData(prev => ({
      ...prev,
      [field]: field === 'sitio' ? value.toUpperCase() : value,
    }));
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
          G. ACCESOS VASCULARES
        </Typography>

        <Paper elevation={1} sx={{ p: 2, backgroundColor: '#f8f9fa' }}>
          {/* Tipo */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold', fontSize: '0.95rem' }}>
              • Tipo (Campo de selección marcar una X)
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup
                value={data.tipo}
                onChange={(e) => handleChange('tipo', e.target.value)}
                sx={{ 
                  '& .MuiFormControlLabel-root': {
                    marginBottom: 0.5,
                    marginRight: 2,
                  }
                }}
              >
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  <FormControlLabel 
                    value="ivPeriferico1" 
                    control={
                      <Radio 
                        sx={{ 
                          color: '#1A3C6D', 
                          '&.Mui-checked': { color: '#1A3C6D' },
                          '& .MuiSvgIcon-root': { fontSize: 18 }
                        }} 
                      />
                    } 
                    label={
                      <Typography sx={{ fontSize: '0.85rem', fontWeight: 500 }}>
                        IV Periférico 1
                      </Typography>
                    }
                    sx={{ minWidth: 150 }}
                  />
                  <FormControlLabel 
                    value="ivPeriferico2" 
                    control={
                      <Radio 
                        sx={{ 
                          color: '#1A3C6D', 
                          '&.Mui-checked': { color: '#1A3C6D' },
                          '& .MuiSvgIcon-root': { fontSize: 18 }
                        }} 
                      />
                    } 
                    label={
                      <Typography sx={{ fontSize: '0.85rem', fontWeight: 500 }}>
                        IV Periférico 2
                      </Typography>
                    }
                    sx={{ minWidth: 150 }}
                  />
                  <FormControlLabel 
                    value="ivPeriferico3" 
                    control={
                      <Radio 
                        sx={{ 
                          color: '#1A3C6D', 
                          '&.Mui-checked': { color: '#1A3C6D' },
                          '& .MuiSvgIcon-root': { fontSize: 18 }
                        }} 
                      />
                    } 
                    label={
                      <Typography sx={{ fontSize: '0.85rem', fontWeight: 500 }}>
                        IV Periférico 3
                      </Typography>
                    }
                    sx={{ minWidth: 150 }}
                  />
                  <FormControlLabel 
                    value="ivCentral" 
                    control={
                      <Radio 
                        sx={{ 
                          color: '#1A3C6D', 
                          '&.Mui-checked': { color: '#1A3C6D' },
                          '& .MuiSvgIcon-root': { fontSize: 18 }
                        }} 
                      />
                    } 
                    label={
                      <Typography sx={{ fontSize: '0.85rem', fontWeight: 500 }}>
                        IV Central
                      </Typography>
                    }
                    sx={{ minWidth: 150 }}
                  />
                  <FormControlLabel 
                    value="intraArterial" 
                    control={
                      <Radio 
                        sx={{ 
                          color: '#1A3C6D', 
                          '&.Mui-checked': { color: '#1A3C6D' },
                          '& .MuiSvgIcon-root': { fontSize: 18 }
                        }} 
                      />
                    } 
                    label={
                      <Typography sx={{ fontSize: '0.85rem', fontWeight: 500 }}>
                        Intra arterial
                      </Typography>
                    }
                    sx={{ minWidth: 150 }}
                  />
                  <FormControlLabel 
                    value="otro" 
                    control={
                      <Radio 
                        sx={{ 
                          color: '#1A3C6D', 
                          '&.Mui-checked': { color: '#1A3C6D' },
                          '& .MuiSvgIcon-root': { fontSize: 18 }
                        }} 
                      />
                    } 
                    label={
                      <Typography sx={{ fontSize: '0.85rem', fontWeight: 500 }}>
                        Otro
                      </Typography>
                    }
                    sx={{ minWidth: 150 }}
                  />
                </Box>
              </RadioGroup>
            </FormControl>
          </Box>

          {/* Calibre y Sitio */}
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <Box sx={{ flex: 1, minWidth: 150 }}>
              <Typography variant="subtitle2" sx={{ mb: 0.5, fontWeight: 'bold', fontSize: '0.95rem' }}>
                • Calibre:
              </Typography>
              <TextField
                type="number"
                size="small"
                value={data.calibre}
                onChange={(e) => handleChange('calibre', e.target.value)}
                placeholder="18, 20, 22..."
                fullWidth
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': { borderColor: '#1A3C6D' },
                    '&.Mui-focused fieldset': { borderColor: '#1A3C6D' },
                  },
                  '& .MuiInputLabel-root.Mui-focused': { color: '#1A3C6D' },
                  '& input': {
                    fontSize: '0.9rem',
                    fontWeight: 500,
                  }
                }}
              />
            </Box>

            <Box sx={{ flex: 2, minWidth: 250 }}>
              <Typography variant="subtitle2" sx={{ mb: 0.5, fontWeight: 'bold', fontSize: '0.95rem' }}>
                • Sitio:
              </Typography>
              <TextField
                size="small"
                value={data.sitio}
                onChange={(e) => handleChange('sitio', e.target.value)}
                placeholder="VENA CEFÁLICA IZQUIERDA..."
                fullWidth
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': { borderColor: '#1A3C6D' },
                    '&.Mui-focused fieldset': { borderColor: '#1A3C6D' },
                  },
                  '& .MuiInputLabel-root.Mui-focused': { color: '#1A3C6D' },
                  '& input': {
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                  }
                }}
              />
            </Box>
          </Box>

          {/* Resumen visual compacto */}
          {(data.tipo || data.calibre || data.sitio) && (
            <Box 
              sx={{ 
                mt: 2, 
                p: 1.5, 
                backgroundColor: '#e3f2fd', 
                borderRadius: 1,
                border: '1px solid #1A3C6D'
              }}
            >
              <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#1A3C6D', display: 'block', mb: 0.5 }}>
                RESUMEN:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {data.tipo && (
                  <Typography variant="caption" sx={{ fontWeight: 500 }}>
                    <strong>Tipo:</strong> {
                      data.tipo === 'ivPeriferico1' ? 'IV Periférico 1' :
                      data.tipo === 'ivPeriferico2' ? 'IV Periférico 2' :
                      data.tipo === 'ivPeriferico3' ? 'IV Periférico 3' :
                      data.tipo === 'ivCentral' ? 'IV Central' :
                      data.tipo === 'intraArterial' ? 'Intra arterial' :
                      data.tipo === 'otro' ? 'Otro' : ''
                    }
                  </Typography>
                )}
                {data.calibre && (
                  <Typography variant="caption" sx={{ fontWeight: 500 }}>
                    <strong>Calibre:</strong> {data.calibre}G
                  </Typography>
                )}
                {data.sitio && (
                  <Typography variant="caption" sx={{ fontWeight: 500 }}>
                    <strong>Sitio:</strong> {data.sitio}
                  </Typography>
                )}
              </Box>
            </Box>
          )}
        </Paper>
      </CardContent>
    </Card>
  );
}