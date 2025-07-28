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
  Chip,
} from '@mui/material';

interface IncidentesData {
  actividadElectricaSinPulso: boolean;
  hipertermiaMailgna: boolean;
  broncoespasmo: boolean;
  dificultadTecnica: boolean;
  arritmia: boolean;
  anafilaxia: boolean;
  despertarProlongado: boolean;
  asistolia: boolean;
  isquemiaMinocardica: boolean;
  emboliaAereaVenosa: boolean;
  bradicardiaInestable: boolean;
  hipoxemia: boolean;
  reaccionTransfusion: boolean;
  tromboemboliaPulmonar: boolean;
  neumotorax: boolean;
  laringoespasmo: boolean;
  otros: string;
}

export default function Incidentes() {
  const [data, setData] = useState<IncidentesData>({
    actividadElectricaSinPulso: false,
    hipertermiaMailgna: false,
    broncoespasmo: false,
    dificultadTecnica: false,
    arritmia: false,
    anafilaxia: false,
    despertarProlongado: false,
    asistolia: false,
    isquemiaMinocardica: false,
    emboliaAereaVenosa: false,
    bradicardiaInestable: false,
    hipoxemia: false,
    reaccionTransfusion: false,
    tromboemboliaPulmonar: false,
    neumotorax: false,
    laringoespasmo: false,
    otros: '',
  });

  const handleCheckboxChange = (field: keyof Omit<IncidentesData, 'otros'>, value: boolean) => {
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

  // Definir incidentes con categorías y severidad
  const incidentes = [
    // Cardiovasculares - Críticos
    { key: 'actividadElectricaSinPulso', label: '• Actividad eléctrica sin pulso', category: 'cardiovascular', severity: 'critico', color: '#d32f2f', icon: '💔' },
    { key: 'asistolia', label: '• Asistolia', category: 'cardiovascular', severity: 'critico', color: '#d32f2f', icon: '💔' },
    { key: 'isquemiaMinocardica', label: '• Isquemia Miocárdica', category: 'cardiovascular', severity: 'alto', color: '#f57c00', icon: '❤️' },
    { key: 'arritmia', label: '• Arritmia', category: 'cardiovascular', severity: 'moderado', color: '#ff9800', icon: '💓' },
    { key: 'bradicardiaInestable', label: '• Bradicardia inestable', category: 'cardiovascular', severity: 'alto', color: '#f57c00', icon: '🩺' },
    
    // Respiratorios
    { key: 'broncoespasmo', label: '• Broncoespasmo', category: 'respiratorio', severity: 'alto', color: '#1976d2', icon: '🫁' },
    { key: 'hipoxemia', label: '• Hipoxemia', category: 'respiratorio', severity: 'alto', color: '#1976d2', icon: '🫁' },
    { key: 'laringoespasmo', label: '• Laringoespasmo', category: 'respiratorio', severity: 'alto', color: '#1976d2', icon: '🫁' },
    { key: 'neumotorax', label: '• Neumotórax', category: 'respiratorio', severity: 'alto', color: '#1976d2', icon: '🫁' },
    
    // Alérgicos/Inmunológicos
    { key: 'anafilaxia', label: '• Anafilaxia', category: 'alergico', severity: 'critico', color: '#d32f2f', icon: '⚠️' },
    { key: 'hipertermiaMailgna', label: '• Hipertermia maligna', category: 'alergico', severity: 'critico', color: '#d32f2f', icon: '🌡️' },
    { key: 'reaccionTransfusion', label: '• Reacción a la transfusión', category: 'alergico', severity: 'alto', color: '#f57c00', icon: '🩸' },
    
    // Técnicos/Procedimentales
    { key: 'dificultadTecnica', label: '• Dificultad de la técnica', category: 'tecnico', severity: 'moderado', color: '#7b1fa2', icon: '🔧' },
    { key: 'despertarProlongado', label: '• Despertar Prolongado', category: 'tecnico', severity: 'moderado', color: '#7b1fa2', icon: '😴' },
    
    // Embólicos
    { key: 'emboliaAereaVenosa', label: '• Embolia Aérea Venosa', category: 'embolico', severity: 'critico', color: '#d32f2f', icon: '🫧' },
    { key: 'tromboemboliaPulmonar', label: '• Tromboembolia pulmonar', category: 'embolico', severity: 'critico', color: '#d32f2f', icon: '🫁' },
  ];

  // Contar incidentes por severidad
  const incidentesCriticos = incidentes.filter(inc => data[inc.key as keyof Omit<IncidentesData, 'otros'>] && inc.severity === 'critico').length;
  const incidentesAltos = incidentes.filter(inc => data[inc.key as keyof Omit<IncidentesData, 'otros'>] && inc.severity === 'alto').length;
  const incidentesModerados = incidentes.filter(inc => data[inc.key as keyof Omit<IncidentesData, 'otros'>] && inc.severity === 'moderado').length;
  const totalIncidentes = incidentesCriticos + incidentesAltos + incidentesModerados + (data.otros.trim() ? 1 : 0);

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
          N. INCIDENTES
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
          (Campo de selección para marcar con una X los incidentes ocurridos durante el procedimiento)
        </Typography>

        <Paper elevation={1} sx={{ p: 2, backgroundColor: '#f8f9fa' }}>
          {/* Alerta de severidad si hay incidentes críticos */}
          {incidentesCriticos > 0 && (
            <Box sx={{ 
              mb: 2, 
              p: 1.5, 
              backgroundColor: '#ffebee', 
              borderRadius: 1,
              border: '2px solid #d32f2f'
            }}>
              <Typography variant="subtitle2" sx={{ color: '#d32f2f', fontWeight: 'bold' }}>
                🚨 ALERTA CRÍTICA: {incidentesCriticos} incidente(s) de alta severidad detectado(s)
              </Typography>
            </Box>
          )}

          {/* Lista de incidentes organizados por categoría */}
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 2, mb: 2 }}>
            {incidentes.map(incidente => (
              <FormControlLabel
                key={incidente.key}
                control={
                  <Checkbox
                    checked={data[incidente.key as keyof Omit<IncidentesData, 'otros'>]}
                    onChange={(e) => handleCheckboxChange(incidente.key as keyof Omit<IncidentesData, 'otros'>, e.target.checked)}
                    sx={{ 
                      color: incidente.color,
                      '&.Mui-checked': { 
                        color: incidente.color 
                      },
                      '& .MuiSvgIcon-root': { 
                        fontSize: 18 
                      }
                    }}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Typography sx={{ fontSize: '1rem' }}>
                      {incidente.icon}
                    </Typography>
                    <Typography sx={{ 
                      fontSize: '0.85rem', 
                      fontWeight: 500,
                      color: data[incidente.key as keyof Omit<IncidentesData, 'otros'>] ? incidente.color : '#333'
                    }}>
                      {incidente.label}
                    </Typography>
                    {incidente.severity === 'critico' && (
                      <Chip 
                        label="CRÍTICO" 
                        size="small" 
                        sx={{ 
                          ml: 1, 
                          backgroundColor: '#d32f2f', 
                          color: 'white', 
                          fontSize: '0.65rem',
                          height: 18
                        }} 
                      />
                    )}
                  </Box>
                }
                sx={{ 
                  margin: 0,
                  padding: 0.8,
                  borderRadius: 1,
                  border: '1px solid transparent',
                  backgroundColor: data[incidente.key as keyof Omit<IncidentesData, 'otros'>] 
                    ? `${incidente.color}15` 
                    : 'transparent',
                  '&:hover': {
                    backgroundColor: `${incidente.color}10`,
                    border: `1px solid ${incidente.color}40`
                  }
                }}
              />
            ))}
          </Box>

          {/* Campo de texto para "Otros" */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography sx={{ fontSize: '1rem' }}>📝</Typography>
              • Otros
            </Typography>
            <TextField
              size="small"
              value={data.otros}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder="DESCRIBA OTROS INCIDENTES NO LISTADOS..."
              fullWidth
              multiline
              rows={3}
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

          {/* Resumen de incidentes */}
          {totalIncidentes > 0 && (
            <Box sx={{ 
              mt: 2, 
              p: 1.5, 
              backgroundColor: totalIncidentes > 3 ? '#ffebee' : '#e8f5e8', 
              borderRadius: 1,
              border: `1px solid ${totalIncidentes > 3 ? '#ffcdd2' : '#c8e6c9'}`
            }}>
              <Typography variant="subtitle2" sx={{ 
                fontWeight: 'bold', 
                color: totalIncidentes > 3 ? '#d32f2f' : '#2e7d32', 
                mb: 1 
              }}>
                📊 RESUMEN DE INCIDENTES ({totalIncidentes}):
              </Typography>
              
              {/* Estadísticas por severidad */}
              <Box sx={{ display: 'flex', gap: 2, mb: 1.5, flexWrap: 'wrap' }}>
                {incidentesCriticos > 0 && (
                  <Box sx={{ 
                    backgroundColor: '#d32f2f',
                    color: 'white',
                    px: 1,
                    py: 0.3,
                    borderRadius: 1,
                    fontSize: '0.75rem',
                    fontWeight: 'bold'
                  }}>
                    🚨 CRÍTICOS: {incidentesCriticos}
                  </Box>
                )}
                {incidentesAltos > 0 && (
                  <Box sx={{ 
                    backgroundColor: '#f57c00',
                    color: 'white',
                    px: 1,
                    py: 0.3,
                    borderRadius: 1,
                    fontSize: '0.75rem',
                    fontWeight: 'bold'
                  }}>
                    ⚠️ ALTOS: {incidentesAltos}
                  </Box>
                )}
                {incidentesModerados > 0 && (
                  <Box sx={{ 
                    backgroundColor: '#7b1fa2',
                    color: 'white',
                    px: 1,
                    py: 0.3,
                    borderRadius: 1,
                    fontSize: '0.75rem',
                    fontWeight: 'bold'
                  }}>
                    ℹ️ MODERADOS: {incidentesModerados}
                  </Box>
                )}
                {data.otros.trim() && (
                  <Box sx={{ 
                    backgroundColor: '#4caf50',
                    color: 'white',
                    px: 1,
                    py: 0.3,
                    borderRadius: 1,
                    fontSize: '0.75rem',
                    fontWeight: 'bold'
                  }}>
                    📝 OTROS: 1
                  </Box>
                )}
              </Box>

              {/* Lista de incidentes seleccionados */}
              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                {incidentes.map(incidente => {
                  const isSelected = data[incidente.key as keyof Omit<IncidentesData, 'otros'>];
                  if (!isSelected) return null;
                  
                  return (
                    <Chip
                      key={incidente.key}
                      label={`${incidente.icon} ${incidente.label.replace('• ', '')}`}
                      size="small"
                      sx={{ 
                        backgroundColor: incidente.color,
                        color: 'white',
                        fontSize: '0.75rem',
                        fontWeight: 'bold'
                      }}
                    />
                  );
                })}
                {data.otros.trim() && (
                  <Chip
                    label={`📝 ${data.otros}`}
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
            </Box>
          )}

          {/* Mensaje cuando no hay incidentes */}
          {totalIncidentes === 0 && (
            <Box sx={{ 
              mt: 2, 
              p: 1.5, 
              backgroundColor: '#e8f5e8', 
              borderRadius: 1,
              border: '1px solid #c8e6c9',
              textAlign: 'center'
            }}>
              <Typography variant="body2" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
                ✅ Sin incidentes reportados - Procedimiento sin complicaciones
              </Typography>
            </Box>
          )}
        </Paper>
      </CardContent>
    </Card>
  );
}