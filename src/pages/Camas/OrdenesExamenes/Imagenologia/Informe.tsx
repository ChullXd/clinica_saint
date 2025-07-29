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
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";

// EXÁMENES DE IMAGENOLOGÍA DEL TARIFARIO - TODOS LOS DISPONIBLES
const examenesImagenologia = [
  "RADIOGRAFIA DE TORAX PA",
  "RADIOGRAFIA DE ABDOMEN",
  "ECOGRAFIA ABDOMINAL",
  "ECOGRAFIA PELVICA",
  "TOMOGRAFIA DE CRANEO",
  "TOMOGRAFIA DE ABDOMEN",
  "RESONANCIA MAGNETICA LUMBAR",
  "RESONANCIA MAGNETICA CERVICAL",
  "MAMOGRAFIA BILATERAL",
  "MAMOGRAFIA UNILATERAL",
  "DOPPLER VASCULAR",
  "ANGIOGRAFIA",
  "UROGRAFIA",
  "COLANGIOGRAFIA",
  "ARTROSCOPIA",
  "ENDOSCOPIA",
  "Rx convencional",
  "Rx portátil",
  "Tomografía",
  "Resonancia",
  "Ecografía",
  "Mamografía",
  "Procedimiento",
  "Sedación",
  "Otro",
];

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
  // ESTADOS PARA FILTROS - FUNCIONALES
  const [fechaFiltro, setFechaFiltro] = useState(null);
  const [estadoFiltro, setEstadoFiltro] = useState("");
  const [tipoEstudioFiltro, setTipoEstudioFiltro] = useState("");

  // Estados para datos del paciente (MISMO ESTÁNDAR QUE LABORATORIO)
  const [hc] = useState("9952");
  const [nombre] = useState("ALCIVAR VALERO GEOVANNY ULICES");
  const [direccion] = useState("RECINTO CONVENTO JUJAN - L");
  const [telefono] = useState("099-888-7777");
  const [edad] = useState("50");
  const [categoria] = useState("PARTICULAR");

  // Estados para datos del profesional (NO EDITABLE)
  const [cedulaMedico] = useState("1234567890");
  const [nombreMedico] = useState("DR. CARLOS EDUARDO MENDOZA SILVA");
  const [fechaGeneracion, setFechaGeneracion] = useState("");
  const [horaGeneracion, setHoraGeneracion] = useState("");

  // Estados para opciones de acción
  const [accionSeleccionada, setAccionSeleccionada] = useState("");

  // Estados para paginación
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Estados para notificaciones
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Efectos
  useEffect(() => {
    const ahora = new Date();
    const fechaActual = ahora.toISOString().split("T")[0];
    const horaActual = ahora.toTimeString().slice(0, 5);
    setFechaGeneracion(fechaActual);
    setHoraGeneracion(horaActual);
  }, []);

  // FILTRAR ÓRDENES SEGÚN LOS CRITERIOS - FUNCIONAL
  const ordenesFiltradas = ordenesQuemadas.filter((orden) => {
    const fechaCoincide = !fechaFiltro || orden.fechaEmision === fechaFiltro.format("YYYY-MM-DD");
    const estadoCoincide = estadoFiltro === "" || orden.estado === estadoFiltro;
    const tipoCoincide = tipoEstudioFiltro === "" || orden.tipoEstudio === tipoEstudioFiltro;
    
    return fechaCoincide && estadoCoincide && tipoCoincide;
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

  // Eliminar orden con confirmación
  const handleEliminarOrden = (ordenId) => {
    const confirmado = window.confirm(`¿ESTÁ SEGURO QUE DESEA ELIMINAR LA ORDEN ${ordenId}?`);
    if (confirmado) {
      setSnackbar({
        open: true,
        message: `Orden ${ordenId} eliminada correctamente`,
        severity: "success",
      });
    }
  };

  // Manejar acciones según opción seleccionada
  const handleAccion = () => {
    if (!accionSeleccionada) {
      setSnackbar({
        open: true,
        message: "Seleccione una acción",
        severity: "warning",
      });
      return;
    }

    switch (accionSeleccionada) {
      case "guardar":
        setSnackbar({
          open: true,
          message: "INFORME GUARDADO EXITOSAMENTE",
          severity: "success",
        });
        break;
      case "exportar":
        setSnackbar({
          open: true,
          message: "EXPORTANDO PDF...",
          severity: "info",
        });
        break;
      case "imprimir":
        setSnackbar({
          open: true,
          message: "ENVIANDO A IMPRESORA...",
          severity: "info",
        });
        break;
      case "editar":
        setSnackbar({
          open: true,
          message: "MODO EDICIÓN ACTIVADO",
          severity: "info",
        });
        break;
      default:
        break;
    }
  };

  // Cerrar snackbar
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper elevation={3} sx={{ p: 3, m: 2 }}>
        <Typography
          sx={{ 
            mb: 3, 
            fontWeight: "bold", 
            color: "#1A3C6D",
            fontSize: "0.9rem",
            textAlign: "center"
          }}
        >
           CONSULTA DE ORDENES DE IMAGENOLOGIA
        </Typography>

        {/* SECCIÓN DE DATOS DEL PACIENTE - MISMO ESTILO QUE LABORATORIO */}
        <Typography
          sx={{
            fontWeight: "bold",
            color: "#1A3C6D",
            mb: 1.5,
            fontSize: "0.8rem",
          }}
        >
         DATOS DEL PACIENTE
        </Typography>
        <Box sx={{ display: "flex", gap: 1.5, mb: 2.5 }}>
          <TextField
            label="HC"
            value={hc}
            disabled // NO EDITABLE - VIENE DE DATOS DE CAMA
            size="small"
            sx={{ 
              minWidth: 100,
              backgroundColor: "#E0E0E0",
              '& .MuiInputLabel-root': { 
                fontSize: '0.65rem',
                transform: 'translate(14px, 6px) scale(1)', // Posición más alta
                '&.Mui-focused, &.MuiFormLabel-filled': {
                  transform: 'translate(14px, -9px) scale(0.75)', // Posición cuando está enfocado
                }
              },
              '& .MuiInputBase-input': { 
                fontSize: '0.65rem',
                padding: '4px 14px', // Padding más pequeño
              },
              '& .MuiOutlinedInput-root': {
                minHeight: '28px', // Altura más pequeña
              }
            }}
          />
          <TextField
            label="NOMBRE"
            value={nombre}
            disabled
            size="small"
            sx={{ 
              flex: 1,
              '& .MuiInputLabel-root': { 
                fontSize: '0.65rem',
                transform: 'translate(14px, 6px) scale(1)',
                '&.Mui-focused, &.MuiFormLabel-filled': {
                  transform: 'translate(14px, -9px) scale(0.75)',
                }
              },
              '& .MuiInputBase-input': { 
                fontSize: '0.65rem',
                padding: '4px 14px',
              },
              '& .MuiOutlinedInput-root': {
                minHeight: '28px',
              }
            }}
          />
          <TextField
            label="DIRECCION"
            value={direccion}
            disabled
            size="small"
            sx={{ 
              flex: 1,
              '& .MuiInputLabel-root': { 
                fontSize: '0.65rem',
                transform: 'translate(14px, 6px) scale(1)',
                '&.Mui-focused, &.MuiFormLabel-filled': {
                  transform: 'translate(14px, -9px) scale(0.75)',
                }
              },
              '& .MuiInputBase-input': { 
                fontSize: '0.65rem',
                padding: '4px 14px',
              },
              '& .MuiOutlinedInput-root': {
                minHeight: '28px',
              }
            }}
          />
          <TextField
            label="TELEFONO"
            value={telefono}
            disabled
            size="small"
            sx={{ 
              minWidth: 120,
              '& .MuiInputLabel-root': { 
                fontSize: '0.65rem',
                transform: 'translate(14px, 6px) scale(1)',
                '&.Mui-focused, &.MuiFormLabel-filled': {
                  transform: 'translate(14px, -9px) scale(0.75)',
                }
              },
              '& .MuiInputBase-input': { 
                fontSize: '0.65rem',
                padding: '4px 14px',
              },
              '& .MuiOutlinedInput-root': {
                minHeight: '28px',
              }
            }}
          />
          <TextField
            label="EDAD"
            value={edad}
            disabled
            size="small"
            sx={{ 
              minWidth: 70,
              '& .MuiInputLabel-root': { 
                fontSize: '0.65rem',
                transform: 'translate(14px, 6px) scale(1)',
                '&.Mui-focused, &.MuiFormLabel-filled': {
                  transform: 'translate(14px, -9px) scale(0.75)',
                }
              },
              '& .MuiInputBase-input': { 
                fontSize: '0.65rem',
                padding: '4px 14px',
              },
              '& .MuiOutlinedInput-root': {
                minHeight: '28px',
              }
            }}
          />
          <TextField
            label="CATEGORIA"
            value={categoria}
            disabled
            size="small"
            sx={{
              minWidth: 100,
              '& .MuiInputLabel-root': { 
                fontSize: '0.65rem',
                transform: 'translate(14px, 6px) scale(1)',
                '&.Mui-focused, &.MuiFormLabel-filled': {
                  transform: 'translate(14px, -9px) scale(0.75)',
                }
              },
              "& .MuiInputBase-input": {
                fontSize: '0.65rem',
                padding: '4px 14px',
                color: categoria === "PARTICULAR" ? "#1976d2" : "#d32f2f",
                fontWeight: "bold",
              },
              '& .MuiOutlinedInput-root': {
                minHeight: '28px',
              }
            }}
          />
        </Box>

        {/* SECCIÓN DE DATOS DEL PROFESIONAL - SOLO LECTURA */}
        <Typography
          sx={{
            fontWeight: "bold",
            color: "#1A3C6D",
            mb: 1.5,
            fontSize: "0.8rem",
          }}
        >
           DATOS DEL PROFESIONAL
        </Typography>
        <Box sx={{ display: "flex", gap: 1.5, mb: 2.5, flexWrap: "wrap" }}>
          <TextField
            label="FECHA GENERACION"
            type="date"
            value={fechaGeneracion}
            disabled // NO EDITABLE - INFORMACIÓN DEL USUARIO
            size="small"
            sx={{ 
              width: 170,
              backgroundColor: "#E0E0E0",
              '& .MuiInputLabel-root': { 
                fontSize: '0.65rem',
                transform: 'translate(14px, 6px) scale(1)',
                '&.Mui-focused, &.MuiFormLabel-filled': {
                  transform: 'translate(14px, -9px) scale(0.75)',
                }
              },
              '& .MuiInputBase-input': { 
                fontSize: '0.65rem',
                padding: '4px 14px',
              },
              '& .MuiOutlinedInput-root': {
                minHeight: '28px',
              }
            }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="HORA GENERACION"
            type="time"
            value={horaGeneracion}
            disabled // NO EDITABLE - INFORMACIÓN DEL USUARIO
            size="small"
            sx={{ 
              width: 150,
              backgroundColor: "#E0E0E0",
              '& .MuiInputLabel-root': { 
                fontSize: '0.65rem',
                transform: 'translate(14px, 6px) scale(1)',
                '&.Mui-focused, &.MuiFormLabel-filled': {
                  transform: 'translate(14px, -9px) scale(0.75)',
                }
              },
              '& .MuiInputBase-input': { 
                fontSize: '0.65rem',
                padding: '4px 14px',
              },
              '& .MuiOutlinedInput-root': {
                minHeight: '28px',
              }
            }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="CEDULA MEDICO"
            value={cedulaMedico}
            disabled // NO EDITABLE - INFORMACIÓN DEL USUARIO LOGUEADO
            size="small"
            sx={{ 
              width: 130,
              backgroundColor: "#E0E0E0",
              '& .MuiInputLabel-root': { 
                fontSize: '0.65rem',
                transform: 'translate(14px, 6px) scale(1)',
                '&.Mui-focused, &.MuiFormLabel-filled': {
                  transform: 'translate(14px, -9px) scale(0.75)',
                }
              },
              '& .MuiInputBase-input': { 
                fontSize: '0.65rem',
                padding: '4px 14px',
              },
              '& .MuiOutlinedInput-root': {
                minHeight: '28px',
              }
            }}
          />
          <TextField
            label="NOMBRE DEL MEDICO"
            value={nombreMedico}
            disabled // NO EDITABLE - INFORMACIÓN DEL USUARIO LOGUEADO
            size="small"
            sx={{ 
              flex: 1,
              minWidth: 250,
              backgroundColor: "#E0E0E0",
              '& .MuiInputLabel-root': { 
                fontSize: '0.65rem',
                transform: 'translate(14px, 6px) scale(1)',
                '&.Mui-focused, &.MuiFormLabel-filled': {
                  transform: 'translate(14px, -9px) scale(0.75)',
                }
              },
              '& .MuiInputBase-input': { 
                fontSize: '0.65rem',
                padding: '4px 14px',
              },
              '& .MuiOutlinedInput-root': {
                minHeight: '28px',
              }
            }}
          />
        </Box>

        {/* FILTROS - SIN BOTÓN BUSCAR, CON FILTRADO FUNCIONAL */}
        <Typography
          sx={{
            fontWeight: "bold",
            color: "#1A3C6D",
            mb: 1.5,
            fontSize: "0.8rem",
          }}
        >
           FILTROS DE BUSQUEDA
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>

        
          
          {/* FILTRO ESTADO - FUNCIONAL */}
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel sx={{ 
              fontSize: '0.65rem',
              transform: 'translate(14px, 6px) scale(1)',
              '&.Mui-focused, &.MuiFormLabel-filled': {
                transform: 'translate(14px, -9px) scale(0.75)',
              }
            }}>ESTADO</InputLabel>
            <Select 
              value={estadoFiltro} 
              label="ESTADO" 
              onChange={(e) => setEstadoFiltro(e.target.value)}
              sx={{ 
                '& .MuiSelect-select': { 
                  fontSize: '0.65rem',
                  padding: '4px 14px',
                },
                minHeight: '28px',
              }}
            >
              <MenuItem value="" sx={{ fontSize: '0.65rem' }}>TODOS</MenuItem>
              <MenuItem value="pendiente" sx={{ fontSize: '0.65rem' }}>PENDIENTE</MenuItem>
              <MenuItem value="completada" sx={{ fontSize: '0.65rem' }}>COMPLETADA</MenuItem>
              <MenuItem value="cancelada" sx={{ fontSize: '0.65rem' }}>CANCELADA</MenuItem>
            </Select>
          </FormControl>
          
          {/* FILTRO TIPO DE ESTUDIO - TODOS LOS EXÁMENES DEL TARIFARIO */}
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel sx={{ 
              fontSize: '0.65rem',
              transform: 'translate(14px, 6px) scale(1)',
              '&.Mui-focused, &.MuiFormLabel-filled': {
                transform: 'translate(14px, -9px) scale(0.75)',
              }
            }}>TIPO DE ESTUDIO</InputLabel>
            <Select 
              value={tipoEstudioFiltro} 
              label="TIPO DE ESTUDIO" 
              onChange={(e) => setTipoEstudioFiltro(e.target.value)}
              sx={{ 
                '& .MuiSelect-select': { 
                  fontSize: '0.65rem',
                  padding: '4px 14px',
                },
                minHeight: '28px',
              }}
            >
              <MenuItem value="" sx={{ fontSize: '0.65rem' }}>TODOS</MenuItem>
              {examenesImagenologia.map((examen) => (
                <MenuItem key={examen} value={examen} sx={{ fontSize: '0.65rem' }}>
                  {examen}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* OPCIONES DE ACCIÓN CON RADIO BUTTONS - SOLO UNA SELECCIÓN */}
        <Typography
          sx={{
            fontWeight: "bold",
            color: "#1A3C6D",
            mb: 1.5,
            fontSize: "0.8rem",
          }}
        >
           OPCIONES DE ACCION
        </Typography>
        <Box sx={{ mb: 2.5 }}>
          <FormControl component="fieldset">
            <RadioGroup
              row
              value={accionSeleccionada}
              onChange={(e) => setAccionSeleccionada(e.target.value)}
              sx={{ gap: 3 }}
            >
              <FormControlLabel 
                value="guardar" 
                control={<Radio size="small" />} 
                label={
                  <Typography sx={{ fontSize: '0.65rem', fontWeight: 'bold' }}>
                    GUARDAR
                  </Typography>
                } 
              />
              <FormControlLabel 
                value="exportar" 
                control={<Radio size="small" />} 
                label={
                  <Typography sx={{ fontSize: '0.65rem', fontWeight: 'bold' }}>
                     EXPORTAR PDF
                  </Typography>
                } 
              />
              <FormControlLabel 
                value="imprimir" 
                control={<Radio size="small" />} 
                label={
                  <Typography sx={{ fontSize: '0.65rem', fontWeight: 'bold' }}>
                     IMPRIMIR
                  </Typography>
                } 
              />
              <FormControlLabel 
                value="editar" 
                control={<Radio size="small" />} 
                label={
                  <Typography sx={{ fontSize: '0.65rem', fontWeight: 'bold' }}>
                     EDITAR
                  </Typography>
                } 
              />
            </RadioGroup>
          </FormControl>
        </Box>

        {/* BOTÓN EJECUTAR ACCIÓN */}
        <Box sx={{ mb: 2.5 }}>
          <Button
            variant="contained"
            onClick={handleAccion}
            disabled={!accionSeleccionada}
            sx={{
              background: "#1A3C6D",
              borderRadius: 2,
              px: 3,
              textTransform: "none",
              fontWeight: "bold",
              fontSize: '0.65rem',
              "&:hover": { background: "#274472" },
              "&:disabled": { background: "#ccc" },
            }}
          >
            EJECUTAR ACCIÓN SELECCIONADA
          </Button>
        </Box>

        {/* TABLA DE ÓRDENES - CON FILTROS APLICADOS */}
        <Typography sx={{ mb: 2, fontWeight: "bold", color: "#1A3C6D", fontSize: "0.8rem" }}>
           ORDENES ENCONTRADAS ({ordenesFiltradas.length})
        </Typography>
        
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#e3eaf6" }}>
                <TableCell sx={{ fontWeight: "bold", fontSize: "0.6rem" }}>ID ORDEN</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "0.6rem" }}>FECHA EMISION</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "0.6rem" }}>TIPO DE ESTUDIO</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "0.6rem" }}>ESTADO</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "0.6rem" }}>PACIENTE</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "0.6rem" }}>ARCHIVO</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "0.6rem" }}>ACCIONES</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ordenesFiltradas
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((orden) => (
                  <TableRow key={orden.id} hover>
                    <TableCell sx={{ fontSize: "0.6rem" }}>{orden.id}</TableCell>
                    <TableCell sx={{ fontSize: "0.6rem" }}>{orden.fechaEmision}</TableCell>
                    <TableCell sx={{ fontSize: "0.6rem" }}>{orden.tipoEstudio}</TableCell>
                    <TableCell>
                      <Chip
                        label={
                          orden.estado.charAt(0).toUpperCase() +
                          orden.estado.slice(1)
                        }
                        color={getEstadoColor(orden.estado)}
                        size="small"
                        sx={{ fontSize: "0.55rem", height: "20px" }}
                      />
                    </TableCell>
                    <TableCell sx={{ fontSize: "0.6rem" }}>{orden.paciente}</TableCell>
                    <TableCell>
                      {orden.archivo ? (
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Typography variant="body2" color="success.main" sx={{ fontSize: "0.6rem" }}>
                            ✓ Archivo subido
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() => handleViewFile(orden.archivo)}
                          >
                            <VisibilityIcon sx={{ fontSize: "0.8rem" }} />
                          </IconButton>
                        </Box>
                      ) : (
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.6rem" }}>
                          Sin archivo
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 0.5 }}>
                        <IconButton
                          color="primary"
                          onClick={() => handleUploadFile(orden.id)}
                          disabled={orden.estado === "cancelada"}
                          size="small"
                        >
                          <CloudUploadIcon sx={{ fontSize: "0.8rem" }} />
                        </IconButton>
                        {/* BOTÓN ELIMINAR - MISMO ESTILO QUE LABORATORIO */}
                        <IconButton
                          color="error"
                          onClick={() => handleEliminarOrden(orden.id)}
                          size="small"
                          disabled={orden.estado === "cancelada"}
                        >
                          <DeleteIcon sx={{ fontSize: "0.8rem" }} />
                        </IconButton>
                      </Box>
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
          count={ordenesFiltradas.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Filas por página:"
          sx={{
            '& .MuiTablePagination-selectLabel': { fontSize: '0.65rem' },
            '& .MuiTablePagination-displayedRows': { fontSize: '0.65rem' },
            '& .MuiTablePagination-select': { fontSize: '0.65rem' },
          }}
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
