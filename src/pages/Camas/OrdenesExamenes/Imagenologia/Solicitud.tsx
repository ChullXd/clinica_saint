import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  Button,
  Paper,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

// Mock data
const especialidades = [
  "Medicina General",
  "Cardiología",
  "Pediatría",
  "Traumatología",
  "Ginecología",
];

const diagnosticosC10 = [
  "A00 Cólera",
  "B01 Varicela",
  "C34 Neoplasia maligna de bronquios y pulmón",
  "E11 Diabetes mellitus tipo 2",
  "J18 Neumonía",
  "M79 Otros trastornos de los tejidos blandos",
  "R06 Anormalidades de la respiración",
];

const medicos = [
  { cedula: "0901234567", nombre: "Dr. Juan Pérez García" },
  { cedula: "0909876543", nombre: "Dra. María López Ruiz" },
  { cedula: "0912345678", nombre: "Dr. Carlos Mendoza Silva" },
];

const Solicitud = () => {
  // Estados para datos del paciente
  const [historiaClinica, setHistoriaClinica] = useState("");
  const [numeroArchivo, setNumeroArchivo] = useState("2024-001234");
  const [nombrePaciente, setNombrePaciente] = useState("");
  const [sexo, setSexo] = useState("");
  const [edad, setEdad] = useState("");

  // Estados para servicio y prioridad
  const [servicio, setServicio] = useState("");
  const [especialidad, setEspecialidad] = useState("Medicina General");
  const [cama, setCama] = useState("15");
  const [sala, setSala] = useState("Piso 2 - Medicina");
  const [prioridad, setPrioridad] = useState("");

  // Estados para estudios de imagenología
  const [estudios, setEstudios] = useState({
    rxConvencional: false,
    rxPortatil: false,
    tomografia: false,
    resonancia: false,
    ecografia: false,
    mamografia: false,
    procedimiento: false,
    otro: false,
  });
  const [sedacion, setSedacion] = useState("");
  const [descripcion, setDescripcion] = useState("");

  // Estados para motivo de solicitud
  const [fum, setFum] = useState(dayjs());
  const [pacienteContaminado, setPacienteContaminado] = useState("");
  const [lineasTexto, setLineasTexto] = useState("");

  // Estados para resumen clínico
  const [resumenClinico, setResumenClinico] = useState("");

  // Estados para diagnóstico
  const [diagnostico, setDiagnostico] = useState("");
  const [tipoDiagnostico, setTipoDiagnostico] = useState("");

  // Estados para profesional responsable
  const [fecha, setFecha] = useState(dayjs());
  const [hora, setHora] = useState(dayjs());
  const [cedulaMedico, setCedulaMedico] = useState("");
  const [nombreMedico, setNombreMedico] = useState("");

  // Estados para diálogos
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  // Buscar paciente
  const buscarPaciente = () => {
    if (historiaClinica === "12345") {
      setNombrePaciente("Juan Carlos Pérez García");
      setSexo("Masculino");
      setEdad("45 años");
    }
  };

  // Buscar médico
  const buscarMedico = () => {
    const medico = medicos.find((m) => m.cedula === cedulaMedico);
    if (medico) {
      setNombreMedico(medico.nombre);
    }
  };

  // Manejar cambios en estudios
  const handleEstudioChange = (estudio: string) => {
    setEstudios((prev) => ({
      ...prev,
      [estudio]: !prev[estudio],
    }));
  };

  // Guardar solicitud
  const handleGuardar = () => {
    setOpenConfirmDialog(true);
  };

  const confirmarGuardar = (enviarCentro: boolean) => {
    const mensaje = enviarCentro
      ? "Orden guardada y enviada al centro de imágenes"
      : "Orden guardada en la cama y cuenta del paciente";

    console.log("Solicitud guardada:", {
      historiaClinica,
      servicio,
      estudios,
      diagnostico,
      enviarCentro,
    });

    alert(mensaje);
    setOpenConfirmDialog(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper elevation={3} sx={{ p: 3, m: 2 }}>
        <Typography
          variant="h5"
          sx={{
            mb: 3,
            fontWeight: "bold",
            color: "#1A3C6D",
            textAlign: "center",
          }}
        >
          SOLICITUD DE IMAGENOLOGÍA
        </Typography>

        {/* Sección A: Datos del Paciente */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            A. DATOS DEL PACIENTE
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <TextField
              label="Historia Clínica"
              value={historiaClinica}
              onChange={(e) => setHistoriaClinica(e.target.value)}
              onBlur={buscarPaciente}
              size="small"
              sx={{ minWidth: 150 }}
            />
            <TextField
              label="Número de Archivo"
              value={numeroArchivo}
              disabled
              size="small"
              sx={{ minWidth: 150 }}
            />
            <TextField
              label="Nombre del Paciente"
              value={nombrePaciente}
              disabled
              size="small"
              sx={{ flex: 1 }}
            />
            <TextField
              label="Sexo"
              value={sexo}
              disabled
              size="small"
              sx={{ minWidth: 120 }}
            />
            <TextField
              label="Edad"
              value={edad}
              disabled
              size="small"
              sx={{ minWidth: 100 }}
            />
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Sección B: Servicio y Prioridad */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            B. SERVICIO Y PRIORIDAD DE ATENCIÓN
          </Typography>
          <Box sx={{ display: "flex", gap: 4, mb: 2 }}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Servicio</FormLabel>
              <RadioGroup
                value={servicio}
                onChange={(e) => setServicio(e.target.value)}
                row
              >
                <FormControlLabel
                  value="emergencia"
                  control={<Radio />}
                  label="Emergencia"
                />
                <FormControlLabel
                  value="consulta"
                  control={<Radio />}
                  label="Consulta Externa"
                />
                <FormControlLabel
                  value="hospitalizacion"
                  control={<Radio />}
                  label="Hospitalización"
                />
              </RadioGroup>
            </FormControl>
          </Box>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <TextField
              label="Especialidad"
              value={especialidad}
              disabled
              size="small"
              sx={{ flex: 1 }}
            />
            <TextField
              label="Cama"
              value={cama}
              disabled
              size="small"
              sx={{ minWidth: 100 }}
            />
            <TextField
              label="Sala"
              value={sala}
              disabled
              size="small"
              sx={{ flex: 1 }}
            />
          </Box>
          <FormControl component="fieldset">
            <FormLabel component="legend">Prioridad</FormLabel>
            <RadioGroup
              value={prioridad}
              onChange={(e) => setPrioridad(e.target.value)}
              row
            >
              <FormControlLabel
                value="urgente"
                control={<Radio />}
                label="Urgente"
              />
              <FormControlLabel
                value="rutina"
                control={<Radio />}
                label="Rutina"
              />
              <FormControlLabel
                value="control"
                control={<Radio />}
                label="Control"
              />
            </RadioGroup>
          </FormControl>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Sección C: Estudios de Imagenología */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            C. ESTUDIO DE IMAGENOLOGÍA SOLICITADO
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 1,
              mb: 2,
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={estudios.rxConvencional}
                  onChange={() => handleEstudioChange("rxConvencional")}
                />
              }
              label="Rx Convencional"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={estudios.rxPortatil}
                  onChange={() => handleEstudioChange("rxPortatil")}
                />
              }
              label="Rx Portátil"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={estudios.tomografia}
                  onChange={() => handleEstudioChange("tomografia")}
                />
              }
              label="Tomografía"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={estudios.resonancia}
                  onChange={() => handleEstudioChange("resonancia")}
                />
              }
              label="Resonancia"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={estudios.ecografia}
                  onChange={() => handleEstudioChange("ecografia")}
                />
              }
              label="Ecografía"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={estudios.mamografia}
                  onChange={() => handleEstudioChange("mamografia")}
                />
              }
              label="Mamografía"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={estudios.procedimiento}
                  onChange={() => handleEstudioChange("procedimiento")}
                />
              }
              label="Procedimiento"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={estudios.otro}
                  onChange={() => handleEstudioChange("otro")}
                />
              }
              label="Otro"
            />
          </Box>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Sedación</FormLabel>
              <RadioGroup
                value={sedacion}
                onChange={(e) => setSedacion(e.target.value)}
                row
              >
                <FormControlLabel value="si" control={<Radio />} label="Sí" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Box>
          <TextField
            label="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            multiline
            rows={3}
            fullWidth
            sx={{ mb: 2 }}
          />
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Sección D: Motivo de Solicitud */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            D. MOTIVO DE LA SOLICITUD
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <DatePicker
              label="FUM"
              value={fum}
              onChange={(newValue) => setFum(newValue)}
              slotProps={{ textField: { size: "small" } }}
            />
            <FormControl component="fieldset">
              <FormLabel component="legend">Paciente Contaminado</FormLabel>
              <RadioGroup
                value={pacienteContaminado}
                onChange={(e) => setPacienteContaminado(e.target.value)}
                row
              >
                <FormControlLabel value="si" control={<Radio />} label="Sí" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Box>
          <TextField
            label="Líneas de Texto"
            value={lineasTexto}
            onChange={(e) => setLineasTexto(e.target.value)}
            multiline
            rows={2}
            fullWidth
          />
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Sección E: Resumen Clínico */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            E. RESUMEN CLÍNICO ACTUAL
          </Typography>
          <TextField
            value={resumenClinico}
            onChange={(e) => setResumenClinico(e.target.value)}
            multiline
            rows={4}
            fullWidth
            placeholder="Escriba el resumen clínico..."
          />
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Sección F: Diagnóstico */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            F. DIAGNÓSTICO
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Diagnóstico CIE10</InputLabel>
              <Select
                value={diagnostico}
                label="Diagnóstico CIE10"
                onChange={(e) => setDiagnostico(e.target.value)}
              >
                {diagnosticosC10.map((diag) => (
                  <MenuItem key={diag} value={diag}>
                    {diag}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl component="fieldset">
              <FormLabel component="legend">Tipo</FormLabel>
              <RadioGroup
                value={tipoDiagnostico}
                onChange={(e) => setTipoDiagnostico(e.target.value)}
                row
              >
                <FormControlLabel
                  value="presuntivo"
                  control={<Radio />}
                  label="PRE (Presuntivo)"
                />
                <FormControlLabel
                  value="definitivo"
                  control={<Radio />}
                  label="DEF (Definitivo)"
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Sección G: Profesional Responsable */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            G. DATOS DEL PROFESIONAL RESPONSABLE
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <DatePicker
              label="Fecha"
              value={fecha}
              onChange={(newValue) => setFecha(newValue)}
              slotProps={{ textField: { size: "small" } }}
            />
            <TimePicker
              label="Hora"
              value={hora}
              onChange={(newValue) => setHora(newValue)}
              slotProps={{ textField: { size: "small" } }}
            />
            <TextField
              label="Cédula Médico"
              value={cedulaMedico}
              onChange={(e) => setCedulaMedico(e.target.value)}
              onBlur={buscarMedico}
              size="small"
              sx={{ minWidth: 150 }}
            />
            <TextField
              label="Nombre del Médico"
              value={nombreMedico}
              disabled
              size="small"
              sx={{ flex: 1 }}
            />
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Botones */}
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <Button variant="outlined" color="primary">
            Exportar PDF
          </Button>
          <Button variant="outlined" color="primary">
            Imprimir
          </Button>
          <Button variant="contained" color="primary" onClick={handleGuardar}>
            Guardar
          </Button>
          <Button variant="outlined" color="secondary">
            Editar
          </Button>
          <Button variant="outlined" color="error">
            Eliminar
          </Button>
        </Box>

        {/* Dialog de confirmación */}
        <Dialog
          open={openConfirmDialog}
          onClose={() => setOpenConfirmDialog(false)}
        >
          <DialogTitle>Confirmación</DialogTitle>
          <DialogContent>
            <Typography>
              ¿Está seguro de guardar y enviar orden al centro de imágenes?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => confirmarGuardar(false)}
              color="secondary"
              variant="outlined"
            >
              NO
            </Button>
            <Button
              onClick={() => confirmarGuardar(true)}
              color="primary"
              variant="contained"
            >
              SÍ
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </LocalizationProvider>
  );
};

export default Solicitud;
