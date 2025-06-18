import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
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
import RegistroModal from "./RegistroModal";
import "./ConsultaExternaPage.css";
import ProcedimientosDataGrid from "./ProcedimientosDataGrid/ProcedimientosDataGrid";
import apiService from "../../../apiService";
import { AdmMedico } from "../../interface/models";

const CirugíaPreadmision: React.FC = () => {
  const [anestesiologoChecked, setAnestesiologoChecked] = useState(false);
  const [equipoCompletoChecked, setEquipoCompletoChecked] = useState(false);
  const [tipoHabitacion, setTipoHabitacion] = useState("");
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

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

  // Estados para el modal
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState<"paciente" | "medico" | null>(null);

  const handleOpenModal = (type: "paciente" | "medico") => {
    setModalType(type);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSaveModal = async (data: AdmMedico) => {
    if (modalType === "paciente") {
      // Validar campos obligatorios
      if (!data.Nombre || !data.Correo || !data.Telefono || !data.Direccion) {
        alert("Por favor, completa todos los campos obligatorios.");
        return;
      }

      try {
        const nuevoPaciente: AdmMedico = {
          Nombre: data.Nombre,
          Correo: data.Correo,
          Telefono: data.Telefono,
          Direccion: data.Direccion,
        };

        const response = await apiService.savePaciente(nuevoPaciente);
        console.log("Paciente creado:", response);

        // Actualiza los estados locales
        setPacienteNombre(data.Nombre);
        setPacienteTelefono(data.Telefono);
        setPacienteCorreo(data.Correo);
      } catch (error: any) {
        const message =
          error.message ||
          "Error al crear el paciente. Por favor, verifica los datos e intenta de nuevo.";
        console.error("Error al crear paciente:", error);
        alert(message);
      }
    } else if (modalType === "medico") {
      // Validar campos obligatorios
      if (!data.Nombre || !data.Correo || !data.Telefono || !data.Direccion || !data.Especialidad) {
        alert("Por favor, completa todos los campos obligatorios, incluyendo la especialidad.");
        return;
      }

      try {
        const nuevoMedico: AdmMedico = {
          Nombre: data.Nombre,
          Correo: data.Correo,
          Telefono: data.Telefono,
          Direccion: data.Direccion,
          Especialidad: data.Especialidad,
        };

        const response = await apiService.saveMedico(nuevoMedico);
        console.log("Médico creado:", response);

        // Actualiza los estados locales
        setMedicoNombre(data.Nombre);
        setMedicoTelefono(data.Telefono);
        setMedicoCorreo(data.Correo);
        setMedicoEspecialidad(data.Especialidad || "");
      } catch (error: any) {
        const message =
          error.message ||
          "Error al crear el médico. Por favor, verifica los datos e intenta de nuevo.";
        console.error("Error al crear médico:", error);
        alert(message);
      }
    }
    handleCloseModal();
  };

  return (
    <Box className="root-container">
      <Paper
        elevation={8}
        className="reservation-container"
        sx={{
          borderRadius: 4,
          bgcolor: "#FFFFFF",
          border: "3px solid #4A90E2",
          width: "100%",
          mx: "auto",
        }}
      >
        {/* Encabezado */}
        <Typography
          variant="h3"
          className="reservation-title"
          sx={{
            fontWeight: 800,
            fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2rem" },
            color: "#1A3C6D",
            textAlign: "left",
            mb: 4,
          }}
        >
          RESERVACION DE QUIROFANO
        </Typography>

        {/* Sección 1: Información General */}
        <SectionTitle
          title="Datos Generales de la Reserva"
          icon={<EventIcon sx={{ color: "#1A3C6D" }} />}
        />
        <Grid container spacing={3} className="reservation-grid">
          <Grid item xs={12} sm={6} md={3}>
            <Box display="flex" alignItems="center">
              <TextField
                fullWidth
                label="Número Reserva"
                variant="outlined"
                className="reservation-input"
                InputProps={{
                  startAdornment: (
                    <DescriptionIcon sx={{ color: "#4A90E2", mr: 1 }} />
                  ),
                }}
                sx={{
                  bgcolor: "#F7FAFF",
                  "& .MuiInputBase-root": { height: "40px" },
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Fecha de Agendamiento"
              type="date"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              className="reservation-input"
              InputProps={{
                startAdornment: <EventIcon sx={{ color: "#4A90E2", mr: 1 }} />,
              }}
              sx={{
                bgcolor: "#F7FAFF",
                "& .MuiInputBase-root": { height: "40px" },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Fecha de Cirugía"
              type="date"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              className="reservation-input"
              InputProps={{
                startAdornment: <EventIcon sx={{ color: "#4A90E2", mr: 1 }} />,
              }}
              sx={{
                bgcolor: "#F7FAFF",
                "& .MuiInputBase-root": { height: "40px" },
              }}
            />
          </Grid>
        </Grid>

        {/* Sección 2: Información del Paciente */}
        <SectionTitle
          title="Información del Paciente"
          icon={<PersonIcon sx={{ color: "#1A3C6D" }} />}
        />
        <Grid container spacing={3} className="reservation-grid">
          <Grid item xs={12} sm={6} md={3}>
            <Box display="flex" alignItems="center">
              <TextField
                fullWidth
                label="Nombre"
                variant="outlined"
                className="reservation-input"
                value={pacienteNombre}
                onChange={(e) => setPacienteNombre(e.target.value)}
                InputProps={{
                  startAdornment: <PersonIcon sx={{ color: "#4A90E2", mr: 1 }} />,
                }}
                sx={{
                  bgcolor: "#F7FAFF",
                  "& .MuiInputBase-root": { height: "40px" },
                }}
              />
              <IconButton
                color="primary"
                size="small"
                sx={{ ml: 1, height: "40px", width: "40px" }}
                onClick={() => handleOpenModal("paciente")}
              >
                <AddIcon />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Teléfono"
              variant="outlined"
              className="reservation-input"
              value={pacienteTelefono}
              onChange={(e) => setPacienteTelefono(e.target.value)}
              InputProps={{
                startAdornment: <PersonIcon sx={{ color: "#4A90E2", mr: 1 }} />,
              }}
              sx={{
                bgcolor: "#F7FAFF",
                "& .MuiInputBase-root": { height: "40px" },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Correo"
              variant="outlined"
              className="reservation-input"
              value={pacienteCorreo}
              onChange={(e) => setPacienteCorreo(e.target.value)}
              InputProps={{
                startAdornment: <PersonIcon sx={{ color: "#4A90E2", mr: 1 }} />,
              }}
              sx={{
                bgcolor: "#F7FAFF",
                "& .MuiInputBase-root": { height: "40px" },
              }}
            />
          </Grid>
        </Grid>

        {/* Sección 3: Médico Tratante */}
        <SectionTitle
          title="Médico Tratante"
          icon={<MedicalIcon sx={{ color: "#1A3C6D" }} />}
        />
        <Grid container spacing={3} className="reservation-grid">
          <Grid item xs={12} sm={6} md={3}>
            <Box display="flex" alignItems="center">
              <TextField
                fullWidth
                label="No. Identificación"
                variant="outlined"
                className="reservation-input"
                InputProps={{
                  startAdornment: (
                    <MedicalIcon sx={{ color: "#4A90E2", mr: 1 }} />
                  ),
                }}
                sx={{
                  bgcolor: "#F7FAFF",
                  "& .MuiInputBase-root": { height: "40px" },
                }}
              />
              <IconButton
                color="primary"
                size="small"
                sx={{ ml: 1, height: "40px", width: "40px" }}
                onClick={() => handleOpenModal("medico")}
              >
                <AddIcon />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Nombre"
              variant="outlined"
              className="reservation-input"
              value={medicoNombre}
              onChange={(e) => setMedicoNombre(e.target.value)}
              InputProps={{
                startAdornment: (
                  <MedicalIcon sx={{ color: "#4A90E2", mr: 1 }} />
                ),
              }}
              sx={{
                bgcolor: "#F7FAFF",
                "& .MuiInputBase-root": { height: "40px" },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Teléfono"
              variant="outlined"
              className="reservation-input"
              value={medicoTelefono}
              onChange={(e) => setMedicoTelefono(e.target.value)}
              InputProps={{
                startAdornment: (
                  <MedicalIcon sx={{ color: "#4A90E2", mr: 1 }} />
                ),
              }}
              sx={{
                bgcolor: "#F7FAFF",
                "& .MuiInputBase-root": { height: "40px" },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Correo"
              variant="outlined"
              className="reservation-input"
              value={medicoCorreo}
              onChange={(e) => setMedicoCorreo(e.target.value)}
              InputProps={{
                startAdornment: (
                  <MedicalIcon sx={{ color: "#4A90E2", mr: 1 }} />
                ),
              }}
              sx={{
                bgcolor: "#F7FAFF",
                "& .MuiInputBase-root": { height: "40px" },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Especialidad"
              variant="outlined"
              className="reservation-input"
              value={medicoEspecialidad}
              onChange={(e) => setMedicoEspecialidad(e.target.value)}
              InputProps={{
                startAdornment: (
                  <MedicalIcon sx={{ color: "#4A90E2", mr: 1 }} />
                ),
              }}
              sx={{
                bgcolor: "#F7FAFF",
                "& .MuiInputBase-root": { height: "40px" },
              }}
            />
          </Grid>
        </Grid>

        {/* Sección 4: Médico Anestesiólogo */}
        <SectionTitle
          title="Médico Anestesiólogo"
          icon={<MedicalIcon sx={{ color: "#1A3C6D" }} />}
        />
        <Grid container spacing={3} className="reservation-grid">
          <Grid item xs={12} sm={6} md={3}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={anestesiologoChecked}
                  onChange={(e) => setAnestesiologoChecked(e.target.checked)}
                  color="primary"
                />
              }
              label="Anestesiólogo de clínica"
              sx={{ "& .MuiTypography-root": { fontSize: "0.9rem" } }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={equipoCompletoChecked}
                  onChange={(e) => setEquipoCompletoChecked(e.target.checked)}
                  color="primary"
                />
              }
              label="Equipo completo"
              sx={{ "& .MuiTypography-root": { fontSize: "0.9rem" } }}
            />
          </Grid>
        </Grid>

        {/* Sección 5: Detalles de la Cirugía */}
        <SectionTitle
          title="Detalles de la Cirugía"
          icon={<DescriptionIcon sx={{ color: "#1A3C6D" }} />}
        />
        <Grid container spacing={3} className="reservation-grid">
          <Grid item xs={12} sm={8}>
            <ProcedimientosDataGrid />
            <TextField
              fullWidth
              label="Observaciones"
              multiline
              minRows={4}
              maxRows={10}
              variant="outlined"
              className="reservation-input observation-input"
              InputProps={{
                startAdornment: (
                  <DescriptionIcon sx={{ color: "#4A90E2", mr: 1 }} />
                ),
              }}
              sx={{
                bgcolor: "#F7FAFF",
                mt: 2,
                width: "100%",
                height: 200,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box display="flex" flexDirection="column" gap={3}>
              <TextField
                fullWidth
                label="Inicio de Cirugía"
                type="time"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                className="reservation-input"
                value={inicioCirugia}
                onChange={(e) => setInicioCirugia(e.target.value)}
                InputProps={{
                  startAdornment: <TimeIcon sx={{ color: "#4A90E2", mr: 1 }} />,
                }}
                sx={{
                  bgcolor: "#F7FAFF",
                  "& .MuiInputBase-root": { height: "40px" },
                }}
              />
              <TextField
                fullWidth
                label="Fin de Cirugía"
                type="time"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                className="reservation-input"
                value={finCirugia}
                onChange={(e) => setFinCirugia(e.target.value)}
                InputProps={{
                  startAdornment: <TimeIcon sx={{ color: "#4A90E2", mr: 1 }} />,
                }}
                sx={{
                  bgcolor: "#F7FAFF",
                  "& .MuiInputBase-root": { height: "40px" },
                }}
              />
              <TextField
                fullWidth
                label="Duración Estimada (horas)"
                type="number"
                variant="outlined"
                className="reservation-input"
                value={duracionEstimada}
                InputProps={{
                  startAdornment: <TimeIcon sx={{ color: "#4A90E2", mr: 1 }} />,
                  readOnly: true,
                }}
                sx={{
                  bgcolor: "#F7FAFF",
                  "& .MuiInputBase-root": { height: "40px" },
                }}
              />
              <FormControl fullWidth variant="outlined" className="reservation-input">
                <InputLabel sx={{ fontSize: "0.9rem" }}>Quirófano</InputLabel>
                <Select
                  label="Quirófano"
                  startAdornment={<RoomIcon sx={{ color: "#4A90E2", mr: 1 }} />}
                >
                  <MenuItem value="Q1">Quirófano 1</MenuItem>
                  <MenuItem value="Q2">Quirófano 2</MenuItem>
                  <MenuItem value="Q3">Quirófano 3</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth variant="outlined" className="reservation-input">
                <InputLabel sx={{ fontSize: "0.9rem" }}>Horario Disponible</InputLabel>
                <Select
                  label="Horario Disponible"
                  startAdornment={<ScheduleIcon sx={{ color: "#4A90E2", mr: 1 }} />}
                >
                  <MenuItem value="mañana">Mañana (08:00 - 12:00)</MenuItem>
                  <MenuItem value="tarde">Tarde (13:00 - 17:00)</MenuItem>
                  <MenuItem value="noche">Noche (18:00 - 22:00)</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth variant="outlined" className="reservation-input">
                <InputLabel sx={{ fontSize: "0.9rem" }}>Tipo Atención</InputLabel>
                <Select
                  label="Tipo Atención"
                  startAdornment={<MedicalIcon sx={{ color: "#4A90E2", mr: 1 }} />}
                >
                  <MenuItem value="hospitalario">Hospitalario</MenuItem>
                  <MenuItem value="ambulatorio">Ambulatorio</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth variant="outlined" className="reservation-input">
                <InputLabel sx={{ fontSize: "0.9rem" }}>Tipo de Habitación</InputLabel>
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
          </Grid>
        </Grid>

        {/* Botones de Acción */}
        <Box className="reservation-buttons">
          <Button
            variant="contained"
            size="large"
            startIcon={<ConfirmIcon />}
            sx={{
              px: 5,
              py: 1.5,
              borderRadius: 3,
              bgcolor: "#4A90E2",
              "&:hover": { bgcolor: "#3A78C2" },
              fontSize: "0.9rem",
            }}
          >
            Confirmar Reservación
          </Button>
          <Button
            variant="outlined"
            size="large"
            startIcon={<CancelIcon />}
            sx={{
              px: 5,
              py: 1.5,
              borderRadius: 3,
              borderColor: "#E57373",
              color: "#E57373",
              "&:hover": { borderColor: "#D32F2F", color: "#D32F2F" },
              fontSize: "0.9rem",
            }}
          >
            No Guardar
          </Button>
        </Box>
      </Paper>

      {/* Modal para Registro */}
      <RegistroModal
        open={openModal}
        type={modalType}
        onClose={handleCloseModal}
        onSave={handleSaveModal}
      />
    </Box>
  );
};

// Componente para el Título de Sección
interface SectionTitleProps {
  title: string;
  icon: React.ReactNode;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, icon }) => (
  <Box className="section-title-container">
    <Divider sx={{ mb: 3, borderColor: "#B6D7ED", borderWidth: 2 }} />
    <Box display="flex" alignItems="center" gap={2}>
      {icon}
      <Typography
        variant="h5"
        fontWeight={700}
        color="#1A3C6D"
        sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem" } }}
      >
        {title}
      </Typography>
    </Box>
  </Box>
);

export default CirugíaPreadmision;