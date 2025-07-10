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

interface InsumosProps {
  open: boolean;
  onClose: () => void;
}

// Mock data para insumos (data quemada)
const insumosDisponibles = [
  {
    codigo: "30",
    descripcion: "CEFIXIN 500 AMPOLLAS INYECTABLES",
    stock: 131,
  },
  {
    codigo: "31",
    descripcion: "GUANTES ESTERILES #6",
    stock: 626,
  },
  {
    codigo: "609",
    descripcion: "GASA GRANDE 5CMX10CM PAQUETE X5",
    stock: 797,
  },
  {
    codigo: "16",
    descripcion: "CATETER #18",
    stock: 256,
  },
  {
    codigo: "584",
    descripcion: "ESPARADRAPO MICROPORE COLOR PIEL",
    stock: 17,
  },
  {
    codigo: "102",
    descripcion: "JERINGA 5ML DESECHABLE",
    stock: 450,
  },
  {
    codigo: "203",
    descripcion: "SUERO FISIOLOGICO 500ML",
    stock: 89,
  },
  {
    codigo: "304",
    descripcion: "ALCOHOL ANTISEPTICO 70%",
    stock: 234,
  },
];

const InsumosForm: React.FC<InsumosProps> = ({ open, onClose }) => {
  // Estados para búsqueda de paciente (data quemada)
  const [hc, setHc] = useState("12345");
  const [nombre, setNombre] = useState("Juan Pérez García");
  const [direccion, setDireccion] = useState("Av. Principal 123, Quito");
  const [telefono, setTelefono] = useState("0999888777");
  const [edad, setEdad] = useState("35");

  // Estados para búsqueda de insumos
  const [buscarPor, setBuscarPor] = useState("CODIGO");
  const [criterio, setCriterio] = useState("");
  const [insumosFiltrados, setInsumosFiltrados] =
    useState<any[]>(insumosDisponibles);

  // Estado para insumos seleccionados (data quemada inicial)
  const [insumosSeleccionados, setInsumosSeleccionados] = useState<any[]>([
    {
      id: 1,
      codigo: "609",
      descripcion: "GASA GRANDE 5CMX10CM PAQUETE X5",
      stock: 797,
      cantidad: 1,
    },
    {
      id: 2,
      codigo: "16",
      descripcion: "CATETER #18",
      stock: 256,
      cantidad: 2,
    },
    {
      id: 3,
      codigo: "584",
      descripcion: "ESPARADRAPO MICROPORE COLOR PIEL",
      stock: 17,
      cantidad: 3,
    },
  ]);

  // Buscar insumos
  const buscarInsumos = () => {
    if (!criterio) {
      setInsumosFiltrados(insumosDisponibles);
      return;
    }

    const filtrados = insumosDisponibles.filter((insumo) => {
      if (buscarPor === "CODIGO") {
        return insumo.codigo.includes(criterio);
      } else {
        return insumo.descripcion
          .toLowerCase()
          .includes(criterio.toLowerCase());
      }
    });
    setInsumosFiltrados(filtrados);
  };

  // Agregar insumo seleccionado
  const agregarInsumo = (insumo: any) => {
    const yaExiste = insumosSeleccionados.find(
      (item) =>
        item.codigo === insumo.codigo && item.descripcion === insumo.descripcion
    );

    if (!yaExiste) {
      setInsumosSeleccionados([
        ...insumosSeleccionados,
        {
          ...insumo,
          cantidad: 1,
          id: Date.now(),
        },
      ]);
    }
  };

  // Eliminar insumo seleccionado
  const eliminarInsumo = (id: number) => {
    setInsumosSeleccionados(
      insumosSeleccionados.filter((item) => item.id !== id)
    );
  };

  // Actualizar cantidad
  const actualizarCantidad = (id: number, cantidad: string) => {
    setInsumosSeleccionados(
      insumosSeleccionados.map((item) =>
        item.id === id ? { ...item, cantidad: parseInt(cantidad) || 0 } : item
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
    console.log("Insumos seleccionados:", insumosSeleccionados);
    alert("Insumos grabados correctamente");
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
        Gestión de Insumos
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
            sx={{ minWidth: 80 }}
          />
        </Box>

        {/* Sección de búsqueda de insumos */}
        <Typography
          sx={{
            fontWeight: "bold",
            color: "#1A3C6D",
            mb: 2,
            fontSize: "1.1rem",
          }}
        >
          Búsqueda de Insumos
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
            onClick={buscarInsumos}
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

        {/* Grid de insumos encontrados */}
        <Box sx={{ mb: 3 }}>
          {/* Header del grid */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "100px 1fr 100px",
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
              STOCK
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
            {insumosFiltrados.map((insumo, index) => (
              <Box
                key={index}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "100px 1fr 100px",
                  gap: 1,
                  p: 1,
                  backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9",
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "#f0f0f0" },
                }}
                onDoubleClick={() => agregarInsumo(insumo)}
              >
                <Typography>{insumo.codigo}</Typography>
                <Typography>{insumo.descripcion}</Typography>
                <Typography sx={{ textAlign: "center" }}>
                  {insumo.stock}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Grid de insumos seleccionados */}
        <Typography
          sx={{
            fontWeight: "bold",
            color: "#1A3C6D",
            mb: 2,
            fontSize: "1.1rem",
          }}
        >
          Insumos Seleccionados
        </Typography>
        <Box>
          {/* Header del grid */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "80px 1fr 80px 80px 100px 80px",
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
              STOCK
            </Typography>
            <Typography sx={{ fontWeight: "bold", textAlign: "center" }}>
              FECHA
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
            {insumosSeleccionados.map((insumo, index) => (
              <Box
                key={insumo.id}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "80px 1fr 80px 80px 100px 80px",
                  gap: 1,
                  p: 1,
                  backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9",
                  alignItems: "center",
                }}
              >
                <Typography>{insumo.codigo}</Typography>
                <Typography>{insumo.descripcion}</Typography>
                <TextField
                  type="number"
                  value={insumo.cantidad}
                  onChange={(e) =>
                    actualizarCantidad(insumo.id, e.target.value)
                  }
                  size="small"
                  sx={{ width: "100%" }}
                />
                <Typography sx={{ textAlign: "center" }}>
                  {insumo.stock}
                </Typography>
                <Typography sx={{ textAlign: "center" }}>
                  {new Date().toLocaleDateString()}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <IconButton
                    color="error"
                    onClick={() => eliminarInsumo(insumo.id)}
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
};

export default InsumosForm;
