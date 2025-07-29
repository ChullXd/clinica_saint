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

// MOCK DATA PARA INSUMOS (DATA QUEMADA) - TODOS LOS INSUMOS INCLUIDOS CON STOCK 0
const insumosDisponibles = [
  {
    codigo: "30",
    descripcion: "CEFIXIN 500 AMPOLLAS INYECTABLES",
    stock: 131,
    farmacia: "EMERGENCIA",
  },
  {
    codigo: "31",
    descripcion: "GUANTES ESTERILES #6",
    stock: 626,
    farmacia: "EMERGENCIA",
  },
  {
    codigo: "609",
    descripcion: "GASA GRANDE 5CMX10CM PAQUETE X5",
    stock: 797,
    farmacia: "EMERGENCIA",
  },
  {
    codigo: "16",
    descripcion: "CATETER #18",
    stock: 256,
    farmacia: "QUIROFANO",
  },
  {
    codigo: "584",
    descripcion: "ESPARADRAPO MICROPORE COLOR PIEL",
    stock: 17,
    farmacia: "QUIROFANO",
  },
  {
    codigo: "102",
    descripcion: "JERINGA 5ML DESECHABLE",
    stock: 450,
    farmacia: "UCI",
  },
  {
    codigo: "203",
    descripcion: "SUERO FISIOLOGICO 500ML",
    stock: 89,
    farmacia: "UCI",
  },
  {
    codigo: "304",
    descripcion: "ALCOHOL ANTISEPTICO 70%",
    stock: 234,
    farmacia: "FARMACIA CENTRAL",
  },
  // INSUMOS CON STOCK 0 - TAMBIÉN SE MUESTRAN
  {
    codigo: "505",
    descripcion: "VENDAS ELASTICAS 10CM",
    stock: 0,
    farmacia: "EMERGENCIA",
  },
  {
    codigo: "606",
    descripcion: "MASCARILLAS QUIRURGICAS",
    stock: 0,
    farmacia: "QUIROFANO",
  },
  {
    codigo: "707",
    descripcion: "SONDA FOLEY #16",
    stock: 0,
    farmacia: "UCI",
  },
  {
    codigo: "808",
    descripcion: "EQUIPO DE VENOCLISIS",
    stock: 0,
    farmacia: "FARMACIA CENTRAL",
  },
  {
    codigo: "909",
    descripcion: "TERMOMETRO DIGITAL",
    stock: 0,
    farmacia: "EMERGENCIA",
  },
  {
    codigo: "1010",
    descripcion: "OXIMETRO DE PULSO",
    stock: 0,
    farmacia: "QUIROFANO",
  },
];

