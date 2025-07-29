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
  MedicalServices as IntervencionIcon,
  Healing as ReanimacionIcon,
  TouchApp as EstimulacionIcon,
  CleaningServices as AspiracionIcon,
  Masks as MascaraIcon,
  LocalHospital as BolsaIcon,
  AirlineSeatFlat as TuboIcon,
  Favorite as MasajeIcon,
  Medication as MedicacionIcon,
} from "@mui/icons-material";

interface IntervencionesData {
  reanimacion: string;
  estimulacion: string;
  aspiracion: string;
  mascara: string;
  bolsa: string;
  tuboEndotraqueal: string;
  masajeCardiaco: string;
  medicacion: string;
}

export default function Intervnciones() {
  const [intervenciones, setIntervenciones] = useState<IntervencionesData>({
    reanimacion: '',
    estimulacion: '',
    aspiracion: '',
    mascara: '',
    bolsa: '',
    tuboEndotraqueal: '',
    masajeCardiaco: '',
    medicacion: '',
  });

  const handleChange = (field: keyof IntervencionesData, value: string) => {
    setIntervenciones(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const intervencionesList = [
    {
      key: 'reanimacion' as keyof IntervencionesData,
      label: 'REANIMACIÓN',
      icon: <ReanimacionIcon sx={{ fontSize: '1rem' }} />,
      color: '#d32f2f'
    },
    {
      key: 'estimulacion' as keyof IntervencionesData,
      label: 'ESTIMULACIÓN',
      icon: <EstimulacionIcon sx={{ fontSize: '1rem' }} />,
      color: '#1976d2'
    },
    {
      key: 'aspiracion' as keyof IntervencionesData,
      label: 'ASPIRACIÓN',
      icon: <AspiracionIcon sx={{ fontSize: '1rem' }} />,
      color: '#2e7d32'
    },
    {
      key: 'mascara' as keyof IntervencionesData,
      label: 'MÁSCARA',
      icon: <MascaraIcon sx={{ fontSize: '1rem' }} />,
      color: '#f57c00'
    },
    {
      key: 'bolsa' as keyof IntervencionesData,
      label: 'BOLSA',
      icon: <BolsaIcon sx={{ fontSize: '1rem' }} />,
      color: '#7b1fa2'
    },
    {
      key: 'tuboEndotraqueal' as keyof IntervencionesData,
      label: 'TUBO ENDOTRAQUEAL',
      icon: <TuboIcon sx={{ fontSize: '1rem' }} />,
      color: '#5d4037'
    },
    {
      key: 'masajeCardiaco' as keyof IntervencionesData,
      label: 'MASAJE CARDÍACO',
      icon: <MasajeIcon sx={{ fontSize: '1rem' }} />,
      color: '#c2185b'
    },
    {
      key: 'medicacion' as keyof IntervencionesData,
      label: 'MEDICACIÓN',
      icon: <MedicacionIcon sx={{ fontSize: '1rem' }} />,
      color: '#00796b'
    },
  ];

  // Contar intervenciones realizadas
  const intervencionesRealizadas = Object.values(intervenciones).filter(value => value === 'SI').length;
  const totalIntervenciones = Object.values(intervenciones).filter(value => value !== '').length;

  return (
    <Box>
      {/* Sección F: INTERVENCIONES */}
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
            <IntervencionIcon sx={{ fontSize: '1.2rem' }} />
            F. INTERVENCIONES
          </Typography>

          {/* Box de intervenciones */}
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 2,
            justifyContent: 'space-between'
          }}>
            {intervencionesList.map((intervencion, index) => (
              <Box 
                key={intervencion.key} 
                sx={{ 
                  flex: { xs: '1 1 100%', sm: '1 1 48%', md: '1 1 22%' }
                }}
              >
                <Card 
                  variant="outlined" 
                  sx={{ 
                    height: '100%',
                    backgroundColor: intervenciones[intervencion.key] === 'SI' ? `${intervencion.color}15` : '#f8f9fa',
                    borderColor: intervenciones[intervencion.key] === 'SI' ? intervencion.color : '#e0e0e0',
                    borderWidth: intervenciones[intervencion.key] === 'SI' ? 2 : 1,
                  }}
                >
                  <CardContent sx={{ p: 1.5 }}>
                    <FormControl component="fieldset" fullWidth>
                      <FormLabel 
                        component="legend" 
                        sx={{ 
                          fontSize: "0.75rem", 
                          fontWeight: "bold", 
                          color: intervencion.color,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                          mb: 1
                        }}
                      >
                        {intervencion.icon}
                        {intervencion.label}:
                      </FormLabel>
                      
                      <RadioGroup
                        row
                        value={intervenciones[intervencion.key]}
                        onChange={(e) => handleChange(intervencion.key, e.target.value)}
                        sx={{ 
                          justifyContent: 'center',
                          gap: 1
                        }}
                      >
                        <FormControlLabel
                          value="SI"
                          control={<Radio size="small" sx={{ color: intervencion.color }} />}
                          label={
                            <Chip 
                              label="SÍ" 
                              size="small" 
                              variant={intervenciones[intervencion.key] === 'SI' ? 'filled' : 'outlined'}
                              sx={{
                                fontSize: '0.65rem',
                                fontWeight: 'bold',
                                backgroundColor: intervenciones[intervencion.key] === 'SI' ? intervencion.color : 'transparent',
                                color: intervenciones[intervencion.key] === 'SI' ? 'white' : intervencion.color,
                                borderColor: intervencion.color,
                                minWidth: '35px'
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
                              variant={intervenciones[intervencion.key] === 'NO' ? 'filled' : 'outlined'}
                              sx={{
                                fontSize: '0.65rem',
                                fontWeight: 'bold',
                                backgroundColor: intervenciones[intervencion.key] === 'NO' ? '#666' : 'transparent',
                                color: intervenciones[intervencion.key] === 'NO' ? 'white' : '#666',
                                borderColor: '#666',
                                minWidth: '35px'
                              }}
                            />
                          }
                        />
                      </RadioGroup>
                    </FormControl>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>

          {/* Resumen de intervenciones */}
          {totalIntervenciones > 0 && (
            <>
              <Divider sx={{ my: 2 }} />
              
              <Card variant="outlined" sx={{ backgroundColor: '#f0f8ff', borderColor: '#1976d2' }}>
                <CardContent sx={{ p: 2 }}>
                  <Typography sx={{ fontSize: "0.75rem", fontWeight: "bold", color: "#1565c0", mb: 1 }}>
                    📊 RESUMEN DE INTERVENCIONES:
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                    <Chip
                      label={`REALIZADAS: ${intervencionesRealizadas}`}
                      size="small"
                      color="success"
                      variant="filled"
                      sx={{ fontSize: '0.65rem', fontWeight: 'bold' }}
                    />
                    <Chip
                      label={`NO REALIZADAS: ${totalIntervenciones - intervencionesRealizadas}`}
                      size="small"
                      color="default"
                      variant="filled"
                      sx={{ fontSize: '0.65rem', fontWeight: 'bold' }}
                    />
                    <Chip
                      label={`EVALUADAS: ${totalIntervenciones}/8`}
                      size="small"
                      color="primary"
                      variant="filled"
                      sx={{ fontSize: '0.65rem', fontWeight: 'bold' }}
                    />
                  </Box>

                  {/* Lista de intervenciones realizadas */}
                  {intervencionesRealizadas > 0 && (
                    <Box>
                      <Typography sx={{ fontSize: "0.7rem", fontWeight: "bold", color: "#1565c0", mb: 0.5 }}>
                        INTERVENCIONES REALIZADAS:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {intervencionesList
                          .filter(int => intervenciones[int.key] === 'SI')
                          .map(int => (
                            <Chip
                              key={int.key}
                              label={int.label}
                              size="small"
                              sx={{
                                fontSize: '0.6rem',
                                fontWeight: 'bold',
                                backgroundColor: int.color,
                                color: 'white'
                              }}
                            />
                          ))}
                      </Box>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </CardContent>
      </Card>

      {/* Información de intervenciones */}
      <Card sx={{ mb: 3, backgroundColor: '#f8f9fa' }}>
        <CardContent sx={{ p: 1.5 }}>
          <Typography
            variant="caption"
            sx={{ 
              fontSize: '0.75rem', 
              color: '#1A3C6D', 
              fontWeight: 'bold',
              display: 'block',
              mb: 0.5
            }}
          >
            🏥 DESCRIPCIÓN DE INTERVENCIONES:
          </Typography>
          <Box component="ul" sx={{ fontSize: '0.7rem', color: '#666', mt: 0, pl: 2, mb: 0 }}>
            <li><strong>Reanimación:</strong> Maniobras de reanimación neonatal completa</li>
            <li><strong>Estimulación:</strong> Estimulación táctil para iniciar respiración</li>
            <li><strong>Aspiración:</strong> Aspiración de secreciones de vía aérea</li>
            <li><strong>Máscara:</strong> Ventilación con máscara facial</li>
            <li><strong>Bolsa:</strong> Ventilación con bolsa de reanimación</li>
            <li><strong>Tubo Endotraqueal:</strong> Intubación endotraqueal</li>
            <li><strong>Masaje Cardíaco:</strong> Compresiones torácicas</li>
            <li><strong>Medicación:</strong> Administración de medicamentos de reanimación</li>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}