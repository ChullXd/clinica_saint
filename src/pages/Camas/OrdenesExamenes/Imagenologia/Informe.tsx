import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SearchIcon from "@mui/icons-material/Search";

// Data quemada para órdenes de imagenología
const ordenesQuemadas = [
  {
    id: "IMG-2024-001",
    fechaEmision: "2024-07-10",
    tipoEstudio: "Rx convencional",
    estado: "pendiente",
    paciente: "Juan Pérez García",
    archivo: null,
  },
  {
    id: "IMG-2024-002",
    fechaEmision: "2024-07-10",
    tipoEstudio: "Tomografía",
    estado: "completada",
    paciente: "María López Ruiz",
    archivo: "tomografia_maria_lopez.pdf",
  },
  {
    id: "IMG-2024-003",
    fechaEmision: "2024-07-10",
    tipoEstudio: "Ecografía",
    estado: "pendiente",
    paciente: "Carlos Mendoza Silva",
    archivo: null,
  },
  {
    id: "IMG-2024-004",
    fechaEmision: "2024-07-09",
    tipoEstudio: "Resonancia",
    estado: "cancelada",
    paciente: "Ana Rodríguez Torres",
    archivo: null,
  },
  {
    id: "IMG-2024-005",
    fechaEmision: "2024-07-09",
    tipoEstudio: "Mamografía",
    estado: "completada",
    paciente: "Lucía Vargas Morales",
    archivo: "mamografia_lucia_vargas.pdf",
  },
  {
    id: "IMG-2024-006",
    fechaEmision: "2024-07-10",
    tipoEstudio: "Rx portátil",
    estado: "pendiente",
    paciente: "Roberto Chen Wang",
    archivo: null,
  },
  {
    id: "IMG-2024-007",
    fechaEmision: "2024-07-10",
    tipoEstudio: "Procedimiento",
    estado: "completada",
    paciente: "Elena Jiménez Castro",
    archivo: "procedimiento_elena_jimenez.pdf",
  },
  {
    id: "IMG-2024-008",
    fechaEmision: "2024-07-08",
    tipoEstudio: "Sedación",
    estado: "pendiente",
    paciente: "Miguel Ángel Soto",
    archivo: null,
  },
  {
    id: "IMG-2024-009",
    fechaEmision: "2024-07-08",
    tipoEstudio: "Otro",
    estado: "completada",
    paciente: "Patricia Herrera Vega",
    archivo: "otro_patricia_herrera.pdf",
  },
  {
    id: "IMG-2024-010",
    fechaEmision: "2024-07-07",
    tipoEstudio: "Tomografía",
    estado: "pendiente",
    paciente: "Fernando Espinoza Ramos",
    archivo: null,
  },
  {
    id: "IMG-2024-011",
    fechaEmision: "2024-07-10",
    tipoEstudio: "Rx convencional",
    estado: "completada",
    paciente: "Alejandra Morales Castro",
    archivo: "rx_alejandra_morales.pdf",
  },
  {
    id: "IMG-2024-012",
    fechaEmision: "2024-07-10",
    tipoEstudio: "Ecografía",
    estado: "pendiente",
    paciente: "Diego Ramírez Flores",
    archivo: null,
  },
  {
    id: "IMG-2024-013",
    fechaEmision: "2024-07-09",
    tipoEstudio: "Resonancia",
    estado: "completada",
    paciente: "Sofía Guerrero Mendez",
    archivo: "resonancia_sofia_guerrero.pdf",
  },
  {
    id: "IMG-2024-014",
    fechaEmision: "2024-07-09",
    tipoEstudio: "Mamografía",
    estado: "pendiente",
    paciente: "Carmen Delgado Ruiz",
    archivo: null,
  },
  {
    id: "IMG-2024-015",
    fechaEmision: "2024-07-08",
    tipoEstudio: "Rx portátil",
    estado: "cancelada",
    paciente: "Andrés Vásquez López",
    archivo: null,
  },
  {
    id: "IMG-2024-016",
    fechaEmision: "2024-07-10",
    tipoEstudio: "Procedimiento",
    estado: "pendiente",
    paciente: "Valeria Santana Torres",
    archivo: null,
  },
  {
    id: "IMG-2024-017",
    fechaEmision: "2024-07-10",
    tipoEstudio: "Sedación",
    estado: "completada",
    paciente: "Ricardo Peña Jiménez",
    archivo: "sedacion_ricardo_pena.pdf",
  },
  {
    id: "IMG-2024-018",
    fechaEmision: "2024-07-07",
    tipoEstudio: "Otro",
    estado: "pendiente",
    paciente: "Gabriela Ramos Silva",
    archivo: null,
  },
  {
    id: "IMG-2024-019",
    fechaEmision: "2024-07-06",
    tipoEstudio: "Tomografía",
    estado: "completada",
    paciente: "Javier Castillo Moreno",
    archivo: "tomografia_javier_castillo.pdf",
  },
  {
    id: "IMG-2024-020",
    fechaEmision: "2024-07-06",
    tipoEstudio: "Rx convencional",
    estado: "pendiente",
    paciente: "Isabella Cruz Herrera",
    archivo: null,
  },
];

