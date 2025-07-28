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
  Paper,
  Checkbox,
  Divider,
} from '@mui/material';

interface TecnicaAnestesicaData {
  // General
  sistema: 'abierto' | 'semicerrado' | 'cerrado' | '';
  aparato: 'circular' | 'unidireccional' | '';
  manejoViaAerea: 'mascaraFacial' | 'supraglotica' | 'traqueotomo' | '';
  intubacion: 'nasal' | 'oral' | 'submentonana' | 'visionDirecta' | 'aCiegas' | '';
  tipoTubo: 'convencional' | 'preformadoOral' | 'preformadoNasal' | 'reforzado' | 'dobleLumen' | '';
  diametro: string;
  balon: 'si' | 'no' | '';
  taponamiento: 'si' | 'no' | '';
  cormack: 'I' | 'II' | 'III' | 'IV' | '';
  numeroIntentos: string;
  induccion: 'inhalatoria' | 'intravenosa' | '';
  mantenimiento: 'inhalatoria' | 'intravenosa' | 'balanceada' | '';
  
  // Regional
  asepsiaCon: string;
  localAsistida: string;
  habonCon: string;
  intravenosa: string;
  
  // Troncular
  bloqueoNervio: string;
  intentosNervio: string;
  bloqueoPlexo: string;
  intentosPlexo: string;
  anestesicoLocal: string;
  tipoAguja: string;
  coadyuvante: string;
  equipo: string;
  
  // Neuroaxial
  raquidea: string;
  epidural: string;
  caudal: string;
  cateter: string;
  tipoAgujaNeuro: string;
  numeroAguja: string;
  intentosNeuro: string;
  borbotaje: 'si' | 'no' | '';
  acceso: 'medial' | 'lateral' | '';
  sitioPuncion: string;
  dermatoma: string;
  posicion: string;
  
  // Sedoanalgesia
  solucionSalina: boolean;
  tramadol: boolean;
  mlHora: string;
  escalaRamsay: '1' | '2' | '3' | '4' | '5' | '6' | '';
}

