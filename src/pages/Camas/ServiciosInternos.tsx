import { useState } from "react";
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

// MOCK DATA PARA SERVICIOS (DATA QUEMADA) - TODOS LOS SERVICIOS INCLUIDOS CON PRECIO 0
const serviciosDisponibles = [
  {
    codigo: "471",
    descripcion: "HABITACION COMPARTIDA (2-C)",
    categoria: "PARTICULARES",
    precio: 45.0,
    tarifaEditable: true,
  },
  {
    codigo: "470",
    descripcion: "HABITACION COMPARTIDA (1-C)",
    categoria: "PARTICULARES",
    precio: 55.0,
    tarifaEditable: true,
  },
  {
    codigo: "1564",
    descripcion: "HABITACION PARTICULAR",
    categoria: "PARTICULARES",
    precio: 75.0,
    tarifaEditable: false, // NO EDITABLE
  },
  {
    codigo: "472",
    descripcion: "HABITACION SUITE (1-C)",
    categoria: "PARTICULARES",
    precio: 95.0,
    tarifaEditable: false, // NO EDITABLE
  },
  {
    codigo: "473",
    descripcion: "HABITACION SUITE (1-C) SEGUROS",
    categoria: "SEGUROS",
    precio: 85.0,
    tarifaEditable: true,
  },
  {
    codigo: "1018",
    descripcion: "EKG ELECTROCARDIOGRAMA",
    categoria: "PARTICULARES",
    precio: 30.0,
    tarifaEditable: false, // NO EDITABLE
  },
  {
    codigo: "502",
    descripcion: "CURACION SIMPLE",
    categoria: "PARTICULARES",
    precio: 20.0,
    tarifaEditable: true,
  },
  {
    codigo: "301",
    descripcion: "CONSULTA MEDICINA GENERAL",
    categoria: "PARTICULARES",
    precio: 40.0,
    tarifaEditable: true,
  },
  // SERVICIOS CON PRECIO 0 - TAMBIÉN SE MUESTRAN
  {
    codigo: "600",
    descripcion: "RADIOGRAFIA TORAX",
    categoria: "PARTICULARES",
    precio: 0,
    tarifaEditable: true,
  },
  {
    codigo: "601",
    descripcion: "LABORATORIO BASICO",
    categoria: "SEGUROS",
    precio: 0,
    tarifaEditable: true,
  },
  {
    codigo: "602",
    descripcion: "ECOGRAFIA ABDOMINAL",
    categoria: "PARTICULARES",
    precio: 0,
    tarifaEditable: false, // NO EDITABLE
  },
  {
    codigo: "603",
    descripcion: "TERAPIA RESPIRATORIA",
    categoria: "SEGUROS",
    precio: 0,
    tarifaEditable: true,
  },
  {
    codigo: "604",
    descripcion: "FISIOTERAPIA",
    categoria: "PARTICULARES",
    precio: 0,
    tarifaEditable: true,
  },
  {
    codigo: "605",
    descripcion: "OXIMETRIA",
    categoria: "SEGUROS",
    precio: 0,
    tarifaEditable: false, // NO EDITABLE
  },
];

