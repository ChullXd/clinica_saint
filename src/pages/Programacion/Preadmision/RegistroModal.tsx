import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Modal,
} from "@mui/material";
import {
  Person as PersonIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
} from "@mui/icons-material";

interface RegistroModalProps {
  open: boolean;
  type: "paciente" | "medico" | null;
  onClose: () => void;
  onSave: (data: { noIdentificacion: string; nombre: string; telefono: string; correo: string }) => void;
}

const RegistroModal: React.FC<RegistroModalProps> = ({ open, type, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    noIdentificacion: "",
    nombre: "",
    telefono: "",
    correo: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: "600px" },
          bgcolor: "white",
          border: "2px solid #000",
          borderRadius: 4,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography
          variant="h6"
          sx={{ mb: 2, fontWeight: 800, color: "#1A3C6D" }}
        >
          {type === "paciente" ? "Registro de paciente" : "Registro de médico"}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="No Identificación"
              name="noIdentificacion"
              value={formData.noIdentificacion}
              onChange={handleInputChange}
              variant="outlined"
              InputProps={{
                startAdornment: <PersonIcon sx={{ color: "#4A90E2", mr: 1 }} />,
              }}
              sx={{ bgcolor: "#F7FAFF", "& .MuiInputBase-root": { height: "40px" } }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              variant="outlined"
              InputProps={{
                startAdornment: <PersonIcon sx={{ color: "#4A90E2", mr: 1 }} />,
              }}
              sx={{ bgcolor: "#F7FAFF", "& .MuiInputBase-root": { height: "40px" } }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Teléfono"
              name="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
              variant="outlined"
              InputProps={{
                startAdornment: <PhoneIcon sx={{ color: "#4A90E2", mr: 1 }} />,
              }}
              sx={{ bgcolor: "#F7FAFF", "& .MuiInputBase-root": { height: "40px" } }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Correo Electrónico"
              name="correo"
              value={formData.correo}
              onChange={handleInputChange}
              variant="outlined"
              InputProps={{
                startAdornment: <EmailIcon sx={{ color: "#4A90E2", mr: 1 }} />,
              }}
              sx={{ bgcolor: "#F7FAFF", "& .MuiInputBase-root": { height: "40px" } }}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button
            variant="outlined"
            sx={{
              borderColor: "#E57373",
              color: "#E57373",
              "&:hover": { borderColor: "#D32F2F", color: "#D32F2F" },
              borderRadius: 3,
              px: 3,
              py: 1,
            }}
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#4A90E2",
              "&:hover": { bgcolor: "#3A78C2" },
              borderRadius: 3,
              px: 3,
              py: 1,
            }}
            onClick={handleSave}
          >
            Grabar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default RegistroModal;