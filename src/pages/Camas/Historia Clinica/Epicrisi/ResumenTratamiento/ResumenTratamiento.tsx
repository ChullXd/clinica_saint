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
  Badge,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
} from '@mui/material';
import {
  MedicalServices as TratamientoIcon,
  LocalPharmacy as MedicamentoIcon,
  LocalHospital as ProcedimientoIcon,
  Healing as TerapiaIcon,
  MonitorHeart as MonitorizacionIcon,
  ExpandMore as ExpandIcon,
  CheckCircle as EfectivoIcon,
  Warning as AdversoIcon,
  Schedule as DuracionIcon,
  Edit as EditarIcon,
  Save as GuardarIcon,
  Add as AgregarIcon,
  Delete as EliminarIcon,
  Visibility as VerIcon,
  Timeline as EvolucionIcon,
  Person as MedicoIcon,
  Event as FechaIcon,
} from "@mui/icons-material";

// ...existing interfaces...
interface TratamientoMedico {
  id: string;
  fecha: string;
  hora: string;
  dia: number;
  tipoTratamiento: 'MEDICAMENTO' | 'PROCEDIMIENTO' | 'TERAPIA' | 'MONITORIZACION';
  categoria: string;
  nombre: string;
  dosis?: string;
  via?: string;
  frecuencia?: string;
  duracion: string;
  medico: string;
  especialidad: string;
  numeroOrden: string;
  indicacion: string;
  respuesta: 'EFECTIVO' | 'PARCIAL' | 'INEFECTIVO' | 'ADVERSO';
  observaciones: string;
  fechaInicio: string;
  fechaFin?: string;
  estado: 'ACTIVO' | 'SUSPENDIDO' | 'COMPLETADO';
}

interface ResumenEditable {
  resumenFarmacologico: string;
  resumenProcedimientos: string;
  resumenTerapeutico: string;
  observacionesGenerales: string;
}

