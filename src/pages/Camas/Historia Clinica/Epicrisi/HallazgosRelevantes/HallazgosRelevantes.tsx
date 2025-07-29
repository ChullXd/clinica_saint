import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Divider,
  Alert,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Grid,
  Badge,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  Assignment as HallazgosIcon,
  Biotech as LaboratorioIcon,
  MonitorHeart as ElectroIcon,
  LocalHospital as ImagenIcon,
  Science as PatologiaIcon,
  MedicalServices as ProcedimientoIcon,
  ExpandMore as ExpandIcon,
  CheckCircle as NormalIcon,
  Warning as AnormalIcon,
  Error as CriticoIcon,
  TrendingUp as ElevadoIcon,
  TrendingDown as DisminuidoIcon,
  Event as FechaIcon,
  Person as MedicoIcon,
  Description as ReporteIcon,
} from "@mui/icons-material";

interface HallazgoClinico {
  id: string;
  fecha: string;
  hora: string;
  tipoExamen: 'LABORATORIO' | 'ELECTROCARDIOGRAMA' | 'IMAGEN' | 'PATOLOGIA' | 'PROCEDIMIENTO';
  categoria: string;
  nombreExamen: string;
  numeroReporte: string;
  medico: string;
  especialidad: string;
  hallazgos: string;
  interpretacion: string;
  valoracion: 'NORMAL' | 'ANORMAL' | 'CRITICO';
  parametrosRelevantes: {
    parametro: string;
    valor: string;
    valorReferencia: string;
    estado: 'NORMAL' | 'ELEVADO' | 'DISMINUIDO';
  }[];
}

