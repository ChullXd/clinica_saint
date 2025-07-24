import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  FormHelperText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import { 
  Save as SaveIcon, 
  ContentCopy as ContentCopyIcon,
  LibraryBooks as LibraryBooksIcon
} from '@mui/icons-material';

// Interfaz para plantillas de protocolos
interface PlantillaProtocolo {
  id: number;
  titulo: string;
  dieresis: string;
  exposicion: string;
  hallazgos: string;
  procedimiento: string;
  especialidad: string;
  autor: string;
}

export default function TiemposQuirurgicosForm() {
  const [fechaOperacion, setFechaOperacion] = useState({
    dia: '',
    mes: '',
    anio: '',
  });

  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [dieresis, setDieresis] = useState('');
  const [exposicion, setExposicion] = useState('');
  const [hallazgos, setHallazgos] = useState('');
  const [procedimiento, setProcedimiento] = useState('');

  // Validación de campos
  const [errores, setErrores] = useState({
    horaInicio: false,
    horaFin: false,
  });

  // Estado para el diálogo de plantillas
  const [dialogoAbierto, setDialogoAbierto] = useState(false);

  // Plantillas de ejemplo
  const [plantillas, setPlantillas] = useState<PlantillaProtocolo[]>([
    {
      id: 1,
      titulo: 'Apendicectomía estándar',
      dieresis: 'Incisión oblicua de McBurney en fosa ilíaca derecha de aproximadamente 5 cm.',
      exposicion: 'Disección por planos hasta cavidad abdominal, identificación de apéndice.',
      hallazgos: 'Apéndice cecal inflamado, con base conservada, sin perforación. No se observa líquido purulento.',
      procedimiento: 'Se realiza apendicectomía clásica con ligadura de base apendicular. Cierre por planos anatómicos.',
      especialidad: 'Cirugía General',
      autor: 'Dr. Rodríguez'
    },
    {
      id: 2,
      titulo: 'Colecistectomía laparoscópica',
      dieresis: 'Incisión umbilical para trócar de 10mm, dos incisiones subcostales derechas para trócares de 5mm.',
      exposicion: 'Neumoperitoneo a 12 mmHg, exploración de cavidad abdominal.',
      hallazgos: 'Vesícula biliar con paredes engrosadas, múltiples cálculos en su interior.',
      procedimiento: 'Disección del triángulo de Calot, clipado y sección del conducto cístico y arteria cística. Extracción de la vesícula biliar por puerto umbilical.',
      especialidad: 'Cirugía General',
      autor: 'Dra. Martínez'
    }
  ]);

  // Función para validar horas
  const validarHoras = () => {
    const erroresActualizados = {
      horaInicio: horaInicio === '',
      horaFin: horaFin === ''
    };
    setErrores(erroresActualizados);
    return !erroresActualizados.horaInicio && !erroresActualizados.horaFin;
  };

  // Función para aplicar plantilla
  const aplicarPlantilla = (plantilla: PlantillaProtocolo) => {
    setDieresis(plantilla.dieresis);
    setExposicion(plantilla.exposicion);
    setHallazgos(plantilla.hallazgos);
    setProcedimiento(plantilla.procedimiento);
    setDialogoAbierto(false);
  };

  // Establecer fecha actual al cargar el componente
  useEffect(() => {
    const fechaActual = new Date();
    setFechaOperacion({
      dia: fechaActual.getDate().toString().padStart(2, '0'),
      mes: (fechaActual.getMonth() + 1).toString().padStart(2, '0'),
      anio: fechaActual.getFullYear().toString()
    });
  }, []);

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
            F. TIEMPOS QUIRÚRGICOS
          </Typography>

          {/* Fecha y hora de operación */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 1.5 }}>
            <Box sx={{ flex: { xs: '1 1 100%', md: '0 0 auto' } }}>
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  fontWeight: "medium", 
                  color: "#1A3C6D",
                  fontSize: "0.85rem",
                  mb: 0.5
                }}
              >
                FECHA DE OPERACIÓN
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  label="DÍA"
                  value={fechaOperacion.dia}
                  onChange={(e) => setFechaOperacion({...fechaOperacion, dia: e.target.value})}
                  size="small"
                  sx={{ width: '60px' }}
                  inputProps={{ maxLength: 2, inputMode: 'numeric', pattern: '[0-9]*' }}
                  InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                  InputProps={{ sx: { fontSize: "0.8rem" } }}
                />
                <TextField
                  label="MES"
                  value={fechaOperacion.mes}
                  onChange={(e) => setFechaOperacion({...fechaOperacion, mes: e.target.value})}
                  size="small"
                  sx={{ width: '60px' }}
                  inputProps={{ maxLength: 2, inputMode: 'numeric', pattern: '[0-9]*' }}
                  InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                  InputProps={{ sx: { fontSize: "0.8rem" } }}
                />
                <TextField
                  label="AÑO"
                  value={fechaOperacion.anio}
                  onChange={(e) => setFechaOperacion({...fechaOperacion, anio: e.target.value})}
                  size="small"
                  sx={{ width: '80px' }}
                  inputProps={{ maxLength: 4, inputMode: 'numeric', pattern: '[0-9]*' }}
                  InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                  InputProps={{ sx: { fontSize: "0.8rem" } }}
                />
              </Box>
            </Box>

            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 20%' } }}>
              <TextField
                label="HORA DE INICIO"
                value={horaInicio}
                onChange={(e) => setHoraInicio(e.target.value)}
                size="small"
                type="time"
                fullWidth
                required
                error={errores.horaInicio}
                helperText={errores.horaInicio ? "Campo obligatorio" : ""}
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                InputProps={{ sx: { fontSize: "0.8rem" } }}
                FormHelperTextProps={{ sx: { fontSize: "0.7rem" } }}
              />
            </Box>

            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 20%' } }}>
              <TextField
                label="HORA DE TERMINACIÓN"
                value={horaFin}
                onChange={(e) => setHoraFin(e.target.value)}
                size="small"
                type="time"
                fullWidth
                required
                error={errores.horaFin}
                helperText={errores.horaFin ? "Campo obligatorio" : ""}
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                InputProps={{ sx: { fontSize: "0.8rem" } }}
                FormHelperTextProps={{ sx: { fontSize: "0.7rem" } }}
              />
            </Box>

            <Box sx={{ flex: { xs: '1 1 100%', md: '0 1 auto' }, display: 'flex', alignItems: 'flex-start' }}>
              <Tooltip title="Usar plantilla de protocolo">
                <Button
                  variant="outlined"
                  startIcon={<LibraryBooksIcon />}
                  onClick={() => setDialogoAbierto(true)}
                  size="small"
                  sx={{ 
                    color: '#1A3C6D', 
                    borderColor: '#1A3C6D',
                    fontSize: "0.8rem",
                    height: '40px'
                  }}
                >
                  PLANTILLAS
                </Button>
              </Tooltip>
            </Box>
          </Box>

          {/* Campos de texto para los tiempos quirúrgicos */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <TextField
              label="DIÉRESIS"
              value={dieresis}
              onChange={(e) => setDieresis(e.target.value)}
              size="small"
              multiline
              rows={2}
              fullWidth
              placeholder="Describa el procedimiento de incisión y abordaje"
              InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
              InputProps={{ sx: { fontSize: "0.8rem" } }}
            />
            
            <TextField
              label="EXPOSICIÓN Y EXPLORACIÓN"
              value={exposicion}
              onChange={(e) => setExposicion(e.target.value)}
              size="small"
              multiline
              rows={2}
              fullWidth
              placeholder="Describa la exposición del campo quirúrgico y exploración realizada"
              InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
              InputProps={{ sx: { fontSize: "0.8rem" } }}
            />
            
            <TextField
              label="HALLAZGOS QUIRÚRGICOS"
              value={hallazgos}
              onChange={(e) => setHallazgos(e.target.value)}
              size="small"
              multiline
              rows={3}
              fullWidth
              placeholder="Describa los hallazgos encontrados durante la intervención"
              InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
              InputProps={{ sx: { fontSize: "0.8rem" } }}
            />
            
            <Box sx={{ position: 'relative' }}>
              <TextField
                label="PROCEDIMIENTO QUIRÚRGICO"
                value={procedimiento}
                onChange={(e) => setProcedimiento(e.target.value)}
                size="small"
                multiline
                rows={4}
                fullWidth
                placeholder="Describa detalladamente el procedimiento quirúrgico realizado"
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                InputProps={{ sx: { fontSize: "0.8rem" } }}
              />
              <Tooltip title="Guardar como plantilla">
                <IconButton 
                  sx={{ 
                    position: 'absolute', 
                    right: 8, 
                    top: 8, 
                    color: '#1A3C6D',
                    visibility: procedimiento ? 'visible' : 'hidden'
                  }}
                  size="small"
                  onClick={() => alert('Funcionalidad: Guardar como plantilla')}
                >
                  <SaveIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Diálogo de plantillas */}
      <Dialog 
        open={dialogoAbierto} 
        onClose={() => setDialogoAbierto(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ 
          bgcolor: '#1A3C6D', 
          color: 'white', 
          fontSize: '1rem', 
          fontWeight: 'bold' 
        }}>
          Plantillas de Protocolos Quirúrgicos
        </DialogTitle>
        <DialogContent dividers>
          {plantillas.length > 0 ? (
            <List>
              {plantillas.map((plantilla) => (
                <ListItem 
                  key={plantilla.id}
                  sx={{ borderBottom: '1px solid #eee' }}
                >
                  <ListItemText 
                    primary={
                      <Typography sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                        {plantilla.titulo}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography sx={{ fontSize: '0.8rem' }}>
                          {`Especialidad: ${plantilla.especialidad} | Autor: ${plantilla.autor}`}
                        </Typography>
                        <Typography 
                          sx={{ 
                            fontSize: '0.8rem', 
                            color: 'text.secondary',
                            display: '-webkit-box',
                            overflow: 'hidden',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 2
                          }}
                        >
                          {plantilla.procedimiento}
                        </Typography>
                      </>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Tooltip title="Usar plantilla">
                      <IconButton 
                        edge="end" 
                        onClick={() => aplicarPlantilla(plantilla)}
                        sx={{ color: '#1A3C6D' }}
                      >
                        <ContentCopyIcon />
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography sx={{ textAlign: 'center', p: 2, color: 'text.secondary' }}>
              No hay plantillas disponibles
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setDialogoAbierto(false)} 
            sx={{ color: '#1A3C6D' }}
            size="small"
          >
            CERRAR
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}