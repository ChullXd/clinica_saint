import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  Divider,
  Chip,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import {
  Assignment as ExamenIcon,
  MonitorWeight as PesoIcon,
  Height as LongitudIcon,
  Psychology as CefalicoIcon,
  FitnessCenter as ToraxIcon,
  Restaurant as AbdomenIcon,
  Face as CabezaIcon,
  Visibility as OjosIcon,
  Hearing as OidosIcon,
  Air as NarizIcon,
  FavoriteOutlined as CorazonIcon,
  Accessibility as CuerpoIcon,
  ChildCare as NeurologicoIcon,
  Opacity as SaturacionIcon,
  Accessibility,
  Air,
} from "@mui/icons-material";

interface ExamenFisicoData {
  // Antropometría
  peso: string;
  longitud: string;
  perimetroCefalico: string;
  perimetroToracico: string;
  perimetroAbdominal: string;
  
  // Examen por sistemas - SP (Sin Particularidades) / CP (Con Particularidades)
  piel: string;
  pielTexto: string;
  cabeza: string;
  cabezaTexto: string;
  fontanela: string;
  fontanelaTexto: string;
  ojos: string;
  ojosTexto: string;
  oidos: string;
  oidosTexto: string;
  bocaNariz: string;
  bocaNarizTexto: string;
  cuello: string;
  cuelloTexto: string;
  torax: string;
  toraxTexto: string;
  pulmones: string;
  pulmonesTexto: string;
  corazon: string;
  corazonTexto: string;
  abdomen: string;
  abdomenTexto: string;
  cordonUmbilical: string;
  cordonTexto: string;
  genitales: string;
  genitalesTexto: string;
  ano: string;
  anoTexto: string;
  columna: string;
  columnaTexto: string;
  extremidades: string;
  extremidadesTexto: string;
  neurologico: string;
  neurologicoTexto: string;
  
  // Saturación inicial 24 horas
  satPreductal: string;
  satPostductal: string;
}

