import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";

interface ServiciosProps {
  open: boolean;
  onClose: () => void;
}

// Mock data para servicios (data quemada)
const serviciosDisponibles = [
  {
    codigo: "471",
    descripcion: "HABITACION COMPARTIDA (2-C)",
    categoria: "PARTICULARES",
    precio: 45.0,
  },
  {
    codigo: "470",
    descripcion: "HABITACION COMPARTIDA (1-C)",
    categoria: "PARTICULARES",
    precio: 55.0,
  },
  {
    codigo: "1564",
    descripcion: "HABITACION PARTICULAR",
    categoria: "PARTICULARES",
    precio: 75.0,
  },
  {
    codigo: "472",
    descripcion: "HABITACION SUITE (1-C)",
    categoria: "PARTICULARES",
    precio: 95.0,
  },
  {
    codigo: "473",
    descripcion: "HABITACION SUITE (1-C) SEGUROS",
    categoria: "PARTICULARES",
    precio: 85.0,
  },
  {
    codigo: "1018",
    descripcion: "EKG ELECTROCARDIOGRAMA",
    categoria: "PARTICULARES",
    precio: 30.0,
  },
  {
    codigo: "502",
    descripcion: "CURACION SIMPLE",
    categoria: "PARTICULARES",
    precio: 20.0,
  },
  {
    codigo: "301",
    descripcion: "CONSULTA MEDICINA GENERAL",
    categoria: "PARTICULARES",
    precio: 40.0,
  },
];

