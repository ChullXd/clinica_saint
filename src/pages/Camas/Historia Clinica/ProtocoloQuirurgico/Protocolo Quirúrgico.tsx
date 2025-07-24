import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Paper,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Autocomplete,
  Alert,
  IconButton,
  Tabs,
  Tab,
  Chip,
  Grid,
} from "@mui/material";
import {
  Save as SaveIcon,
  Print as PrintIcon,
  GetApp as ExportIcon,
  Edit as EditIcon,
  Add as AddIcon,
  Search as SearchIcon,
  CloudUpload as UploadIcon,
  Description as TemplateIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

// Interfaces
interface DatosEstablecimiento {
  institucionSistema: string;
  unicodigo: string;
  establecimientoSalud: string;
  numeroHistoriaClinica: string;
  numeroArchivo: string;
  numeroHoja: number;
}

interface DatosPaciente {
  primerApellido: string;
  segundoApellido: string;
  primerNombre: string;
  segundoNombre: string;
  sexo: string;
  edad: string;
  condicionEdad: string;
}

interface Diagnostico {
  codigo: string;
  descripcion: string;
}

interface EquipoQuirurgico {
  cirujano1: string;
  cirujano2: string;
  primerAyudante: string;
  segundoAyudante: string;
  tercerAyudante: string;
  instrumentista: string;
  circulante: string;
  anestesiologo: string;
  ayudanteAnestesia: string;
  otros: string;
}

interface TiemposQuirurgicos {
  fechaOperacion: string;
  horaInicio: string;
  horaTerminacion: string;
  dieresis: string;
  exposicionExploracion: string;
  hallazgosQuirurgicos: string;
  procedimientoQuirurgico: string;
}

interface Complicaciones {
  descripcion: string;
  perdidaSanguineaTotal: number;
  sangradoAproximado: number;
  usoMaterialProtesico: boolean;
  descripcionMaterial: string;
}

interface ExamenesHistopatologicos {
  transquirurgico: string;
  biopsiaCongelacion: boolean;
  resultadoBiopsia: string;
  histopatologico: boolean;
  muestra: string;
  requiereSolicitudAP: boolean;
  tipoSolicitud: "interna" | "externa" | "";
  responsableExterno: string;
}

export default function ProtocoloQuirurgico() {
  const [tabValue, setTabValue] = useState(0);
  
  // Estados principales
  const [datosEstablecimiento, setDatosEstablecimiento] =
    useState<DatosEstablecimiento>({
      institucionSistema: "RPC",
      unicodigo: "64876",
      establecimientoSalud: "RIVAMEDIC S. A.",
      numeroHistoriaClinica: "",
      numeroArchivo: "",
      numeroHoja: 1,
    });

  const [datosPaciente, setDatosPaciente] = useState<DatosPaciente>({
    primerApellido: "",
    segundoApellido: "",
    primerNombre: "",
    segundoNombre: "",
    sexo: "",
    edad: "",
    condicionEdad: "Años",
  });

  const [diagnosticosPreOp, setDiagnosticosPreOp] = useState<Diagnostico[]>([
    { codigo: "", descripcion: "" },
    { codigo: "", descripcion: "" },
    { codigo: "", descripcion: "" },
  ]);

  const [diagnosticosPostOp, setDiagnosticosPostOp] = useState<Diagnostico[]>([
    { codigo: "", descripcion: "" },
    { codigo: "", descripcion: "" },
    { codigo: "", descripcion: "" },
  ]);

  const [tipoProcedimiento, setTipoProcedimiento] = useState<string>("");
  const [procedimientoProyectado, setProcedimientoProyectado] =
    useState<string>("");
  const [procedimientoRealizado, setProcedimientoRealizado] =
    useState<string>("");

  const [equipoQuirurgico, setEquipoQuirurgico] = useState<EquipoQuirurgico>({
    cirujano1: "",
    cirujano2: "",
    primerAyudante: "",
    segundoAyudante: "",
    tercerAyudante: "",
    instrumentista: "",
    circulante: "",
    anestesiologo: "",
    ayudanteAnestesia: "",
    otros: "",
  });

  const [tipoAnestesia, setTipoAnestesia] = useState<string>("");

  const [tiemposQuirurgicos, setTiemposQuirurgicos] =
    useState<TiemposQuirurgicos>({
      fechaOperacion: "",
      horaInicio: "",
      horaTerminacion: "",
      dieresis: "",
      exposicionExploracion: "",
      hallazgosQuirurgicos: "",
      procedimientoQuirurgico: "",
    });

  const [complicaciones, setComplicaciones] = useState<Complicaciones>({
    descripcion: "",
    perdidaSanguineaTotal: 0,
    sangradoAproximado: 0,
    usoMaterialProtesico: false,
    descripcionMaterial: "",
  });

  const [examenesHistopatologicos, setExamenesHistopatologicos] =
    useState<ExamenesHistopatologicos>({
      transquirurgico: "",
      biopsiaCongelacion: false,
      resultadoBiopsia: "",
      histopatologico: false,
      muestra: "",
      requiereSolicitudAP: false,
      tipoSolicitud: "",
      responsableExterno: "",
    });

  const [imagenDiagrama, setImagenDiagrama] = useState<File | null>(null);
  const [openSolicitudAP, setOpenSolicitudAP] = useState(false);
  const [openTemplateDialog, setOpenTemplateDialog] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  // Datos de ejemplo para listas
  const condicionesEdad = ["Horas", "Días", "Meses", "Años"];
  const tiposProcedimiento = ["Electiva", "Emergencia", "Urgencia"];
  const tiposAnestesia = ["General", "Regional", "Sedación", "Otros"];

  const diagnosticosCIE = [
    {
      codigo: "K40.9",
      descripcion: "Hernia inguinal unilateral sin obstrucción ni gangrena",
    },
    { codigo: "K35.9", descripcion: "Apendicitis aguda sin complicación" },
    {
      codigo: "K80.2",
      descripcion: "Cálculo de vesícula biliar sin colecistitis",
    },
  ];

  const medicos = [
    { nombre: "Dr. Carlos Mendoza", especialidad: "Cirugía General" },
    { nombre: "Dr. María González", especialidad: "Anestesiología" },
    { nombre: "Dr. Roberto Silva", especialidad: "Cirugía Cardiovascular" },
  ];

  const procedimientosCTP = [
    { codigo: "47562", descripcion: "Laparoscopia con colecistectomía" },
    { codigo: "44970", descripcion: "Laparoscopia con apendicectomía" },
    { codigo: "49505", descripcion: "Reparación de hernia inguinal inicial" },
  ];

  // Funciones
  const buscarPaciente = () => {
    if (datosEstablecimiento.numeroHistoriaClinica) {
      setDatosPaciente({
        primerApellido: "ALCIVAR",
        segundoApellido: "VALERO",
        primerNombre: "GEOVANNY",
        segundoNombre: "ULICES",
        sexo: "M",
        edad: "50",
        condicionEdad: "Años",
      });
    }
  };

  const handleGuardar = () => {
    const newErrors = [];

    if (!tiemposQuirurgicos.horaInicio)
      newErrors.push("Hora de inicio es obligatoria");
    if (!tiemposQuirurgicos.horaTerminacion)
      newErrors.push("Hora de terminación es obligatoria");
    if (!imagenDiagrama)
      newErrors.push("Debe adjuntar el diagrama del procedimiento");

    setErrors(newErrors);

    if (newErrors.length === 0) {
      alert("Protocolo quirúrgico guardado exitosamente");
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImagenDiagrama(file);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const TabPanel = ({
    children,
    value,
    index,
  }: {
    children: React.ReactNode;
    value: number;
    index: number;
  }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );

  return (
    <Paper elevation={3} sx={{ p: 2, m: 2 }}>
      {/* Encabezado */}
      <Typography
        variant="h5"
        sx={{
          mb: 2,
          fontWeight: "bold",
          color: "#1A3C6D",
          textAlign: "center",
        }}
      >
        PROTOCOLO QUIRÚRGICO
      </Typography>

      {/* Navegación por pestañas */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            "& .MuiTab-root": {
              fontSize: "0.8rem",
              minHeight: "40px",
              color: "#1A3C6D",
            },
            "& .Mui-selected": {
              color: "#1A3C6D",
              fontWeight: "bold",
            },
          }}
        >
          <Tab label="DATOS GENERALES" />
          <Tab label="DIAGNÓSTICOS" />
          <Tab label="EQUIPO QUIRÚRGICO" />
          <Tab label="TIEMPOS QUIRÚRGICOS" />
          <Tab label="COMPLICACIONES" />
          <Tab label="EXÁMENES" />
          <Tab label="DIAGRAMA" />
        </Tabs>
      </Box>

      {/* Panel 1: Datos Generales */}
      <TabPanel value={tabValue} index={0}>
        {/* A. Datos del Establecimiento */}
        <Card sx={{ mb: 2 }}>
          <CardContent sx={{ p: 2 }}>
            <Typography
              variant="h6"
              sx={{
                mb: 1.5,
                fontWeight: "bold",
                color: "#1A3C6D",
                fontSize: "1rem",
              }}
            >
              A. DATOS DEL ESTABLECIMIENTO
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: 1.5 }}>
              <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 32%" } }}>
                <TextField
                  label="INSTITUCIÓN DEL SISTEMA"
                  value={datosEstablecimiento.institucionSistema}
                  disabled
                  size="small"
                  fullWidth
                  InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                  InputProps={{ sx: { fontSize: "0.8rem" } }}
                />
              </Box>
              <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 20%" } }}>
                <TextField
                  label="UNICÓDIGO"
                  value={datosEstablecimiento.unicodigo}
                  disabled
                  size="small"
                  fullWidth
                  InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                  InputProps={{ sx: { fontSize: "0.8rem" } }}
                />
              </Box>
              <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 32%" } }}>
                <TextField
                  label="ESTABLECIMIENTO DE SALUD"
                  value={datosEstablecimiento.establecimientoSalud}
                  disabled
                  size="small"
                  fullWidth
                  InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                  InputProps={{ sx: { fontSize: "0.8rem" } }}
                />
              </Box>
              <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 16%" } }}>
                <TextField
                  label="No. HOJA"
                  type="number"
                  value={datosEstablecimiento.numeroHoja}
                  onChange={(e) =>
                    setDatosEstablecimiento({
                      ...datosEstablecimiento,
                      numeroHoja: parseInt(e.target.value) || 1,
                    })
                  }
                  size="small"
                  fullWidth
                  InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                  InputProps={{ sx: { fontSize: "0.8rem" } }}
                />
              </Box>
            </Box>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
              <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 32%" } }}>
                <TextField
                  label="NÚMERO DE HISTORIA CLÍNICA"
                  value={datosEstablecimiento.numeroHistoriaClinica}
                  onChange={(e) =>
                    setDatosEstablecimiento({
                      ...datosEstablecimiento,
                      numeroHistoriaClinica: e.target.value,
                    })
                  }
                  size="small"
                  fullWidth
                  InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                  InputProps={{ sx: { fontSize: "0.8rem" } }}
                />
              </Box>
              <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 20%" } }}>
                <Button
                  variant="contained"
                  onClick={buscarPaciente}
                  startIcon={<SearchIcon />}
                  size="small"
                  fullWidth
                  sx={{
                    background: "#1A3C6D",
                    "&:hover": { background: "#274472" },
                    height: "40px",
                    fontSize: "0.8rem",
                  }}
                >
                  BUSCAR
                </Button>
              </Box>
              <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 32%" } }}>
                <TextField
                  label="NÚMERO DE ARCHIVO"
                  value={datosEstablecimiento.numeroArchivo}
                  disabled
                  size="small"
                  fullWidth
                  InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                  InputProps={{ sx: { fontSize: "0.8rem" } }}
                />
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Datos del Paciente */}
        <Card>
          <CardContent sx={{ p: 2 }}>
            <Typography
              variant="h6"
              sx={{
                mb: 1.5,
                fontWeight: "bold",
                color: "#1A3C6D",
                fontSize: "1rem",
              }}
            >
              DATOS DEL PACIENTE (DESDE EMERGENCIA 008)
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: 1.5 }}>
              <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 24%" } }}>
                <TextField
                  label="PRIMER APELLIDO"
                  value={datosPaciente.primerApellido}
                  disabled
                  size="small"
                  fullWidth
                  InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                  InputProps={{ sx: { fontSize: "0.8rem" } }}
                />
              </Box>
              <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 24%" } }}>
                <TextField
                  label="SEGUNDO APELLIDO"
                  value={datosPaciente.segundoApellido}
                  disabled
                  size="small"
                  fullWidth
                  InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                  InputProps={{ sx: { fontSize: "0.8rem" } }}
                />
              </Box>
              <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 24%" } }}>
                <TextField
                  label="PRIMER NOMBRE"
                  value={datosPaciente.primerNombre}
                  disabled
                  size="small"
                  fullWidth
                  InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                  InputProps={{ sx: { fontSize: "0.8rem" } }}
                />
              </Box>
              <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 24%" } }}>
                <TextField
                  label="SEGUNDO NOMBRE"
                  value={datosPaciente.segundoNombre}
                  disabled
                  size="small"
                  fullWidth
                  InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                  InputProps={{ sx: { fontSize: "0.8rem" } }}
                />
              </Box>
            </Box>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
              <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 16%" } }}>
                <TextField
                  label="SEXO"
                  value={datosPaciente.sexo}
                  disabled
                  size="small"
                  fullWidth
                  InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                  InputProps={{ sx: { fontSize: "0.8rem" } }}
                />
              </Box>
              <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 16%" } }}>
                <TextField
                  label="EDAD"
                  value={datosPaciente.edad}
                  disabled
                  size="small"
                  fullWidth
                  InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                  InputProps={{ sx: { fontSize: "0.8rem" } }}
                />
              </Box>
              <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 32%" } }}>
                <FormControl fullWidth size="small">
                  <InputLabel sx={{ fontSize: "0.8rem" }}>CONDICIÓN EDAD</InputLabel>
                  <Select
                    value={datosPaciente.condicionEdad}
                    label="CONDICIÓN EDAD"
                    disabled
                    sx={{ fontSize: "0.8rem" }}
                  >
                    {condicionesEdad.map((condicion) => (
                      <MenuItem key={condicion} value={condicion}>
                        {condicion}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Panel 2: Diagnósticos */}
      <TabPanel value={tabValue} index={1}>
        <Card sx={{ mb: 2 }}>
          <CardContent sx={{ p: 2 }}>
            <Typography
              variant="h6"
              sx={{
                mb: 1.5,
                fontWeight: "bold",
                color: "#1A3C6D",
                fontSize: "1rem",
              }}
            >
              B. DIAGNÓSTICOS
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{
                mb: 1,
                fontWeight: "bold",
                color: "#1A3C6D",
                fontSize: "0.9rem",
              }}
            >
              PRE OPERATORIO
            </Typography>

            {diagnosticosPreOp.map((diagnostico, index) => (
              <Box key={index} sx={{ display: "flex", gap: 1.5, mb: 1.5 }}>
                <Box sx={{ flex: "0 0 40px", display: "flex", alignItems: "center" }}>
                  <Typography variant="body1" sx={{ fontSize: "0.8rem" }}>
                    {index + 1}.
                  </Typography>
                </Box>
                <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 25%" } }}>
                  <Autocomplete
                    options={diagnosticosCIE}
                    getOptionLabel={(option) => option.codigo}
                    value={
                      diagnosticosCIE.find((d) => d.codigo === diagnostico.codigo) || null
                    }
                    onChange={(event, newValue) => {
                      const newDiagnosticos = [...diagnosticosPreOp];
                      newDiagnosticos[index] = {
                        codigo: newValue?.codigo || "",
                        descripcion: newValue?.descripcion || "",
                      };
                      setDiagnosticosPreOp(newDiagnosticos);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="CIE"
                        size="small"
                        InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                        InputProps={{ ...params.InputProps, sx: { fontSize: "0.8rem" } }}
                      />
                    )}
                  />
                </Box>
                <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 65%" } }}>
                  <TextField
                    label="DESCRIPCIÓN"
                    value={diagnostico.descripcion}
                    onChange={(e) => {
                      const newDiagnosticos = [...diagnosticosPreOp];
                      newDiagnosticos[index].descripcion = e.target.value;
                      setDiagnosticosPreOp(newDiagnosticos);
                    }}
                    size="small"
                    fullWidth
                    InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                    InputProps={{ sx: { fontSize: "0.8rem" } }}
                  />
                </Box>
              </Box>
            ))}

            <Divider sx={{ my: 2 }} />

            <Typography
              variant="subtitle1"
              sx={{
                mb: 1.5,
                fontWeight: "bold",
                color: "#1A3C6D",
                fontSize: "0.9rem",
              }}
            >
              POST OPERATORIO
            </Typography>

            {diagnosticosPostOp.map((diagnostico, index) => (
              <Box key={index} sx={{ display: "flex", gap: 1.5, mb: 1.5 }}>
                <Box sx={{ flex: "0 0 40px", display: "flex", alignItems: "center" }}>
                  <Typography variant="body1" sx={{ fontSize: "0.8rem" }}>
                    {index + 1}.
                  </Typography>
                </Box>
                <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 25%" } }}>
                  <Autocomplete
                    options={diagnosticosCIE}
                    getOptionLabel={(option) => option.codigo}
                    value={
                      diagnosticosCIE.find((d) => d.codigo === diagnostico.codigo) || null
                    }
                    onChange={(event, newValue) => {
                      const newDiagnosticos = [...diagnosticosPostOp];
                      newDiagnosticos[index] = {
                        codigo: newValue?.codigo || "",
                        descripcion: newValue?.descripcion || "",
                      };
                      setDiagnosticosPostOp(newDiagnosticos);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="CIE"
                        size="small"
                        InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                        InputProps={{ ...params.InputProps, sx: { fontSize: "0.8rem" } }}
                      />
                    )}
                  />
                </Box>
                <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 65%" } }}>
                  <TextField
                    label="DESCRIPCIÓN"
                    value={diagnostico.descripcion}
                    onChange={(e) => {
                      const newDiagnosticos = [...diagnosticosPostOp];
                      newDiagnosticos[index].descripcion = e.target.value;
                      setDiagnosticosPostOp(newDiagnosticos);
                    }}
                    size="small"
                    fullWidth
                    InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                    InputProps={{ sx: { fontSize: "0.8rem" } }}
                  />
                </Box>
              </Box>
            ))}
          </CardContent>
        </Card>

        {/* C. Procedimiento */}
        <Card>
          <CardContent sx={{ p: 2 }}>
            <Typography
              variant="h6"
              sx={{
                mb: 1.5,
                fontWeight: "bold",
                color: "#1A3C6D",
                fontSize: "1rem",
              }}
            >
              C. PROCEDIMIENTO
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{
                mb: 1,
                fontWeight: "bold",
                color: "#1A3C6D",
                fontSize: "0.9rem",
              }}
            >
              TIPO DE PROCEDIMIENTO:
            </Typography>

            <RadioGroup
              value={tipoProcedimiento}
              onChange={(e) => setTipoProcedimiento(e.target.value)}
              row
              sx={{ mb: 2 }}
            >
              {tiposProcedimiento.map((tipo) => (
                <FormControlLabel
                  key={tipo}
                  value={tipo}
                  control={<Radio size="small" />}
                  label={tipo}
                  sx={{ "& .MuiFormControlLabel-label": { fontSize: "0.8rem" } }}
                />
              ))}
            </RadioGroup>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
              <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 48%" } }}>
                <Autocomplete
                  options={procedimientosCTP}
                  getOptionLabel={(option) =>
                    `${option.codigo} - ${option.descripcion}`
                  }
                  onChange={(event, newValue) =>
                    setProcedimientoProyectado(newValue?.codigo || "")
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="PROCEDIMIENTO PROYECTADO (CTP)"
                      size="small"
                      InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                      InputProps={{ ...params.InputProps, sx: { fontSize: "0.8rem" } }}
                    />
                  )}
                />
              </Box>
              <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 48%" } }}>
                <TextField
                  label="PROCEDIMIENTO REALIZADO"
                  value={procedimientoRealizado}
                  onChange={(e) => setProcedimientoRealizado(e.target.value)}
                  size="small"
                  fullWidth
                  InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                  InputProps={{ sx: { fontSize: "0.8rem" } }}
                />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Panel 3: Equipo Quirúrgico */}
      <TabPanel value={tabValue} index={2}>
        <Card sx={{ mb: 2 }}>
          <CardContent sx={{ p: 2 }}>
            <Typography
              variant="h6"
              sx={{
                mb: 1.5,
                fontWeight: "bold",
                color: "#1A3C6D",
                fontSize: "1rem",
              }}
            >
              D. INTEGRANTES DEL EQUIPO QUIRÚRGICO
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: 1.5 }}>
              <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 48%" } }}>
                <Autocomplete
                  options={medicos}
                  getOptionLabel={(option) =>
                    `${option.nombre} - ${option.especialidad}`
                  }
                  onChange={(event, newValue) =>
                    setEquipoQuirurgico({
                      ...equipoQuirurgico,
                      cirujano1: newValue?.nombre || "",
                    })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="CIRUJANO 1"
                      size="small"
                      InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                      InputProps={{ ...params.InputProps, sx: { fontSize: "0.8rem" } }}
                    />
                  )}
                />
              </Box>
              <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 48%" } }}>
                <Autocomplete
                  options={medicos}
                  getOptionLabel={(option) =>
                    `${option.nombre} - ${option.especialidad}`
                  }
                  onChange={(event, newValue) =>
                    setEquipoQuirurgico({
                      ...equipoQuirurgico,
                      cirujano2: newValue?.nombre || "",
                    })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="CIRUJANO 2"
                      size="small"
                      InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                      InputProps={{ ...params.InputProps, sx: { fontSize: "0.8rem" } }}
                    />
                  )}
                />
              </Box>
            </Box>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: 1.5 }}>
              <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 32%" } }}>
                <Autocomplete
                  options={medicos}
                  getOptionLabel={(option) => option.nombre}
                  onChange={(event, newValue) =>
                    setEquipoQuirurgico({
                      ...equipoQuirurgico,
                      primerAyudante: newValue?.nombre || "",
                    })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="PRIMER AYUDANTE"
                      size="small"
                      InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                      InputProps={{ ...params.InputProps, sx: { fontSize: "0.8rem" } }}
                    />
                  )}
                />
              </Box>
              <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 32%" } }}>
                <Autocomplete
                  options={medicos}
                  getOptionLabel={(option) => option.nombre}
                  onChange={(event, newValue) =>
                    setEquipoQuirurgico({
                      ...equipoQuirurgico,
                      segundoAyudante: newValue?.nombre || "",
                    })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="SEGUNDO AYUDANTE"
                      size="small"
                      InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                      InputProps={{ ...params.InputProps, sx: { fontSize: "0.8rem" } }}
                    />
                  )}
                />
              </Box>
              <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 32%" } }}>
                <Autocomplete
                  options={medicos}
                  getOptionLabel={(option) => option.nombre}
                  onChange={(event, newValue) =>
                    setEquipoQuirurgico({
                      ...equipoQuirurgico,
                      tercerAyudante: newValue?.nombre || "",
                    })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="TERCER AYUDANTE"
                      size="small"
                      InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                      InputProps={{ ...params.InputProps, sx: { fontSize: "0.8rem" } }}
                    />
                  )}
                />
              </Box>
            </Box>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: 1.5 }}>
              <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 32%" } }}>
                <TextField
                  label="INSTRUMENTISTA"
                  value={equipoQuirurgico.instrumentista}
                  onChange={(e) =>
                    setEquipoQuirurgico({
                      ...equipoQuirurgico,
                      instrumentista: e.target.value,
                    })
                  }
                  size="small"
                  fullWidth
                  InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                  InputProps={{ sx: { fontSize: "0.8rem" } }}
                />
              </Box>
              <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 32%" } }}>
                <Autocomplete
                  options={medicos}
                  getOptionLabel={(option) => option.nombre}
                  onChange={(event, newValue) =>
                    setEquipoQuirurgico({
                      ...equipoQuirurgico,
                      circulante: newValue?.nombre || "",
                    })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="CIRCULANTE"
                      size="small"
                      InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                      InputProps={{ ...params.InputProps, sx: { fontSize: "0.8rem" } }}
                    />
                  )}
                />
              </Box>
              <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 32%" } }}>
                <Autocomplete
                  options={medicos}
                  getOptionLabel={(option) =>
                    `${option.nombre} - ${option.especialidad}`
                  }
                  onChange={(event, newValue) =>
                    setEquipoQuirurgico({
                      ...equipoQuirurgico,
                      anestesiologo: newValue?.nombre || "",
                    })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="ANESTESIÓLOGO(A)"
                      size="small"
                      InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                      InputProps={{ ...params.InputProps, sx: { fontSize: "0.8rem" } }}
                    />
                  )}
                />
              </Box>
            </Box>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
              <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 48%" } }}>
                <TextField
                  label="AYUDANTE DE ANESTESIA"
                  value={equipoQuirurgico.ayudanteAnestesia}
                  onChange={(e) =>
                    setEquipoQuirurgico({
                      ...equipoQuirurgico,
                      ayudanteAnestesia: e.target.value,
                    })
                  }
                  size="small"
                  fullWidth
                  InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                  InputProps={{ sx: { fontSize: "0.8rem" } }}
                />
              </Box>
              <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 48%" } }}>
                <TextField
                  label="OTROS"
                  value={equipoQuirurgico.otros}
                  onChange={(e) =>
                    setEquipoQuirurgico({
                      ...equipoQuirurgico,
                      otros: e.target.value,
                    })
                  }
                  size="small"
                  fullWidth
                  InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                  InputProps={{ sx: { fontSize: "0.8rem" } }}
                />
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* E. Tipo de Anestesia */}
        <Card>
          <CardContent sx={{ p: 2 }}>
            <Typography
              variant="h6"
              sx={{
                mb: 1.5,
                fontWeight: "bold",
                color: "#1A3C6D",
                fontSize: "1rem",
              }}
            >
              E. TIPO DE ANESTESIA
            </Typography>
            <RadioGroup
              value={tipoAnestesia}
              onChange={(e) => setTipoAnestesia(e.target.value)}
              row
            >
              {tiposAnestesia.map((tipo) => (
                <FormControlLabel
                  key={tipo}
                  value={tipo}
                  control={<Radio size="small" />}
                  label={tipo}
                  sx={{ "& .MuiFormControlLabel-label": { fontSize: "0.8rem" } }}
                />
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Panel 4: Tiempos Quirúrgicos */}
      <TabPanel value={tabValue} index={3}>
        <Card>
          <CardContent sx={{ p: 2 }}>
            <Typography
              variant="h6"
              sx={{
                mb: 1.5,
                fontWeight: "bold",
                color: "#1A3C6D",
                fontSize: "1rem",
              }}
            >
              F. TIEMPOS QUIRÚRGICOS
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: 1.5 }}>
              <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 32%" } }}>
                <TextField
                  label="FECHA DE OPERACIÓN"
                  type="date"
                  value={tiemposQuirurgicos.fechaOperacion}
                  onChange={(e) =>
                    setTiemposQuirurgicos({
                      ...tiemposQuirurgicos,
                      fechaOperacion: e.target.value,
                    })
                  }
                  InputLabelProps={{ shrink: true, sx: { fontSize: "0.8rem" } }}
                  InputProps={{ sx: { fontSize: "0.8rem" } }}
                  size="small"
                  fullWidth
                />
              </Box>
              <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 32%" } }}>
                <TextField
                  label="HORA DE INICIO"
                  type="time"
                  value={tiemposQuirurgicos.horaInicio}
                  onChange={(e) =>
                    setTiemposQuirurgicos({
                      ...tiemposQuirurgicos,
                      horaInicio: e.target.value,
                    })
                  }
                  InputLabelProps={{ shrink: true, sx: { fontSize: "0.8rem" } }}
                  InputProps={{ sx: { fontSize: "0.8rem" } }}
                  size="small"
                  fullWidth
                  required
                  helperText="Campo obligatorio"
                />
              </Box>
              <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 32%" } }}>
                <TextField
                  label="HORA DE TERMINACIÓN"
                  type="time"
                  value={tiemposQuirurgicos.horaTerminacion}
                  onChange={(e) =>
                    setTiemposQuirurgicos({
                      ...tiemposQuirurgicos,
                      horaTerminacion: e.target.value,
                    })
                  }
                  InputLabelProps={{ shrink: true, sx: { fontSize: "0.8rem" } }}
                  InputProps={{ sx: { fontSize: "0.8rem" } }}
                  size="small"
                  fullWidth
                  required
                  helperText="Campo obligatorio"
                />
              </Box>
            </Box>

            <Box sx={{ mb: 1.5 }}>
              <TextField
                label="DIÉRESIS"
                multiline
                rows={2}
                value={tiemposQuirurgicos.dieresis}
                onChange={(e) =>
                  setTiemposQuirurgicos({
                    ...tiemposQuirurgicos,
                    dieresis: e.target.value,
                  })
                }
                fullWidth
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                InputProps={{ sx: { fontSize: "0.8rem" } }}
              />
            </Box>

            <Box sx={{ mb: 1.5 }}>
              <TextField
                label="EXPOSICIÓN Y EXPLORACIÓN"
                multiline
                rows={2}
                value={tiemposQuirurgicos.exposicionExploracion}
                onChange={(e) =>
                  setTiemposQuirurgicos({
                    ...tiemposQuirurgicos,
                    exposicionExploracion: e.target.value,
                  })
                }
                fullWidth
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                InputProps={{ sx: { fontSize: "0.8rem" } }}
              />
            </Box>

            <Box sx={{ mb: 1.5 }}>
              <TextField
                label="HALLAZGOS QUIRÚRGICOS"
                multiline
                rows={2}
                value={tiemposQuirurgicos.hallazgosQuirurgicos}
                onChange={(e) =>
                  setTiemposQuirurgicos({
                    ...tiemposQuirurgicos,
                    hallazgosQuirurgicos: e.target.value,
                  })
                }
                fullWidth
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                InputProps={{ sx: { fontSize: "0.8rem" } }}
              />
            </Box>

            <Box sx={{ position: "relative" }}>
              <TextField
                label="PROCEDIMIENTO QUIRÚRGICO"
                multiline
                rows={4}
                value={tiemposQuirurgicos.procedimientoQuirurgico}
                onChange={(e) =>
                  setTiemposQuirurgicos({
                    ...tiemposQuirurgicos,
                    procedimientoQuirurgico: e.target.value,
                  })
                }
                fullWidth
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                InputProps={{ sx: { fontSize: "0.8rem" } }}
              />
              <Button
                variant="contained"
                size="small"
                startIcon={<TemplateIcon />}
                onClick={() => setOpenTemplateDialog(true)}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  background: "#1A3C6D",
                  "&:hover": { background: "#274472" },
                  fontSize: "0.7rem",
                }}
              >
                PLANTILLA
              </Button>
            </Box>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Panel 5: Complicaciones */}
      <TabPanel value={tabValue} index={4}>
        <Card>
          <CardContent sx={{ p: 2 }}>
            <Typography
              variant="h6"
              sx={{
                mb: 1.5,
                fontWeight: "bold",
                color: "#1A3C6D",
                fontSize: "1rem",
              }}
            >
              G. COMPLICACIONES DEL PROCEDIMIENTO QUIRÚRGICO
            </Typography>

            <Box sx={{ mb: 1.5 }}>
              <TextField
                label="DESCRIPCIÓN DE COMPLICACIONES"
                multiline
                rows={3}
                value={complicaciones.descripcion}
                onChange={(e) =>
                  setComplicaciones({
                    ...complicaciones,
                    descripcion: e.target.value,
                  })
                }
                inputProps={{ maxLength: 100 }}
                helperText="Máximo 100 caracteres"
                fullWidth
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                InputProps={{ sx: { fontSize: "0.8rem" } }}
              />
            </Box>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: 1.5 }}>
              <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 48%" } }}>
                <TextField
                  label="PÉRDIDA SANGUÍNEA TOTAL (ml)"
                  type="number"
                  value={complicaciones.perdidaSanguineaTotal}
                  onChange={(e) =>
                    setComplicaciones({
                      ...complicaciones,
                      perdidaSanguineaTotal: parseInt(e.target.value) || 0,
                    })
                  }
                  size="small"
                  fullWidth
                  inputProps={{ maxLength: 10 }}
                  InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                  InputProps={{ sx: { fontSize: "0.8rem" } }}
                />
              </Box>
              <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 48%" } }}>
                <TextField
                  label="SANGRADO APROXIMADO (ml)"
                  type="number"
                  value={complicaciones.sangradoAproximado}
                  onChange={(e) =>
                    setComplicaciones({
                      ...complicaciones,
                      sangradoAproximado: parseInt(e.target.value) || 0,
                    })
                  }
                  size="small"
                  fullWidth
                  inputProps={{ maxLength: 10 }}
                  InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                  InputProps={{ sx: { fontSize: "0.8rem" } }}
                />
              </Box>
            </Box>

            <Box sx={{ mb: 1.5 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  mb: 1,
                  fontWeight: "bold",
                  color: "#1A3C6D",
                  fontSize: "0.9rem",
                }}
              >
                USO DE MATERIAL PROTÉSICO:
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={complicaciones.usoMaterialProtesico}
                    onChange={(e) =>
                      setComplicaciones({
                        ...complicaciones,
                        usoMaterialProtesico: e.target.checked,
                      })
                    }
                    size="small"
                  />
                }
                label="SÍ"
                sx={{ "& .MuiFormControlLabel-label": { fontSize: "0.8rem" } }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!complicaciones.usoMaterialProtesico}
                    onChange={(e) =>
                      setComplicaciones({
                        ...complicaciones,
                        usoMaterialProtesico: !e.target.checked,
                      })
                    }
                    size="small"
                  />
                }
                label="NO"
                sx={{ "& .MuiFormControlLabel-label": { fontSize: "0.8rem" } }}
              />
            </Box>

            <Box>
              <TextField
                label="DESCRIPCIÓN DEL MATERIAL"
                value={complicaciones.descripcionMaterial}
                onChange={(e) =>
                  setComplicaciones({
                    ...complicaciones,
                    descripcionMaterial: e.target.value,
                  })
                }
                size="small"
                fullWidth
                inputProps={{ maxLength: 50 }}
                helperText="Máximo 50 caracteres"
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                InputProps={{ sx: { fontSize: "0.8rem" } }}
              />
            </Box>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Panel 6: Exámenes */}
      <TabPanel value={tabValue} index={5}>
        <Card>
          <CardContent sx={{ p: 2 }}>
            <Typography
              variant="h6"
              sx={{
                mb: 1.5,
                fontWeight: "bold",
                color: "#1A3C6D",
                fontSize: "1rem",
              }}
            >
              H. EXÁMENES HISTOPATOLÓGICOS
            </Typography>

            <Box sx={{ mb: 1.5 }}>
              <TextField
                label="TRANSQUIRÚRGICO"
                multiline
                rows={2}
                value={examenesHistopatologicos.transquirurgico}
                onChange={(e) =>
                  setExamenesHistopatologicos({
                    ...examenesHistopatologicos,
                    transquirurgico: e.target.value,
                  })
                }
                fullWidth
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                InputProps={{ sx: { fontSize: "0.8rem" } }}
              />
            </Box>

            <Box sx={{ mb: 1.5 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  mb: 1,
                  fontWeight: "bold",
                  color: "#1A3C6D",
                  fontSize: "0.9rem",
                }}
              >
                BIOPSIA POR CONGELACIÓN:
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={examenesHistopatologicos.biopsiaCongelacion}
                    onChange={(e) =>
                      setExamenesHistopatologicos({
                        ...examenesHistopatologicos,
                        biopsiaCongelacion: e.target.checked,
                      })
                    }
                    size="small"
                  />
                }
                label="SÍ"
                sx={{ "& .MuiFormControlLabel-label": { fontSize: "0.8rem" } }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!examenesHistopatologicos.biopsiaCongelacion}
                    onChange={(e) =>
                      setExamenesHistopatologicos({
                        ...examenesHistopatologicos,
                        biopsiaCongelacion: !e.target.checked,
                      })
                    }
                    size="small"
                  />
                }
                label="NO"
                sx={{ "& .MuiFormControlLabel-label": { fontSize: "0.8rem" } }}
              />
            </Box>

            <Box sx={{ mb: 1.5 }}>
              <TextField
                label="RESULTADO"
                value={examenesHistopatologicos.resultadoBiopsia}
                onChange={(e) =>
                  setExamenesHistopatologicos({
                    ...examenesHistopatologicos,
                    resultadoBiopsia: e.target.value,
                  })
                }
                size="small"
                fullWidth
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                InputProps={{ sx: { fontSize: "0.8rem" } }}
              />
            </Box>

            <Box sx={{ mb: 1.5 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  mb: 1,
                  fontWeight: "bold",
                  color: "#1A3C6D",
                  fontSize: "0.9rem",
                }}
              >
                HISTOPATOLÓGICO:
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={examenesHistopatologicos.histopatologico}
                    onChange={(e) =>
                      setExamenesHistopatologicos({
                        ...examenesHistopatologicos,
                        histopatologico: e.target.checked,
                      })
                    }
                    size="small"
                  />
                }
                label="SÍ"
                sx={{ "& .MuiFormControlLabel-label": { fontSize: "0.8rem" } }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!examenesHistopatologicos.histopatologico}
                    onChange={(e) =>
                      setExamenesHistopatologicos({
                        ...examenesHistopatologicos,
                        histopatologico: !e.target.checked,
                      })
                    }
                    size="small"
                  />
                }
                label="NO"
                sx={{ "& .MuiFormControlLabel-label": { fontSize: "0.8rem" } }}
              />
            </Box>

            <Box sx={{ mb: 1.5 }}>
              <TextField
                label="MUESTRA"
                value={examenesHistopatologicos.muestra}
                onChange={(e) =>
                  setExamenesHistopatologicos({
                    ...examenesHistopatologicos,
                    muestra: e.target.value,
                  })
                }
                size="small"
                fullWidth
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                InputProps={{ sx: { fontSize: "0.8rem" } }}
              />
            </Box>

            <Box sx={{ mb: 1.5 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  mb: 1,
                  fontWeight: "bold",
                  color: "#1A3C6D",
                  fontSize: "0.9rem",
                }}
              >
                ¿REQUERIE SOLICITUD DE ANATOMÍA PATOLÓGICA?
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={examenesHistopatologicos.requiereSolicitudAP}
                    onChange={(e) => {
                      setExamenesHistopatologicos({
                        ...examenesHistopatologicos,
                        requiereSolicitudAP: e.target.checked,
                      });
                      if (e.target.checked) {
                        setOpenSolicitudAP(true);
                      }
                    }}
                    size="small"
                  />
                }
                label="SÍ"
                sx={{ "& .MuiFormControlLabel-label": { fontSize: "0.8rem" } }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!examenesHistopatologicos.requiereSolicitudAP}
                    onChange={(e) =>
                      setExamenesHistopatologicos({
                        ...examenesHistopatologicos,
                        requiereSolicitudAP: !e.target.checked,
                      })
                    }
                    size="small"
                  />
                }
                label="NO"
                sx={{ "& .MuiFormControlLabel-label": { fontSize: "0.8rem" } }}
              />
            </Box>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Panel 7: Diagrama */}
      <TabPanel value={tabValue} index={6}>
        <Card>
          <CardContent>
            <Typography
              variant="h6"
              sx={{
                mb: 1.5,
                fontWeight: "bold",
                color: "#1A3C6D",
                fontSize: "1rem",
              }}
            >
              I. DIAGRAMA DEL PROCEDIMIENTO
            </Typography>
            <Box sx={{ textAlign: "center", p: 3 }}>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="diagrama-upload"
                type="file"
                onChange={handleImageUpload}
              />
              <label htmlFor="diagrama-upload">
                <Box
                  sx={{
                    border: "2px dashed #1976d2",
                    borderRadius: 2,
                    p: 4,
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "#f5f5f5" },
                  }}
                >
                  {imagenDiagrama ? (
                    <Typography>
                      Imagen cargada: {imagenDiagrama.name}
                    </Typography>
                  ) : (
                    <Box>
                      <UploadIcon sx={{ fontSize: 48, color: "#1976d2" }} />
                      <Typography>
                        Haga clic para cargar imagen del diagrama
                      </Typography>
                      <Typography variant="caption" color="error">
                        Campo obligatorio
                      </Typography>
                    </Box>
                  )}
                </Box>
              </label>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography
              variant="h6"
              sx={{
                mb: 1.5,
                fontWeight: "bold",
                color: "#1A3C6D",
                fontSize: "1rem",
              }}
            >
              J. DATOS DEL PROFESIONAL RESPONSABLE
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Nombre y Apellidos"
                  value={equipoQuirurgico.cirujano1}
                  disabled
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Especialidad"
                  value="Cirugía General"
                  disabled
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2">
                    Firma: (Imagen de la base de datos)
                  </Typography>
                  <Typography variant="body2">
                    Sello y Número de Documento: (Imagen de la base de datos)
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Botones de acción */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleGuardar}
        >
          Guardar
        </Button>
        <Button variant="outlined" startIcon={<EditIcon />}>
          Editar
        </Button>
        <Button variant="outlined" startIcon={<PrintIcon />}>
          Imprimir
        </Button>
        <Button variant="outlined" startIcon={<ExportIcon />}>
          Exportar PDF
        </Button>
        <Button variant="outlined" startIcon={<AddIcon />}>
          Nuevo
        </Button>
        <Button variant="outlined" startIcon={<TemplateIcon />}>
          Nueva Plantilla
        </Button>
      </Box>

      {/* Errores */}
      {errors.length > 0 && (
        <Alert severity="error" sx={{ mt: 2 }}>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </Alert>
      )}

      {/* Diálogo de Solicitud de Anatomía Patológica */}
      <Dialog open={openSolicitudAP} onClose={() => setOpenSolicitudAP(false)}>
        <DialogTitle>¿La solicitud es interna o externa?</DialogTitle>
        <DialogContent>
          <RadioGroup
            value={examenesHistopatologicos.tipoSolicitud}
            onChange={(e) =>
              setExamenesHistopatologicos({
                ...examenesHistopatologicos,
                tipoSolicitud: e.target.value as "interna" | "externa",
              })
            }
          >
            <FormControlLabel
              value="interna"
              control={<Radio />}
              label="INTERNA"
            />
            <FormControlLabel
              value="externa"
              control={<Radio />}
              label="EXTERNA"
            />
          </RadioGroup>

          {examenesHistopatologicos.tipoSolicitud === "externa" && (
            <TextField
              fullWidth
              label="Nombre del Responsable Externo"
              value={examenesHistopatologicos.responsableExterno}
              onChange={(e) =>
                setExamenesHistopatologicos({
                  ...examenesHistopatologicos,
                  responsableExterno: e.target.value,
                })
              }
              required
              sx={{ mt: 2 }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSolicitudAP(false)}>Cancelar</Button>
          <Button onClick={() => setOpenSolicitudAP(false)} variant="contained">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo de Plantillas */}
      <Dialog
        open={openTemplateDialog}
        onClose={() => setOpenTemplateDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Plantillas de Protocolo</DialogTitle>
        <DialogContent>
          <Typography variant="body2" gutterBottom>
            Seleccione una plantilla para reutilizar:
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Chip
              label="Apendicectomía Laparoscópica"
              onClick={() => {
                setTiemposQuirurgicos({
                  ...tiemposQuirurgicos,
                  procedimientoQuirurgico:
                    "Se realiza apendicectomía laparoscópica con técnica estándar...",
                });
                setOpenTemplateDialog(false);
              }}
              variant="outlined"
            />
            <Chip
              label="Colecistectomía Laparoscópica"
              onClick={() => {
                setTiemposQuirurgicos({
                  ...tiemposQuirurgicos,
                  procedimientoQuirurgico:
                    "Se realiza colecistectomía laparoscópica con técnica de 4 puertos...",
                });
                setOpenTemplateDialog(false);
              }}
              variant="outlined"
            />
            <Chip
              label="Hernioplastia Inguinal"
              onClick={() => {
                setTiemposQuirurgicos({
                  ...tiemposQuirurgicos,
                  procedimientoQuirurgico:
                    "Se realiza hernioplastia inguinal con técnica de Lichtenstein...",
                });
                setOpenTemplateDialog(false);
              }}
              variant="outlined"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTemplateDialog(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
