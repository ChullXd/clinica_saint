import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Divider,
  Alert,
  Paper,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

// Timeline components from Lab
import {
  Timeline,
  TimelineItem,
  TimelineContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
} from '@mui/lab';

import {
  Timeline as EvolucionIcon,
  LocalHospital as ComplicacionIcon,
  Event as FechaIcon,
  Person as MedicoIcon,
  TrendingUp as MejoriaIcon,
  TrendingDown as EmpeorIcon,
  TrendingFlat as EstableIcon,
  ExpandMore as ExpandIcon,
  Assignment as NotaIcon,
} from "@mui/icons-material";

interface EvolucionMedica {
  id: string;
  fecha: string;
  hora: string;
  dia: number;
  especialidad: string;
  medico: string;
  numeroDocumento: string;
  evolucionClinica: string;
  complicaciones: string[];
  tendenciaEvolucion: 'MEJORIA' | 'ESTABLE' | 'EMPEORAMIENTO';
  tratamientoRealizado: string;
  observaciones: string;
  signosVitales: {
    ta: string;
    fc: string;
    fr: string;
    temperatura: string;
    saturacion: string;
  };
}

export default function ResumenEvolucion() {
  const [evolucionesMedicas, setEvolucionesMedicas] = useState<EvolucionMedica[]>([]);
  const [expandedEvolucion, setExpandedEvolucion] = useState<string | false>(false);

  // Cargar datos simulados de evoluciones médicas
  useEffect(() => {
    const evolucionesSimuladas: EvolucionMedica[] = [
      // Día 1 - Ingreso
      {
        id: '1',
        fecha: '2024-07-25',
        hora: '20:00',
        dia: 1,
        especialidad: 'MEDICINA INTERNA',
        medico: 'DR. CARLOS MENDOZA RIVERA',
        numeroDocumento: 'EVO-2024-001-D1',
        evolucionClinica: `PRIMERA EVOLUCIÓN - DÍA 1 DE HOSPITALIZACIÓN:

ESTADO CLÍNICO:
• PACIENTE INGRESADO POR SÍNDROME CORONARIO AGUDO
• DOLOR TORÁCICO OPRESIVO RETROESTERNAL MODERADO
• DISNEA DE MEDIANOS ESFUERZOS
• SUDORACIÓN PROFUSA AL INGRESO

RESPUESTA AL TRATAMIENTO INICIAL:
• ADMINISTRACIÓN DE OXÍGENO SUPLEMENTARIO
• ANALGESIA CON MORFINA 5 MG IV
• NITROGLICERINA SUBLINGUAL CON MEJORÍA PARCIAL
• DIURÉTICOS PARA MANEJO DE SOBRECARGA

TOLERANCIA:
• BUENA TOLERANCIA AL TRATAMIENTO
• MEJORÍA PARCIAL DEL DOLOR TORÁCICO
• PERSISTE DISNEA LEVE
• PACIENTE CONSCIENTE Y COLABORADOR`,
        complicaciones: [],
        tendenciaEvolucion: 'MEJORIA',
        tratamientoRealizado: 'OXÍGENO, MORFINA, NITROGLICERINA, FUROSEMIDA',
        observaciones: 'INICIO DE TRATAMIENTO CON RESPUESTA FAVORABLE',
        signosVitales: {
          ta: '150/95',
          fc: '98',
          fr: '24',
          temperatura: '36.8',
          saturacion: '92'
        }
      },

      // Día 2 - Mejoría
      {
        id: '2',
        fecha: '2024-07-26',
        hora: '07:00',
        dia: 2,
        especialidad: 'MEDICINA INTERNA',
        medico: 'DR. CARLOS MENDOZA RIVERA',
        numeroDocumento: 'EVO-2024-002-D2',
        evolucionClinica: `EVOLUCIÓN DÍA 2 - MEJORÍA PROGRESIVA:

ESTADO CLÍNICO ACTUAL:
• AUSENCIA DE DOLOR TORÁCICO EN LAS ÚLTIMAS 8 HORAS
• DISNEA SIGNIFICATIVAMENTE MEJORADA
• MEJOR TOLERANCIA AL DECÚBITO
• APETITO PARCIALMENTE RECUPERADO

EVALUACIÓN FÍSICA:
• PACIENTE HEMODINÁMICAMENTE ESTABLE
• DISMINUCIÓN DE ESTERTORES PULMONARES
• REDUCCIÓN DEL EDEMA EN MIEMBROS INFERIORES
• RUIDOS CARDÍACOS RÍTMICOS

RESPUESTA AL TRATAMIENTO:
• EXCELENTE RESPUESTA A DIURÉTICOS
• BALANCE HÍDRICO NEGATIVO 1200 ML
• NORMALIZACIÓN PROGRESIVA DE PARÁMETROS
• CONTINÚA ESQUEMA CARDIOLÓGICO`,
        complicaciones: [],
        tendenciaEvolucion: 'MEJORIA',
        tratamientoRealizado: 'CONTINÚA DIURÉTICOS, IECA, BETABLOQUEADORES',
        observaciones: 'EVOLUCIÓN FAVORABLE SIN COMPLICACIONES',
        signosVitales: {
          ta: '135/85',
          fc: '85',
          fr: '20',
          temperatura: '36.5',
          saturacion: '95'
        }
      },

      // Día 2 - Tarde (Complicación menor)
      {
        id: '3',
        fecha: '2024-07-26',
        hora: '18:30',
        dia: 2,
        especialidad: 'MEDICINA INTERNA',
        medico: 'DRA. MARÍA GONZÁLEZ LÓPEZ',
        numeroDocumento: 'EVO-2024-003-D2B',
        evolucionClinica: `EVOLUCIÓN VESPERTINA DÍA 2 - EPISODIO MENOR:

INCIDENCIA CLÍNICA:
• EPISODIO DE DOLOR PRECORDIAL LEVE A LAS 17:00
• DURACIÓN APROXIMADA 15 MINUTOS
• RELACIONADO CON ESFUERZO FÍSICO (IDA AL BAÑO)
• MEJORÍA ESPONTÁNEA CON REPOSO

EVALUACIÓN INMEDIATA:
• ECG DE CONTROL SIN CAMBIOS AGUDOS
• SIGNOS VITALES ESTABLES
• AUSENCIA DE SIGNOS DE ALARMA
• TROPONINAS DE CONTROL PENDIENTES

MANEJO REALIZADO:
• REFUERZO DE MEDIDAS DE REPOSO
• CONTROL ESTRICTO DE SIGNOS VITALES
• EDUCACIÓN SOBRE LIMITACIÓN DE ACTIVIDADES
• VIGILANCIA CARDIOLÓGICA CONTINUA`,
        complicaciones: ['EPISODIO DE DOLOR PRECORDIAL LEVE RELACIONADO CON ESFUERZO'],
        tendenciaEvolucion: 'ESTABLE',
        tratamientoRealizado: 'REPOSO, VIGILANCIA, EDUCACIÓN AL PACIENTE',
        observaciones: 'COMPLICACIÓN MENOR RESUELTA ESPONTÁNEAMENTE',
        signosVitales: {
          ta: '140/88',
          fc: '92',
          fr: '22',
          temperatura: '36.7',
          saturacion: '94'
        }
      },

      // Día 3 - Estable
      {
        id: '4',
        fecha: '2024-07-27',
        hora: '08:15',
        dia: 3,
        especialidad: 'MEDICINA INTERNA',
        medico: 'DR. CARLOS MENDOZA RIVERA',
        numeroDocumento: 'EVO-2024-004-D3',
        evolucionClinica: `EVOLUCIÓN DÍA 3 - ESTABILIDAD CLÍNICA:

ESTADO CLÍNICO:
• PACIENTE ASINTOMÁTICO PARA DOLOR TORÁCICO
• AUSENCIA DE DISNEA EN REPOSO
• TOLERANCIA ADECUADA A ACTIVIDADES BÁSICAS
• ESTADO GENERAL SATISFACTORIO

EVALUACIÓN POST-INTERCONSULTA:
• VALORACIÓN CARDIOLÓGICA COMPLETADA
• CONFIRMACIÓN DE INFARTO DE PARED INFERIOR
• FRACCIÓN DE EYECCIÓN 45% (LEVEMENTE DEPRIMIDA)
• INDICACIÓN DE MANEJO MÉDICO CONSERVADOR

PARACLÍNICOS DE CONTROL:
• TROPONINAS EN DESCENSO PROGRESIVO
• FUNCIÓN RENAL CONSERVADA
• ELECTROLITOS EN RANGOS NORMALES
• PERFIL LIPÍDICO PENDIENTE`,
        complicaciones: [],
        tendenciaEvolucion: 'ESTABLE',
        tratamientoRealizado: 'MANEJO MÉDICO SEGÚN RECOMENDACIONES CARDIOLÓGICAS',
        observaciones: 'ESTABILIDAD CLÍNICA MANTENIDA, CUMPLE OBJETIVOS TERAPÉUTICOS',
        signosVitales: {
          ta: '130/82',
          fc: '82',
          fr: '18',
          temperatura: '36.4',
          saturacion: '96'
        }
      },

      // Día 4 - Excelente evolución
      {
        id: '5',
        fecha: '2024-07-28',
        hora: '07:30',
        dia: 4,
        especialidad: 'MEDICINA INTERNA',
        medico: 'DR. CARLOS MENDOZA RIVERA',
        numeroDocumento: 'EVO-2024-005-D4',
        evolucionClinica: `EVOLUCIÓN DÍA 4 - PREPARACIÓN PARA ALTA:

ESTADO CLÍNICO EXCELENTE:
• PACIENTE COMPLETAMENTE ASINTOMÁTICO
• DEAMBULACIÓN SIN LIMITACIONES
• TOLERANCIA ALIMENTARIA COMPLETA
• SUEÑO REPARADOR

EVALUACIÓN FÍSICA:
• SIGNOS VITALES COMPLETAMENTE NORMALES
• CAMPOS PULMONARES LIMPIOS
• RUIDOS CARDÍACOS NORMALES
• AUSENCIA TOTAL DE EDEMAS

PREPARACIÓN PARA ALTA:
• EDUCACIÓN SOBRE MEDICACIÓN CRÓNICA
• RECOMENDACIONES DE ESTILO DE VIDA
• PLAN DE SEGUIMIENTO CARDIOLÓGICO
• SIGNOS DE ALARMA EXPLICADOS

CRITERIOS DE ALTA CUMPLIDOS:
• ESTABILIDAD HEMODINÁMICA 48 HORAS
• AUSENCIA DE COMPLICACIONES
• COMPRENSIÓN DEL TRATAMIENTO
• RED DE APOYO FAMILIAR DISPONIBLE`,
        complicaciones: [],
        tendenciaEvolucion: 'MEJORIA',
        tratamientoRealizado: 'MEDICACIÓN ORAL, EDUCACIÓN, PREPARACIÓN ALTA',
        observaciones: 'CRITERIOS DE ALTA MÉDICA CUMPLIDOS - EVOLUCIÓN EXITOSA',
        signosVitales: {
          ta: '125/80',
          fc: '78',
          fr: '18',
          temperatura: '36.5',
          saturacion: '97'
        }
      }
    ];

    setEvolucionesMedicas(evolucionesSimuladas);
  }, []);

  const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedEvolucion(isExpanded ? panel : false);
  };

  const getIconByTendencia = (tendencia: string) => {
    switch (tendencia) {
      case 'MEJORIA': return <MejoriaIcon sx={{ fontSize: '1.2rem', color: '#4caf50' }} />;
      case 'ESTABLE': return <EstableIcon sx={{ fontSize: '1.2rem', color: '#ff9800' }} />;
      case 'EMPEORAMIENTO': return <EmpeorIcon sx={{ fontSize: '1.2rem', color: '#f44336' }} />;
      default: return <EstableIcon sx={{ fontSize: '1.2rem', color: '#666' }} />;
    }
  };

  const getColorByTendencia = (tendencia: string) => {
    switch (tendencia) {
      case 'MEJORIA': return '#e8f5e8';
      case 'ESTABLE': return '#fff3e0';
      case 'EMPEORAMIENTO': return '#ffebee';
      default: return '#f5f5f5';
    }
  };

  const getTimelineDotColor = (tendencia: string) => {
    switch (tendencia) {
      case 'MEJORIA': return 'success';
      case 'ESTABLE': return 'warning';
      case 'EMPEORAMIENTO': return 'error';
      default: return 'grey';
    }
  };

  const totalComplicaciones = evolucionesMedicas.reduce((total, evo) => total + evo.complicaciones.length, 0);

  return (
    <Box>
      {/* Sección C: Resumen de Evolución y Complicaciones */}
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
            <EvolucionIcon sx={{ fontSize: '1rem' }} />
            C. RESUMEN DE EVOLUCIÓN Y COMPLICACIONES
          </Typography>


          <Divider sx={{ mb: 2 }} />

          {/* Timeline de evoluciones */}
          {evolucionesMedicas.length === 0 ? (
            <Alert severity="info" sx={{ fontSize: '0.7rem' }}>
              No hay evoluciones médicas registradas para este paciente.
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
                 CRONOLOGÍA DE EVOLUCIONES MÉDICAS:
              </Typography>

              <Timeline sx={{ p: 0 }}>
                {evolucionesMedicas.map((evolucion, index) => (
                  <TimelineItem key={evolucion.id}>
                    <TimelineSeparator>
                      <TimelineDot color={getTimelineDotColor(evolucion.tendenciaEvolucion) as any}>
                        {getIconByTendencia(evolucion.tendenciaEvolucion)}
                      </TimelineDot>
                      {index < evolucionesMedicas.length - 1 && <TimelineConnector />}
                    </TimelineSeparator>

                    <TimelineContent sx={{ flex: 1 }}>
                      <Accordion
                        expanded={expandedEvolucion === evolucion.id}
                        onChange={handleAccordionChange(evolucion.id)}
                        sx={{ 
                          mb: 2,
                          border: '1px solid #ddd',
                          borderRadius: 1,
                          '&:before': { display: 'none' }
                        }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandIcon />}
                          sx={{ 
                            backgroundColor: getColorByTendencia(evolucion.tendenciaEvolucion),
                            borderRadius: 1,
                            minHeight: 50
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                            {/* Información principal */}
                            <Box sx={{ flex: 1 }}>
                              <Typography sx={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#333' }}>
                                {evolucion.especialidad} - {evolucion.hora}
                              </Typography>
                              <Typography sx={{ fontSize: '0.7rem', color: '#666' }}>
                                {evolucion.medico}
                              </Typography>
                            </Box>

                            {/* Tendencia y complicaciones */}
                            <Box sx={{ textAlign: 'right' }}>
                              <Chip
                                label={evolucion.tendenciaEvolucion}
                                size="small"
                                color={evolucion.tendenciaEvolucion === 'MEJORIA' ? 'success' : 
                                      evolucion.tendenciaEvolucion === 'ESTABLE' ? 'warning' : 'error'}
                                sx={{ fontSize: '0.6rem', fontWeight: 'bold', mb: 0.5 }}
                              />
                              {evolucion.complicaciones.length > 0 && (
                                <Chip
                                  label={`${evolucion.complicaciones.length} Complicación(es)`}
                                  size="small"
                                  color="error"
                                  sx={{ fontSize: '0.6rem', display: 'block' }}
                                />
                              )}
                            </Box>
                          </Box>
                        </AccordionSummary>

                        <AccordionDetails sx={{ backgroundColor: '#fafafa' }}>
                          {/* Signos vitales */}
                          <Paper variant="outlined" sx={{ p: 1.5, mb: 2, backgroundColor: '#e3f2fd' }}>
                            <Typography sx={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#1565c0', mb: 1 }}>
                               SIGNOS VITALES:
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                              <Chip label={`TA: ${evolucion.signosVitales.ta}`} size="small" sx={{ fontSize: '0.6rem' }} />
                              <Chip label={`FC: ${evolucion.signosVitales.fc} lpm`} size="small" sx={{ fontSize: '0.6rem' }} />
                              <Chip label={`FR: ${evolucion.signosVitales.fr} rpm`} size="small" sx={{ fontSize: '0.6rem' }} />
                              <Chip label={`T°: ${evolucion.signosVitales.temperatura}°C`} size="small" sx={{ fontSize: '0.6rem' }} />
                              <Chip label={`Sat: ${evolucion.signosVitales.saturacion}%`} size="small" sx={{ fontSize: '0.6rem' }} />
                            </Box>
                          </Paper>

                          {/* Complicaciones si existen */}
                          {evolucion.complicaciones.length > 0 && (
                            <Paper variant="outlined" sx={{ p: 1.5, mb: 2, backgroundColor: '#ffebee' }}>
                              <Typography sx={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#d32f2f', mb: 1 }}>
                                COMPLICACIONES:
                              </Typography>
                              <List dense>
                                {evolucion.complicaciones.map((complicacion, idx) => (
                                  <ListItem key={idx} sx={{ py: 0.5 }}>
                                    <ListItemText
                                      primary={
                                        <Typography sx={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#d32f2f' }}>
                                          • {complicacion}
                                        </Typography>
                                      }
                                    />
                                  </ListItem>
                                ))}
                              </List>
                            </Paper>
                          )}

                          {/* Evolución clínica */}
                          <Paper variant="outlined" sx={{ p: 1.5, mb: 2, backgroundColor: 'white' }}>
                            <Typography sx={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#1A3C6D', mb: 1 }}>
                              EVOLUCIÓN CLÍNICA:
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
                              {evolucion.evolucionClinica}
                            </Typography>
                          </Paper>

                          {/* Tratamiento y observaciones */}
                          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                            <Paper variant="outlined" sx={{ p: 1.5, flex: 1, backgroundColor: '#f3e5f5' }}>
                              <Typography sx={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#7b1fa2', mb: 0.5 }}>
                             TRATAMIENTO:
                              </Typography>
                              <Typography sx={{ fontSize: '0.65rem', color: '#333' }}>
                                {evolucion.tratamientoRealizado}
                              </Typography>
                            </Paper>
                            <Paper variant="outlined" sx={{ p: 1.5, flex: 1, backgroundColor: '#e8f5e8' }}>
                              <Typography sx={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#388e3c', mb: 0.5 }}>
                             OBSERVACIONES:
                              </Typography>
                              <Typography sx={{ fontSize: '0.65rem', color: '#333' }}>
                                {evolucion.observaciones}
                              </Typography>
                            </Paper>
                          </Box>

                          {/* Información adicional */}
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            <Chip
                              icon={<FechaIcon sx={{ fontSize: '0.6rem' }} />}
                              label={`${evolucion.fecha} ${evolucion.hora}`}
                              size="small"
                              variant="outlined"
                              sx={{ fontSize: '0.6rem' }}
                            />
                            <Chip
                              icon={<MedicoIcon sx={{ fontSize: '0.6rem' }} />}
                              label={evolucion.medico}
                              size="small"
                              variant="outlined"
                              sx={{ fontSize: '0.6rem' }}
                            />
                            <Chip
                              label={evolucion.numeroDocumento}
                              size="small"
                              variant="outlined"
                              sx={{ fontSize: '0.6rem' }}
                            />
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}