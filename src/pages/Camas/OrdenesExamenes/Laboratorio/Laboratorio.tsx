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
  categoria: string;
  precio: number;
  seleccionado: boolean;
}

interface LaboratorioProps {
  datosPaciente?: {
    hc: string;
    nombre: string;
    direccion: string;
    telefono: string;
    edad: string;
    categoria: string;
  };
  datosProfesional?: {
    cedula: string;
    nombre: string;
  };
  onConfirmarEliminacion?: (tipo: string, item?: string) => Promise<boolean>;
}

const Laboratorio: React.FC<LaboratorioProps> = ({
  datosPaciente,
  datosProfesional,
  onConfirmarEliminacion,
}) => {
  // ESTADOS PARA DATOS DEL PACIENTE (PRECARGADOS DESDE PROPS - SOLO LECTURA)
  const [hc, setHc] = useState(datosPaciente?.hc || "12345");
  const [nombre, setNombre] = useState(datosPaciente?.nombre || "JUAN PEREZ GARCIA");
  const [direccion, setDireccion] = useState(datosPaciente?.direccion || "AV. PRINCIPAL 123, QUITO");
  const [telefono, setTelefono] = useState(datosPaciente?.telefono || "0999888777");
  const [edad, setEdad] = useState(datosPaciente?.edad || "35");
  const [categoria, setCategoria] = useState(datosPaciente?.categoria || "PARTICULAR");
  const [sala, setSala] = useState("SALA 1");
  const [cama, setCama] = useState("CAMA 12");
  const [numeroArchivo, setNumeroArchivo] = useState("2024-LAB-001234");

  // DATOS DEL PROFESIONAL (DESDE PROPS - SOLO LECTURA)
  const [cedulaMedico, setCedulaMedico] = useState(datosProfesional?.cedula || "1234567890");
  const [nombreMedico, setNombreMedico] = useState(datosProfesional?.nombre || "DR. CARLOS EDUARDO MENDOZA SILVA");

  // ESTADOS PARA ANEXO 1
  const [servicio, setServicio] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [prioridad, setPrioridad] = useState("");

  // ESTADOS PARA FECHA Y HORA
  const [fechaGeneracion, setFechaGeneracion] = useState("");
  const [horaGeneracion, setHoraGeneracion] = useState("");

  // ESTADOS PARA BÚSQUEDA DE EXÁMENES
  const [buscarPor, setBuscarPor] = useState("CODIGO");
  const [criterio, setCriterio] = useState("");
  const [examenesDisponibles, setExamenesDisponibles] = useState<ExamenItem[]>([]);
  const [examenesSeleccionados, setExamenesSeleccionados] = useState<ExamenItem[]>([]);

  // MOCK DATA PARA EXÁMENES DE LABORATORIO - TODOS LOS EXÁMENES INCLUIDOS CON PRECIO 0
  const examenesIniciales: ExamenItem[] = [
    {
      id: 1,
      codigo: "LAB001",
      descripcion: "HEMOGRAMA COMPLETO",
      categoria: "HEMATOLOGIA",
      precio: 15.0,
      seleccionado: false,
    },
    {
      id: 2,
      codigo: "LAB002",
      descripcion: "GLUCOSA EN SANGRE",
      categoria: "BIOQUIMICA",
      precio: 8.0,
      seleccionado: false,
    },
    {
      id: 3,
      codigo: "LAB003",
      descripcion: "UREA Y CREATININA",
      categoria: "BIOQUIMICA",
      precio: 12.0,
      seleccionado: false,
    },
    {
      id: 4,
      codigo: "LAB004",
      descripcion: "PERFIL LIPIDICO",
      categoria: "BIOQUIMICA",
      precio: 20.0,
      seleccionado: false,
    },
    {
      id: 5,
      codigo: "LAB005",
      descripcion: "EXAMEN GENERAL DE ORINA",
      categoria: "URINALISIS",
      precio: 10.0,
      seleccionado: false,
    },
    {
      id: 6,
      codigo: "LAB006",
      descripcion: "CULTIVO DE ORINA",
      categoria: "MICROBIOLOGIA",
      precio: 25.0,
      seleccionado: false,
    },
    // EXÁMENES CON PRECIO 0 - TAMBIÉN SE MUESTRAN
    {
      id: 7,
      codigo: "LAB007",
      descripcion: "PROTEINAS TOTALES",
      categoria: "BIOQUIMICA",
      precio: 0,
      seleccionado: false,
    },
    {
      id: 8,
      codigo: "LAB008",
      descripcion: "TRANSAMINASAS (TGO-TGP)",
      categoria: "BIOQUIMICA",
      precio: 0,
      seleccionado: false,
    },
    {
      id: 9,
      codigo: "LAB009",
      descripcion: "TIEMPO DE COAGULACION",
      categoria: "HEMATOLOGIA",
      precio: 0,
      seleccionado: false,
    },
    {
      id: 10,
      codigo: "LAB010",
      descripcion: "ELECTROLITOS (Na, K, Cl)",
      categoria: "BIOQUIMICA",
      precio: 0,
      seleccionado: false,
    },
  ];

  const especialidades = [
    "MEDICINA INTERNA",
    "CIRUGIA GENERAL",
    "PEDIATRIA",
    "GINECOLOGIA",
    "CARDIOLOGIA",
    "NEUROLOGIA",
    "ANESTESIOLOGIA",
    "EMERGENCIA",
  ];

  // EFECTOS
  useEffect(() => {
    const ahora = new Date();
    const fechaActual = ahora.toISOString().split("T")[0];
    const horaActual = ahora.toTimeString().slice(0, 5);

    setFechaGeneracion(fechaActual);
    setHoraGeneracion(horaActual);
    // MOSTRAR TODOS LOS EXÁMENES INICIALMENTE (INCLUSO CON PRECIO 0)
    setExamenesDisponibles(examenesIniciales);
  }, []);

  // BUSCAR EXÁMENES - MOSTRAR TODOS INCLUIDOS LOS DE PRECIO 0
  const buscarExamenes = () => {
    if (!criterio) {
      // SI NO HAY CRITERIO, MOSTRAR TODOS LOS EXÁMENES
      setExamenesDisponibles(examenesIniciales);
      return;
    }

    const filtrados = examenesIniciales.filter((examen) => {
      if (buscarPor === "CODIGO") {
        return examen.codigo.includes(criterio);
      } else if (buscarPor === "DESCRIPCION") {
        return examen.descripcion
          .toLowerCase()
          .includes(criterio.toLowerCase());
      } else if (buscarPor === "CATEGORIA") {
        return examen.categoria
          .toLowerCase()
          .includes(criterio.toLowerCase());
      }
      return false;
    });
    setExamenesDisponibles(filtrados);
  };

  // AGREGAR EXAMEN SELECCIONADO
  const seleccionarExamen = (examen: ExamenItem) => {
    if (!examenesSeleccionados.find((e) => e.id === examen.id)) {
      setExamenesSeleccionados([
        ...examenesSeleccionados,
        { ...examen, seleccionado: true },
      ]);
    }
  };

  // ELIMINAR EXAMEN SELECCIONADO CON CONFIRMACIÓN
  const eliminarExamenSeleccionado = async (id: number) => {
    const examen = examenesSeleccionados.find((e) => e.id === id);
    
    if (onConfirmarEliminacion && examen) {
      const confirmado = await onConfirmarEliminacion("examen", examen.descripcion);
      if (confirmado) {
        setExamenesSeleccionados(examenesSeleccionados.filter((e) => e.id !== id));
      }
    } else {
      // FALLBACK SI NO HAY FUNCIÓN DE CONFIRMACIÓN
      const confirmado = window.confirm(`¿ESTÁ SEGURO QUE DESEA ELIMINAR EL EXAMEN: "${examen?.descripcion}"?`);
      if (confirmado) {
        setExamenesSeleccionados(examenesSeleccionados.filter((e) => e.id !== id));
      }
    }
  };

  // ACTUALIZAR COMENTARIO
  const actualizarComentario = (id: number, comentario: string) => {
    setExamenesSeleccionados(
      examenesSeleccionados.map((examen) =>
        examen.id === id ? { ...examen, comentario } : examen
      )
    );
  };

  // ELIMINAR ORDEN COMPLETA CON CONFIRMACIÓN
  const handleEliminarOrden = async () => {
    if (onConfirmarEliminacion) {
      const confirmado = await onConfirmarEliminacion("orden", "ORDEN DE LABORATORIO");
      if (confirmado) {
        console.log("ORDEN DE LABORATORIO ELIMINADA");
        // LIMPIAR FORMULARIO
        setExamenesSeleccionados([]);
        setServicio("");
        setEspecialidad("");
        setPrioridad("");
        alert("ORDEN DE LABORATORIO ELIMINADA CORRECTAMENTE");
      }
    } else {
      // FALLBACK SI NO HAY FUNCIÓN DE CONFIRMACIÓN
      const confirmado = window.confirm("¿ESTÁ SEGURO QUE DESEA ELIMINAR TODA LA ORDEN DE LABORATORIO?");
      if (confirmado) {
        setExamenesSeleccionados([]);
        setServicio("");
        setEspecialidad("");
        setPrioridad("");
        alert("ORDEN DE LABORATORIO ELIMINADA CORRECTAMENTE");
      }
    }
  };

  // GUARDAR ORDEN
  const handleGuardar = () => {
    console.log("ORDEN DE LABORATORIO GUARDADA:", {
      hc,
      nombre,
      servicio,
      especialidad,
      prioridad,
      examenesSeleccionados,
    });
    alert("ORDEN DE LABORATORIO GUARDADA EXITOSAMENTE");
  };

  return (
    <Box sx={{ p: 1.5 }}>
      {/* SECCIÓN DE DATOS DEL PACIENTE - LETRAS MÁS PEQUEÑAS */}
      <Typography
        sx={{
          fontWeight: "bold",
          color: "#1A3C6D",
          mb: 1.5,
          fontSize: "0.9rem", // REDUCIDO DE 1.1rem
        }}
      >
        DATOS DEL PACIENTE
      </Typography>
      <Box sx={{ display: "flex", gap: 1.5, mb: 2.5 }}>
        <TextField
          label="HC"
          value={hc}
          disabled
          size="small"
          sx={{ 
            minWidth: 100,
            backgroundColor: "#E0E0E0",
            '& .MuiInputLabel-root': { fontSize: '0.7rem' }, // LABEL MÁS PEQUEÑO
            '& .MuiInputBase-input': { fontSize: '0.7rem' }, // INPUT MÁS PEQUEÑO
          }}
        />
        <TextField
          label="NOMBRE"
          value={nombre}
          disabled
          size="small"
          sx={{ 
            flex: 1,
            '& .MuiInputLabel-root': { fontSize: '0.7rem' },
            '& .MuiInputBase-input': { fontSize: '0.7rem' },
          }}
        />
        <TextField
          label="DIRECCION"
          value={direccion}
          disabled
          size="small"
          sx={{ 
            flex: 1,
            '& .MuiInputLabel-root': { fontSize: '0.7rem' },
            '& .MuiInputBase-input': { fontSize: '0.7rem' },
          }}
        />
        <TextField
          label="TELEFONO"
          value={telefono}
          disabled
          size="small"
          sx={{ 
            minWidth: 120,
            '& .MuiInputLabel-root': { fontSize: '0.7rem' },
            '& .MuiInputBase-input': { fontSize: '0.7rem' },
          }}
        />
        <TextField
          label="EDAD"
          value={edad}
          disabled
          size="small"
          sx={{ 
            minWidth: 70,
            '& .MuiInputLabel-root': { fontSize: '0.7rem' },
            '& .MuiInputBase-input': { fontSize: '0.7rem' },
          }}
        />
        <TextField
          label="CATEGORIA"
          value={categoria}
          disabled
          size="small"
          sx={{
            minWidth: 100,
            '& .MuiInputLabel-root': { fontSize: '0.7rem' },
            "& .MuiInputBase-input": {
              fontSize: '0.7rem',
              color: categoria === "PARTICULAR" ? "#1976d2" : "#d32f2f",
              fontWeight: "bold",
            },
          }}
        />
      </Box>

      {/* DATOS ADICIONALES DEL PACIENTE */}
      <Box sx={{ display: "flex", gap: 1.5, mb: 2.5 }}>
        <TextField
          label="NUMERO DE ARCHIVO"
          value={numeroArchivo}
          disabled
          size="small"
          sx={{ 
            width: 180,
            '& .MuiInputLabel-root': { fontSize: '0.7rem' },
            '& .MuiInputBase-input': { fontSize: '0.7rem' },
          }}
        />
        <TextField
          label="SALA"
          value={sala}
          disabled
          size="small"
          sx={{ 
            width: 90,
            '& .MuiInputLabel-root': { fontSize: '0.7rem' },
            '& .MuiInputBase-input': { fontSize: '0.7rem' },
          }}
        />
        <TextField
          label="CAMA"
          value={cama}
          disabled
          size="small"
          sx={{ 
            width: 90,
            '& .MuiInputLabel-root': { fontSize: '0.7rem' },
            '& .MuiInputBase-input': { fontSize: '0.7rem' },
          }}
        />
      </Box>

      {/* ANEXO 1 - INFORMACIÓN DE LA ORDEN */}
      <Typography
        sx={{
          fontWeight: "bold",
          color: "#1A3C6D",
          mb: 1.5,
          fontSize: "0.9rem", // REDUCIDO
        }}
      >
        INFORMACION DE LA ORDEN
      </Typography>
      <Box sx={{ display: "flex", gap: 1.5, mb: 2.5, flexWrap: "wrap" }}>
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel sx={{ fontSize: '0.7rem' }}>SERVICIO</InputLabel>
          <Select
            value={servicio}
            label="SERVICIO"
            onChange={(e) => setServicio(e.target.value)}
            sx={{
              '& .MuiSelect-select': { fontSize: '0.7rem' },
              '& .MuiMenuItem-root': { fontSize: '0.7rem' },
            }}
          >
            <MenuItem value="EMERGENCIA" sx={{ fontSize: '0.7rem' }}>EMERGENCIA</MenuItem>
            <MenuItem value="CONSULTA EXTERNA" sx={{ fontSize: '0.7rem' }}>CONSULTA EXTERNA</MenuItem>
            <MenuItem value="HOSPITALIZACION" sx={{ fontSize: '0.7rem' }}>HOSPITALIZACION</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel sx={{ fontSize: '0.7rem' }}>ESPECIALIDAD</InputLabel>
          <Select
            value={especialidad}
            label="ESPECIALIDAD"
            onChange={(e) => setEspecialidad(e.target.value)}
            sx={{
              '& .MuiSelect-select': { fontSize: '0.7rem' },
            }}
          >
            {especialidades.map((esp) => (
              <MenuItem key={esp} value={esp} sx={{ fontSize: '0.7rem' }}>
                {esp}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 130 }}>
          <InputLabel sx={{ fontSize: '0.7rem' }}>PRIORIDAD</InputLabel>
          <Select
            value={prioridad}
            label="PRIORIDAD"
            onChange={(e) => setPrioridad(e.target.value)}
            sx={{
              '& .MuiSelect-select': { fontSize: '0.7rem' },
            }}
          >
            <MenuItem value="URGENTE" sx={{ fontSize: '0.7rem' }}>URGENTE</MenuItem>
            <MenuItem value="RUTINA" sx={{ fontSize: '0.7rem' }}>RUTINA</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* SECCIÓN DE DATOS DEL PROFESIONAL */}
      <Typography
        sx={{
          fontWeight: "bold",
          color: "#1A3C6D",
          mb: 1.5,
          fontSize: "0.9rem", // REDUCIDO
        }}
      >
         DATOS DEL PROFESIONAL
      </Typography>
      <Box sx={{ display: "flex", gap: 1.5, mb: 2.5, flexWrap: "wrap" }}>
        <TextField
          label="FECHA GENERACION"
          type="date"
          value={fechaGeneracion}
          onChange={(e) => setFechaGeneracion(e.target.value)}
          size="small"
          sx={{ 
            width: 170,
            '& .MuiInputLabel-root': { fontSize: '0.7rem' },
            '& .MuiInputBase-input': { fontSize: '0.7rem' },
          }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="HORA GENERACION"
          type="time"
          value={horaGeneracion}
          onChange={(e) => setHoraGeneracion(e.target.value)}
          size="small"
          sx={{ 
            width: 150,
            '& .MuiInputLabel-root': { fontSize: '0.7rem' },
            '& .MuiInputBase-input': { fontSize: '0.7rem' },
          }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="CEDULA MEDICO"
          value={cedulaMedico}
          disabled
          size="small"
          sx={{ 
            width: 130,
            backgroundColor: "#E0E0E0",
            '& .MuiInputLabel-root': { fontSize: '0.7rem' },
            '& .MuiInputBase-input': { fontSize: '0.7rem' },
          }}
        />
        <TextField
          label="NOMBRE DEL MEDICO"
          value={nombreMedico}
          disabled
          size="small"
          sx={{ 
            flex: 1,
            minWidth: 250,
            backgroundColor: "#E0E0E0",
            '& .MuiInputLabel-root': { fontSize: '0.7rem' },
            '& .MuiInputBase-input': { fontSize: '0.7rem' },
          }}
        />
      </Box>

      {/* SECCIÓN DE BÚSQUEDA DE EXÁMENES */}
      <Typography
        sx={{
          fontWeight: "bold",
          color: "#1A3C6D",
          mb: 1.5,
          fontSize: "0.9rem", // REDUCIDO
        }}
      >
        BUSQUEDA DE EXAMENES
      </Typography>
      <Box sx={{ display: "flex", gap: 1.5, mb: 2 }}>
        <FormControl size="small" sx={{ minWidth: 130 }}>
          <InputLabel sx={{ fontSize: '0.7rem' }}>BUSCAR POR</InputLabel>
          <Select
            value={buscarPor}
            label="BUSCAR POR"
            onChange={(e) => setBuscarPor(e.target.value)}
            sx={{
              '& .MuiSelect-select': { fontSize: '0.7rem' },
            }}
          >
            <MenuItem value="CODIGO" sx={{ fontSize: '0.7rem' }}>CODIGO</MenuItem>
            <MenuItem value="DESCRIPCION" sx={{ fontSize: '0.7rem' }}>DESCRIPCION</MenuItem>
            <MenuItem value="CATEGORIA" sx={{ fontSize: '0.7rem' }}>CATEGORIA</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="CRITERIO DE BUSQUEDA"
          value={criterio}
          onChange={(e) => setCriterio(e.target.value)}
          size="small"
          sx={{ 
            flex: 1,
            '& .MuiInputLabel-root': { fontSize: '0.7rem' },
            '& .MuiInputBase-input': { fontSize: '0.7rem' },
          }}
          placeholder="INGRESE CRITERIO PARA FILTRAR..."
        />
        <Button
          variant="contained"
          onClick={buscarExamenes}
          startIcon={<SearchIcon sx={{ fontSize: '0.9rem' }} />}
          sx={{
            background: "#1A3C6D",
            borderRadius: 2,
            px: 2.5,
            textTransform: "none",
            fontWeight: "bold",
            fontSize: '0.7rem', // REDUCIDO
            "&:hover": { background: "#274472" },
          }}
        >
          BUSCAR
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            setCriterio("");
            setExamenesDisponibles(examenesIniciales);
          }}
          sx={{
            borderColor: "#1A3C6D",
            color: "#1A3C6D",
            borderRadius: 2,
            px: 2.5,
            fontSize: '0.7rem', // REDUCIDO
            textTransform: "none",
            "&:hover": { borderColor: "#274472", color: "#274472" },
          }}
        >
          MOSTRAR TODOS
        </Button>
      </Box>

      {/* GRID DE EXÁMENES ENCONTRADOS */}
      <Box sx={{ mb: 2.5 }}>
        <Typography sx={{ fontSize: "0.75rem", color: "#666", mb: 1 }}>
           <strong>{examenesDisponibles.length}</strong> EXAMENES ENCONTRADOS
          (INCLUYENDO PRECIO 0)
        </Typography>
        {/* HEADER DEL GRID */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "70px 1fr 110px 70px 90px",
            gap: 1,
            p: 0.8,
            backgroundColor: "#e3eaf6",
            borderRadius: "4px 4px 0 0",
            border: "1px solid #ddd",
          }}
        >
          <Typography sx={{ fontWeight: "bold", fontSize: "0.65rem" }}>
            CODIGO
          </Typography>
          <Typography sx={{ fontWeight: "bold", fontSize: "0.65rem" }}>
            DESCRIPCION
          </Typography>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "0.65rem",
              textAlign: "center",
            }}
          >
            CATEGORIA
          </Typography>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "0.65rem",
              textAlign: "center",
            }}
          >
            PRECIO
          </Typography>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "0.65rem",
              textAlign: "center",
            }}
          >
            ACCION
          </Typography>
        </Box>
        {/* FILAS DEL GRID */}
        <Box
          sx={{
            maxHeight: 220,
            overflowY: "auto",
            border: "1px solid #ddd",
            borderTop: "none",
            borderRadius: "0 0 4px 4px",
          }}
        >
          {examenesDisponibles.map((examen, index) => (
            <Box
              key={examen.id}
              sx={{
                display: "grid",
                gridTemplateColumns: "70px 1fr 110px 70px 90px",
                gap: 1,
                p: 0.8,
                backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9",
                cursor: "pointer",
                "&:hover": { backgroundColor: "#e3f2fd" },
                opacity: examen.precio === 0 ? 0.7 : 1,
                borderLeft: examen.precio === 0 ? "3px solid #ff9800" : "none",
              }}
              onDoubleClick={() => seleccionarExamen(examen)}
              title={
                examen.precio === 0
                  ? "⚠️ EXAMEN SIN PRECIO DEFINIDO"
                  : "DOBLE CLIC PARA AGREGAR"
              }
            >
              <Typography
                sx={{ fontSize: "0.65rem", fontFamily: "monospace" }}
              >
                {examen.codigo}
              </Typography>
              <Typography sx={{ fontSize: "0.65rem" }}>
                {examen.descripcion}
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.6rem",
                  textAlign: "center",
                  backgroundColor: "#f0f0f0",
                  padding: "2px 4px",
                  borderRadius: "4px",
                  fontWeight: "bold",
                }}
              >
                {examen.categoria}
              </Typography>
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: "0.65rem",
                  color: examen.precio === 0 ? "#f44336" : "#2e7d32",
                  fontWeight: "bold",
                }}
              >
                {examen.precio === 0 ? "SIN PRECIO" : `$${examen.precio.toFixed(2)}`}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => seleccionarExamen(examen)}
                  disabled={
                    examenesSeleccionados.find((e) => e.id === examen.id) !== undefined
                  }
                  sx={{ fontSize: "0.6rem" }}
                >
                  {examenesSeleccionados.find((e) => e.id === examen.id)
                    ? "AGREGADO"
                    : "AGREGAR"}
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* GRID DE EXÁMENES SELECCIONADOS */}
      <Typography
        sx={{
          fontWeight: "bold",
          color: "#1A3C6D",
          mb: 1.5,
          fontSize: "0.9rem", // REDUCIDO
        }}
      >
         EXAMENES SELECCIONADOS
      </Typography>
      <Box>
        {/* HEADER DEL GRID */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "40px 70px 1fr 180px 50px",
            gap: 1,
            p: 0.8,
            backgroundColor: "#e3eaf6",
            borderRadius: "4px 4px 0 0",
            border: "1px solid #ddd",
          }}
        >
          <Typography sx={{ fontWeight: "bold", fontSize: "0.65rem" }}>
            #
          </Typography>
          <Typography sx={{ fontWeight: "bold", fontSize: "0.65rem" }}>
            CODIGO
          </Typography>
          <Typography sx={{ fontWeight: "bold", fontSize: "0.65rem" }}>
            DESCRIPCION
          </Typography>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "0.65rem",
              textAlign: "center",
            }}
          >
            COMENTARIO
          </Typography>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "0.65rem",
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
            maxHeight: 270,
            overflowY: "auto",
          }}
        >
          {examenesSeleccionados.length === 0 ? (
            <Box
              sx={{
                p: 2.5,
                textAlign: "center",
                backgroundColor: "#fff",
                color: "#666",
              }}
            >
              <Typography sx={{ fontSize: "0.75rem" }}>
                ℹ️ NO HAY EXAMENES SELECCIONADOS. HAGA DOBLE CLIC EN UN EXAMEN
                PARA AGREGARLO.
              </Typography>
            </Box>
          ) : (
            examenesSeleccionados.map((examen, index) => (
              <Box
                key={examen.id}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "40px 70px 1fr 180px 50px",
                  gap: 1,
                  p: 0.8,
                  backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontSize: "0.65rem", textAlign: "center" }}>
                  {index + 1}
                </Typography>
                <Typography
                  sx={{ fontSize: "0.65rem", fontFamily: "monospace" }}
                >
                  {examen.codigo}
                </Typography>
                <Typography sx={{ fontSize: "0.65rem" }}>
                  {examen.descripcion}
                </Typography>
                <TextField
                  value={examen.comentario || ""}
                  onChange={(e) =>
                    actualizarComentario(examen.id, e.target.value)
                  }
                  size="small"
                  fullWidth
                  placeholder="COMENTARIO OPCIONAL"
                  sx={{
                    "& .MuiInputBase-input": {
                      fontSize: "0.65rem",
                    },
                    "& .MuiInputBase-root": {
                      height: "28px",
                    },
                  }}
                />
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <IconButton
                    color="error"
                    onClick={() => eliminarExamenSeleccionado(examen.id)}
                    size="small"
                  >
                    <CloseIcon sx={{ fontSize: "0.9rem" }} />
                  </IconButton>
                </Box>
              </Box>
            ))
          )}
        </Box>
      </Box>

      {/* BOTONES DE ACCIÓN */}
      <Box sx={{ display: "flex", gap: 1.5, mt: 2.5, flexWrap: "wrap" }}>
        <Button
          variant="contained"
          startIcon={<SaveIcon sx={{ fontSize: '0.9rem' }} />}
          onClick={handleGuardar}
          disabled={examenesSeleccionados.length === 0}
          sx={{
            background: "#1A3C6D",
            borderRadius: 2,
            px: 2.5,
            textTransform: "none",
            fontWeight: "bold",
            fontSize: '0.7rem', // REDUCIDO
            "&:hover": { background: "#274472" },
            "&:disabled": { background: "#ccc" },
          }}
        >
          GUARDAR ({examenesSeleccionados.length})
        </Button>
        <Button
          variant="contained"
          startIcon={<ExportIcon sx={{ fontSize: '0.9rem' }} />}
          sx={{
            background: "#1A3C6D",
            borderRadius: 2,
            px: 2.5,
            textTransform: "none",
            fontWeight: "bold",
            fontSize: '0.7rem', // REDUCIDO
            "&:hover": { background: "#274472" },
          }}
        >
          EXPORTAR PDF
        </Button>
        <Button
          variant="contained"
          startIcon={<PrintIcon sx={{ fontSize: '0.9rem' }} />}
          sx={{
            background: "#1A3C6D",
            borderRadius: 2,
            px: 2.5,
            textTransform: "none",
            fontWeight: "bold",
            fontSize: '0.7rem', // REDUCIDO
            "&:hover": { background: "#274472" },
          }}
        >
          IMPRIMIR
        </Button>
        <Button
          variant="contained"
          startIcon={<EditIcon sx={{ fontSize: '0.9rem' }} />}
          sx={{
            background: "#1A3C6D",
            borderRadius: 2,
            px: 2.5,
            textTransform: "none",
            fontWeight: "bold",
            fontSize: '0.7rem', // REDUCIDO
            "&:hover": { background: "#274472" },
          }}
        >
          EDITAR
        </Button>
        <Button
          variant="contained"
          startIcon={<DeleteIcon sx={{ fontSize: '0.9rem' }} />}
          onClick={handleEliminarOrden}
          sx={{
            background: "#d32f2f",
            borderRadius: 2,
            px: 2.5,
            textTransform: "none",
            fontWeight: "bold",
            fontSize: '0.7rem', // REDUCIDO
            "&:hover": { background: "#b71c1c" },
          }}
        >
          ELIMINAR ORDEN
        </Button>
      </Box>
    </Box>
  );
};

export default Laboratorio;