export default function HallazgosRelevantes() {
  const [hallazgosRelevantes, setHallazgosRelevantes] = useState<HallazgoClinico[]>([]);
  const [expandedHallazgo, setExpandedHallazgo] = useState<string | false>(false);

  // Cargar datos simulados de hallazgos relevantes
  useEffect(() => {
    const hallazgosSimulados: HallazgoClinico[] = [
      // Laboratorios de Ingreso
      {
        id: '1',
        fecha: '2024-07-25',
        hora: '09:00',
        tipoExamen: 'LABORATORIO',
        categoria: 'MARCADORES CARDÍACOS',
        nombreExamen: 'TROPONINA I ULTRASENSIBLE + CK-MB',
        numeroReporte: 'LAB-2024-001',
        medico: 'DRA. PATRICIA MORALES',
        especialidad: 'LABORATORIO CLÍNICO',
        hallazgos: `MARCADORES CARDÍACOS DE INGRESO:

TROPONINA I ULTRASENSIBLE: 2.8 ng/mL (SIGNIFICATIVAMENTE ELEVADA)
• Valor crítico que confirma daño miocárdico agudo
• Elevación compatible con infarto agudo de miocardio
• Requiere seguimiento seriado cada 6-8 horas

CK-MB: 45 U/L (ELEVADA)
• Fracción MB 8.5% del total
• Patrón típico de lesión miocárdica
• Pico esperado en 12-24 horas

INTERPRETACIÓN CLÍNICA:
• Confirmación bioquímica de síndrome coronario agudo
• Magnitud de elevación indica infarto transmural
• Correlación clínico-electrocardiográfica positiva`,
        interpretacion: 'INFARTO AGUDO DE MIOCARDIO CONFIRMADO - ELEVACIÓN SIGNIFICATIVA DE MARCADORES',
        valoracion: 'CRITICO',
        parametrosRelevantes: [
          { parametro: 'Troponina I', valor: '2.8 ng/mL', valorReferencia: '< 0.04 ng/mL', estado: 'ELEVADO' },
          { parametro: 'CK-MB', valor: '45 U/L', valorReferencia: '< 25 U/L', estado: 'ELEVADO' },
          { parametro: 'Fracción MB', valor: '8.5%', valorReferencia: '< 6%', estado: 'ELEVADO' }
        ]
      },

      // Electrocardiograma
      {
        id: '2',
        fecha: '2024-07-25',
        hora: '08:45',
        tipoExamen: 'ELECTROCARDIOGRAMA',
        categoria: 'ECG 12 DERIVACIONES',
        nombreExamen: 'ELECTROCARDIOGRAMA DE INGRESO',
        numeroReporte: 'ECG-2024-003',
        medico: 'DR. FERNANDO LÓPEZ',
        especialidad: 'CARDIOLOGÍA',
        hallazgos: `ELECTROCARDIOGRAMA DE 12 DERIVACIONES:

RITMO Y FRECUENCIA:
• Ritmo sinusal regular a 98 latidos por minuto
• Eje eléctrico normal (+60 grados)
• Intervalos PR y QT normales

HALLAZGOS PATOLÓGICOS:
• ONDAS Q PATOLÓGICAS en derivaciones II, III, aVF
• Elevación del segmento ST > 2mm en derivaciones inferiores
• Ondas T invertidas en derivaciones II, III, aVF
• Depresión recíproca del ST en derivaciones I, aVL

LOCALIZACIÓN:
• Patrón electrocardiográfico de infarto de pared inferior
• Compromiso de arteria coronaria derecha (patrón típico)
• Sin signos de infarto posterior asociado

EVOLUCIÓN:
• Cambios agudos establecidos
• Patrón evolutivo de menos de 6 horas`,
        interpretacion: 'INFARTO AGUDO DE MIOCARDIO DE PARED INFERIOR - PATRÓN ELECTROCARDIOGRÁFICO TÍPICO',
        valoracion: 'CRITICO',
        parametrosRelevantes: [
          { parametro: 'Ondas Q', valor: 'Presentes', valorReferencia: 'Ausentes', estado: 'ELEVADO' },
          { parametro: 'Elevación ST', valor: '3 mm', valorReferencia: '< 1 mm', estado: 'ELEVADO' },
          { parametro: 'Frecuencia', valor: '98 lpm', valorReferencia: '60-100 lpm', estado: 'NORMAL' }
        ]
      },

      // Ecocardiograma
      {
        id: '3',
        fecha: '2024-07-26',
        hora: '10:30',
        tipoExamen: 'IMAGEN',
        categoria: 'ECOCARDIOGRAFÍA',
        nombreExamen: 'ECOCARDIOGRAMA TRANSTORÁCICO',
        numeroReporte: 'ECO-2024-015',
        medico: 'DR. FERNANDO LÓPEZ CARDENAS',
        especialidad: 'CARDIOLOGÍA',
        hallazgos: `ECOCARDIOGRAMA TRANSTORÁCICO BIDIMENSIONAL:

FUNCIÓN SISTÓLICA:
• Fracción de eyección del ventrículo izquierdo: 45% (LEVEMENTE DEPRIMIDA)
• Volumen sistólico: 65 ml (NORMAL)
• Gasto cardíaco: 4.8 L/min (NORMAL)

ALTERACIONES SEGMENTARIAS:
• HIPOCINESIA SEVERA de pared inferior basal y media
• ACINESIA focal en segmento inferior basal
• Contractilidad normal en el resto de segmentos
• Función del ventrículo derecho normal

ESTRUCTURA CARDÍACA:
• Dimensiones del VI: 52 mm (diástole), 38 mm (sístole)
• Grosor septal: 11 mm, pared posterior: 10 mm
• Aurículas de tamaño normal
• Válvulas estructuralmente normales

FUNCIÓN DIASTÓLICA:
• Patrón de llenado con alteración de la relajación grado I
• Relación E/A: 0.8 (levemente alterada)
• Sin evidencia de hipertensión pulmonar`,
        interpretacion: 'DISFUNCIÓN SISTÓLICA LEVE REGIONAL - HIPOCINESIA INFERIOR POST-INFARTO',
        valoracion: 'ANORMAL',
        parametrosRelevantes: [
          { parametro: 'Fracción eyección', valor: '45%', valorReferencia: '> 55%', estado: 'DISMINUIDO' },
          { parametro: 'Dimensión VI', valor: '52 mm', valorReferencia: '< 56 mm', estado: 'NORMAL' },
          { parametro: 'Grosor septal', valor: '11 mm', valorReferencia: '< 12 mm', estado: 'NORMAL' }
        ]
      },

      // Laboratorios de Control
      {
        id: '4',
        fecha: '2024-07-27',
        hora: '06:00',
        tipoExamen: 'LABORATORIO',
        categoria: 'PERFIL COMPLETO',
        nombreExamen: 'HEMOGRAMA + QUÍMICA SANGUÍNEA + PERFIL LIPÍDICO',
        numeroReporte: 'LAB-2024-008',
        medico: 'DRA. PATRICIA MORALES',
        especialidad: 'LABORATORIO CLÍNICO',
        hallazgos: `PERFIL BIOQUÍMICO DE CONTROL DÍA 3:

HEMOGRAMA:
• Hemoglobina: 13.8 g/dL (NORMAL)
• Hematocrito: 41.2% (NORMAL)
• Leucocitos: 8,200/μL (NORMAL)
• Plaquetas: 245,000/μL (NORMAL)

FUNCIÓN RENAL:
• Creatinina: 1.1 mg/dL (NORMAL)
• BUN: 18 mg/dL (NORMAL)
• Depuración creatinina estimada: 78 mL/min (NORMAL)

PERFIL LIPÍDICO:
• Colesterol total: 245 mg/dL (ELEVADO)
• LDL colesterol: 165 mg/dL (ELEVADO)
• HDL colesterol: 38 mg/dL (DISMINUIDO)
• Triglicéridos: 185 mg/dL (NORMAL ALTO)

ELECTROLITOS:
• Sodio: 142 mEq/L, Potasio: 4.1 mEq/L (NORMALES)
• Magnesio: 1.9 mg/dL (NORMAL)

MARCADORES INFLAMATORIOS:
• PCR: 12.5 mg/L (ELEVADA - post-infarto)`,
        interpretacion: 'DISLIPIDEMIA SIGNIFICATIVA - FACTOR DE RIESGO CARDIOVASCULAR MAYOR',
        valoracion: 'ANORMAL',
        parametrosRelevantes: [
          { parametro: 'Colesterol total', valor: '245 mg/dL', valorReferencia: '< 200 mg/dL', estado: 'ELEVADO' },
          { parametro: 'LDL colesterol', valor: '165 mg/dL', valorReferencia: '< 100 mg/dL', estado: 'ELEVADO' },
          { parametro: 'HDL colesterol', valor: '38 mg/dL', valorReferencia: '> 40 mg/dL', estado: 'DISMINUIDO' },
          { parametro: 'Creatinina', valor: '1.1 mg/dL', valorReferencia: '0.7-1.3 mg/dL', estado: 'NORMAL' }
        ]
      },

      // Radiografía de Tórax
      {
        id: '5',
        fecha: '2024-07-25',
        hora: '11:15',
        tipoExamen: 'IMAGEN',
        categoria: 'RADIOGRAFÍA',
        nombreExamen: 'RADIOGRAFÍA DE TÓRAX PA Y LATERAL',
        numeroReporte: 'RX-2024-045',
        medico: 'DR. RICARDO VARGAS',
        especialidad: 'RADIOLOGÍA',
        hallazgos: `RADIOGRAFÍA DE TÓRAX POSTEROANTERIOR Y LATERAL:

CAMPOS PULMONARES:
• CONGESTIÓN VASCULAR PULMONAR BILATERAL
• Redistribución vascular hacia campos superiores
• Líneas B de Kerley visibles en bases pulmonares
• Pequeño derrame pleural bilateral (más evidente a la derecha)

SILUETA CARDÍACA:
• Cardiomegalia leve (ICT: 0.52)
• Configuración sugestiva de crecimiento auricular izquierdo
• Botón aórtico de características normales

MEDIASTINO Y HILIOS:
• Hilios pulmonares congestivos
• Mediastino superior normal
• Sin adenopatías visibles

ESQUELETO TORÁCICO:
• Estructuras óseas sin alteraciones
• Espacios intercostales conservados

IMPRESIÓN DIAGNÓSTICA:
• Insuficiencia cardíaca congestiva
• Edema pulmonar intersticial leve
• Cardiomegalia leve`,
        interpretacion: 'INSUFICIENCIA CARDÍACA CONGESTIVA CON EDEMA PULMONAR INTERSTICIAL',
        valoracion: 'ANORMAL',
        parametrosRelevantes: [
          { parametro: 'ICT', valor: '0.52', valorReferencia: '< 0.50', estado: 'ELEVADO' },
          { parametro: 'Congestión', valor: 'Presente', valorReferencia: 'Ausente', estado: 'ELEVADO' },
          { parametro: 'Derrame pleural', valor: 'Leve bilateral', valorReferencia: 'Ausente', estado: 'ELEVADO' }
        ]
      },

      // Troponinas de seguimiento
      {
        id: '6',
        fecha: '2024-07-28',
        hora: '06:30',
        tipoExamen: 'LABORATORIO',
        categoria: 'MARCADORES CARDÍACOS',
        nombreExamen: 'TROPONINA I - CONTROL FINAL',
        numeroReporte: 'LAB-2024-015',
        medico: 'DRA. PATRICIA MORALES',
        especialidad: 'LABORATORIO CLÍNICO',
        hallazgos: `MARCADORES CARDÍACOS - CONTROL PRE-ALTA:

TROPONINA I ULTRASENSIBLE: 0.45 ng/mL (EN DESCENSO)
• Descenso significativo desde el pico inicial (2.8 ng/mL)
• Curva descendente típica post-infarto (día 4)
• Aún elevada pero tendencia favorable
• Correlación con mejoría clínica

COMPARACIÓN EVOLUTIVA:
• Día 1: 2.8 ng/mL (PICO MÁXIMO)
• Día 2: 1.8 ng/mL (DESCENSO)
• Día 3: 0.92 ng/mL (DESCENSO PROGRESIVO)
• Día 4: 0.45 ng/mL (DESCENSO MANTENIDO)

INTERPRETACIÓN:
• Patrón evolutivo normal post-infarto
• Ausencia de re-infarto o extensión
• Marcador pronóstico favorable
• Compatible con alta médica`,
        interpretacion: 'NORMALIZACIÓN PROGRESIVA DE MARCADORES - EVOLUCIÓN FAVORABLE POST-INFARTO',
        valoracion: 'NORMAL',
        parametrosRelevantes: [
          { parametro: 'Troponina I actual', valor: '0.45 ng/mL', valorReferencia: '< 0.04 ng/mL', estado: 'DISMINUIDO' },
          { parametro: 'Tendencia', valor: 'Descendente', valorReferencia: 'Descendente', estado: 'NORMAL' },
          { parametro: 'Reducción', valor: '84%', valorReferencia: '> 50%', estado: 'NORMAL' }
        ]
      }
    ];

    setHallazgosRelevantes(hallazgosSimulados);
  }, []);

  const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedHallazgo(isExpanded ? panel : false);
  };

  const getIconByTipo = (tipo: string) => {
    switch (tipo) {
      case 'LABORATORIO': return <LaboratorioIcon sx={{ fontSize: '1rem', color: '#e91e63' }} />;
      case 'ELECTROCARDIOGRAMA': return <ElectroIcon sx={{ fontSize: '1rem', color: '#f44336' }} />;
      case 'IMAGEN': return <ImagenIcon sx={{ fontSize: '1rem', color: '#3f51b5' }} />;
      case 'PATOLOGIA': return <PatologiaIcon sx={{ fontSize: '1rem', color: '#9c27b0' }} />;
      case 'PROCEDIMIENTO': return <ProcedimientoIcon sx={{ fontSize: '1rem', color: '#ff9800' }} />;
      default: return <HallazgosIcon sx={{ fontSize: '1rem', color: '#666' }} />;
    }
  };

  const getColorByTipo = (tipo: string) => {
    switch (tipo) {
      case 'LABORATORIO': return '#fce4ec';
      case 'ELECTROCARDIOGRAMA': return '#ffebee';
      case 'IMAGEN': return '#e8eaf6';
      case 'PATOLOGIA': return '#f3e5f5';
      case 'PROCEDIMIENTO': return '#fff3e0';
      default: return '#f5f5f5';
    }
  };

  const getIconByValoracion = (valoracion: string) => {
    switch (valoracion) {
      case 'NORMAL': return <NormalIcon sx={{ fontSize: '1rem', color: '#4caf50' }} />;
      case 'ANORMAL': return <AnormalIcon sx={{ fontSize: '1rem', color: '#ff9800' }} />;
      case 'CRITICO': return <CriticoIcon sx={{ fontSize: '1rem', color: '#f44336' }} />;
      default: return <NormalIcon sx={{ fontSize: '1rem', color: '#666' }} />;
    }
  };

  const getIconByEstado = (estado: string) => {
    switch (estado) {
      case 'ELEVADO': return <ElevadoIcon sx={{ fontSize: '0.8rem', color: '#f44336' }} />;
      case 'DISMINUIDO': return <DisminuidoIcon sx={{ fontSize: '0.8rem', color: '#2196f3' }} />;
      case 'NORMAL': return <NormalIcon sx={{ fontSize: '0.8rem', color: '#4caf50' }} />;
      default: return <NormalIcon sx={{ fontSize: '0.8rem', color: '#666' }} />;
    }
  };

  const totalHallazgosCriticos = hallazgosRelevantes.filter(h => h.valoracion === 'CRITICO').length;
  const totalHallazgosAnormales = hallazgosRelevantes.filter(h => h.valoracion === 'ANORMAL').length;

  return (
    <Box>
      {/* Sección D: Hallazgos Relevantes */}
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
            <HallazgosIcon sx={{ fontSize: '1rem' }} />
            D. HALLAZGOS RELEVANTES DE EXÁMENES Y PROCEDIMIENTOS DIAGNÓSTICOS
          </Typography>

          {/* Información estadística */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            <Chip
              icon={<ReporteIcon sx={{ fontSize: '0.7rem' }} />}
              label={`${hallazgosRelevantes.length} estudios realizados`}
              size="small"
              color="primary"
              sx={{ fontSize: '0.65rem', fontWeight: 'bold' }}
            />
            <Chip
              icon={<LaboratorioIcon sx={{ fontSize: '0.7rem' }} />}
              label={`${hallazgosRelevantes.filter(h => h.tipoExamen === 'LABORATORIO').length} Laboratorios`}
              size="small"
              color="secondary"
              sx={{ fontSize: '0.65rem' }}
            />
            <Chip
              icon={<ImagenIcon sx={{ fontSize: '0.7rem' }} />}
              label={`${hallazgosRelevantes.filter(h => h.tipoExamen === 'IMAGEN').length} Imágenes`}
              size="small"
              color="info"
              sx={{ fontSize: '0.65rem' }}
            />
            <Chip
              icon={<CriticoIcon sx={{ fontSize: '0.7rem' }} />}
              label={`${totalHallazgosCriticos} Críticos`}
              size="small"
              color="error"
              sx={{ fontSize: '0.65rem' }}
            />
            <Chip
              icon={<AnormalIcon sx={{ fontSize: '0.7rem' }} />}
              label={`${totalHallazgosAnormales} Anormales`}
              size="small"
              color="warning"
              sx={{ fontSize: '0.65rem' }}
            />
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* Lista de hallazgos */}
          {hallazgosRelevantes.length === 0 ? (
            <Alert severity="info" sx={{ fontSize: '0.7rem' }}>
              No hay hallazgos de exámenes diagnósticos disponibles para este paciente.
            </Alert>
          ) : (
            <Box>
              <Typography
                variant="subtitle1"
                sx={{
                  mb: 1.5,
                  fontWeight: "bold",
                  color: "#1A3C6D",
                  fontSize: "0.8rem",
                }}
              >
             CRONOLOGÍA DE ESTUDIOS DIAGNÓSTICOS:
              </Typography>

              {hallazgosRelevantes.map((hallazgo, index) => (
                <Accordion
                  key={hallazgo.id}
                  expanded={expandedHallazgo === hallazgo.id}
                  onChange={handleAccordionChange(hallazgo.id)}
                  sx={{ 
                    mb: 1.5,
                    border: '1px solid #ddd',
                    borderRadius: 1,
                    '&:before': { display: 'none' }
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandIcon />}
                    sx={{ 
                      backgroundColor: getColorByTipo(hallazgo.tipoExamen),
                      borderRadius: 1,
                      minHeight: 60
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                      {/* Ícono y tipo */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {getIconByTipo(hallazgo.tipoExamen)}
                        <Badge badgeContent={index + 1} color="primary">
                          <Chip
                            label={hallazgo.tipoExamen}
                            size="small"
                            color="primary"
                            sx={{ fontSize: '0.65rem', fontWeight: 'bold' }}
                          />
                        </Badge>
                      </Box>

                      {/* Información principal */}
                      <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#333' }}>
                          {hallazgo.nombreExamen}
                        </Typography>
                        <Typography sx={{ fontSize: '0.7rem', color: '#666' }}>
                          {hallazgo.fecha} - {hallazgo.hora} | {hallazgo.categoria}
                        </Typography>
                        <Typography sx={{ fontSize: '0.65rem', color: '#666', fontStyle: 'italic' }}>
                          {hallazgo.especialidad} - {hallazgo.medico}
                        </Typography>
                      </Box>

                      {/* Valoración */}
                      <Box sx={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: 1 }}>
                        {getIconByValoracion(hallazgo.valoracion)}
                        <Chip
                          label={hallazgo.valoracion}
                          size="small"
                          color={
                            hallazgo.valoracion === 'NORMAL' ? 'success' :
                            hallazgo.valoracion === 'ANORMAL' ? 'warning' : 'error'
                          }
                          sx={{ fontSize: '0.6rem', fontWeight: 'bold' }}
                        />
                      </Box>
                    </Box>
                  </AccordionSummary>

                  <AccordionDetails sx={{ backgroundColor: '#fafafa' }}>
                    {/* Interpretación principal */}
                    <Paper variant="outlined" sx={{ p: 1.5, mb: 2, backgroundColor: '#e8f4fd' }}>
                      <Typography sx={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#1565c0', mb: 0.5 }}>
                        INTERPRETACIÓN CLÍNICA:
                      </Typography>
                      <Typography sx={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#333' }}>
                        {hallazgo.interpretacion}
                      </Typography>
                    </Paper>

                    {/* Parámetros relevantes */}
                    {hallazgo.parametrosRelevantes.length > 0 && (
                      <Paper variant="outlined" sx={{ p: 1.5, mb: 2, backgroundColor: 'white' }}>
                        <Typography sx={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#1A3C6D', mb: 1 }}>
                          PARÁMETROS RELEVANTES:
                        </Typography>
                        <TableContainer>
                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell sx={{ fontSize: '0.65rem', fontWeight: 'bold', py: 0.5 }}>PARÁMETRO</TableCell>
                                <TableCell sx={{ fontSize: '0.65rem', fontWeight: 'bold', py: 0.5 }}>VALOR</TableCell>
                                <TableCell sx={{ fontSize: '0.65rem', fontWeight: 'bold', py: 0.5 }}>REFERENCIA</TableCell>
                                <TableCell sx={{ fontSize: '0.65rem', fontWeight: 'bold', py: 0.5 }}>ESTADO</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {hallazgo.parametrosRelevantes.map((param, idx) => (
                                <TableRow key={idx}>
                                  <TableCell sx={{ fontSize: '0.65rem', py: 0.5 }}>{param.parametro}</TableCell>
                                  <TableCell sx={{ fontSize: '0.65rem', py: 0.5, fontWeight: 'bold' }}>
                                    {param.valor}
                                  </TableCell>
                                  <TableCell sx={{ fontSize: '0.6rem', py: 0.5, color: '#666' }}>
                                    {param.valorReferencia}
                                  </TableCell>
                                  <TableCell sx={{ fontSize: '0.6rem', py: 0.5 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                      {getIconByEstado(param.estado)}
                                      <Typography sx={{ fontSize: '0.6rem', fontWeight: 'bold' }}>
                                        {param.estado}
                                      </Typography>
                                    </Box>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Paper>
                    )}

                    {/* Hallazgos detallados */}
                    <Paper variant="outlined" sx={{ p: 1.5, mb: 2, backgroundColor: 'white' }}>
                      <Typography sx={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#1A3C6D', mb: 1 }}>
                        HALLAZGOS DETALLADOS:
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '0.7rem',
                          lineHeight: 1.5,
                          color: '#333',
                          whiteSpace: 'pre-line',
                          fontFamily: 'monospace'
                        }}
                      >
                        {hallazgo.hallazgos}
                      </Typography>
                    </Paper>

                    {/* Información adicional */}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      <Chip
                        icon={<FechaIcon sx={{ fontSize: '0.6rem' }} />}
                        label={`${hallazgo.fecha} ${hallazgo.hora}`}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: '0.6rem' }}
                      />
                      <Chip
                        icon={<MedicoIcon sx={{ fontSize: '0.6rem' }} />}
                        label={hallazgo.medico}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: '0.6rem' }}
                      />
                      <Chip
                        label={hallazgo.numeroReporte}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: '0.6rem' }}
                      />
                    </Box>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          )}
        </CardContent>
      </Card>

    </Box>
  );
}