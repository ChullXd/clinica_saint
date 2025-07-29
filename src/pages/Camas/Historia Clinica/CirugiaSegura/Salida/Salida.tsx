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
  Inventory as InventoryIcon,
  MedicalServices as MedicalIcon,
  Science as ScienceIcon,
  Assignment as AssignmentIcon,
  Build as BuildIcon,
  Group as GroupIcon,
} from "@mui/icons-material";

interface SalidaData {
  // Recuento final
  recuentoFinal: string;
  
  // Empaquetado del paciente
  necesidadEmpaquetar: string;
  numeroCompresas: string;
  
  // Procedimiento realizado
  nombreProcedimiento: string;
  
  // Clasificación de herida
  clasificacionHerida: string;
  
  // Toma de muestras
  tomaMuestras: string;
  etiquetadoMuestras: string;
  
  // Tipos de muestras
  citoquimicoSi: boolean;
  citoquimicoNo: string;
  citoquimicoNombre: string;
  
  cultivosSi: boolean;
  cultivosNo: string;
  cultivosNombre: string;
  
  anatomopatologicoSi: boolean;
  anatomopatologicoNo: string;
  anatomopatologicoNombre: string;
  
  otrosMuestras: string;
  
  // Problemas instrumental
  problemasInstrumental: string;
  cualesProblemas: string;
  
  // Revisión aspectos recuperación
  revisionRecuperacion: string;
}

