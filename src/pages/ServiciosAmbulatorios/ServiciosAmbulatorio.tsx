import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  InputAdornment,
  IconButton,
  Tabs,
  Tab,
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
  Snackbar,
  Alert,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

// Mock data para combos (reemplazar por datos de BD)
const sexos = ["Femenino", "Masculino", "Otro"];

const medicosResidentes = [
  { id: 1, nombre: "Dr. Juan Pérez García", especialidad: "Cardiología" },
  { id: 2, nombre: "Dra. Ana María Ruiz", especialidad: "Pediatría" },
  { id: 3, nombre: "Dr. Luis Fernando Gómez", especialidad: "Traumatología" },
  { id: 4, nombre: "Dra. Carmen Elena López", especialidad: "Ginecología" },
  {
    id: 5,
    nombre: "Dr. Roberto Carlos Mendoza",
    especialidad: "Medicina General",
  },
];

const procedimientos = [
  { id: 1, codigo: "PROC001", descripcion: "Consulta médica general" },
  { id: 2, codigo: "PROC002", descripcion: "Curación simple" },
  { id: 3, codigo: "PROC003", descripcion: "Sutura menor" },
  { id: 4, codigo: "PROC004", descripcion: "Electrocardiograma" },
  { id: 5, codigo: "PROC005", descripcion: "Toma de signos vitales" },
];

const serviciosTarifario = [
  { id: 1, codigo: "SERV001", descripcion: "Hemograma completo", precio: 25.5 },
  { id: 2, codigo: "SERV002", descripcion: "Rayos X de tórax", precio: 45.0 },
  {
    id: 3,
    codigo: "SERV003",
    descripcion: "Ecografía abdominal",
    precio: 80.0,
  },
  { id: 4, codigo: "SERV004", descripcion: "Electrocardiograma", precio: 35.0 },
  {
    id: 5,
    codigo: "SERV005",
    descripcion: "Consulta especializada",
    precio: 60.0,
  },
];

const diagnosticosC10 = [
  { codigo: "A00", descripcion: "Cólera" },
  { codigo: "B01", descripcion: "Varicela" },
  { codigo: "C34", descripcion: "Neoplasia maligna de bronquios y pulmón" },
  { codigo: "E11", descripcion: "Diabetes mellitus tipo 2" },
  { codigo: "J18", descripcion: "Neumonía" },
  { codigo: "K35", descripcion: "Apendicitis aguda" },
  { codigo: "M79", descripcion: "Otros trastornos de los tejidos blandos" },
  { codigo: "R06", descripcion: "Anormalidades de la respiración" },
];

const insumosDisponibles = [
  {
    id: 1,
    codigo: "INS001",
    descripcion: "Jeringa desechable 5ml",
    precio: 0.75,
  },
  { id: 2, codigo: "INS002", descripcion: "Gasa estéril 10x10", precio: 1.2 },
  {
    id: 3,
    codigo: "INS003",
    descripcion: "Suero fisiológico 500ml",
    precio: 3.5,
  },
  { id: 4, codigo: "INS004", descripcion: "Alcohol antiséptico", precio: 2.8 },
  { id: 5, codigo: "INS005", descripcion: "Vendaje elástico", precio: 4.25 },
];

// Data quemada para insumos seleccionados
const insumosQuemados = [
  {
    id: 1,
    codigo: "INS001",
    descripcion: "Jeringa desechable 5ml",
    precio: 0.75,
    cantidad: 2,
    subtotal: 1.5,
  },
  {
    id: 2,
    codigo: "INS002",
    descripcion: "Gasa estéril 10x10",
    precio: 1.2,
    cantidad: 5,
    subtotal: 6.0,
  },
  {
    id: 3,
    codigo: "INS004",
    descripcion: "Alcohol antiséptico",
    precio: 2.8,
    cantidad: 1,
    subtotal: 2.8,
  },
];

// Data quemada para servicios seleccionados
const serviciosQuemados = [
  {
    id: 1,
    codigo: "SERV001",
    descripcion: "Hemograma completo",
    precio: 25.5,
    cantidad: 1,
    subtotal: 25.5,
  },
  {
    id: 2,
    codigo: "SERV004",
    descripcion: "Electrocardiograma",
    precio: 35.0,
    cantidad: 1,
    subtotal: 35.0,
  },
  {
    id: 3,
    codigo: "SERV003",
    descripcion: "Ecografía abdominal",
    precio: 80.0,
    cantidad: 1,
    subtotal: 80.0,
  },
];

