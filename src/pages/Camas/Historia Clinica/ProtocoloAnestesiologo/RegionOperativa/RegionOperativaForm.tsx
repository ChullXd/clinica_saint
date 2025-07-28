import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  FormControl,
  FormControlLabel,
  Checkbox,
  Grid,
  Paper,
} from '@mui/material';

interface RegionOperatoriaData {
  cabeza: boolean;
  organos: boolean;
  cuello: boolean;
  columna: boolean;
  torax: boolean;
  abdomen: boolean;
  pelvis: boolean;
  extremidadesSuperiores: boolean;
  extremidadesInferiores: boolean;
  perineal: boolean;
}

export default function RegionOperativaForm() {
  const [regionData, setRegionData] = useState<RegionOperatoriaData>({
    cabeza: false,
    organos: false,
    cuello: false,
    columna: false,
    torax: false,
    abdomen: false,
    pelvis: false,
    extremidadesSuperiores: false,
    extremidadesInferiores: false,
    perineal: false,
  });

  const handleCheckboxChange = (field: keyof RegionOperatoriaData) => {
    setRegionData(prev => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const regionOptions = [
    { key: 'cabeza', label: 'CABEZA' },
    { key: 'organos', label: 'ÓRGANOS' },
    { key: 'cuello', label: 'CUELLO' },
    { key: 'columna', label: 'COLUMNA' },
    { key: 'torax', label: 'TÓRAX' },
    { key: 'abdomen', label: 'ABDOMEN' },
    { key: 'pelvis', label: 'PELVIS' },
    { key: 'extremidadesSuperiores', label: 'EXTREMIDADES SUPERIORES' },
    { key: 'extremidadesInferiores', label: 'EXTREMIDADES INFERIORES' },
    { key: 'perineal', label: 'PERINEAL' },
  ];

  return (
    <Card sx={{ mb: 3, boxShadow: 3 }}>
      <CardContent sx={{ p: 3 }}>
        <Typography
          variant="h6"
          sx={{ 
            mb: 3, 
            fontWeight: "bold", 
            color: "#1A3C6D",
            borderBottom: '2px solid #1A3C6D',
            pb: 1
          }}
        >
          C. REGIÓN OPERATORIA
        </Typography>

        <Typography
          variant="body2"
          sx={{ 
            mb: 2, 
            color: "#666",
            fontStyle: 'italic'
          }}
        >
          (Campo de selección, para marcar X una opción)
        </Typography>

        <Paper 
          elevation={1} 
          sx={{ 
            p: 2, 
            backgroundColor: '#f8f9fa',
            border: '1px solid #e0e0e0'
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 2,
            justifyContent: 'flex-start'
          }}>
            {regionOptions.map((option) => (
              <Box 
                key={option.key}
                sx={{ 
                  minWidth: '250px',
                  flex: '1 1 calc(33.333% - 16px)',
                  '@media (max-width: 900px)': {
                    flex: '1 1 calc(50% - 16px)',
                  },
                  '@media (max-width: 600px)': {
                    flex: '1 1 100%',
                  },
                }}
              >
                <FormControl fullWidth>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={regionData[option.key as keyof RegionOperatoriaData]}
                        onChange={() => handleCheckboxChange(option.key as keyof RegionOperatoriaData)}
                        sx={{
                          color: '#1A3C6D',
                          '&.Mui-checked': {
                            color: '#1A3C6D',
                          },
                          '& .MuiSvgIcon-root': {
                            fontSize: 20,
                          },
                        }}
                      />
                    }
                    label={
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontWeight: 'medium',
                          color: regionData[option.key as keyof RegionOperatoriaData] ? '#1A3C6D' : '#333'
                        }}
                      >
                        {option.label}
                      </Typography>
                    }
                    sx={{
                      margin: 0,
                      width: '100%',
                      '& .MuiFormControlLabel-label': {
                        fontSize: '0.9rem',
                      },
                    }}
                  />
                </FormControl>
              </Box>
            ))}
          </Box>
        </Paper>

        {/* Mostrar selecciones activas */}
        {Object.values(regionData).some(value => value) && (
          <Box sx={{ mt: 3 }}>
            <Typography 
              variant="subtitle2" 
              sx={{ 
                fontWeight: 'bold', 
                color: '#1A3C6D',
                mb: 1
              }}
            >
              REGIONES SELECCIONADAS:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {regionOptions
                .filter(option => regionData[option.key as keyof RegionOperatoriaData])
                .map(option => (
                  <Paper
                    key={option.key}
                    elevation={1}
                    sx={{
                      px: 2,
                      py: 0.5,
                      backgroundColor: '#1A3C6D',
                      color: 'white',
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="caption" sx={{ fontWeight: 'medium' }}>
                      {option.label}
                    </Typography>
                  </Paper>
                ))
              }
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