export default function Salida() {
  const [salidaData, setSalidaData] = useState<SalidaData>({
    recuentoFinal: '',
    necesidadEmpaquetar: '',
    numeroCompresas: '',
    nombreProcedimiento: '',
    clasificacionHerida: '',
    tomaMuestras: '',
    etiquetadoMuestras: '',
    citoquimicoSi: false,
    citoquimicoNo: '',
    citoquimicoNombre: '',
    cultivosSi: false,
    cultivosNo: '',
    cultivosNombre: '',
    anatomopatologicoSi: false,
    anatomopatologicoNo: '',
    anatomopatologicoNombre: '',
    otrosMuestras: '',
    problemasInstrumental: '',
    cualesProblemas: '',
    revisionRecuperacion: '',
  });

  const handleChange = (field: keyof SalidaData, value: string | boolean) => {
    setSalidaData(prev => ({
      ...prev,
      [field]: typeof value === 'string' && 
               (field === 'nombreProcedimiento' || field === 'cualesProblemas' || field === 'otrosMuestras' || 
                field === 'citoquimicoNombre' || field === 'cultivosNombre' || field === 'anatomopatologicoNombre') 
               ? value.toUpperCase() : value,
    }));
  };

  const renderSiNoRadio = (field: keyof SalidaData, label: string, icon?: React.ReactNode) => (
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
          value={salidaData[field] as string}
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
                variant={salidaData[field] === 'SI' ? 'filled' : 'outlined'}
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
                variant={salidaData[field] === 'NO' ? 'filled' : 'outlined'}
                sx={{ fontSize: '0.7rem', fontWeight: 'bold' }}
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
            E. SALIDA (ANTES DE QUE EL PACIENTE SALGA DEL QUIRÓFANO)
          </Typography>

          {/* CONFIRMACIÓN CON EQUIPO QUIRÚRGICO */}
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
                EL RESPONSABLE DE LA LISTA DE CHEQUEO CONFIRMA VERBALMENTE CON EL EQUIPO QUIRÚRGICO:
              </Typography>

              {renderSiNoRadio(
                'recuentoFinal', 
                'EL RECUENTO FINAL DE MATERIAL BLANCO O INSTRUMENTAL QUIRÚRGICO (PREVIO AL CIERRE) ESTÁ COMPLETO', 
                <InventoryIcon sx={{ fontSize: '1rem', color: '#1A3C6D' }} />
              )}
            </CardContent>
          </Card>

          {/* EMPAQUETADO DEL PACIENTE */}
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
                EMPAQUETADO DEL PACIENTE:
              </Typography>

              {renderSiNoRadio(
                'necesidadEmpaquetar', 
                'HUBO NECESIDAD DE EMPAQUETAR AL PACIENTE', 
                <MedicalIcon sx={{ fontSize: '1rem', color: '#1976d2' }} />
              )}

              {salidaData.necesidadEmpaquetar === 'SI' && (
                <Box sx={{ mt: 2, ml: 3 }}>
                  <TextField
                    label="NÚMERO DE COMPRESAS"
                    type="number"
                    value={salidaData.numeroCompresas}
                    onChange={(e) => handleChange('numeroCompresas', e.target.value)}
                    size="small"
                    variant="outlined"
                    sx={{ 
                      width: '200px',
                      '& .MuiInputBase-input': { fontSize: '0.8rem' },
                      '& .MuiInputLabel-root': { fontSize: '0.8rem', fontWeight: 'bold' }
                    }}
                    inputProps={{ min: 0 }}
                  />
                </Box>
              )}
            </CardContent>
          </Card>

          {/* PROCEDIMIENTO REALIZADO */}
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
                PROCEDIMIENTO REALIZADO:
              </Typography>

              <TextField
                label="NOMBRE DEL PROCEDIMIENTO REALIZADO"
                value={salidaData.nombreProcedimiento}
                onChange={(e) => handleChange('nombreProcedimiento', e.target.value)}
                fullWidth
                multiline
                rows={2}
                variant="outlined"
                size="small"
                placeholder="DESCRIBA EL PROCEDIMIENTO QUIRÚRGICO REALIZADO..."
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '0.8rem',
                    textTransform: 'uppercase'
                  },
                  '& .MuiInputLabel-root': { fontSize: '0.8rem', fontWeight: 'bold' }
                }}
              />
            </CardContent>
          </Card>

          {/* CLASIFICACIÓN DE LA HERIDA */}
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
                CLASIFICACIÓN DE LA HERIDA:
              </Typography>

              <FormControl fullWidth>
                <RadioGroup
                  value={salidaData.clasificacionHerida}
                  onChange={(e) => handleChange('clasificacionHerida', e.target.value)}
                  sx={{ gap: 1 }}
                >
                  <FormControlLabel
                    value="LIMPIA"
                    control={<Radio size="small" />}
                    label={<Typography sx={{ fontSize: '0.8rem', fontWeight: 'bold' }}>LIMPIA</Typography>}
                  />
                  <FormControlLabel
                    value="LIMPIA_CONTAMINADA"
                    control={<Radio size="small" />}
                    label={<Typography sx={{ fontSize: '0.8rem', fontWeight: 'bold' }}>LIMPIA-CONTAMINADA</Typography>}
                  />
                  <FormControlLabel
                    value="CONTAMINADA"
                    control={<Radio size="small" />}
                    label={<Typography sx={{ fontSize: '0.8rem', fontWeight: 'bold' }}>CONTAMINADA</Typography>}
                  />
                  <FormControlLabel
                    value="SUCIA"
                    control={<Radio size="small" />}
                    label={<Typography sx={{ fontSize: '0.8rem', fontWeight: 'bold' }}>SUCIA</Typography>}
                  />
                </RadioGroup>
              </FormControl>
            </CardContent>
          </Card>

          {/* TOMA DE MUESTRAS */}
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
                TOMA DE MUESTRAS:
              </Typography>

              {renderSiNoRadio(
                'tomaMuestras', 
                'TOMA DE MUESTRAS', 
                <ScienceIcon sx={{ fontSize: '1rem', color: '#c2185b' }} />
              )}

              {salidaData.tomaMuestras === 'SI' && (
                <Box sx={{ mt: 2 }}>
                  {renderSiNoRadio(
                    'etiquetadoMuestras', 
                    'ETIQUETADO DE LAS MUESTRAS (NOMBRES Y APELLIDOS COMPLETOS DEL PACIENTE, HISTORIA CLÍNICA, FECHA)', 
                    <AssignmentIcon sx={{ fontSize: '1rem', color: '#c2185b' }} />
                  )}

                  <Divider sx={{ my: 2 }} />

                  <Typography
                    variant="subtitle2"
                    sx={{ 
                      mb: 2, 
                      fontWeight: "bold", 
                      color: "#c2185b", 
                      fontSize: "0.8rem"
                    }}
                  >
                    IDENTIFIQUE EL TIPO DE MUESTRA A ENVIAR:
                  </Typography>

                  {/* Citoquímico */}
                  <Box sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                    <FormControlLabel
                      control={
                        <Radio 
                          checked={salidaData.citoquimicoSi}
                          onChange={(e) => handleChange('citoquimicoSi', e.target.checked)}
                          size="small"
                        />
                      }
                      label={<Typography sx={{ fontSize: '0.8rem', fontWeight: 'bold' }}>CITOQUÍMICO</Typography>}
                    />
                    {salidaData.citoquimicoSi && (
                      <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                        <TextField
                          label="No."
                          value={salidaData.citoquimicoNo}
                          onChange={(e) => handleChange('citoquimicoNo', e.target.value)}
                          size="small"
                          sx={{ width: '100px', '& .MuiInputBase-input': { fontSize: '0.8rem' } }}
                        />
                        <TextField
                          label="NOMBRE"
                          value={salidaData.citoquimicoNombre}
                          onChange={(e) => handleChange('citoquimicoNombre', e.target.value)}
                          size="small"
                          sx={{ 
                            flex: 1,
                            '& .MuiInputBase-input': { 
                              fontSize: '0.8rem',
                              textTransform: 'uppercase'
                            }
                          }}
                        />
                      </Box>
                    )}
                  </Box>

                  {/* Cultivos */}
                  <Box sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                    <FormControlLabel
                      control={
                        <Radio 
                          checked={salidaData.cultivosSi}
                          onChange={(e) => handleChange('cultivosSi', e.target.checked)}
                          size="small"
                        />
                      }
                      label={<Typography sx={{ fontSize: '0.8rem', fontWeight: 'bold' }}>CULTIVOS</Typography>}
                    />
                    {salidaData.cultivosSi && (
                      <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                        <TextField
                          label="No."
                          value={salidaData.cultivosNo}
                          onChange={(e) => handleChange('cultivosNo', e.target.value)}
                          size="small"
                          sx={{ width: '100px', '& .MuiInputBase-input': { fontSize: '0.8rem' } }}
                        />
                        <TextField
                          label="NOMBRE"
                          value={salidaData.cultivosNombre}
                          onChange={(e) => handleChange('cultivosNombre', e.target.value)}
                          size="small"
                          sx={{ 
                            flex: 1,
                            '& .MuiInputBase-input': { 
                              fontSize: '0.8rem',
                              textTransform: 'uppercase'
                            }
                          }}
                        />
                      </Box>
                    )}
                  </Box>

                  {/* Anatomopatológico */}
                  <Box sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                    <FormControlLabel
                      control={
                        <Radio 
                          checked={salidaData.anatomopatologicoSi}
                          onChange={(e) => handleChange('anatomopatologicoSi', e.target.checked)}
                          size="small"
                        />
                      }
                      label={<Typography sx={{ fontSize: '0.8rem', fontWeight: 'bold' }}>ANATOMOPATOLÓGICO</Typography>}
                    />
                    {salidaData.anatomopatologicoSi && (
                      <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                        <TextField
                          label="No."
                          value={salidaData.anatomopatologicoNo}
                          onChange={(e) => handleChange('anatomopatologicoNo', e.target.value)}
                          size="small"
                          sx={{ width: '100px', '& .MuiInputBase-input': { fontSize: '0.8rem' } }}
                        />
                        <TextField
                          label="NOMBRE"
                          value={salidaData.anatomopatologicoNombre}
                          onChange={(e) => handleChange('anatomopatologicoNombre', e.target.value)}
                          size="small"
                          sx={{ 
                            flex: 1,
                            '& .MuiInputBase-input': { 
                              fontSize: '0.8rem',
                              textTransform: 'uppercase'
                            }
                          }}
                        />
                      </Box>
                    )}
                  </Box>

                  {/* Otros */}
                  <TextField
                    label="OTROS"
                    value={salidaData.otrosMuestras}
                    onChange={(e) => handleChange('otrosMuestras', e.target.value)}
                    fullWidth
                    size="small"
                    placeholder="ESPECIFIQUE OTROS TIPOS DE MUESTRAS..."
                    sx={{ 
                      '& .MuiInputBase-input': { 
                        fontSize: '0.8rem',
                        textTransform: 'uppercase'
                      },
                      '& .MuiInputLabel-root': { fontSize: '0.8rem', fontWeight: 'bold' }
                    }}
                  />
                </Box>
              )}
            </CardContent>
          </Card>

          {/* PROBLEMAS CON INSTRUMENTAL */}
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
                PROBLEMAS CON INSTRUMENTAL Y EQUIPOS:
              </Typography>

              {renderSiNoRadio(
                'problemasInstrumental', 
                'SI HAY PROBLEMAS QUE RESOLVER, RELACIONADOS CON EL INSTRUMENTAL Y LOS EQUIPOS', 
                <BuildIcon sx={{ fontSize: '1rem', color: '#f57c00' }} />
              )}

              {salidaData.problemasInstrumental === 'SI' && (
                <TextField
                  label="¿CUÁLES PROBLEMAS?"
                  value={salidaData.cualesProblemas}
                  onChange={(e) => handleChange('cualesProblemas', e.target.value)}
                  fullWidth
                  multiline
                  rows={2}
                  variant="outlined"
                  size="small"
                  placeholder="DESCRIBA LOS PROBLEMAS ENCONTRADOS..."
                  sx={{ 
                    mt: 2,
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

          {/* REVISIÓN DE RECUPERACIÓN */}
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
                REVISIÓN DE ASPECTOS DE RECUPERACIÓN:
              </Typography>

              {renderSiNoRadio(
                'revisionRecuperacion', 
                'EL CIRUJANO, EL ANESTESIÓLOGO Y EL PERSONAL DE ENFERMERÍA REVISAN LOS PRINCIPALES ASPECTOS DE LA RECUPERACIÓN DEL PACIENTE', 
                <GroupIcon sx={{ fontSize: '1rem', color: '#7b1fa2' }} />
              )}
            </CardContent>
          </Card>

          
        </CardContent>
      </Card>
    </Box>
  );
}