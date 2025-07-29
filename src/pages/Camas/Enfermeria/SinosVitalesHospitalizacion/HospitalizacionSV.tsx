import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
  Card,
  CardContent,
  Divider,
  Chip,
} from "@mui/material";
import {
  Add as AddIcon,
  Save as SaveIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  GetApp as ExportIcon,
  DeleteOutline as DeleteRowIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";

// Interfaces
interface SignosVitalesRow {
  id: number;
  fecha: string;
  hora: string;
  presionArterial: string;
  frecuenciaCardiaca: string;
  frecuenciaRespiratoria: string;
  temperatura: string;
  spo2: string;
  pulso: string;
  responsable: string;
}

interface DatosPaciente {
  numeroHistoria: string;
  numeroArchivo: string;
  nombrePaciente: string;
  sexo: string;
  edad: string;
  tipoPaciente: string;
  numeroCama: string;
}

export default function HospitalizacionSV() {
  // Estados
  const [datosPaciente, setDatosPaciente] = useState<DatosPaciente>({
    numeroHistoria: "",
    numeroArchivo: "",
    nombrePaciente: "",
    sexo: "",
    edad: "",
    tipoPaciente: "",
    numeroCama: "",
  });

  const [signosVitales, setSignosVitales] = useState<SignosVitalesRow[]>([
    {
      id: 1,
      fecha: dayjs().format("DD/MM/YYYY"),
      hora: dayjs().format("HH:mm"),
      presionArterial: "",
      frecuenciaCardiaca: "",
      frecuenciaRespiratoria: "",
      temperatura: "",
      spo2: "",
      pulso: "",
      responsable: "Usuario Actual",
    },
  ]);

  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "warning" | "info",
  });
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [motivoEliminacion, setMotivoEliminacion] = useState("");

  // Función para buscar paciente
  const buscarPaciente = () => {
    if (datosPaciente.numeroHistoria === "9952") {
      setDatosPaciente({
        ...datosPaciente,
        numeroArchivo: "2024-SV-001234",
        nombrePaciente: "ALCIVAR VALERO GEOVANNY ULICES",
        sexo: "MASCULINO",
        edad: "50 AÑOS",
        tipoPaciente: "SEGURO",
        numeroCama: "101",
      });
    }
  };

  // Función para determinar el color según la hora
  const getColorByHour = (hora: string) => {
    const horaNum = parseInt(hora.split(":")[0]);
    // Azul de 07:00 a 18:59, rojo de 19:00 a 06:59
    return horaNum >= 7 && horaNum <= 18 ? "#1976d2" : "#d32f2f";
  };

  // Función para agregar nueva línea
  const agregarNuevaLinea = () => {
    const nuevaLinea: SignosVitalesRow = {
      id: signosVitales.length + 1,
      fecha: dayjs().format("DD/MM/YYYY"),
      hora: dayjs().format("HH:mm"),
      presionArterial: "",
      frecuenciaCardiaca: "",
      frecuenciaRespiratoria: "",
      temperatura: "",
      spo2: "",
      pulso: "",
      responsable: "Usuario Actual",
    };
    setSignosVitales([...signosVitales, nuevaLinea]);
  };

  // Función para eliminar línea
  const eliminarLinea = (id: number) => {
    setSignosVitales(signosVitales.filter((row) => row.id !== id));
  };

  // Función para actualizar celda
  const actualizarCelda = (
    id: number,
    campo: keyof SignosVitalesRow,
    valor: string
  ) => {
    setSignosVitales(
      signosVitales.map((row) =>
        row.id === id ? { ...row, [campo]: valor } : row
      )
    );
  };

  // Funciones de botones
  const handleGuardar = () => {
    setSnackbar({
      open: true,
      message: "SIGNOS VITALES GUARDADOS EXITOSAMENTE",
      severity: "success",
    });
  };

  const handleEditar = () => {
    setEditingRow(editingRow ? null : 1);
    setSnackbar({
      open: true,
      message: editingRow
        ? "MODO EDICIÓN DESACTIVADO"
        : "MODO EDICIÓN ACTIVADO",
      severity: "info",
    });
  };

  const handleEliminar = () => {
    setOpenDeleteDialog(true);
  };

  const confirmarEliminacion = () => {
    if (motivoEliminacion.trim()) {
      setSnackbar({
        open: true,
        message: "REGISTRO ELIMINADO CORRECTAMENTE",
        severity: "success",
      });
      setOpenDeleteDialog(false);
      setMotivoEliminacion("");
    }
  };

  const handleExportar = () => {
    setSnackbar({
      open: true,
      message: "EXPORTANDO INFORME PDF...",
      severity: "info",
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper elevation={3} sx={{ p: 3, m: 2 }}>
        <Typography
          variant="h5"
          sx={{ mb: 3, fontWeight: "bold", color: "#1A3C6D" }}
        >
          SIGNOS VITALES - HOSPITALIZACIÓN
        </Typography>

        {/* Datos del Paciente */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              DATOS DEL PACIENTE
            </Typography>
            <Box sx={{ mb: 2 }}>
              {/* Primera fila */}
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
                <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 16.66%" } }}>
                  <TextField
                    label="H.C."
                    value={datosPaciente.numeroHistoria}
                    onChange={(e) =>
                      setDatosPaciente({
                        ...datosPaciente,
                        numeroHistoria: e.target.value,
                      })
                    }
                    size="small"
                    fullWidth
                    helperText="Cédula/Pasaporte/Carnet"
                  />
                </Box>
              
                <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 33.33%" } }}>
                  <TextField
                    label="NOMBRE DEL PACIENTE"
                    value={datosPaciente.nombrePaciente}
                    disabled
                    size="small"
                    fullWidth
                  />
                </Box>
                <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 16.66%" } }}>
                  <TextField
                    label="ARCHIVO"
                    value={datosPaciente.numeroArchivo}
                    disabled
                    size="small"
                    fullWidth
                  />
                </Box>
                <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 16.66%" } }}>
                  <TextField
                    label="No. CAMA"
                    value={datosPaciente.numeroCama}
                    disabled
                    size="small"
                    fullWidth
                  />
                </Box>
              </Box>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box>
              {/* Segunda fila */}
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 25%" } }}>
                  <TextField
                    label="SEXO"
                    value={datosPaciente.sexo}
                    disabled
                    size="small"
                    fullWidth
                  />
                </Box>
                <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 25%" } }}>
                  <TextField
                    label="EDAD"
                    value={datosPaciente.edad}
                    disabled
                    size="small"
                    fullWidth
                  />
                </Box>
                <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 25%" } }}>
                  <TextField
                    label="TIPO DE PACIENTE"
                    value={datosPaciente.tipoPaciente}
                    disabled
                    size="small"
                    fullWidth
                  />
                </Box>
                <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 25%" } }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      ESTADO:
                    </Typography>
                    <Chip
                      label={
                        datosPaciente.numeroCama
                          ? "HOSPITALIZADO"
                          : "SIN ASIGNAR"
                      }
                      color={datosPaciente.numeroCama ? "success" : "warning"}
                      size="small"
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Grid de Signos Vitales */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                REGISTRO DE SIGNOS VITALES
              </Typography>
              <Button
                variant="contained"
                onClick={agregarNuevaLinea}
                startIcon={<AddIcon />}
                sx={{
                  background: "#1A3C6D",
                  "&:hover": { background: "#274472" },
                }}
              >
                AGREGAR NUEVA LÍNEA
              </Button>
            </Box>

            <TableContainer sx={{ maxHeight: 400 }}>
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        backgroundColor: "#1A3C6D",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      FECHA
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#1A3C6D",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      HORA
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#1A3C6D",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      P/A (mmHg)
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#1A3C6D",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      FC (x min)
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#1A3C6D",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      FR (x min)
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#1A3C6D",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      TEMP (°C)
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#1A3C6D",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      SPO2 (%)
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#1A3C6D",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      PULSO (x min)
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#1A3C6D",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      RESPONSABLE
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#1A3C6D",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      ACCIONES
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {signosVitales.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{
                        backgroundColor: row.hora
                          ? getColorByHour(row.hora) === "#1976d2"
                            ? "#e3f2fd"
                            : "#ffebee"
                          : "white",
                        "&:hover": { backgroundColor: "#f5f5f5" },
                      }}
                    >
                      <TableCell sx={{ padding: "4px" }}>
                        <TextField
                          value={row.fecha}
                          onChange={(e) =>
                            actualizarCelda(row.id, "fecha", e.target.value)
                          }
                          size="small"
                          fullWidth
                          variant="outlined"
                          placeholder="DD/MM/YYYY"
                          inputProps={{
                            style: {
                              fontSize: "12px",
                              color: row.hora
                                ? getColorByHour(row.hora)
                                : "black",
                              fontWeight: "bold",
                            },
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ padding: "4px" }}>
                        <TextField
                          value={row.hora}
                          onChange={(e) =>
                            actualizarCelda(row.id, "hora", e.target.value)
                          }
                          size="small"
                          fullWidth
                          variant="outlined"
                          placeholder="HH:MM"
                          inputProps={{
                            style: {
                              fontSize: "12px",
                              color: row.hora
                                ? getColorByHour(row.hora)
                                : "black",
                              fontWeight: "bold",
                            },
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ padding: "4px" }}>
                        <TextField
                          value={row.presionArterial}
                          onChange={(e) =>
                            actualizarCelda(
                              row.id,
                              "presionArterial",
                              e.target.value
                            )
                          }
                          size="small"
                          fullWidth
                          variant="outlined"
                          placeholder="120/80"
                          inputProps={{ style: { fontSize: "12px" } }}
                        />
                      </TableCell>
                      <TableCell sx={{ padding: "4px" }}>
                        <TextField
                          value={row.frecuenciaCardiaca}
                          onChange={(e) =>
                            actualizarCelda(
                              row.id,
                              "frecuenciaCardiaca",
                              e.target.value
                            )
                          }
                          size="small"
                          fullWidth
                          variant="outlined"
                          placeholder="80"
                          inputProps={{ style: { fontSize: "12px" } }}
                        />
                      </TableCell>
                      <TableCell sx={{ padding: "4px" }}>
                        <TextField
                          value={row.frecuenciaRespiratoria}
                          onChange={(e) =>
                            actualizarCelda(
                              row.id,
                              "frecuenciaRespiratoria",
                              e.target.value
                            )
                          }
                          size="small"
                          fullWidth
                          variant="outlined"
                          placeholder="20"
                          inputProps={{ style: { fontSize: "12px" } }}
                        />
                      </TableCell>
                      <TableCell sx={{ padding: "4px" }}>
                        <TextField
                          value={row.temperatura}
                          onChange={(e) =>
                            actualizarCelda(
                              row.id,
                              "temperatura",
                              e.target.value
                            )
                          }
                          size="small"
                          fullWidth
                          variant="outlined"
                          placeholder="36.5"
                          inputProps={{ style: { fontSize: "12px" } }}
                        />
                      </TableCell>
                      <TableCell sx={{ padding: "4px" }}>
                        <TextField
                          value={row.spo2}
                          onChange={(e) =>
                            actualizarCelda(row.id, "spo2", e.target.value)
                          }
                          size="small"
                          fullWidth
                          variant="outlined"
                          placeholder="98"
                          inputProps={{ style: { fontSize: "12px" } }}
                        />
                      </TableCell>
                      <TableCell sx={{ padding: "4px" }}>
                        <TextField
                          value={row.pulso}
                          onChange={(e) =>
                            actualizarCelda(row.id, "pulso", e.target.value)
                          }
                          size="small"
                          fullWidth
                          variant="outlined"
                          placeholder="80"
                          inputProps={{ style: { fontSize: "12px" } }}
                        />
                      </TableCell>
                      <TableCell sx={{ padding: "4px" }}>
                        <TextField
                          value={row.responsable}
                          disabled
                          size="small"
                          fullWidth
                          variant="outlined"
                          inputProps={{ style: { fontSize: "12px" } }}
                        />
                      </TableCell>
                      <TableCell sx={{ padding: "4px" }}>
                        <IconButton
                          onClick={() => eliminarLinea(row.id)}
                          color="error"
                          size="small"
                        >
                          <DeleteRowIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Leyenda de colores */}
            <Box
              sx={{ mt: 2, display: "flex", gap: 2, justifyContent: "center" }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    backgroundColor: "#e3f2fd",
                    border: "1px solid #1976d2",
                  }}
                />
                <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                  TURNO DÍA (07:00 - 18:59)
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    backgroundColor: "#ffebee",
                    border: "1px solid #d32f2f",
                  }}
                />
                <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                  TURNO NOCHE (19:00 - 06:59)
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Botones de Acción */}
        <Box sx={{ display: "flex", gap: 2, mt: 3, flexWrap: "wrap" }}>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleGuardar}
            sx={{ background: "#1A3C6D", "&:hover": { background: "#274472" } }}
          >
            GUARDAR
          </Button>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={handleEditar}
            sx={{
              background: editingRow ? "#ff9800" : "#1A3C6D",
              "&:hover": { background: editingRow ? "#f57c00" : "#274472" },
            }}
          >
            {editingRow ? "FINALIZAR EDICIÓN" : "EDITAR"}
          </Button>
          <Button
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={handleEliminar}
            sx={{ background: "#1A3C6D", "&:hover": { background: "#274472" } }}
          >
            ELIMINAR
          </Button>
          <Button
            variant="contained"
            startIcon={<ExportIcon />}
            onClick={handleExportar}
            sx={{ background: "#1A3C6D", "&:hover": { background: "#274472" } }}
          >
            EXPORTAR INFORME
          </Button>
        </Box>

        {/* Diálogo de confirmación de eliminación */}
        <Dialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>CONFIRMAR ELIMINACIÓN</DialogTitle>
          <DialogContent>
            <Typography sx={{ mb: 2 }}>
              ¿ESTÁ SEGURO DE ELIMINAR ESTE REGISTRO DE SIGNOS VITALES?
            </Typography>
            <TextField
              label="MOTIVO DE LA ELIMINACIÓN"
              value={motivoEliminacion}
              onChange={(e) => setMotivoEliminacion(e.target.value)}
              multiline
              rows={3}
              fullWidth
              required
            />
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
              disabled={!motivoEliminacion.trim()}
            >
              ELIMINAR
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar para notificaciones */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
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
