import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Paper,
  Divider,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { EditNote as EditNoteIcon, Schedule as ScheduleIcon } from '@mui/icons-material';

interface ProfesionalData {
  id: number;
  rol: string;
  nombre: string;
  codigo: string;
  especialidad: string;
  documento: string;
  firma?: string;
  sello?: string;
}

export default function ProfesionalResponsable() {
  // Estado para almacenar los datos de los profesionales del equipo anestésico
  const [profesionales, setProfesionales] = useState<ProfesionalData[]>([
    { 
      id: 1, 
      rol: "Anestesiólogo Principal", 
      nombre: "DR. CARLOS EDUARDO MENDOZA LÓPEZ", 
      codigo: "ANEST-12345", 
      especialidad: "Anestesiología",
      documento: "12.345.678",
      // firma: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Signature_of_Ann_Miller.png"
    },
    { 
      id: 2, 
      rol: "Anestesiólogo Asistente", 
      nombre: "DRA. MARÍA ISABEL TORRES GARCÍA", 
      codigo: "ANEST-67890", 
      especialidad: "Anestesiología",
      documento: "87.654.321"
    },
    { 
      id: 3, 
      rol: "Enfermero de Anestesia", 
      nombre: "LIC. JOSÉ ANTONIO RIVERA MORALES", 
      codigo: "ENF-54321", 
      especialidad: "Enfermería en Anestesia",
      documento: "45.678.912"
    }
  ]);

  // Estados para el control del componente
  const [responsableSeleccionado, setResponsableSeleccionado] = useState<number | ''>('');
  const [horaFinalizacion, setHoraFinalizacion] = useState('');
  const [editandoEspecialidad, setEditandoEspecialidad] = useState<number | null>(null);
  const [nuevaEspecialidad, setNuevaEspecialidad] = useState('');
  const [openFirmaDialog, setOpenFirmaDialog] = useState(false);
  const [openSelloDialog, setOpenSelloDialog] = useState(false);
  const [profesionalParaFirma, setProfesionalParaFirma] = useState<number | null>(null);

  // Inicializar hora actual
  useEffect(() => {
    const ahora = new Date();
    const horaActual = `${ahora.getHours().toString().padStart(2, '0')}:${ahora.getMinutes().toString().padStart(2, '0')}`;
    setHoraFinalizacion(horaActual);
  }, []);

  // Simulación de firmas disponibles en BD
  const firmasDisponibles = [
    { id: 1, nombre: 'Firma Digital 1', url: '/api/firmas/firma1.png', fecha: '2024-01-15' },
    { id: 2, nombre: 'Firma Digital 2', url: '/api/firmas/firma2.png', fecha: '2024-02-20' },
    { id: 3, nombre: 'Firma Digital 3', url: '/api/firmas/firma3.png', fecha: '2024-03-10' },
  ];

  const sellosDisponibles = [
    { id: 1, nombre: 'SELLO PROFESIONAL', url: '/api/sellos/sello1.png', tipo: 'Oficial' },
    { id: 2, nombre: 'SELLO INSTITUCIONAL', url: '/api/sellos/sello2.png', tipo: 'Institucional' },
  ];

  // Función para actualizar la especialidad de un profesional
  const handleUpdateEspecialidad = (id: number) => {
    if (nuevaEspecialidad.trim()) {
      setProfesionales(profesionales.map(prof => 
        prof.id === id ? { ...prof, especialidad: nuevaEspecialidad } : prof
      ));
      setEditandoEspecialidad(null);
      setNuevaEspecialidad('');
    }
  };

  // Función para iniciar la edición de especialidad
  const handleStartEditEspecialidad = (id: number, especialidadActual: string) => {
    setEditandoEspecialidad(id);
    setNuevaEspecialidad(especialidadActual);
  };

  // Función para solicitar firma digital
  const handleSolicitarFirma = (profesionalId: number) => {
    setProfesionalParaFirma(profesionalId);
    setOpenFirmaDialog(true);
  };

  // Función para solicitar sello digital
  const handleSolicitarSello = (profesionalId: number) => {
    setProfesionalParaFirma(profesionalId);
    setOpenSelloDialog(true);
  };

  const seleccionarFirma = (firma: any) => {
    if (profesionalParaFirma) {
      setProfesionales(profesionales.map(prof => 
        prof.id === profesionalParaFirma ? { ...prof, firma: firma.url } : prof
      ));
    }
    setOpenFirmaDialog(false);
    setProfesionalParaFirma(null);
  };

  const seleccionarSello = (sello: any) => {
    if (profesionalParaFirma) {
      setProfesionales(profesionales.map(prof => 
        prof.id === profesionalParaFirma ? { ...prof, sello: sello.url } : prof
      ));
    }
    setOpenSelloDialog(false);
    setProfesionalParaFirma(null);
  };

  return (
    <Box>
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 2 }}>
          <Typography
            variant="h6"
            sx={{
              mb: 1.5,
              fontWeight: "bold",
              color: "#1A3C6D",
              fontSize: "1rem",
            }}
          >
            S. DATOS DEL PROFESIONAL RESPONSABLE
          </Typography>

          {/* Hora de finalización */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <ScheduleIcon sx={{ fontSize: '1rem', color: '#1A3C6D' }} />
              <Typography sx={{ fontSize: "0.8rem", fontWeight: 'bold' }}>
                HORA DE FINALIZACIÓN
              </Typography>
            </Box>
            <TextField
              size="small"
              type="time"
              value={horaFinalizacion}
              onChange={(e) => setHoraFinalizacion(e.target.value)}
              sx={{ 
                width: 150,
                '& .MuiInputBase-input': { fontSize: '0.9rem', py: 0.5 }
              }}
            />
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Selección del profesional responsable */}
          <Box sx={{ mb: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel sx={{ fontSize: "0.8rem" }}>Seleccione el Profesional Responsable</InputLabel>
              <Select
                value={responsableSeleccionado}
                label="Seleccione el Profesional Responsable"
                onChange={(e) => setResponsableSeleccionado(e.target.value as number)}
                sx={{ fontSize: "0.8rem" }}
              >
                <MenuItem value="" sx={{ fontSize: "0.8rem" }}>
                  <em>Seleccione un profesional</em>
                </MenuItem>
                {profesionales.map((prof) => (
                  <MenuItem key={prof.id} value={prof.id} sx={{ fontSize: "0.8rem" }}>
                    {prof.rol}: {prof.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Información sobre los profesionales */}
          <Alert 
            severity="info" 
            sx={{ 
              mb: 2, 
              fontSize: "0.8rem",
              '& .MuiAlert-icon': { fontSize: '1.2rem' }
            }}
          >
            A continuación se muestran los profesionales del equipo anestésico disponibles
          </Alert>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {profesionales.map((profesional) => (
              <Paper 
                key={profesional.id} 
                elevation={0} 
                variant="outlined"
                sx={{ 
                  p: 2,
                  borderColor: responsableSeleccionado === profesional.id ? '#1A3C6D' : undefined,
                  bgcolor: responsableSeleccionado === profesional.id ? 'rgba(26, 60, 109, 0.05)' : undefined,
                  position: 'relative'
                }}
              >
                {/* Indicador de responsable seleccionado */}
                {responsableSeleccionado === profesional.id && (
                  <Box 
                    sx={{ 
                      position: 'absolute', 
                      top: 0, 
                      right: 0, 
                      bgcolor: '#1A3C6D', 
                      color: 'white',
                      px: 1,
                      py: 0.5,
                      borderBottomLeftRadius: 4,
                      fontSize: '0.7rem',
                      fontWeight: 'bold'
                    }}
                  >
                    RESPONSABLE
                  </Box>
                )}

                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
                  {/* Columna 1: Datos básicos */}
                  <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 50%' } }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Box>
                        <Typography sx={{ fontSize: "0.7rem", color: 'text.secondary' }}>
                          ROL
                        </Typography>
                        <Typography sx={{ fontSize: "0.9rem", fontWeight: 'medium' }}>
                          {profesional.rol}
                        </Typography>
                      </Box>
                      
                      <Box>
                        <Typography sx={{ fontSize: "0.7rem", color: 'text.secondary' }}>
                          NOMBRE Y APELLIDOS
                        </Typography>
                        <Typography sx={{ fontSize: "0.9rem", fontWeight: 'medium' }}>
                          {profesional.nombre}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ flex: 1 }}>
                          <Typography sx={{ fontSize: "0.7rem", color: 'text.secondary' }}>
                            ESPECIALIDAD
                          </Typography>
                          
                          {editandoEspecialidad === profesional.id ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <TextField
                                size="small"
                                value={nuevaEspecialidad}
                                onChange={(e) => setNuevaEspecialidad(e.target.value)}
                                sx={{ 
                                  '& .MuiInputBase-input': { fontSize: '0.9rem', py: 0.5 } 
                                }}
                              />
                              <Button 
                                size="small" 
                                sx={{ fontSize: '0.7rem' }}
                                onClick={() => handleUpdateEspecialidad(profesional.id)}
                              >
                                Guardar
                              </Button>
                            </Box>
                          ) : (
                            <>
                              <Typography sx={{ fontSize: "0.9rem", fontWeight: 'medium', display: 'inline' }}>
                                {profesional.especialidad}
                              </Typography>
                              <Button 
                                startIcon={<EditNoteIcon />} 
                                size="small"
                                sx={{ ml: 1, fontSize: '0.7rem', p: 0, minWidth: 'auto' }}
                                onClick={() => handleStartEditEspecialidad(profesional.id, profesional.especialidad)}
                              >
                                Editar
                              </Button>
                            </>
                          )}
                        </Box>
                      </Box>

                      <Box>
                        <Typography sx={{ fontSize: "0.7rem", color: 'text.secondary' }}>
                          CÓDIGO PROFESIONAL
                        </Typography>
                        <Typography sx={{ fontSize: "0.9rem" }}>
                          {profesional.codigo}
                        </Typography>
                      </Box>

                      <Box>
                        <Typography sx={{ fontSize: "0.7rem", color: 'text.secondary' }}>
                          DOCUMENTO DE IDENTIFICACIÓN
                        </Typography>
                        <Typography sx={{ fontSize: "0.9rem", fontWeight: 'medium' }}>
                          {profesional.documento}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  {/* Columna 2: Firma y sello */}
                  <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 50%' } }}>
                    <Divider sx={{ display: { xs: 'block', md: 'none' }, my: 1 }} />
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}>
                      {/* Firma */}
                      <Box>
                        <Typography sx={{ fontSize: "0.7rem", color: 'text.secondary', mb: 0.5 }}>
                          FIRMA DIGITAL
                        </Typography>
                        <Box 
                          sx={{ 
                            border: '1px dashed #ccc', 
                            borderRadius: 1, 
                            p: 1, 
                            minHeight: '70px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          {profesional.firma ? (
                            <Box sx={{ textAlign: 'center' }}>
                              <Box 
                                component="img" 
                                src={profesional.firma}
                                alt={`Firma de ${profesional.nombre}`}
                                sx={{ 
                                  maxWidth: '100%', 
                                  maxHeight: '50px', 
                                  objectFit: 'contain',
                                  mb: 0.5
                                }}
                              />
                              <Typography sx={{ fontSize: '0.7rem', color: '#1A3C6D', fontWeight: 'bold' }}>
                                FIRMA VÁLIDA
                              </Typography>
                            </Box>
                          ) : (
                            <Button
                              size="small"
                              variant="outlined"
                              sx={{ 
                                fontSize: '0.75rem', 
                                color: '#1A3C6D', 
                                borderColor: '#1A3C6D'
                              }}
                              onClick={() => handleSolicitarFirma(profesional.id)}
                            >
                              SOLICITAR FIRMA DIGITAL
                            </Button>
                          )}
                        </Box>
                      </Box>

                      {/* Sello */}
                      <Box>
                        <Typography sx={{ fontSize: "0.7rem", color: 'text.secondary', mb: 0.5 }}>
                          SELLO PROFESIONAL
                        </Typography>
                        <Box 
                          sx={{ 
                            border: '1px dashed #ccc', 
                            borderRadius: 1, 
                            p: 1, 
                            minHeight: '70px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          {profesional.sello ? (
                            <Box sx={{ textAlign: 'center' }}>
                              <Box 
                                component="img" 
                                src={profesional.sello}
                                alt={`Sello de ${profesional.nombre}`}
                                sx={{ 
                                  maxWidth: '100%', 
                                  maxHeight: '60px',
                                  objectFit: 'contain',
                                  mb: 0.5
                                }}
                              />
                              <Typography sx={{ fontSize: '0.7rem', color: '#1A3C6D', fontWeight: 'bold' }}>
                                SELLO VÁLIDO
                              </Typography>
                            </Box>
                          ) : (
                            <Button
                              size="small"
                              variant="outlined"
                              sx={{ 
                                fontSize: '0.75rem', 
                                color: '#1A3C6D', 
                                borderColor: '#1A3C6D'
                              }}
                              onClick={() => handleSolicitarSello(profesional.id)}
                            >
                              SOLICITAR SELLO DIGITAL
                            </Button>
                          )}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Paper>
            ))}
          </Box>

          {/* Resumen del responsable seleccionado */}
          {responsableSeleccionado && (
            <Alert 
              severity="success" 
              sx={{ 
                mt: 2, 
                fontSize: "0.8rem",
                '& .MuiAlert-icon': { fontSize: '1.2rem' }
              }}
            >
              <Typography sx={{ fontWeight: 'bold', fontSize: '0.8rem' }}>
                Profesional Responsable: {profesionales.find(p => p.id === responsableSeleccionado)?.nombre}
              </Typography>
              <Typography sx={{ fontSize: '0.7rem' }}>
                Hora de finalización: {horaFinalizacion} | 
                Documento: {profesionales.find(p => p.id === responsableSeleccionado)?.documento}
              </Typography>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Dialog para seleccionar firma */}
      <Dialog open={openFirmaDialog} onClose={() => setOpenFirmaDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontSize: '0.9rem' }}>📝 Seleccionar Firma Digital</DialogTitle>
        <DialogContent>
          <List>
            {firmasDisponibles.map((firma) => (
              <ListItem 
                key={firma.id} 
                onClick={() => seleccionarFirma(firma)}
                sx={{ 
                  border: '1px solid #e0e0e0', 
                  borderRadius: 1, 
                  mb: 1,
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: '#f5f5f5' }
                }}
              >
                <ListItemAvatar>
                  <Box sx={{ 
                    width: 80, 
                    height: 40, 
                    border: '1px solid #ddd', 
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'white'
                  }}>
                    <Typography sx={{ fontSize: '0.7rem', color: '#666' }}>
                      FIRMA
                    </Typography>
                  </Box>
                </ListItemAvatar>
                <ListItemText 
                  primary={<Typography sx={{ fontSize: '0.8rem' }}>{firma.nombre}</Typography>} 
                  secondary={<Typography sx={{ fontSize: '0.7rem' }}>{`Registrada: ${firma.fecha}`}</Typography>}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenFirmaDialog(false)} sx={{ fontSize: '0.8rem' }}>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog para seleccionar sello */}
      <Dialog open={openSelloDialog} onClose={() => setOpenSelloDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontSize: '0.9rem' }}>🏷️ Seleccionar Sello</DialogTitle>
        <DialogContent>
          <List>
            {sellosDisponibles.map((sello) => (
              <ListItem 
                key={sello.id} 
                onClick={() => seleccionarSello(sello)}
                sx={{ 
                  border: '1px solid #e0e0e0', 
                  borderRadius: 1, 
                  mb: 1,
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: '#f5f5f5' }
                }}
              >
                <ListItemAvatar>
                  <Box sx={{ 
                    width: 60, 
                    height: 60, 
                    border: '1px solid #ddd', 
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'white'
                  }}>
                    <Typography sx={{ fontSize: '0.7rem', color: '#666' }}>
                      SELLO
                    </Typography>
                  </Box>
                </ListItemAvatar>
                <ListItemText 
                  primary={<Typography sx={{ fontSize: '0.8rem' }}>{sello.nombre}</Typography>} 
                  secondary={<Typography sx={{ fontSize: '0.7rem' }}>{`Tipo: ${sello.tipo}`}</Typography>}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSelloDialog(false)} sx={{ fontSize: '0.8rem' }}>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}