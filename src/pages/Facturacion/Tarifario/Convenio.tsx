import React, { useState } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  TablePagination,
} from "@mui/material";

// Opciones según especificación
const categorias = ["Particulares", "Corporativos"];
const areas = [
  "Emergencia",
  "Hospitalización",
  "Postquirúrgico",
  "Quirófano",
  "neonato",
];
const estados = ["ACTIVO", "INACTIVO"];

const initialForm = {
  id: "",
  categoria: "",
  area: "",
  descripcion: "",
  precio: "",
  estado: "ACTIVO",
};

const Convenio = () => {
  // Estado para el filtro de categoría
  const [filtroCategoria, setFiltroCategoria] = useState("");
  // Estado para el modal
  const [open, setOpen] = useState(false);
  // Estado para el formulario
  const [form, setForm] = useState(initialForm);
  // Estado para la lista de servicios
  const [servicios, setServicios] = useState([
    {
      id: "1",
      categoria: "Corporativos",
      area: "Emergencia",
      descripcion: "Consulta convenio",
      precio: "20.00",
      estado: "ACTIVO",
    },
    {
      id: "2",
      categoria: "Particulares",
      area: "Hospitalización",
      descripcion: "Habitación individual",
      precio: "100.00",
      estado: "ACTIVO",
    },
    {
      id: "3",
      categoria: "Corporativos",
      area: "Quirófano",
      descripcion: "Cirugía programada",
      precio: "500.00",
      estado: "ACTIVO",
    },
    {
      id: "4",
      categoria: "Particulares",
      area: "Postquirúrgico",
      descripcion: "Cuidados post operatorios",
      precio: "80.00",
      estado: "ACTIVO",
    },
    {
      id: "5",
      categoria: "Corporativos",
      area: "neonato",
      descripcion: "Atención neonatal convenio",
      precio: "60.00",
      estado: "ACTIVO",
    },
    {
      id: "6",
      categoria: "Particulares",
      area: "Emergencia",
      descripcion: "Curación simple",
      precio: "25.00",
      estado: "ACTIVO",
    },
    {
      id: "7",
      categoria: "Corporativos",
      area: "Hospitalización",
      descripcion: "Día cama convenio",
      precio: "90.00",
      estado: "ACTIVO",
    },
    {
      id: "8",
      categoria: "Particulares",
      area: "Quirófano",
      descripcion: "Biopsia ambulatoria",
      precio: "120.00",
      estado: "ACTIVO",
    },
    {
      id: "9",
      categoria: "Corporativos",
      area: "Postquirúrgico",
      descripcion: "Control postquirúrgico convenio",
      precio: "45.00",
      estado: "ACTIVO",
    },
    {
      id: "10",
      categoria: "Particulares",
      area: "neonato",
      descripcion: "Vacunación particular",
      precio: "30.00",
      estado: "ACTIVO",
    },
    {
      id: "11",
      categoria: "Corporativos",
      area: "Emergencia",
      descripcion: "Electrocardiograma convenio",
      precio: "35.00",
      estado: "ACTIVO",
    },
    {
      id: "12",
      categoria: "Particulares",
      area: "Hospitalización",
      descripcion: "Terapia respiratoria particular",
      precio: "55.00",
      estado: "ACTIVO",
    },
    {
      id: "13",
      categoria: "Corporativos",
      area: "Quirófano",
      descripcion: "Cirugía mayor convenio",
      precio: "700.00",
      estado: "ACTIVO",
    },
  ]);

  // Paginación
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  // Filtrado de servicios activos y por categoría
  const serviciosFiltrados = servicios.filter(
    (s) =>
      s.estado === "ACTIVO" &&
      (filtroCategoria === "" || s.categoria === filtroCategoria)
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleOpen = () => {
    setForm({ ...initialForm });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    let { name, value } = e.target;
    // Validar formato de precio
    if (name === "precio") {
      // Solo permitir números y máximo dos decimales
      value = value.replace(/[^0-9.]/g, "");
      if (value.split(".").length > 2) return;
      if (value && !/^\d*\.?\d{0,2}$/.test(value)) return;
    }
    setForm({ ...form, [name]: value });
  };

  const handleRegistrar = () => {
    // Validar campos requeridos
    if (!form.categoria || !form.area || !form.descripcion || !form.precio) {
      alert("Complete todos los campos obligatorios.");
      return;
    }
    setServicios([
      ...servicios,
      {
        ...form,
        id: (servicios.length + 1).toString(),
        estado: "ACTIVO",
      },
    ]);
    setOpen(false);
  };

  return (
    <Box>
      {/* Filtro de categoría */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <FormControl size="small" sx={{ minWidth: 200, mr: 2 }}>
          <InputLabel>Categoría</InputLabel>
          <Select
            value={filtroCategoria}
            label="Categoría"
            onChange={(e) => setFiltroCategoria(e.target.value)}
          >
            <MenuItem value="">Todas</MenuItem>
            {categorias.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ flexGrow: 1 }} />
        <Button variant="contained" color="primary" onClick={handleOpen}>
          + Nuevo
        </Button>
      </Box>

      {/* Tabla de servicios activos */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id tarifa</TableCell>
              <TableCell>Área</TableCell>
              <TableCell>Descripción del servicio</TableCell>
              <TableCell>Precio venta</TableCell>
              <TableCell>Categoría</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {serviciosFiltrados
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.area}</TableCell>
                  <TableCell>{row.descripcion}</TableCell>
                  <TableCell>${parseFloat(row.precio).toFixed(2)}</TableCell>
                  <TableCell>{row.categoria}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={serviciosFiltrados.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[rowsPerPage]}
        />
      </TableContainer>

      {/* Dialogo para nuevo servicio */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        TransitionProps={{ timeout: 500 }}
      >
        <DialogTitle
          sx={{
            backgroundColor: "#1A3C6D",
            color: "#FFFFFF",
            textAlign: "center",
            pb: 3, // Espacio inferior extra
            pt: 3, // Espacio superior extra
          }}
        >
          Registrar Servicio
        </DialogTitle>
        <DialogContent
          sx={{
            padding: "32px 32px 20px 32px",
            backgroundColor: "#F5F5F5",
          }}
        >
          <Box sx={{ height: 24 }} />
          <Grid container spacing={2} alignItems="center">
            {/* Código de tarifa */}
            <Grid item xs={12} sm={3}>
              <TextField
                label="Código de tarifa"
                name="id"
                value={form.id ? form.id : "Se asignará automáticamente"}
                disabled
                fullWidth
                size="small"
                sx={{
                  marginBottom: "15px",
                  backgroundColor: "#E0E0E0",
                  borderRadius: "4px",
                  maxWidth: 140,
                }}
                InputProps={{
                  style: { fontWeight: form.id ? "bold" : "normal" },
                }}
              />
            </Grid>
            {/* Área */}
            <Grid item xs={12} sm={9}>
              <FormControl
                fullWidth
                size="small"
                sx={{ marginBottom: "15px", minWidth: 220 }}
              >
                <InputLabel>Área</InputLabel>
                <Select
                  name="area"
                  value={form.area}
                  label="Área"
                  onChange={handleChange}
                  sx={{ minWidth: 220 }}
                >
                  {areas.map((area) => (
                    <MenuItem key={area} value={area}>
                      {area}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {/* Precio venta */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Precio venta"
                name="precio"
                value={form.precio}
                onChange={handleChange}
                fullWidth
                size="small"
                type="text"
                inputProps={{
                  inputMode: "decimal",
                  pattern: "^[0-9]+(\\.[0-9]{0,2})?$",
                }}
                sx={{
                  marginBottom: "15px",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "4px",
                }}
              />
            </Grid>
            {/* Estado */}
            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                size="small"
                sx={{ marginBottom: "15px", minWidth: 180 }}
              >
                <InputLabel>Estado</InputLabel>
                <Select
                  name="estado"
                  value={form.estado}
                  label="Estado"
                  disabled // Solo editable en modificación
                  sx={{ minWidth: 180 }}
                >
                  {estados.map((estado) => (
                    <MenuItem key={estado} value={estado}>
                      {estado}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {/* Categoría más abajo, ocupa todo el ancho */}
            <Grid item xs={12}>
              <FormControl
                fullWidth
                size="small"
                sx={{ marginBottom: "15px", minWidth: 220 }}
              >
                <InputLabel>Categoría</InputLabel>
                <Select
                  name="categoria"
                  value={form.categoria}
                  label="Categoría"
                  onChange={handleChange}
                  sx={{ minWidth: 220 }}
                >
                  {categorias.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {/* Descripción de servicio al final, ocupando todo el ancho */}
            <Grid item xs={12}>
              <TextField
                label="Descripción del servicio"
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                fullWidth
                size="small"
                multiline
                minRows={2}
                sx={{
                  marginBottom: "15px",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "4px",
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{ justifyContent: "center", pb: 2, backgroundColor: "#F5F5F5" }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleRegistrar}
            sx={{ minWidth: 120 }}
          >
            REGISTRAR
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleClose}
            sx={{ minWidth: 120 }}
          >
            CERRAR
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Convenio;
