import React, { useState, useEffect } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  LocalHospital as DiagnosticoIcon,
  Search as BuscarIcon,
  Add as AgregarIcon,
  Delete as EliminarIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  List as ListaIcon,
  MedicalServices as CieIcon,
  CheckCircle as DefinitivoIcon,
  HelpOutline as PresuntivoIcon,
  ExpandMore as ExpandIcon,
  FilterList as FiltroIcon,
} from "@mui/icons-material";

interface DiagnosticoCIE {
  codigo: string;
  descripcion: string;
  categoria: string;
  capitulo: string;
}

interface DiagnosticoSeleccionado {
  id: string;
  codigo: string;
  descripcion: string;
  tipo: 'PRE' | 'DEF';
  fechaSeleccion: string;
}

export default function DiagnosticoI() {
  const [diagnosticosSeleccionados, setDiagnosticosSeleccionados] = useState<DiagnosticoSeleccionado[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [busquedaTexto, setBusquedaTexto] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [expandedInfo, setExpandedInfo] = useState<string | false>(false);

  // Base de datos simulada de diagnósticos CIE-10
  const diagnosticosCIE: DiagnosticoCIE[] = [
    // Enfermedades del sistema circulatorio (I00-I99)
    { codigo: 'I21.0', descripcion: 'INFARTO AGUDO DEL MIOCARDIO DE PARED ANTERIOR', categoria: 'CARDIOPATÍA ISQUÉMICA', capitulo: 'ENFERMEDADES DEL SISTEMA CIRCULATORIO' },
    { codigo: 'I21.1', descripcion: 'INFARTO AGUDO DEL MIOCARDIO DE PARED INFERIOR', categoria: 'CARDIOPATÍA ISQUÉMICA', capitulo: 'ENFERMEDADES DEL SISTEMA CIRCULATORIO' },
    { codigo: 'I21.9', descripcion: 'INFARTO AGUDO DEL MIOCARDIO, SIN OTRA ESPECIFICACIÓN', categoria: 'CARDIOPATÍA ISQUÉMICA', capitulo: 'ENFERMEDADES DEL SISTEMA CIRCULATORIO' },
    { codigo: 'I10', descripcion: 'HIPERTENSIÓN ESENCIAL (PRIMARIA)', categoria: 'ENFERMEDADES HIPERTENSIVAS', capitulo: 'ENFERMEDADES DEL SISTEMA CIRCULATORIO' },
    { codigo: 'I25.1', descripcion: 'ENFERMEDAD ATEROSCLERÓTICA DEL CORAZÓN', categoria: 'CARDIOPATÍA ISQUÉMICA', capitulo: 'ENFERMEDADES DEL SISTEMA CIRCULATORIO' },
    { codigo: 'I50.0', descripcion: 'INSUFICIENCIA CARDÍACA CONGESTIVA', categoria: 'INSUFICIENCIA CARDÍACA', capitulo: 'ENFERMEDADES DEL SISTEMA CIRCULATORIO' },
    
    // Enfermedades del sistema respiratorio (J00-J99)
    { codigo: 'J44.1', descripcion: 'ENFERMEDAD PULMONAR OBSTRUCTIVA CRÓNICA CON EXACERBACIÓN AGUDA', categoria: 'EPOC', capitulo: 'ENFERMEDADES DEL SISTEMA RESPIRATORIO' },
    { codigo: 'J18.9', descripcion: 'NEUMONÍA, NO ESPECIFICADA', categoria: 'NEUMONÍA', capitulo: 'ENFERMEDADES DEL SISTEMA RESPIRATORIO' },
    { codigo: 'J45.9', descripcion: 'ASMA, NO ESPECIFICADA', categoria: 'ASMA', capitulo: 'ENFERMEDADES DEL SISTEMA RESPIRATORIO' },
    { codigo: 'J44.0', descripcion: 'ENFERMEDAD PULMONAR OBSTRUCTIVA CRÓNICA CON INFECCIÓN RESPIRATORIA AGUDA', categoria: 'EPOC', capitulo: 'ENFERMEDADES DEL SISTEMA RESPIRATORIO' },
    
    // Enfermedades del sistema digestivo (K00-K95)
    { codigo: 'K25.9', descripcion: 'ÚLCERA GÁSTRICA, NO ESPECIFICADA COMO AGUDA O CRÓNICA', categoria: 'ÚLCERA PÉPTICA', capitulo: 'ENFERMEDADES DEL SISTEMA DIGESTIVO' },
    { codigo: 'K80.2', descripcion: 'CÁLCULO DE LA VESÍCULA BILIAR SIN COLECISTITIS', categoria: 'COLELITIASIS', capitulo: 'ENFERMEDADES DEL SISTEMA DIGESTIVO' },
    { codigo: 'K35.9', descripcion: 'APENDICITIS AGUDA, SIN OTRA ESPECIFICACIÓN', categoria: 'APENDICITIS', capitulo: 'ENFERMEDADES DEL SISTEMA DIGESTIVO' },
    { codigo: 'K59.0', descripcion: 'ESTREÑIMIENTO', categoria: 'TRASTORNOS FUNCIONALES', capitulo: 'ENFERMEDADES DEL SISTEMA DIGESTIVO' },
    
    // Enfermedades endocrinas, nutricionales y metabólicas (E00-E90)
    { codigo: 'E11.9', descripcion: 'DIABETES MELLITUS TIPO 2 SIN COMPLICACIONES', categoria: 'DIABETES MELLITUS', capitulo: 'ENFERMEDADES ENDOCRINAS' },
    { codigo: 'E11.6', descripcion: 'DIABETES MELLITUS TIPO 2 CON OTRAS COMPLICACIONES ESPECIFICADAS', categoria: 'DIABETES MELLITUS', capitulo: 'ENFERMEDADES ENDOCRINAS' },
    { codigo: 'E78.0', descripcion: 'HIPERCOLESTEROLEMIA PURA', categoria: 'TRASTORNOS LIPÍDICOS', capitulo: 'ENFERMEDADES ENDOCRINAS' },
    { codigo: 'E66.9', descripcion: 'OBESIDAD, NO ESPECIFICADA', categoria: 'OBESIDAD', capitulo: 'ENFERMEDADES ENDOCRINAS' },
    
    // Enfermedades del sistema genitourinario (N00-N99)
    { codigo: 'N39.0', descripcion: 'INFECCIÓN DE VÍAS URINARIAS, SITIO NO ESPECIFICADO', categoria: 'INFECCIÓN URINARIA', capitulo: 'ENFERMEDADES DEL SISTEMA GENITOURINARIO' },
    { codigo: 'N18.6', descripcion: 'ENFERMEDAD RENAL CRÓNICA, ESTADIO 5', categoria: 'ENFERMEDAD RENAL CRÓNICA', capitulo: 'ENFERMEDADES DEL SISTEMA GENITOURINARIO' },
    { codigo: 'N20.0', descripcion: 'CÁLCULO DEL RIÑÓN', categoria: 'LITIASIS RENAL', capitulo: 'ENFERMEDADES DEL SISTEMA GENITOURINARIO' },
    
    // Trastornos mentales y del comportamiento (F00-F99)
    { codigo: 'F32.9', descripcion: 'EPISODIO DEPRESIVO, NO ESPECIFICADO', categoria: 'TRASTORNOS DEL HUMOR', capitulo: 'TRASTORNOS MENTALES' },
    { codigo: 'F41.9', descripcion: 'TRASTORNO DE ANSIEDAD, NO ESPECIFICADO', categoria: 'TRASTORNOS DE ANSIEDAD', capitulo: 'TRASTORNOS MENTALES' },
    { codigo: 'F43.1', descripcion: 'TRASTORNO DE ESTRÉS POSTRAUMÁTICO', categoria: 'TRASTORNOS ADAPTATIVOS', capitulo: 'TRASTORNOS MENTALES' },
    
    // Enfermedades del sistema nervioso (G00-G99)
    { codigo: 'G93.1', descripcion: 'LESIÓN CEREBRAL ANÓXICA, NO CLASIFICADA EN OTRA PARTE', categoria: 'TRASTORNOS CEREBRALES', capitulo: 'ENFERMEDADES DEL SISTEMA NERVIOSO' },
    { codigo: 'G40.9', descripcion: 'EPILEPSIA, NO ESPECIFICADA', categoria: 'EPILEPSIA', capitulo: 'ENFERMEDADES DEL SISTEMA NERVIOSO' },
    { codigo: 'G43.9', descripcion: 'MIGRAÑA, NO ESPECIFICADA', categoria: 'CEFALEAS', capitulo: 'ENFERMEDADES DEL SISTEMA NERVIOSO' },
  ];

  // Filtrar diagnósticos según búsqueda y categoría
  const diagnosticosFiltrados = diagnosticosCIE.filter(diagnostico => {
    const coincideBusqueda = !busquedaTexto || 
      diagnostico.codigo.toLowerCase().includes(busquedaTexto.toLowerCase()) ||
      diagnostico.descripcion.toLowerCase().includes(busquedaTexto.toLowerCase()) ||
      diagnostico.categoria.toLowerCase().includes(busquedaTexto.toLowerCase());
    
    const coincideCategoria = !filtroCategoria || 
      diagnostico.capitulo === filtroCategoria;
    
    return coincideBusqueda && coincideCategoria;
  });

  // Obtener categorías únicas
  const categorias = Array.from(new Set(diagnosticosCIE.map(d => d.capitulo)));

  const agregarDiagnostico = (diagnostico: DiagnosticoCIE, tipo: 'PRE' | 'DEF') => {
    if (diagnosticosSeleccionados.length >= 6) {
      alert('Máximo 6 diagnósticos permitidos');
      return;
    }

    const nuevoDiagnostico: DiagnosticoSeleccionado = {
      id: Date.now().toString(),
      codigo: diagnostico.codigo,
      descripcion: diagnostico.descripcion,
      tipo: tipo,
      fechaSeleccion: new Date().toISOString(),
    };

    setDiagnosticosSeleccionados(prev => [...prev, nuevoDiagnostico]);
    setOpenDialog(false);
    setBusquedaTexto('');
  };

  const eliminarDiagnostico = (id: string) => {
    setDiagnosticosSeleccionados(prev => prev.filter(d => d.id !== id));
  };

  const cambiarTipoDiagnostico = (id: string, nuevoTipo: 'PRE' | 'DEF') => {
    setDiagnosticosSeleccionados(prev => 
      prev.map(d => d.id === id ? { ...d, tipo: nuevoTipo } : d)
    );
  };

  const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedInfo(isExpanded ? panel : false);
  };

  return (
    <Box>
      {/* Sección D: Diagnóstico */}
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
            <DiagnosticoIcon sx={{ fontSize: '1rem' }} />
            D. DIAGNÓSTICO
          </Typography>

          {/* Botón para agregar diagnóstico */}
          <Box sx={{ mb: 2 }}>
            <Button
              variant="contained"
              startIcon={<BuscarIcon />}
              onClick={() => setOpenDialog(true)}
              sx={{
                backgroundColor: '#1A3C6D',
                '&:hover': { backgroundColor: '#274472' },
                fontSize: '0.75rem',
                textTransform: 'none',
                mr: 1
              }}
            >
              Buscar Diagnóstico CIE-10
            </Button>
            
            <Typography variant="caption" sx={{ fontSize: '0.65rem', color: '#666', ml: 1 }}>
              ({diagnosticosSeleccionados.length}/6 diagnósticos)
            </Typography>
          </Box>

          {/* Lista de diagnósticos seleccionados */}
          <Box sx={{ mb: 2 }}>
            {diagnosticosSeleccionados.length === 0 ? (
              <Alert severity="info" sx={{ fontSize: '0.7rem' }}>
                No hay diagnósticos seleccionados. Use el buscador para agregar diagnósticos CIE-10.
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
                 DIAGNÓSTICOS SELECCIONADOS:
                </Typography>

                {diagnosticosSeleccionados.map((diagnostico, index) => (
                  <Paper
                    key={diagnostico.id}
                    variant="outlined"
                    sx={{ 
                      p: 1.5, 
                      mb: 1.5,
                      backgroundColor: diagnostico.tipo === 'DEF' ? '#e8f5e8' : '#fff3e0'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      {/* Número */}
                      <Typography
                        sx={{
                          fontSize: '0.8rem',
                          fontWeight: 'bold',
                          color: '#1A3C6D',
                          minWidth: '20px'
                        }}
                      >
                        {index + 1}.
                      </Typography>

                      {/* Información del diagnóstico */}
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                          <Chip
                            label={diagnostico.codigo}
                            size="small"
                            color="primary"
                            sx={{ fontSize: '0.65rem', fontWeight: 'bold' }}
                          />
                          <FormControl size="small" sx={{ minWidth: 80 }}>
                            <Select
                              value={diagnostico.tipo}
                              onChange={(e) => cambiarTipoDiagnostico(diagnostico.id, e.target.value as 'PRE' | 'DEF')}
                              sx={{ fontSize: '0.7rem' }}
                            >
                              <MenuItem value="PRE" sx={{ fontSize: '0.7rem' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                  <PresuntivoIcon sx={{ fontSize: '0.8rem', color: '#ff9800' }} />
                                  PRE
                                </Box>
                              </MenuItem>
                              <MenuItem value="DEF" sx={{ fontSize: '0.7rem' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                  <DefinitivoIcon sx={{ fontSize: '0.8rem', color: '#4caf50' }} />
                                  DEF
                                </Box>
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </Box>

                        <Typography
                          sx={{
                            fontSize: '0.75rem',
                            fontWeight: 'bold',
                            color: '#333',
                            mb: 0.5
                          }}
                        >
                          {diagnostico.descripcion}
                        </Typography>

                        <Typography
                          sx={{
                            fontSize: '0.65rem',
                            color: '#666',
                            fontStyle: 'italic'
                          }}
                        >
                          Agregado: {new Date(diagnostico.fechaSeleccion).toLocaleString()}
                        </Typography>
                      </Box>

                      {/* Botón eliminar */}
                      <IconButton
                        onClick={() => eliminarDiagnostico(diagnostico.id)}
                        size="small"
                        sx={{ color: '#d32f2f' }}
                      >
                        <EliminarIcon sx={{ fontSize: '1rem' }} />
                      </IconButton>
                    </Box>
                  </Paper>
                ))}
              </Box>
            )}
          </Box>

          {/* Información de tipos de diagnóstico */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            <Chip
              icon={<PresuntivoIcon sx={{ fontSize: '0.7rem' }} />}
              label={`PRE: ${diagnosticosSeleccionados.filter(d => d.tipo === 'PRE').length} Presuntivos`}
              size="small"
              color="warning"
              sx={{ fontSize: '0.65rem' }}
            />
            <Chip
              icon={<DefinitivoIcon sx={{ fontSize: '0.7rem' }} />}
              label={`DEF: ${diagnosticosSeleccionados.filter(d => d.tipo === 'DEF').length} Definitivos`}
              size="small"
              color="success"
              sx={{ fontSize: '0.65rem' }}
            />
          </Box>
        </CardContent>
      </Card>

      {/* Dialog de búsqueda CIE-10 */}
      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle sx={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#1A3C6D' }}>
          BUSCADOR DE DIAGNÓSTICOS CIE-10
        </DialogTitle>
        <DialogContent>
          {/* Filtros de búsqueda */}
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              fullWidth
              placeholder="Buscar por código CIE-10, descripción o categoría..."
              value={busquedaTexto}
              onChange={(e) => setBusquedaTexto(e.target.value)}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BuscarIcon sx={{ fontSize: '0.9rem' }} />
                  </InputAdornment>
                ),
              }}
              sx={{ '& .MuiInputBase-input': { fontSize: '0.8rem' } }}
            />
            
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel sx={{ fontSize: '0.75rem' }}>Filtrar por capítulo</InputLabel>
              <Select
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
                label="Filtrar por capítulo"
                sx={{ fontSize: '0.8rem' }}
              >
                <MenuItem value="" sx={{ fontSize: '0.8rem' }}>Todos los capítulos</MenuItem>
                {categorias.map((categoria) => (
                  <MenuItem key={categoria} value={categoria} sx={{ fontSize: '0.75rem' }}>
                    {categoria}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Resultados de búsqueda */}
          <List sx={{ maxHeight: 400, overflow: 'auto' }}>
            {diagnosticosFiltrados.map((diagnostico) => (
              <ListItem key={diagnostico.codigo} disablePadding sx={{ mb: 1 }}>
                <Paper variant="outlined" sx={{ width: '100%', p: 1 }}>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <Chip
                          label={diagnostico.codigo}
                          size="small"
                          color="primary"
                          sx={{ fontSize: '0.65rem', fontWeight: 'bold' }}
                        />
                        <Chip
                          label={diagnostico.categoria}
                          size="small"
                          variant="outlined"
                          sx={{ fontSize: '0.6rem' }}
                        />
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography sx={{ fontSize: '0.75rem', fontWeight: 'bold', mb: 0.5 }}>
                          {diagnostico.descripcion}
                        </Typography>
                        <Typography sx={{ fontSize: '0.65rem', color: '#666', fontStyle: 'italic' }}>
                          📚 {diagnostico.capitulo}
                        </Typography>
                      </Box>
                    }
                  />
                  <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<PresuntivoIcon sx={{ fontSize: '0.8rem' }} />}
                      onClick={() => agregarDiagnostico(diagnostico, 'PRE')}
                      sx={{ 
                        fontSize: '0.65rem',
                        color: '#ff9800',
                        borderColor: '#ff9800',
                        '&:hover': { borderColor: '#f57c00', backgroundColor: '#fff3e0' }
                      }}
                    >
                      Agregar PRE
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<DefinitivoIcon sx={{ fontSize: '0.8rem' }} />}
                      onClick={() => agregarDiagnostico(diagnostico, 'DEF')}
                      sx={{ 
                        fontSize: '0.65rem',
                        color: '#4caf50',
                        borderColor: '#4caf50',
                        '&:hover': { borderColor: '#388e3c', backgroundColor: '#e8f5e8' }
                      }}
                    >
                      Agregar DEF
                    </Button>
                  </Box>
                </Paper>
              </ListItem>
            ))}
          </List>
          
          {diagnosticosFiltrados.length === 0 && busquedaTexto && (
            <Alert severity="info" sx={{ fontSize: '0.7rem' }}>
              No se encontraron diagnósticos que coincidan con la búsqueda.
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setOpenDialog(false)}
            sx={{ fontSize: '0.7rem' }}
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
     
    </Box>
  );
}