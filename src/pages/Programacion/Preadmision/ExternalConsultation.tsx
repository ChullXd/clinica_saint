import React, { useState } from "react";
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
} from "@mui/material";
import {
  Event as EventIcon,
  AccessTime as TimeIcon,
  Person as PersonIcon,
  MedicalServices as MedicalIcon,
  Description as DescriptionIcon,
  CheckCircle as ConfirmIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import "./ConsultaExternaPage.css";

const ExternalConsultation: React.FC = () => {
  const [noConsulta, setNoConsulta] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [noIdentificacion, setNoIdentificacion] = useState("");
  const [nombre, setNombre] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [medicoEspecialista, setMedicoEspecialista] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      noConsulta,
      fecha,
      hora,
      noIdentificacion,
      nombre,
      especialidad,
      medicoEspecialista,
    });
  };

  return (
    <Box className="root-container">
      <Paper
        elevation={8}
        className="reservation-container"
        sx={{
          borderRadius: 4,
          bgcolor: "#FFFFFF",
          border: "3px solid #4CAF50",
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
          RESERVACION DE CONSULTA EXTERNA
        </Typography>

        {/* Sección 1: Datos Generales */}
        <SectionTitle
          title="Datos Generales"
          icon={<EventIcon sx={{ color: "#1A3C6D" }} />}
        />
        <Grid container spacing={3} className="reservation-grid">
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="No. Consulta"
              value={noConsulta}
              onChange={(e) => setNoConsulta(e.target.value)}
              variant="outlined"
              className="reservation-input"
              InputProps={{
                startAdornment: <SearchIcon sx={{ color: "#4A90E2", mr: 1 }} />,
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
              label="Fecha"
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
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
              label="Hora"
              type="time"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              className="reservation-input"
              InputProps={{
                startAdornment: <TimeIcon sx={{ color: "#4A90E2", mr: 1 }} />,
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
            <TextField
              fullWidth
              label="No. Identificación"
              value={noIdentificacion}
              onChange={(e) => setNoIdentificacion(e.target.value)}
              variant="outlined"
              className="reservation-input"
              InputProps={{
                startAdornment: <SearchIcon sx={{ color: "#4A90E2", mr: 1 }} />,
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
              label="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              variant="outlined"
              className="reservation-input"
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

        {/* Sección 3: Información del Médico */}
        <SectionTitle
          title="Médico Tratante"
          icon={<MedicalIcon sx={{ color: "#1A3C6D" }} />}
        />
        <Grid container spacing={3} className="reservation-grid" sx={{ width: "100%" }}>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl
              fullWidth
              variant="outlined"
              className="reservation-input"
            >
              <InputLabel sx={{ fontSize: "0.9rem" }}>Especialidad</InputLabel>
              <Select
                value={especialidad}
                onChange={(e) => setEspecialidad(e.target.value)}
                label="Especialidad"
                startAdornment={<MedicalIcon sx={{ color: "#4A90E2", mr: 1 }} />}
              >
                <MenuItem value="Cirugía">Cirugía</MenuItem>
                <MenuItem value="Cardiología">Cardiología</MenuItem>
                <MenuItem value="Pediatría">Pediatría</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl
              fullWidth
              variant="outlined"
              className="reservation-input"
            >
              <InputLabel sx={{ fontSize: "0.9rem" }}>Médico Especialista</InputLabel>
              <Select
                value={medicoEspecialista}
                onChange={(e) => setMedicoEspecialista(e.target.value)}
                label="Médico Especialista"
                startAdornment={<MedicalIcon sx={{ color: "#4A90E2", mr: 1 }} />}
              >
                <MenuItem value="Dr. Juan Pérez">Dr. Juan Pérez</MenuItem>
                <MenuItem value="Dra. María Gómez">Dra. María Gómez</MenuItem>
                <MenuItem value="Dr. Carlos López">Dr. Carlos López</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Botones de Acción */}
        <Box className="reservation-buttons">
          <Button
            variant="contained"
            size="large"
            startIcon={<ConfirmIcon />}
            onClick={handleSubmit}
            sx={{
              px: 5,
              py: 1.5,
              borderRadius: 3,
              bgcolor: "#4A90E2",
              "&:hover": { bgcolor: "#3A78C2" },
              fontSize: "0.9rem",
            }}
          >
            Agendar
          </Button>
        </Box>
      </Paper>
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

export default ExternalConsultation;