export default function ExamenFisico() {
  const [examen, setExamen] = useState<ExamenFisicoData>({
    peso: '',
    longitud: '',
    perimetroCefalico: '',
    perimetroToracico: '',
    perimetroAbdominal: '',
    piel: '',
    pielTexto: '',
    cabeza: '',
    cabezaTexto: '',
    fontanela: '',
    fontanelaTexto: '',
    ojos: '',
    ojosTexto: '',
    oidos: '',
    oidosTexto: '',
    bocaNariz: '',
    bocaNarizTexto: '',
    cuello: '',
    cuelloTexto: '',
    torax: '',
    toraxTexto: '',
    pulmones: '',
    pulmonesTexto: '',
    corazon: '',
    corazonTexto: '',
    abdomen: '',
    abdomenTexto: '',
    cordonUmbilical: '',
    cordonTexto: '',
    genitales: '',
    genitalesTexto: '',
    ano: '',
    anoTexto: '',
    columna: '',
    columnaTexto: '',
    extremidades: '',
    extremidadesTexto: '',
    neurologico: '',
    neurologicoTexto: '',
    satPreductal: '',
    satPostductal: '',
  });

  const handleChange = (field: keyof ExamenFisicoData, value: string) => {
    setExamen(prev => ({
      ...prev,
      [field]: field.includes('Texto') || field === 'neurologicoTexto' || field === 'pielTexto'
        ? value.toUpperCase() 
        : value,
    }));
  };

  const sistemasExamen = [
    { key: 'piel', label: 'PIEL', icon: <CuerpoIcon sx={{ fontSize: '0.9rem' }} /> },
    { key: 'cabeza', label: 'CABEZA', icon: <CabezaIcon sx={{ fontSize: '0.9rem' }} /> },
    { key: 'fontanela', label: 'FONTANELA', icon: <CefalicoIcon sx={{ fontSize: '0.9rem' }} /> },
    { key: 'ojos', label: 'OJOS', icon: <OjosIcon sx={{ fontSize: '0.9rem' }} /> },
    { key: 'oidos', label: 'OÍDOS', icon: <OidosIcon sx={{ fontSize: '0.9rem' }} /> },
    { key: 'bocaNariz', label: 'BOCA/NARIZ', icon: <NarizIcon sx={{ fontSize: '0.9rem' }} /> },
    { key: 'cuello', label: 'CUELLO', icon: <CuerpoIcon sx={{ fontSize: '0.9rem' }} /> },
    { key: 'torax', label: 'TÓRAX', icon: <ToraxIcon sx={{ fontSize: '0.9rem' }} /> },
    { key: 'pulmones', label: 'PULMONES', icon: <Air sx={{ fontSize: '0.9rem' }} /> },
    { key: 'corazon', label: 'CORAZÓN', icon: <CorazonIcon sx={{ fontSize: '0.9rem' }} /> },
    { key: 'abdomen', label: 'ABDOMEN', icon: <AbdomenIcon sx={{ fontSize: '0.9rem' }} /> },
    { key: 'cordonUmbilical', label: 'CORDÓN UMB.', icon: <CuerpoIcon sx={{ fontSize: '0.9rem' }} /> },
    { key: 'genitales', label: 'GENITALES', icon: <CuerpoIcon sx={{ fontSize: '0.9rem' }} /> },
    { key: 'ano', label: 'ANO', icon: <CuerpoIcon sx={{ fontSize: '0.9rem' }} /> },
    { key: 'columna', label: 'COLUMNA', icon: <CuerpoIcon sx={{ fontSize: '0.9rem' }} /> },
    { key: 'extremidades', label: 'EXTREMIDADES', icon: <Accessibility sx={{ fontSize: '0.9rem' }} /> },
  ];

  return (
    <Box>
      {/* Sección J: Examen Físico */}
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
            <ExamenIcon sx={{ fontSize: '1.2rem' }} />
            J. EXAMEN FÍSICO
          </Typography>

          {/* Antropometría */}
          <Typography
            variant="subtitle1"
            sx={{
              mb: 1.5,
              fontWeight: "bold",
              color: "#1A3C6D",
              fontSize: "0.9rem",
            }}
          >
            ANTROPOMETRÍA:
          </Typography>

          {/* Box para Antropometría */}
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 1.5, 
            mb: 2 
          }}>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%', lg: '1 1 19%' } }}>
              <TextField
                label="PESO (g)"
                value={examen.peso}
                onChange={(e) => handleChange('peso', e.target.value)}
                fullWidth
                size="small"
                placeholder="2500-4000"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PesoIcon sx={{ fontSize: '1rem', color: '#1A3C6D' }} />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                helperText="Gramos"
                FormHelperTextProps={{ sx: { fontSize: "0.7rem" } }}
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '0.85rem',
                    fontWeight: 'bold'
                  }
                }}
              />
            </Box>

            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%', lg: '1 1 19%' } }}>
              <TextField
                label="LONGITUD (cm)"
                value={examen.longitud}
                onChange={(e) => handleChange('longitud', e.target.value)}
                fullWidth
                size="small"
                placeholder="48-52"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LongitudIcon sx={{ fontSize: '1rem', color: '#1A3C6D' }} />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                helperText="Centímetros"
                FormHelperTextProps={{ sx: { fontSize: "0.7rem" } }}
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '0.85rem',
                    fontWeight: 'bold'
                  }
                }}
              />
            </Box>

            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%', lg: '1 1 19%' } }}>
              <TextField
                label="P. CEFÁLICO (cm)"
                value={examen.perimetroCefalico}
                onChange={(e) => handleChange('perimetroCefalico', e.target.value)}
                fullWidth
                size="small"
                placeholder="33-37"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CefalicoIcon sx={{ fontSize: '1rem', color: '#1A3C6D' }} />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                helperText="Perímetro cefálico"
                FormHelperTextProps={{ sx: { fontSize: "0.7rem" } }}
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '0.85rem',
                    fontWeight: 'bold'
                  }
                }}
              />
            </Box>

            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%', lg: '1 1 19%' } }}>
              <TextField
                label="P. TORÁCICO (cm)"
                value={examen.perimetroToracico}
                onChange={(e) => handleChange('perimetroToracico', e.target.value)}
                fullWidth
                size="small"
                placeholder="30-34"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ToraxIcon sx={{ fontSize: '1rem', color: '#1A3C6D' }} />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                helperText="Perímetro torácico"
                FormHelperTextProps={{ sx: { fontSize: "0.7rem" } }}
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '0.85rem',
                    fontWeight: 'bold'
                  }
                }}
              />
            </Box>

            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%', lg: '1 1 19%' } }}>
              <TextField
                label="P. ABDOMINAL (cm)"
                value={examen.perimetroAbdominal}
                onChange={(e) => handleChange('perimetroAbdominal', e.target.value)}
                fullWidth
                size="small"
                placeholder="28-32"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AbdomenIcon sx={{ fontSize: '1rem', color: '#1A3C6D' }} />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                helperText="Perímetro abdominal"
                FormHelperTextProps={{ sx: { fontSize: "0.7rem" } }}
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '0.85rem',
                    fontWeight: 'bold'
                  }
                }}
              />
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Examen por Sistemas */}
          <Typography
            variant="subtitle1"
            sx={{
              mb: 1.5,
              fontWeight: "bold",
              color: "#1A3C6D",
              fontSize: "0.9rem",
            }}
          >
            EXAMEN POR SISTEMAS:
          </Typography>

          {/* Box para Examen por Sistemas */}
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 2 
          }}>
            {sistemasExamen.map((sistema) => (
              <Box 
                key={sistema.key}
                sx={{ flex: { xs: '1 1 100%', md: '1 1 48%', lg: '1 1 31%' } }}
              >
                <Card variant="outlined" sx={{ height: '100%', backgroundColor: '#f8f9fa' }}>
                  <CardContent sx={{ p: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                      {sistema.icon}
                      <Typography sx={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#1A3C6D' }}>
                        {sistema.label}:
                      </Typography>
                    </Box>
                    
                    <FormControl component="fieldset" fullWidth>
                      <RadioGroup
                        row
                        value={examen[sistema.key as keyof ExamenFisicoData]}
                        onChange={(e) => handleChange(sistema.key as keyof ExamenFisicoData, e.target.value)}
                        sx={{ justifyContent: 'center', gap: 1, mb: 1 }}
                      >
                        <FormControlLabel
                          value="SP"
                          control={<Radio size="small" />}
                          label={
                            <Chip 
                              label="SP" 
                              size="small" 
                              variant={examen[sistema.key as keyof ExamenFisicoData] === 'SP' ? 'filled' : 'outlined'}
                              color="success"
                              sx={{ fontSize: '0.6rem', fontWeight: 'bold', minWidth: '30px' }}
                            />
                          }
                        />
                        <FormControlLabel
                          value="CP"
                          control={<Radio size="small" />}
                          label={
                            <Chip 
                              label="CP" 
                              size="small" 
                              variant={examen[sistema.key as keyof ExamenFisicoData] === 'CP' ? 'filled' : 'outlined'}
                              color="warning"
                              sx={{ fontSize: '0.6rem', fontWeight: 'bold', minWidth: '30px' }}
                            />
                          }
                        />
                      </RadioGroup>
                    </FormControl>

                    {examen[sistema.key as keyof ExamenFisicoData] === 'CP' && (
                      <TextField
                        placeholder="DESCRIBIR PARTICULARIDADES..."
                        value={examen[`${sistema.key}Texto` as keyof ExamenFisicoData]}
                        onChange={(e) => handleChange(`${sistema.key}Texto` as keyof ExamenFisicoData, e.target.value)}
                        fullWidth
                        size="small"
                        multiline
                        rows={2}
                        sx={{ 
                          '& .MuiInputBase-input': { 
                            fontSize: '0.7rem',
                            textTransform: 'uppercase'
                          }
                        }}
                      />
                    )}
                  </CardContent>
                </Card>
              </Box>
            ))}

            {/* Piel - Campo especial con texto */}
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%', lg: '1 1 31%' } }}>
              <Card variant="outlined" sx={{ height: '100%', backgroundColor: '#f0f8ff' }}>
                <CardContent sx={{ p: 1.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                    <CuerpoIcon sx={{ fontSize: '0.9rem' }} />
                    <Typography sx={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#1A3C6D' }}>
                      PIEL:
                    </Typography>
                  </Box>
                  
                  <TextField
                    placeholder="DESCRIBIR CARACTERÍSTICAS DE LA PIEL..."
                    value={examen.pielTexto}
                    onChange={(e) => handleChange('pielTexto', e.target.value)}
                    fullWidth
                    size="small"
                    multiline
                    rows={3}
                    sx={{ 
                      '& .MuiInputBase-input': { 
                        fontSize: '0.7rem',
                        textTransform: 'uppercase'
                      }
                    }}
                  />
                </CardContent>
              </Card>
            </Box>

            {/* Neurológico - Campo especial con texto */}
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%', lg: '1 1 31%' } }}>
              <Card variant="outlined" sx={{ height: '100%', backgroundColor: '#fff0f5' }}>
                <CardContent sx={{ p: 1.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                    <NeurologicoIcon sx={{ fontSize: '0.9rem' }} />
                    <Typography sx={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#1A3C6D' }}>
                      NEUROLÓGICO:
                    </Typography>
                  </Box>
                  
                  <TextField
                    placeholder="EVALUACIÓN NEUROLÓGICA..."
                    value={examen.neurologicoTexto}
                    onChange={(e) => handleChange('neurologicoTexto', e.target.value)}
                    fullWidth
                    size="small"
                    multiline
                    rows={3}
                    sx={{ 
                      '& .MuiInputBase-input': { 
                        fontSize: '0.7rem',
                        textTransform: 'uppercase'
                      }
                    }}
                  />
                </CardContent>
              </Card>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Saturación Inicial 24 horas */}
          <Typography
            variant="subtitle1"
            sx={{
              mb: 1.5,
              fontWeight: "bold",
              color: "#1A3C6D",
              fontSize: "0.9rem",
            }}
          >
            INICIAL 24 HORAS:
          </Typography>

          {/* Box para Saturación */}
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 1.5 
          }}>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%' } }}>
              <TextField
                label="SAT O2 PREDUCTAL (%)"
                value={examen.satPreductal}
                onChange={(e) => handleChange('satPreductal', e.target.value)}
                fullWidth
                size="small"
                placeholder="≥95%"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SaturacionIcon sx={{ fontSize: '1rem', color: '#1A3C6D' }} />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                helperText="Saturación preductal (mano derecha)"
                FormHelperTextProps={{ sx: { fontSize: "0.7rem" } }}
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '0.85rem',
                    fontWeight: 'bold'
                  }
                }}
              />
            </Box>

            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%' } }}>
              <TextField
                label="SAT O2 POSTDUCTAL (%)"
                value={examen.satPostductal}
                onChange={(e) => handleChange('satPostductal', e.target.value)}
                fullWidth
                size="small"
                placeholder="≥95%"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SaturacionIcon sx={{ fontSize: '1rem', color: '#1A3C6D' }} />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                helperText="Saturación postductal (pie)"
                FormHelperTextProps={{ sx: { fontSize: "0.7rem" } }}
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '0.85rem',
                    fontWeight: 'bold'
                  }
                }}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>

    
    </Box>
  );
}