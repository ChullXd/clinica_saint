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
  Alert
} from '@mui/material';
import { EditNote as EditNoteIcon } from '@mui/icons-material';

// Interfaz para los profesionales
interface Profesional {
  id: number;
  rol: string;
  nombre: string;
  codigo: string;
  especialidad?: string;
  firma?: string;
  sello?: string;
}

export default function DatosProfesional() {
  // Estado para almacenar los datos de los profesionales de la sección D
  const [profesionales, setProfesionales] = useState<Profesional[]>([
    { 
      id: 1, 
      rol: "Cirujano", 
      nombre: "Dr. Juan Pérez", 
      codigo: "MED-12345", 
      especialidad: "Cirugía General",
    //   firma: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Signature_of_Ann_Miller.png"
    },
    { 
      id: 2, 
      rol: "Ayudante", 
      nombre: "Dra. María López", 
      codigo: "MED-67890", 
      especialidad: "Cirugía General"
    },
    { 
      id: 3, 
      rol: "Anestesiólogo", 
      nombre: "Dr. Carlos Rodríguez", 
      codigo: "ANEST-54321", 
      especialidad: "Anestesiología",
    //   firma: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Tissot_Signature.png"
    }
  ]);

  // Estado para el profesional responsable seleccionado
  const [responsableSeleccionado, setResponsableSeleccionado] = useState<number | ''>('');
  const [editandoEspecialidad, setEditandoEspecialidad] = useState<number | null>(null);
  const [nuevaEspecialidad, setNuevaEspecialidad] = useState('');

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
  const handleStartEditEspecialidad = (id: number, especialidadActual: string | undefined) => {
    setEditandoEspecialidad(id);
    setNuevaEspecialidad(especialidadActual || '');
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
            J. DATOS DEL PROFESIONAL RESPONSABLE
          </Typography>

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

          {/* Listado de profesionales del equipo quirúrgico */}
          <Alert 
            severity="info" 
            sx={{ 
              mb: 2, 
              fontSize: "0.8rem",
              '& .MuiAlert-icon': { fontSize: '1.2rem' }
            }}
          >
            A continuación se muestran los profesionales ingresados en la sección D. EQUIPO QUIRÚRGICO
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
                                {profesional.especialidad || 'No especificada'}
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
                    </Box>
                  </Box>

                  {/* Columna 2: Firma y sello */}
                  <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 50%' } }}>
                    <Divider sx={{ display: { xs: 'block', md: 'none' }, my: 1 }} />
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}>
                      {/* Firma */}
                      <Box>
                        <Typography sx={{ fontSize: "0.7rem", color: 'text.secondary', mb: 0.5 }}>
                          FIRMA
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
                            <Box 
                              component="img" 
                              src={profesional.firma}
                              alt={`Firma de ${profesional.nombre}`}
                              sx={{ 
                                maxWidth: '100%', 
                                maxHeight: '60px', 
                                objectFit: 'contain'
                              }}
                            />
                          ) : (
                            <Typography sx={{ color: 'text.secondary', fontSize: '0.8rem', fontStyle: 'italic' }}>
                              Firma no disponible
                            </Typography>
                          )}
                        </Box>
                      </Box>

                      {/* Sello */}
                      <Box>
                        <Typography sx={{ fontSize: "0.7rem", color: 'text.secondary', mb: 0.5 }}>
                          SELLO Y DOCUMENTO DE IDENTIFICACIÓN
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
                            <Box 
                              component="img" 
                              src={profesional.sello}
                              alt={`Sello de ${profesional.nombre}`}
                              sx={{ 
                                maxWidth: '100%', 
                                maxHeight: '70px',
                                objectFit: 'contain'
                              }}
                            />
                          ) : (
                            <Button
                              size="small"
                              variant="outlined"
                              sx={{ 
                                fontSize: '0.75rem', 
                                color: '#1A3C6D', 
                                borderColor: '#1A3C6D'
                              }}
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
        </CardContent>
      </Card>
    </Box>
  );
}