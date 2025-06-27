import React from "react";
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
} from "@mui/material";

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

const IngresoPaciente: React.FC<IngresoPacienteProps> = ({
  open,
  formData,
  handleClose,
  handleInputChange,
  handleCheckboxChange,
  handleSave,
}) => (
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
      }}
    >
      Agregar Paciente
    </DialogTitle>
    <DialogContent sx={{ padding: "20px", backgroundColor: "#F5F5F5" }}>
      <TextField
        margin="dense"
        name="sala"
        label="Sala"
        type="text"
        fullWidth
        variant="outlined"
        value={formData.sala}
        disabled
        sx={{
          marginBottom: "15px",
          backgroundColor: "#E0E0E0",
          borderRadius: "4px",
        }}
      />
      <TextField
        margin="dense"
        name="cama"
        label="Cama"
        type="text"
        fullWidth
        variant="outlined"
        value={formData.cama}
        disabled
        sx={{
          marginBottom: "15px",
          backgroundColor: "#E0E0E0",
          borderRadius: "4px",
        }}
      />
      <TextField
        autoFocus
        margin="dense"
        name="name"
        label="Nombre"
        type="text"
        fullWidth
        variant="outlined"
        value={formData.name}
        onChange={handleInputChange}
        sx={{
          marginBottom: "15px",
          backgroundColor: "#FFFFFF",
          borderRadius: "4px",
        }}
      />
      <TextField
        margin="dense"
        name="id"
        label="Cédula"
        type="text"
        fullWidth
        variant="outlined"
        value={formData.id}
        onChange={handleInputChange}
        sx={{
          marginBottom: "15px",
          backgroundColor: "#FFFFFF",
          borderRadius: "4px",
        }}
      />
      <RadioGroup
        name="sex"
        value={formData.sex}
        onChange={handleInputChange}
        row
        sx={{ marginBottom: "15px", justifyContent: "center" }}
      >
        <FormControlLabel
          value="Masculino"
          control={<Radio sx={{ color: "#1A3C6D" }} />}
          label="Masculino"
          sx={{ marginRight: "20px" }}
        />
        <FormControlLabel
          value="Femenino"
          control={<Radio sx={{ color: "#1A3C6D" }} />}
          label="Femenino"
        />
      </RadioGroup>
      <FormGroup sx={{ marginBottom: "15px" }}>
        <Typography
          sx={{ fontSize: "0.9rem", color: "#1A3C6D", fontWeight: "600" }}
        >
          Médico Tratante
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              name="medico"
              checked={formData.medicoTratante.medico}
              onChange={(e) => handleCheckboxChange(e, "medicoTratante")}
              sx={{ color: "#1A3C6D" }}
            />
          }
          label="Médico"
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
          label="Clínica"
        />
      </FormGroup>
      <FormGroup sx={{ marginBottom: "15px" }}>
        <Typography
          sx={{ fontSize: "0.9rem", color: "#1A3C6D", fontWeight: "600" }}
        >
          Médico Cirujano
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              name="medico"
              checked={formData.medicoCirujano.medico}
              onChange={(e) => handleCheckboxChange(e, "medicoCirujano")}
              sx={{ color: "#1A3C6D" }}
            />
          }
          label="Médico"
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
          label="Clínica"
        />
      </FormGroup>
      <TextField
        margin="dense"
        name="medicoAnestesiologo"
        label="Médico Anestesiólogo"
        type="text"
        fullWidth
        variant="outlined"
        value={formData.medicoAnestesiologo}
        onChange={handleInputChange}
        sx={{
          marginBottom: "15px",
          backgroundColor: "#FFFFFF",
          borderRadius: "4px",
        }}
      />
      <FormControl fullWidth sx={{ marginBottom: "15px" }}>
        <InputLabel id="procedencia-label">Procedencia</InputLabel>
        <Select
          labelId="procedencia-label"
          id="procedencia"
          name="procedencia"
          value={formData.procedencia}
          label="Procedencia"
          onChange={(e) =>
            handleInputChange({
              target: {
                name: "procedencia",
                value: e.target.value,
              },
            } as React.ChangeEvent<{ name?: string; value: unknown }>)
          }
          sx={{ backgroundColor: "#FFFFFF", borderRadius: "4px" }}
        >
          <MenuItem value="EMERGENCIA">EMERGENCIA</MenuItem>
          <MenuItem value="CONSULTA EXTERNA">CONSULTA EXTERNA</MenuItem>
          <MenuItem value="TRANSFERENCIA">TRANSFERENCIA</MenuItem>
        </Select>
      </FormControl>
      <TextField
        margin="dense"
        name="cuadroClinico"
        label="Cuadro Clínico"
        multiline
        rows={4}
        fullWidth
        variant="outlined"
        value={formData.cuadroClinico}
        onChange={handleInputChange}
        sx={{
          marginBottom: "15px",
          backgroundColor: "#FFFFFF",
          borderRadius: "4px",
        }}
      />
      <TextField
        margin="dense"
        name="admissionDate"
        label="Fecha de Ingreso"
        type="date"
        fullWidth
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        value={formData.admissionDate}
        onChange={handleInputChange}
        sx={{
          marginBottom: "15px",
          backgroundColor: "#FFFFFF",
          borderRadius: "4px",
        }}
      />
      <TextField
        margin="dense"
        name="dischargeDate"
        label="Fecha de Salida"
        type="date"
        fullWidth
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        value={formData.dischargeDate}
        onChange={handleInputChange}
        sx={{ backgroundColor: "#FFFFFF", borderRadius: "4px" }}
      />
    </DialogContent>
    <DialogActions sx={{ padding: "20px", backgroundColor: "#F5F5F5" }}>
      <Button onClick={handleClose} sx={{ color: "#1A3C6D" }}>
        Cancelar
      </Button>
      <Button
        onClick={handleSave}
        disabled={
          !formData.name ||
          !formData.id ||
          !formData.sex ||
          !formData.admissionDate ||
          !formData.procedencia ||
          !formData.cuadroClinico
        }
        sx={{
          color: "#FFFFFF",
          backgroundColor: "#1A3C6D",
          "&:hover": { backgroundColor: "#153e6e" },
        }}
      >
        Guardar
      </Button>
    </DialogActions>
  </Dialog>
);

export default IngresoPaciente;