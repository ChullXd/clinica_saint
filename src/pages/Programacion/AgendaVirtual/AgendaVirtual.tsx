import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Paper,
  Divider,
} from "@mui/material";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Search as SearchIcon, Event as EventIcon } from "@mui/icons-material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/es";

dayjs.locale("es");

const AgendaVirtual: React.FC = () => {
  const [tipo, setTipo] = useState("");
  const [quirufanoEspecialidad, setQuirufanoEspecialidad] = useState("");
  const [medico, setMedico] = useState("");
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs("2025-06-06"));
  const [vista, setVista] = useState<"dayGridDay" | "dayGridWeek" | "dayGridMonth" | "resourceTimelineDay" | "resourceTimelineWeek">("resourceTimelineWeek");
  const calendarRef = useRef<FullCalendar>(null);

  const quirufanos = ["TODOS", "Q1", "Q2", "Q3", "Q4"];
  const especialidades = ["TODOS", "Cardiología", "Neurología", "Ortopedia"];
  const medicos = ["TODOS", "Dr. Juan Pérez", "Dra. María Gómez", "Dr. Carlos López"];

  const eventos = [
    {
      id: "1",
      title: "Ocupado",
      start: "2025-06-06T09:00:00",
      end: "2025-06-06T10:00:00",
      resourceId: "Q1",
      color: "#D32F2F",
    },
    {
      id: "2",
      title: "Ocupado",
      start: "2025-06-06T14:00:00",
      end: "2025-06-06T15:30:00",
      resourceId: "Q2",
      color: "#D32F2F",
    },
  ];

  const handleExport = () => {
    console.log("Exportando a Excel o PDF (Anexo 7)...");
  };

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(selectedDate.toISOString());
    }
  }, [selectedDate]);

  return (
    <Box className="root-container" sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start", minHeight: "100vh" }}>
      <Paper
        elevation={8}
        className="reservation-container"
        sx={{ borderRadius: 4, bgcolor: "#FFFFFF", border: "3px solid #4A90E2", width: "90%", maxWidth: "1600px", mx: "auto", p: 4 }}
      >
        <Typography variant="h3" className="reservation-title" sx={{ fontWeight: 800, fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2rem" }, color: "#1A3C6D", textAlign: "left", mb: 4 }}>
          AGENDA VIRTUAL
        </Typography>
        <SectionTitle title="Filtros" icon={<EventIcon sx={{ color: "#1A3C6D" }} />} />
        <Grid container spacing={3} className="reservation-grid" sx={{ justifyContent: "flex-start" }}>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth variant="outlined" className="reservation-input">
              <InputLabel>Tipo</InputLabel>
              <Select value={tipo} onChange={(e) => setTipo(e.target.value)} label="Tipo" startAdornment={<SearchIcon sx={{ color: "#4A90E2", mr: 1 }} />}>
                <MenuItem value="Reserva Quirofano">Reserva Quirofano</MenuItem>
                <MenuItem value="Consulta Externa">Consulta Externa</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth variant="outlined" className="reservation-input">
              <InputLabel>{tipo === "Reserva Quirofano" ? "Quirófano" : "Especialidad"}</InputLabel>
              <Select
                value={quirufanoEspecialidad}
                onChange={(e) => setQuirufanoEspecialidad(e.target.value)}
                label={tipo === "Reserva Quirofano" ? "Quirófano" : "Especialidad"}
                startAdornment={<SearchIcon sx={{ color: "#4A90E2", mr: 1 }} />}
              >
                <MenuItem value="TODOS">TODOS</MenuItem>
                {tipo === "Reserva Quirofano" ? quirufanos.slice(1).map((q) => <MenuItem key={q} value={q}>{q}</MenuItem>) : especialidades.slice(1).map((e) => <MenuItem key={e} value={e}>{e}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth variant="outlined" className="reservation-input">
              <InputLabel>Médico</InputLabel>
              <Select
                value={medico}
                onChange={(e) => setMedico(e.target.value)}
                label="Médico"
                startAdornment={<SearchIcon sx={{ color: "#4A90E2", mr: 1 }} />}
              >
                {medicos.map((m) => <MenuItem key={m} value={m}>{m}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3} sx={{ display: "flex", alignItems: "center" }}>
            <Button variant="contained" onClick={handleExport} sx={{ bgcolor: "#4A90E2", "&:hover": { bgcolor: "#3A78C2" }, width: "100%" }}>
              Exportar
            </Button>
          </Grid>
        </Grid>
        <SectionTitle title="Agenda" icon={<EventIcon sx={{ color: "#1A3C6D" }} />} />
        <Box sx={{ bgcolor: "#E3F2FD", p: 2, borderRadius: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography sx={{ color: "#005A9C" }}>Hoy</Typography>
            <Typography sx={{ color: "#005A9C" }}>
              {selectedDate.format("D [de] MMMM - ") + (vista === "dayGridMonth" ? selectedDate.add(29, "day").format("D, YYYY") : vista === "resourceTimelineWeek" ? selectedDate.add(6, "day").format("D, YYYY") : selectedDate.format("D, YYYY"))}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              alignItems: "flex-start",
            }}
          >
            <Box sx={{ width: { xs: "100%", sm: "300px" }, flexShrink: 0 }}>
              <Typography variant="subtitle1" sx={{ color: "#1A3C6D", fontWeight: 600, mb: 1 }}>
                Selecciona un día
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                <DateCalendar
                  value={selectedDate}
                  onChange={(newValue: Dayjs) => setSelectedDate(newValue)}
                  sx={{ bgcolor: "#E3F2FD" }}
                />
              </LocalizationProvider>
              <FormControl fullWidth variant="outlined" className="reservation-input" sx={{ mt: 2 }}>
                <InputLabel>Vista</InputLabel>
                <Select value={vista} onChange={(e) => setVista(e.target.value as any)} label="Vista">
                  <MenuItem value="resourceTimelineDay">Día</MenuItem>
                  <MenuItem value="resourceTimelineWeek">Semana</MenuItem>
                  <MenuItem value="dayGridMonth">Mes</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, resourceTimelinePlugin, interactionPlugin]}
                initialView={vista}
                locale={esLocale}
                headerToolbar={{
                  left: "prev,next",
                  center: "title",
                  right: "resourceTimelineDay,resourceTimelineWeek,dayGridMonth",
                }}
                buttonText={{
                  day: "Día",
                  week: "Semana",
                  month: "Mes",
                }}
                editable={true}
                resources={quirufanos.slice(1).map((q) => ({ id: q, title: q }))}
                events={eventos}
                height="auto"
                resourceAreaWidth="200px"
                slotDuration="01:00:00"
                slotLabelInterval="01:00"
                now={dayjs().toISOString()}
                timeZone="America/Bogota"
              />
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

interface SectionTitleProps {
  title: string;
  icon: React.ReactNode;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, icon }) => (
  <Box className="section-title-container" sx={{ textAlign: "left" }}>
    <Divider sx={{ mb: 3, borderColor: "#B6D7ED", borderWidth: 2 }} />
    <Box display="flex" alignItems="center" gap={2}>
      {icon}
      <Typography variant="h5" fontWeight={700} color="#1A3C6D" sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem" } }}>
        {title}
      </Typography>
    </Box>
  </Box>
);

export default AgendaVirtual;