import React, { useEffect } from "react"; // AGREGAR useEffect
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

// Agrega esta definición de tipo al inicio del archivo
type PacienteData = {
  sala: string;
  cama: string;
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  name: string;
  id: string;
  sex: string;
  edad: string;
  fechaNacimiento: string;
  genderImage: string;
  admissionDate: string;
  dischargeDate: string;
  medicoTratante: { medico: boolean; clinica: boolean };
  medicoCirujano: { medico: boolean; clinica: boolean };
  medicoAnestesiologo: string;
  procedencia: string;
  cuadroClinico: string;
  resumen?: string;
};

interface AltaMedicaProps {
  open: boolean;
  onClose: () => void;
  pacienteData?: PacienteData; // NUEVO - datos del paciente seleccionado
}

const AltaMedicaForm: React.FC<AltaMedicaProps> = ({ open, onClose, pacienteData }) => {
  const [tab, setTab] = React.useState(0);
  const [formData, setFormData] = React.useState({
    paciente: "",
    historia: "",
    medicoTratante: "",
    medicoResidente: "",
    observaciones: "",
    observacion: "",
    fechaIngreso: "", // NUEVO
    fechaEgreso: "",  // NUEVO
  });

  // Actualizar formulario cuando se reciben datos del paciente
  useEffect(() => {
    console.log("pacienteData recibido:", pacienteData); // Para debug
    if (pacienteData) {
      const nombreCompleto = `${pacienteData.primerNombre || ''} ${pacienteData.primerApellido || ''}`.trim();
      setFormData(prev => ({
        ...prev,
        paciente: nombreCompleto,
        historia: pacienteData.id || "",
        fechaIngreso: pacienteData.admissionDate || "",
        medicoTratante: pacienteData.medicoAnestesiologo || "",
      }));
      console.log("Fecha de ingreso establecida:", pacienteData.admissionDate); // Para debug
    }
  }, [pacienteData, open]); // Agregar 'open' como dependencia

  // Función para convertir a mayúsculas automáticamente
  const handleUpperCaseChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const uppercaseValue = value.toUpperCase();
    
    setFormData(prev => ({
      ...prev,
      [name]: uppercaseValue,
    }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
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
        {tab === 0 ? "ORDEN ALTA MÉDICA" : "ALTA MÉDICA"}
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
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{ mb: 3, background: "#e3eaf6", borderRadius: 2 }}
        >
          <Tab label="ORDEN ALTA MÉDICA" />
          <Tab label="ALTA MÉDICA" />
        </Tabs>

        {tab === 0 && (
          <Box>
            <Typography sx={{ fontWeight: "bold", color: "#1A3C6D", mb: 2 }}>
              DATOS DEL PACIENTE
            </Typography>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <TextField 
                name="paciente"
                label="PACIENTE" 
                fullWidth 
                size="small"
                value={formData.paciente}
                onChange={handleUpperCaseChange}
                sx={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "4px",
                }}
              />
              <TextField 
                name="historia"
                label="N° HISTORIA CLÍNICA" 
                fullWidth 
                size="small"
                value={formData.historia}
                onChange={handleUpperCaseChange}
                sx={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "4px",
                }}
              />
            </Box>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>TIPO DE ATENCIÓN</InputLabel>
              <Select label="TIPO DE ATENCIÓN" size="small" sx={{ backgroundColor: "#FFFFFF" }}>
                <MenuItem value="URG">URGENCIA</MenuItem>
                <MenuItem value="PROG">PROGRAMADA</MenuItem>
              </Select>
            </FormControl>
            <Typography sx={{ fontWeight: "bold", color: "#1A3C6D", mb: 3 }}>
              INFORMACIÓN DE ALTA MÉDICA
            </Typography>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <TextField
                name="fechaIngreso"
                label="FECHA DE INGRESO"
                type="date"
                fullWidth
                size="small"
                value={formData.fechaIngreso}
                disabled // DESHABILITADO porque es automático
                InputLabelProps={{ shrink: true }}
                sx={{
                  backgroundColor: "#E0E0E0", // Color gris para indicar que está deshabilitado
                  borderRadius: "4px",
                }}
              />
              <TextField
                name="fechaEgreso"
                label="FECHA DE EGRESO"
                type="date"
                fullWidth
                size="small"
                value={formData.fechaEgreso}
                onChange={(e) => setFormData(prev => ({ ...prev, fechaEgreso: e.target.value }))}
                InputLabelProps={{ shrink: true }}
                sx={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "4px",
                }}
              />
              <TextField
                label="HORA DE ALTA"
                type="time"
                fullWidth
                size="small"
                InputLabelProps={{ shrink: true }}
                sx={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "4px",
                }}
              />
            </Box>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>DIAGNÓSTICO DE EGRESO CIE10</InputLabel>
              <Select label="DIAGNÓSTICO DE EGRESO CIE10" size="small" sx={{ backgroundColor: "#FFFFFF" }}>
                <MenuItem value="A00">A00 - CÓLERA</MenuItem>
                <MenuItem value="B00">B00 - HERPESVIRAL</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>ESPECIALIDAD MÉDICA</InputLabel>
              <Select label="ESPECIALIDAD MÉDICA" size="small" sx={{ backgroundColor: "#FFFFFF" }}>
                <MenuItem value="MED">MEDICINA</MenuItem>
                <MenuItem value="CIR">CIRUGÍA</MenuItem>
              </Select>
            </FormControl>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <TextField 
                name="medicoTratante"
                label="MÉDICO TRATANTE" 
                fullWidth 
                size="small"
                value={formData.medicoTratante}
                onChange={handleUpperCaseChange}
                sx={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "4px",
                }}
              />
              <TextField
                name="medicoResidente"
                label="MÉDICO RESIDENTE RESPONSABLE"
                fullWidth
                size="small"
                value={formData.medicoResidente}
                onChange={handleUpperCaseChange}
                sx={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "4px",
                }}
              />
            </Box>
            <TextField
              name="observaciones"
              label="OBSERVACIONES ADICIONALES"
              multiline
              minRows={3}
              fullWidth
              value={formData.observaciones}
              onChange={handleUpperCaseChange}
              sx={{ 
                mb: 2,
                backgroundColor: "#FFFFFF",
                borderRadius: "4px",
              }}
            />
            <Typography sx={{ fontWeight: "bold", color: "#1A3C6D", mb: 1 }}>
              SOLICITUDES ASOCIADAS
            </Typography>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <FormControlLabel control={<Checkbox />} label="AMBULANCIA" />
              <FormControlLabel control={<Checkbox />} label="IMÁGENES" />
              <FormControlLabel control={<Checkbox />} label="LABORATORIO" />
              <FormControlLabel control={<Checkbox />} label="INTERCONSULTA" />
            </Box>
          </Box>
        )}

        {tab === 1 && (
          <Box>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <FormControl fullWidth>
                <InputLabel>TIPO DE ALTA</InputLabel>
                <Select label="TIPO DE ALTA" size="small" sx={{ backgroundColor: "#FFFFFF" }}>
                  <MenuItem value="ALTA1">ALTA 1</MenuItem>
                  <MenuItem value="ALTA2">ALTA 2</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>DISCAPACIDAD</InputLabel>
                <Select label="DISCAPACIDAD" size="small" sx={{ backgroundColor: "#FFFFFF" }}>
                  <MenuItem value="SI">SÍ</MenuItem>
                  <MenuItem value="NO">NO</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>RETIRO</InputLabel>
              <Select label="RETIRO" size="small" sx={{ backgroundColor: "#FFFFFF" }}>
                <MenuItem value="DOMICILIO">DOMICILIO</MenuItem>
                <MenuItem value="OTRO">OTRO</MenuItem>
              </Select>
            </FormControl>
            <TextField
              name="medicoTratante"
              label="MÉDICO TRATANTE"
              fullWidth
              size="small"
              value={formData.medicoTratante}
              onChange={handleUpperCaseChange}
              sx={{ 
                mb: 2,
                backgroundColor: "#FFFFFF",
                borderRadius: "4px",
              }}
            />
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <TextField
                label="FECHA"
                type="date"
                fullWidth
                size="small"
                InputLabelProps={{ shrink: true }}
                sx={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "4px",
                }}
              />
              <TextField
                label="HORA"
                type="time"
                fullWidth
                size="small"
                InputLabelProps={{ shrink: true }}
                sx={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "4px",
                }}
              />
            </Box>
            <TextField
              name="observacion"
              label="OBSERVACIÓN"
              multiline
              minRows={3}
              fullWidth
              value={formData.observacion}
              onChange={handleUpperCaseChange}
              sx={{ 
                mb: 2,
                backgroundColor: "#FFFFFF",
                borderRadius: "4px",
              }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>DIAGNÓSTICO CIE10</InputLabel>
              <Select label="DIAGNÓSTICO CIE10" size="small" sx={{ backgroundColor: "#FFFFFF" }}>
                <MenuItem value="A00">A00 - CÓLERA</MenuItem>
                <MenuItem value="B00">B00 - HERPESVIRAL</MenuItem>
              </Select>
            </FormControl>
          </Box>
        )}
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
          sx={{
            background: "#1A3C6D",
            borderRadius: 2,
            px: 3,
            textTransform: "none",
            fontWeight: "bold",
            "&:hover": { background: "#274472" },
          }}
        >
          REGISTRAR
        </Button>
        {tab === 0 && (
          <Button
            variant="contained"
            sx={{
              background: "#1976d2",
              borderRadius: 2,
              px: 3,
              textTransform: "none",
              fontWeight: "bold",
              "&:hover": { background: "#115293" },
            }}
          >
            EXPORTAR
          </Button>
        )}
        {tab === 1 && (
          <Button
            variant="contained"
            sx={{
              background: "#1976d2",
              borderRadius: 2,
              px: 3,
              textTransform: "none",
              fontWeight: "bold",
              "&:hover": { background: "#115293" },
            }}
          >
            EDITAR
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default AltaMedicaForm;