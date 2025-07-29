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
  ListItemButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
  Badge,
} from '@mui/material';
import {
  Search as BuscarIcon,
  Add as AgregarIcon,
  Delete as EliminarIcon,
  Edit as EditarIcon,
  Save as GuardarIcon,
  Cancel as CancelarIcon,
  CheckCircle as ConfirmadoIcon,
  Warning as AlertaIcon,
  Info as InfoIcon,
  MedicalServices as PrincipalIcon,
  Assignment as SecundarioIcon,
  Report as CausaIcon,
  Visibility as VerIcon,
  Close as CerrarIcon,
} from "@mui/icons-material";

interface DiagnosticoCIE10 {
  codigo: string;
  descripcion: string;
  categoria: string;
  capitulo: string;
  tipo: 'PRINCIPAL' | 'SECUNDARIO';
  confirmado: boolean;
  fechaRegistro: string;
}

interface CausaExterna {
  descripcion: string;
  fechaRegistro: string;
  editadoPor: string;
}

interface CodigoCIE10 {
  codigo: string;
  descripcion: string;
  categoria: string;
  capitulo: string;
}

export default function DiagnosticoAlta() {
  const [diagnosticosPrincipales, setDiagnosticosPrincipales] = useState<DiagnosticoCIE10[]>([]);
  const [diagnosticosSecundarios, setDiagnosticosSecundarios] = useState<DiagnosticoCIE10[]>([]);
  const [causaExterna, setCausaExterna] = useState<CausaExterna>({
    descripcion: '',
    fechaRegistro: '',
    editadoPor: ''
  });
  
  const [busquedaCIE10, setBusquedaCIE10] = useState('');
  const [resultadosBusqueda, setResultadosBusqueda] = useState<CodigoCIE10[]>([]);
  const [openBuscador, setOpenBuscador] = useState(false);
  const [tipoDiagnostico, setTipoDiagnostico] = useState<'PRINCIPAL' | 'SECUNDARIO'>('PRINCIPAL');
  const [modoEdicionCausa, setModoEdicionCausa] = useState(false);

  // Base de datos simulada CIE10 - Códigos cardiovasculares más comunes
  const baseCIE10: CodigoCIE10[] = [
    // Enfermedades cardiovasculares (I00-I99)
    { codigo: 'I21.9', descripcion: 'Infarto agudo del miocardio, sin otra especificación', categoria: 'Cardiopatía isquémica aguda', capitulo: 'IX - Enfermedades del sistema circulatorio' },
    { codigo: 'I21.0', descripcion: 'Infarto agudo transmural de la pared anterior del miocardio', categoria: 'Cardiopatía isquémica aguda', capitulo: 'IX - Enfermedades del sistema circulatorio' },
    { codigo: 'I21.1', descripcion: 'Infarto agudo transmural de la pared inferior del miocardio', categoria: 'Cardiopatía isquémica aguda', capitulo: 'IX - Enfermedades del sistema circulatorio' },
    { codigo: 'I21.2', descripcion: 'Infarto agudo transmural de otras localizaciones del miocardio', categoria: 'Cardiopatía isquémica aguda', capitulo: 'IX - Enfermedades del sistema circulatorio' },
    { codigo: 'I21.4', descripcion: 'Infarto agudo subendocárdico del miocardio', categoria: 'Cardiopatía isquémica aguda', capitulo: 'IX - Enfermedades del sistema circulatorio' },
    
    { codigo: 'I50.9', descripcion: 'Insuficiencia cardíaca, no especificada', categoria: 'Insuficiencia cardíaca', capitulo: 'IX - Enfermedades del sistema circulatorio' },
    { codigo: 'I50.0', descripcion: 'Insuficiencia cardíaca congestiva', categoria: 'Insuficiencia cardíaca', capitulo: 'IX - Enfermedades del sistema circulatorio' },
    { codigo: 'I50.1', descripcion: 'Insuficiencia ventricular izquierda', categoria: 'Insuficiencia cardíaca', capitulo: 'IX - Enfermedades del sistema circulatorio' },
    
    { codigo: 'I10', descripcion: 'Hipertensión esencial (primaria)', categoria: 'Enfermedades hipertensivas', capitulo: 'IX - Enfermedades del sistema circulatorio' },
    { codigo: 'I11.9', descripcion: 'Enfermedad cardíaca hipertensiva sin insuficiencia cardíaca', categoria: 'Enfermedades hipertensivas', capitulo: 'IX - Enfermedades del sistema circulatorio' },
    { codigo: 'I12.9', descripcion: 'Enfermedad renal hipertensiva sin insuficiencia renal', categoria: 'Enfermedades hipertensivas', capitulo: 'IX - Enfermedades del sistema circulatorio' },
    
    { codigo: 'I48.9', descripcion: 'Fibrilación y aleteo auricular, no especificados', categoria: 'Arritmias cardíacas', capitulo: 'IX - Enfermedades del sistema circulatorio' },
    { codigo: 'I49.9', descripcion: 'Arritmia cardíaca, no especificada', categoria: 'Arritmias cardíacas', capitulo: 'IX - Enfermedades del sistema circulatorio' },
    
    { codigo: 'E78.5', descripcion: 'Hiperlipidemia, no especificada', categoria: 'Trastornos del metabolismo', capitulo: 'IV - Enfermedades endocrinas' },
    { codigo: 'E78.0', descripcion: 'Hipercolesterolemia pura', categoria: 'Trastornos del metabolismo', capitulo: 'IV - Enfermedades endocrinas' },
    { codigo: 'E11.9', descripcion: 'Diabetes mellitus no insulinodependiente, sin complicaciones', categoria: 'Diabetes mellitus', capitulo: 'IV - Enfermedades endocrinas' },
    
    { codigo: 'J44.1', descripcion: 'Enfermedad pulmonar obstructiva crónica con exacerbación aguda', categoria: 'Enfermedades respiratorias crónicas', capitulo: 'X - Enfermedades del sistema respiratorio' },
    { codigo: 'J18.9', descripcion: 'Neumonía, no especificada', categoria: 'Infecciones respiratorias', capitulo: 'X - Enfermedades del sistema respiratorio' },
    
    { codigo: 'N18.6', descripcion: 'Enfermedad renal crónica, estadio 5', categoria: 'Insuficiencia renal crónica', capitulo: 'XIV - Enfermedades del sistema genitourinario' },
    { codigo: 'N17.9', descripcion: 'Insuficiencia renal aguda, no especificada', categoria: 'Insuficiencia renal aguda', capitulo: 'XIV - Enfermedades del sistema genitourinario' },
    
    { codigo: 'Z51.1', descripcion: 'Quimioterapia para neoplasia', categoria: 'Factores que influyen en el estado de salud', capitulo: 'XXI - Factores que influyen en el estado de salud' },
    { codigo: 'Z95.1', descripcion: 'Presencia de derivación aortocoronaria', categoria: 'Factores que influyen en el estado de salud', capitulo: 'XXI - Factores que influyen en el estado de salud' },
  ];

  // Cargar datos iniciales
  useEffect(() => {
    const diagnosticosIniciales: DiagnosticoCIE10[] = [
      {
        codigo: 'I21.1',
        descripcion: 'Infarto agudo transmural de la pared inferior del miocardio',
        categoria: 'Cardiopatía isquémica aguda',
        capitulo: 'IX - Enfermedades del sistema circulatorio',
        tipo: 'PRINCIPAL',
        confirmado: true,
        fechaRegistro: '2024-07-29 10:30'
      }
    ];

    const secundariosIniciales: DiagnosticoCIE10[] = [
      {
        codigo: 'I10',
        descripcion: 'Hipertensión esencial (primaria)',
        categoria: 'Enfermedades hipertensivas',
        capitulo: 'IX - Enfermedades del sistema circulatorio',
        tipo: 'SECUNDARIO',
        confirmado: true,
        fechaRegistro: '2024-07-29 10:32'
      },
      {
        codigo: 'E78.5',
        descripcion: 'Hiperlipidemia, no especificada',
        categoria: 'Trastornos del metabolismo',
        capitulo: 'IV - Enfermedades endocrinas',
        tipo: 'SECUNDARIO',
        confirmado: true,
        fechaRegistro: '2024-07-29 10:33'
      }
    ];

    setDiagnosticosPrincipales(diagnosticosIniciales);
    setDiagnosticosSecundarios(secundariosIniciales);

    setCausaExterna({
      descripcion: `CAUSA EXTERNA - FACTORES PRECIPITANTES DEL EVENTO CARDIOVASCULAR:

FACTORES DE RIESGO IDENTIFICADOS:

1. FACTORES DE RIESGO MAYORES:
   • Tabaquismo activo: 20 cigarrillos/día por 15 años
   • Hipertensión arterial no controlada: >10 años de evolución
   • Dislipidemia: Colesterol total >240 mg/dL, LDL >160 mg/dL
   • Antecedente familiar: Padre con IAM a los 55 años

2. FACTORES DE RIESGO MENORES:
   • Sedentarismo: Actividad física <2 veces/semana
   • Sobrepeso: IMC 28.5 kg/m² (peso: 85 kg, talla: 1.75 m)
   • Estrés laboral crónico: Trabajo de alta demanda
   • Dieta rica en grasas saturadas

3. EVENTO PRECIPITANTE INMEDIATO:
   • Esfuerzo físico intenso no habitual el día del evento
   • Paciente realizó mudanza de casa (carga de objetos pesados)
   • Actividad iniciada aproximadamente 2 horas antes del dolor torácico
   • Sin antecedente de actividad física regular previa

4. CONDICIONES AMBIENTALES Y SOCIALES:
   • Ambiente laboral estresante (gerente de ventas)
   • Jornadas laborales extensas (>10 horas diarias)
   • Consumo ocasional de alcohol (2-3 tragos fin de semana)
   • Dieta no cardiosaludable (comidas rápidas frecuentes)

5. FACTORES PSICOSOCIALES:
   • Estrés familiar por situación económica
   • Personalidad tipo A (competitivo, impaciente)
   • Ansiedad crónica no tratada
   • Soporte social limitado

EVALUACIÓN DE CAUSALIDAD:
La presentación del infarto agudo del miocardio se relaciona directamente con la combinación de múltiples factores de riesgo cardiovascular de larga data (tabaquismo, HTA, dislipidemia) y el evento precipitante agudo consistente en esfuerzo físico intenso no acostumbrado en paciente sedentario.

RECOMENDACIONES PREVENTIVAS:
• Cese completo e inmediato del tabaquismo
• Control estricto de hipertensión arterial
• Manejo integral de dislipidemia
• Programa de rehabilitación cardíaca
• Modificación del estilo de vida
• Manejo del estrés y apoyo psicológico
• Educación sobre factores de riesgo cardiovascular`,
      fechaRegistro: '2024-07-29 10:35',
      editadoPor: 'Dr. Carlos Mendoza Silva'
    });
  }, []);

  // Función de búsqueda CIE10
  const buscarCIE10 = (termino: string) => {
    if (termino.length < 2) {
      setResultadosBusqueda([]);
      return;
    }

    const resultados = baseCIE10.filter(item =>
      item.codigo.toLowerCase().includes(termino.toLowerCase()) ||
      item.descripcion.toLowerCase().includes(termino.toLowerCase()) ||
      item.categoria.toLowerCase().includes(termino.toLowerCase())
    );

    setResultadosBusqueda(resultados.slice(0, 10)); // Limitar a 10 resultados
  };

  const handleBusquedaChange = (value: string) => {
    setBusquedaCIE10(value);
    buscarCIE10(value);
  };

  const agregarDiagnostico = (diagnostico: CodigoCIE10) => {
    const nuevoDiagnostico: DiagnosticoCIE10 = {
      ...diagnostico,
      tipo: tipoDiagnostico,
      confirmado: false,
      fechaRegistro: new Date().toLocaleString('es-CO')
    };

    if (tipoDiagnostico === 'PRINCIPAL') {
      setDiagnosticosPrincipales(prev => [...prev, nuevoDiagnostico]);
    } else {
      setDiagnosticosSecundarios(prev => [...prev, nuevoDiagnostico]);
    }

    setOpenBuscador(false);
    setBusquedaCIE10('');
    setResultadosBusqueda([]);
  };

  const eliminarDiagnostico = (codigo: string, tipo: 'PRINCIPAL' | 'SECUNDARIO') => {
    if (tipo === 'PRINCIPAL') {
      setDiagnosticosPrincipales(prev => prev.filter(d => d.codigo !== codigo));
    } else {
      setDiagnosticosSecundarios(prev => prev.filter(d => d.codigo !== codigo));
    }
  };

  const confirmarDiagnostico = (codigo: string, tipo: 'PRINCIPAL' | 'SECUNDARIO') => {
    if (tipo === 'PRINCIPAL') {
      setDiagnosticosPrincipales(prev =>
        prev.map(d => d.codigo === codigo ? { ...d, confirmado: !d.confirmado } : d)
      );
    } else {
      setDiagnosticosSecundarios(prev =>
        prev.map(d => d.codigo === codigo ? { ...d, confirmado: !d.confirmado } : d)
      );
    }
  };

  const handleGuardarCausa = () => {
    setCausaExterna(prev => ({
      ...prev,
      fechaRegistro: new Date().toLocaleString('es-CO'),
      editadoPor: 'Dr. Usuario Actual'
    }));
    setModoEdicionCausa(false);
  };

  const totalDiagnosticos = diagnosticosPrincipales.length + diagnosticosSecundarios.length;
  const diagnosticosConfirmados = [...diagnosticosPrincipales, ...diagnosticosSecundarios].filter(d => d.confirmado).length;

  return (
    <Box>
      {/* Sección G: Diagnóstico de Alta/Egreso */}
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
            <PrincipalIcon sx={{ fontSize: '1rem' }} />
            G. DIAGNÓSTICO DE ALTA/EGRESO
          </Typography>

          {/* Información estadística */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            <Chip
              icon={<PrincipalIcon sx={{ fontSize: '0.7rem' }} />}
              label={`${totalDiagnosticos} diagnósticos registrados`}
              size="small"
              color="primary"
              sx={{ fontSize: '0.65rem', fontWeight: 'bold' }}
            />
            <Chip
              icon={<ConfirmadoIcon sx={{ fontSize: '0.7rem' }} />}
              label={`${diagnosticosConfirmados} confirmados`}
              size="small"
              color="success"
              sx={{ fontSize: '0.65rem' }}
            />
            <Chip
              icon={<PrincipalIcon sx={{ fontSize: '0.7rem' }} />}
              label={`${diagnosticosPrincipales.length} Principal(es)`}
              size="small"
              color="error"
              sx={{ fontSize: '0.65rem' }}
            />
            <Chip
              icon={<SecundarioIcon sx={{ fontSize: '0.7rem' }} />}
              label={`${diagnosticosSecundarios.length} Secundario(s)`}
              size="small"
              color="info"
              sx={{ fontSize: '0.65rem' }}
            />
          </Box>

          {/* Botón para abrir buscador */}
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <Button
              variant="contained"
              startIcon={<BuscarIcon />}
              onClick={() => setOpenBuscador(true)}
              sx={{ 
                fontSize: '0.65rem', 
                textTransform: 'none',
                backgroundColor: '#1976d2'
              }}
            >
              Buscar Diagnóstico CIE10
            </Button>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel sx={{ fontSize: '0.7rem' }}>Tipo</InputLabel>
              <Select
                value={tipoDiagnostico}
                onChange={(e) => setTipoDiagnostico(e.target.value as 'PRINCIPAL' | 'SECUNDARIO')}
                sx={{ fontSize: '0.7rem' }}
              >
                <MenuItem value="PRINCIPAL" sx={{ fontSize: '0.7rem' }}>Principal</MenuItem>
                <MenuItem value="SECUNDARIO" sx={{ fontSize: '0.7rem' }}>Secundario</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Divider sx={{ mb: 2 }} />
        </CardContent>
      </Card>

      {/* Diagnósticos Principales */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 2 }}>
          <Typography
            variant="h6"
            sx={{
              mb: 1.5,
              fontWeight: "bold",
              color: "#d32f2f",
              fontSize: "0.8rem",
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <PrincipalIcon sx={{ fontSize: '1rem' }} />
            🎯 DIAGNÓSTICO PRINCIPAL:
            <Badge badgeContent={diagnosticosPrincipales.length} color="error" sx={{ ml: 1 }} />
          </Typography>

          {diagnosticosPrincipales.length === 0 ? (
            <Alert severity="warning" sx={{ fontSize: '0.7rem' }}>
              No hay diagnósticos principales registrados. Use el buscador CIE10 para agregar.
            </Alert>
          ) : (
            <Box>
              {diagnosticosPrincipales.map((diagnostico, index) => (
                <Paper
                  key={diagnostico.codigo}
                  variant="outlined"
                  sx={{ 
                    p: 1.5, 
                    mb: 1.5,
                    backgroundColor: diagnostico.confirmado ? '#ffebee' : '#fff3e0',
                    border: diagnostico.confirmado ? '2px solid #4caf50' : '1px solid #ff9800'
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <Chip
                          label={diagnostico.codigo}
                          size="small"
                          color="error"
                          sx={{ fontSize: '0.65rem', fontWeight: 'bold' }}
                        />
                        <Chip
                          label={diagnostico.confirmado ? 'CONFIRMADO' : 'PENDIENTE'}
                          size="small"
                          color={diagnostico.confirmado ? 'success' : 'warning'}
                          sx={{ fontSize: '0.6rem' }}
                        />
                      </Box>
                      
                      <Typography sx={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#333', mb: 0.5 }}>
                        {diagnostico.descripcion}
                      </Typography>
                      
                      <Typography sx={{ fontSize: '0.7rem', color: '#666', mb: 0.5 }}>
                        <strong>Categoría:</strong> {diagnostico.categoria}
                      </Typography>
                      
                      <Typography sx={{ fontSize: '0.65rem', color: '#666' }}>
                        <strong>Capítulo:</strong> {diagnostico.capitulo}
                      </Typography>
                      
                      <Typography sx={{ fontSize: '0.6rem', color: '#999', fontStyle: 'italic', mt: 0.5 }}>
                        Registrado: {diagnostico.fechaRegistro}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      <Tooltip title={diagnostico.confirmado ? 'Marcar como pendiente' : 'Confirmar diagnóstico'}>
                        <IconButton
                          size="small"
                          onClick={() => confirmarDiagnostico(diagnostico.codigo, 'PRINCIPAL')}
                          sx={{ color: diagnostico.confirmado ? '#4caf50' : '#ff9800' }}
                        >
                          <ConfirmadoIcon sx={{ fontSize: '1rem' }} />
                        </IconButton>
                      </Tooltip>
                      
                      <Tooltip title="Eliminar diagnóstico">
                        <IconButton
                          size="small"
                          onClick={() => eliminarDiagnostico(diagnostico.codigo, 'PRINCIPAL')}
                          sx={{ color: '#f44336' }}
                        >
                          <EliminarIcon sx={{ fontSize: '1rem' }} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                </Paper>
              ))}
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Diagnósticos Secundarios */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 2 }}>
          <Typography
            variant="h6"
            sx={{
              mb: 1.5,
              fontWeight: "bold",
              color: "#1976d2",
              fontSize: "0.8rem",
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <SecundarioIcon sx={{ fontSize: '1rem' }} />
            📋 DIAGNÓSTICOS SECUNDARIOS:
            <Badge badgeContent={diagnosticosSecundarios.length} color="info" sx={{ ml: 1 }} />
          </Typography>

          {diagnosticosSecundarios.length === 0 ? (
            <Alert severity="info" sx={{ fontSize: '0.7rem' }}>
              No hay diagnósticos secundarios registrados. Use el buscador CIE10 para agregar.
            </Alert>
          ) : (
            <Box>
              {diagnosticosSecundarios.map((diagnostico, index) => (
                <Paper
                  key={diagnostico.codigo}
                  variant="outlined"
                  sx={{ 
                    p: 1.5, 
                    mb: 1.5,
                    backgroundColor: diagnostico.confirmado ? '#e3f2fd' : '#f3e5f5',
                    border: diagnostico.confirmado ? '2px solid #4caf50' : '1px solid #9c27b0'
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <Chip
                          label={diagnostico.codigo}
                          size="small"
                          color="info"
                          sx={{ fontSize: '0.65rem', fontWeight: 'bold' }}
                        />
                        <Chip
                          label={diagnostico.confirmado ? 'CONFIRMADO' : 'PENDIENTE'}
                          size="small"
                          color={diagnostico.confirmado ? 'success' : 'warning'}
                          sx={{ fontSize: '0.6rem' }}
                        />
                      </Box>
                      
                      <Typography sx={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#333', mb: 0.5 }}>
                        {diagnostico.descripcion}
                      </Typography>
                      
                      <Typography sx={{ fontSize: '0.7rem', color: '#666', mb: 0.5 }}>
                        <strong>Categoría:</strong> {diagnostico.categoria}
                      </Typography>
                      
                      <Typography sx={{ fontSize: '0.65rem', color: '#666' }}>
                        <strong>Capítulo:</strong> {diagnostico.capitulo}
                      </Typography>
                      
                      <Typography sx={{ fontSize: '0.6rem', color: '#999', fontStyle: 'italic', mt: 0.5 }}>
                        Registrado: {diagnostico.fechaRegistro}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      <Tooltip title={diagnostico.confirmado ? 'Marcar como pendiente' : 'Confirmar diagnóstico'}>
                        <IconButton
                          size="small"
                          onClick={() => confirmarDiagnostico(diagnostico.codigo, 'SECUNDARIO')}
                          sx={{ color: diagnostico.confirmado ? '#4caf50' : '#ff9800' }}
                        >
                          <ConfirmadoIcon sx={{ fontSize: '1rem' }} />
                        </IconButton>
                      </Tooltip>
                      
                      <Tooltip title="Eliminar diagnóstico">
                        <IconButton
                          size="small"
                          onClick={() => eliminarDiagnostico(diagnostico.codigo, 'SECUNDARIO')}
                          sx={{ color: '#f44336' }}
                        >
                          <EliminarIcon sx={{ fontSize: '1rem' }} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                </Paper>
              ))}
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Causa Externa */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#f57c00",
                fontSize: "0.8rem",
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <CausaIcon sx={{ fontSize: '1rem' }} />
              📝 CAUSA EXTERNA (Campo extenso):
            </Typography>

            <Box sx={{ display: 'flex', gap: 1 }}>
              {!modoEdicionCausa ? (
                <Button
                  variant="outlined"
                  startIcon={<EditarIcon />}
                  onClick={() => setModoEdicionCausa(true)}
                  sx={{ fontSize: '0.65rem', textTransform: 'none' }}
                >
                  Editar Causa
                </Button>
              ) : (
                <>
                  <Button
                    variant="contained"
                    startIcon={<GuardarIcon />}
                    onClick={handleGuardarCausa}
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
                    onClick={() => setModoEdicionCausa(false)}
                    sx={{ fontSize: '0.65rem', textTransform: 'none' }}
                  >
                    Cancelar
                  </Button>
                </>
              )}
            </Box>
          </Box>

          <Paper variant="outlined" sx={{ p: 1.5, backgroundColor: '#fff3e0' }}>
            {modoEdicionCausa ? (
              <TextField
                fullWidth
                multiline
                minRows={15}
                maxRows={30}
                value={causaExterna.descripcion}
                onChange={(e) => setCausaExterna(prev => ({
                  ...prev,
                  descripcion: e.target.value
                }))}
                placeholder="Describa detalladamente la causa externa, factores precipitantes, circunstancias del evento..."
                sx={{
                  '& .MuiInputBase-root': {
                    fontSize: '0.7rem',
                    fontFamily: 'monospace',
                    lineHeight: 1.4,
                    backgroundColor: 'white'
                  }
                }}
                helperText="Campo de texto extenso para descripción detallada de causas externas y factores precipitantes"
              />
            ) : (
              <Box
                sx={{
                  minHeight: '300px',
                  maxHeight: '500px',
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
                  {causaExterna.descripcion || 'No se ha registrado información sobre causa externa.'}
                </Typography>
              </Box>
            )}

            {causaExterna.fechaRegistro && (
              <Typography sx={{ fontSize: '0.6rem', color: '#999', fontStyle: 'italic', mt: 1 }}>
                Última edición: {causaExterna.fechaRegistro} - {causaExterna.editadoPor}
              </Typography>
            )}
          </Paper>
        </CardContent>
      </Card>

      {/* Dialog Buscador CIE10 */}
      <Dialog
        open={openBuscador}
        onClose={() => setOpenBuscador(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { minHeight: '500px' }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          fontSize: '0.8rem',
          fontWeight: 'bold'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <BuscarIcon sx={{ fontSize: '1rem' }} />
            BUSCADOR CIE10 - {tipoDiagnostico}
          </Box>
          <IconButton onClick={() => setOpenBuscador(false)} size="small">
            <CerrarIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            placeholder="Buscar por código, descripción o categoría..."
            value={busquedaCIE10}
            onChange={(e) => handleBusquedaChange(e.target.value)}
            sx={{ mb: 2, '& .MuiInputBase-input': { fontSize: '0.7rem' } }}
            InputProps={{
              startAdornment: <BuscarIcon sx={{ fontSize: '1rem', color: '#666', mr: 1 }} />
            }}
          />

          {busquedaCIE10.length < 2 ? (
            <Alert severity="info" sx={{ fontSize: '0.7rem' }}>
              Ingrese al menos 2 caracteres para buscar códigos CIE10
            </Alert>
          ) : resultadosBusqueda.length === 0 ? (
            <Alert severity="warning" sx={{ fontSize: '0.7rem' }}>
              No se encontraron códigos CIE10 que coincidan con "{busquedaCIE10}"
            </Alert>
          ) : (
            <Box>
              <Typography sx={{ fontSize: '0.7rem', fontWeight: 'bold', mb: 1, color: '#666' }}>
                {resultadosBusqueda.length} resultado(s) encontrado(s):
              </Typography>
              
              <List sx={{ maxHeight: 300, overflow: 'auto' }}>
                {resultadosBusqueda.map((codigo) => (
                  <ListItem key={codigo.codigo} disablePadding>
                    <ListItemButton
                      onClick={() => agregarDiagnostico(codigo)}
                      sx={{ 
                        border: '1px solid #ddd', 
                        borderRadius: 1, 
                        mb: 1,
                        '&:hover': { backgroundColor: '#f5f5f5' }
                      }}
                    >
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Chip
                              label={codigo.codigo}
                              size="small"
                              color="primary"
                              sx={{ fontSize: '0.65rem', fontWeight: 'bold' }}
                            />
                            <Typography sx={{ fontSize: '0.75rem', fontWeight: 'bold' }}>
                              {codigo.descripcion}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <Box sx={{ mt: 0.5 }}>
                            <Typography sx={{ fontSize: '0.7rem', color: '#666' }}>
                              <strong>Categoría:</strong> {codigo.categoria}
                            </Typography>
                            <Typography sx={{ fontSize: '0.65rem', color: '#999' }}>
                              {codigo.capitulo}
                            </Typography>
                          </Box>
                        }
                      />
                      <AgregarIcon sx={{ fontSize: '1rem', color: '#4caf50' }} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => setOpenBuscador(false)}
            sx={{ fontSize: '0.65rem', textTransform: 'none' }}
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

   
    </Box>
  );
}