export default function TecnicaAnestesica() {
  const [data, setData] = useState<TecnicaAnestesicaData>({
    sistema: '',
    aparato: '',
    manejoViaAerea: '',
    intubacion: '',
    tipoTubo: '',
    diametro: '',
    balon: '',
    taponamiento: '',
    cormack: '',
    numeroIntentos: '',
    induccion: '',
    mantenimiento: '',
    asepsiaCon: '',
    localAsistida: '',
    habonCon: '',
    intravenosa: '',
    bloqueoNervio: '',
    intentosNervio: '',
    bloqueoPlexo: '',
    intentosPlexo: '',
    anestesicoLocal: '',
    tipoAguja: '',
    coadyuvante: '',
    equipo: '',
    raquidea: '',
    epidural: '',
    caudal: '',
    cateter: '',
    tipoAgujaNeuro: '',
    numeroAguja: '',
    intentosNeuro: '',
    borbotaje: '',
    acceso: '',
    sitioPuncion: '',
    dermatoma: '',
    posicion: '',
    solucionSalina: false,
    tramadol: false,
    mlHora: '',
    escalaRamsay: '',
  });

  const handleChange = (field: keyof TecnicaAnestesicaData, value: any) => {
    setData(prev => ({
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
          F. TÉCNICA ANESTÉSICA
        </Typography>

        <Paper elevation={1} sx={{ p: 2, backgroundColor: '#f8f9fa' }}>
          {/* GENERAL */}
          <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 'bold', color: '#1A3C6D', fontSize: '1rem' }}>
            GENERAL
          </Typography>

          {/* Sistema, Aparato, Manejo Vía Aérea - En una sola fila */}
          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 2 }}>
            <Box sx={{ minWidth: 200 }}>
              <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block', mb: 0.5 }}>
                • Sistema
              </Typography>
              <RadioGroup
                row
                value={data.sistema}
                onChange={(e) => handleChange('sistema', e.target.value)}
                sx={{ '& .MuiFormControlLabel-root': { mr: 1 } }}
              >
                <FormControlLabel 
                  value="abierto" 
                  control={<Radio sx={{ color: '#1A3C6D', '&.Mui-checked': { color: '#1A3C6D' }, '& .MuiSvgIcon-root': { fontSize: 16 } }} />} 
                  label={<Typography sx={{ fontSize: '0.8rem' }}>Abierto</Typography>}
                />
                <FormControlLabel 
                  value="semicerrado" 
                  control={<Radio sx={{ color: '#1A3C6D', '&.Mui-checked': { color: '#1A3C6D' }, '& .MuiSvgIcon-root': { fontSize: 16 } }} />} 
                  label={<Typography sx={{ fontSize: '0.8rem' }}>Semicerrado</Typography>}
                />
                <FormControlLabel 
                  value="cerrado" 
                  control={<Radio sx={{ color: '#1A3C6D', '&.Mui-checked': { color: '#1A3C6D' }, '& .MuiSvgIcon-root': { fontSize: 16 } }} />} 
                  label={<Typography sx={{ fontSize: '0.8rem' }}>Cerrado</Typography>}
                />
              </RadioGroup>
            </Box>

            <Box sx={{ minWidth: 200 }}>
              <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block', mb: 0.5 }}>
                • Aparato
              </Typography>
              <RadioGroup
                row
                value={data.aparato}
                onChange={(e) => handleChange('aparato', e.target.value)}
                sx={{ '& .MuiFormControlLabel-root': { mr: 1 } }}
              >
                <FormControlLabel 
                  value="circular" 
                  control={<Radio sx={{ color: '#1A3C6D', '&.Mui-checked': { color: '#1A3C6D' }, '& .MuiSvgIcon-root': { fontSize: 16 } }} />} 
                  label={<Typography sx={{ fontSize: '0.8rem' }}>Circular</Typography>}
                />
                <FormControlLabel 
                  value="unidireccional" 
                  control={<Radio sx={{ color: '#1A3C6D', '&.Mui-checked': { color: '#1A3C6D' }, '& .MuiSvgIcon-root': { fontSize: 16 } }} />} 
                  label={<Typography sx={{ fontSize: '0.8rem' }}>Unidireccional</Typography>}
                />
              </RadioGroup>
            </Box>

            <Box sx={{ minWidth: 250 }}>
              <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block', mb: 0.5 }}>
                • Manejo de Vía Aérea
              </Typography>
              <RadioGroup
                row
                value={data.manejoViaAerea}
                onChange={(e) => handleChange('manejoViaAerea', e.target.value)}
                sx={{ '& .MuiFormControlLabel-root': { mr: 1 } }}
              >
                <FormControlLabel 
                  value="mascaraFacial" 
                  control={<Radio sx={{ color: '#1A3C6D', '&.Mui-checked': { color: '#1A3C6D' }, '& .MuiSvgIcon-root': { fontSize: 16 } }} />} 
                  label={<Typography sx={{ fontSize: '0.8rem' }}>M. Facial</Typography>}
                />
                <FormControlLabel 
                  value="supraglotica" 
                  control={<Radio sx={{ color: '#1A3C6D', '&.Mui-checked': { color: '#1A3C6D' }, '& .MuiSvgIcon-root': { fontSize: 16 } }} />} 
                  label={<Typography sx={{ fontSize: '0.8rem' }}>Supraglótica</Typography>}
                />
                <FormControlLabel 
                  value="traqueotomo" 
                  control={<Radio sx={{ color: '#1A3C6D', '&.Mui-checked': { color: '#1A3C6D' }, '& .MuiSvgIcon-root': { fontSize: 16 } }} />} 
                  label={<Typography sx={{ fontSize: '0.8rem' }}>Traqueotomo</Typography>}
                />
              </RadioGroup>
            </Box>
          </Box>

          {/* Intubación */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block', mb: 0.5 }}>
              • Intubación
            </Typography>
            <RadioGroup
              row
              value={data.intubacion}
              onChange={(e) => handleChange('intubacion', e.target.value)}
              sx={{ '& .MuiFormControlLabel-root': { mr: 1 } }}
            >
              <FormControlLabel 
                value="nasal" 
                control={<Radio sx={{ color: '#1A3C6D', '&.Mui-checked': { color: '#1A3C6D' }, '& .MuiSvgIcon-root': { fontSize: 16 } }} />} 
                label={<Typography sx={{ fontSize: '0.8rem' }}>Nasal</Typography>}
              />
              <FormControlLabel 
                value="oral" 
                control={<Radio sx={{ color: '#1A3C6D', '&.Mui-checked': { color: '#1A3C6D' }, '& .MuiSvgIcon-root': { fontSize: 16 } }} />} 
                label={<Typography sx={{ fontSize: '0.8rem' }}>Oral</Typography>}
              />
              <FormControlLabel 
                value="submentonana" 
                control={<Radio sx={{ color: '#1A3C6D', '&.Mui-checked': { color: '#1A3C6D' }, '& .MuiSvgIcon-root': { fontSize: 16 } }} />} 
                label={<Typography sx={{ fontSize: '0.8rem' }}>Submentonana</Typography>}
              />
              <FormControlLabel 
                value="visionDirecta" 
                control={<Radio sx={{ color: '#1A3C6D', '&.Mui-checked': { color: '#1A3C6D' }, '& .MuiSvgIcon-root': { fontSize: 16 } }} />} 
                label={<Typography sx={{ fontSize: '0.8rem' }}>V. Directa</Typography>}
              />
              <FormControlLabel 
                value="aCiegas" 
                control={<Radio sx={{ color: '#1A3C6D', '&.Mui-checked': { color: '#1A3C6D' }, '& .MuiSvgIcon-root': { fontSize: 16 } }} />} 
                label={<Typography sx={{ fontSize: '0.8rem' }}>A Ciegas</Typography>}
              />
            </RadioGroup>
          </Box>

          {/* Tipo de Tubo y detalles */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block', mb: 0.5 }}>
              • Tipo de Tubo
            </Typography>
            <RadioGroup
              row
              value={data.tipoTubo}
              onChange={(e) => handleChange('tipoTubo', e.target.value)}
              sx={{ mb: 1, '& .MuiFormControlLabel-root': { mr: 1 } }}
            >
              <FormControlLabel 
                value="convencional" 
                control={<Radio sx={{ color: '#1A3C6D', '&.Mui-checked': { color: '#1A3C6D' }, '& .MuiSvgIcon-root': { fontSize: 16 } }} />} 
                label={<Typography sx={{ fontSize: '0.8rem' }}>Convencional</Typography>}
              />
              <FormControlLabel 
                value="preformadoOral" 
                control={<Radio sx={{ color: '#1A3C6D', '&.Mui-checked': { color: '#1A3C6D' }, '& .MuiSvgIcon-root': { fontSize: 16 } }} />} 
                label={<Typography sx={{ fontSize: '0.8rem' }}>P. Oral</Typography>}
              />
              <FormControlLabel 
                value="preformadoNasal" 
                control={<Radio sx={{ color: '#1A3C6D', '&.Mui-checked': { color: '#1A3C6D' }, '& .MuiSvgIcon-root': { fontSize: 16 } }} />} 
                label={<Typography sx={{ fontSize: '0.8rem' }}>P. Nasal</Typography>}
              />
              <FormControlLabel 
                value="reforzado" 
                control={<Radio sx={{ color: '#1A3C6D', '&.Mui-checked': { color: '#1A3C6D' }, '& .MuiSvgIcon-root': { fontSize: 16 } }} />} 
                label={<Typography sx={{ fontSize: '0.8rem' }}>Reforzado</Typography>}
              />
              <FormControlLabel 
                value="dobleLumen" 
                control={<Radio sx={{ color: '#1A3C6D', '&.Mui-checked': { color: '#1A3C6D' }, '& .MuiSvgIcon-root': { fontSize: 16 } }} />} 
                label={<Typography sx={{ fontSize: '0.8rem' }}>Doble Lumen</Typography>}
              />
            </RadioGroup>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
              <TextField
                label="Diámetro"
                size="small"
                value={data.diametro}
                onChange={(e) => handleChange('diametro', e.target.value.toUpperCase())}
                sx={{ 
                  width: 120,
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': { borderColor: '#1A3C6D' },
                    '&.Mui-focused fieldset': { borderColor: '#1A3C6D' },
                  },
                  '& .MuiInputLabel-root.Mui-focused': { color: '#1A3C6D' },
                  '& .MuiInputLabel-root': { fontSize: '0.85rem' },
                  '& input': { fontSize: '0.9rem' }
                }}
              />

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block' }}>Balón:</Typography>
                  <RadioGroup
                    row
                    value={data.balon}
                    onChange={(e) => handleChange('balon', e.target.value)}
                    sx={{ '& .MuiFormControlLabel-root': { mr: 0.5 } }}
                  >
                    <FormControlLabel 
                      value="si" 
                      control={<Radio sx={{ color: '#1A3C6D', '&.Mui-checked': { color: '#1A3C6D' }, '& .MuiSvgIcon-root': { fontSize: 16 } }} />} 
                      label={<Typography sx={{ fontSize: '0.8rem' }}>SÍ</Typography>}
                    />
                    <FormControlLabel 
                      value="no" 
                      control={<Radio sx={{ color: '#1A3C6D', '&.Mui-checked': { color: '#1A3C6D' }, '& .MuiSvgIcon-root': { fontSize: 16 } }} />} 
                      label={<Typography sx={{ fontSize: '0.8rem' }}>NO</Typography>}
                    />
                  </RadioGroup>
                </Box>

                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block' }}>Taponamiento:</Typography>
                  <RadioGroup
                    row
                    value={data.taponamiento}
                    onChange={(e) => handleChange('taponamiento', e.target.value)}
                    sx={{ '& .MuiFormControlLabel-root': { mr: 0.5 } }}
                  >
                    <FormControlLabel 
                      value="si" 
                      control={<Radio sx={{ color: '#1A3C6D', '&.Mui-checked': { color: '#1A3C6D' }, '& .MuiSvgIcon-root': { fontSize: 16 } }} />} 
                      label={<Typography sx={{ fontSize: '0.8rem' }}>SÍ</Typography>}
                    />
                    <FormControlLabel 
                      value="no" 
                      control={<Radio sx={{ color: '#1A3C6D', '&.Mui-checked': { color: '#1A3C6D' }, '& .MuiSvgIcon-root': { fontSize: 16 } }} />} 
                      label={<Typography sx={{ fontSize: '0.8rem' }}>NO</Typography>}
                    />
                  </RadioGroup>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Cormack e Inducción/Mantenimiento */}
          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 2 }}>
            <Box>
              <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block', mb: 0.5 }}>Cormack:</Typography>
              <RadioGroup
                row
                value={data.cormack}
                onChange={(e) => handleChange('cormack', e.target.value)}
                sx={{ '& .MuiFormControlLabel-root': { mr: 0.5 } }}
              >
                <FormControlLabel 
                  value="I" 
                  control={<Radio sx={{ color: '#1A3C6D', '&.Mui-checked': { color: '#1A3C6D' }, '& .MuiSvgIcon-root': { fontSize: 16 } }} />} 
                  label={<Typography sx={{ fontSize: '0.8rem' }}>I</Typography>}
                />
                <FormControlLabel 
                  value="II" 
                  control={<Radio sx={{ color: '#1A3C6D', '&.Mui-checked': { color: '#1A3C6D' }, '& .MuiSvgIcon-root': { fontSize: 16 } }} />} 
                  label={<Typography sx={{ fontSize: '0.8rem' }}>II</Typography>}
                />
                <FormControlLabel 
                  value="III" 
                  control={<Radio sx={{ color: '#1A3C6D', '&.Mui-checked': { color: '#1A3C6D' }, '& .MuiSvgIcon-root': { fontSize: 16 } }} />} 
                  label={<Typography sx={{ fontSize: '0.8rem' }}>III</Typography>}
                />
                <FormControlLabel 
                  value="IV" 
                  control={<Radio sx={{ color: '#1A3C6D', '&.Mui-checked': { color: '#1A3C6D' }, '& .MuiSvgIcon-root': { fontSize: 16 } }} />} 
                  label={<Typography sx={{ fontSize: '0.8rem' }}>IV</Typography>}
                />
              </RadioGroup>
            </Box>
            
            <TextField
              label="N° intentos"
              type="number"
              size="small"
              value={data.numeroIntentos}
              onChange={(e) => handleChange('numeroIntentos', e.target.value)}
              sx={{ 
                width: 100,
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': { borderColor: '#1A3C6D' },
                  '&.Mui-focused fieldset': { borderColor: '#1A3C6D' },
                },
                '& .MuiInputLabel-root.Mui-focused': { color: '#1A3C6D' },
                '& .MuiInputLabel-root': { fontSize: '0.85rem' },
                '& input': { fontSize: '0.9rem' }
              }}
            />

            <Box>
              <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block', mb: 0.5 }}>Inducción:</Typography>
              <RadioGroup
                row
                value={data.induccion}
                onChange={(e) => handleChange('induccion', e.target.value)}
                sx={{ '& .MuiFormControlLabel-root': { mr: 0.5 } }}
              >
                <FormControlLabel 
                  value="inhalatoria" 
                  control={<Radio sx={{ color: '#1A3C6D', '&.Mui-checked': { color: '#1A3C6D' }, '& .MuiSvgIcon-root': { fontSize: 16 } }} />} 
                  label={<Typography sx={{ fontSize: '0.8rem' }}>Inhalatoria</Typography>}
                />
                <FormControlLabel 
                  value="intravenosa" 
                  control={<Radio sx={{ color: '#1A3C6D', '&.Mui-checked': { color: '#1A3C6D' }, '& .MuiSvgIcon-root': { fontSize: 16 } }} />} 
                  label={<Typography sx={{ fontSize: '0.8rem' }}>IV</Typography>}
                />
              </RadioGroup>
            </Box>

            <Box>
              <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block', mb: 0.5 }}>Mantenimiento:</Typography>
              <RadioGroup
                row
                value={data.mantenimiento}
                onChange={(e) => handleChange('mantenimiento', e.target.value)}
                sx={{ '& .MuiFormControlLabel-root': { mr: 0.5 } }}
              >
                <FormControlLabel 
                  value="inhalatoria" 
                  control={<Radio sx={{ color: '#1A3C6D', '&.Mui-checked': { color: '#1A3C6D' }, '& .MuiSvgIcon-root': { fontSize: 16 } }} />} 
                  label={<Typography sx={{ fontSize: '0.8rem' }}>Inhalatoria</Typography>}
                />
                <FormControlLabel 
                  value="intravenosa" 
                  control={<Radio sx={{ color: '#1A3C6D', '&.Mui-checked': { color: '#1A3C6D' }, '& .MuiSvgIcon-root': { fontSize: 16 } }} />} 
                  label={<Typography sx={{ fontSize: '0.8rem' }}>IV</Typography>}
                />
                <FormControlLabel 
                  value="balanceada" 
                  control={<Radio sx={{ color: '#1A3C6D', '&.Mui-checked': { color: '#1A3C6D' }, '& .MuiSvgIcon-root': { fontSize: 16 } }} />} 
                  label={<Typography sx={{ fontSize: '0.8rem' }}>Balanceada</Typography>}
                />
              </RadioGroup>
            </Box>
          </Box>

          <Divider sx={{ my: 1.5 }} />

          {/* REGIONAL */}
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold', color: '#1A3C6D', fontSize: '1rem' }}>
            REGIONAL
          </Typography>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 1.5, mb: 2 }}>
            <TextField
              label="• Asepsia con"
              size="small"
              value={data.asepsiaCon}
              onChange={(e) => handleChange('asepsiaCon', e.target.value.toUpperCase())}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': { borderColor: '#1A3C6D' },
                  '&.Mui-focused fieldset': { borderColor: '#1A3C6D' },
                },
                '& .MuiInputLabel-root.Mui-focused': { color: '#1A3C6D' },
                '& .MuiInputLabel-root': { fontSize: '0.85rem' },
                '& input': { fontSize: '0.9rem' }
              }}
            />
            <TextField
              label="• Local asistida"
              size="small"
              value={data.localAsistida}
              onChange={(e) => handleChange('localAsistida', e.target.value.toUpperCase())}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': { borderColor: '#1A3C6D' },
                  '&.Mui-focused fieldset': { borderColor: '#1A3C6D' },
                },
                '& .MuiInputLabel-root.Mui-focused': { color: '#1A3C6D' },
                '& .MuiInputLabel-root': { fontSize: '0.85rem' },
                '& input': { fontSize: '0.9rem' }
              }}
            />
            <TextField
              label="• Habón con"
              size="small"
              value={data.habonCon}
              onChange={(e) => handleChange('habonCon', e.target.value.toUpperCase())}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': { borderColor: '#1A3C6D' },
                  '&.Mui-focused fieldset': { borderColor: '#1A3C6D' },
                },
                '& .MuiInputLabel-root.Mui-focused': { color: '#1A3C6D' },
                '& .MuiInputLabel-root': { fontSize: '0.85rem' },
                '& input': { fontSize: '0.9rem' }
              }}
            />
            <TextField
              label="• Intravenosa"
              size="small"
              value={data.intravenosa}
              onChange={(e) => handleChange('intravenosa', e.target.value.toUpperCase())}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': { borderColor: '#1A3C6D' },
                  '&.Mui-focused fieldset': { borderColor: '#1A3C6D' },
                },
                '& .MuiInputLabel-root.Mui-focused': { color: '#1A3C6D' },
                '& .MuiInputLabel-root': { fontSize: '0.85rem' },
                '& input': { fontSize: '0.9rem' }
              }}
            />
          </Box>

          <Divider sx={{ my: 1.5 }} />

          {/* TRONCULAR */}
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold', color: '#1A3C6D', fontSize: '1rem' }}>
            TRONCULAR
          </Typography>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 1.5, mb: 2 }}>
            <TextField
              label="Bloqueo nervio"
              size="small"
              value={data.bloqueoNervio}
              onChange={(e) => handleChange('bloqueoNervio', e.target.value.toUpperCase())}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': { borderColor: '#1A3C6D' },
                  '&.Mui-focused fieldset': { borderColor: '#1A3C6D' },
                },
                '& .MuiInputLabel-root.Mui-focused': { color: '#1A3C6D' },
                '& .MuiInputLabel-root': { fontSize: '0.85rem' },
                '& input': { fontSize: '0.9rem' }
              }}
            />
            <TextField
              label="N° Intentos"
              size="small"
              value={data.intentosNervio}
              onChange={(e) => handleChange('intentosNervio', e.target.value)}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': { borderColor: '#1A3C6D' },
                  '&.Mui-focused fieldset': { borderColor: '#1A3C6D' },
                },
                '& .MuiInputLabel-root.Mui-focused': { color: '#1A3C6D' },
                '& .MuiInputLabel-root': { fontSize: '0.85rem' },
                '& input': { fontSize: '0.9rem' }
              }}
            />
            <TextField
              label="Bloqueo plexo"
              size="small"
              value={data.bloqueoPlexo}
              onChange={(e) => handleChange('bloqueoPlexo', e.target.value.toUpperCase())}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': { borderColor: '#1A3C6D' },
                  '&.Mui-focused fieldset': { borderColor: '#1A3C6D' },
                },
                '& .MuiInputLabel-root.Mui-focused': { color: '#1A3C6D' },
                '& .MuiInputLabel-root': { fontSize: '0.85rem' },
                '& input': { fontSize: '0.9rem' }
              }}
            />
            <TextField
              label="N° Intentos"
              size="small"
              value={data.intentosPlexo}
              onChange={(e) => handleChange('intentosPlexo', e.target.value)}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': { borderColor: '#1A3C6D' },
                  '&.Mui-focused fieldset': { borderColor: '#1A3C6D' },
                },
                '& .MuiInputLabel-root.Mui-focused': { color: '#1A3C6D' },
                '& .MuiInputLabel-root': { fontSize: '0.85rem' },
                '& input': { fontSize: '0.9rem' }
              }}
            />
            <TextField
              label="Anestésico local"
              size="small"
              value={data.anestesicoLocal}
              onChange={(e) => handleChange('anestesicoLocal', e.target.value.toUpperCase())}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': { borderColor: '#1A3C6D' },
                  '&.Mui-focused fieldset': { borderColor: '#1A3C6D' },
                },
                '& .MuiInputLabel-root.Mui-focused': { color: '#1A3C6D' },
                '& .MuiInputLabel-root': { fontSize: '0.85rem' },
                '& input': { fontSize: '0.9rem' }
              }}
            />
            <TextField
              label="Tipo aguja"
              size="small"
              value={data.tipoAguja}
              onChange={(e) => handleChange('tipoAguja', e.target.value.toUpperCase())}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': { borderColor: '#1A3C6D' },
                  '&.Mui-focused fieldset': { borderColor: '#1A3C6D' },
                },
                '& .MuiInputLabel-root.Mui-focused': { color: '#1A3C6D' },
                '& .MuiInputLabel-root': { fontSize: '0.85rem' },
                '& input': { fontSize: '0.9rem' }
              }}
            />
            <TextField
              label="Coadyuvante"
              size="small"
              value={data.coadyuvante}
              onChange={(e) => handleChange('coadyuvante', e.target.value.toUpperCase())}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': { borderColor: '#1A3C6D' },
                  '&.Mui-focused fieldset': { borderColor: '#1A3C6D' },
                },
                '& .MuiInputLabel-root.Mui-focused': { color: '#1A3C6D' },
                '& .MuiInputLabel-root': { fontSize: '0.85rem' },
                '& input': { fontSize: '0.9rem' }
              }}
            />
            <TextField
              label="Equipo"
              size="small"
              value={data.equipo}
              onChange={(e) => handleChange('equipo', e.target.value.toUpperCase())}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': { borderColor: '#1A3C6D' },
                  '&.Mui-focused fieldset': { borderColor: '#1A3C6D' },
                },
                '& .MuiInputLabel-root.Mui-focused': { color: '#1A3C6D' },
                '& .MuiInputLabel-root': { fontSize: '0.85rem' },
                '& input': { fontSize: '0.9rem' }
              }}
            />
          </Box>

          <Divider sx={{ my: 1.5 }} />

          {/* NEUROAXIAL */}
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold', color: '#1A3C6D', fontSize: '1rem' }}>
            NEUROAXIAL
          </Typography>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 1.5, mb: 1.5 }}>
            <TextField
              label="Raquídea"
              size="small"
              value={data.raquidea}
              onChange={(e) => handleChange('raquidea', e.target.value.toUpperCase())}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': { borderColor: '#1A3C6D' },
                  '&.Mui-focused fieldset': { borderColor: '#1A3C6D' },
                },
                '& .MuiInputLabel-root.Mui-focused': { color: '#1A3C6D' },
                '& .MuiInputLabel-root': { fontSize: '0.85rem' },
                '& input': { fontSize: '0.9rem' }
              }}
            />
            <TextField
              label="Epidural"
              size="small"
              value={data.epidural}
              onChange={(e) => handleChange('epidural', e.target.value.toUpperCase())}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': { borderColor: '#1A3C6D' },
                  '&.Mui-focused fieldset': { borderColor: '#1A3C6D' },
                },
                '& .MuiInputLabel-root.Mui-focused': { color: '#1A3C6D' },
                '& .MuiInputLabel-root': { fontSize: '0.85rem' },
                '& input': { fontSize: '0.9rem' }
              }}
            />
            <TextField
              label="Caudal"
              size="small"
              value={data.caudal}
              onChange={(e) => handleChange('caudal', e.target.value.toUpperCase())}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': { borderColor: '#1A3C6D' },
                  '&.Mui-focused fieldset': { borderColor: '#1A3C6D' },
                },
                '& .MuiInputLabel-root.Mui-focused': { color: '#1A3C6D' },
                '& .MuiInputLabel-root': { fontSize: '0.85rem' },
                '& input': { fontSize: '0.9rem' }
              }}
            />
            <TextField
              label="Catéter"
              size="small"
              value={data.cateter}
              onChange={(e) => handleChange('cateter', e.target.value.toUpperCase())}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': { borderColor: '#1A3C6D' },
                  '&.Mui-focused fieldset': { borderColor: '#1A3C6D' },
                },
                '& .MuiInputLabel-root.Mui-focused': { color: '#1A3C6D' },
                '& .MuiInputLabel-root': { fontSize: '0.85rem' },
                '& input': { fontSize: '0.9rem' }
              }}
            />
            <TextField
              label="Tipo aguja"
              size="small"
              value={data.tipoAgujaNeuro}
              onChange={(e) => handleChange('tipoAgujaNeuro', e.target.value.toUpperCase())}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': { borderColor: '#1A3C6D' },
                  '&.Mui-focused fieldset': { borderColor: '#1A3C6D' },
                },
                '& .MuiInputLabel-root.Mui-focused': { color: '#1A3C6D' },
                '& .MuiInputLabel-root': { fontSize: '0.85rem' },
                '& input': { fontSize: '0.9rem' }
              }}
            />
            <TextField
              label="N° aguja"
              size="small"
              value={data.numeroAguja}
              onChange={(e) => handleChange('numeroAguja', e.target.value.toUpperCase())}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': { borderColor: '#1A3C6D' },
                  '&.Mui-focused fieldset': { borderColor: '#1A3C6D' },
                },
                '& .MuiInputLabel-root.Mui-focused': { color: '#1A3C6D' },
                '& .MuiInputLabel-root': { fontSize: '0.85rem' },
                '& input': { fontSize: '0.9rem' }
              }}
            />
            <TextField
              label="N° Intentos"
              type="number"
              size="small"
              value={data.intentosNeuro}
              onChange={(e) => handleChange('intentosNeuro', e.target.value)}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': { borderColor: '#1A3C6D' },
                  '&.Mui-focused fieldset': { borderColor: '#1A3C6D' },
                },
                '& .MuiInputLabel-root.Mui-focused': { color: '#1A3C6D' },
                '& .MuiInputLabel-root': { fontSize: '0.85rem' },
                '& input': { fontSize: '0.9rem' }
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 1.5 }}>
            <Box>
              <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block', mb: 0.5 }}>Borbotaje:</Typography>
              <RadioGroup
                row
                value={data.borbotaje}
                onChange={(e) => handleChange('borbotaje', e.target.value)}
                sx={{ '& .MuiFormControlLabel-root': { mr: 0.5 } }}
              >
                <FormControlLabel 
                  value="si" 
                  control={<Radio sx={{ color: '#1A3C6D', '&.Mui-checked': { color: '#1A3C6D' }, '& .MuiSvgIcon-root': { fontSize: 16 } }} />} 
                  label={<Typography sx={{ fontSize: '0.8rem' }}>SÍ</Typography>}
                />
                <FormControlLabel 
                  value="no" 
                  control={<Radio sx={{ color: '#1A3C6D', '&.Mui-checked': { color: '#1A3C6D' }, '& .MuiSvgIcon-root': { fontSize: 16 } }} />} 
                  label={<Typography sx={{ fontSize: '0.8rem' }}>NO</Typography>}
                />
              </RadioGroup>
            </Box>

            <Box>
              <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block', mb: 0.5 }}>Acceso:</Typography>
              <RadioGroup
                row
                value={data.acceso}
                onChange={(e) => handleChange('acceso', e.target.value)}
                sx={{ '& .MuiFormControlLabel-root': { mr: 0.5 } }}
              >
                <FormControlLabel 
                  value="medial" 
                  control={<Radio sx={{ color: '#1A3C6D', '&.Mui-checked': { color: '#1A3C6D' }, '& .MuiSvgIcon-root': { fontSize: 16 } }} />} 
                  label={<Typography sx={{ fontSize: '0.8rem' }}>Medial</Typography>}
                />
                <FormControlLabel 
                  value="lateral" 
                  control={<Radio sx={{ color: '#1A3C6D', '&.Mui-checked': { color: '#1A3C6D' }, '& .MuiSvgIcon-root': { fontSize: 16 } }} />} 
                  label={<Typography sx={{ fontSize: '0.8rem' }}>Lateral</Typography>}
                />
              </RadioGroup>
            </Box>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 1.5, mb: 2 }}>
            <TextField
              label="Sitio punción"
              size="small"
              value={data.sitioPuncion}
              onChange={(e) => handleChange('sitioPuncion', e.target.value.toUpperCase())}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': { borderColor: '#1A3C6D' },
                  '&.Mui-focused fieldset': { borderColor: '#1A3C6D' },
                },
                '& .MuiInputLabel-root.Mui-focused': { color: '#1A3C6D' },
                '& .MuiInputLabel-root': { fontSize: '0.85rem' },
                '& input': { fontSize: '0.9rem' }
              }}
            />
            <TextField
              label="Dermatoma"
              size="small"
              value={data.dermatoma}
              onChange={(e) => handleChange('dermatoma', e.target.value.toUpperCase())}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': { borderColor: '#1A3C6D' },
                  '&.Mui-focused fieldset': { borderColor: '#1A3C6D' },
                },
                '& .MuiInputLabel-root.Mui-focused': { color: '#1A3C6D' },
                '& .MuiInputLabel-root': { fontSize: '0.85rem' },
                '& input': { fontSize: '0.9rem' }
              }}
            />
            <TextField
              label="Posición"
              size="small"
              value={data.posicion}
              onChange={(e) => handleChange('posicion', e.target.value.toUpperCase())}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': { borderColor: '#1A3C6D' },
                  '&.Mui-focused fieldset': { borderColor: '#1A3C6D' },
                },
                '& .MuiInputLabel-root.Mui-focused': { color: '#1A3C6D' },
                '& .MuiInputLabel-root': { fontSize: '0.85rem' },
                '& input': { fontSize: '0.9rem' }
              }}
            />
          </Box>

          <Divider sx={{ my: 1.5 }} />

          {/* SEDOANALGESIA */}
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold', color: '#1A3C6D', fontSize: '1rem' }}>
            SEDOANALGESIA
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 1.5 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={data.solucionSalina}
                  onChange={(e) => handleChange('solucionSalina', e.target.checked)}
                  sx={{ color: '#1A3C6D', '&.Mui-checked': { color: '#1A3C6D' } }}
                />
              }
              label={<Typography sx={{ fontSize: '0.85rem' }}>• Solución Salina 0.90%</Typography>}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={data.tramadol}
                  onChange={(e) => handleChange('tramadol', e.target.checked)}
                  sx={{ color: '#1A3C6D', '&.Mui-checked': { color: '#1A3C6D' } }}
                />
              }
              label={<Typography sx={{ fontSize: '0.85rem' }}>• Tramadol</Typography>}
            />

            <TextField
              label="• 10 ml / hora"
              size="small"
              value={data.mlHora}
              onChange={(e) => handleChange('mlHora', e.target.value)}
              sx={{ 
                width: 150,
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': { borderColor: '#1A3C6D' },
                  '&.Mui-focused fieldset': { borderColor: '#1A3C6D' },
                },
                '& .MuiInputLabel-root.Mui-focused': { color: '#1A3C6D' },
                '& .MuiInputLabel-root': { fontSize: '0.85rem' },
                '& input': { fontSize: '0.9rem' }
              }}
            />
          </Box>

          <Box>
            <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block', mb: 0.5 }}>
              Escala de Ramsay:
            </Typography>
            <RadioGroup
              row
              value={data.escalaRamsay}
              onChange={(e) => handleChange('escalaRamsay', e.target.value)}
              sx={{ '& .MuiFormControlLabel-root': { mr: 1 } }}
            >
              <FormControlLabel 
                value="1" 
                control={<Radio sx={{ color: '#1A3C6D', '&.Mui-checked': { color: '#1A3C6D' }, '& .MuiSvgIcon-root': { fontSize: 16 } }} />} 
                label={<Typography sx={{ fontSize: '0.8rem' }}>1</Typography>}
              />
              <FormControlLabel 
                value="2" 
                control={<Radio sx={{ color: '#1A3C6D', '&.Mui-checked': { color: '#1A3C6D' }, '& .MuiSvgIcon-root': { fontSize: 16 } }} />} 
                label={<Typography sx={{ fontSize: '0.8rem' }}>2</Typography>}
              />
              <FormControlLabel 
                value="3" 
                control={<Radio sx={{ color: '#1A3C6D', '&.Mui-checked': { color: '#1A3C6D' }, '& .MuiSvgIcon-root': { fontSize: 16 } }} />} 
                label={<Typography sx={{ fontSize: '0.8rem' }}>3</Typography>}
              />
              <FormControlLabel 
                value="4" 
                control={<Radio sx={{ color: '#1A3C6D', '&.Mui-checked': { color: '#1A3C6D' }, '& .MuiSvgIcon-root': { fontSize: 16 } }} />} 
                label={<Typography sx={{ fontSize: '0.8rem' }}>4</Typography>}
              />
              <FormControlLabel 
                value="5" 
                control={<Radio sx={{ color: '#1A3C6D', '&.Mui-checked': { color: '#1A3C6D' }, '& .MuiSvgIcon-root': { fontSize: 16 } }} />} 
                label={<Typography sx={{ fontSize: '0.8rem' }}>5</Typography>}
              />
              <FormControlLabel 
                value="6" 
                control={<Radio sx={{ color: '#1A3C6D', '&.Mui-checked': { color: '#1A3C6D' }, '& .MuiSvgIcon-root': { fontSize: 16 } }} />} 
                label={<Typography sx={{ fontSize: '0.8rem' }}>6</Typography>}
              />
            </RadioGroup>
          </Box>
        </Paper>
      </CardContent>
    </Card>
  );
}