export default function ServiciosInternosForm({
  open,
  onClose,
}: ServiciosProps) {
  // ESTADOS PARA DATOS DEL PACIENTE (DATA QUEMADA DESDE CAMA)
  const [hc, setHc] = useState("9952"); // CAMPO DE SOLO LECTURA
  const [nombre, setNombre] = useState("ALCIVAR VALERO GEOVANNY ULICES");
  const [direccion, setDireccion] = useState("RECINTO CONVENTO JUJAN - L");
  const [telefono, setTelefono] = useState("099-888-7777");
  const [edad, setEdad] = useState("50");
  const [categoria, setCategoria] = useState("PARTICULAR"); // NUEVO CAMPO CATEGORIA

  // ESTADOS PARA BÚSQUEDA DE SERVICIOS
  const [buscarPor, setBuscarPor] = useState("CODIGO");
  const [criterio, setCriterio] = useState("");
  // MOSTRAR TODOS LOS SERVICIOS INICIALMENTE (INCLUSO CON PRECIO 0)
  const [serviciosFiltrados, setServiciosFiltrados] =
    useState<any[]>(serviciosDisponibles);

  // USUARIO ACTUAL (SIMULADO)
  const usuarioActual = "DR. PATRICIA MORALES";

  // ESTADO PARA SERVICIOS SELECCIONADOS (DATA QUEMADA INICIAL CON USUARIO)
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState<any[]>([
    {
      id: 1,
      codigo: "1018",
      descripcion: "EKG ELECTROCARDIOGRAMA",
      categoria: "PARTICULARES",
      cantidad: 1,
      precio: 30.0,
      tarifaEditable: false,
      usuario: "DR. CARLOS MENDOZA",
      fechaIngreso: "2025-07-29",
    },
    {
      id: 2,
      codigo: "471",
      descripcion: "HABITACION COMPARTIDA (2-C)",
      categoria: "PARTICULARES",
      cantidad: 1,
      precio: 45.0,
      tarifaEditable: true,
      usuario: "ENF. ANA TORRES",
      fechaIngreso: "2025-07-29",
    },
    {
      id: 3,
      codigo: "502",
      descripcion: "CURACION SIMPLE",
      categoria: "PARTICULARES",
      cantidad: 2,
      precio: 20.0,
      tarifaEditable: true,
      usuario: "DR. LUIS CASTRO",
      fechaIngreso: "2025-07-29",
    },
  ]);

  // BUSCAR SERVICIOS - MOSTRAR TODOS INCLUIDOS LOS DE PRECIO 0
  const buscarServicios = () => {
    if (!criterio) {
      // SI NO HAY CRITERIO, MOSTRAR TODOS LOS SERVICIOS
      setServiciosFiltrados(serviciosDisponibles);
      return;
    }

    const filtrados = serviciosDisponibles.filter((servicio) => {
      if (buscarPor === "CODIGO") {
        return servicio.codigo.includes(criterio);
      } else if (buscarPor === "DESCRIPCION") {
        return servicio.descripcion
          .toLowerCase()
          .includes(criterio.toLowerCase());
      } else if (buscarPor === "CATEGORIA") {
        return servicio.categoria
          .toLowerCase()
          .includes(criterio.toLowerCase());
      }
      return false;
    });
    setServiciosFiltrados(filtrados);
  };

  // AGREGAR SERVICIO SELECCIONADO CON USUARIO
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
          usuario: usuarioActual, // AGREGAR USUARIO ACTUAL
          fechaIngreso: new Date().toISOString().split("T")[0], // FECHA ACTUAL
        },
      ]);
    }
  };

  // ELIMINAR SERVICIO SELECCIONADO
  const eliminarServicio = (id: number) => {
    setServiciosSeleccionados(
      serviciosSeleccionados.filter((item) => item.id !== id)
    );
  };

  // ACTUALIZAR CANTIDAD
  const actualizarCantidad = (id: number, cantidad: string) => {
    setServiciosSeleccionados(
      serviciosSeleccionados.map((item) =>
        item.id === id ? { ...item, cantidad: parseInt(cantidad) || 0 } : item
      )
    );
  };

  // ACTUALIZAR PRECIO (SOLO SI ES EDITABLE)
  const actualizarPrecio = (id: number, precio: string) => {
    setServiciosSeleccionados(
      serviciosSeleccionados.map((item) =>
        item.id === id && item.tarifaEditable
          ? { ...item, precio: parseFloat(precio) || 0 }
          : item
      )
    );
  };

  // CALCULAR TOTAL
  const calcularTotal = () => {
    return serviciosSeleccionados.reduce(
      (total, servicio) => total + servicio.cantidad * servicio.precio,
      0
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
    console.log("SERVICIOS SELECCIONADOS:", serviciosSeleccionados);
    console.log("TOTAL A PAGAR:", calcularTotal().toFixed(2));
    alert("SERVICIOS INTERNOS GRABADOS CORRECTAMENTE");
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
        CARGA DE SERVICIOS INTERNOS
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
          👤 DATOS DEL PACIENTE
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <TextField
            label="HC"
            value={hc}
            disabled // CAMPO DE SOLO LECTURA
            size="small"
            sx={{ 
              minWidth: 120,
              backgroundColor: "#E0E0E0" 
            }}
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

        {/* SECCIÓN DE BÚSQUEDA DE SERVICIOS */}
        <Typography
          sx={{
            fontWeight: "bold",
            color: "#1A3C6D",
            mb: 2,
            fontSize: "1.1rem",
          }}
        >
          BUSQUEDA DE SERVICIOS
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
              <MenuItem value="CATEGORIA">CATEGORIA</MenuItem>
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
            BUSCAR
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              setCriterio("");
              setServiciosFiltrados(serviciosDisponibles);
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

        {/* GRID DE SERVICIOS ENCONTRADOS */}
        <Box sx={{ mb: 3 }}>
          <Typography sx={{ fontSize: "0.9rem", color: "#666", mb: 1 }}>
             <strong>{serviciosFiltrados.length}</strong> SERVICIOS ENCONTRADOS
            (INCLUYENDO PRECIO 0)
          </Typography>
          {/* HEADER DEL GRID */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "80px 1fr 120px 80px 100px",
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
              CATEGORIA
            </Typography>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "0.8rem",
                textAlign: "center",
              }}
            >
              PRECIO
            </Typography>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "0.8rem",
                textAlign: "center",
              }}
            >
              TARIFA
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
            {serviciosFiltrados.map((servicio, index) => (
              <Box
                key={index}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "80px 1fr 120px 80px 100px",
                  gap: 1,
                  p: 1,
                  backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9",
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "#e3f2fd" },
                  // RESALTAR SERVICIOS CON PRECIO 0
                  opacity: servicio.precio === 0 ? 0.7 : 1,
                  borderLeft:
                    servicio.precio === 0 ? "3px solid #ff9800" : "none",
                }}
                onDoubleClick={() => agregarServicio(servicio)}
                title={
                  servicio.precio === 0
                    ? "⚠️ SERVICIO SIN PRECIO DEFINIDO"
                    : "DOBLE CLIC PARA AGREGAR"
                }
              >
                <Typography
                  sx={{ fontSize: "0.8rem", fontFamily: "monospace" }}
                >
                  {servicio.codigo}
                </Typography>
                <Typography sx={{ fontSize: "0.8rem" }}>
                  {servicio.descripcion}
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
                  {servicio.categoria}
                </Typography>
                <Typography
                  sx={{
                    textAlign: "center",
                    fontSize: "0.8rem",
                    color: servicio.precio === 0 ? "#f44336" : "#2e7d32",
                    fontWeight: "bold",
                  }}
                >
                  {servicio.precio === 0 ? "SIN PRECIO" : `$${servicio.precio.toFixed(2)}`}
                </Typography>
                <Typography
                  sx={{
                    textAlign: "center",
                    fontSize: "0.7rem",
                    backgroundColor: servicio.tarifaEditable
                      ? "#e8f5e8"
                      : "#ffebee",
                    padding: "2px 4px",
                    borderRadius: "4px",
                    fontWeight: "bold",
                    color: servicio.tarifaEditable ? "#2e7d32" : "#d32f2f",
                  }}
                >
                  {servicio.tarifaEditable ? "EDITABLE" : "FIJA"}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* GRID DE SERVICIOS SELECCIONADOS CON COLUMNA USUARIO */}
        <Typography
          sx={{
            fontWeight: "bold",
            color: "#1A3C6D",
            mb: 2,
            fontSize: "1.1rem",
          }}
        >
           SERVICIOS SELECCIONADOS
        </Typography>
        <Box>
          {/* HEADER DEL GRID CON USUARIO */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "70px 1fr 70px 90px 100px 100px 120px 60px",
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
              PRECIO
            </Typography>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "0.8rem",
                textAlign: "center",
              }}
            >
              SUBTOTAL
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
            {serviciosSeleccionados.length === 0 ? (
              <Box
                sx={{
                  p: 3,
                  textAlign: "center",
                  backgroundColor: "#fff",
                  color: "#666",
                }}
              >
                <Typography sx={{ fontSize: "0.9rem" }}>
                  ℹ️ NO HAY SERVICIOS SELECCIONADOS. HAGA DOBLE CLIC EN UN
                  SERVICIO PARA AGREGARLO.
                </Typography>
              </Box>
            ) : (
              serviciosSeleccionados.map((servicio, index) => (
                <Box
                  key={servicio.id}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "70px 1fr 70px 90px 100px 100px 120px 60px",
                    gap: 1,
                    p: 1,
                    backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{ fontSize: "0.8rem", fontFamily: "monospace" }}
                  >
                    {servicio.codigo}
                  </Typography>
                  <Typography sx={{ fontSize: "0.8rem" }}>
                    {servicio.descripcion}
                  </Typography>
                  <TextField
                    type="number"
                    value={servicio.cantidad}
                    onChange={(e) =>
                      actualizarCantidad(servicio.id, e.target.value)
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
                  <TextField
                    type="number"
                    value={servicio.precio}
                    onChange={(e) =>
                      actualizarPrecio(servicio.id, e.target.value)
                    }
                    disabled={!servicio.tarifaEditable} // SOLO EDITABLE SI tarifaEditable ES TRUE
                    size="small"
                    sx={{
                      width: "100%",
                      "& .MuiInputBase-input": {
                        textAlign: "center",
                        fontSize: "0.8rem",
                      },
                      backgroundColor: servicio.tarifaEditable
                        ? "#fff"
                        : "#f5f5f5",
                    }}
                    inputProps={{
                      step: "0.01",
                      min: "0",
                    }}
                    title={
                      servicio.tarifaEditable
                        ? "PRECIO EDITABLE"
                        : "PRECIO FIJO - NO EDITABLE"
                    }
                  />
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontSize: "0.8rem",
                      fontWeight: "bold",
                      color: "#2e7d32",
                    }}
                  >
                    ${(servicio.cantidad * servicio.precio).toFixed(2)}
                  </Typography>
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontSize: "0.75rem",
                      fontFamily: "monospace",
                    }}
                  >
                    {servicio.fechaIngreso}
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
                    {servicio.usuario}
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <IconButton
                      color="error"
                      onClick={() => eliminarServicio(servicio.id)}
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

        {/* RESUMEN ESTADÍSTICO Y TOTAL */}
        <Box
          sx={{
            mt: 2,
            p: 2,
            backgroundColor: "#f0f8ff",
            borderRadius: "8px",
            border: "1px solid #e3f2fd",
          }}
        >
          
          <Typography
            sx={{
              fontSize: "1.1rem",
              fontWeight: "bold",
              color: "#2e7d32",
              textAlign: "right",
              mt: 1,
            }}
          >
             TOTAL A PAGAR: ${calcularTotal().toFixed(2)}
          </Typography>
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
          CERRAR
        </Button>
        <Button
          variant="contained"
          onClick={handleGrabar}
          disabled={serviciosSeleccionados.length === 0}
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
          GRABAR ({serviciosSeleccionados.length})
        </Button>
      </DialogActions>
    </Dialog>
  );
}