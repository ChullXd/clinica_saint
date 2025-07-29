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
  Divider,
  Chip,
} from '@mui/material';
import {
  Group as GroupIcon,
  Person as PersonIcon,
  LocationOn as LocationIcon,
  MedicalServices as MedicalIcon,
  Schedule as ScheduleIcon,
  LocalHospital as HospitalIcon,
} from "@mui/icons-material";

interface PausaQuirurgicaData {
  // Confirmación presentación del equipo
  equipoPresentado: string;
  
  // Confirmación con equipo quirúrgico
  identidadPaciente: string;
  sitioQuirurgico: string;
  procedimientoLateralidad: string;
  
  // Previsión de eventos críticos - Cirujano
  duracionProcedimiento: string;
  perdidaSangre: string;
  
  // Anestesiólogo
  problemaEspecifico: string;
  
  // Enfermería/Instrumentación
  esterilidad: string;
  recuentoMaterial: string;
  dudasInstrumental: string;
  
  // Profilaxis y diagnóstico
  profilaxisAntibiotica: string;
  imagenesDiagnosticas: string;
}

export default function PausaQuirurgica() {
  const [pausaData, setPausaData] = useState<PausaQuirurgicaData>({
    equipoPresentado: '',
    identidadPaciente: '',
    sitioQuirurgico: '',
    procedimientoLateralidad: '',
    duracionProcedimiento: '',
    perdidaSangre: '',
    problemaEspecifico: '',
    esterilidad: '',
    recuentoMaterial: '',
    dudasInstrumental: '',
    profilaxisAntibiotica: '',
    imagenesDiagnosticas: '',
  });

  const handleChange = (field: keyof PausaQuirurgicaData, value: string) => {
    setPausaData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const renderSiNoRadio = (field: keyof PausaQuirurgicaData, label: string, icon?: React.ReactNode) => (
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
          value={pausaData[field]}
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
                variant={pausaData[field] === 'SI' ? 'filled' : 'outlined'}
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
                variant={pausaData[field] === 'NO' ? 'filled' : 'outlined'}
                sx={{ fontSize: '0.7rem', fontWeight: 'bold' }}
              />
            }
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );

  const renderSiNoNoProcede = (field: keyof PausaQuirurgicaData, label: string) => (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
      <Typography sx={{ fontSize: '0.85rem', fontWeight: 'bold', flex: 1 }}>
        {label}
      </Typography>
      <FormControl>
        <RadioGroup
          row
          value={pausaData[field]}
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
                variant={pausaData[field] === 'SI' ? 'filled' : 'outlined'}
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
                variant={pausaData[field] === 'NO' ? 'filled' : 'outlined'}
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
                variant={pausaData[field] === 'NO_PROCEDE' ? 'filled' : 'outlined'}
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
            D. PAUSA QUIRÚRGICA (ANTES DE LA INCISIÓN CUTÁNEA)
          </Typography>

          {/* CONFIRMACIÓN PRESENTACIÓN DEL EQUIPO */}
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
                CONFIRMACIÓN DE PRESENTACIÓN DEL EQUIPO:
              </Typography>

              {renderSiNoRadio(
                'equipoPresentado', 
                'CONFIRMACIÓN QUE TODOS LOS MIEMBROS DEL EQUIPO SE HAN PRESENTADO POR SU NOMBRE Y FUNCIÓN', 
                <GroupIcon sx={{ fontSize: '1rem', color: '#1A3C6D' }} />
              )}
            </CardContent>
          </Card>

          {/* CONFIRMACIÓN CON EQUIPO QUIRÚRGICO */}
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
                RESPONSABLE DE LA LISTA DE CHEQUEO CONFIRMA VERBALMENTE CON EL EQUIPO QUIRÚRGICO:
              </Typography>

              {renderSiNoRadio('identidadPaciente', '• IDENTIDAD DEL PACIENTE', <PersonIcon sx={{ fontSize: '1rem', color: '#1976d2' }} />)}
              {renderSiNoRadio('sitioQuirurgico', '• SITIO QUIRÚRGICO', <LocationIcon sx={{ fontSize: '1rem', color: '#1976d2' }} />)}
              {renderSiNoRadio('procedimientoLateralidad', '• PROCEDIMIENTO (LATERALIDAD)', <MedicalIcon sx={{ fontSize: '1rem', color: '#1976d2' }} />)}
            </CardContent>
          </Card>

          {/* PREVISIÓN DE EVENTOS CRÍTICOS */}
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
                PREVISIÓN DE EVENTOS CRÍTICOS:
              </Typography>

              <Typography
                variant="subtitle2"
                sx={{ 
                  mb: 1.5, 
                  fontWeight: "bold", 
                  color: "#f57c00", 
                  fontSize: "0.8rem"
                }}
              >
                EL CIRUJANO EXPRESA:
              </Typography>

              {renderSiNoRadio('duracionProcedimiento', '• DURACIÓN DEL PROCEDIMIENTO', <ScheduleIcon sx={{ fontSize: '1rem', color: '#f57c00' }} />)}
              {renderSiNoRadio('perdidaSangre', '• PÉRDIDA PREVISTA DE SANGRE', <MedicalIcon sx={{ fontSize: '1rem', color: '#f57c00' }} />)}

              <Divider sx={{ my: 2 }} />

              <Typography
                variant="subtitle2"
                sx={{ 
                  mb: 1.5, 
                  fontWeight: "bold", 
                  color: "#f57c00", 
                  fontSize: "0.8rem"
                }}
              >
                EL ANESTESIÓLOGO:
              </Typography>

              {renderSiNoRadio('problemaEspecifico', '• EL ANESTESIÓLOGO EXPRESA ALGÚN PROBLEMA ESPECÍFICO', <HospitalIcon sx={{ fontSize: '1rem', color: '#f57c00' }} />)}
            </CardContent>
          </Card>

          {/* EQUIPO DE ENFERMERÍA E INSTRUMENTACIÓN */}
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
                EQUIPO DE ENFERMERÍA Y/O INSTRUMENTACIÓN QUIRÚRGICA REVISA:
              </Typography>

              {renderSiNoRadio(
                'esterilidad', 
                '• ESTERILIDAD (CON RESULTADO DE INDICADORES E INTEGRADOS QUÍMICOS INTERNOS Y EXTERNOS)'
              )}
              
              {renderSiNoRadio(
                'recuentoMaterial', 
                '• RECUENTO INICIAL DE MATERIAL BLANCO E INSTRUMENTAL QUIRÚRGICO'
              )}
              
              {renderSiNoRadio(
                'dudasInstrumental', 
                '• DUDAS O PROBLEMAS RELACIONADOS CON EL INSTRUMENTAL Y EQUIPOS'
              )}
            </CardContent>
          </Card>

          {/* PROFILAXIS Y DIAGNÓSTICO */}
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
                VERIFICACIONES ADICIONALES:
              </Typography>

              {renderSiNoNoProcede(
                'profilaxisAntibiotica', 
                'SE HA ADMINISTRADO PROFILAXIS ANTIBIÓTICA EN LOS ÚLTIMOS 60 MINUTOS'
              )}

              {renderSiNoNoProcede(
                'imagenesDiagnosticas', 
                'DISPONE DE IMÁGENES DIAGNÓSTICAS ESENCIALES PARA EL PROCEDIMIENTO QUIRÚRGICO'
              )}
            </CardContent>
          </Card>

          
        </CardContent>
      </Card>
    </Box>
  );
}