import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Chip,
  Divider,
} from '@mui/material';
import {
  Vaccines as VacunasIcon,
  LocalHospital as HepatitisIcon,
  Shield as BCGIcon,
} from "@mui/icons-material";

interface VacunasData {
  hepatitisB: string;
  bcg: string;
}

export default function Vacunas() {
  const [vacunas, setVacunas] = useState<VacunasData>({
    hepatitisB: '',
    bcg: '',
  });

  const handleChange = (field: keyof VacunasData, value: string) => {
    setVacunas(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const vacunasList = [
    {
      key: 'hepatitisB' as keyof VacunasData,
      label: 'HEPATITIS B',
      icon: <HepatitisIcon sx={{ fontSize: '1rem' }} />,
      color: '#d32f2f',
      description: 'Primera dosis al nacimiento (0-24 horas)',
      via: 'Intramuscular - 0.5ml en muslo anterolateral'
    },
    {
      key: 'bcg' as keyof VacunasData,
      label: 'BCG',
      icon: <BCGIcon sx={{ fontSize: '1rem' }} />,
      color: '#1976d2',
      description: 'Bacilo Calmette-Guérin (Tuberculosis)',
      via: 'Intradérmica - 0.1ml en deltoides derecho'
    },
  ];

  // Contar vacunas aplicadas
  const vacunasAplicadas = Object.values(vacunas).filter(value => value === 'SI').length;
  const totalVacunas = Object.values(vacunas).filter(value => value !== '').length;

  return (
    <Box>
      {/* Sección H: VACUNAS */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 2 }}>
          <Typography
            variant="h6"
            sx={{
              mb: 1.5,
              fontWeight: "bold",
              color: "#1A3C6D",
              fontSize: "1rem",
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <VacunasIcon sx={{ fontSize: '1.2rem' }} />
            H. VACUNAS
          </Typography>

          {/* Box de vacunas */}
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 2,
            justifyContent: 'space-between'
          }}>
            {vacunasList.map((vacuna, index) => (
              <Box 
                key={vacuna.key} 
                sx={{ 
                  flex: { xs: '1 1 100%', md: '1 1 48%' }
                }}
              >
                <Card 
                  variant="outlined" 
                  sx={{ 
                    height: '100%',
                    backgroundColor: vacunas[vacuna.key] === 'SI' ? `${vacuna.color}15` : '#f8f9fa',
                    borderColor: vacunas[vacuna.key] === 'SI' ? vacuna.color : '#e0e0e0',
                    borderWidth: vacunas[vacuna.key] === 'SI' ? 2 : 1,
                  }}
                >
                  <CardContent sx={{ p: 2 }}>
                    <FormControl component="fieldset" fullWidth>
                      <FormLabel 
                        component="legend" 
                        sx={{ 
                          fontSize: "0.85rem", 
                          fontWeight: "bold", 
                          color: vacuna.color,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                          mb: 1
                        }}
                      >
                        {vacuna.icon}
                        {vacuna.label}:
                      </FormLabel>
                      
                      <RadioGroup
                        row
                        value={vacunas[vacuna.key]}
                        onChange={(e) => handleChange(vacuna.key, e.target.value)}
                        sx={{ 
                          justifyContent: 'center',
                          gap: 2,
                          mb: 1
                        }}
                      >
                        <FormControlLabel
                          value="SI"
                          control={<Radio size="small" sx={{ color: vacuna.color }} />}
                          label={
                            <Chip 
                              label="SÍ" 
                              size="small" 
                              variant={vacunas[vacuna.key] === 'SI' ? 'filled' : 'outlined'}
                              sx={{
                                fontSize: '0.7rem',
                                fontWeight: 'bold',
                                backgroundColor: vacunas[vacuna.key] === 'SI' ? vacuna.color : 'transparent',
                                color: vacunas[vacuna.key] === 'SI' ? 'white' : vacuna.color,
                                borderColor: vacuna.color,
                                minWidth: '40px'
                              }}
                            />
                          }
                        />
                        <FormControlLabel
                          value="NO"
                          control={<Radio size="small" sx={{ color: '#666' }} />}
                          label={
                            <Chip 
                              label="NO" 
                              size="small" 
                              variant={vacunas[vacuna.key] === 'NO' ? 'filled' : 'outlined'}
                              sx={{
                                fontSize: '0.7rem',
                                fontWeight: 'bold',
                                backgroundColor: vacunas[vacuna.key] === 'NO' ? '#666' : 'transparent',
                                color: vacunas[vacuna.key] === 'NO' ? 'white' : '#666',
                                borderColor: '#666',
                                minWidth: '40px'
                              }}
                            />
                          }
                        />
                      </RadioGroup>

                      {/* Información de la vacuna */}
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography sx={{ 
                          fontSize: '0.7rem', 
                          color: '#666', 
                          fontWeight: 'bold',
                          mb: 0.5
                        }}>
                          {vacuna.description}
                        </Typography>
                        <Typography sx={{ 
                          fontSize: '0.65rem', 
                          color: '#999',
                          fontStyle: 'italic'
                        }}>
                          {vacuna.via}
                        </Typography>
                      </Box>
                    </FormControl>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>

         
        </CardContent>
      </Card>




    </Box>
  );
}