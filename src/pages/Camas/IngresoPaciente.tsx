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
  Box,
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
}) => {
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

  // Función para manejar cambio en fecha de nacimiento
  const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const birthDate = e.target.value;
    const age = calculateAge(birthDate);

    // Actualizar fecha de nacimiento
    handleInputChange(e);

    // Actualizar edad calculada
    handleInputChange({
      target: {
        name: "edad",
        value: age,
      },
    } as React.ChangeEvent<HTMLInputElement>);
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
        }}
      >
        AGREGAR PACIENTE
      </DialogTitle>
      <DialogContent
        sx={{
          padding: "20px",
          backgroundColor: "#F5F5F5",
          marginTop: "20px",
        }}
      >
        {/* Agregar espacio adicional al inicio */}
        <Box sx={{ marginBottom: "20px" }}>
          {/* Espacio en blanco para separar más */}
        </Box>

        {/* Fila 1: Sala, Cama, Primer Nombre */}
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
          <TextField
            autoFocus
            name="primerNombre"
            label="PRIMER NOMBRE"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.primerNombre}
            onChange={handleInputChange}
            size="small"
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: "4px",
              "& .MuiOutlinedInput-root": {
                height: "40px",
              },
            }}
          />
        </Box>

        {/* Fila 2: Segundo Nombre, Primer Apellido, Segundo Apellido */}
        <Box sx={{ display: "flex", gap: 2, marginBottom: "15px" }}>
          <TextField
            name="segundoNombre"
            label="SEGUNDO NOMBRE"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.segundoNombre}
            onChange={handleInputChange}
            size="small"
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: "4px",
              "& .MuiOutlinedInput-root": {
                height: "40px",
              },
            }}
          />
          <TextField
            name="primerApellido"
            label="PRIMER APELLIDO"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.primerApellido}
            onChange={handleInputChange}
            size="small"
            sx={{
              backgroundColor: "#FFFFFF",
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
            size="small"
            sx={{
              backgroundColor: "#FFFFFF",
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
            size="small"
            sx={{
              backgroundColor: "#FFFFFF",
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
            onChange={handleBirthDateChange}
            size="small"
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: "4px",
              "& .MuiOutlinedInput-root": {
                height: "40px",
              },
            }}
          />
          <TextField
            name="edad"
            // label="EDAD"
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
          <RadioGroup
            name="sex"
            value={formData.sex}
            onChange={handleInputChange}
            row
            sx={{ justifyContent: "center" }}
          >
            <FormControlLabel
              value="Masculino"
              control={<Radio sx={{ color: "#1A3C6D" }} />}
              label="MASCULINO"
              sx={{ marginRight: "20px" }}
            />
            <FormControlLabel
              value="Femenino"
              control={<Radio sx={{ color: "#1A3C6D" }} />}
              label="FEMENINO"
            />
          </RadioGroup>
        </Box>

        {/* Médico Anestesiólogo */}
        <Box sx={{ marginBottom: "15px" }}>
          <TextField
            name="medicoAnestesiologo"
            label="MÉDICO ANESTESIÓLOGO"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.medicoAnestesiologo}
            onChange={handleInputChange}
            size="small"
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: "4px",
              "& .MuiOutlinedInput-root": {
                height: "40px",
              },
            }}
          />
        </Box>

        {/* Procedencia */}
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
              sx={
                {
                  backgroundColor: "#FFFFFF",
                  borderRadius: "4px",
                  height: "40px",
                }
              }
            >
              <MenuItem value="EMERGENCIA">EMERGENCIA</MenuItem>
              <MenuItem value="CONSULTA EXTERNA">CONSULTA EXTERNA</MenuItem>
              <MenuItem value="TRANSFERENCIA">TRANSFERENCIA</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Médicos en el mismo nivel - MOVIDO AQUÍ */}
        <Box sx={{ display: "flex", justifyContent: "center", marginBottom: "15px" }}>
          <Box sx={{ display: "flex", gap: 8 }}>
            <Box>
              <FormGroup>
                <Typography
                  sx={{
                    fontSize: "0.9rem",
                    color: "#1A3C6D",
                    fontWeight: "600",
                    marginBottom: "10px",
                    textAlign: "center",
                  }}
                >
                  MÉDICO TRATANTE
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
                  label="MÉDICO"
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
                />
              </FormGroup>
            </Box>
            <Box>
              <FormGroup>
                <Typography
                  sx={{
                    fontSize: "0.9rem",
                    color: "#1A3C6D",
                    fontWeight: "600",
                    marginBottom: "10px",
                    textAlign: "center",
                  }}
                >
                  MÉDICO CIRUJANO
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
                  label="MÉDICO"
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
                />
              </FormGroup>
            </Box>
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