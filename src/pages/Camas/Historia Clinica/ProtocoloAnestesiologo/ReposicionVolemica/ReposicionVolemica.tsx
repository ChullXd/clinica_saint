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

interface ReposicionVolemicaData {
  dextrosa5: string;
  dextrosa10: string;
  dextrosa50: string;
  dextrosaEnSS: string;
  ss09: string;
  lactatoRinger: string;
  expansores: string;
  sangre: string;
  plasma: string;
  plaquetas: string;
  crioprecipitados: string;
  otros: string;
}

export default function ReposicionVolemica() {
  const [data, setData] = useState<ReposicionVolemicaData>({
    dextrosa5: '',
    dextrosa10: '',
    dextrosa50: '',
    dextrosaEnSS: '',
    ss09: '',
    lactatoRinger: '',
    expansores: '',
    sangre: '',
    plasma: '',
    plaquetas: '',
    crioprecipitados: '',
    otros: '',
  });

  const [total, setTotal] = useState<number>(0);

  const handleChange = (field: keyof ReposicionVolemicaData, value: string) => {
    const numericValue = value.replace(/[^0-9.]/g, '');
    setData(prev => ({
      ...prev,
      [field]: numericValue,
    }));
  };

  useEffect(() => {
    const valores = Object.values(data);
    const suma = valores.reduce((total, valor) => {
      const num = parseFloat(valor) || 0;
      return total + num;
    }, 0);
    setTotal(suma);
  }, [data]);

  const campos = [
    { key: 'dextrosa5', label: 'Dextrosa 5%', placeholder: '500' },
    { key: 'dextrosa10', label: 'Dextrosa 10%', placeholder: '250' },
    { key: 'dextrosa50', label: 'Dextrosa 50%', placeholder: '50' },
    { key: 'dextrosaEnSS', label: 'Dextrosa en SS', placeholder: '1000' },
    { key: 'ss09', label: 'SS. 0.9%', placeholder: '500' },
    { key: 'lactatoRinger', label: 'Lactato Ringer', placeholder: '1000' },
    { key: 'expansores', label: 'Expansores', placeholder: '500' },
    { key: 'sangre', label: 'Sangre', placeholder: '300' },
    { key: 'plasma', label: 'Plasma', placeholder: '250' },
    { key: 'plaquetas', label: 'Plaquetas', placeholder: '300' },
    { key: 'crioprecipitados', label: 'Crioprecipitados', placeholder: '150' },
    { key: 'otros', label: 'Otros', placeholder: '0' },
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
          H. REPOSICIÓN VOLÉMICA (ML)
        </Typography>

        <Paper elevation={1} sx={{ p: 2, backgroundColor: '#f8f9fa' }}>
          {/* Cristaloides */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold', color: '#1A3C6D', fontSize: '0.95rem' }}>
              CRISTALOIDES
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 1.5 }}>
              {campos.slice(0, 6).map(campo => (
                <TextField
                  key={campo.key}
                  label={campo.label}
                  type="number"
                  size="small"
                  value={data[campo.key as keyof ReposicionVolemicaData]}
                  onChange={(e) => handleChange(campo.key as keyof ReposicionVolemicaData, e.target.value)}
                  placeholder={campo.placeholder}
                  InputProps={{
                    endAdornment: <Typography variant="caption" sx={{ color: '#666', fontSize: '0.75rem' }}>ml</Typography>
                  }}
                  sx={{ 
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': { borderColor: '#1A3C6D' },
                      '&.Mui-focused fieldset': { borderColor: '#1A3C6D' },
                    },
                    '& .MuiInputLabel-root.Mui-focused': { color: '#1A3C6D' },
                    '& .MuiInputLabel-root': { fontSize: '0.85rem' },
                    '& input': { fontSize: '0.9rem' }
                  }}
                />
              ))}
            </Box>
          </Box>

          <Divider sx={{ my: 1.5 }} />

          {/* Hemoderivados */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold', color: '#d32f2f', fontSize: '0.95rem' }}>
              HEMODERIVADOS
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minWidth(180px, 1fr))', gap: 1.5 }}>
              {campos.slice(6, 11).map(campo => (
                <TextField
                  key={campo.key}
                  label={campo.label}
                  type="number"
                  size="small"
                  value={data[campo.key as keyof ReposicionVolemicaData]}
                  onChange={(e) => handleChange(campo.key as keyof ReposicionVolemicaData, e.target.value)}
                  placeholder={campo.placeholder}
                  InputProps={{
                    endAdornment: <Typography variant="caption" sx={{ color: '#666', fontSize: '0.75rem' }}>ml</Typography>
                  }}
                  sx={{ 
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': { borderColor: '#d32f2f' },
                      '&.Mui-focused fieldset': { borderColor: '#d32f2f' },
                    },
                    '& .MuiInputLabel-root.Mui-focused': { color: '#d32f2f' },
                    '& .MuiInputLabel-root': { fontSize: '0.85rem' },
                    '& input': { fontSize: '0.9rem' }
                  }}
                />
              ))}
            </Box>
          </Box>

          <Divider sx={{ my: 1.5 }} />

          {/* Otros */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold', color: '#4caf50', fontSize: '0.95rem' }}>
              OTROS
            </Typography>
            <TextField
              label={campos[11].label}
              type="number"
              size="small"
              value={data.otros}
              onChange={(e) => handleChange('otros', e.target.value)}
              placeholder={campos[11].placeholder}
              InputProps={{
                endAdornment: <Typography variant="caption" sx={{ color: '#666', fontSize: '0.75rem' }}>ml</Typography>
              }}
              sx={{ 
                maxWidth: 250,
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': { borderColor: '#4caf50' },
                  '&.Mui-focused fieldset': { borderColor: '#4caf50' },
                },
                '& .MuiInputLabel-root.Mui-focused': { color: '#4caf50' },
                '& .MuiInputLabel-root': { fontSize: '0.85rem' },
                '& input': { fontSize: '0.9rem' }
              }}
            />
          </Box>

          <Divider sx={{ my: 1.5 }} />

          {/* Total */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            backgroundColor: '#e3f2fd',
            p: 1.5,
            borderRadius: 1,
            border: '2px solid #1A3C6D'
          }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#1A3C6D', fontSize: '1rem' }}>
                TOTAL ADMINISTRADO
              </Typography>
              <Typography variant="h4" sx={{ 
                fontWeight: 'bold', 
                color: '#1A3C6D',
                lineHeight: 1
              }}>
                {total.toFixed(0)} ML
              </Typography>
            </Box>
          </Box>

          {/* Resumen compacto */}
          {total > 0 && (
            <Box sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Paper sx={{ p: 1, flex: 1, minWidth: 120, backgroundColor: '#e8f5e8' }}>
                  <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#2e7d32', display: 'block' }}>
                    Cristaloides:
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
                    {(
                      (parseFloat(data.dextrosa5) || 0) + 
                      (parseFloat(data.dextrosa10) || 0) + 
                      (parseFloat(data.dextrosa50) || 0) + 
                      (parseFloat(data.dextrosaEnSS) || 0) + 
                      (parseFloat(data.ss09) || 0) + 
                      (parseFloat(data.lactatoRinger) || 0)
                    ).toFixed(0)} ml
                  </Typography>
                </Paper>

                <Paper sx={{ p: 1, flex: 1, minWidth: 120, backgroundColor: '#ffebee' }}>
                  <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#c62828', display: 'block' }}>
                    Hemoderivados:
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#c62828', fontWeight: 'bold' }}>
                    {(
                      (parseFloat(data.expansores) || 0) + 
                      (parseFloat(data.sangre) || 0) + 
                      (parseFloat(data.plasma) || 0) + 
                      (parseFloat(data.plaquetas) || 0) + 
                      (parseFloat(data.crioprecipitados) || 0)
                    ).toFixed(0)} ml
                  </Typography>
                </Paper>

                <Paper sx={{ p: 1, flex: 1, minWidth: 120, backgroundColor: '#f3e5f5' }}>
                  <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#7b1fa2', display: 'block' }}>
                    Otros:
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#7b1fa2', fontWeight: 'bold' }}>
                    {(parseFloat(data.otros) || 0).toFixed(0)} ml
                  </Typography>
                </Paper>
              </Box>
            </Box>
          )}
        </Paper>
      </CardContent>
    </Card>
  );
}