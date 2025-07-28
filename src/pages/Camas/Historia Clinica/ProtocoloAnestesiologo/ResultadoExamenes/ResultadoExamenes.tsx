import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Paper,
  Chip,
  Divider,
} from '@mui/material';

interface ExamenesLaboratorioData {
  hora: string;
  ph: string;
  po2: string;
  pco2: string;
  hco3: string;
  eb: string;
  sat02: string;
  lactato: string;
  glucosa: string;
  na: string;
  k: string;
  cl: string;
  hcto: string;
  hb: string;
  otro: string;
}

export default function ExamenesLaboratorio() {
  const [data, setData] = useState<ExamenesLaboratorioData>({
    hora: '',
    ph: '',
    po2: '',
    pco2: '',
    hco3: '',
    eb: '',
    sat02: '',
    lactato: '',
    glucosa: '',
    na: '',
    k: '',
    cl: '',
    hcto: '',
    hb: '',
    otro: '',
  });

  const handleChange = (field: keyof ExamenesLaboratorioData, value: string) => {
    setData(prev => ({
      ...prev,
      [field]: field === 'otro' ? value.toUpperCase() : value,
    }));
  };

  // Definir exámenes con categorías, rangos normales y colores
  const examenes = [
    // Gases arteriales
    { 
      key: 'ph', 
      label: '• pH', 
      placeholder: '7.35-7.45',
      category: 'gases',
      unit: '',
      normalRange: { min: 7.35, max: 7.45 },
      color: '#1976d2',
      icon: '⚗️'
    },
    { 
      key: 'po2', 
      label: '• PO₂', 
      placeholder: '80-100',
      category: 'gases',
      unit: 'mmHg',
      normalRange: { min: 80, max: 100 },
      color: '#1976d2',
      icon: '🫁'
    },
    { 
      key: 'pco2', 
      label: '• PCO₂', 
      placeholder: '35-45',
      category: 'gases',
      unit: 'mmHg',
      normalRange: { min: 35, max: 45 },
      color: '#1976d2',
      icon: '🫁'
    },
    { 
      key: 'hco3', 
      label: '• HCO₃', 
      placeholder: '22-26',
      category: 'gases',
      unit: 'mEq/L',
      normalRange: { min: 22, max: 26 },
      color: '#1976d2',
      icon: '⚗️'
    },
    { 
      key: 'eb', 
      label: '• EB', 
      placeholder: '-2 a +2',
      category: 'gases',
      unit: 'mEq/L',
      normalRange: { min: -2, max: 2 },
      color: '#1976d2',
      icon: '⚗️'
    },
    { 
      key: 'sat02', 
      label: '• SAT. O₂', 
      placeholder: '95-100',
      category: 'gases',
      unit: '%',
      normalRange: { min: 95, max: 100 },
      color: '#1976d2',
      icon: '🫁'
    },

    // Metabolitos
    { 
      key: 'lactato', 
      label: '• LACTATO', 
      placeholder: '0.5-2.2',
      category: 'metabolitos',
      unit: 'mmol/L',
      normalRange: { min: 0.5, max: 2.2 },
      color: '#f57c00',
      icon: '🔬'
    },
    { 
      key: 'glucosa', 
      label: '• GLUCOSA', 
      placeholder: '70-110',
      category: 'metabolitos',
      unit: 'mg/dL',
      normalRange: { min: 70, max: 110 },
      color: '#f57c00',
      icon: '🍯'
    },

    // Electrolitos
    { 
      key: 'na', 
      label: '• Na⁺', 
      placeholder: '135-145',
      category: 'electrolitos',
      unit: 'mEq/L',
      normalRange: { min: 135, max: 145 },
      color: '#7b1fa2',
      icon: '⚡'
    },
    { 
      key: 'k', 
      label: '• K⁺', 
      placeholder: '3.5-5.0',
      category: 'electrolitos',
      unit: 'mEq/L',
      normalRange: { min: 3.5, max: 5.0 },
      color: '#7b1fa2',
      icon: '⚡'
    },
    { 
      key: 'cl', 
      label: '• Cl⁻', 
      placeholder: '98-107',
      category: 'electrolitos',
      unit: 'mEq/L',
      normalRange: { min: 98, max: 107 },
      color: '#7b1fa2',
      icon: '⚡'
    },

    // Hematológicos
    { 
      key: 'hcto', 
      label: '• HCTO', 
      placeholder: '36-46',
      category: 'hematologicos',
      unit: '%',
      normalRange: { min: 36, max: 46 },
      color: '#d32f2f',
      icon: '🩸'
    },
    { 
      key: 'hb', 
      label: '• Hb', 
      placeholder: '12-16',
      category: 'hematologicos',
      unit: 'g/dL',
      normalRange: { min: 12, max: 16 },
      color: '#d32f2f',
      icon: '🩸'
    },
  ];

  // Función para determinar el estado del valor
  const getValueStatus = (value: string, normalRange: { min: number, max: number }) => {
    if (!value.trim()) return 'empty';
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return 'invalid';
    if (numValue < normalRange.min) return 'low';
    if (numValue > normalRange.max) return 'high';
    return 'normal';
  };

  // Función para obtener color según estado
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'low': return '#1976d2'; // Azul para bajo
      case 'high': return '#d32f2f'; // Rojo para alto
      case 'normal': return '#2e7d32'; // Verde para normal
      case 'invalid': return '#ff9800'; // Naranja para inválido
      default: return '#666'; // Gris para vacío
    }
  };

  // Contar exámenes realizados
  const examenesRealizados = examenes.filter(examen => 
    data[examen.key as keyof ExamenesLaboratorioData].trim()
  ).length;

  const tieneOtros = data.otro.trim();
  const totalExamenes = examenesRealizados + (tieneOtros ? 1 : 0);

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
          O. RESULTADO DE EXÁMENES DE LABORATORIO
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
          (Ingrese los valores de laboratorio obtenidos durante el procedimiento)
        </Typography>

        <Paper elevation={1} sx={{ p: 2, backgroundColor: '#f8f9fa' }}>
          {/* Hora de toma de muestra */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography sx={{ fontSize: '1rem' }}>🕒</Typography>
              • Hora:
            </Typography>
            <TextField
              size="small"
              type="time"
              value={data.hora}
              onChange={(e) => handleChange('hora', e.target.value)}
              sx={{ 
                width: 150,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: data.hora ? '#4caf5015' : 'transparent',
                  '&:hover fieldset': { borderColor: '#4caf50' },
                  '&.Mui-focused fieldset': { borderColor: '#4caf50' },
                },
                '& .MuiInputLabel-root.Mui-focused': { color: '#4caf50' },
                '& input': {
                  fontSize: '1rem',
                  fontWeight: 500,
                }
              }}
            />
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Gases Arteriales */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 'bold', color: '#1976d2', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: 1 }}>
              🫁 GASES ARTERIALES
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 1.5 }}>
              {examenes.filter(e => e.category === 'gases').map(examen => {
                const status = getValueStatus(data[examen.key as keyof ExamenesLaboratorioData], examen.normalRange);
                return (
                  <TextField
                    key={examen.key}
                    label={examen.label}
                    size="small"
                    value={data[examen.key as keyof ExamenesLaboratorioData]}
                    onChange={(e) => handleChange(examen.key as keyof ExamenesLaboratorioData, e.target.value)}
                    placeholder={examen.placeholder}
                    InputProps={{
                      endAdornment: examen.unit && (
                        <Typography variant="caption" sx={{ color: '#666', fontSize: '0.75rem' }}>
                          {examen.unit}
                        </Typography>
                      )
                    }}
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: status !== 'empty' ? `${getStatusColor(status)}15` : 'transparent',
                        '&:hover fieldset': { borderColor: getStatusColor(status) },
                        '&.Mui-focused fieldset': { borderColor: getStatusColor(status) },
                      },
                      '& .MuiInputLabel-root.Mui-focused': { color: getStatusColor(status) },
                      '& .MuiInputLabel-root': { fontSize: '0.85rem' },
                      '& input': {
                        fontSize: '0.9rem',
                        fontWeight: 500,
                        color: getStatusColor(status),
                      }
                    }}
                  />
                );
              })}
            </Box>
          </Box>

          {/* Metabolitos */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 'bold', color: '#f57c00', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: 1 }}>
              🔬 METABOLITOS
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 1.5 }}>
              {examenes.filter(e => e.category === 'metabolitos').map(examen => {
                const status = getValueStatus(data[examen.key as keyof ExamenesLaboratorioData], examen.normalRange);
                return (
                  <TextField
                    key={examen.key}
                    label={examen.label}
                    size="small"
                    value={data[examen.key as keyof ExamenesLaboratorioData]}
                    onChange={(e) => handleChange(examen.key as keyof ExamenesLaboratorioData, e.target.value)}
                    placeholder={examen.placeholder}
                    InputProps={{
                      endAdornment: examen.unit && (
                        <Typography variant="caption" sx={{ color: '#666', fontSize: '0.75rem' }}>
                          {examen.unit}
                        </Typography>
                      )
                    }}
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: status !== 'empty' ? `${getStatusColor(status)}15` : 'transparent',
                        '&:hover fieldset': { borderColor: getStatusColor(status) },
                        '&.Mui-focused fieldset': { borderColor: getStatusColor(status) },
                      },
                      '& .MuiInputLabel-root.Mui-focused': { color: getStatusColor(status) },
                      '& .MuiInputLabel-root': { fontSize: '0.85rem' },
                      '& input': {
                        fontSize: '0.9rem',
                        fontWeight: 500,
                        color: getStatusColor(status),
                      }
                    }}
                  />
                );
              })}
            </Box>
          </Box>

          {/* Electrolitos */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 'bold', color: '#7b1fa2', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: 1 }}>
              ⚡ ELECTROLITOS
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 1.5 }}>
              {examenes.filter(e => e.category === 'electrolitos').map(examen => {
                const status = getValueStatus(data[examen.key as keyof ExamenesLaboratorioData], examen.normalRange);
                return (
                  <TextField
                    key={examen.key}
                    label={examen.label}
                    size="small"
                    value={data[examen.key as keyof ExamenesLaboratorioData]}
                    onChange={(e) => handleChange(examen.key as keyof ExamenesLaboratorioData, e.target.value)}
                    placeholder={examen.placeholder}
                    InputProps={{
                      endAdornment: examen.unit && (
                        <Typography variant="caption" sx={{ color: '#666', fontSize: '0.75rem' }}>
                          {examen.unit}
                        </Typography>
                      )
                    }}
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: status !== 'empty' ? `${getStatusColor(status)}15` : 'transparent',
                        '&:hover fieldset': { borderColor: getStatusColor(status) },
                        '&.Mui-focused fieldset': { borderColor: getStatusColor(status) },
                      },
                      '& .MuiInputLabel-root.Mui-focused': { color: getStatusColor(status) },
                      '& .MuiInputLabel-root': { fontSize: '0.85rem' },
                      '& input': {
                        fontSize: '0.9rem',
                        fontWeight: 500,
                        color: getStatusColor(status),
                      }
                    }}
                  />
                );
              })}
            </Box>
          </Box>

          {/* Hematológicos */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 'bold', color: '#d32f2f', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: 1 }}>
              🩸 HEMATOLÓGICOS
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 1.5 }}>
              {examenes.filter(e => e.category === 'hematologicos').map(examen => {
                const status = getValueStatus(data[examen.key as keyof ExamenesLaboratorioData], examen.normalRange);
                return (
                  <TextField
                    key={examen.key}
                    label={examen.label}
                    size="small"
                    value={data[examen.key as keyof ExamenesLaboratorioData]}
                    onChange={(e) => handleChange(examen.key as keyof ExamenesLaboratorioData, e.target.value)}
                    placeholder={examen.placeholder}
                    InputProps={{
                      endAdornment: examen.unit && (
                        <Typography variant="caption" sx={{ color: '#666', fontSize: '0.75rem' }}>
                          {examen.unit}
                        </Typography>
                      )
                    }}
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: status !== 'empty' ? `${getStatusColor(status)}15` : 'transparent',
                        '&:hover fieldset': { borderColor: getStatusColor(status) },
                        '&.Mui-focused fieldset': { borderColor: getStatusColor(status) },
                      },
                      '& .MuiInputLabel-root.Mui-focused': { color: getStatusColor(status) },
                      '& .MuiInputLabel-root': { fontSize: '0.85rem' },
                      '& input': {
                        fontSize: '0.9rem',
                        fontWeight: 500,
                        color: getStatusColor(status),
                      }
                    }}
                  />
                );
              })}
            </Box>
          </Box>

          {/* Campo de texto para "Otros" */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography sx={{ fontSize: '1rem' }}>📝</Typography>
              • Otros
            </Typography>
            <TextField
              size="small"
              value={data.otro}
              onChange={(e) => handleChange('otro', e.target.value)}
              placeholder="OTROS EXÁMENES NO LISTADOS..."
              fullWidth
              multiline
              rows={2}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  backgroundColor: data.otro.trim() ? '#4caf5015' : 'transparent',
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

          {/* Resumen de exámenes */}
          {totalExamenes > 0 && (
            <Box sx={{ 
              mt: 2, 
              p: 1.5, 
              backgroundColor: '#e8f5e8', 
              borderRadius: 1,
              border: '1px solid #c8e6c9'
            }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#2e7d32', mb: 1 }}>
                📊 EXÁMENES REALIZADOS ({totalExamenes}):
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                {examenes.map(examen => {
                  const valor = data[examen.key as keyof ExamenesLaboratorioData];
                  if (!valor.trim()) return null;
                  
                  const status = getValueStatus(valor, examen.normalRange);
                  return (
                    <Chip
                      key={examen.key}
                      label={`${examen.icon} ${examen.label.replace('• ', '')}: ${valor} ${examen.unit}`}
                      size="small"
                      sx={{ 
                        backgroundColor: getStatusColor(status),
                        color: 'white',
                        fontSize: '0.75rem',
                        fontWeight: 'bold'
                      }}
                    />
                  );
                })}
                {tieneOtros && (
                  <Chip
                    label={`📝 ${data.otro}`}
                    size="small"
                    sx={{ 
                      backgroundColor: '#4caf50',
                      color: 'white',
                      fontSize: '0.75rem',
                      fontWeight: 'bold'
                    }}
                  />
                )}
              </Box>

              {/* Leyenda de colores */}
              <Box sx={{ mt: 1.5, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Typography variant="caption" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
                  🟢 Normal
                </Typography>
                <Typography variant="caption" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                  🔵 Bajo
                </Typography>
                <Typography variant="caption" sx={{ color: '#d32f2f', fontWeight: 'bold' }}>
                  🔴 Alto
                </Typography>
              </Box>
            </Box>
          )}

          {/* Mensaje cuando no hay exámenes */}
          {totalExamenes === 0 && (
            <Box sx={{ 
              mt: 2, 
              p: 1.5, 
              backgroundColor: '#fff3e0', 
              borderRadius: 1,
              border: '1px solid #ffb74d',
              textAlign: 'center'
            }}>
              <Typography variant="body2" sx={{ color: '#e65100', fontStyle: 'italic' }}>
                📋 No se han registrado exámenes de laboratorio
              </Typography>
            </Box>
          )}
          
        </Paper>

       
      </CardContent>
    </Card>
  );
} 