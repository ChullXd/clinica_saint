import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
  Divider,
  Chip,
  Avatar,
  ButtonGroup,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
} from '@mui/material';
import {
  Person as ProfesionalIcon,
  CalendarToday as FechaIcon,
  AccessTime as HoraIcon,
  Badge as DocumentoIcon,
  DriveFileRenameOutline as FirmaIcon,
  Verified as SelloIcon,
  PictureAsPdf as PDFIcon,
  TableChart as ExcelIcon,
  Print as ImprimirIcon,
  Save as GuardarIcon,
  Add as NuevaIcon,
  Edit as EditarIcon,
  Delete as EliminarIcon,
  MedicalServices as MedicoIcon,
  ChildCare as RecienNacidoIcon,
  Assignment as EvolucionIcon,
  ExitToApp as AltaIcon,
} from "@mui/icons-material";

interface ProfesionalData {
  fecha: string;
  hora: string;
  numeroDocumento: string;
  primerNombre: string;
  primerApellido: string;
  segundoApellido: string;
  firma: string;
  sello: string;
  especialidad: string;
  registro: string;
}

interface MedicoPediatra {
  id: string;
  numeroDocumento: string;
  primerNombre: string;
  primerApellido: string;
  segundoApellido: string;
  especialidad: string;
  registro: string;
  activo: boolean;
}

