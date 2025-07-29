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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
} from '@mui/material';
import {
  LocalHospital as InterconsultaIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Timer as TiempoIcon,
  MedicalServices as ClinicoIcon,
  Healing as SintomaIcon,
  Psychology as ExamenIcon,
  Assignment as HallazgoIcon,
  ExpandMore as ExpandIcon,
  Visibility as ObservacionIcon,
} from "@mui/icons-material";

interface CuadroClinicoData {
  descripcion: string;
  fechaCreacion: string;
  ultimaModificacion: string;
}

export default function InterconsultaI() {
  const [cuadroClinico, setCuadroClinico] = useState<CuadroClinicoData>({
    descripcion: '',
    fechaCreacion: '',
    ultimaModificacion: '',
  });

  const [expandedSugerencias, setExpandedSugerencias] = useState<string | false>(false);

  const handleDescripcionChange = (value: string) => {
    const now = new Date().toISOString();
    setCuadroClinico(prev => ({
      ...prev,
      descripcion: value.toUpperCase(),
      fechaCreacion: prev.fechaCreacion || now,
      ultimaModificacion: now,
    }));
  };

  const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedSugerencias(isExpanded ? panel : false);
  };

  // Contar caracteres y palabras
  const caracteresCount = cuadroClinico.descripcion.length;
  const palabrasCount = cuadroClinico.descripcion.trim() ? 
    cuadroClinico.descripcion.trim().split(/\s+/).length : 0;

  // Sugerencias categorizadas de cuadro clínico
  const sugerenciasSintomatologia = [
    "DOLOR ABDOMINAL DIFUSO DE MODERADA INTENSIDAD",
    "CEFALEA FRONTAL PULSÁTIL DE 6 HORAS DE EVOLUCIÓN",
    "DISNEA DE MEDIANOS ESFUERZOS PROGRESIVA",
    "FIEBRE DE 38.5°C ASOCIADA A ESCALOFRÍOS",
    "NÁUSEAS Y VÓMITOS POSTPRANDIALES",
    "DOLOR TORÁCICO OPRESIVO RETROESTERNAL",
    "ASTENIA Y ADINAMIA DE VARIOS DÍAS DE EVOLUCIÓN",
    "PALPITACIONES Y SENSACIÓN DE DISNEA"
  ];

  const sugerenciasExamenFisico = [
    "PACIENTE CONSCIENTE, ORIENTADO, COLABORADOR",
    "SIGNOS VITALES: TA 120/80, FC 80 LPM, FR 20 RPM, T° 36.5°C",
    "MUCOSAS HIDRATADAS, PALIDEZ CONJUNTIVAL LEVE",
    "CUELLO SIN ADENOPATÍAS PALPABLES",
    "TÓRAX SIMÉTRICO, EXPANSIBILIDAD CONSERVADA",
    "RUIDOS CARDÍACOS RÍTMICOS, NO SOPLOS",
    "ABDOMEN BLANDO, DEPRESIBLE, NO DOLOROSO",
    "EXTREMIDADES SIN EDEMA, PULSOS PERIFÉRICOS PRESENTES"
  ];

  const sugerenciasHallazgos = [
    "SOPLO SISTÓLICO GRADO II/VI EN FOCO MITRAL",
    "HEPATOMEGALIA DE 3 CM BAJO REBORDE COSTAL",
    "MASA PALPABLE EN HIPOCONDRIO DERECHO",
    "ADENOPATÍAS CERVICALES MÚLTIPLES MÓVILES",
    "EDEMA EN MIEMBROS INFERIORES CON FÓVEA",
    "ICTERICIA DE ESCLERAS Y MUCOSAS",
    "DISTENSIÓN ABDOMINAL CON TIMPANISMO",
    "LESIONES CUTÁNEAS ERITEMATOSAS GENERALIZADAS"
  ];

  const sugerenciasObservaciones = [
    "EVOLUCIÓN CLÍNICA FAVORABLE EN LAS ÚLTIMAS 24 HORAS",
    "RESPUESTA PARCIAL AL TRATAMIENTO INSTAURADO",
    "REQUIERE EVALUACIÓN ESPECIALIZADA URGENTE",
    "PACIENTE EN CONDICIONES ESTABLES PARA TRASLADO",
    "NECESARIO SEGUIMIENTO ESTRECHO DE FUNCIÓN RENAL",
    "CONSIDERAR ESTUDIOS COMPLEMENTARIOS ADICIONALES",
    "VIGILANCIA DE SIGNOS DE COMPLICACIONES",
    "PRONÓSTICO RESERVADO POR COMORBILIDADES"
  ];

  const agregarSugerencia = (sugerencia: string) => {
    const textoActual = cuadroClinico.descripcion;
    const nuevoTexto = textoActual ? 
      `${textoActual}\n• ${sugerencia}` : 
      `• ${sugerencia}`;
    handleDescripcionChange(nuevoTexto);
  };

  return (
    <Box>
      {/* Sección B: Cuadro Clínico de Interconsulta */}
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
            <InterconsultaIcon sx={{ fontSize: '1rem' }} />
            B. CUADRO CLÍNICO DE INTERCONSULTA
          </Typography>

          {/* Campo de texto libre */}
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              multiline
              rows={15}
              placeholder="DESCRIBIR EL CUADRO CLÍNICO ENCONTRADO EN LA INTERCONSULTA...

Ejemplo:
SINTOMATOLOGÍA ACTUAL:
• DOLOR ABDOMINAL DIFUSO DE MODERADA INTENSIDAD
• NÁUSEAS Y VÓMITOS POSTPRANDIALES
• FIEBRE DE 38.5°C ASOCIADA A ESCALOFRÍOS
• ASTENIA Y ADINAMIA DE 3 DÍAS DE EVOLUCIÓN

EXAMEN FÍSICO:
• PACIENTE CONSCIENTE, ORIENTADO, COLABORADOR
• SIGNOS VITALES: TA 130/85, FC 95 LPM, FR 22 RPM, T° 38.5°C
• MUCOSAS HIDRATADAS, PALIDEZ CONJUNTIVAL LEVE
• ABDOMEN BLANDO, DEPRESIBLE, DOLOR EN EPIGASTRIO

HALLAZGOS RELEVANTES:
• HEPATOMEGALIA DE 2 CM BAJO REBORDE COSTAL
• MURPHY POSITIVO
• RUIDOS INTESTINALES DISMINUIDOS

OBSERVACIONES CLÍNICAS:
• EVOLUCIÓN CLÍNICA ESTABLE EN LAS ÚLTIMAS 12 HORAS
• RESPUESTA PARCIAL AL TRATAMIENTO ANALGÉSICO
• REQUIERE VIGILANCIA ESTRECHA DE SIGNOS VITALES"
              value={cuadroClinico.descripcion}
              onChange={(e) => handleDescripcionChange(e.target.value)}
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
            {cuadroClinico.fechaCreacion && (
              <Chip
                icon={<TiempoIcon sx={{ fontSize: '0.7rem' }} />}
                label={`Creado: ${new Date(cuadroClinico.fechaCreacion).toLocaleString()}`}
                size="small"
                color="success"
                sx={{ fontSize: '0.65rem' }}
              />
            )}
            {cuadroClinico.ultimaModificacion && cuadroClinico.ultimaModificacion !== cuadroClinico.fechaCreacion && (
              <Chip
                icon={<SaveIcon sx={{ fontSize: '0.7rem' }} />}
                label={`Modificado: ${new Date(cuadroClinico.ultimaModificacion).toLocaleString()}`}
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