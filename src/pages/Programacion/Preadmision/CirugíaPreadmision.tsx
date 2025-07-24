import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Paper,
  Divider,
  Checkbox,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import {
  Event as EventIcon,
  AccessTime as TimeIcon,
  Person as PersonIcon,
  MedicalServices as MedicalIcon,
  Description as DescriptionIcon,
  Room as RoomIcon,
  Schedule as ScheduleIcon,
  CheckCircle as ConfirmIcon,
  Cancel as CancelIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import "./ConsultaExternaPage.css";
import ProcedimientosDataGrid from "./ProcedimientosDataGrid/ProcedimientosDataGrid";
import { AdmMedico, AdmPaciente } from "../../interface/models";
import apiService from "../../../PrincipalApi/apiPaciente";
import { RegistroPaciente } from "./RegistroPaciente";
import { RegistroMedico } from "./RegistroMedico";

const CirugíaPreadmision: React.FC = () => {
  const [anestesiologoChecked, setAnestesiologoChecked] = useState(false);
  const [equipoCompletoChecked, setEquipoCompletoChecked] = useState(false);
  const [tipoHabitacion, setTipoHabitacion] = useState("");

  // Estados para las horas de inicio y fin
  const [inicioCirugia, setInicioCirugia] = useState("");
  const [finCirugia, setFinCirugia] = useState("");
  const [duracionEstimada, setDuracionEstimada] = useState("");

  // Estados para el paciente
  const [pacienteNombre, setPacienteNombre] = useState("");
  const [pacienteTelefono, setPacienteTelefono] = useState("");
  const [pacienteCorreo, setPacienteCorreo] = useState("");

  // Estados para el médico
  const [medicoNombre, setMedicoNombre] = useState("");
  const [medicoTelefono, setMedicoTelefono] = useState("");
  const [medicoCorreo, setMedicoCorreo] = useState("");
  const [medicoEspecialidad, setMedicoEspecialidad] = useState("");

  // Calcular duración
  useEffect(() => {
    if (inicioCirugia && finCirugia) {
      const start = new Date(`1970-01-01T${inicioCirugia}:00`);
      const end = new Date(`1970-01-01T${finCirugia}:00`);
      if (end > start) {
        const diffMs = end.getTime() - start.getTime();
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        setDuracionEstimada(diffHours.toString());
      } else {
        setDuracionEstimada("");
      }
    } else {
      setDuracionEstimada("");
    }
  }, [inicioCirugia, finCirugia]);

  // Estados para los modales separados
  const [openModalPaciente, setOpenModalPaciente] = useState(false);
  const [openModalMedico, setOpenModalMedico] = useState(false);

  // Handlers para abrir modales específicos
  const handleOpenModalPaciente = () => {
    setOpenModalPaciente(true);
  };

  const handleOpenModalMedico = () => {
    setOpenModalMedico(true);
  };

  // Handlers para cerrar modales
  const handleCloseModalPaciente = () => {
    setOpenModalPaciente(false);
  };

  const handleCloseModalMedico = () => {
    setOpenModalMedico(false);
  };

  // Handler para guardar paciente
  const handleSavePaciente = async (data: AdmPaciente) => {
    if (!data.Nombre || !data.Correo || !data.Telefono || !data.Direccion) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    try {
      const nuevoPaciente: AdmPaciente = {
        Nombre: data.Nombre,
        Correo: data.Correo,
        Telefono: data.Telefono,
        Direccion: data.Direccion,
        Identificacion: data.Identificacion,
        Edad: data.Edad,
        Sexo: data.Sexo,
        FechaNacimiento: data.FechaNacimiento,
        Apellido: data.Apellido,
        SegundoNombre: data.SegundoNombre,
        SegundoApellido: data.SegundoApellido,
      };

      const response = await apiService.savePaciente(nuevoPaciente);
      console.log("Paciente creado:", response);

      setPacienteNombre(data.Nombre);
      setPacienteTelefono(data.Telefono);
      setPacienteCorreo(data.Correo);

      handleCloseModalPaciente();
    } catch (error: any) {
      const message =
        error.message ||
        "Error al crear el paciente. Por favor, verifica los datos e intenta de nuevo.";
      console.error("Error al crear paciente:", error);
      alert(message);
    }
  };

  // Handler para guardar médico
  const handleSaveMedico = async (data: AdmMedico) => {
    if (
      !data.Nombre ||
      !data.Correo ||
      !data.Telefono ||
      !data.Direccion ||
      !data.Especialidad
    ) {
      alert(
        "Por favor, completa todos los campos obligatorios, incluyendo la especialidad."
      );
      return;
    }

    try {
      const nuevoMedico: AdmMedico = {
        Nombre: data.Nombre,
        Apellido: data.Apellido || "",
        Identificacion: data.Identificacion || "",
        FechaNacimiento: data.FechaNacimiento || "",
        Edad: data.Edad || "",
        Sexo: data.Sexo || "",
        Correo: data.Correo,
        Telefono: data.Telefono,
        Direccion: data.Direccion,
        Especialidad: data.Especialidad,
        SegundoNombre: data.SegundoNombre,
        SegundoApellido: data.SegundoApellido,
      };

      const response = await apiService.saveMedico(nuevoMedico);
      console.log("Médico creado:", response);

      setMedicoNombre(data.Nombre);
      setMedicoTelefono(data.Telefono);
      setMedicoCorreo(data.Correo);
      setMedicoEspecialidad(data.Especialidad || "");

      handleCloseModalMedico();
    } catch (error: any) {
      const message =
        error.message ||
        "Error al crear el médico. Por favor, verifica los datos e intenta de nuevo.";
      console.error("Error al crear médico:", error);
      alert(message);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper
        elevation={8}
        sx={{
          borderRadius: 4,
          bgcolor: "#FFFFFF",
          border: "3px solid #4A90E2",
          p: 3,
        }}
      >
        {/* Encabezado */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            color: "#1A3C6D",
            textAlign: "center",
            mb: 4,
          }}
        >
          RESERVACIÓN DE QUIRÓFANO
        </Typography>

        {/* Sección 1: Información General */}
        <SectionTitle
          title="Datos Generales de la Reserva"
          icon={<EventIcon sx={{ color: "#1A3C6D" }} />}
        />
        <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
          <TextField
            label="Número Reserva"
            variant="outlined"
            size="small"
            sx={{ flex: 1, minWidth: 200, bgcolor: "#F7FAFF" }}
            InputProps={{
              startAdornment: (
                <DescriptionIcon sx={{ color: "#4A90E2", mr: 1 }} />
              ),
            }}
          />
          <TextField
            label="Fecha de Agendamiento"
            type="date"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            size="small"
            sx={{ flex: 1, minWidth: 200, bgcolor: "#F7FAFF" }}
            InputProps={{
              startAdornment: <EventIcon sx={{ color: "#4A90E2", mr: 1 }} />,
            }}
          />
          <TextField
            label="Fecha de Cirugía"
            type="date"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            size="small"
            sx={{ flex: 1, minWidth: 200, bgcolor: "#F7FAFF" }}
            InputProps={{
              startAdornment: <EventIcon sx={{ color: "#4A90E2", mr: 1 }} />,
            }}
          />
        </Box>

        {/* Sección 2: Información del Paciente */}
        <SectionTitle
          title="Información del Paciente"
          icon={<PersonIcon sx={{ color: "#1A3C6D" }} />}
        />
        <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flex: 1,
              minWidth: 200,
            }}
          >
            <TextField
              label="Nombre"
              variant="outlined"
              size="small"
              fullWidth
              value={pacienteNombre}
              onChange={(e) => setPacienteNombre(e.target.value)}
              sx={{ bgcolor: "#F7FAFF" }}
              InputProps={{
                startAdornment: <PersonIcon sx={{ color: "#4A90E2", mr: 1 }} />,
              }}
            />
            <IconButton
              color="primary"
              size="small"
              sx={{ ml: 1 }}
              onClick={handleOpenModalPaciente}
            >
              <AddIcon />
            </IconButton>
          </Box>
          <TextField
            label="Teléfono"
            variant="outlined"
            size="small"
            sx={{ flex: 1, minWidth: 200, bgcolor: "#F7FAFF" }}
            value={pacienteTelefono}
            onChange={(e) => setPacienteTelefono(e.target.value)}
            InputProps={{
              startAdornment: <PersonIcon sx={{ color: "#4A90E2", mr: 1 }} />,
            }}
          />
          <TextField
            label="Correo"
            variant="outlined"
            size="small"
            sx={{ flex: 1, minWidth: 200, bgcolor: "#F7FAFF" }}
            value={pacienteCorreo}
            onChange={(e) => setPacienteCorreo(e.target.value)}
            InputProps={{
              startAdornment: <PersonIcon sx={{ color: "#4A90E2", mr: 1 }} />,
            }}
          />
        </Box>

        {/* Sección 3: Médico Tratante */}
        <SectionTitle
          title="Médico Tratante"
          icon={<MedicalIcon sx={{ color: "#1A3C6D" }} />}
        />
        <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flex: 1,
              minWidth: 200,
            }}
          >
            <TextField
              label="No. Identificación"
              variant="outlined"
              size="small"
              fullWidth
              sx={{ bgcolor: "#F7FAFF" }}
              InputProps={{
                startAdornment: (
                  <MedicalIcon sx={{ color: "#4A90E2", mr: 1 }} />
                ),
              }}
            />
            <IconButton
              color="primary"
              size="small"
              sx={{ ml: 1 }}
              onClick={handleOpenModalMedico}
            >
              <AddIcon />
            </IconButton>
          </Box>
          <TextField
            label="Nombre"
            variant="outlined"
            size="small"
            sx={{ flex: 1, minWidth: 200, bgcolor: "#F7FAFF" }}
            value={medicoNombre}
            onChange={(e) => setMedicoNombre(e.target.value)}
            InputProps={{
              startAdornment: <MedicalIcon sx={{ color: "#4A90E2", mr: 1 }} />,
            }}
          />
          <TextField
            label="Teléfono"
            variant="outlined"
            size="small"
            sx={{ flex: 1, minWidth: 200, bgcolor: "#F7FAFF" }}
            value={medicoTelefono}
            onChange={(e) => setMedicoTelefono(e.target.value)}
            InputProps={{
              startAdornment: <MedicalIcon sx={{ color: "#4A90E2", mr: 1 }} />,
            }}
          />
        </Box>
        <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
          <TextField
            label="Correo"
            variant="outlined"
            size="small"
            sx={{ flex: 1, minWidth: 200, bgcolor: "#F7FAFF" }}
            value={medicoCorreo}
            onChange={(e) => setMedicoCorreo(e.target.value)}
            InputProps={{
              startAdornment: <MedicalIcon sx={{ color: "#4A90E2", mr: 1 }} />,
            }}
          />
          <TextField
            label="Especialidad"
            variant="outlined"
            size="small"
            sx={{ flex: 1, minWidth: 200, bgcolor: "#F7FAFF" }}
            value={medicoEspecialidad}
            onChange={(e) => setMedicoEspecialidad(e.target.value)}
            InputProps={{
              startAdornment: <MedicalIcon sx={{ color: "#4A90E2", mr: 1 }} />,
            }}
          />
        </Box>

        {/* Sección 4: Médico Anestesiólogo */}
        <SectionTitle
          title="Médico Anestesiólogo"
          icon={<MedicalIcon sx={{ color: "#1A3C6D" }} />}
        />
        <Box sx={{ display: "flex", gap: 3, mb: 3 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={anestesiologoChecked}
                onChange={(e) => setAnestesiologoChecked(e.target.checked)}
                color="primary"
              />
            }
            label="Anestesiólogo de clínica"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={equipoCompletoChecked}
                onChange={(e) => setEquipoCompletoChecked(e.target.checked)}
                color="primary"
              />
            }
            label="Equipo completo"
          />
        </Box>

        {/* Sección 5: Detalles de la Cirugía */}
        <SectionTitle
          title="Detalles de la Cirugía"
          icon={<DescriptionIcon sx={{ color: "#1A3C6D" }} />}
        />
        <Box sx={{ display: "flex", gap: 3, mb: 3 }}>
          {/* Lado izquierdo - DataGrid y Observaciones */}
          <Box sx={{ flex: 2 }}>
            <ProcedimientosDataGrid />
            <TextField
              label="Observaciones"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              sx={{ bgcolor: "#F7FAFF", mt: 2 }}
              InputProps={{
                startAdornment: (
                  <DescriptionIcon sx={{ color: "#4A90E2", mr: 1 }} />
                ),
              }}
            />
          </Box>

          {/* Lado derecho - Controles de tiempo y configuración */}
          <Box
            sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Inicio de Cirugía"
              type="time"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              size="small"
              value={inicioCirugia}
              onChange={(e) => setInicioCirugia(e.target.value)}
              sx={{ bgcolor: "#F7FAFF" }}
              InputProps={{
                startAdornment: <TimeIcon sx={{ color: "#4A90E2", mr: 1 }} />,
              }}
            />
            <TextField
              label="Fin de Cirugía"
              type="time"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              size="small"
              value={finCirugia}
              onChange={(e) => setFinCirugia(e.target.value)}
              sx={{ bgcolor: "#F7FAFF" }}
              InputProps={{
                startAdornment: <TimeIcon sx={{ color: "#4A90E2", mr: 1 }} />,
              }}
            />
            <TextField
              label="Duración Estimada (horas)"
              type="number"
              variant="outlined"
              size="small"
              value={duracionEstimada}
              sx={{ bgcolor: "#F7FAFF" }}
              InputProps={{
                startAdornment: <TimeIcon sx={{ color: "#4A90E2", mr: 1 }} />,
                readOnly: true,
              }}
            />
            <FormControl size="small" variant="outlined">
              <InputLabel>Quirófano</InputLabel>
              <Select
                label="Quirófano"
                startAdornment={<RoomIcon sx={{ color: "#4A90E2", mr: 1 }} />}
              >
                <MenuItem value="Q1">Quirófano 1</MenuItem>
                <MenuItem value="Q2">Quirófano 2</MenuItem>
                <MenuItem value="Q3">Quirófano 3</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" variant="outlined">
              <InputLabel>Horario Disponible</InputLabel>
              <Select
                label="Horario Disponible"
                startAdornment={
                  <ScheduleIcon sx={{ color: "#4A90E2", mr: 1 }} />
                }
              >
                <MenuItem value="mañana">Mañana (08:00 - 12:00)</MenuItem>
                <MenuItem value="tarde">Tarde (13:00 - 17:00)</MenuItem>
                <MenuItem value="noche">Noche (18:00 - 22:00)</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" variant="outlined">
              <InputLabel>Tipo Atención</InputLabel>
              <Select
                label="Tipo Atención"
                startAdornment={
                  <MedicalIcon sx={{ color: "#4A90E2", mr: 1 }} />
                }
              >
                <MenuItem value="hospitalario">Hospitalario</MenuItem>
                <MenuItem value="ambulatorio">Ambulatorio</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" variant="outlined">
              <InputLabel>Tipo de Habitación</InputLabel>
              <Select
                label="Tipo de Habitación"
                startAdornment={<RoomIcon sx={{ color: "#4A90E2", mr: 1 }} />}
                value={tipoHabitacion}
                onChange={(e) => setTipoHabitacion(e.target.value)}
              >
                <MenuItem value="Privada">Privada</MenuItem>
                <MenuItem value="Individual">Individual</MenuItem>
                <MenuItem value="Compartida">Compartida</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* Botones de Acción */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 3, mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<ConfirmIcon />}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 3,
              bgcolor: "#4A90E2",
              "&:hover": { bgcolor: "#3A78C2" },
            }}
          >
            Confirmar Reservación
          </Button>
          <Button
            variant="outlined"
            size="large"
            startIcon={<CancelIcon />}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 3,
              borderColor: "#E57373",
              color: "#E57373",
              "&:hover": { borderColor: "#D32F2F", color: "#D32F2F" },
            }}
          >
            No Guardar
          </Button>
        </Box>
      </Paper>

      {/* Modal para Registro de Paciente */}
      <RegistroPaciente
        open={openModalPaciente}
        onClose={handleCloseModalPaciente}
        onSave={handleSavePaciente} type={null}      />

      {/* Modal para Registro de Médico */}
      <RegistroMedico
        open={openModalMedico}
        onClose={handleCloseModalMedico}
        onSave={handleSaveMedico} type={null}      />
    </Box>
  );
};

// Componente para el Título de Sección
interface SectionTitleProps {
  title: string;
  icon: React.ReactNode;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, icon }) => (
  <Box sx={{ mb: 2 }}>
    <Divider sx={{ mb: 2, borderColor: "#B6D7ED", borderWidth: 2 }} />
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      {icon}
      <Typography variant="h6" fontWeight={700} color="#1A3C6D">
        {title}
      </Typography>
    </Box>
  </Box>
);

export default CirugíaPreadmision;
