import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Paper,
  Chip,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

export default function CondicionEgreso() {
  // Estados para condición de egreso
  const [condicionEgreso, setCondicionEgreso] = useState({
    extubado: false,
    intubado: false,
    ucpa: false,
    uci: false,
    emergencia: false,
    morgue: false,
  });

  const [constantes, setConstantes] = useState({
    ta: '',
    fc: '',
    fr: '',
    sat02: '',
    temperatura: '',
  });

  const handleCondicionChange = (field: string, value: boolean) => {
    setCondicionEgreso(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleConstantesChange = (field: string, value: string) => {
    setConstantes(prev => ({
      ...prev,
      [field]: value,
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
          R. CONDICIÓN DE EGRESO
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
          (Registre el estado del paciente al finalizar el procedimiento anestésico)
        </Typography>

        <Paper elevation={1} sx={{ p: 2, backgroundColor: '#f8f9fa' }}>
          {/* Condiciones de Salida */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 'bold', color: '#1976d2', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: 1 }}>
              🫁 CONDICIONES DE SALIDA
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={condicionEgreso.extubado}
                    onChange={(e) => handleCondicionChange('extubado', e.target.checked)}
                    sx={{ 
                      color: '#2e7d32',
                      '&.Mui-checked': { color: '#2e7d32' },
                      '& .MuiSvgIcon-root': { fontSize: 20 }
                    }}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontSize: '1.2rem' }}>✅</Typography>
                    <Typography sx={{ 
                      fontSize: '0.95rem', 
                      fontWeight: 500,
                      color: condicionEgreso.extubado ? '#2e7d32' : '#333'
                    }}>
                      • Extubado
                    </Typography>
                  </Box>
                }
                sx={{ 
                  margin: 0,
                  padding: 1,
                  borderRadius: 1,
                  backgroundColor: condicionEgreso.extubado ? '#e8f5e8' : 'transparent',
                  '&:hover': { backgroundColor: '#e8f5e8' }
                }}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={condicionEgreso.intubado}
                    onChange={(e) => handleCondicionChange('intubado', e.target.checked)}
                    sx={{ 
                      color: '#f57c00',
                      '&.Mui-checked': { color: '#f57c00' },
                      '& .MuiSvgIcon-root': { fontSize: 20 }
                    }}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontSize: '1.2rem' }}>🔌</Typography>
                    <Typography sx={{ 
                      fontSize: '0.95rem', 
                      fontWeight: 500,
                      color: condicionEgreso.intubado ? '#f57c00' : '#333'
                    }}>
                      • Intubado
                    </Typography>
                  </Box>
                }
                sx={{ 
                  margin: 0,
                  padding: 1,
                  borderRadius: 1,
                  backgroundColor: condicionEgreso.intubado ? '#fff8e1' : 'transparent',
                  '&:hover': { backgroundColor: '#fff8e1' }
                }}
              />
            </Box>
          </Box>

          {/* Conducido a */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 'bold', color: '#7b1fa2', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: 1 }}>
              🏥 CONDUCIDO A:
            </Typography>
            
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 1 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={condicionEgreso.ucpa}
                    onChange={(e) => handleCondicionChange('ucpa', e.target.checked)}
                    sx={{ 
                      color: '#2e7d32',
                      '&.Mui-checked': { color: '#2e7d32' },
                      '& .MuiSvgIcon-root': { fontSize: 18 }
                    }}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Typography sx={{ fontSize: '1rem' }}>🛏️</Typography>
                    <Typography sx={{ 
                      fontSize: '0.85rem', 
                      fontWeight: 500,
                      color: condicionEgreso.ucpa ? '#2e7d32' : '#333'
                    }}>
                      • Unidad de cuidados post anestésicos
                    </Typography>
                  </Box>
                }
                sx={{ 
                  margin: 0,
                  padding: 0.8,
                  borderRadius: 1,
                  backgroundColor: condicionEgreso.ucpa ? '#e8f5e8' : 'transparent',
                  '&:hover': { backgroundColor: '#e8f5e8' }
                }}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={condicionEgreso.uci}
                    onChange={(e) => handleCondicionChange('uci', e.target.checked)}
                    sx={{ 
                      color: '#f57c00',
                      '&.Mui-checked': { color: '#f57c00' },
                      '& .MuiSvgIcon-root': { fontSize: 18 }
                    }}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Typography sx={{ fontSize: '1rem' }}>🏨</Typography>
                    <Typography sx={{ 
                      fontSize: '0.85rem', 
                      fontWeight: 500,
                      color: condicionEgreso.uci ? '#f57c00' : '#333'
                    }}>
                      • Unidad cuidados intensivos
                    </Typography>
                  </Box>
                }
                sx={{ 
                  margin: 0,
                  padding: 0.8,
                  borderRadius: 1,
                  backgroundColor: condicionEgreso.uci ? '#fff8e1' : 'transparent',
                  '&:hover': { backgroundColor: '#fff8e1' }
                }}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={condicionEgreso.emergencia}
                    onChange={(e) => handleCondicionChange('emergencia', e.target.checked)}
                    sx={{ 
                      color: '#d32f2f',
                      '&.Mui-checked': { color: '#d32f2f' },
                      '& .MuiSvgIcon-root': { fontSize: 18 }
                    }}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Typography sx={{ fontSize: '1rem' }}>🚨</Typography>
                    <Typography sx={{ 
                      fontSize: '0.85rem', 
                      fontWeight: 500,
                      color: condicionEgreso.emergencia ? '#d32f2f' : '#333'
                    }}>
                      • Críticos de emergencia
                    </Typography>
                  </Box>
                }
                sx={{ 
                  margin: 0,
                  padding: 0.8,
                  borderRadius: 1,
                  backgroundColor: condicionEgreso.emergencia ? '#ffebee' : 'transparent',
                  '&:hover': { backgroundColor: '#ffebee' }
                }}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={condicionEgreso.morgue}
                    onChange={(e) => handleCondicionChange('morgue', e.target.checked)}
                    sx={{ 
                      color: '#424242',
                      '&.Mui-checked': { color: '#424242' },
                      '& .MuiSvgIcon-root': { fontSize: 18 }
                    }}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Typography sx={{ fontSize: '1rem' }}>⚰️</Typography>
                    <Typography sx={{ 
                      fontSize: '0.85rem', 
                      fontWeight: 500,
                      color: condicionEgreso.morgue ? '#424242' : '#333'
                    }}>
                      • Morgue
                    </Typography>
                  </Box>
                }
                sx={{ 
                  margin: 0,
                  padding: 0.8,
                  borderRadius: 1,
                  backgroundColor: condicionEgreso.morgue ? '#f5f5f5' : 'transparent',
                  '&:hover': { backgroundColor: '#f5f5f5' }
                }}
              />
            </Box>
          </Box>

          {/* Constantes Vitales de Entrega */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 'bold', color: '#d32f2f', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: 1 }}>
              📊 CONSTANTES VITALES DE ENTREGA:
            </Typography>
            
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 1.5 }}>
              <TextField
                label="• TA:"
                size="small"
                value={constantes.ta}
                onChange={(e) => handleConstantesChange('ta', e.target.value)}
                placeholder="120/80"
                InputProps={{
                  endAdornment: <Typography variant="caption" sx={{ color: '#666', fontSize: '0.75rem' }}>mmHg</Typography>
                }}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: constantes.ta ? '#ffebee15' : 'transparent',
                    '&:hover fieldset': { borderColor: '#d32f2f' },
                    '&.Mui-focused fieldset': { borderColor: '#d32f2f' },
                  },
                  '& .MuiInputLabel-root.Mui-focused': { color: '#d32f2f' },
                  '& .MuiInputLabel-root': { fontSize: '0.85rem' },
                  '& input': { fontSize: '0.9rem', fontWeight: 500 }
                }}
              />

              <TextField
                label="• FC:"
                size="small"
                type="number"
                value={constantes.fc}
                onChange={(e) => handleConstantesChange('fc', e.target.value)}
                placeholder="70"
                InputProps={{
                  endAdornment: <Typography variant="caption" sx={{ color: '#666', fontSize: '0.75rem' }}>lpm</Typography>
                }}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: constantes.fc ? '#e3f2fd15' : 'transparent',
                    '&:hover fieldset': { borderColor: '#1976d2' },
                    '&.Mui-focused fieldset': { borderColor: '#1976d2' },
                  },
                  '& .MuiInputLabel-root.Mui-focused': { color: '#1976d2' },
                  '& .MuiInputLabel-root': { fontSize: '0.85rem' },
                  '& input': { fontSize: '0.9rem', fontWeight: 500 }
                }}
              />

              <TextField
                label="• FR:"
                size="small"
                type="number"
                value={constantes.fr}
                onChange={(e) => handleConstantesChange('fr', e.target.value)}
                placeholder="16"
                InputProps={{
                  endAdornment: <Typography variant="caption" sx={{ color: '#666', fontSize: '0.75rem' }}>rpm</Typography>
                }}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: constantes.fr ? '#e8f5e815' : 'transparent',
                    '&:hover fieldset': { borderColor: '#388e3c' },
                    '&.Mui-focused fieldset': { borderColor: '#388e3c' },
                  },
                  '& .MuiInputLabel-root.Mui-focused': { color: '#388e3c' },
                  '& .MuiInputLabel-root': { fontSize: '0.85rem' },
                  '& input': { fontSize: '0.9rem', fontWeight: 500 }
                }}
              />

              <TextField
                label="• SAT.O₂:"
                size="small"
                type="number"
                value={constantes.sat02}
                onChange={(e) => handleConstantesChange('sat02', e.target.value)}
                placeholder="98"
                InputProps={{
                  endAdornment: <Typography variant="caption" sx={{ color: '#666', fontSize: '0.75rem' }}>%</Typography>
                }}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: constantes.sat02 ? '#f3e5f515' : 'transparent',
                    '&:hover fieldset': { borderColor: '#7b1fa2' },
                    '&.Mui-focused fieldset': { borderColor: '#7b1fa2' },
                  },
                  '& .MuiInputLabel-root.Mui-focused': { color: '#7b1fa2' },
                  '& .MuiInputLabel-root': { fontSize: '0.85rem' },
                  '& input': { fontSize: '0.9rem', fontWeight: 500 }
                }}
              />

              <TextField
                label="• T°:"
                size="small"
                value={constantes.temperatura}
                onChange={(e) => handleConstantesChange('temperatura', e.target.value)}
                placeholder="36.5"
                InputProps={{
                  endAdornment: <Typography variant="caption" sx={{ color: '#666', fontSize: '0.75rem' }}>°C</Typography>
                }}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: constantes.temperatura ? '#fff8e115' : 'transparent',
                    '&:hover fieldset': { borderColor: '#f57c00' },
                    '&.Mui-focused fieldset': { borderColor: '#f57c00' },
                  },
                  '& .MuiInputLabel-root.Mui-focused': { color: '#f57c00' },
                  '& .MuiInputLabel-root': { fontSize: '0.85rem' },
                  '& input': { fontSize: '0.9rem', fontWeight: 500 }
                }}
              />
            </Box>
          </Box>

          {/* Resumen de condición de egreso */}
          {(Object.values(condicionEgreso).some(Boolean) || Object.values(constantes).some(v => v.trim())) && (
            <Box sx={{ 
              mt: 2, 
              p: 1.5, 
              backgroundColor: '#e8f5e8', 
              borderRadius: 1,
              border: '1px solid #c8e6c9'
            }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#2e7d32', mb: 1 }}>
                📋 RESUMEN DE EGRESO:
              </Typography>
              
              {/* Estado respiratorio */}
              {(condicionEgreso.extubado || condicionEgreso.intubado) && (
                <Box sx={{ mb: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                    Estado respiratorio: 
                  </Typography>
                  {condicionEgreso.extubado && (
                    <Chip label="✅ EXTUBADO" size="small" sx={{ ml: 1, backgroundColor: '#2e7d32', color: 'white', fontSize: '0.75rem' }} />
                  )}
                  {condicionEgreso.intubado && (
                    <Chip label="🔌 INTUBADO" size="small" sx={{ ml: 1, backgroundColor: '#f57c00', color: 'white', fontSize: '0.75rem' }} />
                  )}
                </Box>
              )}

              {/* Destino */}
              <Box sx={{ mb: 1 }}>
                <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#7b1fa2' }}>
                  Destino: 
                </Typography>
                {condicionEgreso.ucpa && <Chip label="🛏️ UCPA" size="small" sx={{ ml: 0.5, backgroundColor: '#2e7d32', color: 'white', fontSize: '0.75rem' }} />}
                {condicionEgreso.uci && <Chip label="🏨 UCI" size="small" sx={{ ml: 0.5, backgroundColor: '#f57c00', color: 'white', fontSize: '0.75rem' }} />}
                {condicionEgreso.emergencia && <Chip label="🚨 EMERGENCIA" size="small" sx={{ ml: 0.5, backgroundColor: '#d32f2f', color: 'white', fontSize: '0.75rem' }} />}
                {condicionEgreso.morgue && <Chip label="⚰️ MORGUE" size="small" sx={{ ml: 0.5, backgroundColor: '#424242', color: 'white', fontSize: '0.75rem' }} />}
              </Box>

              {/* Constantes vitales */}
              {Object.values(constantes).some(v => v.trim()) && (
                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#d32f2f', display: 'block', mb: 0.5 }}>
                    Constantes vitales:
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                    {constantes.ta && <Chip label={`TA: ${constantes.ta} mmHg`} size="small" sx={{ backgroundColor: '#d32f2f', color: 'white', fontSize: '0.7rem' }} />}
                    {constantes.fc && <Chip label={`FC: ${constantes.fc} lpm`} size="small" sx={{ backgroundColor: '#1976d2', color: 'white', fontSize: '0.7rem' }} />}
                    {constantes.fr && <Chip label={`FR: ${constantes.fr} rpm`} size="small" sx={{ backgroundColor: '#388e3c', color: 'white', fontSize: '0.7rem' }} />}
                    {constantes.sat02 && <Chip label={`SAT: ${constantes.sat02}%`} size="small" sx={{ backgroundColor: '#7b1fa2', color: 'white', fontSize: '0.7rem' }} />}
                    {constantes.temperatura && <Chip label={`T°: ${constantes.temperatura}°C`} size="small" sx={{ backgroundColor: '#f57c00', color: 'white', fontSize: '0.7rem' }} />}
                  </Box>
                </Box>
              )}
            </Box>
          )}

          {/* Mensaje cuando no hay datos */}
          {!Object.values(condicionEgreso).some(Boolean) && !Object.values(constantes).some(v => v.trim()) && (
            <Box sx={{ 
              mt: 2, 
              p: 1.5, 
              backgroundColor: '#fff3e0', 
              borderRadius: 1,
              border: '1px solid #ffb74d',
              textAlign: 'center'
            }}>
              <Typography variant="body2" sx={{ color: '#e65100', fontStyle: 'italic' }}>
                📋 No se han registrado condiciones de egreso
              </Typography>
            </Box>
          )}
        </Paper>
      </CardContent>
    </Card>
  );
}