const InsumosForm: React.FC<InsumosProps> = ({ open, onClose }) => {
  // ESTADOS PARA BÚSQUEDA DE PACIENTE (DATA QUEMADA)
  const [hc, setHc] = useState("12345");
  const [nombre, setNombre] = useState("JUAN PEREZ GARCIA");
  const [direccion, setDireccion] = useState("AV. PRINCIPAL 123, QUITO");
  const [telefono, setTelefono] = useState("0999888777");
  const [edad, setEdad] = useState("35");
  const [categoria, setCategoria] = useState("PARTICULAR");

  // ESTADOS PARA BÚSQUEDA DE INSUMOS
  const [buscarPor, setBuscarPor] = useState("CODIGO");
  const [criterio, setCriterio] = useState("");
  // MOSTRAR TODOS LOS INSUMOS INICIALMENTE (INCLUSO CON STOCK 0)
  const [insumosFiltrados, setInsumosFiltrados] = useState<any[]>(
    insumosDisponibles
  );

  // USUARIO ACTUAL (SIMULADO)
  const usuarioActual = "DR. MARIA GONZALEZ";

  // ESTADO PARA INSUMOS SELECCIONADOS (DATA QUEMADA INICIAL CON USUARIO)
  const [insumosSeleccionados, setInsumosSeleccionados] = useState<any[]>([
    {
      id: 1,
      codigo: "609",
      descripcion: "GASA GRANDE 5CMX10CM PAQUETE X5",
      stock: 797,
      cantidad: 1,
      farmacia: "EMERGENCIA",
      usuario: "DR. CARLOS MENDOZA",
      fechaIngreso: "2025-07-29",
    },
    {
      id: 2,
      codigo: "16",
      descripcion: "CATETER #18",
      stock: 256,
      cantidad: 2,
      farmacia: "QUIROFANO",
      usuario: "ENF. ANA TORRES",
      fechaIngreso: "2025-07-29",
    },
    {
      id: 3,
      codigo: "584",
      descripcion: "ESPARADRAPO MICROPORE COLOR PIEL",
      stock: 17,
      cantidad: 3,
      farmacia: "QUIROFANO",
      usuario: "DR. LUIS CASTRO",
      fechaIngreso: "2025-07-29",
    },
  ]);

  // BUSCAR INSUMOS - MOSTRAR TODOS INCLUIDOS LOS DE STOCK 0
  const buscarInsumos = () => {
    if (!criterio) {
      // SI NO HAY CRITERIO, MOSTRAR TODOS LOS INSUMOS
      setInsumosFiltrados(insumosDisponibles);
      return;
    }

    const filtrados = insumosDisponibles.filter((insumo) => {
      if (buscarPor === "CODIGO") {
        return insumo.codigo.includes(criterio);
      } else if (buscarPor === "DESCRIPCION") {
        return insumo.descripcion
          .toLowerCase()
          .includes(criterio.toLowerCase());
      } else if (buscarPor === "FARMACIA") {
        return insumo.farmacia
          .toLowerCase()
          .includes(criterio.toLowerCase());
      }
      return false;
    });
    setInsumosFiltrados(filtrados);
  };

  // AGREGAR INSUMO SELECCIONADO CON USUARIO
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
          usuario: usuarioActual, // AGREGAR USUARIO ACTUAL
          fechaIngreso: new Date().toISOString().split("T")[0], // FECHA ACTUAL
        },
      ]);
    }
  };

  // ELIMINAR INSUMO SELECCIONADO
  const eliminarInsumo = (id: number) => {
    setInsumosSeleccionados(
      insumosSeleccionados.filter((item) => item.id !== id)
    );
  };

  // ACTUALIZAR CANTIDAD
  const actualizarCantidad = (id: number, cantidad: string) => {
    setInsumosSeleccionados(
      insumosSeleccionados.map((item) =>
        item.id === id ? { ...item, cantidad: parseInt(cantidad) || 0 } : item
      )
    );
  };

  // GRABAR
  const handleGrabar = () => {
    console.log("DATOS DEL PACIENTE:", {
      hc,
      nombre,
      direccion,
      telefono,
      edad,
      categoria,
    });
    console.log("INSUMOS SELECCIONADOS:", insumosSeleccionados);
    alert("INSUMOS GRABADOS CORRECTAMENTE");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
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
         CARGA DE INSUMOS 
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
        {/* SECCIÓN DE DATOS DEL PACIENTE */}
        <Typography
          sx={{
            fontWeight: "bold",
            color: "#1A3C6D",
            mb: 2,
            fontSize: "1.1rem",
          }}
        >
           DATOS DEL PACIENTE
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <TextField
            label="HC"
            value={hc}
            disabled
            onChange={(e) => setHc(e.target.value)}
            size="small"
            sx={{ minWidth: 120 }}
          />
          <TextField
            label="NOMBRE"
            value={nombre}
            disabled
            size="small"
            sx={{ flex: 1 }}
          />
          <TextField
            label="DIRECCION"
            value={direccion}
            disabled
            size="small"
            sx={{ flex: 1 }}
          />
          <TextField
            label="TELEFONO"
            value={telefono}
            disabled
            size="small"
            sx={{ minWidth: 140 }}
          />
          <TextField
            label="EDAD"
            value={edad}
            disabled
            size="small"
            sx={{ minWidth: 80 }}
          />
          <TextField
            label="CATEGORIA"
            value={categoria}
            disabled
            size="small"
            sx={{
              minWidth: 120,
              "& .MuiInputBase-input": {
                color: categoria === "PARTICULAR" ? "#1976d2" : "#d32f2f",
                fontWeight: "bold",
              },
            }}
          />
        </Box>

        {/* SECCIÓN DE BÚSQUEDA DE INSUMOS */}
        <Typography
          sx={{
            fontWeight: "bold",
            color: "#1A3C6D",
            mb: 2,
            fontSize: "1.1rem",
          }}
        >
           BUSQUEDA DE INSUMOS
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>BUSCAR POR</InputLabel>
            <Select
              value={buscarPor}
              label="BUSCAR POR"
              onChange={(e) => setBuscarPor(e.target.value)}
            >
              <MenuItem value="CODIGO">CODIGO</MenuItem>
              <MenuItem value="DESCRIPCION">DESCRIPCION</MenuItem>
              <MenuItem value="FARMACIA">FARMACIA</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="CRITERIO DE BUSQUEDA"
            value={criterio}
            onChange={(e) => setCriterio(e.target.value)}
            size="small"
            sx={{ flex: 1 }}
            placeholder="INGRESE CRITERIO PARA FILTRAR..."
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
            BUSCAR
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              setCriterio("");
              setInsumosFiltrados(insumosDisponibles);
            }}
            sx={{
              borderColor: "#1A3C6D",
              color: "#1A3C6D",
              borderRadius: 2,
              px: 3,
              textTransform: "none",
              "&:hover": { borderColor: "#274472", color: "#274472" },
            }}
          >
            MOSTRAR TODOS
          </Button>
        </Box>

        {/* GRID DE INSUMOS ENCONTRADOS CON COLUMNA FARMACIA */}
        <Box sx={{ mb: 3 }}>
          <Typography sx={{ fontSize: "0.9rem", color: "#666", mb: 1 }}>
             <strong>{insumosFiltrados.length}</strong> INSUMOS ENCONTRADOS
            (INCLUYENDO STOCK 0)
          </Typography>
          {/* HEADER DEL GRID CON FARMACIA */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "80px 1fr 120px 80px",
              gap: 1,
              p: 1,
              backgroundColor: "#e3eaf6",
              borderRadius: "4px 4px 0 0",
              border: "1px solid #ddd",
            }}
          >
            <Typography sx={{ fontWeight: "bold", fontSize: "0.8rem" }}>
              CODIGO
            </Typography>
            <Typography sx={{ fontWeight: "bold", fontSize: "0.8rem" }}>
              DESCRIPCION
            </Typography>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "0.8rem",
                textAlign: "center",
              }}
            >
              FARMACIA
            </Typography>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "0.8rem",
                textAlign: "center",
              }}
            >
              STOCK
            </Typography>
          </Box>
          {/* FILAS DEL GRID */}
          <Box
            sx={{
              maxHeight: 250,
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
                  gridTemplateColumns: "80px 1fr 120px 80px",
                  gap: 1,
                  p: 1,
                  backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9",
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "#e3f2fd" },
                  // RESALTAR INSUMOS SIN STOCK
                  opacity: insumo.stock === 0 ? 0.7 : 1,
                  borderLeft:
                    insumo.stock === 0 ? "3px solid #ff9800" : "none",
                }}
                onDoubleClick={() => agregarInsumo(insumo)}
                title={
                  insumo.stock === 0
                    ? "⚠️ SIN STOCK DISPONIBLE"
                    : "DOBLE CLIC PARA AGREGAR"
                }
              >
                <Typography
                  sx={{ fontSize: "0.8rem", fontFamily: "monospace" }}
                >
                  {insumo.codigo}
                </Typography>
                <Typography sx={{ fontSize: "0.8rem" }}>
                  {insumo.descripcion}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    textAlign: "center",
                    backgroundColor: "#f0f0f0",
                    padding: "2px 4px",
                    borderRadius: "4px",
                    fontWeight: "bold",
                  }}
                >
                  {insumo.farmacia}
                </Typography>
                <Typography
                  sx={{
                    textAlign: "center",
                    fontSize: "0.8rem",
                    color: insumo.stock === 0 ? "#f44336" : "#2e7d32",
                    fontWeight: "bold",
                  }}
                >
                  {insumo.stock === 0 ? "SIN STOCK" : insumo.stock}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* GRID DE INSUMOS SELECCIONADOS CON COLUMNA USUARIO */}
        <Typography
          sx={{
            fontWeight: "bold",
            color: "#1A3C6D",
            mb: 2,
            fontSize: "1.1rem",
          }}
        >
          INSUMOS SELECCIONADOS
        </Typography>
        <Box>
          {/* HEADER DEL GRID CON USUARIO */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "70px 1fr 70px 70px 100px 120px 60px",
              gap: 1,
              p: 1,
              backgroundColor: "#e3eaf6",
              borderRadius: "4px 4px 0 0",
              border: "1px solid #ddd",
            }}
          >
            <Typography sx={{ fontWeight: "bold", fontSize: "0.8rem" }}>
              CODIGO
            </Typography>
            <Typography sx={{ fontWeight: "bold", fontSize: "0.8rem" }}>
              DESCRIPCION
            </Typography>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "0.8rem",
                textAlign: "center",
              }}
            >
              CANT.
            </Typography>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "0.8rem",
                textAlign: "center",
              }}
            >
              STOCK
            </Typography>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "0.8rem",
                textAlign: "center",
              }}
            >
              FECHA
            </Typography>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "0.8rem",
                textAlign: "center",
              }}
            >
              USUARIO
            </Typography>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "0.8rem",
                textAlign: "center",
              }}
            >
              ACCION
            </Typography>
          </Box>
          {/* FILAS DEL GRID */}
          <Box
            sx={{
              border: "1px solid #ddd",
              borderTop: "none",
              borderRadius: "0 0 4px 4px",
              maxHeight: 300,
              overflowY: "auto",
            }}
          >
            {insumosSeleccionados.length === 0 ? (
              <Box
                sx={{
                  p: 3,
                  textAlign: "center",
                  backgroundColor: "#fff",
                  color: "#666",
                }}
              >
                <Typography sx={{ fontSize: "0.9rem" }}>
                  ℹ️ NO HAY INSUMOS SELECCIONADOS. HAGA DOBLE CLIC EN UN INSUMO
                  PARA AGREGARLO.
                </Typography>
              </Box>
            ) : (
              insumosSeleccionados.map((insumo, index) => (
                <Box
                  key={insumo.id}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "70px 1fr 70px 70px 100px 120px 60px",
                    gap: 1,
                    p: 1,
                    backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontSize: "0.8rem", fontFamily: "monospace" }}>
                    {insumo.codigo}
                  </Typography>
                  <Typography sx={{ fontSize: "0.8rem" }}>
                    {insumo.descripcion}
                  </Typography>
                  <TextField
                    type="number"
                    value={insumo.cantidad}
                    onChange={(e) =>
                      actualizarCantidad(insumo.id, e.target.value)
                    }
                    size="small"
                    sx={{
                      width: "100%",
                      "& .MuiInputBase-input": {
                        textAlign: "center",
                        fontSize: "0.8rem",
                      },
                    }}
                    inputProps={{ min: 1 }}
                  />
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontSize: "0.8rem",
                      color: insumo.stock === 0 ? "#f44336" : "#2e7d32",
                      fontWeight: "bold",
                    }}
                  >
                    {insumo.stock}
                  </Typography>
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontSize: "0.75rem",
                      fontFamily: "monospace",
                    }}
                  >
                    {insumo.fechaIngreso}
                  </Typography>
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontSize: "0.7rem",
                      backgroundColor: "#e8f5e8",
                      padding: "2px 4px",
                      borderRadius: "4px",
                      fontWeight: "bold",
                      color: "#2e7d32",
                    }}
                  >
                    {insumo.usuario}
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <IconButton
                      color="error"
                      onClick={() => eliminarInsumo(insumo.id)}
                      size="small"
                    >
                      <DeleteIcon sx={{ fontSize: "1rem" }} />
                    </IconButton>
                  </Box>
                </Box>
              ))
            )}
          </Box>
        </Box>

        {/* RESUMEN ESTADÍSTICO */}
       
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
          CERRAR
        </Button>
        <Button
          variant="contained"
          onClick={handleGrabar}
          disabled={insumosSeleccionados.length === 0}
          sx={{
            background: "#1A3C6D",
            borderRadius: 2,
            px: 3,
            textTransform: "none",
            fontWeight: "bold",
            "&:hover": { background: "#274472" },
            "&:disabled": { background: "#ccc" },
          }}
        >
          GRABAR ({insumosSeleccionados.length})
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InsumosForm;