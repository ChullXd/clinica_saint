import { useState, useEffect } from 'react';
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';
import {
  Search as BuscarIcon,
  Add as AgregarIcon,
  Delete as EliminarIcon,
  Edit as EditarIcon,
  PersonSearch as MedicoIcon,
  Badge as CedulaIcon,
  DateRange as PeriodoIcon,
  CheckCircle as ConfirmadoIcon,
  Close as CerrarIcon,
  Assignment,
} from "@mui/icons-material";

interface MedicoTratante {
  codigo: string;
  nombres: string;
  apellidos: string;
  nombreCompleto: string;
  especialidad: string;
  cedula: string;
  registroMedico: string;
  fechaInicio: string;
  fechaFin: string;
  diasResponsabilidad: number;
  estado: 'ACTIVO' | 'FINALIZADO' | 'SUSPENDIDO';
  selloFirma: boolean;
  observaciones: string;
  fechaRegistro: string;
}

interface BusquedaMedico {
  codigo: string;
  nombres: string;
  apellidos: string;
  especialidad: string;
  cedula: string;
  registroMedico: string;
  disponible: boolean;
}

export default function MedicoTratante() {
  const [medicosTratantes, setMedicosTratantes] = useState<MedicoTratante[]>([]);
  const [busquedaMedicos, setBusquedaMedicos] = useState('');
  const [resultadosBusqueda, setResultadosBusqueda] = useState<BusquedaMedico[]>([]);
  const [openBuscador, setOpenBuscador] = useState(false);
  const [openEdicion, setOpenEdicion] = useState(false);
  const [medicoSeleccionado, setMedicoSeleccionado] = useState<MedicoTratante | null>(null);
  const [modoEdicion, setModoEdicion] = useState<'AGREGAR' | 'EDITAR'>('AGREGAR');

  // Base de datos simulada de médicos disponibles
  const baseMedicos: BusquedaMedico[] = [
    {
      codigo: '273',
      nombres: 'JAIME PATRICIO',
      apellidos: 'LEMA MASALEMA',
      especialidad: 'MÉDICO URÓLOGO',
      cedula: '0912279775',
      registroMedico: 'RM-12345',
      disponible: true
    },
    {
      codigo: '876',
      nombres: 'ALVAREZ SAENZ',
      apellidos: 'DR. SAENZ',
      especialidad: 'MÉDICO GENERAL RESIDENTE',
      cedula: '0705963858',
      registroMedico: 'RM-67890',
      disponible: true
    },
    {
      codigo: '451',
      nombres: 'CARLOS EDUARDO',
      apellidos: 'MENDOZA SILVA',
      especialidad: 'CARDIÓLOGO INTERVENCIONISTA',
      cedula: '1234567890',
      registroMedico: 'RM-11111',
      disponible: true
    },
    {
      codigo: '622',
      nombres: 'MARÍA ELENA',
      apellidos: 'GARCÍA TORRES',
      especialidad: 'CARDIÓLOGA CLÍNICA',
      cedula: '9876543210',
      registroMedico: 'RM-22222',
      disponible: true
    },
    {
      codigo: '789',
      nombres: 'ANDRÉS FELIPE',
      apellidos: 'ROJAS VARGAS',
      especialidad: 'INTENSIVISTA UCI',
      cedula: '5555666677',
      registroMedico: 'RM-33333',
      disponible: true
    },
    {
      codigo: '345',
      nombres: 'LUCÍA PATRICIA',
      apellidos: 'MORENO JIMÉNEZ',
      especialidad: 'MEDICINA INTERNA',
      cedula: '1111222233',
      registroMedico: 'RM-44444',
      disponible: true
    },
    {
      codigo: '567',
      nombres: 'FERNANDO JOSÉ',
      apellidos: 'CASTRO LÓPEZ',
      especialidad: 'ANESTESIÓLOGO',
      cedula: '4444555566',
      registroMedico: 'RM-55555',
      disponible: true
    },
    {
      codigo: '890',
      nombres: 'SANDRA MILENA',
      apellidos: 'HERRERA RUIZ',
      especialidad: 'ENFERMERA JEFE UCI',
      cedula: '7777888899',
      registroMedico: 'RE-66666',
      disponible: true
    }
  ];

  // Cargar datos iniciales
  useEffect(() => {
    const medicosIniciales: MedicoTratante[] = [
      {
        codigo: '273',
        nombres: 'JAIME PATRICIO',
        apellidos: 'LEMA MASALEMA',
        nombreCompleto: 'DR. JAIME PATRICIO LEMA MASALEMA',
        especialidad: 'MÉDICO URÓLOGO',
        cedula: '0912279775',
        registroMedico: 'RM-12345',
        fechaInicio: '2025-07-24',
        fechaFin: '2025-07-29',
        diasResponsabilidad: 5,
        estado: 'FINALIZADO',
        selloFirma: true,
        observaciones: 'Médico tratante principal durante hospitalización',
        fechaRegistro: '2025-07-24 08:00'
      },
        {
            codigo: '876',
            nombres: 'ALVAREZ SAENZ',
            apellidos: 'DR. SAENZ',
            nombreCompleto: 'DR. ALVAREZ SAENZ',
            especialidad: 'MÉDICO GENERAL RESIDENTE',
            cedula: '0705963858',
            registroMedico: 'RM-67890',
            fechaInicio: '2025-07-24',
            fechaFin: '',
            diasResponsabilidad: 0,
            estado: 'ACTIVO',
            selloFirma: false,
            observaciones: '',
            fechaRegistro: new Date().toLocaleString('es-CO')
        }
    ];

    setMedicosTratantes(medicosIniciales);
  }, []);

  // Función de búsqueda de médicos
  const buscarMedicos = (termino: string) => {
    if (termino.length < 2) {
      setResultadosBusqueda([]);
      return;
    }

    const resultados = baseMedicos.filter(medico =>
      medico.nombres.toLowerCase().includes(termino.toLowerCase()) ||
      medico.apellidos.toLowerCase().includes(termino.toLowerCase()) ||
      medico.especialidad.toLowerCase().includes(termino.toLowerCase()) ||
      medico.cedula.includes(termino) ||
      medico.codigo.includes(termino)
    );

    setResultadosBusqueda(resultados.slice(0, 8)); // Limitar a 8 resultados
  };

  const handleBusquedaChange = (value: string) => {
    setBusquedaMedicos(value);
    buscarMedicos(value);
  };

  const seleccionarMedico = (medico: BusquedaMedico) => {
    const nuevoMedico: MedicoTratante = {
      codigo: medico.codigo,
      nombres: medico.nombres,
      apellidos: medico.apellidos,
      nombreCompleto: `DR. ${medico.nombres} ${medico.apellidos}`,
      especialidad: medico.especialidad,
      cedula: medico.cedula,
      registroMedico: medico.registroMedico,
      fechaInicio: new Date().toISOString().split('T')[0],
      fechaFin: '',
      diasResponsabilidad: 0,
      estado: 'ACTIVO',
      selloFirma: false,
      observaciones: '',
      fechaRegistro: new Date().toLocaleString('es-CO')
    };

    setMedicoSeleccionado(nuevoMedico);
    setModoEdicion('AGREGAR');
    setOpenBuscador(false);
    setOpenEdicion(true);
    setBusquedaMedicos('');
    setResultadosBusqueda([]);
  };

  const editarMedico = (medico: MedicoTratante) => {
    setMedicoSeleccionado({ ...medico });
    setModoEdicion('EDITAR');
    setOpenEdicion(true);
  };

  const guardarMedico = () => {
    if (!medicoSeleccionado) return;

    // Calcular días de responsabilidad
    if (medicoSeleccionado.fechaInicio && medicoSeleccionado.fechaFin) {
      const inicio = new Date(medicoSeleccionado.fechaInicio);
      const fin = new Date(medicoSeleccionado.fechaFin);
      const diferencia = Math.ceil((fin.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      medicoSeleccionado.diasResponsabilidad = diferencia > 0 ? diferencia : 0;
    }

    if (modoEdicion === 'AGREGAR') {
      setMedicosTratantes(prev => [...prev, medicoSeleccionado]);
    } else {
      setMedicosTratantes(prev =>
        prev.map(m => m.codigo === medicoSeleccionado.codigo ? medicoSeleccionado : m)
      );
    }

    setOpenEdicion(false);
    setMedicoSeleccionado(null);
  };

  const eliminarMedico = (codigo: string) => {
    setMedicosTratantes(prev => prev.filter(m => m.codigo !== codigo));
  };

  const getColorEstado = (estado: string) => {
    switch (estado) {
      case 'ACTIVO': return 'success';
      case 'FINALIZADO': return 'default';
      case 'SUSPENDIDO': return 'error';
      default: return 'default';
    }
  };

  const getColorEspecialidad = (especialidad: string) => {
    if (especialidad.includes('CARDIÓLOGO')) return 'error';
    if (especialidad.includes('INTENSIVISTA')) return 'warning';
    if (especialidad.includes('ANESTESIÓLOGO')) return 'info';
    if (especialidad.includes('URÓLOGO')) return 'secondary';
    return 'primary';
  };

  const calcularTotalDias = () => {
    return medicosTratantes.reduce((total, medico) => total + medico.diasResponsabilidad, 0);
  };

  return (
    <Box>
      {/* Sección I: Médicos Tratantes */}
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
            <MedicoIcon sx={{ fontSize: '1rem' }} />
            I. MÉDICOS TRATANTES
          </Typography>

          {/* Información estadística */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            <Chip
              icon={<MedicoIcon sx={{ fontSize: '0.7rem' }} />}
              label={`${medicosTratantes.length} médicos registrados`}
              size="small"
              color="primary"
              sx={{ fontSize: '0.65rem', fontWeight: 'bold' }}
            />
            <Chip
              icon={<PeriodoIcon sx={{ fontSize: '0.7rem' }} />}
              label={`${calcularTotalDias()} días total responsabilidad`}
              size="small"
              color="info"
              sx={{ fontSize: '0.65rem' }}
            />
            <Chip
              icon={<ConfirmadoIcon sx={{ fontSize: '0.7rem' }} />}
              label={`${medicosTratantes.filter(m => m.selloFirma).length} con sello/firma`}
              size="small"
              color="success"
              sx={{ fontSize: '0.65rem' }}
            />
          </Box>

          {/* Botón para buscar médicos */}
          <Button
            variant="contained"
            startIcon={<BuscarIcon />}
            onClick={() => setOpenBuscador(true)}
            sx={{ 
              fontSize: '0.65rem', 
              textTransform: 'none',
              backgroundColor: '#1A3C6D',
              mb: 2
            }}
          >
            Buscar y Agregar Médico
          </Button>

          <Divider sx={{ mb: 2 }} />
        </CardContent>
      </Card>

      {/* Tabla de Médicos Tratantes */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 1 }}>
          <Typography
            variant="h6"
            sx={{
              mb: 1.5,
              fontWeight: "bold",
              color: "#2e7d32",
              fontSize: "0.8rem",
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <Assignment sx={{ fontSize: '1rem' }} />
             LISTADO DE MÉDICOS TRATANTES:
          </Typography>

          {medicosTratantes.length === 0 ? (
            <Alert severity="warning" sx={{ fontSize: '0.7rem' }}>
              No hay médicos tratantes registrados. Use el buscador para agregar médicos involucrados en el tratamiento.
            </Alert>
          ) : (
            <TableContainer component={Paper} variant="outlined">
              <Table size="small" sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableCell sx={{ fontSize: '0.7rem', fontWeight: 'bold', width: '80px' }}>
                      CÓDIGO
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.7rem', fontWeight: 'bold', width: '200px' }}>
                      MÉDICO
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.7rem', fontWeight: 'bold', width: '180px' }}>
                      ESPECIALIDAD
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.7rem', fontWeight: 'bold', width: '120px' }}>
                      CÉDULA
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.7rem', fontWeight: 'bold', width: '150px' }}>
                      PERÍODO
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.7rem', fontWeight: 'bold', width: '100px' }}>
                      ESTADO
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.7rem', fontWeight: 'bold', width: '100px' }}>
                      ACCIONES
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {medicosTratantes.map((medico) => (
                    <TableRow key={medico.codigo} hover>
                      <TableCell sx={{ fontSize: '0.65rem', fontWeight: 'bold' }}>
                        <Chip
                          label={medico.codigo}
                          size="small"
                          color="primary"
                          sx={{ fontSize: '0.6rem' }}
                        />
                      </TableCell>
                      
                      <TableCell sx={{ fontSize: '0.7rem' }}>
                        <Box>
                          <Typography sx={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#333' }}>
                            {medico.nombreCompleto}
                          </Typography>
                          <Typography sx={{ fontSize: '0.65rem', color: '#666' }}>
                            Reg: {medico.registroMedico}
                          </Typography>
                        </Box>
                      </TableCell>
                      
                      <TableCell sx={{ fontSize: '0.65rem' }}>
                        <Chip
                          label={medico.especialidad}
                          size="small"
                          color={getColorEspecialidad(medico.especialidad) as any}
                          sx={{ fontSize: '0.6rem' }}
                        />
                      </TableCell>
                      
                      <TableCell sx={{ fontSize: '0.7rem', fontFamily: 'monospace' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <CedulaIcon sx={{ fontSize: '0.7rem', color: '#666' }} />
                          {medico.cedula}
                        </Box>
                      </TableCell>
                      
                      <TableCell sx={{ fontSize: '0.65rem' }}>
                        <Box>
                          <Typography sx={{ fontSize: '0.65rem' }}>
                            <strong>Desde:</strong> {medico.fechaInicio}
                          </Typography>
                          <Typography sx={{ fontSize: '0.65rem' }}>
                            <strong>Hasta:</strong> {medico.fechaFin || 'En curso'}
                          </Typography>
                          <Typography sx={{ fontSize: '0.6rem', color: '#666' }}>
                            ({medico.diasResponsabilidad} días)
                          </Typography>
                        </Box>
                      </TableCell>
                      
                      <TableCell sx={{ fontSize: '0.65rem' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                          <Chip
                            label={medico.estado}
                            size="small"
                            color={getColorEstado(medico.estado) as any}
                            sx={{ fontSize: '0.55rem' }}
                          />
                          {medico.selloFirma && (
                            <Chip
                              label="FIRMADO"
                              size="small"
                              color="success"
                              sx={{ fontSize: '0.5rem' }}
                            />
                          )}
                        </Box>
                      </TableCell>
                      
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                          <Tooltip title="Editar médico">
                            <IconButton
                              size="small"
                              onClick={() => editarMedico(medico)}
                              sx={{ color: '#1976d2' }}
                            >
                              <EditarIcon sx={{ fontSize: '0.8rem' }} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Eliminar médico">
                            <IconButton
                              size="small"
                              onClick={() => eliminarMedico(medico.codigo)}
                              sx={{ color: '#d32f2f' }}
                            >
                              <EliminarIcon sx={{ fontSize: '0.8rem' }} />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      {/* Dialog Buscador de Médicos */}
      <Dialog
        open={openBuscador}
        onClose={() => setOpenBuscador(false)}
        maxWidth="lg"
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
            BUSCADOR DE MÉDICOS - Sistema Hospitalario
          </Box>
          <IconButton onClick={() => setOpenBuscador(false)} size="small">
            <CerrarIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            placeholder="Buscar por nombre, apellido, especialidad, cédula o código..."
            value={busquedaMedicos}
            onChange={(e) => handleBusquedaChange(e.target.value)}
            sx={{ mb: 2, '& .MuiInputBase-input': { fontSize: '0.7rem' } }}
            InputProps={{
              startAdornment: <BuscarIcon sx={{ fontSize: '1rem', color: '#666', mr: 1 }} />
            }}
          />

          {busquedaMedicos.length < 2 ? (
            <Alert severity="info" sx={{ fontSize: '0.7rem' }}>
              Ingrese al menos 2 caracteres para buscar médicos en el sistema
            </Alert>
          ) : resultadosBusqueda.length === 0 ? (
            <Alert severity="warning" sx={{ fontSize: '0.7rem' }}>
              No se encontraron médicos que coincidan con "{busquedaMedicos}"
            </Alert>
          ) : (
            <Box>
              <Typography sx={{ fontSize: '0.7rem', fontWeight: 'bold', mb: 1, color: '#666' }}>
                {resultadosBusqueda.length} médico(s) encontrado(s):
              </Typography>
              
              <TableContainer component={Paper} variant="outlined" sx={{ maxHeight: 350 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#f0f0f0' }}>
                      <TableCell sx={{ fontSize: '0.65rem', fontWeight: 'bold' }}>CÓDIGO</TableCell>
                      <TableCell sx={{ fontSize: '0.65rem', fontWeight: 'bold' }}>MÉDICO</TableCell>
                      <TableCell sx={{ fontSize: '0.65rem', fontWeight: 'bold' }}>ESPECIALIDAD</TableCell>
                      <TableCell sx={{ fontSize: '0.65rem', fontWeight: 'bold' }}>CÉDULA</TableCell>
                      <TableCell sx={{ fontSize: '0.65rem', fontWeight: 'bold' }}>ACCIONES</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {resultadosBusqueda.map((medico) => (
                      <TableRow 
                        key={medico.codigo} 
                        hover 
                        sx={{ 
                          cursor: 'pointer',
                          '&:hover': { backgroundColor: '#f5f5f5' }
                        }}
                      >
                        <TableCell sx={{ fontSize: '0.65rem' }}>
                          <Chip
                            label={medico.codigo}
                            size="small"
                            color="primary"
                            sx={{ fontSize: '0.6rem' }}
                          />
                        </TableCell>
                        <TableCell sx={{ fontSize: '0.7rem' }}>
                          <Typography sx={{ fontSize: '0.7rem', fontWeight: 'bold' }}>
                            {medico.nombres} {medico.apellidos}
                          </Typography>
                          <Typography sx={{ fontSize: '0.6rem', color: '#666' }}>
                            Reg: {medico.registroMedico}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ fontSize: '0.65rem' }}>
                          <Chip
                            label={medico.especialidad}
                            size="small"
                            color={getColorEspecialidad(medico.especialidad) as any}
                            sx={{ fontSize: '0.6rem' }}
                          />
                        </TableCell>
                        <TableCell sx={{ fontSize: '0.65rem', fontFamily: 'monospace' }}>
                          {medico.cedula}
                        </TableCell>
                        <TableCell>
                          <Button
                            size="small"
                            variant="contained"
                            startIcon={<AgregarIcon sx={{ fontSize: '0.7rem' }} />}
                            onClick={() => seleccionarMedico(medico)}
                            sx={{ 
                              fontSize: '0.6rem', 
                              textTransform: 'none',
                              backgroundColor: '#4caf50',
                              '&:hover': { backgroundColor: '#388e3c' }
                            }}
                          >
                            Seleccionar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
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

      {/* Dialog Edición/Agregar Médico */}
      <Dialog
        open={openEdicion}
        onClose={() => setOpenEdicion(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ fontSize: '0.8rem', fontWeight: 'bold' }}>
          {modoEdicion === 'AGREGAR' ? 'AGREGAR MÉDICO TRATANTE' : 'EDITAR MÉDICO TRATANTE'}
        </DialogTitle>

        <DialogContent>
          {medicoSeleccionado && (
            <Box sx={{ mt: 1 }}>
              {/* Fila 1: Código y Cédula */}
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField
                  label="Código"
                  value={medicoSeleccionado.codigo}
                  disabled
                  sx={{ 
                    flex: 1,
                    '& .MuiInputBase-input': { fontSize: '0.7rem' } 
                  }}
                  size="small"
                />
                
                <TextField
                  label="Cédula"
                  value={medicoSeleccionado.cedula}
                  onChange={(e) => setMedicoSeleccionado(prev => prev ? {
                    ...prev,
                    cedula: e.target.value
                  } : null)}
                  sx={{ 
                    flex: 1,
                    '& .MuiInputBase-input': { fontSize: '0.7rem' } 
                  }}
                  size="small"
                />
              </Box>
              
              {/* Fila 2: Nombres y Apellidos */}
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField
                  label="Nombres"
                  value={medicoSeleccionado.nombres}
                  onChange={(e) => setMedicoSeleccionado(prev => prev ? {
                    ...prev,
                    nombres: e.target.value,
                    nombreCompleto: `DR. ${e.target.value} ${prev.apellidos}`
                  } : null)}
                  sx={{ 
                    flex: 1,
                    '& .MuiInputBase-input': { fontSize: '0.7rem' } 
                  }}
                  size="small"
                />
                
                <TextField
                  label="Apellidos"
                  value={medicoSeleccionado.apellidos}
                  onChange={(e) => setMedicoSeleccionado(prev => prev ? {
                    ...prev,
                    apellidos: e.target.value,
                    nombreCompleto: `DR. ${prev.nombres} ${e.target.value}`
                  } : null)}
                  sx={{ 
                    flex: 1,
                    '& .MuiInputBase-input': { fontSize: '0.7rem' } 
                  }}
                  size="small"
                />
              </Box>
              
              {/* Fila 3: Especialidad */}
              <Box sx={{ mb: 2 }}>
                <TextField
                  label="Especialidad"
                  value={medicoSeleccionado.especialidad}
                  onChange={(e) => setMedicoSeleccionado(prev => prev ? {
                    ...prev,
                    especialidad: e.target.value
                  } : null)}
                  fullWidth
                  size="small"
                  sx={{ '& .MuiInputBase-input': { fontSize: '0.7rem' } }}
                />
              </Box>
              
              {/* Fila 4: Fechas */}
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField
                  label="Fecha Inicio Responsabilidad"
                  type="date"
                  value={medicoSeleccionado.fechaInicio}
                  onChange={(e) => setMedicoSeleccionado(prev => prev ? {
                    ...prev,
                    fechaInicio: e.target.value
                  } : null)}
                  sx={{ 
                    flex: 1,
                    '& .MuiInputBase-input': { fontSize: '0.7rem' } 
                  }}
                  size="small"
                  InputLabelProps={{ shrink: true }}
                />
                
                <TextField
                  label="Fecha Fin Responsabilidad"
                  type="date"
                  value={medicoSeleccionado.fechaFin}
                  onChange={(e) => setMedicoSeleccionado(prev => prev ? {
                    ...prev,
                    fechaFin: e.target.value
                  } : null)}
                  sx={{ 
                    flex: 1,
                    '& .MuiInputBase-input': { fontSize: '0.7rem' } 
                  }}
                  size="small"
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
              
              {/* Fila 5: Estado y Sello/Firma */}
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <FormControl sx={{ flex: 1 }} size="small">
                  <InputLabel sx={{ fontSize: '0.7rem' }}>Estado</InputLabel>
                  <Select
                    value={medicoSeleccionado.estado}
                    onChange={(e) => setMedicoSeleccionado(prev => prev ? {
                      ...prev,
                      estado: e.target.value as any
                    } : null)}
                    sx={{ fontSize: '0.7rem' }}
                  >
                    <MenuItem value="ACTIVO" sx={{ fontSize: '0.7rem' }}>ACTIVO</MenuItem>
                    <MenuItem value="FINALIZADO" sx={{ fontSize: '0.7rem' }}>FINALIZADO</MenuItem>
                    <MenuItem value="SUSPENDIDO" sx={{ fontSize: '0.7rem' }}>SUSPENDIDO</MenuItem>
                  </Select>
                </FormControl>
                
                <FormControl sx={{ flex: 1 }} size="small">
                  <InputLabel sx={{ fontSize: '0.7rem' }}>Sello y Firma</InputLabel>
                  <Select
                    value={medicoSeleccionado.selloFirma ? 'SI' : 'NO'}
                    onChange={(e) => setMedicoSeleccionado(prev => prev ? {
                      ...prev,
                      selloFirma: e.target.value === 'SI'
                    } : null)}
                    sx={{ fontSize: '0.7rem' }}
                  >
                    <MenuItem value="SI" sx={{ fontSize: '0.7rem' }}>SÍ - Con sello y firma</MenuItem>
                    <MenuItem value="NO" sx={{ fontSize: '0.7rem' }}>NO - Sin sello/firma</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              
              {/* Fila 6: Observaciones */}
              <Box>
                <TextField
                  label="Observaciones"
                  value={medicoSeleccionado.observaciones}
                  onChange={(e) => setMedicoSeleccionado(prev => prev ? {
                    ...prev,
                    observaciones: e.target.value
                  } : null)}
                  fullWidth
                  multiline
                  rows={3}
                  size="small"
                  sx={{ '& .MuiInputBase-input': { fontSize: '0.7rem' } }}
                  placeholder="Descripción de responsabilidades, procedimientos realizados, observaciones..."
                />
              </Box>
            </Box>
          )}
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => setOpenEdicion(false)}
            sx={{ fontSize: '0.65rem', textTransform: 'none' }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={guardarMedico}
            sx={{ 
              fontSize: '0.65rem', 
              textTransform: 'none',
              backgroundColor: '#4caf50',
              '&:hover': { backgroundColor: '#388e3c' }
            }}
          >
            {modoEdicion === 'AGREGAR' ? 'Agregar' : 'Actualizar'}
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
}