const ServiciosAmbulatorio = () => {
  // Estados para datos del paciente
  const [cedula, setCedula] = useState("");
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [sexo, setSexo] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [direccion, setDireccion] = useState("");
  const [pacienteExiste, setPacienteExiste] = useState(false);

  // Estados para datos médicos
  const [medico, setMedico] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [procedimiento, setProcedimiento] = useState("");
  const [servicio, setServicio] = useState("");
  const [diagnostico, setDiagnostico] = useState("");
  const [observacion, setObservacion] = useState("");

  // Estados para pestañas
  const [tabValue, setTabValue] = useState(0);

  // Estados para insumos y servicios seleccionados (usando data quemada)
  const [insumosSeleccionados, setInsumosSeleccionados] =
    useState(insumosQuemados);
  const [serviciosSeleccionados, setServiciosSeleccionados] =
    useState(serviciosQuemados);

  // Estados para diálogos
  const [openInsumoDialog, setOpenInsumoDialog] = useState(false);
  const [openServicioDialog, setOpenServicioDialog] = useState(false);

  // Estados para notificaciones
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Simular búsqueda de paciente por cédula
  const handleBuscarCedula = () => {
    if (cedula === "0901234567") {
      setNombre("Juan Carlos Pérez García");
      setTelefono("0999123456");
      setSexo("Masculino");
      setFechaNacimiento("1985-03-15");
      setDireccion("Av. 9 de Octubre 123, Guayaquil");
      setPacienteExiste(true);
    } else if (cedula === "0912345678") {
      setNombre("María Elena López Ruiz");
      setTelefono("0987654321");
      setSexo("Femenino");
      setFechaNacimiento("1990-07-22");
      setDireccion("Cdla. Los Ceibos Mz. 45 Villa 12");
      setPacienteExiste(true);
    } else {
      setNombre("");
      setTelefono("");
      setSexo("");
      setFechaNacimiento("");
      setDireccion("");
      setPacienteExiste(false);
    }
  };

  // Cuando seleccionan médico, se llena especialidad automáticamente
  const handleMedicoChange = (e) => {
    const medicoSeleccionado = e.target.value;
    setMedico(medicoSeleccionado);
    const medicoObj = medicosResidentes.find(
      (m) => m.nombre === medicoSeleccionado
    );
    setEspecialidad(medicoObj ? medicoObj.especialidad : "");
  };

  // Cambiar pestaña
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Agregar insumo seleccionado
  const handleAgregarInsumo = (insumo) => {
    const insumoConCantidad = {
      ...insumo,
      cantidad: 1,
      subtotal: insumo.precio,
    };
    setInsumosSeleccionados([...insumosSeleccionados, insumoConCantidad]);
    setOpenInsumoDialog(false);
    setSnackbar({
      open: true,
      message: "Insumo agregado correctamente",
      severity: "success",
    });
  };

  // Agregar servicio seleccionado
  const handleAgregarServicio = (servicio) => {
    const servicioConCantidad = {
      ...servicio,
      cantidad: 1,
      subtotal: servicio.precio,
    };
    setServiciosSeleccionados([...serviciosSeleccionados, servicioConCantidad]);
    setOpenServicioDialog(false);
    setSnackbar({
      open: true,
      message: "Servicio agregado correctamente",
      severity: "success",
    });
  };

  // Eliminar insumo
  const handleEliminarInsumo = (index) => {
    const nuevosInsumos = insumosSeleccionados.filter((_, i) => i !== index);
    setInsumosSeleccionados(nuevosInsumos);
    setSnackbar({
      open: true,
      message: "Insumo eliminado correctamente",
      severity: "warning",
    });
  };

  // Eliminar servicio
  const handleEliminarServicio = (index) => {
    const nuevosServicios = serviciosSeleccionados.filter(
      (_, i) => i !== index
    );
    setServiciosSeleccionados(nuevosServicios);
    setSnackbar({
      open: true,
      message: "Servicio eliminado correctamente",
      severity: "warning",
    });
  };

  // Actualizar cantidad y subtotal
  const handleCantidadChange = (index, nuevaCantidad, tipo) => {
    if (tipo === "insumo") {
      const nuevosInsumos = [...insumosSeleccionados];
      nuevosInsumos[index].cantidad = parseInt(nuevaCantidad) || 0;
      nuevosInsumos[index].subtotal =
        nuevosInsumos[index].cantidad * nuevosInsumos[index].precio;
      setInsumosSeleccionados(nuevosInsumos);
    } else {
      const nuevosServicios = [...serviciosSeleccionados];
      nuevosServicios[index].cantidad = parseInt(nuevaCantidad) || 0;
      nuevosServicios[index].subtotal =
        nuevosServicios[index].cantidad * nuevosServicios[index].precio;
      setServiciosSeleccionados(nuevosServicios);
    }
  };

  // Registrar datos
  const handleRegistrar = () => {
    setSnackbar({
      open: true,
      message: "¡Servicio ambulatorio registrado exitosamente!",
      severity: "success",
    });
  };

  // Cerrar sin guardar
  const handleCerrar = () => {
    if (window.confirm("¿Está seguro de salir sin guardar los datos?")) {
      // Limpiar todos los campos
      setCedula("");
      setNombre("");
      setTelefono("");
      setSexo("");
      setFechaNacimiento("");
      setDireccion("");
      setMedico("");
      setEspecialidad("");
      setProcedimiento("");
      setServicio("");
      setDiagnostico("");
      setObservacion("");
      setInsumosSeleccionados([]);
      setServiciosSeleccionados([]);
      setPacienteExiste(false);
    }
  };

  // Cerrar snackbar
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Props estándar para inputs
  const textFieldProps = {
    size: "small",
    fullWidth: true,
    InputProps: { style: { fontSize: 15, height: 40 } },
    InputLabelProps: { style: { fontSize: 15 } },
  };

  const selectProps = {
    size: "small",
    fullWidth: true,
    sx: { fontSize: 15, height: 40, minHeight: 40 },
    MenuProps: { PaperProps: { style: { fontSize: 15 } } },
  };

  return (
    <Box sx={{ p: 2 }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography
          variant="h5"
          sx={{
            mb: 3,
            fontWeight: "bold",
            color: "#1A3C6D",
            textAlign: "center",
          }}
        >
          SERVICIOS AMBULATORIOS
        </Typography>

        {/* Datos del Paciente */}
        <Typography
          variant="h6"
          sx={{ mb: 2, color: "#1A3C6D", fontWeight: "bold" }}
        >
          Datos del Paciente
        </Typography>

        {/* Línea 1: Identificación, Nombre, Teléfono */}
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <TextField
            label="No. Identificación"
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
            size="small"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleBuscarCedula}
                    color="primary"
                    size="small"
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            disabled={pacienteExiste}
            size="small"
            fullWidth
          />
          <TextField
            label="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            disabled={pacienteExiste}
            size="small"
            fullWidth
          />
        </Box>

        {/* Línea 2: Sexo, Fecha Nacimiento, Dirección */}
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <FormControl size="small" fullWidth disabled={pacienteExiste}>
            <InputLabel>Sexo</InputLabel>
            <Select
              value={sexo}
              onChange={(e) => setSexo(e.target.value)}
              label="Sexo"
            >
              {sexos.map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Fecha Nacimiento"
            type="date"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
            disabled={pacienteExiste}
            size="small"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Dirección"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            disabled={pacienteExiste}
            size="small"
            fullWidth
          />
        </Box>

        {/* Datos Médicos */}
        <Typography
          variant="h6"
          sx={{ mb: 2, color: "#1A3C6D", fontWeight: "bold" }}
        >
          Datos de Atención
        </Typography>

        {/* Línea 3: Médico, Especialidad, Procedimiento */}
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <FormControl size="small" fullWidth>
            <InputLabel>Médico Tratante</InputLabel>
            <Select
              value={medico}
              onChange={handleMedicoChange}
              label="Médico Tratante"
            >
              {medicosResidentes.map((m) => (
                <MenuItem key={m.id} value={m.nombre}>
                  {m.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small" fullWidth>
            <InputLabel>Especialidad</InputLabel>
            <Select value={especialidad} disabled label="Especialidad">
              {especialidad && (
                <MenuItem value={especialidad}>{especialidad}</MenuItem>
              )}
            </Select>
          </FormControl>
          <FormControl size="small" fullWidth>
            <InputLabel>Procedimiento</InputLabel>
            <Select
              value={procedimiento}
              onChange={(e) => setProcedimiento(e.target.value)}
              label="Procedimiento"
            >
              {procedimientos.map((p) => (
                <MenuItem key={p.id} value={p.codigo}>
                  {p.codigo} - {p.descripcion}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Línea 4: Servicio, Diagnóstico */}
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <FormControl size="small" fullWidth>
            <InputLabel>Servicio</InputLabel>
            <Select
              value={servicio}
              onChange={(e) => setServicio(e.target.value)}
              label="Servicio"
            >
              {serviciosTarifario.map((s) => (
                <MenuItem key={s.id} value={s.codigo}>
                  {s.codigo} - {s.descripcion}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small" fullWidth>
            <InputLabel>Diagnóstico C10</InputLabel>
            <Select
              value={diagnostico}
              onChange={(e) => setDiagnostico(e.target.value)}
              label="Diagnóstico C10"
            >
              {diagnosticosC10.map((d) => (
                <MenuItem key={d.codigo} value={d.codigo}>
                  {d.codigo} - {d.descripcion}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Observación */}
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Observación"
            value={observacion}
            onChange={(e) => setObservacion(e.target.value)}
            size="small"
            fullWidth
            multiline
            rows={2}
          />
        </Box>

        {/* Pestañas para Insumos y Servicios */}
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 1 }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="INSUMOS" />
            <Tab label="SERVICIOS" />
          </Tabs>
        </Box>

        {/* Contenido de pestañas */}
        {tabValue === 0 && (
          <Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography variant="subtitle1" fontWeight="bold">
                Insumos Seleccionados
              </Typography>
              <Button
                variant="contained"
                size="small"
                startIcon={<AddIcon />}
                onClick={() => setOpenInsumoDialog(true)}
              >
                Agregar
              </Button>
            </Box>

            <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#e3eaf6" }}>
                    <TableCell sx={{ fontWeight: "bold" }}>Código</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Descripción
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>P. Unit.</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Cant.</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Subtotal</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Acción</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {insumosSeleccionados.map((insumo, index) => (
                    <TableRow key={index} hover>
                      <TableCell>{insumo.codigo}</TableCell>
                      <TableCell>{insumo.descripcion}</TableCell>
                      <TableCell>${insumo.precio.toFixed(2)}</TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          value={insumo.cantidad}
                          onChange={(e) =>
                            handleCantidadChange(
                              index,
                              e.target.value,
                              "insumo"
                            )
                          }
                          size="small"
                          sx={{ width: 60 }}
                        />
                      </TableCell>
                      <TableCell>${insumo.subtotal.toFixed(2)}</TableCell>
                      <TableCell>
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() => handleEliminarInsumo(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {tabValue === 1 && (
          <Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography variant="subtitle1" fontWeight="bold">
                Servicios Seleccionados
              </Typography>
              <Button
                variant="contained"
                size="small"
                startIcon={<AddIcon />}
                onClick={() => setOpenServicioDialog(true)}
              >
                Agregar
              </Button>
            </Box>

            <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#e3eaf6" }}>
                    <TableCell sx={{ fontWeight: "bold" }}>Código</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Descripción
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>P. Unit.</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Cant.</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Subtotal</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Acción</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {serviciosSeleccionados.map((servicio, index) => (
                    <TableRow key={index} hover>
                      <TableCell>{servicio.codigo}</TableCell>
                      <TableCell>{servicio.descripcion}</TableCell>
                      <TableCell>${servicio.precio.toFixed(2)}</TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          value={servicio.cantidad}
                          onChange={(e) =>
                            handleCantidadChange(
                              index,
                              e.target.value,
                              "servicio"
                            )
                          }
                          size="small"
                          sx={{ width: 60 }}
                        />
                      </TableCell>
                      <TableCell>${servicio.subtotal.toFixed(2)}</TableCell>
                      <TableCell>
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() => handleEliminarServicio(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {/* Botones finales */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
          <Button
            variant="contained"
            onClick={handleRegistrar}
            sx={{ minWidth: 120 }}
          >
            REGISTRAR
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCerrar}
            sx={{ minWidth: 120 }}
          >
            CERRAR
          </Button>
        </Box>
      </Paper>

      {/* Dialog para seleccionar insumos */}
      <Dialog
        open={openInsumoDialog}
        onClose={() => setOpenInsumoDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Seleccionar Insumo</DialogTitle>
        <DialogContent>
          <TableContainer sx={{ maxHeight: 400 }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#e3eaf6" }}>
                  <TableCell sx={{ fontWeight: "bold" }}>Código</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Descripción</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Precio</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Acción</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {insumosDisponibles.map((insumo) => (
                  <TableRow key={insumo.id} hover>
                    <TableCell>{insumo.codigo}</TableCell>
                    <TableCell>{insumo.descripcion}</TableCell>
                    <TableCell>${insumo.precio.toFixed(2)}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleAgregarInsumo(insumo)}
                      >
                        Agregar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenInsumoDialog(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog para seleccionar servicios */}
      <Dialog
        open={openServicioDialog}
        onClose={() => setOpenServicioDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Seleccionar Servicio</DialogTitle>
        <DialogContent>
          <TableContainer sx={{ maxHeight: 400 }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#e3eaf6" }}>
                  <TableCell sx={{ fontWeight: "bold" }}>Código</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Descripción</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Precio</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Acción</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {serviciosTarifario.map((servicio) => (
                  <TableRow key={servicio.id} hover>
                    <TableCell>{servicio.codigo}</TableCell>
                    <TableCell>{servicio.descripcion}</TableCell>
                    <TableCell>${servicio.precio.toFixed(2)}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleAgregarServicio(servicio)}
                      >
                        Agregar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenServicioDialog(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ServiciosAmbulatorio;