export default function ResumenTratamiento() {
  const [tratamientosMedicos, setTratamientosMedicos] = useState<TratamientoMedico[]>([]);
  const [expandedTratamiento, setExpandedTratamiento] = useState<string | false>(false);
  const [resumenEditable, setResumenEditable] = useState<ResumenEditable>({
    resumenFarmacologico: '',
    resumenProcedimientos: '',
    resumenTerapeutico: '',
    observacionesGenerales: ''
  });
  const [modoEdicion, setModoEdicion] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  // ...existing useEffect and data...
  useEffect(() => {
    const tratamientosSimulados: TratamientoMedico[] = [
      // Medicamentos de Urgencias
      {
        id: '1',
        fecha: '2024-07-25',
        hora: '09:00',
        dia: 1,
        tipoTratamiento: 'MEDICAMENTO',
        categoria: 'ANALGÉSICO OPIOIDE',
        nombre: 'MORFINA',
        dosis: '5 mg',
        via: 'INTRAVENOSA',
        frecuencia: 'STAT',
        duracion: 'DOSIS ÚNICA',
        medico: 'DR. CARLOS MENDOZA',
        especialidad: 'MEDICINA INTERNA',
        numeroOrden: 'ORD-2024-001',
        indicacion: 'DOLOR TORÁCICO SEVERO - SÍNDROME CORONARIO AGUDO',
        respuesta: 'EFECTIVO',
        observaciones: 'ALIVIO SIGNIFICATIVO DEL DOLOR A LOS 15 MINUTOS',
        fechaInicio: '2024-07-25',
        estado: 'COMPLETADO'
      },
      // ...existing data...
    ];

    setTratamientosMedicos(tratamientosSimulados);

    // Cargar resumen editable inicial
    setResumenEditable({
      resumenFarmacologico: `TRATAMIENTO FARMACOLÓGICO DURANTE LA HOSPITALIZACIÓN:

1. FASE AGUDA (DÍA 1):
   • Morfina 5 mg IV STAT para control del dolor torácico
   • Nitroglicerina SL 0.4 mg PRN (3 dosis) con buena respuesta
   • Furosemida 40 mg IV BID por 3 días para manejo de sobrecarga

2. ANTIAGREGACIÓN DUAL:
   • ASA 300 mg dosis de carga, luego 100 mg/día (crónico)
   • Clopidogrel 600 mg dosis de carga, luego 75 mg/día (12 meses)

3. CARDIOPROTECCIÓN:
   • Enalapril 5 mg VO BID iniciado día 2 (crónico)
   • Metoprolol 25 mg VO BID iniciado día 2 (crónico)
   • Atorvastatina 80 mg VO QD iniciado día 3 (crónico)

RESPUESTA AL TRATAMIENTO: Excelente, con control adecuado de síntomas y estabilización hemodinámica.`,

      resumenProcedimientos: `PROCEDIMIENTOS DIAGNÓSTICOS Y TERAPÉUTICOS:

1. MONITORIZACIÓN CARDÍACA:
   • Telemetría continua por 4 días
   • Sin arritmias significativas detectadas
   • Vigilancia exitosa del ritmo cardíaco

2. ESTUDIOS DIAGNÓSTICOS:
   • Ecocardiograma transtorácico día 2
   • Evaluación de función ventricular post-infarto
   • Resultado: FE 45% con disfunción leve

3. OXIGENOTERAPIA:
   • 2 L/min por cánula nasal días 3-4
   • Indicada por hipoxemia leve
   • Mejoría de saturación a 96-97%

RESULTADOS: Todos los procedimientos fueron exitosos sin complicaciones.`,

      resumenTerapeutico: `TERAPIAS COMPLEMENTARIAS:

1. FISIOTERAPIA RESPIRATORIA:
   • Ejercicios de expansión pulmonar
   • Prevención de complicaciones respiratorias
   • Técnicas de tos asistida

2. MOVILIZACIÓN TEMPRANA:
   • Iniciada día 4 de hospitalización
   • Deambulación progresiva supervisada
   • Prevención de trombosis venosa profunda

3. EDUCACIÓN AL PACIENTE:
   • Información sobre medicación crónica
   • Signos de alarma cardiovascular
   • Modificaciones de estilo de vida

RESULTADOS: Excelente adherencia y comprensión del plan terapéutico.`,

      observacionesGenerales: `OBSERVACIONES GENERALES DEL TRATAMIENTO:

• La respuesta al tratamiento médico fue EXCELENTE en todas las fases
• No se presentaron efectos adversos significativos a la medicación
• El paciente mostró buena tolerancia a todos los medicamentos
• Se logró estabilización hemodinámica completa en 48 horas
• La doble antiagregación fue bien tolerada sin sangrados
• Los medicamentos cardioprotectores fueron iniciados sin contraindicaciones
• Se completó educación sobre medicación crónica con comprensión adecuada
• El plan de seguimiento ambulatorio quedó claramente establecido

RECOMENDACIÓN: Continuar medicación según protocolo de egreso con controles programados.`
    });
  }, []);

  // ...existing helper functions...
  const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedTratamiento(isExpanded ? panel : false);
  };

  const getIconByTipo = (tipo: string) => {
    switch (tipo) {
      case 'MEDICAMENTO': return <MedicamentoIcon sx={{ fontSize: '1rem', color: '#e91e63' }} />;
      case 'PROCEDIMIENTO': return <ProcedimientoIcon sx={{ fontSize: '1rem', color: '#3f51b5' }} />;
      case 'TERAPIA': return <TerapiaIcon sx={{ fontSize: '1rem', color: '#4caf50' }} />;
      case 'MONITORIZACION': return <MonitorizacionIcon sx={{ fontSize: '1rem', color: '#ff9800' }} />;
      default: return <TratamientoIcon sx={{ fontSize: '1rem', color: '#666' }} />;
    }
  };

  const getColorByTipo = (tipo: string) => {
    switch (tipo) {
      case 'MEDICAMENTO': return '#fce4ec';
      case 'PROCEDIMIENTO': return '#e8eaf6';
      case 'TERAPIA': return '#e8f5e8';
      case 'MONITORIZACION': return '#fff3e0';
      default: return '#f5f5f5';
    }
  };

  const getIconByRespuesta = (respuesta: string) => {
    switch (respuesta) {
      case 'EFECTIVO': return <EfectivoIcon sx={{ fontSize: '1rem', color: '#4caf50' }} />;
      case 'PARCIAL': return <AdversoIcon sx={{ fontSize: '1rem', color: '#ff9800' }} />;
      case 'INEFECTIVO': return <AdversoIcon sx={{ fontSize: '1rem', color: '#f44336' }} />;
      case 'ADVERSO': return <AdversoIcon sx={{ fontSize: '1rem', color: '#d32f2f' }} />;
      default: return <EfectivoIcon sx={{ fontSize: '1rem', color: '#666' }} />;
    }
  };

  const getChipColorByEstado = (estado: string) => {
    switch (estado) {
      case 'ACTIVO': return 'success';
      case 'COMPLETADO': return 'primary';
      case 'SUSPENDIDO': return 'error';
      default: return 'default';
    }
  };

  const handleGuardarResumen = () => {
    setModoEdicion(false);
    // Aquí se enviaría al backend
    console.log('Resumen guardado:', resumenEditable);
  };

  const totalMedicamentos = tratamientosMedicos.filter(t => t.tipoTratamiento === 'MEDICAMENTO').length;
  const totalProcedimientos = tratamientosMedicos.filter(t => t.tipoTratamiento === 'PROCEDIMIENTO').length;
  const totalTerapias = tratamientosMedicos.filter(t => t.tipoTratamiento === 'TERAPIA').length;
  const totalMonitorizacion = tratamientosMedicos.filter(t => t.tipoTratamiento === 'MONITORIZACION').length;

  return (
    <Box>
      {/* Sección E: Resumen de Tratamiento */}
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
            <TratamientoIcon sx={{ fontSize: '1rem' }} />
            E. RESUMEN DE TRATAMIENTO Y PROCEDIMIENTOS TERAPÉUTICOS
          </Typography>

          {/* Información estadística */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            <Chip
              icon={<TratamientoIcon sx={{ fontSize: '0.7rem' }} />}
              label={`${tratamientosMedicos.length} tratamientos realizados`}
              size="small"
              color="primary"
              sx={{ fontSize: '0.65rem', fontWeight: 'bold' }}
            />
            <Chip
              icon={<MedicamentoIcon sx={{ fontSize: '0.7rem' }} />}
              label={`${totalMedicamentos} Medicamentos`}
              size="small"
              color="secondary"
              sx={{ fontSize: '0.65rem' }}
            />
            <Chip
              icon={<ProcedimientoIcon sx={{ fontSize: '0.7rem' }} />}
              label={`${totalProcedimientos} Procedimientos`}
              size="small"
              color="info"
              sx={{ fontSize: '0.65rem' }}
            />
            <Chip
              icon={<TerapiaIcon sx={{ fontSize: '0.7rem' }} />}
              label={`${totalTerapias} Terapias`}
              size="small"
              color="success"
              sx={{ fontSize: '0.65rem' }}
            />
            <Chip
              icon={<MonitorizacionIcon sx={{ fontSize: '0.7rem' }} />}
              label={`${totalMonitorizacion} Monitorización`}
              size="small"
              color="warning"
              sx={{ fontSize: '0.65rem' }}
            />
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* Cronología de tratamientos */}
          {tratamientosMedicos.length === 0 ? (
            <Alert severity="info" sx={{ fontSize: '0.7rem' }}>
              No hay tratamientos registrados para este paciente.
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
                💊 CRONOLOGÍA DE TRATAMIENTOS:
              </Typography>

              {tratamientosMedicos.map((tratamiento, index) => (
                <Accordion
                  key={tratamiento.id}
                  expanded={expandedTratamiento === tratamiento.id}
                  onChange={handleAccordionChange(tratamiento.id)}
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
                      backgroundColor: getColorByTipo(tratamiento.tipoTratamiento),
                      borderRadius: 1,
                      minHeight: 60
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                      {/* Ícono y tipo */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {getIconByTipo(tratamiento.tipoTratamiento)}
                        <Badge badgeContent={`D${tratamiento.dia}`} color="primary">
                          <Chip
                            label={tratamiento.tipoTratamiento}
                            size="small"
                            color="primary"
                            sx={{ fontSize: '0.65rem', fontWeight: 'bold' }}
                          />
                        </Badge>
                      </Box>

                      {/* Información principal */}
                      <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#333' }}>
                          {tratamiento.nombre}
                          {tratamiento.dosis && ` - ${tratamiento.dosis}`}
                          {tratamiento.via && ` ${tratamiento.via}`}
                        </Typography>
                        <Typography sx={{ fontSize: '0.7rem', color: '#666' }}>
                          {tratamiento.categoria} | {tratamiento.fecha} - {tratamiento.hora}
                        </Typography>
                        <Typography sx={{ fontSize: '0.65rem', color: '#666', fontStyle: 'italic' }}>
                          {tratamiento.especialidad} - {tratamiento.medico}
                        </Typography>
                      </Box>

                      {/* Estado y respuesta */}
                      <Box sx={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        <Chip
                          label={tratamiento.estado}
                          size="small"
                          color={getChipColorByEstado(tratamiento.estado) as any}
                          sx={{ fontSize: '0.6rem', fontWeight: 'bold' }}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          {getIconByRespuesta(tratamiento.respuesta)}
                          <Typography sx={{ fontSize: '0.6rem', fontWeight: 'bold' }}>
                            {tratamiento.respuesta}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </AccordionSummary>

                  <AccordionDetails sx={{ backgroundColor: '#fafafa' }}>
                    {/* Información del medicamento/tratamiento - CAMBIO: Grid por Box */}
                    <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
                      <Box sx={{ flex: 1, minWidth: '250px' }}>
                        <Paper variant="outlined" sx={{ p: 1.5, backgroundColor: '#e3f2fd' }}>
                          <Typography sx={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#1565c0', mb: 1 }}>
                            💊 DETALLES DEL TRATAMIENTO:
                          </Typography>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                            {tratamiento.dosis && (
                              <Typography sx={{ fontSize: '0.65rem' }}>
                                <strong>Dosis:</strong> {tratamiento.dosis}
                              </Typography>
                            )}
                            {tratamiento.via && (
                              <Typography sx={{ fontSize: '0.65rem' }}>
                                <strong>Vía:</strong> {tratamiento.via}
                              </Typography>
                            )}
                            {tratamiento.frecuencia && (
                              <Typography sx={{ fontSize: '0.65rem' }}>
                                <strong>Frecuencia:</strong> {tratamiento.frecuencia}
                              </Typography>
                            )}
                            <Typography sx={{ fontSize: '0.65rem' }}>
                              <strong>Duración:</strong> {tratamiento.duracion}
                            </Typography>
                          </Box>
                        </Paper>
                      </Box>
                      <Box sx={{ flex: 1, minWidth: '250px' }}>
                        <Paper variant="outlined" sx={{ p: 1.5, backgroundColor: '#f3e5f5' }}>
                          <Typography sx={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#7b1fa2', mb: 1 }}>
                            📅 FECHAS Y ESTADO:
                          </Typography>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                            <Typography sx={{ fontSize: '0.65rem' }}>
                              <strong>Inicio:</strong> {tratamiento.fechaInicio}
                            </Typography>
                            {tratamiento.fechaFin && (
                              <Typography sx={{ fontSize: '0.65rem' }}>
                                <strong>Fin:</strong> {tratamiento.fechaFin}
                              </Typography>
                            )}
                            <Typography sx={{ fontSize: '0.65rem' }}>
                              <strong>Estado:</strong> {tratamiento.estado}
                            </Typography>
                            <Typography sx={{ fontSize: '0.65rem' }}>
                              <strong>Orden:</strong> {tratamiento.numeroOrden}
                            </Typography>
                          </Box>
                        </Paper>
                      </Box>
                    </Box>

                    {/* Indicación */}
                    <Paper variant="outlined" sx={{ p: 1.5, mb: 2, backgroundColor: 'white' }}>
                      <Typography sx={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#1A3C6D', mb: 0.5 }}>
                        🎯 INDICACIÓN MÉDICA:
                      </Typography>
                      <Typography sx={{ fontSize: '0.7rem', color: '#333' }}>
                        {tratamiento.indicacion}
                      </Typography>
                    </Paper>

                    {/* Observaciones */}
                    <Paper variant="outlined" sx={{ p: 1.5, mb: 2, backgroundColor: '#e8f5e8' }}>
                      <Typography sx={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#388e3c', mb: 0.5 }}>
                        📝 OBSERVACIONES Y RESPUESTA:
                      </Typography>
                      <Typography sx={{ fontSize: '0.7rem', color: '#333' }}>
                        {tratamiento.observaciones}
                      </Typography>
                    </Paper>

                    {/* Información adicional */}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      <Chip
                        icon={<FechaIcon sx={{ fontSize: '0.6rem' }} />}
                        label={`${tratamiento.fecha} ${tratamiento.hora}`}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: '0.6rem' }}
                      />
                      <Chip
                        icon={<MedicoIcon sx={{ fontSize: '0.6rem' }} />}
                        label={tratamiento.medico}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: '0.6rem' }}
                      />
                      <Chip
                        icon={<DuracionIcon sx={{ fontSize: '0.6rem' }} />}
                        label={tratamiento.duracion}
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

      {/* Sección editable - Resúmenes especializados - CAMBIO: Grid por Box */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#1A3C6D",
                fontSize: "0.8rem",
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <EditarIcon sx={{ fontSize: '1rem' }} />
              RESÚMENES ESPECIALIZADOS (EDITABLE)
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {!modoEdicion ? (
                <Button
                  variant="outlined"
                  startIcon={<EditarIcon />}
                  onClick={() => setModoEdicion(true)}
                  sx={{ fontSize: '0.65rem', textTransform: 'none' }}
                >
                  Editar Resúmenes
                </Button>
              ) : (
                <>
                  <Button
                    variant="contained"
                    startIcon={<GuardarIcon />}
                    onClick={handleGuardarResumen}
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
                    onClick={() => setModoEdicion(false)}
                    sx={{ fontSize: '0.65rem', textTransform: 'none' }}
                  >
                    Cancelar
                  </Button>
                </>
              )}
            </Box>
          </Box>

          {/* CAMBIO: Reemplazando Grid container por Box con flexbox */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {/* Resumen Farmacológico */}
            <Box sx={{ flex: 1, minWidth: '300px' }}>
              <Paper variant="outlined" sx={{ p: 1.5, backgroundColor: '#fce4ec' }}>
                <Typography sx={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#c2185b', mb: 1 }}>
                  💊 RESUMEN FARMACOLÓGICO:
                </Typography>
                {modoEdicion ? (
                  <TextField
                    fullWidth
                    multiline
                    rows={8}
                    value={resumenEditable.resumenFarmacologico}
                    onChange={(e) => setResumenEditable(prev => ({
                      ...prev,
                      resumenFarmacologico: e.target.value
                    }))}
                    sx={{ 
                      '& .MuiInputBase-input': { fontSize: '0.7rem' }
                    }}
                  />
                ) : (
                  <Typography
                    sx={{
                      fontSize: '0.7rem',
                      lineHeight: 1.5,
                      color: '#333',
                      whiteSpace: 'pre-line',
                      fontFamily: 'monospace'
                    }}
                  >
                    {resumenEditable.resumenFarmacologico}
                  </Typography>
                )}
              </Paper>
            </Box>

            {/* Resumen de Procedimientos */}
            <Box sx={{ flex: 1, minWidth: '300px' }}>
              <Paper variant="outlined" sx={{ p: 1.5, backgroundColor: '#e8eaf6' }}>
                <Typography sx={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#3f51b5', mb: 1 }}>
                  🏥 RESUMEN DE PROCEDIMIENTOS:
                </Typography>
                {modoEdicion ? (
                  <TextField
                    fullWidth
                    multiline
                    rows={8}
                    value={resumenEditable.resumenProcedimientos}
                    onChange={(e) => setResumenEditable(prev => ({
                      ...prev,
                      resumenProcedimientos: e.target.value
                    }))}
                    sx={{ 
                      '& .MuiInputBase-input': { fontSize: '0.7rem' }
                    }}
                  />
                ) : (
                  <Typography
                    sx={{
                      fontSize: '0.7rem',
                      lineHeight: 1.5,
                      color: '#333',
                      whiteSpace: 'pre-line',
                      fontFamily: 'monospace'
                    }}
                  >
                    {resumenEditable.resumenProcedimientos}
                  </Typography>
                )}
              </Paper>
            </Box>

            {/* Resumen Terapéutico */}
            <Box sx={{ flex: 1, minWidth: '300px' }}>
              <Paper variant="outlined" sx={{ p: 1.5, backgroundColor: '#e8f5e8' }}>
                <Typography sx={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#4caf50', mb: 1 }}>
                  🔄 RESUMEN TERAPÉUTICO:
                </Typography>
                {modoEdicion ? (
                  <TextField
                    fullWidth
                    multiline
                    rows={8}
                    value={resumenEditable.resumenTerapeutico}
                    onChange={(e) => setResumenEditable(prev => ({
                      ...prev,
                      resumenTerapeutico: e.target.value
                    }))}
                    sx={{ 
                      '& .MuiInputBase-input': { fontSize: '0.7rem' }
                    }}
                  />
                ) : (
                  <Typography
                    sx={{
                      fontSize: '0.7rem',
                      lineHeight: 1.5,
                      color: '#333',
                      whiteSpace: 'pre-line',
                      fontFamily: 'monospace'
                    }}
                  >
                    {resumenEditable.resumenTerapeutico}
                  </Typography>
                )}
              </Paper>
            </Box>

            {/* Observaciones Generales */}
            <Box sx={{ flex: 1, minWidth: '300px' }}>
              <Paper variant="outlined" sx={{ p: 1.5, backgroundColor: '#fff3e0' }}>
                <Typography sx={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#f57c00', mb: 1 }}>
                  📝 OBSERVACIONES GENERALES:
                </Typography>
                {modoEdicion ? (
                  <TextField
                    fullWidth
                    multiline
                    rows={8}
                    value={resumenEditable.observacionesGenerales}
                    onChange={(e) => setResumenEditable(prev => ({
                      ...prev,
                      observacionesGenerales: e.target.value
                    }))}
                    sx={{ 
                      '& .MuiInputBase-input': { fontSize: '0.7rem' }
                    }}
                  />
                ) : (
                  <Typography
                    sx={{
                      fontSize: '0.7rem',
                      lineHeight: 1.5,
                      color: '#333',
                      whiteSpace: 'pre-line',
                      fontFamily: 'monospace'
                    }}
                  >
                    {resumenEditable.observacionesGenerales}
                  </Typography>
                )}
              </Paper>
            </Box>
          </Box>
        </CardContent>
      </Card>

    </Box>
  );
}