import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Paper,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Alert,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  Save as SaveIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Print as PrintIcon,
  GetApp as ExportIcon,
  ExpandMore as ExpandMoreIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";

// Interfaces
interface DatosEstablecimiento {
  institucionSistema: string;
  unicodigo: string;
  establecimientoSalud: string;
  numeroHistoriaClinica: string;
  numeroArchivo: string;
  numeroHoja: number;
}

interface DatosPaciente {
  primerApellido: string;
  segundoApellido: string;
  primerNombre: string;
  segundoNombre: string;
  sexo: string;
  edad: string;
  condicionEdad: string;
}

interface Prescripcion {
  fluidos: string;
  medicacion: string;
  medidasGenerales: string;
  monitoreo: string;
  alimentacion: string;
  analitica: string;
}

interface EvolucionRegistro {
  id: number;
  fecha: string;
  hora: string;
  notasEvolucion: string;
  prescripcion: Prescripcion;
  medico: {
    nombre: string;
    especialidad: string;
    firma: string;
  };
}

export default function Evolucion() {
  // Estados
  const [datosEstablecimiento, setDatosEstablecimiento] =
    useState<DatosEstablecimiento>({
      institucionSistema: "RPC",
      unicodigo: "64876",
      establecimientoSalud: "RIVAMEDIC S. A.",
      numeroHistoriaClinica: "",
      numeroArchivo: "",
      numeroHoja: 1,
    });

  const [datosPaciente, setDatosPaciente] = useState<DatosPaciente>({
    primerApellido: "",
    segundoApellido: "",
    primerNombre: "",
    segundoNombre: "",
    sexo: "",
    edad: "",
    condicionEdad: "Años",
  });

  const [evolucionActual, setEvolucionActual] = useState<EvolucionRegistro>({
    id: 0,
    fecha: dayjs().format("DD/MM/YYYY"),
    hora: dayjs().format("HH:mm"),
    notasEvolucion: "",
    prescripcion: {
      fluidos: "",
      medicacion: "",
      medidasGenerales: "",
      monitoreo: "",
      alimentacion: "",
      analitica: "",
    },
    medico: {
      nombre: "Dr. Juan Pérez",
      especialidad: "Medicina Interna",
      firma: "Firma Digital",
    },
  });

  const [evoluciones, setEvoluciones] = useState<EvolucionRegistro[]>([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [evolucionEditando, setEvolucionEditando] = useState<number | null>(
    null
  );

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "warning" | "info",
  });

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [evolucionAEliminar, setEvolucionAEliminar] = useState<number | null>(
    null
  );

  // Condiciones de edad
  const condicionesEdad = ["Horas", "Días", "Meses", "Años"];

  // Función para cargar datos del paciente desde Emergencia 008
  const cargarDatosPaciente = () => {
    // Simular carga de datos desde Emergencia 008
    if (datosEstablecimiento.numeroHistoriaClinica) {
      setDatosPaciente({
        primerApellido: "ALCIVAR",
        segundoApellido: "VALERO",
        primerNombre: "GEOVANNY",
        segundoNombre: "ULICES",
        sexo: "M",
        edad: "50",
        condicionEdad: "Años",
      });
      setSnackbar({
        open: true,
        message: "DATOS DEL PACIENTE CARGADOS DESDE EMERGENCIA 008",
        severity: "success",
      });
    }
  };

  // Función para guardar evolución
  const guardarEvolucion = () => {
    if (!evolucionActual.notasEvolucion.trim()) {
      setSnackbar({
        open: true,
        message: "DEBE INGRESAR LAS NOTAS DE EVOLUCIÓN",
        severity: "error",
      });
      return;
    }

    if (evolucionEditando !== null) {
      // Actualizar evolución existente
      setEvoluciones(
        evoluciones.map((ev) =>
          ev.id === evolucionEditando
            ? { ...evolucionActual, id: evolucionEditando }
            : ev
        )
      );
      setModoEdicion(false);
      setEvolucionEditando(null);
    } else {
      // Crear nueva evolución
      const nuevaEvolucion = {
        ...evolucionActual,
        id: Date.now(),
      };
      setEvoluciones([...evoluciones, nuevaEvolucion]);
    }

    // Limpiar formulario
    setEvolucionActual({
      ...evolucionActual,
      id: 0,
      fecha: dayjs().format("DD/MM/YYYY"),
      hora: dayjs().format("HH:mm"),
      notasEvolucion: "",
      prescripcion: {
        fluidos: "",
        medicacion: "",
        medidasGenerales: "",
        monitoreo: "",
        alimentacion: "",
        analitica: "",
      },
    });

    setSnackbar({
      open: true,
      message: "EVOLUCIÓN GUARDADA EXITOSAMENTE",
      severity: "success",
    });
  };

  // Función para editar evolución
  const editarEvolucion = (id: number) => {
    const evolucion = evoluciones.find((ev) => ev.id === id);
    if (evolucion) {
      setEvolucionActual(evolucion);
      setModoEdicion(true);
      setEvolucionEditando(id);
    }
  };

  // Función para eliminar evolución
  const eliminarEvolucion = (id: number) => {
    setEvolucionAEliminar(id);
    setOpenDeleteDialog(true);
  };

  const confirmarEliminacion = () => {
    if (evolucionAEliminar !== null) {
      setEvoluciones(evoluciones.filter((ev) => ev.id !== evolucionAEliminar));
      setSnackbar({
        open: true,
        message: "EVOLUCIÓN ELIMINADA EXITOSAMENTE",
        severity: "success",
      });
    }
    setOpenDeleteDialog(false);
    setEvolucionAEliminar(null);
  };

  // Función para nueva evolución
  const nuevaEvolucion = () => {
    setEvolucionActual({
      id: 0,
      fecha: dayjs().format("DD/MM/YYYY"),
      hora: dayjs().format("HH:mm"),
      notasEvolucion: "",
      prescripcion: {
        fluidos: "",
        medicacion: "",
        medidasGenerales: "",
        monitoreo: "",
        alimentacion: "",
        analitica: "",
      },
      medico: {
        nombre: "Dr. Juan Pérez",
        especialidad: "Medicina Interna",
        firma: "Firma Digital",
      },
    });
    setModoEdicion(false);
    setEvolucionEditando(null);
  };

  // Función para exportar
  const exportarPDF = () => {
    setSnackbar({
      open: true,
      message: "EXPORTANDO EVOLUCIÓN A PDF...",
      severity: "info",
    });
  };

  // Función para imprimir
  const imprimir = () => {
    setSnackbar({
      open: true,
      message: "PREPARANDO IMPRESIÓN...",
      severity: "info",
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper elevation={3} sx={{ p: 2, m: 2 }}>
        <Typography
          variant="h5"
          sx={{
            mb: 2,
            fontWeight: "bold",
            color: "#1A3C6D",
            textAlign: "center",
          }}
        >
          EVOLUCIÓN Y PRESCRIPCIONES
        </Typography>

        {/* A. DATOS DEL ESTABLECIMIENTO */}
        <Card sx={{ mb: 2 }}>
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
              A. DATOS DEL ESTABLECIMIENTO
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: 1.5 }}>
              <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 24%" } }}>
                <TextField
                  label="INSTITUCIÓN DEL SISTEMA"
                  value={datosEstablecimiento.institucionSistema}
                  disabled
                  size="small"
                  fullWidth
                  InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                  InputProps={{ sx: { fontSize: "0.8rem" } }}
                />
              </Box>
              <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 16%" } }}>
                <TextField
                  label="UNICÓDIGO"
                  value={datosEstablecimiento.unicodigo}
                  disabled
                  size="small"
                  fullWidth
                  InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                  InputProps={{ sx: { fontSize: "0.8rem" } }}
                />
              </Box>
              <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 32%" } }}>
                <TextField
                  label="ESTABLECIMIENTO DE SALUD"
                  value={datosEstablecimiento.establecimientoSalud}
                  disabled
                  size="small"
                  fullWidth
                  InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                  InputProps={{ sx: { fontSize: "0.8rem" } }}
                />
              </Box>
              <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 16%" } }}>
                <TextField
                  label="No. HOJA"
                  value={datosEstablecimiento.numeroHoja}
                  onChange={(e) =>
                    setDatosEstablecimiento({
                      ...datosEstablecimiento,
                      numeroHoja: parseInt(e.target.value) || 1,
                    })
                  }
                  size="small"
                  fullWidth
                  type="number"
                  InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                  InputProps={{ sx: { fontSize: "0.8rem" } }}
                />
              </Box>
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
              <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 24%" } }}>
                <TextField
                  label="NÚMERO DE HISTORIA CLÍNICA"
                  value={datosEstablecimiento.numeroHistoriaClinica}
                  onChange={(e) =>
                    setDatosEstablecimiento({
                      ...datosEstablecimiento,
                      numeroHistoriaClinica: e.target.value,
                    })
                  }
                  size="small"
                  fullWidth
                  InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                  InputProps={{ sx: { fontSize: "0.8rem" } }}
                />
              </Box>
           
              <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 32%" } }}>
                <TextField
                  label="NÚMERO DE ARCHIVO"
                  value={datosEstablecimiento.numeroArchivo}
                  disabled
                  size="small"
                  fullWidth
                  InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                  InputProps={{ sx: { fontSize: "0.8rem" } }}
                />
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* DATOS DEL PACIENTE */}
        <Card sx={{ mb: 2 }}>
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
              DATOS DEL PACIENTE (DESDE EMERGENCIA 008)
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: 1.5 }}>
              <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 24%" } }}>
                <TextField
                  label="PRIMER APELLIDO"
                  value={datosPaciente.primerApellido}
                  disabled
                  size="small"
                  fullWidth
                  InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                  InputProps={{ sx: { fontSize: "0.8rem" } }}
                />
              </Box>
              <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 24%" } }}>
                <TextField
                  label="SEGUNDO APELLIDO"
                  value={datosPaciente.segundoApellido}
                  disabled
                  size="small"
                  fullWidth
                  InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                  InputProps={{ sx: { fontSize: "0.8rem" } }}
                />
              </Box>
              <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 24%" } }}>
                <TextField
                  label="PRIMER NOMBRE"
                  value={datosPaciente.primerNombre}
                  disabled
                  size="small"
                  fullWidth
                  InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                  InputProps={{ sx: { fontSize: "0.8rem" } }}
                />
              </Box>
              <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 24%" } }}>
                <TextField
                  label="SEGUNDO NOMBRE"
                  value={datosPaciente.segundoNombre}
                  disabled
                  size="small"
                  fullWidth
                  InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                  InputProps={{ sx: { fontSize: "0.8rem" } }}
                />
              </Box>
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
              <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 16%" } }}>
                <TextField
                  label="SEXO"
                  value={datosPaciente.sexo}
                  disabled
                  size="small"
                  fullWidth
                  InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                  InputProps={{ sx: { fontSize: "0.8rem" } }}
                />
              </Box>
              <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 16%" } }}>
                <TextField
                  label="EDAD"
                  value={datosPaciente.edad}
                  disabled
                  size="small"
                  fullWidth
                  InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                  InputProps={{ sx: { fontSize: "0.8rem" } }}
                />
              </Box>
              <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 20%" } }}>
                <FormControl fullWidth size="small">
                  <InputLabel sx={{ fontSize: "0.8rem" }}>
                    CONDICIÓN EDAD
                  </InputLabel>
                  <Select
                    value={datosPaciente.condicionEdad}
                    disabled
                    label="CONDICIÓN EDAD"
                    sx={{ fontSize: "0.8rem" }}
                  >
                    {condicionesEdad.map((condicion) => (
                      <MenuItem key={condicion} value={condicion}>
                        {condicion}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* B. EVOLUCIÓN Y PRESCRIPCIONES */}
        <Card sx={{ mb: 2 }}>
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
              B. EVOLUCIÓN Y PRESCRIPCIONES
            </Typography>

            {/* Fecha y Hora */}
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: 2 }}>
              <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 24%" } }}>
                <TextField
                  label="FECHA"
                  value={evolucionActual.fecha}
                  onChange={(e) =>
                    setEvolucionActual({
                      ...evolucionActual,
                      fecha: e.target.value,
                    })
                  }
                  size="small"
                  fullWidth
                  InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                  InputProps={{ sx: { fontSize: "0.8rem" } }}
                  helperText="DD/MM/YYYY"
                  FormHelperTextProps={{ sx: { fontSize: "0.7rem" } }}
                />
              </Box>
              <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 24%" } }}>
                <TextField
                  label="HORA"
                  value={evolucionActual.hora}
                  onChange={(e) =>
                    setEvolucionActual({
                      ...evolucionActual,
                      hora: e.target.value,
                    })
                  }
                  size="small"
                  fullWidth
                  InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                  InputProps={{ sx: { fontSize: "0.8rem" } }}
                  helperText="HH:MM"
                  FormHelperTextProps={{ sx: { fontSize: "0.7rem" } }}
                />
              </Box>
            </Box>

            {/* Notas de Evolución */}
            <Box sx={{ mb: 2 }}>
              <TextField
                label="NOTAS DE EVOLUCIÓN"
                value={evolucionActual.notasEvolucion}
                onChange={(e) =>
                  setEvolucionActual({
                    ...evolucionActual,
                    notasEvolucion: e.target.value,
                  })
                }
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                InputProps={{ sx: { fontSize: "0.8rem" } }}
              />
            </Box>

            {/* Prescripciones */}
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{ backgroundColor: "#f5f5f5" }}
              >
                <Typography sx={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                  PRESCRIPCIONES - FARMACOTERAPIA E INDICACIONES
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <TextField
                    label="FLUIDOS (TERAPÉUTICA)"
                    value={evolucionActual.prescripcion.fluidos}
                    onChange={(e) =>
                      setEvolucionActual({
                        ...evolucionActual,
                        prescripcion: {
                          ...evolucionActual.prescripcion,
                          fluidos: e.target.value,
                        },
                      })
                    }
                    multiline
                    rows={2}
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                    InputProps={{ sx: { fontSize: "0.8rem" } }}
                  />
                  <TextField
                    label="MEDICACIÓN (PRESCRIPCIÓN)"
                    value={evolucionActual.prescripcion.medicacion}
                    onChange={(e) =>
                      setEvolucionActual({
                        ...evolucionActual,
                        prescripcion: {
                          ...evolucionActual.prescripcion,
                          medicacion: e.target.value,
                        },
                      })
                    }
                    multiline
                    rows={2}
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                    InputProps={{ sx: { fontSize: "0.8rem" } }}
                  />
                  <TextField
                    label="MEDIDAS GENERALES (CUIDADOS)"
                    value={evolucionActual.prescripcion.medidasGenerales}
                    onChange={(e) =>
                      setEvolucionActual({
                        ...evolucionActual,
                        prescripcion: {
                          ...evolucionActual.prescripcion,
                          medidasGenerales: e.target.value,
                        },
                      })
                    }
                    multiline
                    rows={2}
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                    InputProps={{ sx: { fontSize: "0.8rem" } }}
                  />
                  <TextField
                    label="MONITOREO"
                    value={evolucionActual.prescripcion.monitoreo}
                    onChange={(e) =>
                      setEvolucionActual({
                        ...evolucionActual,
                        prescripcion: {
                          ...evolucionActual.prescripcion,
                          monitoreo: e.target.value,
                        },
                      })
                    }
                    multiline
                    rows={2}
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                    InputProps={{ sx: { fontSize: "0.8rem" } }}
                  />
                  <TextField
                    label="ALIMENTACIÓN (DIETA)"
                    value={evolucionActual.prescripcion.alimentacion}
                    onChange={(e) =>
                      setEvolucionActual({
                        ...evolucionActual,
                        prescripcion: {
                          ...evolucionActual.prescripcion,
                          alimentacion: e.target.value,
                        },
                      })
                    }
                    multiline
                    rows={2}
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                    InputProps={{ sx: { fontSize: "0.8rem" } }}
                  />
                  <TextField
                    label="ANALÍTICA (EXÁMENES)"
                    value={evolucionActual.prescripcion.analitica}
                    onChange={(e) =>
                      setEvolucionActual({
                        ...evolucionActual,
                        prescripcion: {
                          ...evolucionActual.prescripcion,
                          analitica: e.target.value,
                        },
                      })
                    }
                    multiline
                    rows={2}
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                    InputProps={{ sx: { fontSize: "0.8rem" } }}
                  />
                </Box>
              </AccordionDetails>
            </Accordion>

            {/* Datos del Médico */}
            <Box
              sx={{ mt: 2, p: 2, backgroundColor: "#f8f9fa", borderRadius: 1 }}
            >
              <Typography
                sx={{ fontWeight: "bold", fontSize: "0.9rem", mb: 1 }}
              >
                DATOS DEL MÉDICO RESPONSABLE:
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
                <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 40%" } }}>
                  <TextField
                    label="NOMBRE Y ESPECIALIDAD"
                    value={`${evolucionActual.medico.nombre} - ${evolucionActual.medico.especialidad}`}
                    disabled
                    size="small"
                    fullWidth
                    InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                    InputProps={{ sx: { fontSize: "0.8rem" } }}
                  />
                </Box>
                <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 32%" } }}>
                  <TextField
                    label="FIRMA"
                    value={evolucionActual.medico.firma}
                    disabled
                    size="small"
                    fullWidth
                    InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                    InputProps={{ sx: { fontSize: "0.8rem" } }}
                  />
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Botones de Acción */}
        <Box sx={{ display: "flex", gap: 1.5, mb: 2, flexWrap: "wrap" }}>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={guardarEvolucion}
            size="small"
            sx={{
              background: "#1A3C6D",
              "&:hover": { background: "#274472" },
              fontSize: "0.8rem",
            }}
          >
            GUARDAR
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={nuevaEvolucion}
            size="small"
            sx={{
              background: "#1A3C6D",
              "&:hover": { background: "#274472" },
              fontSize: "0.8rem",
            }}
          >
            NUEVO
          </Button>
          <Button
            variant="contained"
            startIcon={<ExportIcon />}
            onClick={exportarPDF}
            size="small"
            sx={{
              background: "#1A3C6D",
              "&:hover": { background: "#274472" },
              fontSize: "0.8rem",
            }}
          >
            EXPORTAR
          </Button>
          <Button
            variant="contained"
            startIcon={<PrintIcon />}
            onClick={imprimir}
            size="small"
            sx={{
              background: "#1A3C6D",
              "&:hover": { background: "#274472" },
              fontSize: "0.8rem",
            }}
          >
            IMPRIMIR
          </Button>
        </Box>

        {/* Historial de Evoluciones */}
        {evoluciones.length > 0 && (
          <Card sx={{ mb: 2 }}>
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
                HISTORIAL DE EVOLUCIONES
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{ fontWeight: "bold", fontSize: "0.8rem" }}
                      >
                        FECHA
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: "bold", fontSize: "0.8rem" }}
                      >
                        HORA
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: "bold", fontSize: "0.8rem" }}
                      >
                        EVOLUCIÓN
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: "bold", fontSize: "0.8rem" }}
                      >
                        MÉDICO
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: "bold", fontSize: "0.8rem" }}
                      >
                        ACCIONES
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {evoluciones.map((evolucion) => (
                      <TableRow key={evolucion.id}>
                        <TableCell sx={{ fontSize: "0.8rem" }}>
                          {evolucion.fecha}
                        </TableCell>
                        <TableCell sx={{ fontSize: "0.8rem" }}>
                          {evolucion.hora}
                        </TableCell>
                        <TableCell sx={{ fontSize: "0.8rem" }}>
                          {evolucion.notasEvolucion.substring(0, 50)}...
                        </TableCell>
                        <TableCell sx={{ fontSize: "0.8rem" }}>
                          {evolucion.medico.nombre}
                        </TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => editarEvolucion(evolucion.id)}
                            size="small"
                            color="primary"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => eliminarEvolucion(evolucion.id)}
                            size="small"
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        )}

        {/* Diálogo de confirmación de eliminación */}
        <Dialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>CONFIRMAR ELIMINACIÓN</DialogTitle>
          <DialogContent>
            <Typography>¿ESTÁ SEGURO DE ELIMINAR ESTA EVOLUCIÓN?</Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setOpenDeleteDialog(false)}
              color="secondary"
            >
              CANCELAR
            </Button>
            <Button
              onClick={confirmarEliminacion}
              color="error"
              variant="contained"
            >
              ELIMINAR
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar para notificaciones */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Paper>
    </LocalizationProvider>
  );
}
