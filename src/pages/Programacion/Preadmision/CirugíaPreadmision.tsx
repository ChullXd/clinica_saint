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
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
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
  Search as SearchIcon,
} from "@mui/icons-material";
import "./ConsultaExternaPage.css";

const CirugíaPreadmision: React.FC = () => {
  const [anestesiologoChecked, setAnestesiologoChecked] = useState(false);
  const [equipoCompletoChecked, setEquipoCompletoChecked] = useState(false);
  const [tipoHabitacion, setTipoHabitacion] = useState("");
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  // Estado para el DataGrid
  const [columns, setColumns] = useState<GridColDef[]>([
    {
      field: "codProcedimiento",
      headerName: "Cod. Procedimiento",
      width: 200,
      editable: true,
    },
    {
      field: "detalleProcedimiento",
      headerName: "Detalle de Procedimiento",
      width: 300,
      editable: true,
    },
  ]);
  const [rows, setRows] = useState([
    {
      id: 1,
      codProcedimiento: "",
      detalleProcedimiento: "Extracción de apéndice",
    },
    {
      id: 2,
      codProcedimiento: "",
      detalleProcedimiento: "Reparación de hernia",
    },
  ]);

  const handleAddRow = () => {
    const newRow = {
      id: Date.now(),
      codProcedimiento: "",
      detalleProcedimiento: "",
    };
    setRows([...rows, newRow]);
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
            <TextField
              fullWidth
              label="Número Reserva"
              variant="outlined"
              className="reservation-input"
              InputProps={{
                startAdornment: (
                  <DescriptionIcon sx={{ color: "#4A90E2", mr: 1 }} />
                ),
                endAdornment: <SearchIcon sx={{ color: "#4A90E2" }} />,
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
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Hora de Cirugía"
              type="time"
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
              variant="outlined"
              className="reservation-input"
              InputProps={{
                startAdornment: <PersonIcon sx={{ color: "#4A90E2", mr: 1 }} />,
                endAdornment: <SearchIcon sx={{ color: "#4A90E2" }} />,
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
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Teléfono"
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
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Correo"
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

        {/* Sección 3: Médico Tratante */}
        <SectionTitle
          title="Médico Tratante"
          icon={<MedicalIcon sx={{ color: "#1A3C6D" }} />}
        />
        <Grid container spacing={3} className="reservation-grid">
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="No. Identificación"
              variant="outlined"
              className="reservation-input"
              InputProps={{
                startAdornment: (
                  <MedicalIcon sx={{ color: "#4A90E2", mr: 1 }} />
                ),
                endAdornment: <SearchIcon sx={{ color: "#4A90E2" }} />,
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
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Teléfono"
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
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Correo"
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
            <Button
              variant="contained"
              onClick={handleAddRow}
              sx={{
                mb: 2,
                bgcolor: "#4A90E2",
                "&:hover": { bgcolor: "#3A78C2" },
              }}
            >
              Agregar Procedimiento
            </Button>
            <Box sx={{ width: "100%", height: 400 }}>
              <DataGrid
                rows={rows}
                columns={columns}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[5, 10, 20]}
                sx={{
                  bgcolor: "#F7FAFF",
                  borderRadius: 2,
                  width: "100%",
                  boxSizing: "border-box",
                }}
              />
            </Box>
            <TextField
              fullWidth
              label="Observaciones"
              multiline
              minRows={4} /* Reducido de 8 a 4 */
              maxRows={10} /* Reducido de 20 a 10 */
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
              }} /* Altura reducida a 200px */
            />
          </Grid>
           <Grid item xs={12} sm={4}>
            <Box display="flex" flexDirection="column" gap={3}>
              <TextField
                fullWidth
                label="Duración Estimada (horas)"
                type="number"
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
              <FormControl
                fullWidth
                variant="outlined"
                className="reservation-input"
              >
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
              <FormControl
                fullWidth
                variant="outlined"
                className="reservation-input"
              >
                <InputLabel sx={{ fontSize: "0.9rem" }}>
                  Horario Disponible
                </InputLabel>
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
              <FormControl
                fullWidth
                variant="outlined"
                className="reservation-input"
              >
                <InputLabel sx={{ fontSize: "0.9rem" }}>
                  Tipo Atención
                </InputLabel>
                <Select
                  label="Tipo Atención"
                  startAdornment={
                    <MedicalIcon sx={{ color: "#4A90E2", mr: 1 }} />
                  }
                >
                  <MenuItem value="mañana">Hospitalario</MenuItem>
                  <MenuItem value="tarde">Ambulatorio</MenuItem>
                </Select>
              </FormControl>
              <FormControl
                fullWidth
                variant="outlined"
                className="reservation-input"
              >
                <InputLabel sx={{ fontSize: "0.9rem" }}>
                  Tipo de Habitación
                </InputLabel>
                <Select
                  label="Tipo de Habitación"
                  // value={tipoHabitacion}
                  // onChange={(e) => setTipoHabitacion(e.target.value as string)}
                  startAdornment={<RoomIcon sx={{ color: "#4A90E2", mr: 1 }} />}
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
