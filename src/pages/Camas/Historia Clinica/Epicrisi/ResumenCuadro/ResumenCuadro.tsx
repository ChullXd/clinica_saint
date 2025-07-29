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
  IconButton,
  Tooltip,
  Badge,
} from '@mui/material';
import {
  Assignment as ResumenIcon,
  LocalHospital as CuadroClinicoIcon,
  Event as FechaIcon,
  Person as MedicoIcon,
  Visibility as VerIcon,
  ExpandMore as ExpandIcon,
  Description as DocumentoIcon,
  Timeline as EvolucionIcon,
  MedicalServices as InterconsultaIcon,
  FilePresent as EpicrisIcon,
  History as HistorialIcon,
} from "@mui/icons-material";

interface ResumenCuadroClinico {
  id: string;
  fecha: string;
  hora: string;
  tipoDocumento: 'INGRESO' | 'EVOLUCION' | 'INTERCONSULTA' | 'EPICRISIS';
  especialidad: string;
  medico: string;
  resumenCuadro: string;
  diagnosticoPrincipal: string;
  estadoPaciente: string;
  numeroDocumento: string;
}

export default function ResumenCuadro() {
  const [resumenesCuadro, setResumenesCuadro] = useState<ResumenCuadroClinico[]>([]);
  const [expandedResumen, setExpandedResumen] = useState<string | false>(false);

  // Cargar datos simulados de resúmenes de cuadro clínico
  useEffect(() => {
    const resumenesSimulados: ResumenCuadroClinico[] = [
      // Nota de Ingreso
      {
        id: '1',
        fecha: '2024-07-25',
        hora: '08:30',
        tipoDocumento: 'INGRESO',
        especialidad: 'MEDICINA INTERNA',
        medico: 'DR. CARLOS MENDOZA RIVERA',
        numeroDocumento: 'HCL-2024-001',
        resumenCuadro: `PACIENTE MASCULINO DE 65 AÑOS QUE INGRESA POR CUADRO CLÍNICO DE 3 DÍAS DE EVOLUCIÓN CARACTERIZADO POR:

• DOLOR TORÁCICO OPRESIVO RETROESTERNAL DE MODERADA INTENSIDAD
• DISNEA DE MEDIANOS ESFUERZOS PROGRESIVA
• PALPITACIONES OCASIONALES
• SUDORACIÓN PROFUSA

EXAMEN FÍSICO AL INGRESO:
• PACIENTE CONSCIENTE, ORIENTADO, COLABORADOR
• SIGNOS VITALES: TA 150/95, FC 98 LPM, FR 24 RPM, T° 36.8°C, SAT O2 92%
• RUIDOS CARDÍACOS RÍTMICOS, SOPLO SISTÓLICO GRADO II/VI
• CAMPOS PULMONARES CON ESTERTORES BIBASALES
• ABDOMEN BLANDO, DEPRESIBLE, NO DOLOROSO
• EXTREMIDADES CON EDEMA LEVE EN MIEMBROS INFERIORES`,
        diagnosticoPrincipal: 'SÍNDROME CORONARIO AGUDO - INSUFICIENCIA CARDÍACA CONGESTIVA',
        estadoPaciente: 'ESTABLE CON VIGILANCIA'
      },

      // Evolución Día 1
      {
        id: '2',
        fecha: '2024-07-26',
        hora: '07:00',
        tipoDocumento: 'EVOLUCION',
        especialidad: 'MEDICINA INTERNA',
        medico: 'DR. CARLOS MENDOZA RIVERA',
        numeroDocumento: 'EVO-2024-001',
        resumenCuadro: `EVOLUCIÓN A LAS 24 HORAS DEL INGRESO:

SÍNTOMAS ACTUALES:
• MEJORÍA PARCIAL DEL DOLOR TORÁCICO
• DISNEA PERSISTENTE PERO MENOS INTENSA
• AUSENCIA DE PALPITACIONES EN LAS ÚLTIMAS 12 HORAS
• MEJOR TOLERANCIA AL DECÚBITO

EXAMEN FÍSICO:
• PACIENTE CONSCIENTE, ORIENTADO, HEMODINÁMICAMENTE ESTABLE
• SIGNOS VITALES: TA 135/85, FC 85 LPM, FR 20 RPM, SAT O2 95%
• RUIDOS CARDÍACOS RÍTMICOS, SOPLO SISTÓLICO PERSISTENTE
• MEJORÍA DE ESTERTORES PULMONARES
• DISMINUCIÓN DEL EDEMA EN MIEMBROS INFERIORES

TRATAMIENTO:
• RESPUESTA FAVORABLE A DIURÉTICOS Y VASODILATADORES
• CONTINÚA ESQUEMA CARDIOLÓGICO
• BALANCE HÍDRICO NEGATIVO 800 ML`,
        diagnosticoPrincipal: 'SÍNDROME CORONARIO AGUDO EN EVOLUCIÓN FAVORABLE',
        estadoPaciente: 'MEJORÍA CLÍNICA PROGRESIVA'
      },

      // Interconsulta Cardiología
      {
        id: '3',
        fecha: '2024-07-27',
        hora: '14:30',
        tipoDocumento: 'INTERCONSULTA',
        especialidad: 'CARDIOLOGÍA',
        medico: 'DR. FERNANDO LÓPEZ CARDENAS',
        numeroDocumento: 'INT-2024-008',
        resumenCuadro: `INTERCONSULTA CARDIOLÓGICA - EVALUACIÓN ESPECIALIZADA:

CUADRO CLÍNICO ACTUAL:
• PACIENTE CON ANTECEDENTE DE SÍNDROME CORONARIO AGUDO
• EVOLUCIÓN FAVORABLE CON TRATAMIENTO MÉDICO
• AUSENCIA DE DOLOR TORÁCICO EN LAS ÚLTIMAS 24 HORAS
• CLASE FUNCIONAL NYHA II

EVALUACIÓN CARDIOLÓGICA:
• ELECTROCARDIOGRAMA: ONDAS Q EN DERIVACIONES INFERIORES
• ECOCARDIOGRAMA: FRACCIÓN DE EYECCIÓN 45%, HIPOCINESIA INFERIOR
• TROPONINAS: ELEVACIÓN INICIAL CON TENDENCIA DESCENDENTE
• FUNCIÓN SISTÓLICA LEVEMENTE DEPRIMIDA

CRITERIO CLÍNICO:
• INFARTO AGUDO DE MIOCARDIO DE PARED INFERIOR ESTABLECIDO
• FUNCIÓN VENTRICULAR IZQUIERDA LEVEMENTE COMPROMETIDA
• ESTABILIDAD HEMODINÁMICA MANTENIDA
• RESPUESTA ADECUADA AL TRATAMIENTO CONSERVADOR`,
        diagnosticoPrincipal: 'INFARTO AGUDO DE MIOCARDIO PARED INFERIOR',
        estadoPaciente: 'ESTABLE - FUNCIÓN CARDÍACA COMPROMETIDA LEVE'
      },

      // Evolución Día 3
      {
        id: '4',
        fecha: '2024-07-28',
        hora: '08:15',
        tipoDocumento: 'EVOLUCION',
        especialidad: 'MEDICINA INTERNA',
        medico: 'DR. CARLOS MENDOZA RIVERA',
        numeroDocumento: 'EVO-2024-002',
        resumenCuadro: `EVOLUCIÓN DÍA 3 DE HOSPITALIZACIÓN:

ESTADO CLÍNICO ACTUAL:
• PACIENTE ASINTOMÁTICO PARA DOLOR TORÁCICO
• AUSENCIA DE DISNEA EN REPOSO
• TOLERANCIA ADECUADA A LA DEAMBULACIÓN
• APETITO CONSERVADO

EXAMEN FÍSICO:
• PACIENTE CONSCIENTE, ORIENTADO, COLABORADOR
• SIGNOS VITALES: TA 125/80, FC 78 LPM, FR 18 RPM, SAT O2 97%
• RUIDOS CARDÍACOS RÍTMICOS SIN SOPLOS AGREGADOS
• CAMPOS PULMONARES LIMPIOS
• ABDOMEN NORMAL
• SIN EDEMAS EN EXTREMIDADES

PARACLÍNICOS DE CONTROL:
• TROPONINAS EN DESCENSO PROGRESIVO
• FUNCIÓN RENAL NORMAL
• ELECTROLITOS EN RANGOS NORMALES
• ECG DE CONTROL: ESTABLE`,
        diagnosticoPrincipal: 'POST-INFARTO AGUDO DE MIOCARDIO EN RECUPERACIÓN',
        estadoPaciente: 'EXCELENTE EVOLUCIÓN - CRITERIOS DE ALTA'
      },

      // Epicrisis
      {
        id: '5',
        fecha: '2024-07-29',
        hora: '10:00',
        tipoDocumento: 'EPICRISIS',
        especialidad: 'MEDICINA INTERNA',
        medico: 'DR. CARLOS MENDOZA RIVERA',
        numeroDocumento: 'EPI-2024-001',
        resumenCuadro: `RESUMEN DE HOSPITALIZACIÓN - EPICRISIS:

MOTIVO DE INGRESO:
• SÍNDROME CORONARIO AGUDO CON DOLOR TORÁCICO Y DISNEA

EVOLUCIÓN DURANTE HOSPITALIZACIÓN:
• DIAGNÓSTICO CONFIRMADO DE INFARTO AGUDO DE MIOCARDIO INFERIOR
• MANEJO MÉDICO CONSERVADOR CON RESPUESTA FAVORABLE
• EVALUACIÓN CARDIOLÓGICA ESPECIALIZADA
• ESTABILIZACIÓN HEMODINÁMICA PROGRESIVA
• MEJORÍA CLÍNICA SIGNIFICATIVA

ESTADO AL EGRESO:
• PACIENTE ASINTOMÁTICO
• SIGNOS VITALES ESTABLES
• FUNCIÓN CARDÍACA ESTABLE CON COMPROMISO LEVE
• CAPACIDAD FUNCIONAL CONSERVADA
• SIN COMPLICACIONES

PLAN DE SEGUIMIENTO:
• CONTROL CARDIOLÓGICO EN 1 SEMANA
• REHABILITACIÓN CARDÍACA
• MEDICACIÓN CRÓNICA AJUSTADA`,
        diagnosticoPrincipal: 'POST-INFARTO AGUDO DE MIOCARDIO PARED INFERIOR',
        estadoPaciente: 'ALTA MÉDICA - EVOLUCIÓN SATISFACTORIA'
      }
    ];

    setResumenesCuadro(resumenesSimulados);
  }, []);

  const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedResumen(isExpanded ? panel : false);
  };

  const getIconByTipo = (tipo: string) => {
    switch (tipo) {
      case 'INGRESO': return <DocumentoIcon sx={{ fontSize: '1rem', color: '#1976d2' }} />;
      case 'EVOLUCION': return <EvolucionIcon sx={{ fontSize: '1rem', color: '#388e3c' }} />;
      case 'INTERCONSULTA': return <InterconsultaIcon sx={{ fontSize: '1rem', color: '#f57c00' }} />;
      case 'EPICRISIS': return <EpicrisIcon sx={{ fontSize: '1rem', color: '#7b1fa2' }} />;
      default: return <DocumentoIcon sx={{ fontSize: '1rem', color: '#666' }} />;
    }
  };

  const getColorByTipo = (tipo: string) => {
    switch (tipo) {
      case 'INGRESO': return '#e3f2fd';
      case 'EVOLUCION': return '#e8f5e8';
      case 'INTERCONSULTA': return '#fff3e0';
      case 'EPICRISIS': return '#f3e5f5';
      default: return '#f5f5f5';
    }
  };

  const getChipColorByTipo = (tipo: string) => {
    switch (tipo) {
      case 'INGRESO': return 'primary';
      case 'EVOLUCION': return 'success';
      case 'INTERCONSULTA': return 'warning';
      case 'EPICRISIS': return 'secondary';
      default: return 'default';
    }
  };

  return (
    <Box>
      {/* Sección B: Resumen de Cuadro Clínico */}
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
            <ResumenIcon sx={{ fontSize: '1rem' }} />
            B. RESUMEN DE CUADRO CLÍNICO
          </Typography>

          {/* Información general */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            <Chip
              icon={<HistorialIcon sx={{ fontSize: '0.7rem' }} />}
              label={`${resumenesCuadro.length} documentos con resumen`}
              size="small"
              color="primary"
              sx={{ fontSize: '0.65rem', fontWeight: 'bold' }}
            />
            <Chip
              label={`${resumenesCuadro.filter(r => r.tipoDocumento === 'INGRESO').length} Ingresos`}
              size="small"
              color="primary"
              sx={{ fontSize: '0.65rem' }}
            />
            <Chip
              label={`${resumenesCuadro.filter(r => r.tipoDocumento === 'EVOLUCION').length} Evoluciones`}
              size="small"
              color="success"
              sx={{ fontSize: '0.65rem' }}
            />
            <Chip
              label={`${resumenesCuadro.filter(r => r.tipoDocumento === 'INTERCONSULTA').length} Interconsultas`}
              size="small"
              color="warning"
              sx={{ fontSize: '0.65rem' }}
            />
            <Chip
              label={`${resumenesCuadro.filter(r => r.tipoDocumento === 'EPICRISIS').length} Epicrisis`}
              size="small"
              color="secondary"
              sx={{ fontSize: '0.65rem' }}
            />
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* Lista de resúmenes */}
          {resumenesCuadro.length === 0 ? (
            <Alert severity="info" sx={{ fontSize: '0.7rem' }}>
              No hay resúmenes de cuadro clínico disponibles para este paciente.
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
                CRONOLOGÍA DE RESÚMENES CLÍNICOS:
              </Typography>

              {resumenesCuadro.map((resumen, index) => (
                <Accordion
                  key={resumen.id}
                  expanded={expandedResumen === resumen.id}
                  onChange={handleAccordionChange(resumen.id)}
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
                      backgroundColor: getColorByTipo(resumen.tipoDocumento),
                      borderRadius: 1,
                      minHeight: 60
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                      {/* Ícono y tipo */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {getIconByTipo(resumen.tipoDocumento)}
                        <Badge badgeContent={index + 1} color="primary">
                          <Chip
                            label={resumen.tipoDocumento}
                            size="small"
                            color={getChipColorByTipo(resumen.tipoDocumento) as any}
                            sx={{ fontSize: '0.65rem', fontWeight: 'bold' }}
                          />
                        </Badge>
                      </Box>

                      {/* Información principal */}
                      <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#333' }}>
                          {resumen.fecha} - {resumen.hora}
                        </Typography>
                        <Typography sx={{ fontSize: '0.7rem', color: '#666' }}>
                          {resumen.especialidad} | {resumen.medico}
                        </Typography>
                        <Typography sx={{ fontSize: '0.65rem', color: '#666', fontStyle: 'italic' }}>
                          Doc: {resumen.numeroDocumento}
                        </Typography>
                      </Box>

                      {/* Estado del paciente */}
                      <Box sx={{ textAlign: 'right', minWidth: 150 }}>
                        <Typography sx={{ fontSize: '0.65rem', fontWeight: 'bold', color: '#1A3C6D' }}>
                          ESTADO:
                        </Typography>
                        <Typography sx={{ fontSize: '0.6rem', color: '#666' }}>
                          {resumen.estadoPaciente}
                        </Typography>
                      </Box>
                    </Box>
                  </AccordionSummary>

                  <AccordionDetails sx={{ backgroundColor: '#fafafa' }}>
                    {/* Diagnóstico principal */}
                    <Paper variant="outlined" sx={{ p: 1.5, mb: 2, backgroundColor: '#e8f4fd' }}>
                      <Typography sx={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#1565c0', mb: 0.5 }}>
                        DIAGNÓSTICO PRINCIPAL:
                      </Typography>
                      <Typography sx={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#333' }}>
                        {resumen.diagnosticoPrincipal}
                      </Typography>
                    </Paper>

                    {/* Resumen del cuadro clínico */}
                    <Paper variant="outlined" sx={{ p: 1.5, backgroundColor: 'white' }}>
                      <Typography sx={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#1A3C6D', mb: 1 }}>
                        RESUMEN DEL CUADRO CLÍNICO:
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
                        {resumen.resumenCuadro}
                      </Typography>
                    </Paper>

                    {/* Información adicional */}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                      <Chip
                        icon={<FechaIcon sx={{ fontSize: '0.6rem' }} />}
                        label={`${resumen.fecha} ${resumen.hora}`}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: '0.6rem' }}
                      />
                      <Chip
                        icon={<MedicoIcon sx={{ fontSize: '0.6rem' }} />}
                        label={resumen.medico}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: '0.6rem' }}
                      />
                      <Chip
                        icon={<CuadroClinicoIcon sx={{ fontSize: '0.6rem' }} />}
                        label={resumen.especialidad}
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