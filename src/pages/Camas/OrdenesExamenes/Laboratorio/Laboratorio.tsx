import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Paper,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import {
  Search as SearchIcon,
  Print as PrintIcon,
  GetApp as ExportIcon,
  Save as SaveIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

interface ExamenItem {
  id: number;
  codigo: string;
  descripcion: string;
  comentario?: string;
  seleccionado: boolean;
}

const Laboratorio = () => {
  // Estados para datos del establecimiento
  const [numeroHistoria, setNumeroHistoria] = useState("");
  const [numeroArchivo, setNumeroArchivo] = useState("");
  const [nombrePaciente, setNombrePaciente] = useState("");
  const [sexo, setSexo] = useState("");
  const [edad, setEdad] = useState("");
  const [sala, setSala] = useState("");
  const [cama, setCama] = useState("");

  // Estados para ANEXO 1
  const [servicio, setServicio] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [prioridad, setPrioridad] = useState("");

  // Estados para datos del profesional
  const [fechaGeneracion, setFechaGeneracion] = useState("");
  const [horaGeneracion, setHoraGeneracion] = useState("");
  const [cedulaMedico, setCedulaMedico] = useState("");
  const [nombreMedico, setNombreMedico] = useState("");

  // Estados para exámenes
  const [criterio, setCriterio] = useState("");
  const [examenesDisponibles, setExamenesDisponibles] = useState<ExamenItem[]>(
    []
  );
  const [examenesSeleccionados, setExamenesSeleccionados] = useState<
    ExamenItem[]
  >([]);

  // Estados para diálogos
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [motivoEliminacion, setMotivoEliminacion] = useState("");

  // Mock data
  const especialidades = [
    "MEDICINA INTERNA",
    "CIRUGÍA GENERAL",
    "PEDIATRÍA",
    "GINECOLOGÍA",
    "CARDIOLOGÍA",
    "NEUROLOGÍA",
    "ANESTESIOLOGÍA",
    "EMERGENCIA",
  ];

  const examenesIniciales: ExamenItem[] = [
    {
      id: 1,
      codigo: "30",
      descripcion: "CEFIXIN 500 AMPOLLAS INYECTABLES",
      seleccionado: false,
    },
    {
      id: 2,
      codigo: "30",
      descripcion: "GUANTES ESTERILES #6",
      seleccionado: false,
    },
    {
      id: 3,
      codigo: "609",
      descripcion: "GASA GRANDE 5CMX10CM PAQUETE X5",
      seleccionado: false,
    },
    {
      id: 4,
      codigo: "15",
      descripcion: "CATETER #18",
      seleccionado: false,
    },
    {
      id: 5,
      codigo: "564",
      descripcion: "ESPARADRAPO MICROPORE COLOR PIEL",
      seleccionado: false,
    },
  ];

  // Efectos
  useEffect(() => {
    const ahora = new Date();
    const fechaActual = ahora.toISOString().split("T")[0];
    const horaActual = ahora.toTimeString().slice(0, 5);

    setFechaGeneracion(fechaActual);
    setHoraGeneracion(horaActual);
    setExamenesDisponibles(examenesIniciales);
  }, []);

  // Funciones
  const buscarPaciente = () => {
    if (numeroHistoria === "9952") {
      setNombrePaciente("ALCIVAR VALERO GEOVANNY ULICES");
      setSexo("MASCULINO");
      setEdad("50 AÑOS");
      setSala("SALA 1");
      setCama("CAMA 12");
      setNumeroArchivo("2024-LAB-001234");
    }
  };

  const buscarMedico = () => {
    if (cedulaMedico === "0901234567") {
      setNombreMedico("DR. JUAN PÉREZ GARCÍA");
    }
  };

  const filtrarExamenes = () => {
    if (!criterio) {
      setExamenesDisponibles(examenesIniciales);
      return;
    }

    const examenesFiltrados = examenesIniciales.filter(
      (examen) =>
        examen.codigo.toLowerCase().includes(criterio.toLowerCase()) ||
        examen.descripcion.toLowerCase().includes(criterio.toLowerCase())
    );
    setExamenesDisponibles(examenesFiltrados);
  };

  const seleccionarExamen = (examen: ExamenItem) => {
    if (!examenesSeleccionados.find((e) => e.id === examen.id)) {
      setExamenesSeleccionados([
        ...examenesSeleccionados,
        { ...examen, seleccionado: true },
      ]);
    }
  };

  const eliminarExamenSeleccionado = (id: number) => {
    setExamenesSeleccionados(examenesSeleccionados.filter((e) => e.id !== id));
  };

  const actualizarComentario = (id: number, comentario: string) => {
    setExamenesSeleccionados(
      examenesSeleccionados.map((examen) =>
        examen.id === id ? { ...examen, comentario } : examen
      )
    );
  };

  const handleGuardar = () => {
    console.log("Orden de laboratorio guardada:", {
      numeroHistoria,
      servicio,
      especialidad,
      prioridad,
      examenesSeleccionados,
    });
    alert("ORDEN DE LABORATORIO GUARDADA EXITOSAMENTE");
  };

  const handleEliminar = () => {
    setOpenDeleteDialog(true);
  };

  const confirmarEliminacion = () => {
    if (motivoEliminacion.trim()) {
      console.log("Orden eliminada. Motivo:", motivoEliminacion);
      alert("ORDEN ELIMINADA CORRECTAMENTE");
      setOpenDeleteDialog(false);
      setMotivoEliminacion("");
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, m: 2 }}>
      <Typography
        variant="h5"
        sx={{ mb: 3, fontWeight: "bold", color: "#1A3C6D" }}
      >
        ORDEN DE LABORATORIO
      </Typography>

      {/* Sección A: Datos del Establecimiento */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
          A. DATOS DEL ESTABLECIMIENTO
        </Typography>

        {/* Primera fila */}
        <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
          <TextField
            label="H.C."
            value={numeroHistoria}
            onChange={(e) => setNumeroHistoria(e.target.value)}
            size="small"
            sx={{ width: 150 }}
          />
          <Button
            variant="contained"
            onClick={buscarPaciente}
            size="small"
            sx={{
              background: "#1A3C6D",
              "&:hover": { background: "#274472" },
            }}
          >
            BUSCAR
          </Button>
          <TextField
            label="NOMBRE"
            value={nombrePaciente}
            disabled
            size="small"
            sx={{ flex: 1, minWidth: 300 }}
          />
          <TextField
            label="NÚMERO DE ARCHIVO"
            value={numeroArchivo}
            disabled
            size="small"
            sx={{ width: 200 }}
          />
        </Box>

        {/* Segunda fila */}
        <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
          <TextField
            label="DIRECCIÓN"
            value="RECINTO CONVENTO JUJAM - E"
            disabled
            size="small"
            sx={{ flex: 1, minWidth: 300 }}
          />
          <TextField
            label="TELÉFONO"
            disabled
            size="small"
            sx={{ width: 150 }}
          />
          <TextField
            label="EDAD"
            value={edad}
            disabled
            size="small"
            sx={{ width: 100 }}
          />
          <TextField
            label="SALA"
            value={sala}
            disabled
            size="small"
            sx={{ width: 100 }}
          />
          <TextField
            label="CAMA"
            value={cama}
            disabled
            size="small"
            sx={{ width: 100 }}
          />
        </Box>
      </Box>

      {/* ANEXO 1 */}
      <Box sx={{ mb: 3 }}>

        <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>SERVICIO</InputLabel>
            <Select
              value={servicio}
              label="SERVICIO"
              onChange={(e) => setServicio(e.target.value)}
            >
              <MenuItem value="emergencia">EMERGENCIA</MenuItem>
              <MenuItem value="consulta">CONSULTA EXTERNA</MenuItem>
              <MenuItem value="hospitalizacion">HOSPITALIZACIÓN</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>ESPECIALIDAD</InputLabel>
            <Select
              value={especialidad}
              label="ESPECIALIDAD"
              onChange={(e) => setEspecialidad(e.target.value)}
            >
              {especialidades.map((esp) => (
                <MenuItem key={esp} value={esp}>
                  {esp}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>PRIORIDAD</InputLabel>
            <Select
              value={prioridad}
              label="PRIORIDAD"
              onChange={(e) => setPrioridad(e.target.value)}
            >
              <MenuItem value="urgente">URGENTE</MenuItem>
              <MenuItem value="rutina">RUTINA</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Sección de Búsqueda y Selección de Exámenes */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            BUSCAR POR:
          </Typography>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>CRITERIO</InputLabel>
            <Select value="codigo" label="CRITERIO">
              <MenuItem value="codigo">CÓDIGO</MenuItem>
              <MenuItem value="descripcion">DESCRIPCIÓN</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="CRITERIO"
            value={criterio}
            onChange={(e) => setCriterio(e.target.value)}
            size="small"
            sx={{ flex: 1, minWidth: 200 }}
          />
          <Button
            variant="contained"
            onClick={filtrarExamenes}
            startIcon={<SearchIcon />}
            sx={{
              background: "#1A3C6D",
              "&:hover": { background: "#274472" },
            }}
          >
            BUSCAR
          </Button>
        </Box>

        {/* Tabla de Exámenes Disponibles */}
        <TableContainer component={Paper} sx={{ mb: 3, maxHeight: 300 }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#e3eaf6" }}>
                <TableCell sx={{ fontWeight: "bold", width: 50 }}>#</TableCell>
                <TableCell sx={{ fontWeight: "bold", width: 100 }}>
                  CÓDIGO
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>DESCRIPCIÓN</TableCell>
                <TableCell sx={{ fontWeight: "bold", width: 100 }}>
                  ACCIÓN
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {examenesDisponibles.map((examen, index) => (
                <TableRow key={examen.id} hover>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell sx={{ color: "#1976d2", fontWeight: "bold" }}>
                    {examen.codigo}
                  </TableCell>
                  <TableCell>{examen.descripcion}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => seleccionarExamen(examen)}
                      disabled={
                        examenesSeleccionados.find(
                          (e) => e.id === examen.id
                        ) !== undefined
                      }
                    >
                      SELECCIONAR
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Tabla de Exámenes Seleccionados */}
        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
          EXÁMENES SELECCIONADOS
        </Typography>
        <TableContainer component={Paper} sx={{ mb: 3, maxHeight: 300 }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#e3eaf6" }}>
                <TableCell sx={{ fontWeight: "bold", width: 50 }}>#</TableCell>
                <TableCell sx={{ fontWeight: "bold", width: 100 }}>
                  CÓDIGO
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>DESCRIPCIÓN</TableCell>
                <TableCell sx={{ fontWeight: "bold", width: 200 }}>
                  COMENTARIO
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", width: 80 }}>
                  ACCIÓN
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {examenesSeleccionados.map((examen, index) => (
                <TableRow key={examen.id} hover>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell sx={{ color: "#1976d2", fontWeight: "bold" }}>
                    {examen.codigo}
                  </TableCell>
                  <TableCell>{examen.descripcion}</TableCell>
                  <TableCell>
                    <TextField
                      value={examen.comentario || ""}
                      onChange={(e) =>
                        actualizarComentario(examen.id, e.target.value)
                      }
                      size="small"
                      fullWidth
                      placeholder="COMENTARIO OPCIONAL"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="error"
                      onClick={() => eliminarExamenSeleccionado(examen.id)}
                    >
                      <CloseIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Sección D: Datos del Profesional Responsable */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
          B. DATOS DEL PROFESIONAL RESPONSABLE
        </Typography>

        <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
          <TextField
            label="FECHA GENERACIÓN PEDIDO"
            type="date"
            value={fechaGeneracion}
            onChange={(e) => setFechaGeneracion(e.target.value)}
            size="small"
            sx={{ width: 200 }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="HORA GENERACIÓN PEDIDO"
            type="time"
            value={horaGeneracion}
            onChange={(e) => setHoraGeneracion(e.target.value)}
            size="small"
            sx={{ width: 180 }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="CÉDULA MÉDICO"
            value={cedulaMedico}
            onChange={(e) => setCedulaMedico(e.target.value)}
            size="small"
            sx={{ width: 150 }}
          />
          <Button
            variant="contained"
            onClick={buscarMedico}
            size="small"
            sx={{
              background: "#1A3C6D",
              "&:hover": { background: "#274472" },
            }}
          >
            BUSCAR
          </Button>
          <TextField
            label="NOMBRE DEL MÉDICO"
            value={nombreMedico}
            disabled
            size="small"
            sx={{ flex: 1, minWidth: 200 }}
          />
        </Box>
      </Box>

      {/* Botones */}
      <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
        <Button
          variant="contained"
          startIcon={<ExportIcon />}
          sx={{
            background: "#1A3C6D",
            "&:hover": { background: "#274472" },
          }}
        >
          EXPORTAR PDF
        </Button>
        <Button
          variant="contained"
          startIcon={<PrintIcon />}
          sx={{
            background: "#1A3C6D",
            "&:hover": { background: "#274472" },
          }}
        >
          IMPRIMIR
        </Button>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleGuardar}
          sx={{
            background: "#1A3C6D",
            "&:hover": { background: "#274472" },
          }}
        >
          GUARDAR
        </Button>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          sx={{
            background: "#1A3C6D",
            "&:hover": { background: "#274472" },
          }}
        >
          EDITAR
        </Button>
        <Button
          variant="contained"
          startIcon={<DeleteIcon />}
          onClick={handleEliminar}
          sx={{
            background: "#1A3C6D",
            "&:hover": { background: "#274472" },
          }}
        >
          ELIMINAR
        </Button>
      </Box>

      {/* Dialog de confirmación para eliminar */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>CONFIRMAR ELIMINACIÓN</DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2 }}>
            ¿ESTÁ SEGURO DE ELIMINAR ESTA ORDEN? ESTA ACCIÓN NO SE PUEDE
            DESHACER.
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
          <Button onClick={() => setOpenDeleteDialog(false)} color="secondary">
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
    </Paper>
  );
};

export default Laboratorio;
