import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Chip,
  Divider,
  IconButton,
  Alert,
  Autocomplete,
  Paper,
} from '@mui/material';
import {
  Assignment as DiagnosticoIcon,
  Search as SearchIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  MedicalServices as CIEIcon,
  CheckCircle as CheckIcon,
  LocalHospital as MedicoIcon,
} from "@mui/icons-material";

interface DiagnosticoCIE10 {
  codigo: string;
  descripcion: string;
  categoria: string;
  capitulo: string;
}

interface DiagnosticoSeleccionado {
  id: string;
  codigo: string;
  descripcion: string;
  tipo: 'principal' | 'secundario';
  fechaRegistro: string;
}

export default function DiagnosticoInicial() {
  const [busqueda, setBusqueda] = useState('');
  const [diagnosticosSeleccionados, setDiagnosticosSeleccionados] = useState<DiagnosticoSeleccionado[]>([]);
  const [diagnosticosFiltrados, setDiagnosticosFiltrados] = useState<DiagnosticoCIE10[]>([]);

  // Base de datos simulada de diagnósticos CIE10 neonatales más comunes
  const diagnosticosCIE10: DiagnosticoCIE10[] = [
    // Capítulo XVI: Ciertas afecciones originadas en el período perinatal (P00-P96)
    { codigo: 'P07.3', descripcion: 'Otros recién nacidos de pretérmino', categoria: 'Trastornos relacionados con duración corta de la gestación', capitulo: 'XVI - Afecciones período perinatal' },
    { codigo: 'P07.0', descripcion: 'Recién nacido con peso extremadamente bajo', categoria: 'Trastornos relacionados con duración corta de la gestación', capitulo: 'XVI - Afecciones período perinatal' },
    { codigo: 'P22.0', descripcion: 'Síndrome de dificultad respiratoria del recién nacido', categoria: 'Trastornos respiratorios y cardiovasculares', capitulo: 'XVI - Afecciones período perinatal' },
    { codigo: 'P22.1', descripcion: 'Taquipnea transitoria del recién nacido', categoria: 'Trastornos respiratorios y cardiovasculares', capitulo: 'XVI - Afecciones período perinatal' },
    { codigo: 'P59.9', descripcion: 'Ictericia neonatal, no especificada', categoria: 'Trastornos hemorrágicos y hematológicos', capitulo: 'XVI - Afecciones período perinatal' },
    { codigo: 'P36.9', descripcion: 'Sepsis bacteriana del recién nacido, no especificada', categoria: 'Infecciones específicas del período perinatal', capitulo: 'XVI - Afecciones período perinatal' },
    { codigo: 'P92.5', descripcion: 'Dificultad neonatal en la alimentación', categoria: 'Trastornos del sistema digestivo', capitulo: 'XVI - Afecciones período perinatal' },
    { codigo: 'P05.9', descripcion: 'Retardo del crecimiento fetal, no especificado', categoria: 'Trastornos relacionados con duración corta de la gestación', capitulo: 'XVI - Afecciones período perinatal' },
    { codigo: 'P08.1', descripcion: 'Otros recién nacidos pesados para la edad gestacional', categoria: 'Trastornos relacionados con duración larga de la gestación', capitulo: 'XVI - Afecciones período perinatal' },
    { codigo: 'P70.4', descripcion: 'Otros trastornos metabólicos transitorios neonatales', categoria: 'Trastornos endocrinos y metabólicos transitorios', capitulo: 'XVI - Afecciones período perinatal' },
    { codigo: 'P83.6', descripcion: 'Edema umbilical del recién nacido', categoria: 'Afecciones que comprometen el tegumento', capitulo: 'XVI - Afecciones período perinatal' },
    { codigo: 'P78.3', descripcion: 'Obstrucción intestinal neonatal no clasificada', categoria: 'Trastornos del sistema digestivo', capitulo: 'XVI - Afecciones período perinatal' },
    
    // Malformaciones congénitas (Q00-Q99)
    { codigo: 'Q21.9', descripcion: 'Defecto septal cardíaco, no especificado', categoria: 'Malformaciones congénitas del sistema circulatorio', capitulo: 'XVII - Malformaciones congénitas' },
    { codigo: 'Q25.0', descripcion: 'Conducto arterioso permeable', categoria: 'Malformaciones congénitas del sistema circulatorio', capitulo: 'XVII - Malformaciones congénitas' },
    { codigo: 'Q39.9', descripcion: 'Malformación congénita del esófago, no especificada', categoria: 'Malformaciones congénitas del sistema digestivo', capitulo: 'XVII - Malformaciones congénitas' },
    { codigo: 'Q54.9', descripcion: 'Hipospadias, no especificado', categoria: 'Malformaciones congénitas de los órganos genitales', capitulo: 'XVII - Malformaciones congénitas' },
    
    // Diagnósticos generales
    { codigo: 'Z38.0', descripcion: 'Recién nacido único, nacido en hospital', categoria: 'Factores que influyen en el estado de salud', capitulo: 'XXI - Factores que influyen en el estado de salud' },
    { codigo: 'Z05.0', descripcion: 'Observación y evaluación de recién nacido por sospecha de afección cardíaca', categoria: 'Factores que influyen en el estado de salud', capitulo: 'XXI - Factores que influyen en el estado de salud' },
    { codigo: 'Z05.1', descripcion: 'Observación y evaluación de recién nacido por sospecha de infección', categoria: 'Factores que influyen en el estado de salud', capitulo: 'XXI - Factores que influyen en el estado de salud' },
    { codigo: 'R06.0', descripcion: 'Disnea', categoria: 'Síntomas y signos del sistema respiratorio', capitulo: 'XVIII - Síntomas, signos y hallazgos anormales' },
    { codigo: 'R50.9', descripcion: 'Fiebre, no especificada', categoria: 'Síntomas y signos generales', capitulo: 'XVIII - Síntomas, signos y hallazgos anormales' },
  ];

  // Filtrar diagnósticos basado en la búsqueda
  useEffect(() => {
    if (busqueda.length >= 2) {
      const filtrados = diagnosticosCIE10.filter(diagnostico =>
        diagnostico.codigo.toLowerCase().includes(busqueda.toLowerCase()) ||
        diagnostico.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
        diagnostico.categoria.toLowerCase().includes(busqueda.toLowerCase())
      );
      setDiagnosticosFiltrados(filtrados);
    } else {
      setDiagnosticosFiltrados([]);
    }
  }, [busqueda]);

  const agregarDiagnostico = (diagnostico: DiagnosticoCIE10, tipo: 'principal' | 'secundario') => {
    // Verificar si ya existe
    const existe = diagnosticosSeleccionados.find(d => d.codigo === diagnostico.codigo);
    if (existe) return;

    // Si es principal, quitar el anterior principal
    let nuevosSeleccionados = diagnosticosSeleccionados;
    if (tipo === 'principal') {
      nuevosSeleccionados = diagnosticosSeleccionados.map(d => ({
        ...d,
        tipo: d.tipo === 'principal' ? 'secundario' as const : d.tipo
      }));
    }

    const nuevoDiagnostico: DiagnosticoSeleccionado = {
      id: Date.now().toString(),
      codigo: diagnostico.codigo,
      descripcion: diagnostico.descripcion,
      tipo,
      fechaRegistro: new Date().toISOString()
    };

    setDiagnosticosSeleccionados([...nuevosSeleccionados, nuevoDiagnostico]);
    setBusqueda('');
    setDiagnosticosFiltrados([]);
  };

  const eliminarDiagnostico = (id: string) => {
    setDiagnosticosSeleccionados(diagnosticosSeleccionados.filter(d => d.id !== id));
  };

  const cambiarTipoDiagnostico = (id: string, nuevoTipo: 'principal' | 'secundario') => {
    let nuevosSeleccionados = diagnosticosSeleccionados;
    
    // Si cambia a principal, convertir el anterior principal a secundario
    if (nuevoTipo === 'principal') {
      nuevosSeleccionados = diagnosticosSeleccionados.map(d => ({
        ...d,
        tipo: d.tipo === 'principal' ? 'secundario' as const : d.tipo
      }));
    }

    setDiagnosticosSeleccionados(
      nuevosSeleccionados.map(d => 
        d.id === id ? { ...d, tipo: nuevoTipo } : d
      )
    );
  };

  const diagnosticoPrincipal = diagnosticosSeleccionados.find(d => d.tipo === 'principal');
  const diagnosticosSecundarios = diagnosticosSeleccionados.filter(d => d.tipo === 'secundario');

  return (
    <Box>
      {/* Sección K: Diagnóstico Inicial */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 2 }}>
          <Typography
            variant="h6"
            sx={{
              mb: 1.5,
              fontWeight: "bold",
              color: "#1A3C6D",
              fontSize: "1rem",
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <DiagnosticoIcon sx={{ fontSize: '1.2rem' }} />
            K. DIAGNÓSTICO INICIAL (CIE-10)
          </Typography>

          {/* Buscador de diagnósticos */}
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Buscar diagnóstico por código CIE-10 o descripción (mínimo 2 caracteres)..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: '1rem', color: '#1A3C6D' }} />
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
              sx={{ 
                '& .MuiInputBase-input': { 
                  fontSize: '0.85rem'
                }
              }}
            />
          </Box>

          {/* Lista de resultados de búsqueda */}
          {diagnosticosFiltrados.length > 0 && (
            <Card variant="outlined" sx={{ mb: 2, maxHeight: 300, overflow: 'auto' }}>
              <List dense>
                {diagnosticosFiltrados.map((diagnostico, index) => (
                  <React.Fragment key={diagnostico.codigo}>
                    <ListItem
                      secondaryAction={
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                          <IconButton
                            size="small"
                            onClick={() => agregarDiagnostico(diagnostico, 'principal')}
                            sx={{ 
                              backgroundColor: '#d32f2f15',
                              color: '#d32f2f',
                              '&:hover': { backgroundColor: '#d32f2f25' }
                            }}
                          >
                            <AddIcon sx={{ fontSize: '0.8rem' }} />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => agregarDiagnostico(diagnostico, 'secundario')}
                            sx={{ 
                              backgroundColor: '#1976d215',
                              color: '#1976d2',
                              '&:hover': { backgroundColor: '#1976d225' }
                            }}
                          >
                            <AddIcon sx={{ fontSize: '0.8rem' }} />
                          </IconButton>
                        </Box>
                      }
                    >
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CIEIcon sx={{ fontSize: '0.9rem', color: '#1A3C6D' }} />
                            <Typography sx={{ fontSize: '0.8rem', fontWeight: 'bold' }}>
                              {diagnostico.codigo}
                            </Typography>
                            <Typography sx={{ fontSize: '0.75rem' }}>
                              {diagnostico.descripcion}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <Typography sx={{ fontSize: '0.7rem', color: '#666', ml: 2.5 }}>
                            {diagnostico.categoria} • {diagnostico.capitulo}
                          </Typography>
                        }
                      />
                    </ListItem>
                    {index < diagnosticosFiltrados.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Card>
          )}

          {/* Mensaje de ayuda */}
          {busqueda.length > 0 && busqueda.length < 2 && (
            <Alert severity="info" sx={{ mb: 2, fontSize: '0.8rem' }}>
              Ingrese al menos 2 caracteres para buscar diagnósticos CIE-10
            </Alert>
          )}

          {/* Diagnósticos seleccionados */}
          {diagnosticosSeleccionados.length > 0 && (
            <>
              <Divider sx={{ my: 2 }} />
              
              <Typography
                variant="subtitle1"
                sx={{
                  mb: 1.5,
                  fontWeight: "bold",
                  color: "#1A3C6D",
                  fontSize: "0.9rem",
                }}
              >
                DIAGNÓSTICOS SELECCIONADOS:
              </Typography>

              {/* Diagnóstico Principal */}
              {diagnosticoPrincipal && (
                <Card variant="outlined" sx={{ mb: 2, backgroundColor: '#ffebee', borderColor: '#d32f2f' }}>
                  <CardContent sx={{ p: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                        <MedicoIcon sx={{ fontSize: '1rem', color: '#d32f2f' }} />
                        <Box>
                          <Typography sx={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#d32f2f' }}>
                            DIAGNÓSTICO PRINCIPAL
                          </Typography>
                          <Typography sx={{ fontSize: '0.8rem', fontWeight: 'bold' }}>
                            {diagnosticoPrincipal.codigo} - {diagnosticoPrincipal.descripcion}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <Chip
                          label="PRINCIPAL"
                          size="small"
                          color="error"
                          variant="filled"
                          sx={{ fontSize: '0.6rem', fontWeight: 'bold' }}
                        />
                        <IconButton
                          size="small"
                          onClick={() => eliminarDiagnostico(diagnosticoPrincipal.id)}
                          sx={{ color: '#d32f2f' }}
                        >
                          <DeleteIcon sx={{ fontSize: '0.8rem' }} />
                        </IconButton>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              )}

              {/* Diagnósticos Secundarios */}
              {diagnosticosSecundarios.length > 0 && (
                <Box>
                  <Typography sx={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#1976d2', mb: 1 }}>
                    DIAGNÓSTICOS SECUNDARIOS:
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {diagnosticosSecundarios.map((diagnostico) => (
                      <Card 
                        key={diagnostico.id} 
                        variant="outlined" 
                        sx={{ backgroundColor: '#e3f2fd', borderColor: '#1976d2' }}
                      >
                        <CardContent sx={{ p: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Typography sx={{ fontSize: '0.7rem', fontWeight: 'bold' }}>
                              {diagnostico.codigo}
                            </Typography>
                            <Typography sx={{ fontSize: '0.7rem', maxWidth: 200 }}>
                              {diagnostico.descripcion}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 0.25 }}>
                              <IconButton
                                size="small"
                                onClick={() => cambiarTipoDiagnostico(diagnostico.id, 'principal')}
                                sx={{ color: '#d32f2f' }}
                                title="Cambiar a principal"
                              >
                                <CheckIcon sx={{ fontSize: '0.7rem' }} />
                              </IconButton>
                              <IconButton
                                size="small"
                                onClick={() => eliminarDiagnostico(diagnostico.id)}
                                sx={{ color: '#666' }}
                              >
                                <DeleteIcon sx={{ fontSize: '0.7rem' }} />
                              </IconButton>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    ))}
                  </Box>
                </Box>
              )}

              {/* Resumen */}
              <Divider sx={{ my: 2 }} />
              
              <Card variant="outlined" sx={{ backgroundColor: '#f0f8ff', borderColor: '#1976d2' }}>
                <CardContent sx={{ p: 1.5 }}>
                  <Typography sx={{ fontSize: "0.75rem", fontWeight: "bold", color: "#1565c0", mb: 1 }}>
                    📋 RESUMEN DE DIAGNÓSTICOS:
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    <Chip
                      label={`Principal: ${diagnosticoPrincipal ? '1' : '0'}`}
                      size="small"
                      color="error"
                      variant="filled"
                      sx={{ fontSize: '0.65rem', fontWeight: 'bold' }}
                    />
                    <Chip
                      label={`Secundarios: ${diagnosticosSecundarios.length}`}
                      size="small"
                      color="primary"
                      variant="filled"
                      sx={{ fontSize: '0.65rem', fontWeight: 'bold' }}
                    />
                    <Chip
                      label={`Total: ${diagnosticosSeleccionados.length}`}
                      size="small"
                      color="success"
                      variant="filled"
                      sx={{ fontSize: '0.65rem', fontWeight: 'bold' }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </>
          )}
        </CardContent>
      </Card>

    </Box>
  );
}