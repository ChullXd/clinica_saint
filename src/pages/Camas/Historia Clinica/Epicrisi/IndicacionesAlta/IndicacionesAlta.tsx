import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  ExitToApp as AltaIcon,
  Edit as EditarIcon,
  Save as GuardarIcon,
  Cancel as CancelarIcon,
  CheckCircle as CompletoIcon,
  Warning as AlertaIcon,
  MedicalServices as MedicamentoIcon,
  Event as CitaIcon,
  Info as InfoIcon,
  Assignment as IndicacionIcon,
  ExpandMore as ExpandIcon,
  Home as DomicilioIcon,
  LocalHospital as ControlIcon,
  Description as RecetaIcon,
} from "@mui/icons-material";

interface IndicacionesData {
  indicacionesLibres: string;
  medicamentosEgreso: string;
  controlMedico: string;
  recomendacionesGenerales: string;
  signosAlarma: string;
  fechaUltimaEdicion: string;
  editadoPor: string;
}

export default function IndicacionesAlta() {
  const [indicaciones, setIndicaciones] = useState<IndicacionesData>({
    indicacionesLibres: '',
    medicamentosEgreso: '',
    controlMedico: '',
    recomendacionesGenerales: '',
    signosAlarma: '',
    fechaUltimaEdicion: '',
    editadoPor: ''
  });
  const [modoEdicion, setModoEdicion] = useState(false);
  const [caracteres, setCaracteres] = useState(0);
  const [expandedSection, setExpandedSection] = useState<string | false>('indicaciones');

  // Cargar datos iniciales
  useEffect(() => {
    const indicacionesIniciales: IndicacionesData = {
      indicacionesLibres: `INDICACIONES DE ALTA MÉDICA - EPICRISIS

PACIENTE: JOSÉ ANTONIO GÓMEZ RODRÍGUEZ
DIAGNÓSTICO PRINCIPAL: INFARTO AGUDO DE MIOCARDIO DE PARED INFERIOR
FECHA DE EGRESO: 29 DE JULIO DE 2024

═══════════════════════════════════════════════════════════════════

A. MEDICAMENTOS DE EGRESO:

1. ÁCIDO ACETILSALICÍLICO (ASA) 100 mg
   • Tomar 1 tableta vía oral cada día por las mañanas
   • CRÓNICO - No suspender sin autorización médica
   • Antiagregante plaquetario para prevención cardiovascular

2. CLOPIDOGREL 75 mg
   • Tomar 1 tableta vía oral cada día por las mañanas
   • Durante 12 MESES mínimo
   • Antiagregante - terapia dual post-infarto

3. ENALAPRIL 5 mg
   • Tomar 1 tableta vía oral cada 12 horas (mañana y noche)
   • CRÓNICO - Cardioprotector post-infarto
   • Controlar presión arterial semanalmente

4. METOPROLOL 25 mg
   • Tomar 1 tableta vía oral cada 12 horas (mañana y noche)
   • CRÓNICO - Betabloqueador cardioprotector
   • Controlar frecuencia cardíaca (objetivo 60-80 lpm)

5. ATORVASTATINA 80 mg
   • Tomar 1 tableta vía oral cada noche antes de dormir
   • CRÓNICO - Control de colesterol
   • Control lipídico en 6 semanas

═══════════════════════════════════════════════════════════════════

B. CONTROLES MÉDICOS PROGRAMADOS:

1. CARDIOLOGÍA:
   • Cita en 1 SEMANA (5 de agosto 2024)
   • Dr. Fernando López Cárdenas - Ext. 2145
   • Evaluación función cardíaca y ajuste medicación

2. MEDICINA INTERNA:
   • Cita en 2 SEMANAS (12 de agosto 2024)
   • Dr. Carlos Mendoza Silva - Ext. 1892
   • Seguimiento evolución post-infarto

3. LABORATORIO CLÍNICO:
   • Control en 6 SEMANAS (9 de septiembre 2024)
   • Perfil lipídico completo + función hepática
   • Control troponinas si síntomas

═══════════════════════════════════════════════════════════════════

C. RECOMENDACIONES GENERALES:

ACTIVIDAD FÍSICA:
• Reposo relativo por 1 semana
• Evitar esfuerzos físicos intensos por 6 semanas
• Caminar 15-20 minutos diarios después de la primera semana
• No levantar objetos mayores a 5 kg por 4 semanas

DIETA:
• Dieta cardioprotectora baja en sodio (<2g/día)
• Evitar grasas saturadas y trans
• Aumentar consumo de frutas, verduras y pescado
• Mantener peso ideal - IMC objetivo <25

HÁBITOS:
• SUSPENSIÓN TOTAL Y DEFINITIVA DEL TABACO
• Evitar alcohol por completo
• Dormir 8 horas diarias
• Controlar estrés - técnicas de relajación

MEDICACIÓN:
• Tomar medicamentos exactamente como se indica
• NO SUSPENDER ningún medicamento sin autorización
• Llevar siempre lista de medicamentos
• Informar todos los medicamentos a cualquier médico

═══════════════════════════════════════════════════════════════════

D. SIGNOS DE ALARMA - CONSULTAR INMEDIATAMENTE:

🚨 DOLOR TORÁCICO:
• Dolor de pecho similar al del infarto
• Dolor que no cede con reposo
• Dolor que se irradia a brazo, cuello o mandíbula

🚨 SÍNTOMAS CARDIOVASCULARES:
• Dificultad respiratoria súbita
• Palpitaciones o latidos irregulares
• Mareo, desmayo o pérdida de conciencia
• Sudoración fría profusa

🚨 EFECTOS ADVERSOS MEDICAMENTOS:
• Sangrado (encías, heces negras, moretones)
• Tos seca persistente (por Enalapril)
• Fatiga extrema o debilidad
• Náuseas o vómitos persistentes

🚨 OTROS SÍNTOMAS:
• Hinchazón de piernas, tobillos o abdomen
• Fiebre mayor a 38°C
• Cualquier síntoma que genere preocupación

═══════════════════════════════════════════════════════════════════

E. INFORMACIÓN DE CONTACTO DE EMERGENCIA:

CLÍNICA SAINT - URGENCIAS 24 HORAS:
📞 Teléfono: (601) 234-5678
🏥 Dirección: Calle 123 #45-67, Bogotá
🚑 Ambulancia: 911 ó (601) 234-5911

CARDIÓLOGO DE GUARDIA: Dr. Fernando López
📱 Celular emergencias: (301) 987-6543
⏰ Disponible 24/7 para pacientes post-infarto

═══════════════════════════════════════════════════════════════════

F. INCAPACIDADES MÉDICAS:

• Incapacidad laboral por 30 días calendario
• Inicia: 25 de julio 2024 - Termina: 24 de agosto 2024
• Reposo médico estricto primeras 2 semanas
• Evaluación para reintegro laboral por Cardiología

═══════════════════════════════════════════════════════════════════

G. PRÓXIMOS EXÁMENES REQUERIDOS:

1. ECOCARDIOGRAMA DE CONTROL (6 semanas):
   • Evaluación función ventricular
   • Seguimiento contractilidad segmentaria

2. PRUEBA DE ESFUERZO (3 meses):
   • Evaluación capacidad funcional
   • Detección isquemia residual

3. HOLTER 24 HORAS (2 meses):
   • Detección arritmias
   • Evaluación respuesta a medicación

═══════════════════════════════════════════════════════════════════

OBSERVACIONES FINALES:

El paciente egresa en EXCELENTES CONDICIONES, con función cardíaca estable y tratamiento médico óptimo establecido. Se enfatiza la importancia del seguimiento estricto de estas indicaciones para prevenir complicaciones y asegurar una óptima recuperación cardiovascular.

La ADHERENCIA AL TRATAMIENTO y el SEGUIMIENTO MÉDICO PUNTUAL son fundamentales para el pronóstico a largo plazo.

═══════════════════════════════════════════════════════════════════

Dr. Carlos Mendoza Silva
Medicina Interna - Reg. Med. 12345-BOG
Clínica Saint - Servicio de Hospitalización
Fecha: 29 de julio de 2024 - 14:30 hrs`,

      medicamentosEgreso: `💊 MEDICAMENTOS DE EGRESO - RESUMEN EJECUTIVO:

1. ASA 100mg QD (crónico) - Antiagregante
2. Clopidogrel 75mg QD (12 meses) - Antiagregante  
3. Enalapril 5mg BID (crónico) - IECA cardioprotector
4. Metoprolol 25mg BID (crónico) - Betabloqueador
5. Atorvastatina 80mg QHS (crónico) - Estatina

⚠️ NO SUSPENDER sin supervisión médica
⚠️ Control adherencia en cada consulta`,

      controlMedico: `📅 CRONOGRAMA DE CONTROLES:

• CARDIOLOGÍA: 1 semana (05/08/2024)
• MEDICINA INTERNA: 2 semanas (12/08/2024)  
• LABORATORIO: 6 semanas (09/09/2024)
• ECOCARDIOGRAMA: 6 semanas
• HOLTER 24h: 2 meses
• PRUEBA ESFUERZO: 3 meses

📞 Teléfonos citas: (601) 234-5678`,

      recomendacionesGenerales: `🏠 VIDA DIARIA POST-INFARTO:

ACTIVIDAD:
• Reposo relativo 1 semana
• Caminatas progresivas desde semana 2
• No esfuerzos intensos x 6 semanas

DIETA:
• Cardioprotectora baja en sodio
• Rica en omega-3 y antioxidantes
• Control peso - IMC <25

HÁBITOS:
• CESE TOTAL TABAQUISMO ❌🚬
• Evitar alcohol
• Manejo estrés
• Sueño reparador 8h`,

      signosAlarma: `🚨 CONSULTAR URGENTE POR:

CARDIOVASCULAR:
• Dolor torácico tipo infarto
• Dificultad respiratoria súbita  
• Palpitaciones irregulares
• Mareo o síncope

MEDICAMENTOS:
• Sangrados (encías, heces, piel)
• Tos seca persistente
• Fatiga extrema

OTROS:
• Edema de miembros inferiores
• Fiebre >38°C
• Cualquier síntoma preocupante

📞 URGENCIAS 24h: (601) 234-5678`,

      fechaUltimaEdicion: '2024-07-29 14:30',
      editadoPor: 'Dr. Carlos Mendoza Silva'
    };

    setIndicaciones(indicacionesIniciales);
    setCaracteres(indicacionesIniciales.indicacionesLibres.length);
  }, []);

  const handleIndicacionesChange = (value: string) => {
    setIndicaciones(prev => ({
      ...prev,
      indicacionesLibres: value
    }));
    setCaracteres(value.length);
  };

  const handleGuardar = () => {
    setIndicaciones(prev => ({
      ...prev,
      fechaUltimaEdicion: new Date().toLocaleString('es-CO'),
      editadoPor: 'Dr. Usuario Actual'
    }));
    setModoEdicion(false);
    // Aquí se enviaría al backend
    console.log('Indicaciones guardadas:', indicaciones);
  };

  const handleCancelar = () => {
    setModoEdicion(false);
    // Recargar datos originales si es necesario
  };

  const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedSection(isExpanded ? panel : false);
  };

  return (
    <Box>
      {/* Sección F: Indicaciones de Alta/Egreso */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#1A3C6D",
                fontSize: "0.9rem",
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <AltaIcon sx={{ fontSize: '1rem' }} />
              F. INDICACIONES DE ALTA/EGRESO
            </Typography>

            {/* Información de edición */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip
                icon={<InfoIcon sx={{ fontSize: '0.7rem' }} />}
                label={`${caracteres.toLocaleString()} caracteres`}
                size="small"
                color="info"
                sx={{ fontSize: '0.6rem' }}
              />
              {indicaciones.fechaUltimaEdicion && (
                <Chip
                  label={`Editado: ${indicaciones.fechaUltimaEdicion}`}
                  size="small"
                  variant="outlined"
                  sx={{ fontSize: '0.6rem' }}
                />
              )}
            </Box>
          </Box>

          {/* Controles de edición */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
           

            <Box sx={{ display: 'flex', gap: 1 }}>
              {!modoEdicion ? (
                <Button
                  variant="contained"
                  startIcon={<EditarIcon />}
                  onClick={() => setModoEdicion(true)}
                  sx={{ 
                    fontSize: '0.65rem', 
                    textTransform: 'none',
                    backgroundColor: '#1976d2'
                  }}
                >
                  Editar Indicaciones
                </Button>
              ) : (
                <>
                  <Button
                    variant="contained"
                    startIcon={<GuardarIcon />}
                    onClick={handleGuardar}
                    sx={{ 
                      fontSize: '0.65rem', 
                      textTransform: 'none',
                      backgroundColor: '#4caf50',
                      '&:hover': { backgroundColor: '#388e3c' }
                    }}
                  >
                    Guardar
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<CancelarIcon />}
                    onClick={handleCancelar}
                    sx={{ 
                      fontSize: '0.65rem', 
                      textTransform: 'none',
                      color: '#f44336',
                      borderColor: '#f44336'
                    }}
                  >
                    Cancelar
                  </Button>
                </>
              )}
            </Box>
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* Campo de texto principal - TAMAÑO LIBRE */}
          <Paper variant="outlined" sx={{ p: 1.5, backgroundColor: '#fafafa' }}>
            <Typography
              sx={{
                fontSize: '0.7rem',
                fontWeight: 'bold',
                color: '#1A3C6D',
                mb: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 0.5
              }}
            >
              <IndicacionIcon sx={{ fontSize: '0.8rem' }} />
              INDICACIONES COMPLETAS DE ALTA (Campo de texto libre):
            </Typography>

            {modoEdicion ? (
              <TextField
                fullWidth
                multiline
                minRows={20}
                maxRows={50}
                value={indicaciones.indicacionesLibres}
                onChange={(e) => handleIndicacionesChange(e.target.value)}
                placeholder="Escriba aquí las indicaciones completas de alta para el paciente..."
                sx={{
                  '& .MuiInputBase-root': {
                    fontSize: '0.7rem',
                    fontFamily: 'monospace',
                    lineHeight: 1.4,
                    backgroundColor: 'white'
                  },
                  '& .MuiInputBase-input': {
                    resize: 'vertical'
                  }
                }}
                helperText={`${caracteres.toLocaleString()} caracteres • Campo de tamaño libre • Formato médico profesional`}
              />
            ) : (
              <Box
                sx={{
                  minHeight: '400px',
                  maxHeight: '600px',
                  overflowY: 'auto',
                  border: '1px solid #ddd',
                  borderRadius: 1,
                  p: 1.5,
                  backgroundColor: 'white'
                }}
              >
                <Typography
                  sx={{
                    fontSize: '0.7rem',
                    lineHeight: 1.4,
                    color: '#333',
                    whiteSpace: 'pre-line',
                    fontFamily: 'monospace'
                  }}
                >
                  {indicaciones.indicacionesLibres || 'No hay indicaciones de alta registradas.'}
                </Typography>
              </Box>
            )}
          </Paper>
        </CardContent>
      </Card>
    </Box>
  );
}