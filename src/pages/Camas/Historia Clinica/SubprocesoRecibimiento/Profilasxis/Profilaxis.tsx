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
  HealthAndSafety as ProfilaxisIcon,
  Medication as VitaminaIcon,
  Visibility as OcularIcon,
} from "@mui/icons-material";

interface ProfilaxisData {
  vitaminaK: string;
  ocular: string;
}

export default function Profilaxis() {
  const [profilaxis, setProfilaxis] = useState<ProfilaxisData>({
    vitaminaK: '',
    ocular: '',
  });

  const handleChange = (field: keyof ProfilaxisData, value: string) => {
    setProfilaxis(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const profilaxisList = [
    {
      key: 'vitaminaK' as keyof ProfilaxisData,
      label: 'VITAMINA K',
      icon: <VitaminaIcon sx={{ fontSize: '1rem' }} />,
      color: '#2e7d32',
      description: 'Prevención de enfermedad hemorrágica del recién nacido'
    },
    {
      key: 'ocular' as keyof ProfilaxisData,
      label: 'OCULAR',
      icon: <OcularIcon sx={{ fontSize: '1rem' }} />,
      color: '#1976d2',
      description: 'Prevención de oftalmía neonatal (Credé)'
    },
  ];

  // Contar profilaxis realizadas
  const profilaxisRealizadas = Object.values(profilaxis).filter(value => value === 'SI').length;
  const totalProfilaxis = Object.values(profilaxis).filter(value => value !== '').length;

  return (
    <Box>
      {/* Sección G: PROFILAXIS */}
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
            <ProfilaxisIcon sx={{ fontSize: '1.2rem' }} />
            G. PROFILAXIS
          </Typography>

          {/* Box de profilaxis */}
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 2,
            justifyContent: 'space-between'
          }}>
            {profilaxisList.map((item, index) => (
              <Box 
                key={item.key} 
                sx={{ 
                  flex: { xs: '1 1 100%', md: '1 1 48%' }
                }}
              >
                <Card 
                  variant="outlined" 
                  sx={{ 
                    height: '100%',
                    backgroundColor: profilaxis[item.key] === 'SI' ? `${item.color}15` : '#f8f9fa',
                    borderColor: profilaxis[item.key] === 'SI' ? item.color : '#e0e0e0',
                    borderWidth: profilaxis[item.key] === 'SI' ? 2 : 1,
                  }}
                >
                  <CardContent sx={{ p: 2 }}>
                    <FormControl component="fieldset" fullWidth>
                      <FormLabel 
                        component="legend" 
                        sx={{ 
                          fontSize: "0.85rem", 
                          fontWeight: "bold", 
                          color: item.color,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                          mb: 1
                        }}
                      >
                        {item.icon}
                        {item.label}:
                      </FormLabel>
                      
                      <RadioGroup
                        row
                        value={profilaxis[item.key]}
                        onChange={(e) => handleChange(item.key, e.target.value)}
                        sx={{ 
                          justifyContent: 'center',
                          gap: 2,
                          mb: 1
                        }}
                      >
                        <FormControlLabel
                          value="SI"
                          control={<Radio size="small" sx={{ color: item.color }} />}
                          label={
                            <Chip 
                              label="SÍ" 
                              size="small" 
                              variant={profilaxis[item.key] === 'SI' ? 'filled' : 'outlined'}
                              sx={{
                                fontSize: '0.7rem',
                                fontWeight: 'bold',
                                backgroundColor: profilaxis[item.key] === 'SI' ? item.color : 'transparent',
                                color: profilaxis[item.key] === 'SI' ? 'white' : item.color,
                                borderColor: item.color,
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
                              variant={profilaxis[item.key] === 'NO' ? 'filled' : 'outlined'}
                              sx={{
                                fontSize: '0.7rem',
                                fontWeight: 'bold',
                                backgroundColor: profilaxis[item.key] === 'NO' ? '#666' : 'transparent',
                                color: profilaxis[item.key] === 'NO' ? 'white' : '#666',
                                borderColor: '#666',
                                minWidth: '40px'
                              }}
                            />
                          }
                        />
                      </RadioGroup>

                      {/* Descripción */}
                      <Typography sx={{ 
                        fontSize: '0.7rem', 
                        color: '#666', 
                        textAlign: 'center',
                        fontStyle: 'italic'
                      }}>
                        {item.description}
                      </Typography>
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