export default function Informe() {
  // Estados para paginación
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Estados para notificaciones
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Manejar cambio de página
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Manejar cambio de filas por página
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Obtener color del chip según estado
  const getEstadoColor = (estado) => {
    switch (estado) {
      case "pendiente":
        return "warning";
      case "completada":
        return "success";
      case "cancelada":
        return "error";
      default:
        return "default";
    }
  };

  // Simular subida de archivo
  const handleUploadFile = (ordenId) => {
    setSnackbar({
      open: true,
      message: `Archivo subido correctamente para orden ${ordenId}`,
      severity: "success",
    });
  };

  // Simular visualización del archivo
  const handleViewFile = (archivo) => {
    setSnackbar({
      open: true,
      message: `Visualizando archivo: ${archivo}`,
      severity: "info",
    });
  };

  // Cerrar snackbar
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Simular búsqueda
  const handleBuscar = () => {
    setSnackbar({
      open: true,
      message: "Búsqueda realizada con éxito",
      severity: "success",
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper elevation={3} sx={{ p: 3, m: 2 }}>
        <Typography
          variant="h5"
          sx={{ mb: 3, fontWeight: "bold", color: "#1A3C6D" }}
        >
          Consulta de Órdenes de Imagenología
        </Typography>

        {/* Filtros */}
        <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
          <DatePicker
            label="Fecha"
            value={dayjs()}
            onChange={() => {}}
            slotProps={{ textField: { size: "small" } }}
          />
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Estado</InputLabel>
            <Select value="" label="Estado" onChange={() => {}}>
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="pendiente">Pendiente</MenuItem>
              <MenuItem value="completada">Completada</MenuItem>
              <MenuItem value="cancelada">Cancelada</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel>Tipo de Estudio</InputLabel>
            <Select value="Todos" label="Tipo de Estudio" onChange={() => {}}>
              <MenuItem value="Todos">Todos</MenuItem>
              <MenuItem value="Rx convencional">Rx convencional</MenuItem>
              <MenuItem value="Rx portátil">Rx portátil</MenuItem>
              <MenuItem value="Tomografía">Tomografía</MenuItem>
              <MenuItem value="Resonancia">Resonancia</MenuItem>
              <MenuItem value="Ecografía">Ecografía</MenuItem>
              <MenuItem value="Mamografía">Mamografía</MenuItem>
              <MenuItem value="Procedimiento">Procedimiento</MenuItem>
              <MenuItem value="Otro">Otro</MenuItem>
              <MenuItem value="Sedación">Sedación</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            onClick={handleBuscar}
            startIcon={<SearchIcon />}
            sx={{
              background: "#1A3C6D",
              "&:hover": { background: "#274472" },
            }}
          >
            Buscar
          </Button>
        </Box>

        {/* Tabla de órdenes con DATA QUEMADA */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#e3eaf6" }}>
                <TableCell sx={{ fontWeight: "bold" }}>ID Orden</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Fecha Emisión</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Tipo de Estudio
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Estado</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Paciente</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Archivo</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ordenesQuemadas
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((orden) => (
                  <TableRow key={orden.id} hover>
                    <TableCell>{orden.id}</TableCell>
                    <TableCell>{orden.fechaEmision}</TableCell>
                    <TableCell>{orden.tipoEstudio}</TableCell>
                    <TableCell>
                      <Chip
                        label={
                          orden.estado.charAt(0).toUpperCase() +
                          orden.estado.slice(1)
                        }
                        color={getEstadoColor(orden.estado)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{orden.paciente}</TableCell>
                    <TableCell>
                      {orden.archivo ? (
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Typography variant="body2" color="success.main">
                            ✓ Archivo subido
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() => handleViewFile(orden.archivo)}
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Box>
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          Sin archivo
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleUploadFile(orden.id)}
                        disabled={orden.estado === "cancelada"}
                      >
                        <CloudUploadIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Paginación */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={ordenesQuemadas.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Filas por página:"
        />

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
      </Paper>
    </LocalizationProvider>
  );
}
