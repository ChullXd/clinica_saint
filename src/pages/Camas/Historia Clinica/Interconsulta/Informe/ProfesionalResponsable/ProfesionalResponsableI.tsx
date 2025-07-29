
import { useState, useEffect } from 'react';
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
  Avatar,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import {
  Person as ProfesionalIcon,
  CalendarToday as FechaIcon,
  AccessTime as HoraIcon,
  Badge as DocumentoIcon,
  Draw as FirmaIcon,
  Verified as SelloIcon,
  Search as BuscarIcon,
  AccountCircle as MedicoIcon,
  Timer as TiempoIcon,
} from "@mui/icons-material";

interface ProfesionalData {
  fecha: string;
  hora: string;
  primerNombre: string;
  primerApellido: string;
  segundoApellido: string;
  numeroDocumento: string;
  firma: string;
  sello: string;
  especialidad: string;
  registroMedico: string;
  fechaSeleccion: string;
}

interface MedicoBD {
  id: string;
  primerNombre: string;
  primerApellido: string;
  segundoApellido: string;
  numeroDocumento: string;
  especialidad: string;
  registroMedico: string;
  firma: string;
  sello: string;
}

export default function ProfesionalResponsableI() {
  const [profesionalData, setProfesionalData] = useState<ProfesionalData>({
    fecha: '',
    hora: '',
    primerNombre: '',
    primerApellido: '',
    segundoApellido: '',
    numeroDocumento: '',
    firma: '',
    sello: '',
    especialidad: '',
    registroMedico: '',
    fechaSeleccion: '',
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [busquedaTexto, setBusquedaTexto] = useState('');

  // Base de datos simulada de médicos con firmas y sellos
  const medicosBD: MedicoBD[] = [
    {
      id: '1',
      primerNombre: 'CARLOS',
      primerApellido: 'RODRIGUEZ',
      segundoApellido: 'MARTINEZ',
      numeroDocumento: '1234567890',
      especialidad: 'MEDICINA INTERNA',
      registroMedico: 'RM-2024-001',
      firma: '/api/firmas/carlos_rodriguez.png',
      sello: '/api/sellos/carlos_rodriguez_sello.png',
    },
    {
      id: '2',
      primerNombre: 'MARIA',
      primerApellido: 'GONZALEZ',
      segundoApellido: 'LOPEZ',
      numeroDocumento: '9876543210',
      especialidad: 'CARDIOLOGIA',
      registroMedico: 'RM-2024-002',
      firma: '/api/firmas/maria_gonzalez.png',
      sello: '/api/sellos/maria_gonzalez_sello.png',
    },
    {
      id: '3',
      primerNombre: 'JUAN',
      primerApellido: 'PEREZ',
      segundoApellido: 'SANCHEZ',
      numeroDocumento: '5555666677',
      especialidad: 'NEUROLOGIA',
      registroMedico: 'RM-2024-003',
      firma: '/api/firmas/juan_perez.png',
      sello: '/api/sellos/juan_perez_sello.png',
    },
    {
      id: '4',
      primerNombre: 'ANA',
      primerApellido: 'TORRES',
      segundoApellido: 'RIVERA',
      numeroDocumento: '7777888899',
      especialidad: 'GASTROENTEROLOGIA',
      registroMedico: 'RM-2024-004',
      firma: '/api/firmas/ana_torres.png',
      sello: '/api/sellos/ana_torres_sello.png',
    },
    {
      id: '5',
      primerNombre: 'LUIS',
      primerApellido: 'MORALES',
      segundoApellido: 'CASTRO',
      numeroDocumento: '1111222233',
      especialidad: 'CIRUGIA GENERAL',
      registroMedico: 'RM-2024-005',
      firma: '/api/firmas/luis_morales.png',
      sello: '/api/sellos/luis_morales_sello.png',
    },
  ];

  // Establecer fecha y hora actuales al cargar el componente
  useEffect(() => {
    const now = new Date();
    const fechaActual = now.toISOString().split('T')[0]; // YYYY-MM-DD
    const horaActual = now.toTimeString().slice(0, 5); // HH:MM
    
    setProfesionalData(prev => ({
      ...prev,
      fecha: fechaActual,
      hora: horaActual,
    }));
  }, []);

  // Filtrar médicos según búsqueda
  const medicosFiltrados = medicosBD.filter(medico =>
    medico.primerNombre.toLowerCase().includes(busquedaTexto.toLowerCase()) ||
    medico.primerApellido.toLowerCase().includes(busquedaTexto.toLowerCase()) ||
    medico.segundoApellido.toLowerCase().includes(busquedaTexto.toLowerCase()) ||
    medico.numeroDocumento.includes(busquedaTexto) ||
    medico.especialidad.toLowerCase().includes(busquedaTexto.toLowerCase()) ||
    medico.registroMedico.toLowerCase().includes(busquedaTexto.toLowerCase())
  );

  const seleccionarMedico = (medico: MedicoBD) => {
    const now = new Date().toISOString();
    setProfesionalData(prev => ({
      ...prev,
      primerNombre: medico.primerNombre,
      primerApellido: medico.primerApellido,
      segundoApellido: medico.segundoApellido,
      numeroDocumento: medico.numeroDocumento,
      firma: medico.firma,
      sello: medico.sello,
      especialidad: medico.especialidad,
      registroMedico: medico.registroMedico,
      fechaSeleccion: now,
    }));
    setOpenDialog(false);
    setBusquedaTexto('');
  };

  const limpiarSeleccion = () => {
    setProfesionalData(prev => ({
      ...prev,
      primerNombre: '',
      primerApellido: '',
      segundoApellido: '',
      numeroDocumento: '',
      firma: '',
      sello: '',
      especialidad: '',
      registroMedico: '',
      fechaSeleccion: '',
    }));
  };

  return (
    <Box>
      {/* Sección G: Datos del Profesional Responsable */}
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
            <ProfesionalIcon sx={{ fontSize: '1rem' }} />
            G. DATOS DEL PROFESIONAL RESPONSABLE
          </Typography>

          {/* Fecha y Hora */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%' } }}>
              <TextField
                label="FECHA (YYYY/MM/DD)"
                value={profesionalData.fecha}
                onChange={(e) => setProfesionalData(prev => ({ ...prev, fecha: e.target.value }))}
                fullWidth
                size="small"
                type="date"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FechaIcon sx={{ fontSize: '0.9rem', color: '#1A3C6D' }} />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{ 
                  sx: { fontSize: "0.75rem" },
                  shrink: true 
                }}
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }
                }}
              />
            </Box>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%' } }}>
              <TextField
                label="HORA (HH:MM)"
                value={profesionalData.hora}
                onChange={(e) => setProfesionalData(prev => ({ ...prev, hora: e.target.value }))}
                fullWidth
                size="small"
                type="time"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <HoraIcon sx={{ fontSize: '0.9rem', color: '#1A3C6D' }} />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{ 
                  sx: { fontSize: "0.75rem" },
                  shrink: true 
                }}
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }
                }}
              />
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Selección de Médico desde BD */}
          <Typography
            variant="subtitle1"
            sx={{
              mb: 1.5,
              fontWeight: "bold",
              color: "#1A3C6D",
              fontSize: "0.8rem",
            }}
          >
            SELECCIONAR MÉDICO RESPONSABLE:
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <Button
              variant="contained"
              startIcon={<BuscarIcon />}
              onClick={() => setOpenDialog(true)}
              sx={{
                backgroundColor: '#1A3C6D',
                '&:hover': { backgroundColor: '#274472' },
                fontSize: '0.7rem',
                textTransform: 'none',
              }}
            >
              Buscar en Base de Datos
            </Button>
            {profesionalData.primerNombre && (
              <Button
                variant="outlined"
                onClick={limpiarSeleccion}
                sx={{
                  color: '#d32f2f',
                  borderColor: '#d32f2f',
                  '&:hover': { borderColor: '#b71c1c', backgroundColor: '#ffebee' },
                  fontSize: '0.7rem',
                  textTransform: 'none',
                }}
              >
                Limpiar
              </Button>
            )}
          </Box>

          {/* Datos del Profesional */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 32%' } }}>
              <TextField
                label="PRIMER NOMBRE"
                value={profesionalData.primerNombre}
                fullWidth
                size="small"
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <MedicoIcon sx={{ fontSize: '0.9rem', color: '#1A3C6D' }} />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{ sx: { fontSize: "0.75rem" } }}
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    backgroundColor: '#f5f5f5'
                  }
                }}
              />
            </Box>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 32%' } }}>
              <TextField
                label="PRIMER APELLIDO"
                value={profesionalData.primerApellido}
                fullWidth
                size="small"
                InputProps={{
                  readOnly: true,
                }}
                InputLabelProps={{ sx: { fontSize: "0.75rem" } }}
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    backgroundColor: '#f5f5f5'
                  }
                }}
              />
            </Box>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 32%' } }}>
              <TextField
                label="SEGUNDO APELLIDO"
                value={profesionalData.segundoApellido}
                fullWidth
                size="small"
                InputProps={{
                  readOnly: true,
                }}
                InputLabelProps={{ sx: { fontSize: "0.75rem" } }}
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    backgroundColor: '#f5f5f5'
                  }
                }}
              />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%' } }}>
              <TextField
                label="NÚMERO DE DOCUMENTO DE IDENTIFICACIÓN"
                value={profesionalData.numeroDocumento}
                fullWidth
                size="small"
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <DocumentoIcon sx={{ fontSize: '0.9rem', color: '#1A3C6D' }} />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{ sx: { fontSize: "0.75rem" } }}
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    backgroundColor: '#f5f5f5'
                  }
                }}
              />
            </Box>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%' } }}>
              <TextField
                label="ESPECIALIDAD"
                value={profesionalData.especialidad}
                fullWidth
                size="small"
                InputProps={{
                  readOnly: true,
                }}
                InputLabelProps={{ sx: { fontSize: "0.75rem" } }}
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    backgroundColor: '#f5f5f5'
                  }
                }}
              />
            </Box>
          </Box>

          {/* Firma y Sello */}
          {profesionalData.firma && (
            <>
              <Divider sx={{ my: 2 }} />
              
              <Typography
                variant="subtitle1"
                sx={{
                  mb: 1.5,
                  fontWeight: "bold",
                  color: "#1A3C6D",
                  fontSize: "0.8rem",
                }}
              >
                FIRMA Y SELLO DIGITAL:
              </Typography>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%' } }}>
                  <Paper 
                    variant="outlined" 
                    sx={{ 
                      p: 2, 
                      textAlign: 'center',
                      backgroundColor: '#fafafa',
                      minHeight: 120
                    }}
                  >
                    <Typography sx={{ fontSize: '0.7rem', fontWeight: 'bold', mb: 1, color: '#1A3C6D' }}>
                      <FirmaIcon sx={{ fontSize: '0.8rem', mr: 0.5 }} />
                      FIRMA DIGITAL
                    </Typography>
                    <Box sx={{ 
                      border: '2px dashed #ccc', 
                      borderRadius: 1, 
                      p: 1,
                      minHeight: 80,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'white'
                    }}>
                      <Typography sx={{ fontSize: '0.65rem', color: '#666' }}>
                        FIRMA DE {profesionalData.primerNombre} {profesionalData.primerApellido}
                        <br />
                        <Typography component="span" sx={{ fontSize: '0.6rem', fontStyle: 'italic' }}>
                          Archivo: {profesionalData.firma}
                        </Typography>
                      </Typography>
                    </Box>
                  </Paper>
                </Box>
                <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%' } }}>
                  <Paper 
                    variant="outlined" 
                    sx={{ 
                      p: 2, 
                      textAlign: 'center',
                      backgroundColor: '#fafafa',
                      minHeight: 120
                    }}
                  >
                    <Typography sx={{ fontSize: '0.7rem', fontWeight: 'bold', mb: 1, color: '#1A3C6D' }}>
                      <SelloIcon sx={{ fontSize: '0.8rem', mr: 0.5 }} />
                      SELLO Y DOCUMENTO
                    </Typography>
                    <Box sx={{ 
                      border: '2px dashed #ccc', 
                      borderRadius: 1, 
                      p: 1,
                      minHeight: 80,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'white'
                    }}>
                      <Typography sx={{ fontSize: '0.65rem', color: '#666' }}>
                        SELLO OFICIAL
                        <br />
                        <Typography component="span" sx={{ fontSize: '0.6rem', fontWeight: 'bold' }}>
                          DOC: {profesionalData.numeroDocumento}
                        </Typography>
                        <br />
                        <Typography component="span" sx={{ fontSize: '0.6rem', fontStyle: 'italic' }}>
                          {profesionalData.registroMedico}
                        </Typography>
                      </Typography>
                    </Box>
                  </Paper>
                </Box>
              </Box>
            </>
          )}

          {/* Información de selección */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {profesionalData.primerNombre && (
              <Chip
                label={`Dr(a). ${profesionalData.primerNombre} ${profesionalData.primerApellido}`}
                size="small"
                color="primary"
                sx={{ fontSize: '0.65rem', fontWeight: 'bold' }}
              />
            )}
            {profesionalData.especialidad && (
              <Chip
                label={profesionalData.especialidad}
                size="small"
                color="secondary"
                sx={{ fontSize: '0.65rem' }}
              />
            )}
            {profesionalData.fechaSeleccion && (
              <Chip
                icon={<TiempoIcon sx={{ fontSize: '0.7rem' }} />}
                label={`Seleccionado: ${new Date(profesionalData.fechaSeleccion).toLocaleString()}`}
                size="small"
                color="success"
                sx={{ fontSize: '0.65rem' }}
              />
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Dialog de búsqueda de médicos */}
      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#1A3C6D' }}>
          BUSCAR MÉDICO EN BASE DE DATOS
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            placeholder="Buscar por nombre, apellido, documento, especialidad o registro médico..."
            value={busquedaTexto}
            onChange={(e) => setBusquedaTexto(e.target.value)}
            size="small"
            sx={{ 
              mb: 2,
              '& .MuiInputBase-input': { fontSize: '0.8rem' }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BuscarIcon sx={{ fontSize: '0.9rem' }} />
                </InputAdornment>
              ),
            }}
          />
          
          <List sx={{ maxHeight: 400, overflow: 'auto' }}>
            {medicosFiltrados.map((medico) => (
              <ListItem key={medico.id} disablePadding>
                <ListItemButton 
                  onClick={() => seleccionarMedico(medico)}
                  sx={{ '&:hover': { backgroundColor: '#f0f8ff' } }}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ backgroundColor: '#1A3C6D', fontSize: '0.8rem' }}>
                      {medico.primerNombre.charAt(0)}{medico.primerApellido.charAt(0)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography sx={{ fontSize: '0.8rem', fontWeight: 'bold' }}>
                        Dr(a). {medico.primerNombre} {medico.primerApellido} {medico.segundoApellido}
                      </Typography>
                    }
                    secondary={
                      <Box>
                        <Typography sx={{ fontSize: '0.7rem', color: '#666' }}>
                          {medico.especialidad}
                        </Typography>
                        <Typography sx={{ fontSize: '0.65rem', color: '#666' }}>
                          {medico.numeroDocumento} • 📄 {medico.registroMedico}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          
          {medicosFiltrados.length === 0 && busquedaTexto && (
            <Alert severity="info" sx={{ fontSize: '0.7rem' }}>
              No se encontraron médicos que coincidan con la búsqueda.
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setOpenDialog(false)}
            sx={{ fontSize: '0.7rem' }}
          >
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
