import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  Alert
} from '@mui/material';

export default function ExamenesHispForm() {
  // Estados para los campos del formulario
  const [transquirurgico, setTransquirurgico] = useState('');
  const [biopsiaCongelacion, setBiopsiaCongelacion] = useState('no');
  const [resultadoBiopsia, setResultadoBiopsia] = useState('');
  const [histopatologico, setHistopatologico] = useState('no');
  const [muestraHistopatologico, setMuestraHistopatologico] = useState('');
  const [requiereSolicitud, setRequiereSolicitud] = useState('no');
  
  // Estado para el diálogo
  const [dialogoAbierto, setDialogoAbierto] = useState(false);
  const [tipoSolicitud, setTipoSolicitud] = useState('');
  const [responsableExterno, setResponsableExterno] = useState('');
  const [formularioInternoAbierto, setFormularioInternoAbierto] = useState(false);
  const [errorResponsable, setErrorResponsable] = useState(false);

  // Manejar cambio en la selección de "Requiere solicitud"
  const handleRequiereSolicitudChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valor = event.target.value;
    setRequiereSolicitud(valor);
    
    if (valor === 'si') {
      setDialogoAbierto(true);
    } else {
      // Resetear valores relacionados con la solicitud
      setTipoSolicitud('');
      setResponsableExterno('');
      setFormularioInternoAbierto(false);
    }
  };

  // Manejar selección de tipo de solicitud
  const handleTipoSolicitudChange = (valor: string) => {
    setTipoSolicitud(valor);
    setErrorResponsable(false);
    
    if (valor === 'interna') {
      setResponsableExterno('');
    }
  };

  // Confirmar selección de tipo de solicitud
  const handleConfirmarTipoSolicitud = () => {
    if (tipoSolicitud === 'externa' && !responsableExterno.trim()) {
      setErrorResponsable(true);
      return;
    }
    
    if (tipoSolicitud === 'interna') {
      setFormularioInternoAbierto(true);
    }
    
    setDialogoAbierto(false);
  };

  // Cerrar el diálogo y resetear la selección si se cancela
  const handleCancelarDialogo = () => {
    if (!tipoSolicitud) {
      setRequiereSolicitud('no');
    }
    setDialogoAbierto(false);
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
            H. EXÁMENES HISTOPATOLÓGICOS
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Campo para Transquirúrgico */}
            <TextField
              label="TRANSQUIRÚRGICO"
              value={transquirurgico}
              onChange={(e) => setTransquirurgico(e.target.value)}
              multiline
              rows={2}
              fullWidth
              placeholder="Describa los exámenes transquirúrgicos realizados"
              InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
              InputProps={{ sx: { fontSize: "0.8rem" } }}
            />

            {/* Sección de Biopsia por congelación */}
            <Box>
              <FormControl component="fieldset">
                <FormLabel 
                  component="legend" 
                  sx={{ 
                    fontSize: "0.8rem", 
                    fontWeight: "bold",
                    color: "#1A3C6D"
                  }}
                >
                  BIOPSIA POR CONGELACIÓN
                </FormLabel>
                <RadioGroup
                  row
                  value={biopsiaCongelacion}
                  onChange={(e) => setBiopsiaCongelacion(e.target.value)}
                >
                  <FormControlLabel 
                    value="si" 
                    control={<Radio size="small" />} 
                    label={<Typography sx={{ fontSize: "0.8rem" }}>SI</Typography>}
                  />
                  <FormControlLabel 
                    value="no" 
                    control={<Radio size="small" />} 
                    label={<Typography sx={{ fontSize: "0.8rem" }}>NO</Typography>}
                  />
                </RadioGroup>
              </FormControl>

              {/* Campo para resultado de biopsia (solo visible si se seleccionó "SI") */}
              {biopsiaCongelacion === 'si' && (
                <TextField
                  label="RESULTADO"
                  value={resultadoBiopsia}
                  onChange={(e) => setResultadoBiopsia(e.target.value)}
                  fullWidth
                  size="small"
                  sx={{ mt: 1 }}
                  placeholder="Describa el resultado de la biopsia por congelación"
                  InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                  InputProps={{ sx: { fontSize: "0.8rem" } }}
                />
              )}
            </Box>

            <Divider />

            {/* Sección de Histopatológico */}
            <Box>
              <FormControl component="fieldset">
                <FormLabel 
                  component="legend" 
                  sx={{ 
                    fontSize: "0.8rem", 
                    fontWeight: "bold",
                    color: "#1A3C6D"
                  }}
                >
                  HISTOPATOLÓGICO
                </FormLabel>
                <RadioGroup
                  row
                  value={histopatologico}
                  onChange={(e) => setHistopatologico(e.target.value)}
                >
                  <FormControlLabel 
                    value="si" 
                    control={<Radio size="small" />} 
                    label={<Typography sx={{ fontSize: "0.8rem" }}>SI</Typography>}
                  />
                  <FormControlLabel 
                    value="no" 
                    control={<Radio size="small" />} 
                    label={<Typography sx={{ fontSize: "0.8rem" }}>NO</Typography>}
                  />
                </RadioGroup>
              </FormControl>

              {/* Campo para muestra histopatológica (solo visible si se seleccionó "SI") */}
              {histopatologico === 'si' && (
                <TextField
                  label="MUESTRA"
                  value={muestraHistopatologico}
                  onChange={(e) => setMuestraHistopatologico(e.target.value)}
                  fullWidth
                  size="small"
                  sx={{ mt: 1 }}
                  placeholder="Describa la muestra para examen histopatológico"
                  InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                  InputProps={{ sx: { fontSize: "0.8rem" } }}
                />
              )}
            </Box>

            <Divider />

            {/* Sección de solicitud de Anatomía Patológica */}
            <Box>
              <FormControl component="fieldset">
                <FormLabel 
                  component="legend" 
                  sx={{ 
                    fontSize: "0.8rem", 
                    fontWeight: "bold",
                    color: "#1A3C6D"
                  }}
                >
                  ¿REQUIERE SOLICITUD DE ANATOMÍA PATOLÓGICA?
                </FormLabel>
                <RadioGroup
                  row
                  value={requiereSolicitud}
                  onChange={handleRequiereSolicitudChange}
                >
                  <FormControlLabel 
                    value="si" 
                    control={<Radio size="small" />} 
                    label={<Typography sx={{ fontSize: "0.8rem" }}>SI</Typography>}
                  />
                  <FormControlLabel 
                    value="no" 
                    control={<Radio size="small" />} 
                    label={<Typography sx={{ fontSize: "0.8rem" }}>NO</Typography>}
                  />
                </RadioGroup>
              </FormControl>

              {/* Mostrar información sobre el tipo de solicitud seleccionada */}
              {requiereSolicitud === 'si' && tipoSolicitud && (
                <Box sx={{ mt: 1, p: 1.5, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                  <Typography sx={{ fontSize: "0.8rem", fontWeight: "medium" }}>
                    Tipo de solicitud seleccionada: <strong>{tipoSolicitud === 'interna' ? 'INTERNA' : 'EXTERNA'}</strong>
                  </Typography>
                  {tipoSolicitud === 'interna' && (
                    <Typography sx={{ fontSize: "0.8rem", color: 'text.secondary', mt: 0.5 }}>
                      Formulario 013 MSP {formularioInternoAbierto ? 'completado' : 'pendiente por completar'}
                    </Typography>
                  )}
                  {tipoSolicitud === 'externa' && (
                    <Typography sx={{ fontSize: "0.8rem", mt: 0.5 }}>
                      Responsable externo: <strong>{responsableExterno}</strong>
                    </Typography>
                  )}
                  <Button 
                    size="small" 
                    sx={{ 
                      mt: 1, 
                      color: '#1A3C6D',
                      fontSize: "0.75rem"
                    }}
                    onClick={() => setDialogoAbierto(true)}
                  >
                    CAMBIAR
                  </Button>
                </Box>
              )}
            </Box>
            
            {/* Si es formulario interno y está abierto, mostrar un mensaje */}
            {formularioInternoAbierto && (
              <Alert severity="info" sx={{ fontSize: "0.8rem" }}>
                El Formulario 013 MSP se ha abierto para completar. Por favor complete todos los campos requeridos.
              </Alert>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Diálogo para seleccionar tipo de solicitud */}
      <Dialog 
        open={dialogoAbierto} 
        onClose={handleCancelarDialogo}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ 
          bgcolor: '#1A3C6D', 
          color: 'white', 
          fontSize: '1rem', 
          fontWeight: 'bold' 
        }}>
          Tipo de Solicitud de Anatomía Patológica
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Typography sx={{ mb: 2, fontSize: "0.9rem" }}>
            ¿La solicitud es interna o externa?
          </Typography>
          
          <RadioGroup
            value={tipoSolicitud}
            onChange={(e) => handleTipoSolicitudChange(e.target.value)}
          >
            <FormControlLabel 
              value="interna" 
              control={<Radio size="small" />} 
              label={
                <Typography sx={{ fontSize: "0.85rem" }}>
                  INTERNA (Formulario 013 MSP)
                </Typography>
              }
            />
            <FormControlLabel 
              value="externa" 
              control={<Radio size="small" />} 
              label={
                <Typography sx={{ fontSize: "0.85rem" }}>
                  EXTERNA
                </Typography>
              }
            />
          </RadioGroup>
          
          {tipoSolicitud === 'externa' && (
            <TextField
              label="Nombre del Responsable Externo"
              value={responsableExterno}
              onChange={(e) => {
                setResponsableExterno(e.target.value);
                setErrorResponsable(false);
              }}
              fullWidth
              size="small"
              required
              error={errorResponsable}
              helperText={errorResponsable ? "Este campo es obligatorio" : ""}
              sx={{ mt: 2 }}
              InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
              InputProps={{ sx: { fontSize: "0.8rem" } }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleCancelarDialogo}
            size="small"
            sx={{ color: 'text.secondary', fontSize: "0.8rem" }}
          >
            CANCELAR
          </Button>
          <Button 
            onClick={handleConfirmarTipoSolicitud}
            variant="contained"
            size="small"
            disabled={!tipoSolicitud || (tipoSolicitud === 'externa' && !responsableExterno)}
            sx={{ 
              background: "#1A3C6D",
              "&:hover": { background: "#274472" },
              fontSize: "0.8rem" 
            }}
          >
            CONFIRMAR
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}