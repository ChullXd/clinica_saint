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
  Divider,
  Chip,
} from '@mui/material';
import {
  Person as PersonIcon,
  LocationOn as LocationIcon,
  MedicalServices as MedicalIcon,
  Assignment as ConsentIcon,
} from "@mui/icons-material";

interface EntradaData {
  // Confirmación del paciente
  identidad: string;
  sitioQuirurgico: string;
  procedimiento: string;
  consentimiento: string;
  
  // Demarcación del sitio quirúrgico
  demarcacionSitio: string;
  
  // Control instrumental anestésico
  equipoIntubacion: string;
  equipoAspiracion: string;
  sistemaVentilacion: string;
  oxigeno: string;
  farmacosInhalados: string;
  medicacion: string;
  
  // Monitoreo
  pulsoximetro: string;
  capnografo: string;
  
  // Alergias
  tieneAlergias: string;
  cualesAlergias: string;
  
  // Riesgos
  viaAereaRiesgo: string;
  riesgoHemorragia: string;
  
  // Hemoderivados
  reservaHemoderivados: string;
}

export default function Entrada() {
  const [entradaData, setEntradaData] = useState<EntradaData>({
    identidad: '',
    sitioQuirurgico: '',
    procedimiento: '',
    consentimiento: '',
    demarcacionSitio: '',
    equipoIntubacion: '',
    equipoAspiracion: '',
    sistemaVentilacion: '',
    oxigeno: '',
    farmacosInhalados: '',
    medicacion: '',
    pulsoximetro: '',
    capnografo: '',
    tieneAlergias: '',
    cualesAlergias: '',
    viaAereaRiesgo: '',
    riesgoHemorragia: '',
    reservaHemoderivados: '',
  });

  const handleChange = (field: keyof EntradaData, value: string) => {
    setEntradaData(prev => ({
      ...prev,
      [field]: field === 'cualesAlergias' ? value.toUpperCase() : value,
    }));
  };

  const renderSiNoRadio = (field: keyof EntradaData, label: string, icon?: React.ReactNode) => (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
        {icon}
        <Typography sx={{ fontSize: '0.85rem', fontWeight: 'bold' }}>
          {label}
        </Typography>
      </Box>
      <FormControl>
        <RadioGroup
          row
          value={entradaData[field]}
          onChange={(e) => handleChange(field, e.target.value)}
          sx={{ gap: 2 }}
        >
          <FormControlLabel
            value="SI"
            control={<Radio size="small" />}
            label={
              <Chip 
                label="SÍ" 
                size="small" 
                variant={entradaData[field] === 'SI' ? 'filled' : 'outlined'}
                sx={{ fontSize: '0.7rem', fontWeight: 'bold' }}
              />
            }
          />
          <FormControlLabel
            value="NO"
            control={<Radio size="small" />}
            label={
              <Chip 
                label="NO" 
                size="small" 
                variant={entradaData[field] === 'NO' ? 'filled' : 'outlined'}
                sx={{ fontSize: '0.7rem', fontWeight: 'bold' }}
              />
            }
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );

  const renderSiNoNoProcede = (field: keyof EntradaData, label: string) => (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
      <Typography sx={{ fontSize: '0.85rem', fontWeight: 'bold', flex: 1 }}>
        {label}
      </Typography>
      <FormControl>
        <RadioGroup
          row
          value={entradaData[field]}
          onChange={(e) => handleChange(field, e.target.value)}
          sx={{ gap: 1 }}
        >
          <FormControlLabel
            value="SI"
            control={<Radio size="small" />}
            label={
              <Chip 
                label="SÍ" 
                size="small" 
                variant={entradaData[field] === 'SI' ? 'filled' : 'outlined'}
                sx={{ fontSize: '0.7rem', fontWeight: 'bold' }}
              />
            }
          />
          <FormControlLabel
            value="NO"
            control={<Radio size="small" />}
            label={
              <Chip 
                label="NO" 
                size="small" 
                variant={entradaData[field] === 'NO' ? 'filled' : 'outlined'}
                sx={{ fontSize: '0.7rem', fontWeight: 'bold' }}
              />
            }
          />
          <FormControlLabel
            value="NO_PROCEDE"
            control={<Radio size="small" />}
            label={
              <Chip 
                label="NO PROCEDE" 
                size="small" 
                variant={entradaData[field] === 'NO_PROCEDE' ? 'filled' : 'outlined'}
                sx={{ fontSize: '0.65rem', fontWeight: 'bold' }}
              />
            }
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );

  return (
    <Box sx={{ p: 2 }}>
      <Card sx={{ boxShadow: 2 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography
            variant="h6"
            sx={{ 
              mb: 3, 
              fontWeight: "bold", 
              color: "#1A3C6D", 
              fontSize: "1rem"
            }}
          >
            C. ENTRADA (ANTES DE LA INDUCCIÓN DE LA ANESTESIA)
          </Typography>

          {/* EL PACIENTE HA CONFIRMADO */}
          <Card variant="outlined" sx={{ mb: 3, backgroundColor: '#f8f9fa' }}>
            <CardContent sx={{ p: 2 }}>
              <Typography
                variant="subtitle1"
                sx={{ 
                  mb: 2, 
                  fontWeight: "bold", 
                  color: "#1A3C6D", 
                  fontSize: "0.9rem"
                }}
              >
                EL PACIENTE HA CONFIRMADO:
              </Typography>

              {renderSiNoRadio('identidad', '• SU IDENTIDAD', <PersonIcon sx={{ fontSize: '1rem', color: '#1A3C6D' }} />)}
              {renderSiNoRadio('sitioQuirurgico', '• SITIO QUIRÚRGICO', <LocationIcon sx={{ fontSize: '1rem', color: '#1A3C6D' }} />)}
              {renderSiNoRadio('procedimiento', '• EL PROCEDIMIENTO', <MedicalIcon sx={{ fontSize: '1rem', color: '#1A3C6D' }} />)}
              {renderSiNoRadio('consentimiento', '• SU CONSENTIMIENTO VERBAL Y ESCRITO', <ConsentIcon sx={{ fontSize: '1rem', color: '#1A3C6D' }} />)}
            </CardContent>
          </Card>

          {/* DEMARCACIÓN DEL SITIO QUIRÚRGICO */}
          <Card variant="outlined" sx={{ mb: 3, backgroundColor: '#fff3e0' }}>
            <CardContent sx={{ p: 2 }}>
              <Typography
                variant="subtitle1"
                sx={{ 
                  mb: 2, 
                  fontWeight: "bold", 
                  color: "#f57c00", 
                  fontSize: "0.9rem"
                }}
              >
                DEMARCACIÓN DEL SITIO QUIRÚRGICO:
              </Typography>

              {renderSiNoNoProcede('demarcacionSitio', 'DEMARCACIÓN REALIZADA')}
            </CardContent>
          </Card>

          {/* CONTROL FORMAL DEL INSTRUMENTAL ANESTÉSICO */}
          <Card variant="outlined" sx={{ mb: 3, backgroundColor: '#e8f5e8' }}>
            <CardContent sx={{ p: 2 }}>
              <Typography
                variant="subtitle1"
                sx={{ 
                  mb: 2, 
                  fontWeight: "bold", 
                  color: "#2e7d32", 
                  fontSize: "0.9rem"
                }}
              >
                SE HA COMPLETADO EL CONTROL FORMAL DEL INSTRUMENTAL ANESTÉSICO, MEDICACIÓN Y RIESGO ANESTÉSICO:
              </Typography>

              {renderSiNoRadio('equipoIntubacion', '• EQUIPO DE INTUBACIÓN')}
              {renderSiNoRadio('equipoAspiracion', '• EQUIPO DE ASPIRACIÓN DE LA VÍA AÉREA')}
              
              <Typography sx={{ fontSize: '0.85rem', fontWeight: 'bold', mt: 2, mb: 1, color: '#2e7d32' }}>
                SISTEMA DE VENTILACIÓN:
              </Typography>
              <Box sx={{ ml: 2 }}>
                {renderSiNoRadio('oxigeno', '• OXÍGENO')}
                {renderSiNoRadio('farmacosInhalados', '• FÁRMACOS INHALADOS')}
                {renderSiNoRadio('medicacion', '• MEDICACIÓN')}
              </Box>
            </CardContent>
          </Card>

          {/* MONITOREO */}
          <Card variant="outlined" sx={{ mb: 3, backgroundColor: '#e3f2fd' }}>
            <CardContent sx={{ p: 2 }}>
              <Typography
                variant="subtitle1"
                sx={{ 
                  mb: 2, 
                  fontWeight: "bold", 
                  color: "#1976d2", 
                  fontSize: "0.9rem"
                }}
              >
                MONITOREO:
              </Typography>

              {renderSiNoRadio('pulsoximetro', '• PULSOXÍMETRO COLOCADO EN EL PACIENTE Y FUNCIONANDO')}
              {renderSiNoNoProcede('capnografo', '• CAPNÓGRAFO COLOCADO Y FUNCIONANDO')}
            </CardContent>
          </Card>

          {/* ALERGIAS */}
          <Card variant="outlined" sx={{ mb: 3, backgroundColor: '#fce4ec' }}>
            <CardContent sx={{ p: 2 }}>
              <Typography
                variant="subtitle1"
                sx={{ 
                  mb: 2, 
                  fontWeight: "bold", 
                  color: "#c2185b", 
                  fontSize: "0.9rem"
                }}
              >
                ALERGIAS:
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography sx={{ fontSize: '0.85rem', fontWeight: 'bold', flex: 1 }}>
                  • TIENE EL PACIENTE ALERGIAS CONOCIDAS:
                </Typography>
                <FormControl>
                  <RadioGroup
                    row
                    value={entradaData.tieneAlergias}
                    onChange={(e) => handleChange('tieneAlergias', e.target.value)}
                    sx={{ gap: 2 }}
                  >
                    <FormControlLabel
                      value="SI"
                      control={<Radio size="small" />}
                      label={
                        <Chip 
                          label="SÍ" 
                          size="small" 
                          variant={entradaData.tieneAlergias === 'SI' ? 'filled' : 'outlined'}
                          sx={{ fontSize: '0.7rem', fontWeight: 'bold' }}
                        />
                      }
                    />
                    <FormControlLabel
                      value="NO"
                      control={<Radio size="small" />}
                      label={
                        <Chip 
                          label="NO" 
                          size="small" 
                          variant={entradaData.tieneAlergias === 'NO' ? 'filled' : 'outlined'}
                          sx={{ fontSize: '0.7rem', fontWeight: 'bold' }}
                        />
                      }
                    />
                  </RadioGroup>
                </FormControl>
              </Box>

              {entradaData.tieneAlergias === 'SI' && (
                <TextField
                  label="¿CUÁLES ALERGIAS?"
                  value={entradaData.cualesAlergias}
                  onChange={(e) => handleChange('cualesAlergias', e.target.value)}
                  fullWidth
                  multiline
                  rows={2}
                  variant="outlined"
                  size="small"
                  placeholder="ESPECIFIQUE LAS ALERGIAS CONOCIDAS DEL PACIENTE..."
                  sx={{ 
                    '& .MuiInputBase-input': { 
                      fontSize: '0.8rem',
                      textTransform: 'uppercase'
                    },
                    '& .MuiInputLabel-root': { fontSize: '0.8rem', fontWeight: 'bold' }
                  }}
                />
              )}
            </CardContent>
          </Card>

          {/* RIESGOS */}
          <Card variant="outlined" sx={{ mb: 3, backgroundColor: '#fff8e1' }}>
            <CardContent sx={{ p: 2 }}>
              <Typography
                variant="subtitle1"
                sx={{ 
                  mb: 2, 
                  fontWeight: "bold", 
                  color: "#f57c00", 
                  fontSize: "0.9rem"
                }}
              >
                EVALUACIÓN DE RIESGOS:
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Typography sx={{ fontSize: '0.85rem', fontWeight: 'bold', mb: 1 }}>
                  VÍA AÉREA DIFÍCIL/RIESGO DE ASPIRACIÓN:
                </Typography>
                <FormControl fullWidth>
                  <RadioGroup
                    value={entradaData.viaAereaRiesgo}
                    onChange={(e) => handleChange('viaAereaRiesgo', e.target.value)}
                    sx={{ gap: 1 }}
                  >
                    <FormControlLabel
                      value="SI_DISPONIBLE"
                      control={<Radio size="small" />}
                      label={
                        <Typography sx={{ fontSize: '0.8rem' }}>
                          SÍ, Y HAY INSTRUMENTAL Y EQUIPOS DISPONIBLES
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      value="NO"
                      control={<Radio size="small" />}
                      label={<Typography sx={{ fontSize: '0.8rem' }}>NO</Typography>}
                    />
                  </RadioGroup>
                </FormControl>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ mb: 2 }}>
                <Typography sx={{ fontSize: '0.85rem', fontWeight: 'bold', mb: 1 }}>
                  RIESGO DE HEMORRAGIA 500ML (7ML/KG EN NIÑOS):
                </Typography>
                <FormControl fullWidth>
                  <RadioGroup
                    value={entradaData.riesgoHemorragia}
                    onChange={(e) => handleChange('riesgoHemorragia', e.target.value)}
                    sx={{ gap: 1 }}
                  >
                    <FormControlLabel
                      value="SI_PREVISTO"
                      control={<Radio size="small" />}
                      label={
                        <Typography sx={{ fontSize: '0.8rem' }}>
                          SÍ, Y SE HA PREVISTO LA DISPONIBILIDAD DE ACCESO INTRAVENOSO Y LÍQUIDOS ADECUADOS
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      value="NO"
                      control={<Radio size="small" />}
                      label={<Typography sx={{ fontSize: '0.8rem' }}>NO</Typography>}
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
            </CardContent>
          </Card>

          {/* HEMODERIVADOS */}
          <Card variant="outlined" sx={{ mb: 3, backgroundColor: '#f3e5f5' }}>
            <CardContent sx={{ p: 2 }}>
              <Typography
                variant="subtitle1"
                sx={{ 
                  mb: 2, 
                  fontWeight: "bold", 
                  color: "#7b1fa2", 
                  fontSize: "0.9rem"
                }}
              >
                HEMODERIVADOS:
              </Typography>

              {renderSiNoNoProcede('reservaHemoderivados', 'SE HA CONFIRMADO LA RESERVA DE HEMODERIVADOS CON EL LABORATORIO')}
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </Box>
  );
}