export default function ServiciosInternosForm({
  open,
  onClose,
}: ServiciosProps) {
  // Estados para búsqueda de paciente (data quemada)
  const [hc, setHc] = useState("9952");
  const [nombre, setNombre] = useState("ALCIVAR VALERO GEOVANNY ULICES");
  const [direccion, setDireccion] = useState("RECINTO CONVENTO JUJAN - L");
  const [telefono, setTelefono] = useState("");
  const [edad, setEdad] = useState("50 Años");

  // Estados para búsqueda de servicios
  const [buscarPor, setBuscarPor] = useState("CODIGO");
  const [criterio, setCriterio] = useState("");
  const [serviciosFiltrados, setServiciosFiltrados] =
    useState<any[]>(serviciosDisponibles);

  // Estado para servicios seleccionados (data quemada inicial)
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState<any[]>([
    {
      id: 1,
      codigo: "1018",
      descripcion: "EKG ELECTROCARDIOGRAMA",
      categoria: "PARTICULARES",
      cantidad: 1,
      precio: 30.0,
    },
    {
      id: 2,
      codigo: "471",
      descripcion: "HABITACION COMPARTIDA (2-C)",
      categoria: "PARTICULARES",
      cantidad: 1,
      precio: 45.0,
    },
  ]);

  // Buscar servicios
  const buscarServicios = () => {
    if (!criterio) {
      setServiciosFiltrados(serviciosDisponibles);
      return;
    }

    const filtrados = serviciosDisponibles.filter((servicio) => {
      if (buscarPor === "CODIGO") {
        return servicio.codigo.includes(criterio);
      } else {
        return servicio.descripcion
          .toLowerCase()
          .includes(criterio.toLowerCase());
      }
    });
    setServiciosFiltrados(filtrados);
  };

  // Agregar servicio seleccionado
  const agregarServicio = (servicio: any) => {
    const yaExiste = serviciosSeleccionados.find(
      (item) =>
        item.codigo === servicio.codigo &&
        item.descripcion === servicio.descripcion
    );

    if (!yaExiste) {
      setServiciosSeleccionados([
        ...serviciosSeleccionados,
        {
          ...servicio,
          cantidad: 1,
          id: Date.now(),
        },
      ]);
    }
  };

  // Eliminar servicio seleccionado
  const eliminarServicio = (id: number) => {
    setServiciosSeleccionados(
      serviciosSeleccionados.filter((item) => item.id !== id)
    );
  };

  // Actualizar cantidad
  const actualizarCantidad = (id: number, cantidad: string) => {
    setServiciosSeleccionados(
      serviciosSeleccionados.map((item) =>
        item.id === id ? { ...item, cantidad: parseInt(cantidad) || 0 } : item
      )
    );
  };

  // Actualizar precio
  const actualizarPrecio = (id: number, precio: string) => {
    setServiciosSeleccionados(
      serviciosSeleccionados.map((item) =>
        item.id === id ? { ...item, precio: parseFloat(precio) || 0 } : item
      )
    );
  };

  // Grabar
  const handleGrabar = () => {
    console.log("Datos del paciente:", {
      hc,
      nombre,
      direccion,
      telefono,
      edad,
    });
    console.log("Servicios seleccionados:", serviciosSeleccionados);
    alert("Servicios internos grabados correctamente");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle
        sx={{
          backgroundColor: "#1A3C6D",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "1.2rem",
          py: 2,
        }}
      >
        Servicios Internos
      </DialogTitle>
      <DialogContent
        sx={{
          background: "#F4F8FB",
          pb: 2,
          borderBottomLeftRadius: "8px",
          borderBottomRightRadius: "8px",
          pt: 4,
        }}
      >
        {/* Sección de búsqueda de paciente */}
        <Typography
          sx={{
            fontWeight: "bold",
            color: "#1A3C6D",
            mb: 2,
            fontSize: "1.1rem",
          }}
        >
          Datos del Paciente
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <TextField
            label="HC"
            value={hc}
            onChange={(e) => setHc(e.target.value)}
            size="small"
            sx={{ minWidth: 120 }}
          />
          <TextField
            label="Nombre"
            value={nombre}
            disabled
            size="small"
            sx={{ flex: 1 }}
          />
          <TextField
            label="Dirección"
            value={direccion}
            disabled
            size="small"
            sx={{ flex: 1 }}
          />
          <TextField
            label="Teléfono"
            value={telefono}
            disabled
            size="small"
            sx={{ minWidth: 140 }}
          />
          <TextField
            label="Edad"
            value={edad}
            disabled
            size="small"
            sx={{ minWidth: 100 }}
          />
        </Box>

        {/* Sección de búsqueda de servicios */}
        <Typography
          sx={{
            fontWeight: "bold",
            color: "#1A3C6D",
            mb: 2,
            fontSize: "1.1rem",
          }}
        >
          Búsqueda de Servicios
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Buscar por</InputLabel>
            <Select
              value={buscarPor}
              label="Buscar por"
              onChange={(e) => setBuscarPor(e.target.value)}
            >
              <MenuItem value="CODIGO">CODIGO</MenuItem>
              <MenuItem value="DESCRIPCION">DESCRIPCION</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Criterio"
            value={criterio}
            onChange={(e) => setCriterio(e.target.value)}
            size="small"
            sx={{ flex: 1 }}
          />
          <Button
            variant="contained"
            onClick={buscarServicios}
            startIcon={<SearchIcon />}
            sx={{
              background: "#1A3C6D",
              borderRadius: 2,
              px: 3,
              textTransform: "none",
              fontWeight: "bold",
              "&:hover": { background: "#274472" },
            }}
          >
            Buscar
          </Button>
        </Box>

        {/* Grid de servicios encontrados */}
        <Box sx={{ mb: 3 }}>
          {/* Header del grid */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "100px 1fr 150px",
              gap: 1,
              p: 1,
              backgroundColor: "#e3eaf6",
              borderRadius: "4px 4px 0 0",
              border: "1px solid #ddd",
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>CODIGO</Typography>
            <Typography sx={{ fontWeight: "bold" }}>DESCRIPCION</Typography>
            <Typography sx={{ fontWeight: "bold", textAlign: "center" }}>
              CATEGORIA
            </Typography>
          </Box>
          {/* Filas del grid */}
          <Box
            sx={{
              maxHeight: 200,
              overflowY: "auto",
              border: "1px solid #ddd",
              borderTop: "none",
              borderRadius: "0 0 4px 4px",
            }}
          >
            {serviciosFiltrados.map((servicio, index) => (
              <Box
                key={index}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "100px 1fr 150px",
                  gap: 1,
                  p: 1,
                  backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9",
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "#f0f0f0" },
                }}
                onDoubleClick={() => agregarServicio(servicio)}
              >
                <Typography>{servicio.codigo}</Typography>
                <Typography>{servicio.descripcion}</Typography>
                <Typography sx={{ textAlign: "center" }}>
                  {servicio.categoria}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Grid de servicios seleccionados */}
        <Typography
          sx={{
            fontWeight: "bold",
            color: "#1A3C6D",
            mb: 2,
            fontSize: "1.1rem",
          }}
        >
          Servicios Seleccionados
        </Typography>
        <Box>
          {/* Header del grid */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "80px 1fr 80px 100px 120px 80px",
              gap: 1,
              p: 1,
              backgroundColor: "#e3eaf6",
              borderRadius: "4px 4px 0 0",
              border: "1px solid #ddd",
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>CODIGO</Typography>
            <Typography sx={{ fontWeight: "bold" }}>DESCRIPCION</Typography>
            <Typography sx={{ fontWeight: "bold", textAlign: "center" }}>
              CANTIDAD
            </Typography>
            <Typography sx={{ fontWeight: "bold", textAlign: "center" }}>
              PRECIO
            </Typography>
            <Typography sx={{ fontWeight: "bold", textAlign: "center" }}>
              CATEGORIA
            </Typography>
            <Typography sx={{ fontWeight: "bold", textAlign: "center" }}>
              ACCIÓN
            </Typography>
          </Box>
          {/* Filas del grid */}
          <Box
            sx={{
              border: "1px solid #ddd",
              borderTop: "none",
              borderRadius: "0 0 4px 4px",
            }}
          >
            {serviciosSeleccionados.map((servicio, index) => (
              <Box
                key={servicio.id}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "80px 1fr 80px 100px 120px 80px",
                  gap: 1,
                  p: 1,
                  backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9",
                  alignItems: "center",
                }}
              >
                <Typography>{servicio.codigo}</Typography>
                <Typography>{servicio.descripcion}</Typography>
                <TextField
                  type="number"
                  value={servicio.cantidad}
                  onChange={(e) =>
                    actualizarCantidad(servicio.id, e.target.value)
                  }
                  size="small"
                  sx={{ width: "100%" }}
                />
                <TextField
                  type="number"
                  value={servicio.precio}
                  onChange={(e) =>
                    actualizarPrecio(servicio.id, e.target.value)
                  }
                  size="small"
                  sx={{ width: "100%" }}
                  inputProps={{
                    step: "0.01",
                    min: "0",
                  }}
                />
                <Typography sx={{ textAlign: "center", fontSize: "0.9rem" }}>
                  {servicio.categoria}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <IconButton
                    color="error"
                    onClick={() => eliminarServicio(servicio.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ background: "#F4F8FB", pb: 2, pt: 1 }}>
        <Button
          onClick={onClose}
          sx={{
            color: "#fff",
            background: "#e57373",
            borderRadius: 2,
            px: 3,
            textTransform: "none",
            fontWeight: "bold",
            "&:hover": { background: "#c62828" },
          }}
        >
          Cerrar
        </Button>
        <Button
          variant="contained"
          onClick={handleGrabar}
          sx={{
            background: "#1A3C6D",
            borderRadius: 2,
            px: 3,
            textTransform: "none",
            fontWeight: "bold",
            "&:hover": { background: "#274472" },
          }}
        >
          Grabar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
