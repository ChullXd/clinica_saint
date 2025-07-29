import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Chip,
  Divider,
  Alert,
  InputAdornment,
  Tabs,
  Tab,
  Paper,
} from '@mui/material';
import {
  Biotech as ExamenesIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Timer as TiempoIcon,
  LocalHospital as DiagnosticoIcon,
  Science as LaboratorioIcon,
  Camera as ImagenIcon,
  MonitorHeart as ProcedimientoIcon,
} from "@mui/icons-material";

interface ExamenesProcedimientosData {
  resultados: string;
  fechaCreacion: string;
  ultimaModificacion: string;
  tipoExamen: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`examenes-tabpanel-${index}`}
      aria-labelledby={`examenes-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

export default function ExamenesProcedimientos() {
  const [examenesProcedimientos, setExamenesProcedimientos] = useState<ExamenesProcedimientosData>({
    resultados: '',
    fechaCreacion: '',
    ultimaModificacion: '',
    tipoExamen: 'general',
  });

  const [tabValue, setTabValue] = useState(0);

  const handleResultadosChange = (value: string) => {
    const now = new Date().toISOString();
    setExamenesProcedimientos(prev => ({
      ...prev,
      resultados: value.toUpperCase(),
      fechaCreacion: prev.fechaCreacion || now,
      ultimaModificacion: now,
    }));
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Contar caracteres y palabras
  const caracteresCount = examenesProcedimientos.resultados.length;
  const palabrasCount = examenesProcedimientos.resultados.trim() ? 
    examenesProcedimientos.resultados.trim().split(/\s+/).length : 0;

  // Sugerencias por tipo de examen
  const sugerenciasLaboratorio = [
    "HEMOGRAMA COMPLETO: HB 12.5 G/DL, LEUCOCITOS 8000/UL",
    "GLUCOSA: 95 MG/DL (NORMAL)",
    "CREATININA: 0.9 MG/DL (NORMAL)",
    "UREA: 25 MG/DL (NORMAL)",
    "ELECTROLITOS: NA 140, K 4.2, CL 100 MEQ/L",
    "PROTEÍNA C REACTIVA: 5 MG/L (ELEVADA)",
    "TRANSAMINASAS: ALT 35, AST 28 U/L (NORMAL)",
    "TIEMPOS DE COAGULACIÓN: TP 12 SEG, TPT 28 SEG"
  ];

  const sugerenciasImagen = [
    "RADIOGRAFÍA DE TÓRAX: CAMPOS PULMONARES LIBRES",
    "ECOGRAFÍA ABDOMINAL: ÓRGANOS SIN ALTERACIONES",
    "TOMOGRAFÍA: SIN SIGNOS DE SANGRADO ACTIVO",
    "RADIOGRAFÍA SIMPLE: FRACTURA NO DESPLAZADA",
    "ULTRASONIDO DOPPLER: FLUJO VASCULAR CONSERVADO",
    "RESONANCIA MAGNÉTICA: LESIÓN COMPATIBLE CON...",
    "ECOCARDIOGRAMA: FUNCIÓN SISTÓLICA CONSERVADA",
    "MAMOGRAFÍA: BIRADS 2 - BENIGNO"
  ];

  const sugerenciasProcedimientos = [
    "ELECTROCARDIOGRAMA: RITMO SINUSAL NORMAL",
    "ENDOSCOPIA: GASTRITIS CRÓNICA MODERADA",
    "COLONOSCOPIA: PÓLIPOS BENIGNOS RESECADOS",
    "BIOPSIA: COMPATIBLE CON PROCESO INFLAMATORIO",
    "PUNCIÓN LUMBAR: PRESIÓN NORMAL, LÍQUIDO CLARO",
    "ARTROSCOPIA: LESIÓN MENISCAL GRADO II",
    "BRONCOSCOPIA: SECRECIONES PURULENTAS",
    "CATETERISMO: ARTERIAS CORONARIAS NORMALES"
  ];

  const getSugerencias = () => {
    switch (tabValue) {
      case 0:
        return [...sugerenciasLaboratorio, ...sugerenciasImagen, ...sugerenciasProcedimientos];
      case 1:
        return sugerenciasLaboratorio;
      case 2:
        return sugerenciasImagen;
      case 3:
        return sugerenciasProcedimientos;
      default:
        return [];
    }
  };

  const agregarSugerencia = (sugerencia: string) => {
    const textoActual = examenesProcedimientos.resultados;
    const nuevoTexto = textoActual ? 
      `${textoActual}\n• ${sugerencia}` : 
      `• ${sugerencia}`;
    handleResultadosChange(nuevoTexto);
  };

  const getPlaceholderText = () => {
    switch (tabValue) {
      case 1:
        return `RESULTADOS DE EXÁMENES DE LABORATORIO...

Ejemplo:
• HEMOGRAMA COMPLETO:
  - HEMOGLOBINA: 12.5 G/DL
  - HEMATOCRITO: 38%
  - LEUCOCITOS: 8000/UL
  - PLAQUETAS: 250000/UL

• QUÍMICA SANGUÍNEA:
  - GLUCOSA: 95 MG/DL
  - CREATININA: 0.9 MG/DL
  - UREA: 25 MG/DL

• ELECTROLITOS:
  - SODIO: 140 MEQ/L
  - POTASIO: 4.2 MEQ/L
  - CLORO: 100 MEQ/L

• OTROS EXÁMENES:
  - [Especificar otros resultados relevantes]`;

      case 2:
        return `RESULTADOS DE ESTUDIOS DE IMAGEN...

Ejemplo:
• RADIOGRAFÍA DE TÓRAX:
  - CAMPOS PULMONARES LIBRES
  - SILUETA CARDÍACA NORMAL
  - DIAFRAGMAS ÍNTEGROS

• ECOGRAFÍA ABDOMINAL:
  - HÍGADO: TAMAÑO Y ECOGENICIDAD NORMAL
  - VESÍCULA BILIAR: SIN ALTERACIONES
  - RIÑONES: MORFOLOGÍA CONSERVADA

• TOMOGRAFÍA COMPUTARIZADA:
  - [Describir hallazgos específicos]

• RESONANCIA MAGNÉTICA:
  - [Describir hallazgos específicos]`;

      case 3:
        return `RESULTADOS DE PROCEDIMIENTOS DIAGNÓSTICOS...

Ejemplo:
• ELECTROCARDIOGRAMA:
  - RITMO: SINUSAL NORMAL
  - FRECUENCIA: 72 LPM
  - EJE: NORMAL
  - INTERVALOS: NORMALES

• ENDOSCOPIA DIGESTIVA:
  - ESÓFAGO: MUCOSA NORMAL
  - ESTÓMAGO: GASTRITIS CRÓNICA LEVE
  - DUODENO: SIN ALTERACIONES

• BIOPSIA:
  - RESULTADO: [Especificar hallazgos histopatológicos]

• OTROS PROCEDIMIENTOS:
  - [Describir otros procedimientos realizados]`;

      default:
        return `DESCRIBIR RESULTADOS DE EXÁMENES Y PROCEDIMIENTOS DIAGNÓSTICOS RELEVANTES...

Ejemplo:
• EXÁMENES DE LABORATORIO:
  - HEMOGRAMA: HB 12.5 G/DL, LEUCOCITOS 8000/UL
  - GLUCOSA: 95 MG/DL (NORMAL)
  - CREATININA: 0.9 MG/DL (NORMAL)

• ESTUDIOS DE IMAGEN:
  - RADIOGRAFÍA DE TÓRAX: CAMPOS PULMONARES LIBRES
  - ECOGRAFÍA ABDOMINAL: ÓRGANOS SIN ALTERACIONES

• PROCEDIMIENTOS DIAGNÓSTICOS:
  - ELECTROCARDIOGRAMA: RITMO SINUSAL NORMAL
  - ENDOSCOPIA: [Describir hallazgos]

• INTERPRETACIÓN:
  - [Análisis de los resultados en conjunto]
  - [Relevancia clínica de los hallazgos]`;
    }
  };

  return (
    <Box>
      {/* Sección D: Resultados de Exámenes y Procedimientos */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 2 }}>
          <Typography
            variant="h6"
            sx={{
              mb: 1.5,
              fontWeight: "bold",
              color: "#1A3C6D",
              fontSize: "0.9rem",
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <ExamenesIcon sx={{ fontSize: '1rem' }} />
            D. RESULTADOS DE EXÁMENES Y PROCEDIMIENTOS DIAGNÓSTICOS RELEVANTES
          </Typography>

          {/* Tabs para tipos de exámenes */}
          <Paper sx={{ mb: 2, backgroundColor: '#f8f9fa' }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                '& .MuiTab-root': {
                  fontSize: '0.7rem',
                  fontWeight: 'bold',
                  minHeight: 40,
                  py: 1,
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: '#1A3C6D',
                },
              }}
            >
              <Tab
                icon={<DiagnosticoIcon sx={{ fontSize: '0.9rem' }} />}
                label="GENERAL"
                sx={{ color: '#1A3C6D' }}
              />
              <Tab
                icon={<LaboratorioIcon sx={{ fontSize: '0.9rem' }} />}
                label="LABORATORIO"
                sx={{ color: '#1A3C6D' }}
              />
              <Tab
                icon={<ImagenIcon sx={{ fontSize: '0.9rem' }} />}
                label="IMAGEN"
                sx={{ color: '#1A3C6D' }}
              />
              <Tab
                icon={<ProcedimientoIcon sx={{ fontSize: '0.9rem' }} />}
                label="PROCEDIMIENTOS"
                sx={{ color: '#1A3C6D' }}
              />
            </Tabs>
          </Paper>

          {/* Contenido de las tabs */}
          <TabPanel value={tabValue} index={0}>
            {/* Vista General */}
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                multiline
                rows={15}
                placeholder={getPlaceholderText()}
                value={examenesProcedimientos.resultados}
                onChange={(e) => handleResultadosChange(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <Box sx={{ 
                      position: 'absolute', 
                      top: 8, 
                      left: 8, 
                      zIndex: 1,
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      borderRadius: 1,
                      px: 0.5
                    }}>
                      <EditIcon sx={{ fontSize: '1rem', color: '#1A3C6D' }} />
                    </Box>
                  ),
                }}
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '0.8rem',
                    lineHeight: 1.5,
                    fontFamily: 'monospace',
                    pt: 4,
                  },
                  '& .MuiInputBase-root': {
                    backgroundColor: '#fafafa',
                  }
                }}
              />
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            {/* Vista Laboratorio */}
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                multiline
                rows={15}
                placeholder={getPlaceholderText()}
                value={examenesProcedimientos.resultados}
                onChange={(e) => handleResultadosChange(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <Box sx={{ 
                      position: 'absolute', 
                      top: 8, 
                      left: 8, 
                      zIndex: 1,
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      borderRadius: 1,
                      px: 0.5
                    }}>
                      <LaboratorioIcon sx={{ fontSize: '1rem', color: '#1A3C6D' }} />
                    </Box>
                  ),
                }}
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '0.8rem',
                    lineHeight: 1.5,
                    fontFamily: 'monospace',
                    pt: 4,
                  },
                  '& .MuiInputBase-root': {
                    backgroundColor: '#fff8e1',
                  }
                }}
              />
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            {/* Vista Imagen */}
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                multiline
                rows={15}
                placeholder={getPlaceholderText()}
                value={examenesProcedimientos.resultados}
                onChange={(e) => handleResultadosChange(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <Box sx={{ 
                      position: 'absolute', 
                      top: 8, 
                      left: 8, 
                      zIndex: 1,
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      borderRadius: 1,
                      px: 0.5
                    }}>
                      <ImagenIcon sx={{ fontSize: '1rem', color: '#1A3C6D' }} />
                    </Box>
                  ),
                }}
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '0.8rem',
                    lineHeight: 1.5,
                    fontFamily: 'monospace',
                    pt: 4,
                  },
                  '& .MuiInputBase-root': {
                    backgroundColor: '#e8f5e8',
                  }
                }}
              />
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={3}>
            {/* Vista Procedimientos */}
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                multiline
                rows={15}
                placeholder={getPlaceholderText()}
                value={examenesProcedimientos.resultados}
                onChange={(e) => handleResultadosChange(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <Box sx={{ 
                      position: 'absolute', 
                      top: 8, 
                      left: 8, 
                      zIndex: 1,
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      borderRadius: 1,
                      px: 0.5
                    }}>
                      <ProcedimientoIcon sx={{ fontSize: '1rem', color: '#1A3C6D' }} />
                    </Box>
                  ),
                }}
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '0.8rem',
                    lineHeight: 1.5,
                    fontFamily: 'monospace',
                    pt: 4,
                  },
                  '& .MuiInputBase-root': {
                    backgroundColor: '#f3e5f5',
                  }
                }}
              />
            </Box>
          </TabPanel>

          {/* Información del texto */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            <Chip
              label={`${caracteresCount} caracteres`}
              size="small"
              color={caracteresCount > 0 ? "primary" : "default"}
              sx={{ fontSize: '0.65rem' }}
            />
            <Chip
              label={`${palabrasCount} palabras`}
              size="small"
              color={palabrasCount > 0 ? "primary" : "default"}
              sx={{ fontSize: '0.65rem' }}
            />
            {examenesProcedimientos.fechaCreacion && (
              <Chip
                icon={<TiempoIcon sx={{ fontSize: '0.7rem' }} />}
                label={`Creado: ${new Date(examenesProcedimientos.fechaCreacion).toLocaleString()}`}
                size="small"
                color="success"
                sx={{ fontSize: '0.65rem' }}
              />
            )}
            {examenesProcedimientos.ultimaModificacion && examenesProcedimientos.ultimaModificacion !== examenesProcedimientos.fechaCreacion && (
              <Chip
                icon={<SaveIcon sx={{ fontSize: '0.7rem' }} />}
                label={`Modificado: ${new Date(examenesProcedimientos.ultimaModificacion).toLocaleString()}`}
                size="small"
                color="warning"
                sx={{ fontSize: '0.65rem' }}
              />
            )}
          </Box>

        </CardContent>
      </Card>

    </Box>
  );
}