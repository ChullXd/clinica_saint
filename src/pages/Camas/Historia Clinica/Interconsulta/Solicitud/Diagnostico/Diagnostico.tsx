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
  Autocomplete,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
} from '@mui/material';
import {
  LocalHospital as DiagnosticoIcon,
  Search as BuscadorIcon,
  Add as AgregarIcon,
  Delete as EliminarIcon,
  Timer as TiempoIcon,
  MedicalServices as CIEIcon,
  Assignment as PreIcon,
  CheckCircle as DefIcon,
} from "@mui/icons-material";

interface DiagnosticoCIE10 {
  id: string;
  codigo: string;
  descripcion: string;
  categoria: string;
}

interface DiagnosticoSeleccionado {
  id: string;
  codigo: string;
  descripcion: string;
  tipo: 'PRE' | 'DEF';
  fechaIngreso: string;
}

interface DiagnosticoData {
  diagnosticos: DiagnosticoSeleccionado[];
  fechaCreacion: string;
  ultimaModificacion: string;
}

export default function Diagnostico() {
  const [diagnosticoData, setDiagnosticoData] = useState<DiagnosticoData>({
    diagnosticos: [],
    fechaCreacion: '',
    ultimaModificacion: '',
  });

  const [busquedaTexto, setBusquedaTexto] = useState('');
  const [tipoDiagnostico, setTipoDiagnostico] = useState<'PRE' | 'DEF'>('PRE');
  const [diagnosticoSeleccionado, setDiagnosticoSeleccionado] = useState<DiagnosticoCIE10 | null>(null);

  // Base de datos simulada de diagnósticos CIE10 (muestra)
  const diagnosticosCIE10: DiagnosticoCIE10[] = [
    { id: '1', codigo: 'A09', descripcion: 'DIARREA Y GASTROENTERITIS DE PRESUNTO ORIGEN INFECCIOSO', categoria: 'Enfermedades infecciosas' },
    { id: '2', codigo: 'B34.9', descripcion: 'INFECCIÓN VIRAL, NO ESPECIFICADA', categoria: 'Enfermedades infecciosas' },
    { id: '3', codigo: 'E11.9', descripcion: 'DIABETES MELLITUS TIPO 2 SIN COMPLICACIONES', categoria: 'Enfermedades endocrinas' },
    { id: '4', codigo: 'E78.5', descripcion: 'HIPERLIPIDEMIA, NO ESPECIFICADA', categoria: 'Enfermedades endocrinas' },
    { id: '5', codigo: 'F32.9', descripcion: 'EPISODIO DEPRESIVO, NO ESPECIFICADO', categoria: 'Trastornos mentales' },
    { id: '6', codigo: 'G43.9', descripcion: 'MIGRAÑA, NO ESPECIFICADA', categoria: 'Enfermedades del sistema nervioso' },
    { id: '7', codigo: 'I10', descripcion: 'HIPERTENSIÓN ESENCIAL (PRIMARIA)', categoria: 'Enfermedades del sistema circulatorio' },
    { id: '8', codigo: 'I25.9', descripcion: 'ENFERMEDAD ISQUÉMICA CRÓNICA DEL CORAZÓN, NO ESPECIFICADA', categoria: 'Enfermedades del sistema circulatorio' },
    { id: '9', codigo: 'J06.9', descripcion: 'INFECCIÓN AGUDA DE LAS VÍAS RESPIRATORIAS SUPERIORES, NO ESPECIFICADA', categoria: 'Enfermedades del sistema respiratorio' },
    { id: '10', codigo: 'J44.1', descripcion: 'ENFERMEDAD PULMONAR OBSTRUCTIVA CRÓNICA CON EXACERBACIÓN AGUDA', categoria: 'Enfermedades del sistema respiratorio' },
    { id: '11', codigo: 'K29.7', descripcion: 'GASTRITIS, NO ESPECIFICADA', categoria: 'Enfermedades del sistema digestivo' },
    { id: '12', codigo: 'K59.0', descripcion: 'ESTREÑIMIENTO', categoria: 'Enfermedades del sistema digestivo' },
    { id: '13', codigo: 'L23.9', descripcion: 'DERMATITIS ALÉRGICA DE CONTACTO, CAUSA NO ESPECIFICADA', categoria: 'Enfermedades de la piel' },
    { id: '14', codigo: 'M25.5', descripcion: 'DOLOR ARTICULAR', categoria: 'Enfermedades del sistema musculoesquelético' },
    { id: '15', codigo: 'N39.0', descripcion: 'INFECCIÓN DE VÍAS URINARIAS, SITIO NO ESPECIFICADO', categoria: 'Enfermedades del sistema genitourinario' },
    { id: '16', codigo: 'R50.9', descripcion: 'FIEBRE, NO ESPECIFICADA', categoria: 'Síntomas y signos' },
    { id: '17', codigo: 'R06.0', descripcion: 'DISNEA', categoria: 'Síntomas y signos' },
    { id: '18', codigo: 'R10.4', descripcion: 'OTROS DOLORES ABDOMINALES Y LOS NO ESPECIFICADOS', categoria: 'Síntomas y signos' },
    { id: '19', codigo: 'S72.0', descripcion: 'FRACTURA DEL CUELLO DEL FÉMUR', categoria: 'Traumatismos' },
    { id: '20', codigo: 'T78.4', descripcion: 'ALERGIA, NO ESPECIFICADA', categoria: 'Traumatismos' },
  ];

  // Filtrar diagnósticos según búsqueda
  const diagnosticosFiltrados = diagnosticosCIE10.filter(diagnostico =>
    diagnostico.codigo.toLowerCase().includes(busquedaTexto.toLowerCase()) ||
    diagnostico.descripcion.toLowerCase().includes(busquedaTexto.toLowerCase()) ||
    diagnostico.categoria.toLowerCase().includes(busquedaTexto.toLowerCase())
  );

  const agregarDiagnostico = () => {
    if (diagnosticoSeleccionado && diagnosticoData.diagnosticos.length < 6) {
      const now = new Date().toISOString();
      const nuevoDiagnostico: DiagnosticoSeleccionado = {
        id: `diag-${Date.now()}`,
        codigo: diagnosticoSeleccionado.codigo,
        descripcion: diagnosticoSeleccionado.descripcion,
        tipo: tipoDiagnostico,
        fechaIngreso: now,
      };

      setDiagnosticoData(prev => ({
        ...prev,
        diagnosticos: [...prev.diagnosticos, nuevoDiagnostico],
        fechaCreacion: prev.fechaCreacion || now,
        ultimaModificacion: now,
      }));

      // Limpiar selección
      setDiagnosticoSeleccionado(null);
      setBusquedaTexto('');
    }
  };

  const eliminarDiagnostico = (id: string) => {
    const now = new Date().toISOString();
    setDiagnosticoData(prev => ({
      ...prev,
      diagnosticos: prev.diagnosticos.filter(diag => diag.id !== id),
      ultimaModificacion: now,
    }));
  };

  const cambiarTipoDiagnostico = (id: string, nuevoTipo: 'PRE' | 'DEF') => {
    const now = new Date().toISOString();
    setDiagnosticoData(prev => ({
      ...prev,
      diagnosticos: prev.diagnosticos.map(diag =>
        diag.id === id ? { ...diag, tipo: nuevoTipo } : diag
      ),
      ultimaModificacion: now,
    }));
  };

  return (
    <Box>
      {/* Sección E: Diagnóstico */}
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
            E. DIAGNÓSTICO (BUSCADOR CIE10)
          </Typography>

          {/* Buscador CIE10 */}
          <Typography
            variant="subtitle1"
            sx={{
              mb: 1.5,
              fontWeight: "bold",
              color: "#1A3C6D",
              fontSize: "0.8rem",
            }}
          >
            BUSCAR DIAGNÓSTICO CIE10:
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 2 }}>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 60%' } }}>
              <Autocomplete
                options={diagnosticosFiltrados}
                getOptionLabel={(option) => `${option.codigo} - ${option.descripcion}`}
                value={diagnosticoSeleccionado}
                onChange={(event, newValue) => setDiagnosticoSeleccionado(newValue)}
                inputValue={busquedaTexto}
                onInputChange={(event, newInputValue) => setBusquedaTexto(newInputValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="BUSCAR POR CÓDIGO O DESCRIPCIÓN"
                    placeholder="Ej: A09, diabetes, hipertensión..."
                    size="small"
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <BuscadorIcon sx={{ fontSize: '0.9rem', color: '#1A3C6D' }} />
                        </InputAdornment>
                      ),
                    }}
                    InputLabelProps={{ sx: { fontSize: "0.75rem" } }}
                    sx={{ 
                      '& .MuiInputBase-input': { 
                        fontSize: '0.8rem',
                      }
                    }}
                  />
                )}
                renderOption={(props, option) => (
                  <Box component="li" {...props} sx={{ fontSize: '0.75rem' }}>
                    <Box>
                      <Typography sx={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#1976d2' }}>
                        {option.codigo}
                      </Typography>
                      <Typography sx={{ fontSize: '0.7rem' }}>
                        {option.descripcion}
                      </Typography>
                      <Typography sx={{ fontSize: '0.65rem', color: '#666', fontStyle: 'italic' }}>
                        {option.categoria}
                      </Typography>
                    </Box>
                  </Box>
                )}
                noOptionsText="No se encontraron diagnósticos"
                loadingText="Buscando..."
                sx={{ '& .MuiAutocomplete-listbox': { fontSize: '0.75rem' } }}
              />
            </Box>

            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 25%' } }}>
              <FormControl fullWidth size="small">
                <FormLabel sx={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#1A3C6D', mb: 0.5 }}>
                  TIPO:
                </FormLabel>
                <RadioGroup
                  row
                  value={tipoDiagnostico}
                  onChange={(e) => setTipoDiagnostico(e.target.value as 'PRE' | 'DEF')}
                  sx={{ justifyContent: 'center' }}
                >
                  <FormControlLabel
                    value="PRE"
                    control={<Radio size="small" color="warning" />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <PreIcon sx={{ fontSize: '0.8rem' }} />
                        <Typography sx={{ fontSize: '0.7rem', fontWeight: 'bold' }}>PRE</Typography>
                      </Box>
                    }
                  />
                  <FormControlLabel
                    value="DEF"
                    control={<Radio size="small" color="success" />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <DefIcon sx={{ fontSize: '0.8rem' }} />
                        <Typography sx={{ fontSize: '0.7rem', fontWeight: 'bold' }}>DEF</Typography>
                      </Box>
                    }
                  />
                </RadioGroup>
              </FormControl>
            </Box>

            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 auto' } }}>
              <Tooltip title="Agregar diagnóstico seleccionado">
                <IconButton
                  onClick={agregarDiagnostico}
                  disabled={!diagnosticoSeleccionado || diagnosticoData.diagnosticos.length >= 6}
                  sx={{
                    backgroundColor: '#1A3C6D',
                    color: 'white',
                    '&:hover': { backgroundColor: '#274472' },
                    '&:disabled': { backgroundColor: '#ccc' }
                  }}
                >
                  <AgregarIcon sx={{ fontSize: '1.2rem' }} />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Lista de diagnósticos seleccionados */}
          <Typography
            variant="subtitle1"
            sx={{
              mb: 1.5,
              fontWeight: "bold",
              color: "#1A3C6D",
              fontSize: "0.8rem",
            }}
          >
            DIAGNÓSTICOS SELECCIONADOS ({diagnosticoData.diagnosticos.length}/6):
          </Typography>

          {diagnosticoData.diagnosticos.length === 0 ? (
            <Alert severity="info" sx={{ fontSize: '0.7rem' }}>
              <strong>Sin diagnósticos:</strong> Use el buscador CIE10 para agregar diagnósticos presuntivos o definitivos.
            </Alert>
          ) : (
            <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
              <Table size="small">
                <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableRow>
                    <TableCell sx={{ fontSize: '0.7rem', fontWeight: 'bold', width: '5%' }}>#</TableCell>
                    <TableCell sx={{ fontSize: '0.7rem', fontWeight: 'bold', width: '15%' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <CIEIcon sx={{ fontSize: '0.8rem' }} />
                        CIE
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.7rem', fontWeight: 'bold', width: '50%' }}>DESCRIPCIÓN</TableCell>
                    <TableCell sx={{ fontSize: '0.7rem', fontWeight: 'bold', width: '15%', textAlign: 'center' }}>TIPO</TableCell>
                    <TableCell sx={{ fontSize: '0.7rem', fontWeight: 'bold', width: '10%', textAlign: 'center' }}>FECHA</TableCell>
                    <TableCell sx={{ fontSize: '0.7rem', fontWeight: 'bold', width: '5%', textAlign: 'center' }}>ACCIÓN</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {diagnosticoData.diagnosticos.map((diagnostico, index) => (
                    <TableRow key={diagnostico.id} sx={{ '&:hover': { backgroundColor: '#f8f9fa' } }}>
                      <TableCell sx={{ fontSize: '0.75rem', fontWeight: 'bold' }}>
                        {index + 1}.
                      </TableCell>
                      <TableCell sx={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#1976d2' }}>
                        {diagnostico.codigo}
                      </TableCell>
                      <TableCell sx={{ fontSize: '0.7rem' }}>
                        {diagnostico.descripcion}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>
                        <FormControl size="small">
                          <RadioGroup
                            row
                            value={diagnostico.tipo}
                            onChange={(e) => cambiarTipoDiagnostico(diagnostico.id, e.target.value as 'PRE' | 'DEF')}
                            sx={{ justifyContent: 'center' }}
                          >
                            <FormControlLabel
                              value="PRE"
                              control={<Radio size="small" color="warning" />}
                              label={<Typography sx={{ fontSize: '0.65rem' }}>PRE</Typography>}
                              sx={{ m: 0, mr: 1 }}
                            />
                            <FormControlLabel
                              value="DEF"
                              control={<Radio size="small" color="success" />}
                              label={<Typography sx={{ fontSize: '0.65rem' }}>DEF</Typography>}
                              sx={{ m: 0 }}
                            />
                          </RadioGroup>
                        </FormControl>
                      </TableCell>
                      <TableCell sx={{ fontSize: '0.65rem', textAlign: 'center' }}>
                        {new Date(diagnostico.fechaIngreso).toLocaleDateString()}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>
                        <Tooltip title="Eliminar diagnóstico">
                          <IconButton
                            size="small"
                            onClick={() => eliminarDiagnostico(diagnostico.id)}
                            sx={{ color: '#d32f2f' }}
                          >
                            <EliminarIcon sx={{ fontSize: '1rem' }} />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {/* Información de diagnósticos */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            <Chip
              label={`${diagnosticoData.diagnosticos.length}/6 diagnósticos`}
              size="small"
              color={diagnosticoData.diagnosticos.length > 0 ? "primary" : "default"}
              sx={{ fontSize: '0.65rem' }}
            />
            <Chip
              label={`${diagnosticoData.diagnosticos.filter(d => d.tipo === 'PRE').length} presuntivos`}
              size="small"
              color="warning"
              sx={{ fontSize: '0.65rem' }}
            />
            <Chip
              label={`${diagnosticoData.diagnosticos.filter(d => d.tipo === 'DEF').length} definitivos`}
              size="small"
              color="success"
              sx={{ fontSize: '0.65rem' }}
            />
            {diagnosticoData.fechaCreacion && (
              <Chip
                icon={<TiempoIcon sx={{ fontSize: '0.7rem' }} />}
                label={`Creado: ${new Date(diagnosticoData.fechaCreacion).toLocaleString()}`}
                size="small"
                color="info"
                sx={{ fontSize: '0.65rem' }}
              />
            )}
          </Box>
        </CardContent>
      </Card>

    </Box>
  );
}