import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
  Checkbox,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Alert,
  CircularProgress,
  Chip,
  IconButton,
} from "@mui/material";
import {
  Search as SearchIcon,
  PersonSearch as PersonSearchIcon,
  Clear as ClearIcon,
  CheckCircle as CheckIcon,
} from "@mui/icons-material";

interface IngresoPacienteProps {
  open: boolean;
  formData: any;
  handleClose: () => void;
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }
    >
  ) => void;
  handleCheckboxChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "medicoTratante" | "medicoCirujano"
  ) => void;
  handleSave: () => void;
}

// Interface para datos del paciente
interface PacienteData {
  cedula: string;
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  fechaNacimiento: string;
  edad: string;
  sex: string;
}

const IngresoPaciente: React.FC<IngresoPacienteProps> = ({
  open,
  formData,
  handleClose,
  handleInputChange,
  handleCheckboxChange,
  handleSave,
}) => {
  // Estados para búsqueda de paciente
  const [cedulaBusqueda, setCedulaBusqueda] = useState("");
  const [buscandoPaciente, setBuscandoPaciente] = useState(false);
  const [pacienteEncontrado, setPacienteEncontrado] = useState<PacienteData | null>(null);
  const [errorBusqueda, setErrorBusqueda] = useState("");

  // Base de datos de médicos anestesiólogos
  const medicosAnestesiologos = [
    { id: "ANE001", nombre: "DR. FERNANDO CASTRO LÓPEZ", especialidad: "ANESTESIÓLOGO CARDIOVASCULAR" },
    { id: "ANE002", nombre: "DRA. PATRICIA MORENO SILVA", especialidad: "ANESTESIÓLOGO PEDIÁTRICO" },
    { id: "ANE003", nombre: "DR. LUIS VARGAS TORRES", especialidad: "ANESTESIÓLOGO GENERAL" }
  ];

  // Base de datos de médicos tratantes - MÉDICOS
  const medicosTratantesMedicos = [
    { id: "TRA001", nombre: "DR. JAIME PATRICIO LEMA MASALEMA", especialidad: "URÓLOGO" },
    { id: "TRA002", nombre: "DR. CARLOS EDUARDO MENDOZA SILVA", especialidad: "CARDIÓLOGO INTERVENCIONISTA" },
    { id: "TRA003", nombre: "DRA. MARÍA ELENA GARCÍA TORRES", especialidad: "CARDIÓLOGA CLÍNICA" }
  ];

  // Base de datos de médicos tratantes - CLÍNICA
  const medicosTratantesClinica = [
    { id: "CLI001", nombre: "DR. ANDRÉS FELIPE ROJAS VARGAS", especialidad: "INTENSIVISTA UCI - CLÍNICA" },
    { id: "CLI002", nombre: "DRA. SOFÍA ALEJANDRA MORENO JIMÉNEZ", especialidad: "MEDICINA INTERNA - CLÍNICA" },
    { id: "CLI003", nombre: "DR. FERNANDO JOSÉ CASTRO LÓPEZ", especialidad: "MEDICINA GENERAL - CLÍNICA" }
  ];

  // Base de datos de médicos cirujanos - MÉDICOS
  const medicosCirujanosMedicos = [
    { id: "CIR001", nombre: "DR. ROBERTO SILVA MENDOZA", especialidad: "CIRUJANO CARDIOVASCULAR" },
    { id: "CIR002", nombre: "DR. ALEJANDRO TORRES VARGAS", especialidad: "CIRUJANO GENERAL" },
    { id: "CIR003", nombre: "DRA. LUCÍA PATRICIA HERRERA RUIZ", especialidad: "CIRUJANA PLÁSTICA" }
  ];

  // Base de datos de médicos cirujanos - CLÍNICA
  const medicosCirujnosClinica = [
    { id: "CLC001", nombre: "DR. MIGUEL ÁNGEL LÓPEZ CASTRO", especialidad: "CIRUJANO GENERAL - CLÍNICA" },
    { id: "CLC002", nombre: "DRA. ANA PATRICIA RODRÍGUEZ SILVA", especialidad: "CIRUJANA ONCÓLOGA - CLÍNICA" },
    { id: "CLC003", nombre: "DR. DIEGO FERNANDO MORALES TORRES", especialidad: "CIRUJANO TORÁCICO - CLÍNICA" }
  ];

  // Base de datos simulada de pacientes
  const basePacientes: PacienteData[] = [
    {
      cedula: "0912279775",
      primerNombre: "JAIME",
      segundoNombre: "PATRICIO",
      primerApellido: "LEMA",
      segundoApellido: "MASALEMA",
      fechaNacimiento: "1985-03-15",
      edad: "39",
      sex: "Masculino"
    },
    {
      cedula: "0705963858",
      primerNombre: "MARÍA",
      segundoNombre: "ELENA",
      primerApellido: "GARCÍA",
      segundoApellido: "TORRES",
      fechaNacimiento: "1978-07-22",
      edad: "46",
      sex: "Femenino"
    },
    {
      cedula: "1234567890",
      primerNombre: "CARLOS",
      segundoNombre: "EDUARDO",
      primerApellido: "MENDOZA",
      segundoApellido: "SILVA",
      fechaNacimiento: "1992-11-08",
      edad: "32",
      sex: "Masculino"
    },
    {
      cedula: "9876543210",
      primerNombre: "ANA",
      segundoNombre: "PATRICIA",
      primerApellido: "RODRÍGUEZ",
      segundoApellido: "LÓPEZ",
      fechaNacimiento: "1990-05-30",
      edad: "34",
      sex: "Femenino"
    },
    {
      cedula: "5555666677",
      primerNombre: "LUIS",
      segundoNombre: "FERNANDO",
      primerApellido: "CASTRO",
      segundoApellido: "VARGAS",
      fechaNacimiento: "1987-12-12",
      edad: "37",
      sex: "Masculino"
    },
    {
      cedula: "1111222233",
      primerNombre: "SOFÍA",
      segundoNombre: "ALEJANDRA",
      primerApellido: "MORENO",
      segundoApellido: "JIMÉNEZ",
      fechaNacimiento: "1995-02-18",
      edad: "29",
      sex: "Femenino"
    }
  ];

  // Función para buscar paciente por cédula
  const buscarPaciente = async () => {
    if (!cedulaBusqueda || cedulaBusqueda.length < 10) {
      setErrorBusqueda("Ingrese un número de cédula válido (10 dígitos)");
      return;
    }

    setBuscandoPaciente(true);
    setErrorBusqueda("");
    setPacienteEncontrado(null);

    // Simular delay de búsqueda
    setTimeout(() => {
      const paciente = basePacientes.find(p => p.cedula === cedulaBusqueda);
      
      if (paciente) {
        setPacienteEncontrado(paciente);
        cargarDatosPaciente(paciente);
        setErrorBusqueda("");
      } else {
        setErrorBusqueda("No se encontró ningún paciente con esa cédula");
        setPacienteEncontrado(null);
      }
      
      setBuscandoPaciente(false);
    }, 1500);
  };

  // Función para cargar datos del paciente encontrado
  const cargarDatosPaciente = (paciente: PacienteData) => {
    // Cargar todos los datos del paciente
    handleInputChange({ target: { name: "id", value: paciente.cedula } } as any);
    handleInputChange({ target: { name: "primerNombre", value: paciente.primerNombre } } as any);
    handleInputChange({ target: { name: "segundoNombre", value: paciente.segundoNombre } } as any);
    handleInputChange({ target: { name: "primerApellido", value: paciente.primerApellido } } as any);
    handleInputChange({ target: { name: "segundoApellido", value: paciente.segundoApellido } } as any);
    handleInputChange({ target: { name: "fechaNacimiento", value: paciente.fechaNacimiento } } as any);
    handleInputChange({ target: { name: "edad", value: paciente.edad } } as any);
    handleInputChange({ target: { name: "sex", value: paciente.sex } } as any);
  };

  // Función para limpiar búsqueda
  const limpiarBusqueda = () => {
    setCedulaBusqueda("");
    setPacienteEncontrado(null);
    setErrorBusqueda("");
    
    // Limpiar campos del formulario
    handleInputChange({ target: { name: "id", value: "" } } as any);
    handleInputChange({ target: { name: "primerNombre", value: "" } } as any);
    handleInputChange({ target: { name: "segundoNombre", value: "" } } as any);
    handleInputChange({ target: { name: "primerApellido", value: "" } } as any);
    handleInputChange({ target: { name: "segundoApellido", value: "" } } as any);
    handleInputChange({ target: { name: "fechaNacimiento", value: "" } } as any);
    handleInputChange({ target: { name: "edad", value: "" } } as any);
    handleInputChange({ target: { name: "sex", value: "" } } as any);
  };

  // Función para calcular edad basada en fecha de nacimiento
  const calculateAge = (birthDate: string): string => {
    if (!birthDate) return "";

    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age.toString();
  };

  // Obtener fecha actual para fecha de ingreso
  const getCurrentDate = (): string => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  // Establecer fecha actual si no existe
  React.useEffect(() => {
    if (!formData.admissionDate) {
      handleInputChange({
        target: {
          name: "admissionDate",
          value: getCurrentDate(),
        },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  }, [formData.admissionDate]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionProps={{ timeout: 500 }}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle
        sx={{
          backgroundColor: "#1A3C6D",
          color: "#FFFFFF",
          textAlign: "center",
          marginBottom: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1
        }}
      >
        <PersonSearchIcon sx={{ fontSize: "1.2rem" }} />
        ASIGNACION DE CAMA
      </DialogTitle>
      <DialogContent
        sx={{
          padding: "20px",
          backgroundColor: "#F5F5F5",
          marginTop: "20px",
        }}
      >
        {/* Sección de Búsqueda de Paciente */}
        <Box sx={{ 
          marginBottom: "25px", 
          padding: "15px", 
          backgroundColor: "#E3F2FD", 
          borderRadius: "8px",
          border: "2px solid #1976D2"
        }}>
          <Typography
            sx={{
              fontSize: "0.9rem",
              color: "#1A3C6D",
              fontWeight: "bold",
              marginBottom: "15px",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1
            }}
          >
            <SearchIcon sx={{ fontSize: "1rem" }} />
             BÚSQUEDA DE PACIENTE POR CÉDULA
          </Typography>

          <Box sx={{ display: "flex", gap: 1, alignItems: "center", marginBottom: "10px" }}>
            <TextField
              label="Número de Cédula"
              placeholder="Ingrese cédula (10 dígitos)"
              value={cedulaBusqueda}
              onChange={(e) => setCedulaBusqueda(e.target.value)}
              size="small"
              sx={{
                flex: 1,
                backgroundColor: "#FFFFFF",
                "& .MuiOutlinedInput-root": {
                  height: "40px",
                },
              }}
              inputProps={{ maxLength: 10 }}
            />
            
            <Button
              variant="contained"
              onClick={buscarPaciente}
              disabled={buscandoPaciente || cedulaBusqueda.length < 10}
              sx={{
                backgroundColor: "#1976D2",
                height: "40px",
                minWidth: "100px",
                "&:hover": { backgroundColor: "#1565C0" }
              }}
              startIcon={buscandoPaciente ? <CircularProgress size={16} color="inherit" /> : <SearchIcon />}
            >
              {buscandoPaciente ? "Buscando..." : "Buscar"}
            </Button>

            <IconButton
              onClick={limpiarBusqueda}
              sx={{ color: "#f44336", height: "40px", width: "40px" }}
            >
              <ClearIcon />
            </IconButton>
          </Box>

          {/* Mensajes de estado */}
          {errorBusqueda && (
            <Alert severity="error" sx={{ fontSize: "0.8rem", marginBottom: "10px" }}>
              {errorBusqueda}
            </Alert>
          )}

          {pacienteEncontrado && (
            <Alert 
              severity="success" 
              icon={<CheckIcon fontSize="inherit" />}
              sx={{ fontSize: "0.8rem", marginBottom: "10px" }}
            >
              <strong>Paciente encontrado:</strong> {pacienteEncontrado.primerNombre} {pacienteEncontrado.primerApellido}
              <br />
              <small>Los datos han sido cargados automáticamente en el formulario</small>
            </Alert>
          )}

          {/* Cédulas de ejemplo */}
          <Box sx={{ marginTop: "10px" }}>
            <Typography sx={{ fontSize: "0.75rem", color: "#666", marginBottom: "5px" }}>
               <strong>Cédulas de ejemplo para pruebas:</strong>
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {basePacientes.slice(0, 4).map((paciente) => (
                <Chip
                  key={paciente.cedula}
                  label={`${paciente.cedula} - ${paciente.primerNombre} ${paciente.primerApellido}`}
                  size="small"
                  onClick={() => setCedulaBusqueda(paciente.cedula)}
                  sx={{ 
                    fontSize: "0.65rem", 
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "#1976D2", color: "white" }
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>

        {/* Información de Cama y Sala */}
        <Box sx={{ display: "flex", gap: 2, marginBottom: "15px" }}>
          <TextField
            name="sala"
            label="SALA"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.sala}
            disabled
            size="small"
            sx={{
              backgroundColor: "#E0E0E0",
              borderRadius: "4px",
              "& .MuiOutlinedInput-root": {
                height: "40px",
              },
            }}
          />
          <TextField
            name="cama"
            label="CAMA"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.cama}
            disabled
            size="small"
            sx={{
              backgroundColor: "#E0E0E0",
              borderRadius: "4px",
              "& .MuiOutlinedInput-root": {
                height: "40px",
              },
            }}
          />
        </Box>

        {/* Datos del Paciente - Solo se pueden editar si no se encontró por búsqueda */}
        <Box sx={{ 
          padding: "15px", 
          backgroundColor: pacienteEncontrado ? "#E8F5E8" : "#FFFFFF", 
          borderRadius: "8px",
          marginBottom: "15px",
          border: pacienteEncontrado ? "2px solid #4CAF50" : "1px solid #DDD"
        }}>
          <Typography
            sx={{
              fontSize: "0.8rem",
              color: "#1A3C6D",
              fontWeight: "bold",
              marginBottom: "15px",
              textAlign: "center"
            }}
          >
            DATOS DEL PACIENTE {pacienteEncontrado && "(CARGADOS AUTOMÁTICAMENTE)"}
          </Typography>

          {/* Fila 1: Primer Nombre, Segundo Nombre */}
          <Box sx={{ display: "flex", gap: 2, marginBottom: "15px" }}>
            <TextField
              name="primerNombre"
              label="PRIMER NOMBRE"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.primerNombre}
              onChange={handleInputChange}
              disabled={!!pacienteEncontrado}
              size="small"
              sx={{
                backgroundColor: pacienteEncontrado ? "#F0F8F0" : "#FFFFFF",
                borderRadius: "4px",
                "& .MuiOutlinedInput-root": {
                  height: "40px",
                },
              }}
            />
            <TextField
              name="segundoNombre"
              label="SEGUNDO NOMBRE"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.segundoNombre}
              onChange={handleInputChange}
              disabled={!!pacienteEncontrado}
              size="small"
              sx={{
                backgroundColor: pacienteEncontrado ? "#F0F8F0" : "#FFFFFF",
                borderRadius: "4px",
                "& .MuiOutlinedInput-root": {
                  height: "40px",
                },
              }}
            />
          </Box>

          {/* Fila 2: Primer Apellido, Segundo Apellido */}
          <Box sx={{ display: "flex", gap: 2, marginBottom: "15px" }}>
            <TextField
              name="primerApellido"
              label="PRIMER APELLIDO"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.primerApellido}
              onChange={handleInputChange}
              disabled={!!pacienteEncontrado}
              size="small"
              sx={{
                backgroundColor: pacienteEncontrado ? "#F0F8F0" : "#FFFFFF",
                borderRadius: "4px",
                "& .MuiOutlinedInput-root": {
                  height: "40px",
                },
              }}
            />
            <TextField
              name="segundoApellido"
              label="SEGUNDO APELLIDO"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.segundoApellido}
              onChange={handleInputChange}
              disabled={!!pacienteEncontrado}
              size="small"
              sx={{
                backgroundColor: pacienteEncontrado ? "#F0F8F0" : "#FFFFFF",
                borderRadius: "4px",
                "& .MuiOutlinedInput-root": {
                  height: "40px",
                },
              }}
            />
          </Box>

          {/* Fila 3: Cédula, Fecha de Nacimiento, Edad */}
          <Box sx={{ display: "flex", gap: 2, marginBottom: "15px" }}>
            <TextField
              name="id"
              label="CÉDULA"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.id}
              onChange={handleInputChange}
              disabled={!!pacienteEncontrado}
              size="small"
              sx={{
                backgroundColor: pacienteEncontrado ? "#F0F8F0" : "#FFFFFF",
                borderRadius: "4px",
                "& .MuiOutlinedInput-root": {
                  height: "40px",
                },
              }}
            />
            <TextField
              name="fechaNacimiento"
              label="FECHA DE NACIMIENTO"
              type="date"
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              value={formData.fechaNacimiento}
              onChange={handleInputChange}
              disabled={!!pacienteEncontrado}
              size="small"
              sx={{
                backgroundColor: pacienteEncontrado ? "#F0F8F0" : "#FFFFFF",
                borderRadius: "4px",
                "& .MuiOutlinedInput-root": {
                  height: "40px",
                },
              }}
            />
            <TextField
              name="edad"
              label="EDAD"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.edad}
              disabled
              size="small"
              sx={{
                backgroundColor: "#E0E0E0",
                borderRadius: "4px",
                "& .MuiOutlinedInput-root": {
                  height: "40px",
                },
              }}
            />
          </Box>

          {/* Sexo */}
          <Box sx={{ marginBottom: "15px", textAlign: "center" }}>
            <Typography sx={{ fontSize: "0.8rem", marginBottom: "10px", color: "#666" }}>
              SEXO:
            </Typography>
            <RadioGroup
              name="sex"
              value={formData.sex}
              onChange={handleInputChange}
              row
              sx={{ justifyContent: "center" }}
            >
              <FormControlLabel
                value="Masculino"
                control={<Radio sx={{ color: "#1A3C6D" }} disabled={!!pacienteEncontrado} />}
                label="MASCULINO"
                sx={{ marginRight: "20px" }}
              />
              <FormControlLabel
                value="Femenino"
                control={<Radio sx={{ color: "#1A3C6D" }} disabled={!!pacienteEncontrado} />}
                label="FEMENINO"
              />
            </RadioGroup>
          </Box>
        </Box>

        {/* Médico Anestesiólogo - COMBO */}
        <Box sx={{ marginBottom: "15px" }}>
          <FormControl fullWidth size="small">
            <InputLabel id="medico-anestesiologo-label">MÉDICO ANESTESIÓLOGO</InputLabel>
            <Select
              labelId="medico-anestesiologo-label"
              id="medicoAnestesiologo"
              name="medicoAnestesiologo"
              value={formData.medicoAnestesiologo}
              label="MÉDICO ANESTESIÓLOGO"
              onChange={(e) =>
                handleInputChange({
                  target: {
                    name: "medicoAnestesiologo",
                    value: e.target.value,
                  },
                } as React.ChangeEvent<{ name?: string; value: unknown }>)
              }
              sx={{
                backgroundColor: "#FFFFFF",
                borderRadius: "4px",
                height: "40px",
              }}
            >
              <MenuItem value="" sx={{ fontSize: "0.8rem", color: "#999" }}>
                Seleccione un anestesiólogo...
              </MenuItem>
              {medicosAnestesiologos.map((medico) => (
                <MenuItem key={medico.id} value={medico.nombre} sx={{ fontSize: "0.8rem" }}>
                  <Box>
                    <Typography sx={{ fontSize: "0.8rem", fontWeight: "bold" }}>
                      {medico.nombre}
                    </Typography>
                    <Typography sx={{ fontSize: "0.7rem", color: "#666" }}>
                      {medico.especialidad}
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Procedencia - COMBO mejorado */}
        <Box sx={{ marginBottom: "15px" }}>
          <FormControl fullWidth size="small">
            <InputLabel id="procedencia-label">PROCEDENCIA</InputLabel>
            <Select
              labelId="procedencia-label"
              id="procedencia"
              name="procedencia"
              value={formData.procedencia}
              label="PROCEDENCIA"
              onChange={(e) =>
                handleInputChange({
                  target: {
                    name: "procedencia",
                    value: e.target.value,
                  },
                } as React.ChangeEvent<{ name?: string; value: unknown }>)
              }
              sx={{
                backgroundColor: "#FFFFFF",
                borderRadius: "4px",
                height: "40px",
              }}
            >
              <MenuItem value="" sx={{ fontSize: "0.8rem", color: "#999" }}>
                Seleccione procedencia...
              </MenuItem>
              <MenuItem value="EMERGENCIA" sx={{ fontSize: "0.8rem" }}>
                EMERGENCIA
              </MenuItem>
              <MenuItem value="CONSULTA EXTERNA" sx={{ fontSize: "0.8rem" }}>
                CONSULTA EXTERNA
              </MenuItem>
              <MenuItem value="TRANSFERENCIA" sx={{ fontSize: "0.8rem" }}>
                TRANSFERENCIA
              </MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Médicos - Sistema con checkboxes y combos dinámicos */}
        <Box sx={{ 
          display: "flex", 
          justifyContent: "center", 
          marginBottom: "20px",
          gap: 4,
          flexWrap: "wrap"
        }}>
          {/* MÉDICO TRATANTE */}
          <Box sx={{ 
            minWidth: "280px",
            padding: "15px",
            backgroundColor: "#F8F9FA",
            borderRadius: "8px",
            border: "1px solid #DDD"
          }}>
            <Typography
              sx={{
                fontSize: "0.9rem",
                color: "#1A3C6D",
                fontWeight: "600",
                marginBottom: "15px",
                textAlign: "center",
              }}
            >
              👨‍⚕️ MÉDICO TRATANTE
            </Typography>
            
            {/* Checkboxes */}
            <FormGroup sx={{ marginBottom: "15px" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="medico"
                    checked={formData.medicoTratante.medico}
                    onChange={(e) => handleCheckboxChange(e, "medicoTratante")}
                    sx={{ color: "#1A3C6D" }}
                  />
                }
                label="MÉDICO"
                sx={{ fontSize: "0.8rem" }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="clinica"
                    checked={formData.medicoTratante.clinica}
                    onChange={(e) => handleCheckboxChange(e, "medicoTratante")}
                    sx={{ color: "#1A3C6D" }}
                  />
                }
                label="CLÍNICA"
                sx={{ fontSize: "0.8rem" }}
              />
            </FormGroup>

            {/* Combo dinámico según selección */}
            {(formData.medicoTratante.medico || formData.medicoTratante.clinica) && (
              <FormControl fullWidth size="small">
                <InputLabel sx={{ fontSize: "0.8rem" }}>
                  {formData.medicoTratante.medico ? "Médicos Tratantes" : "Médicos de Clínica"}
                </InputLabel>
                <Select
                  value={formData.medicoTratanteSeleccionado || ""}
                  label={formData.medicoTratante.medico ? "Médicos Tratantes" : "Médicos de Clínica"}
                  onChange={(e) =>
                    handleInputChange({
                      target: {
                        name: "medicoTratanteSeleccionado",
                        value: e.target.value,
                      },
                    } as React.ChangeEvent<{ name?: string; value: unknown }>)
                  }
                  sx={{
                    backgroundColor: "#FFFFFF",
                    fontSize: "0.8rem"
                  }}
                >
                  <MenuItem value="" sx={{ fontSize: "0.7rem", color: "#999" }}>
                    Seleccione médico...
                  </MenuItem>
                  {(formData.medicoTratante.medico ? medicosTratantesMedicos : medicosTratantesClinica).map((medico) => (
                    <MenuItem key={medico.id} value={medico.nombre} sx={{ fontSize: "0.7rem" }}>
                      <Box>
                        <Typography sx={{ fontSize: "0.75rem", fontWeight: "bold" }}>
                          {medico.nombre}
                        </Typography>
                        <Typography sx={{ fontSize: "0.65rem", color: "#666" }}>
                          {medico.especialidad}
                        </Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Box>

          {/* MÉDICO CIRUJANO */}
          <Box sx={{ 
            minWidth: "280px",
            padding: "15px",
            backgroundColor: "#F8F9FA",
            borderRadius: "8px",
            border: "1px solid #DDD"
          }}>
            <Typography
              sx={{
                fontSize: "0.9rem",
                color: "#1A3C6D",
                fontWeight: "600",
                marginBottom: "15px",
                textAlign: "center",
              }}
            >
              🏥 MÉDICO CIRUJANO
            </Typography>
            
            {/* Checkboxes */}
            <FormGroup sx={{ marginBottom: "15px" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="medico"
                    checked={formData.medicoCirujano.medico}
                    onChange={(e) => handleCheckboxChange(e, "medicoCirujano")}
                    sx={{ color: "#1A3C6D" }}
                  />
                }
                label="MÉDICO"
                sx={{ fontSize: "0.8rem" }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="clinica"
                    checked={formData.medicoCirujano.clinica}
                    onChange={(e) => handleCheckboxChange(e, "medicoCirujano")}
                    sx={{ color: "#1A3C6D" }}
                  />
                }
                label="CLÍNICA"
                sx={{ fontSize: "0.8rem" }}
              />
            </FormGroup>

            {/* Combo dinámico según selección */}
            {(formData.medicoCirujano.medico || formData.medicoCirujano.clinica) && (
              <FormControl fullWidth size="small">
                <InputLabel sx={{ fontSize: "0.8rem" }}>
                  {formData.medicoCirujano.medico ? "Médicos Cirujanos" : "Cirujanos de Clínica"}
                </InputLabel>
                <Select
                  value={formData.medicoCirujanoSeleccionado || ""}
                  label={formData.medicoCirujano.medico ? "Médicos Cirujanos" : "Cirujanos de Clínica"}
                  onChange={(e) =>
                    handleInputChange({
                      target: {
                        name: "medicoCirujanoSeleccionado",
                        value: e.target.value,
                      },
                    } as React.ChangeEvent<{ name?: string; value: unknown }>)
                  }
                  sx={{
                    backgroundColor: "#FFFFFF",
                    fontSize: "0.8rem"
                  }}
                >
                  <MenuItem value="" sx={{ fontSize: "0.7rem", color: "#999" }}>
                    Seleccione cirujano...
                  </MenuItem>
                  {(formData.medicoCirujano.medico ? medicosCirujanosMedicos : medicosCirujnosClinica).map((medico) => (
                    <MenuItem key={medico.id} value={medico.nombre} sx={{ fontSize: "0.7rem" }}>
                      <Box>
                        <Typography sx={{ fontSize: "0.75rem", fontWeight: "bold" }}>
                          {medico.nombre}
                        </Typography>
                        <Typography sx={{ fontSize: "0.65rem", color: "#666" }}>
                          {medico.especialidad}
                        </Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Box>
        </Box>

        {/* Cuadro Clínico */}
        <Box sx={{ marginBottom: "15px" }}>
          <TextField
            name="cuadroClinico"
            label="CUADRO CLÍNICO"
            multiline
            rows={3}
            fullWidth
            variant="outlined"
            value={formData.cuadroClinico}
            onChange={handleInputChange}
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: "4px",
            }}
          />
        </Box>

        {/* Fecha de Ingreso (automática) */}
        <Box sx={{ marginBottom: "15px" }}>
          <TextField
            name="admissionDate"
            label="FECHA DE INGRESO"
            type="date"
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            value={formData.admissionDate || getCurrentDate()}
            disabled
            size="small"
            sx={{
              backgroundColor: "#E0E0E0",
              borderRadius: "4px",
              "& .MuiOutlinedInput-root": {
                height: "40px",
              },
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: "20px", backgroundColor: "#F5F5F5" }}>
        <Button onClick={handleClose} sx={{ color: "#1A3C6D" }}>
          CANCELAR
        </Button>
        <Button
          onClick={handleSave}
          disabled={
            !formData.primerNombre ||
            !formData.primerApellido ||
            !formData.id ||
            !formData.sex ||
            !formData.fechaNacimiento ||
            !formData.procedencia ||
            !formData.cuadroClinico
          }
          sx={{
            color: "#FFFFFF",
            backgroundColor: "#1A3C6D",
            "&:hover": { backgroundColor: "#153e6e" },
          }}
        >
          GUARDAR
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default IngresoPaciente;