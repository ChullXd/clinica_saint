import { useState, useEffect } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Autocomplete,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import {
  Search as SearchIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

interface DiagnosticoItem {
  id: number;
  codigo: string;
  descripcion: string;
  tipo: "PRE" | "DEF";
}

interface ExamenItem {
  id: number;
  codigo: string;
  descripcion: string;
  comentario?: string;
  seleccionado: boolean;
}

const AnatomiaPatologica = () => {
  // Estados para datos del paciente (MISMO ESTÁNDAR QUE LABORATORIO)
  const [numeroHistoria] = useState("9952"); // NO EDITABLE - VIENE DE DATOS DE CAMA
  const [numeroArchivo, setNumeroArchivo] = useState("");
  const [nombrePaciente] = useState("ALCIVAR VALERO GEOVANNY ULICES");
  const [direccion] = useState("RECINTO CONVENTO JUJAN - L");
  const [telefono] = useState("099-888-7777");
  const [edad] = useState("50");
  const [categoria] = useState("PARTICULAR");
  
  const [servicio, setServicio] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [prioridad, setPrioridad] = useState("");
  const [horaToma, setHoraToma] = useState("");
  const [fechaToma, setFechaToma] = useState("");
  const [diagnosticos, setDiagnosticos] = useState<DiagnosticoItem[]>([]);
  const [diagnosticoBusqueda, setDiagnosticoBusqueda] = useState("");

  // Estados para datos del profesional (NO EDITABLE - INFORMACIÓN DEL USUARIO LOGUEADO)
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [cedulaMedico] = useState("1234567890");
  const [nombreMedico] = useState("DR. CARLOS EDUARDO MENDOZA SILVA");
  const [fechaRecepcion, setFechaRecepcion] = useState("");
  const [horaRecepcion, setHoraRecepcion] = useState("");
  const [nombreEntrega, setNombreEntrega] = useState("");
  const [nombreRecibe, setNombreRecibe] = useState("");
  const [codigoInterno, setCodigoInterno] = useState("");

  // Estados para exámenes
  const [criterio, setCriterio] = useState("");
  const [examenesDisponibles, setExamenesDisponibles] = useState<ExamenItem[]>([]);
  const [examenesSeleccionados, setExamenesSeleccionados] = useState<ExamenItem[]>([]);

  // Estados para opciones de acción (RADIO BUTTONS)
  const [accionSeleccionada, setAccionSeleccionada] = useState("");

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
    "ANATOMÍA PATOLÓGICA",
    "PATOLOGÍA QUIRÚRGICA",
  ];

  const diagnosticosCIE10 = [
    {
      codigo: "A00.0",
      descripcion: "CÓLERA DEBIDO A VIBRIO CHOLERAE 01, BIOTIPO CHOLERAE",
    },
    {
      codigo: "A00.1",
      descripcion: "CÓLERA DEBIDO A VIBRIO CHOLERAE 01, BIOTIPO EL TOR",
    },
    { codigo: "A00.9", descripcion: "CÓLERA, NO ESPECIFICADO" },
    { codigo: "A01.0", descripcion: "FIEBRE TIFOIDEA" },
    { codigo: "A01.1", descripcion: "FIEBRE PARATIFOIDEA A" },
    { codigo: "A01.2", descripcion: "FIEBRE PARATIFOIDEA B" },
  ];

  const examenesIniciales: ExamenItem[] = [
    {
      id: 1,
      codigo: "30",
      descripcion: "BIOPSIA DE TEJIDO BLANDO",
      seleccionado: false,
    },
    {
      id: 2,
      codigo: "31",
      descripcion: "BIOPSIA DE PIEL",
      seleccionado: false,
    },
    {
      id: 3,
      codigo: "32",
      descripcion: "BIOPSIA DE GANGLIO LINFÁTICO",
      seleccionado: false,
    },
    {
      id: 4,
      codigo: "33",
      descripcion: "BIOPSIA DE MÚSCULO",
      seleccionado: false,
    },
    {
      id: 5,
      codigo: "34",
      descripcion: "CITOLOGÍA CERVICAL",
      seleccionado: false,
    },
  ];

  // Efectos
  useEffect(() => {
    const ahora = new Date();
    const fechaActual = ahora.toISOString().split("T")[0];
    const horaActual = ahora.toTimeString().slice(0, 5);

    setFecha(fechaActual);
    setHora(horaActual);
    setFechaToma(fechaActual);
    setHoraToma(horaActual);
    setCodigoInterno("AP-2024-001234");
    setExamenesDisponibles(examenesIniciales);
    setNumeroArchivo("2024-AP-001234");
  }, []);

  // Funciones
  const agregarDiagnostico = (tipo: "PRE" | "DEF") => {
    if (diagnosticoBusqueda) {
      const diagnosticoEncontrado = diagnosticosCIE10.find(
        (d) =>
          d.codigo === diagnosticoBusqueda ||
          d.descripcion.includes(diagnosticoBusqueda.toUpperCase())
      );

      if (diagnosticoEncontrado) {
        const nuevoDiagnostico: DiagnosticoItem = {
          id: Date.now(),
          codigo: diagnosticoEncontrado.codigo,
          descripcion: diagnosticoEncontrado.descripcion,
          tipo,
        };
        setDiagnosticos([...diagnosticos, nuevoDiagnostico]);
        setDiagnosticoBusqueda("");
      }
    }
  };

  const eliminarDiagnostico = (id: number) => {
    const confirmado = window.confirm("¿ESTÁ SEGURO QUE DESEA ELIMINAR ESTE DIAGNÓSTICO?");
    if (confirmado) {
      setDiagnosticos(diagnosticos.filter((d) => d.id !== id));
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
    const confirmado = window.confirm("¿ESTÁ SEGURO QUE DESEA ELIMINAR ESTE EXAMEN?");
    if (confirmado) {
      setExamenesSeleccionados(examenesSeleccionados.filter((e) => e.id !== id));
    }
  };

  const actualizarComentario = (id: number, comentario: string) => {
    setExamenesSeleccionados(
      examenesSeleccionados.map((examen) =>
        examen.id === id ? { ...examen, comentario } : examen
      )
    );
  };

  // Manejar acciones según opción seleccionada
  const handleAccion = () => {
    if (!accionSeleccionada) {
      alert("Seleccione una acción");
      return;
    }

    switch (accionSeleccionada) {
      case "guardar":
        console.log("Orden de anatomía patológica guardada:", {
          numeroHistoria,
          servicio,
          especialidad,
          prioridad,
          diagnosticos,
          examenesSeleccionados,
        });
        alert("ORDEN DE ANATOMÍA PATOLÓGICA GUARDADA EXITOSAMENTE");
        break;
      case "exportar":
        alert("EXPORTANDO PDF...");
        break;
      case "imprimir":
        alert("ENVIANDO A IMPRESORA...");
        break;
      case "editar":
        alert("MODO EDICIÓN ACTIVADO");
        break;
      case "eliminar":
        setOpenDeleteDialog(true);
        break;
      default:
        break;
    }
  };

  const confirmarEliminacion = () => {
    if (motivoEliminacion.trim()) {
      console.log("Orden eliminada. Motivo:", motivoEliminacion);
      alert("ORDEN ELIMINADA CORRECTAMENTE");
      setOpenDeleteDialog(false);
      setMotivoEliminacion("");
      setAccionSeleccionada("");
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, m: 2 }}>
      <Typography
        variant="h5"
        sx={{ mb: 3, fontWeight: "bold", color: "#1A3C6D", fontSize: "1rem", textAlign: "center" }}
      >
        ORDEN DE ANATOMÍA PATOLÓGICA
      </Typography>

      {/* SECCIÓN DE DATOS DEL PACIENTE - MISMO ESTÁNDAR QUE LABORATORIO */}
      <Typography
        sx={{
          fontWeight: "bold",
          color: "#1A3C6D",
          mb: 1.5,
          fontSize: "0.85rem",
        }}
      >
         DATOS DEL PACIENTE
      </Typography>
      <Box sx={{ display: "flex", gap: 1.5, mb: 2.5 }}>
        <TextField
          label="HC"
          value={numeroHistoria}
          disabled // NO EDITABLE - VIENE DE DATOS DE CAMA
          size="small"
          sx={{ 
            minWidth: 100,
            backgroundColor: "#E0E0E0",
            '& .MuiInputLabel-root': { fontSize: '0.7rem' },
            '& .MuiInputBase-input': { fontSize: '0.7rem' },
          }}
        />
        <TextField
          label="NOMBRE"
          value={nombrePaciente}
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

      {/* DATOS DEL SERVICIO */}
      <Typography
        sx={{
          fontWeight: "bold",
          color: "#1A3C6D",
          mb: 1.5,
          fontSize: "0.85rem",
        }}
      >
         DATOS DEL SERVICIO
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel sx={{ fontSize: '0.7rem' }}>SERVICIO</InputLabel>
          <Select
            value={servicio}
            label="SERVICIO"
            onChange={(e) => setServicio(e.target.value)}
            sx={{ '& .MuiSelect-select': { fontSize: '0.7rem' } }}
          >
            <MenuItem value="emergencia" sx={{ fontSize: '0.7rem' }}>EMERGENCIA</MenuItem>
            <MenuItem value="consulta" sx={{ fontSize: '0.7rem' }}>CONSULTA EXTERNA</MenuItem>
            <MenuItem value="hospitalizacion" sx={{ fontSize: '0.7rem' }}>HOSPITALIZACIÓN</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel sx={{ fontSize: '0.7rem' }}>ESPECIALIDAD</InputLabel>
          <Select
            value={especialidad}
            label="ESPECIALIDAD"
            onChange={(e) => setEspecialidad(e.target.value)}
            sx={{ '& .MuiSelect-select': { fontSize: '0.7rem' } }}
          >
            {especialidades.map((esp) => (
              <MenuItem key={esp} value={esp} sx={{ fontSize: '0.7rem' }}>
                {esp}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel sx={{ fontSize: '0.7rem' }}>PRIORIDAD</InputLabel>
          <Select
            value={prioridad}
            label="PRIORIDAD"
            onChange={(e) => setPrioridad(e.target.value)}
            sx={{ '& .MuiSelect-select': { fontSize: '0.7rem' } }}
          >
            <MenuItem value="urgente" sx={{ fontSize: '0.7rem' }}>URGENTE</MenuItem>
            <MenuItem value="rutina" sx={{ fontSize: '0.7rem' }}>RUTINA</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="HORA DE TOMA"
          type="time"
          value={horaToma}
          onChange={(e) => setHoraToma(e.target.value)}
          size="small"
          sx={{ 
            width: 150,
            '& .MuiInputLabel-root': { fontSize: '0.7rem' },
            '& .MuiInputBase-input': { fontSize: '0.7rem' },
          }}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="FECHA DE TOMA"
          type="date"
          value={fechaToma}
          onChange={(e) => setFechaToma(e.target.value)}
          size="small"
          sx={{ 
            width: 180,
            '& .MuiInputLabel-root': { fontSize: '0.7rem' },
            '& .MuiInputBase-input': { fontSize: '0.7rem' },
          }}
          InputLabelProps={{ shrink: true }}
        />
      </Box>

      {/* Sección E: Diagnósticos */}
      <Box sx={{ mb: 3 }}>
        <Typography
          sx={{
            fontWeight: "bold",
            color: "#1A3C6D",
            mb: 1.5,
            fontSize: "0.85rem",
          }}
        >
           DIAGNÓSTICOS (CIE10)
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            mb: 2,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <Autocomplete
            options={diagnosticosCIE10}
            getOptionLabel={(option) =>
              `${option.codigo} - ${option.descripcion}`
            }
            value={null}
            onChange={(event, newValue) => {
              if (newValue) {
                setDiagnosticoBusqueda(newValue.codigo);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="BUSCAR DIAGNÓSTICO"
                size="small"
                sx={{ 
                  minWidth: 400,
                  '& .MuiInputLabel-root': { fontSize: '0.7rem' },
                  '& .MuiInputBase-input': { fontSize: '0.7rem' },
                }}
              />
            )}
          />
          <Button
            variant="contained"
            onClick={() => agregarDiagnostico("PRE")}
            size="small"
            sx={{
              background: "#1A3C6D",
              "&:hover": { background: "#274472" },
              fontSize: '0.7rem',
            }}
          >
            AGREGAR PRE
          </Button>
          <Button
            variant="contained"
            onClick={() => agregarDiagnostico("DEF")}
            size="small"
            sx={{
              background: "#1A3C6D",
              "&:hover": { background: "#274472" },
              fontSize: '0.7rem',
            }}
          >
            AGREGAR DEF
          </Button>
        </Box>

        {/* Tabla de Diagnósticos */}
        <TableContainer component={Paper} sx={{ mb: 3, maxHeight: 200 }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#e3eaf6" }}>
                <TableCell sx={{ fontWeight: "bold", width: 60, fontSize: "0.65rem" }}>
                  TIPO
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", width: 100, fontSize: "0.65rem" }}>
                  CÓDIGO
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "0.65rem" }}>DESCRIPCIÓN</TableCell>
                <TableCell sx={{ fontWeight: "bold", width: 80, fontSize: "0.65rem" }}>
                  ACCIÓN
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {diagnosticos.map((diagnostico) => (
                <TableRow key={diagnostico.id} hover>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: "bold",
                        fontSize: "0.65rem",
                        color:
                          diagnostico.tipo === "PRE" ? "#ff9800" : "#4caf50",
                      }}
                    >
                      {diagnostico.tipo}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ color: "#1976d2", fontWeight: "bold", fontSize: "0.65rem" }}>
                    {diagnostico.codigo}
                  </TableCell>
                  <TableCell sx={{ fontSize: "0.65rem" }}>{diagnostico.descripcion}</TableCell>
                  <TableCell>
                    <IconButton
                      color="error"
                      onClick={() => eliminarDiagnostico(diagnostico.id)}
                      size="small"
                    >
                      <DeleteIcon sx={{ fontSize: "0.8rem" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Sección de Búsqueda y Selección de Exámenes */}
      <Box sx={{ mb: 3 }}>
        <Typography
          sx={{
            fontWeight: "bold",
            color: "#1A3C6D",
            mb: 1.5,
            fontSize: "0.85rem",
          }}
        >
           BÚSQUEDA DE EXÁMENES
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold", fontSize: "0.7rem" }}>
            BUSCAR POR:
          </Typography>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel sx={{ fontSize: '0.7rem' }}>CRITERIO</InputLabel>
            <Select value="codigo" label="CRITERIO" sx={{ '& .MuiSelect-select': { fontSize: '0.7rem' } }}>
              <MenuItem value="codigo" sx={{ fontSize: '0.7rem' }}>CÓDIGO</MenuItem>
              <MenuItem value="descripcion" sx={{ fontSize: '0.7rem' }}>DESCRIPCIÓN</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="CRITERIO"
            value={criterio}
            onChange={(e) => setCriterio(e.target.value)}
            size="small"
            sx={{ 
              flex: 1, 
              minWidth: 200,
              '& .MuiInputLabel-root': { fontSize: '0.7rem' },
              '& .MuiInputBase-input': { fontSize: '0.7rem' },
            }}
          />
          <Button
            variant="contained"
            onClick={filtrarExamenes}
            startIcon={<SearchIcon />}
            sx={{
              background: "#1A3C6D",
              "&:hover": { background: "#274472" },
              fontSize: '0.7rem',
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
                <TableCell sx={{ fontWeight: "bold", width: 50, fontSize: "0.65rem" }}>#</TableCell>
                <TableCell sx={{ fontWeight: "bold", width: 100, fontSize: "0.65rem" }}>
                  CÓDIGO
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "0.65rem" }}>DESCRIPCIÓN</TableCell>
                <TableCell sx={{ fontWeight: "bold", width: 100, fontSize: "0.65rem" }}>
                  ACCIÓN
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {examenesDisponibles.map((examen, index) => (
                <TableRow key={examen.id} hover>
                  <TableCell sx={{ fontSize: "0.65rem" }}>{index + 1}</TableCell>
                  <TableCell sx={{ color: "#1976d2", fontWeight: "bold", fontSize: "0.65rem" }}>
                    {examen.codigo}
                  </TableCell>
                  <TableCell sx={{ fontSize: "0.65rem" }}>{examen.descripcion}</TableCell>
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
                      sx={{ fontSize: '0.65rem' }}
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
        <Typography
          sx={{
            fontWeight: "bold",
            color: "#1A3C6D",
            mb: 1.5,
            fontSize: "0.85rem",
          }}
        >
          EXÁMENES SELECCIONADOS
        </Typography>
        <TableContainer component={Paper} sx={{ mb: 3, maxHeight: 300 }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#e3eaf6" }}>
                <TableCell sx={{ fontWeight: "bold", width: 50, fontSize: "0.65rem" }}>#</TableCell>
                <TableCell sx={{ fontWeight: "bold", width: 100, fontSize: "0.65rem" }}>
                  CÓDIGO
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "0.65rem" }}>DESCRIPCIÓN</TableCell>
                <TableCell sx={{ fontWeight: "bold", width: 200, fontSize: "0.65rem" }}>
                  COMENTARIO
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", width: 80, fontSize: "0.65rem" }}>
                  ACCIÓN
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {examenesSeleccionados.map((examen, index) => (
                <TableRow key={examen.id} hover>
                  <TableCell sx={{ fontSize: "0.65rem" }}>{index + 1}</TableCell>
                  <TableCell sx={{ color: "#1976d2", fontWeight: "bold", fontSize: "0.65rem" }}>
                    {examen.codigo}
                  </TableCell>
                  <TableCell sx={{ fontSize: "0.65rem" }}>{examen.descripcion}</TableCell>
                  <TableCell>
                    <TextField
                      value={examen.comentario || ""}
                      onChange={(e) =>
                        actualizarComentario(examen.id, e.target.value)
                      }
                      size="small"
                      fullWidth
                      placeholder="COMENTARIO OPCIONAL"
                      sx={{
                        '& .MuiInputBase-input': { fontSize: '0.65rem' },
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="error"
                      onClick={() => eliminarExamenSeleccionado(examen.id)}
                      size="small"
                    >
                      <DeleteIcon sx={{ fontSize: "0.8rem" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* SECCIÓN DE DATOS DEL PROFESIONAL - SOLO LECTURA */}
      <Typography
        sx={{
          fontWeight: "bold",
          color: "#1A3C6D",
          mb: 1.5,
          fontSize: "0.85rem",
        }}
      >
        DATOS DEL PROFESIONAL RESPONSABLE
      </Typography>
      <Box sx={{ display: "flex", gap: 1.5, mb: 2.5, flexWrap: "wrap" }}>
        <TextField
          label="FECHA"
          type="date"
          value={fecha}
          disabled // NO EDITABLE - INFORMACIÓN DEL USUARIO
          size="small"
          sx={{ 
            width: 150,
            backgroundColor: "#E0E0E0",
            '& .MuiInputLabel-root': { fontSize: '0.7rem' },
            '& .MuiInputBase-input': { fontSize: '0.7rem' },
          }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="HORA"
          type="time"
          value={hora}
          disabled // NO EDITABLE - INFORMACIÓN DEL USUARIO
          size="small"
          sx={{ 
            width: 150,
            backgroundColor: "#E0E0E0",
            '& .MuiInputLabel-root': { fontSize: '0.7rem' },
            '& .MuiInputBase-input': { fontSize: '0.7rem' },
          }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="CÉDULA MÉDICO"
          value={cedulaMedico}
          disabled // NO EDITABLE - INFORMACIÓN DEL USUARIO LOGUEADO
          size="small"
          sx={{ 
            width: 150,
            backgroundColor: "#E0E0E0",
            '& .MuiInputLabel-root': { fontSize: '0.7rem' },
            '& .MuiInputBase-input': { fontSize: '0.7rem' },
          }}
        />
        <TextField
          label="NOMBRE DEL MÉDICO"
          value={nombreMedico}
          disabled // NO EDITABLE - INFORMACIÓN DEL USUARIO LOGUEADO
          size="small"
          sx={{ 
            flex: 1,
            minWidth: 200,
            backgroundColor: "#E0E0E0",
            '& .MuiInputLabel-root': { fontSize: '0.7rem' },
            '& .MuiInputBase-input': { fontSize: '0.7rem' },
          }}
        />
      </Box>

      <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
        <TextField
          label="FECHA DE RECEPCIÓN"
          type="date"
          value={fechaRecepcion}
          onChange={(e) => setFechaRecepcion(e.target.value)}
          size="small"
          sx={{ 
            width: 180,
            '& .MuiInputLabel-root': { fontSize: '0.7rem' },
            '& .MuiInputBase-input': { fontSize: '0.7rem' },
          }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="HORA DE RECEPCIÓN"
          type="time"
          value={horaRecepcion}
          onChange={(e) => setHoraRecepcion(e.target.value)}
          size="small"
          sx={{ 
            width: 150,
            '& .MuiInputLabel-root': { fontSize: '0.7rem' },
            '& .MuiInputBase-input': { fontSize: '0.7rem' },
          }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="CÓDIGO INTERNO DE LA MUESTRA"
          value={codigoInterno}
          disabled
          size="small"
          sx={{ 
            width: 200,
            backgroundColor: "#E0E0E0",
            '& .MuiInputLabel-root': { fontSize: '0.7rem' },
            '& .MuiInputBase-input': { fontSize: '0.7rem' },
          }}
        />
      </Box>

      <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
        <TextField
          label="NOMBRE QUIEN ENTREGA LA MUESTRA"
          value={nombreEntrega}
          onChange={(e) => setNombreEntrega(e.target.value)}
          size="small"
          sx={{ 
            flex: 1, 
            minWidth: 250,
            '& .MuiInputLabel-root': { fontSize: '0.7rem' },
            '& .MuiInputBase-input': { fontSize: '0.7rem' },
          }}
        />
        <TextField
          label="NOMBRE QUIEN RECIBE LA MUESTRA"
          value={nombreRecibe}
          onChange={(e) => setNombreRecibe(e.target.value)}
          size="small"
          sx={{ 
            flex: 1, 
            minWidth: 250,
            '& .MuiInputLabel-root': { fontSize: '0.7rem' },
            '& .MuiInputBase-input': { fontSize: '0.7rem' },
          }}
        />
      </Box>

      {/* OPCIONES DE ACCIÓN CON RADIO BUTTONS - SOLO UNA SELECCIÓN */}
      <Typography
        sx={{
          fontWeight: "bold",
          color: "#1A3C6D",
          mb: 1.5,
          fontSize: "0.85rem",
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
                <Typography sx={{ fontSize: '0.7rem', fontWeight: 'bold' }}>
                   GUARDAR
                </Typography>
              } 
            />
            <FormControlLabel 
              value="exportar" 
              control={<Radio size="small" />} 
              label={
                <Typography sx={{ fontSize: '0.7rem', fontWeight: 'bold' }}>
                   EXPORTAR PDF
                </Typography>
              } 
            />
            <FormControlLabel 
              value="imprimir" 
              control={<Radio size="small" />} 
              label={
                <Typography sx={{ fontSize: '0.7rem', fontWeight: 'bold' }}>
                  IMPRIMIR
                </Typography>
              } 
            />
            <FormControlLabel 
              value="editar" 
              control={<Radio size="small" />} 
              label={
                <Typography sx={{ fontSize: '0.7rem', fontWeight: 'bold' }}>
                   EDITAR
                </Typography>
              } 
            />
            <FormControlLabel 
              value="eliminar" 
              control={<Radio size="small" />} 
              label={
                <Typography sx={{ fontSize: '0.7rem', fontWeight: 'bold' }}>
                  ELIMINAR
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
            fontSize: '0.7rem',
            "&:hover": { background: "#274472" },
            "&:disabled": { background: "#ccc" },
          }}
        >
          EJECUTAR ACCIÓN SELECCIONADA
        </Button>
      </Box>

      {/* Dialog de confirmación para eliminar */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontSize: "0.85rem" }}>CONFIRMAR ELIMINACIÓN</DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2, fontSize: "0.7rem" }}>
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
            sx={{
              '& .MuiInputLabel-root': { fontSize: '0.7rem' },
              '& .MuiInputBase-input': { fontSize: '0.7rem' },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setOpenDeleteDialog(false)} 
            color="secondary"
            sx={{ fontSize: '0.7rem' }}
          >
            CANCELAR
          </Button>
          <Button
            onClick={confirmarEliminacion}
            color="error"
            variant="contained"
            disabled={!motivoEliminacion.trim()}
            sx={{ fontSize: '0.7rem' }}
          >
            ELIMINAR
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default AnatomiaPatologica;