export default function ProfesionalResponsable() {
  const [profesional, setProfesional] = useState<ProfesionalData>({
    fecha: new Date().toISOString().split('T')[0],
    hora: new Date().toTimeString().slice(0, 5),
    numeroDocumento: '',
    primerNombre: '',
    primerApellido: '',
    segundoApellido: '',
    firma: '',
    sello: '',
    especialidad: '',
    registro: '',
  });

  const [medicoSeleccionado, setMedicoSeleccionado] = useState<string>('');
  const [dialogoGuardar, setDialogoGuardar] = useState(false);
  const [dialogoEliminar, setDialogoEliminar] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);

  // Lista de médicos pediatras (simulada - debería venir del área de tecnología)
  const medicosPediatras: MedicoPediatra[] = [
    {
      id: '1',
      numeroDocumento: '12345678',
      primerNombre: 'CARLOS',
      primerApellido: 'RODRIGUEZ',
      segundoApellido: 'MARTINEZ',
      especialidad: 'PEDIATRÍA',
      registro: 'RM-12345',
      activo: true
    },
    {
      id: '2',
      numeroDocumento: '23456789',
      primerNombre: 'MARIA',
      primerApellido: 'GONZALEZ',
      segundoApellido: 'LOPEZ',
      especialidad: 'NEONATOLOGÍA',
      registro: 'RM-23456',
      activo: true
    },
    {
      id: '3',
      numeroDocumento: '34567890',
      primerNombre: 'JUAN',
      primerApellido: 'HERNANDEZ',
      segundoApellido: 'GARCIA',
      especialidad: 'PEDIATRÍA',
      registro: 'RM-34567',
      activo: true
    },
    {
      id: '4',
      numeroDocumento: '45678901',
      primerNombre: 'ANA',
      primerApellido: 'MORENO',
      segundoApellido: 'TORRES',
      especialidad: 'NEONATOLOGÍA',
      registro: 'RM-45678',
      activo: true
    },
    {
      id: '5',
      numeroDocumento: '56789012',
      primerNombre: 'LUIS',
      primerApellido: 'VARGAS',
      segundoApellido: 'SILVA',
      especialidad: 'PEDIATRÍA INTENSIVA',
      registro: 'RM-56789',
      activo: true
    }
  ];

  const handleMedicoChange = (medicoId: string) => {
    const medico = medicosPediatras.find(m => m.id === medicoId);
    if (medico) {
      setProfesional(prev => ({
        ...prev,
        numeroDocumento: medico.numeroDocumento,
        primerNombre: medico.primerNombre,
        primerApellido: medico.primerApellido,
        segundoApellido: medico.segundoApellido,
        especialidad: medico.especialidad,
        registro: medico.registro,
      }));
      setMedicoSeleccionado(medicoId);
    }
  };

  const handleChange = (field: keyof ProfesionalData, value: string) => {
    setProfesional(prev => ({
      ...prev,
      [field]: value.toUpperCase(),
    }));
  };

  // Funciones de botones
  const exportarPDF = () => {
    console.log('Exportando a PDF...');
    // Implementar exportación PDF
  };

  const exportarExcel = () => {
    console.log('Exportando a Excel...');
    // Implementar exportación Excel
  };

  const imprimir = () => {
    window.print();
  };

  const guardar = () => {
    setDialogoGuardar(true);
  };

  const nuevaConsulta = () => {
    setProfesional({
      fecha: new Date().toISOString().split('T')[0],
      hora: new Date().toTimeString().slice(0, 5),
      numeroDocumento: '',
      primerNombre: '',
      primerApellido: '',
      segundoApellido: '',
      firma: '',
      sello: '',
      especialidad: '',
      registro: '',
    });
    setMedicoSeleccionado('');
    setModoEdicion(false);
  };

  const editar = () => {
    setModoEdicion(!modoEdicion);
  };

  const eliminar = () => {
    setDialogoEliminar(true);
  };

  const confirmarGuardar = () => {
    console.log('Guardando datos del profesional...', profesional);
    setDialogoGuardar(false);
    setModoEdicion(false);
  };

  const confirmarEliminar = () => {
    console.log('Eliminando registro...');
    nuevaConsulta();
    setDialogoEliminar(false);
  };

  const nombreCompleto = `${profesional.primerNombre} ${profesional.primerApellido} ${profesional.segundoApellido}`.trim();

  return (
    <Box>
      {/* Sección M: Datos del Profesional Responsable */}
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
            <ProfesionalIcon sx={{ fontSize: '1.2rem' }} />
            M. DATOS DEL PROFESIONAL RESPONSABLE
          </Typography>

          {/* Selección de médico */}
          <Box sx={{ mb: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel sx={{ fontSize: "0.8rem" }}>SELECCIONAR MÉDICO PEDIATRA</InputLabel>
              <Select
                value={medicoSeleccionado}
                onChange={(e) => handleMedicoChange(e.target.value)}
                label="SELECCIONAR MÉDICO PEDIATRA"
                disabled={!modoEdicion && nombreCompleto.length > 0}
                startAdornment={
                  <InputAdornment position="start">
                    <MedicoIcon sx={{ fontSize: '1rem', color: '#1A3C6D' }} />
                  </InputAdornment>
                }
                sx={{ 
                  '& .MuiSelect-select': { 
                    fontSize: '0.85rem',
                    fontWeight: 'bold'
                  }
                }}
              >
                {medicosPediatras
                  .filter(medico => medico.activo)
                  .map((medico) => (
                    <MenuItem key={medico.id} value={medico.id} sx={{ fontSize: '0.8rem' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                        <Avatar sx={{ width: 24, height: 24, fontSize: '0.7rem', bgcolor: '#1976d2' }}>
                          {medico.primerNombre.charAt(0)}{medico.primerApellido.charAt(0)}
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography sx={{ fontSize: '0.8rem', fontWeight: 'bold' }}>
                            {medico.primerNombre} {medico.primerApellido} {medico.segundoApellido}
                          </Typography>
                          <Typography sx={{ fontSize: '0.7rem', color: '#666' }}>
                            {medico.especialidad} - {medico.registro} - Doc: {medico.numeroDocumento}
                          </Typography>
                        </Box>
                      </Box>
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>

          {/* Datos del profesional */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 2 }}>
            {/* Primera fila - Fecha y Hora */}
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%' } }}>
              <TextField
                label="FECHA"
                type="date"
                value={profesional.fecha}
                onChange={(e) => handleChange('fecha', e.target.value)}
                fullWidth
                size="small"
                disabled={!modoEdicion}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FechaIcon sx={{ fontSize: '1rem', color: '#1A3C6D' }} />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{ 
                  sx: { fontSize: "0.8rem" },
                  shrink: true 
                }}
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '0.85rem',
                    fontWeight: 'bold'
                  }
                }}
              />
            </Box>
            
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%' } }}>
              <TextField
                label="HORA"
                type="time"
                value={profesional.hora}
                onChange={(e) => handleChange('hora', e.target.value)}
                fullWidth
                size="small"
                disabled={!modoEdicion}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <HoraIcon sx={{ fontSize: '1rem', color: '#1A3C6D' }} />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{ 
                  sx: { fontSize: "0.8rem" },
                  shrink: true 
                }}
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '0.85rem',
                    fontWeight: 'bold'
                  }
                }}
              />
            </Box>

            {/* Segunda fila - Documento */}
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%' } }}>
              <TextField
                label="NÚMERO DE DOCUMENTO"
                value={profesional.numeroDocumento}
                onChange={(e) => handleChange('numeroDocumento', e.target.value)}
                fullWidth
                size="small"
                disabled={!modoEdicion}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DocumentoIcon sx={{ fontSize: '1rem', color: '#1A3C6D' }} />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '0.85rem',
                    fontWeight: 'bold'
                  }
                }}
              />
            </Box>

            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%' } }}>
              <TextField
                label="REGISTRO MÉDICO"
                value={profesional.registro}
                onChange={(e) => handleChange('registro', e.target.value)}
                fullWidth
                size="small"
                disabled={!modoEdicion}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SelloIcon sx={{ fontSize: '1rem', color: '#1A3C6D' }} />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '0.85rem',
                    fontWeight: 'bold'
                  }
                }}
              />
            </Box>

            {/* Tercera fila - Nombres */}
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 32%' } }}>
              <TextField
                label="PRIMER NOMBRE"
                value={profesional.primerNombre}
                onChange={(e) => handleChange('primerNombre', e.target.value)}
                fullWidth
                size="small"
                disabled={!modoEdicion}
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '0.85rem',
                    fontWeight: 'bold'
                  }
                }}
              />
            </Box>

            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 32%' } }}>
              <TextField
                label="PRIMER APELLIDO"
                value={profesional.primerApellido}
                onChange={(e) => handleChange('primerApellido', e.target.value)}
                fullWidth
                size="small"
                disabled={!modoEdicion}
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '0.85rem',
                    fontWeight: 'bold'
                  }
                }}
              />
            </Box>

            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 32%' } }}>
              <TextField
                label="SEGUNDO APELLIDO"
                value={profesional.segundoApellido}
                onChange={(e) => handleChange('segundoApellido', e.target.value)}
                fullWidth
                size="small"
                disabled={!modoEdicion}
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '0.85rem',
                    fontWeight: 'bold'
                  }
                }}
              />
            </Box>

            {/* Cuarta fila - Especialidad */}
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%' } }}>
              <TextField
                label="ESPECIALIDAD"
                value={profesional.especialidad}
                onChange={(e) => handleChange('especialidad', e.target.value)}
                fullWidth
                size="small"
                disabled={!modoEdicion}
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '0.85rem',
                    fontWeight: 'bold'
                  }
                }}
              />
            </Box>

            {/* Quinta fila - Firma y Sello */}
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%' } }}>
              <TextField
                label="FIRMA"
                value={profesional.firma}
                onChange={(e) => handleChange('firma', e.target.value)}
                fullWidth
                size="small"
                disabled={!modoEdicion}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FirmaIcon sx={{ fontSize: '1rem', color: '#1A3C6D' }} />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                placeholder="FIRMA DEL MÉDICO"
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '0.85rem',
                    fontWeight: 'bold'
                  }
                }}
              />
            </Box>

            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%' } }}>
              <TextField
                label="SELLO"
                value={profesional.sello}
                onChange={(e) => handleChange('sello', e.target.value)}
                fullWidth
                size="small"
                disabled={!modoEdicion}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SelloIcon sx={{ fontSize: '1rem', color: '#1A3C6D' }} />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                placeholder="SELLO PROFESIONAL"
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '0.85rem',
                    fontWeight: 'bold'
                  }
                }}
              />
            </Box>
          </Box>

          {/* Resumen del profesional */}
          {nombreCompleto.length > 0 && (
            <>
              <Divider sx={{ my: 2 }} />
              
              <Card variant="outlined" sx={{ backgroundColor: '#f0f8ff', borderColor: '#1976d2' }}>
                <CardContent sx={{ p: 1.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: '#1976d2' }}>
                      {profesional.primerNombre.charAt(0)}{profesional.primerApellido.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography sx={{ fontSize: "0.8rem", fontWeight: "bold", color: "#1565c0" }}>
                        DR(A). {nombreCompleto}
                      </Typography>
                      <Typography sx={{ fontSize: "0.7rem", color: "#1565c0" }}>
                        {profesional.especialidad} - {profesional.registro}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    <Chip
                      label={`Doc: ${profesional.numeroDocumento}`}
                      size="small"
                      color="primary"
                      sx={{ fontSize: '0.65rem', fontWeight: 'bold' }}
                    />
                    <Chip
                      label={`${profesional.fecha} ${profesional.hora}`}
                      size="small"
                      color="success"
                      sx={{ fontSize: '0.65rem', fontWeight: 'bold' }}
                    />
                    {profesional.firma && (
                      <Chip
                        label="FIRMADO"
                        size="small"
                        color="success"
                        sx={{ fontSize: '0.65rem', fontWeight: 'bold' }}
                      />
                    )}
                    {profesional.sello && (
                      <Chip
                        label="SELLADO"
                        size="small"
                        color="success"
                        sx={{ fontSize: '0.65rem', fontWeight: 'bold' }}
                      />
                    )}
                  </Box>
                </CardContent>
              </Card>
            </>
          )}
        </CardContent>
      </Card>

      {/* Botones de acción */}
      {/* <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 2 }}>
          <Typography
            variant="subtitle1"
            sx={{
              mb: 1.5,
              fontWeight: "bold",
              color: "#1A3C6D",
              fontSize: "0.9rem",
            }}
          >
            ACCIONES:
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            <ButtonGroup variant="outlined" size="small">
              <Tooltip title="Exportar a PDF">
                <Button
                  startIcon={<PDFIcon />}
                  onClick={exportarPDF}
                  sx={{ fontSize: '0.7rem' }}
                >
                  PDF
                </Button>
              </Tooltip>
              <Tooltip title="Exportar a Excel">
                <Button
                  startIcon={<ExcelIcon />}
                  onClick={exportarExcel}
                  sx={{ fontSize: '0.7rem' }}
                >
                  EXCEL
                </Button>
              </Tooltip>
              <Tooltip title="Imprimir">
                <Button
                  startIcon={<ImprimirIcon />}
                  onClick={imprimir}
                  sx={{ fontSize: '0.7rem' }}
                >
                  IMPRIMIR
                </Button>
              </Tooltip>
            </ButtonGroup>

            <ButtonGroup variant="contained" size="small">
              <Tooltip title="Guardar cambios">
                <Button
                  startIcon={<GuardarIcon />}
                  onClick={guardar}
                  color="success"
                  disabled={!nombreCompleto}
                  sx={{ fontSize: '0.7rem' }}
                >
                  GUARDAR
                </Button>
              </Tooltip>
              <Tooltip title="Nueva consulta">
                <Button
                  startIcon={<NuevaIcon />}
                  onClick={nuevaConsulta}
                  color="primary"
                  sx={{ fontSize: '0.7rem' }}
                >
                  NUEVA
                </Button>
              </Tooltip>
              <Tooltip title={modoEdicion ? "Cancelar edición" : "Editar datos"}>
                <Button
                  startIcon={<EditarIcon />}
                  onClick={editar}
                  color="warning"
                  sx={{ fontSize: '0.7rem' }}
                >
                  {modoEdicion ? 'CANCELAR' : 'EDITAR'}
                </Button>
              </Tooltip>
              <Tooltip title="Eliminar registro">
                <Button
                  startIcon={<EliminarIcon />}
                  onClick={eliminar}
                  color="error"
                  disabled={!nombreCompleto}
                  sx={{ fontSize: '0.7rem' }}
                >
                  ELIMINAR
                </Button>
              </Tooltip>
            </ButtonGroup>
          </Box>
        </CardContent>
      </Card> */}

   

      <Dialog open={dialogoGuardar} onClose={() => setDialogoGuardar(false)}>
        <DialogTitle sx={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
          Confirmar Guardado
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ fontSize: '0.8rem' }}>
            ¿Está seguro de guardar los datos del profesional responsable?
          </Typography>
          <Box sx={{ mt: 2, p: 1, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
            <Typography sx={{ fontSize: '0.75rem', fontWeight: 'bold' }}>
              {nombreCompleto}
            </Typography>
            <Typography sx={{ fontSize: '0.7rem', color: '#666' }}>
              {profesional.especialidad} - {profesional.numeroDocumento}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogoGuardar(false)} size="small">
            Cancelar
          </Button>
          <Button onClick={confirmarGuardar} variant="contained" color="success" size="small">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={dialogoEliminar} onClose={() => setDialogoEliminar(false)}>
        <DialogTitle sx={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#d32f2f' }}>
          Confirmar Eliminación
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ fontSize: '0.8rem' }}>
            ¿Está seguro de eliminar el registro del profesional responsable?
          </Typography>
          <Alert severity="warning" sx={{ mt: 2, fontSize: '0.75rem' }}>
            Esta acción no se puede deshacer.
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogoEliminar(false)} size="small">
            Cancelar
          </Button>
          <Button onClick={confirmarEliminar} variant="contained" color="error" size="small">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}