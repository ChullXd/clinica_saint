import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

interface ReasignacionCamaProps {
  open: boolean;
  sala: string;
  cama: string;
  procedencia: string;
  resumen: string;
  handleClose: () => void;
  handleSelectChange: (
    event: SelectChangeEvent<string>,
    child: React.ReactNode
  ) => void;
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleReasignar: () => void;
  camasDisponibles: Record<string, { value: string; label: string }[]>;
  salas: string[];
}

const ReasignacionCama: React.FC<ReasignacionCamaProps> = ({
  open,
  sala,
  cama,
  procedencia,
  resumen,
  handleClose,
  handleSelectChange,
  handleInputChange,
  handleReasignar,
  camasDisponibles,
  salas,
}) => {
  // Función para convertir a mayúsculas automáticamente
  const handleUpperCaseChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const uppercaseValue = value.toUpperCase();
    
    // Crear el evento con el valor en mayúsculas
    const modifiedEvent = {
      ...e,
      target: {
        ...e.target,
        value: uppercaseValue,
      },
    };
    
    handleInputChange(modifiedEvent as any);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionProps={{ timeout: 500 }}
      maxWidth="sm"
      fullWidth
    >
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
        REASIGNACIÓN DE CAMA
      </DialogTitle>
      <DialogContent
        sx={{
          padding: "20px",
          backgroundColor: "#F5F5F5",
          pt: 5,
        }}
      >
        {/* Agrega un Box para separar el contenido del borde superior */}
        <Box sx={{ height: 24 }} />
        <Box sx={{ display: "flex", gap: 2, mb: "20px" }}>
          <FormControl
            fullWidth
            size="small"
            sx={{ backgroundColor: "#FFFFFF", borderRadius: "4px" }}
          >
            <InputLabel sx={{ color: "#1A3C6D" }}>SALA</InputLabel>
            <Select
              name="sala"
              value={sala}
              label="SALA"
              onChange={handleSelectChange}
              sx={{
                borderRadius: "4px",
                height: "40px",
              }}
            >
              {salas.map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl
            fullWidth
            size="small"
            sx={{ backgroundColor: "#FFFFFF", borderRadius: "4px" }}
          >
            <InputLabel sx={{ color: "#1A3C6D" }}>CAMA</InputLabel>
            <Select
              name="cama"
              value={cama}
              label="CAMA"
              onChange={handleSelectChange}
              disabled={!sala}
              sx={{
                borderRadius: "4px",
                height: "40px",
              }}
            >
              {(camasDisponibles[sala] || []).map((c) => (
                <MenuItem key={c.value} value={c.value}>
                  {c.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <FormControl
          fullWidth
          size="small"
          sx={{ mb: "20px", backgroundColor: "#FFFFFF", borderRadius: "4px" }}
        >
          <InputLabel sx={{ color: "#1A3C6D" }}>PROCEDENCIA</InputLabel>
          <Select
            name="procedencia"
            value={procedencia}
            label="PROCEDENCIA"
            onChange={handleSelectChange}
            sx={{
              borderRadius: "4px",
              height: "40px",
            }}
          >
            <MenuItem value="EMERGENCIA">EMERGENCIA</MenuItem>
            <MenuItem value="HOSPITALIZACIÓN">HOSPITALIZACIÓN</MenuItem>
            <MenuItem value="POSTOPERATORIO">POSTOPERATORIO</MenuItem>
            <MenuItem value="QUIROFANO">QUIRÓFANO</MenuItem>
          </Select>
        </FormControl>
        <Typography
          sx={{ mb: 1, fontWeight: "bold", color: "#1A3C6D", fontSize: "0.9rem" }}
        >
          RESUMEN DE CUADRO CLÍNICO
        </Typography>
        <TextField
          name="resumen"
          value={resumen}
          onChange={handleUpperCaseChange}
          multiline
          rows={3}
          fullWidth
          variant="outlined"
          sx={{
            mb: "20px",
            backgroundColor: "#FFFFFF",
            borderRadius: "4px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "4px",
            },
          }}
        />
      </DialogContent>
      <DialogActions sx={{ padding: "20px", backgroundColor: "#F5F5F5" }}>
        <Button
          onClick={handleClose}
          sx={{
            color: "#1A3C6D",
            textTransform: "none",
            fontWeight: "bold",
            px: 3,
            "&:hover": { backgroundColor: "#E0E0E0" },
          }}
        >
          CANCELAR
        </Button>
        <Button
          onClick={handleReasignar}
          variant="contained"
          sx={{
            backgroundColor: "#1A3C6D",
            color: "#FFFFFF",
            textTransform: "none",
            fontWeight: "bold",
            px: 3,
            borderRadius: "4px",
            "&:hover": { backgroundColor: "#153e6e" },
          }}
          disabled={!sala || !cama || !procedencia || !resumen}
        >
          ACEPTAR
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReasignacionCama;
