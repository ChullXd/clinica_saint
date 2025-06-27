import React from "react";
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

interface AltaMedicaProps {
  open: boolean;
  onClose: () => void;
}

const AltaMedicaForm: React.FC<AltaMedicaProps> = ({ open, onClose }) => {
  const [tab, setTab] = React.useState(0);

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
        {tab === 0 ? "ORDEN ALTA MEDICA" : "ALTA MEDICA"}
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
          <Tab label="ORDEN ALTA MEDICA" />
          <Tab label="ALTA MEDICA" />
        </Tabs>

        {tab === 0 && (
          <Box>
            <Typography sx={{ fontWeight: "bold", color: "#1A3C6D", mb: 2 }}>
              Datos del Paciente
            </Typography>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <TextField label="Paciente" fullWidth size="small" />
              <TextField label="N° Historia Clínica" fullWidth size="small" />
            </Box>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Tipo de atención</InputLabel>
              <Select label="Tipo de atención" size="small">
                <MenuItem value="URG">Urgencia</MenuItem>
                <MenuItem value="PROG">Programada</MenuItem>
              </Select>
            </FormControl>
            <Typography sx={{ fontWeight: "bold", color: "#1A3C6D", mb: 1 }}>
              Información de alta médica
            </Typography>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <TextField
                label="Fecha de Ingreso"
                type="date"
                fullWidth
                size="small"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Fecha de Egreso"
                type="date"
                fullWidth
                size="small"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Hora de alta"
                type="time"
                fullWidth
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Diagnóstico de egreso CIE10</InputLabel>
              <Select label="Diagnóstico de egreso CIE10" size="small">
                <MenuItem value="A00">A00 - Cólera</MenuItem>
                <MenuItem value="B00">B00 - Herpesviral</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Especialidad médica</InputLabel>
              <Select label="Especialidad médica" size="small">
                <MenuItem value="MED">Medicina</MenuItem>
                <MenuItem value="CIR">Cirugía</MenuItem>
              </Select>
            </FormControl>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <TextField label="Médico Tratante" fullWidth size="small" />
              <TextField
                label="Médico Residente Responsable"
                fullWidth
                size="small"
              />
            </Box>
            <TextField
              label="Observaciones adicionales"
              multiline
              minRows={3}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Typography sx={{ fontWeight: "bold", color: "#1A3C6D", mb: 1 }}>
              Solicitudes asociadas
            </Typography>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <FormControlLabel control={<Checkbox />} label="Ambulancia" />
              <FormControlLabel control={<Checkbox />} label="Imágenes" />
              <FormControlLabel control={<Checkbox />} label="Laboratorio" />
              <FormControlLabel control={<Checkbox />} label="Interconsulta" />
            </Box>
          </Box>
        )}

        {tab === 1 && (
          <Box>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Tipo de alta</InputLabel>
                <Select label="Tipo de alta" size="small">
                  <MenuItem value="ALTA1">Alta 1</MenuItem>
                  <MenuItem value="ALTA2">Alta 2</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Discapacidad</InputLabel>
                <Select label="Discapacidad" size="small">
                  <MenuItem value="SI">Sí</MenuItem>
                  <MenuItem value="NO">No</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Retiro</InputLabel>
              <Select label="Retiro" size="small">
                <MenuItem value="DOMICILIO">Domicilio</MenuItem>
                <MenuItem value="OTRO">Otro</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Médico Tratante"
              fullWidth
              size="small"
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <TextField
                label="Fecha"
                type="date"
                fullWidth
                size="small"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Hora"
                type="time"
                fullWidth
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            <TextField
              label="Observación"
              multiline
              minRows={3}
              fullWidth
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Diagnóstico CIE10</InputLabel>
              <Select label="Diagnóstico CIE10" size="small">
                <MenuItem value="A00">A00 - Cólera</MenuItem>
                <MenuItem value="B00">B00 - Herpesviral</MenuItem>
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
          Cerrar
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
          Registrar
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
            Exportar
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
            Editar
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default AltaMedicaForm;