import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  Person as PersonIcon,
  MedicalServices as MedicalIcon,
} from "@mui/icons-material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AdmMedico } from "../../interface/models";
import { patientSchema, medicoSchema } from "../../../hook/UseToast";

interface RegistroModalProps {
  open: boolean;
  type: "paciente" | "medico" | null;
  onClose: () => void;
  onSave: (data: AdmMedico) => void;
}

export const RegistroPaciente: React.FC<RegistroModalProps> = ({
  open,
  type,
  onClose,
  onSave,
}) => {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const initialValues: AdmMedico = {
    Identificacion: "",
    Nombre: "",
    SegundoNombre: "",
    Apellido: "",
    SegundoApellido: "",
    FechaNacimiento: "",
    Edad: "",
    Sexo: "",
    Correo: "",
    Telefono: "",
    Direccion: "",
  };

  // Calcular edad basada en fecha de nacimiento
  const calcularEdad = (fechaNacimiento: string): number => {
    if (!fechaNacimiento) return 0;
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const diferenciaMes = hoy.getMonth() - nacimiento.getMonth();

    if (
      diferenciaMes < 0 ||
      (diferenciaMes === 0 && hoy.getDate() < nacimiento.getDate())
    ) {
      edad--;
    }
    return edad;
  };

  const handleSubmit = async (
    values: AdmMedico,
    { setSubmitting, resetForm }: any
  ) => {
    try {
      await onSave(values);
      setSubmitError(null);
      resetForm();
      onClose();
    } catch (err: any) {
      setSubmitError(
        err.message ||
          `Error al guardar el ${type === "paciente" ? "paciente" : "médico"}`
      );
    } finally {
      setSubmitting(false);
    }
  };

  const getIcon = () => {
    return type === "paciente" ? <PersonIcon /> : <MedicalIcon />;
  };

  const getTitle = () => {
    return type === "paciente" ? "Registrar Paciente" : "Registrar Médico";
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: 3,
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        },
      }}
    >
      <DialogTitle
        sx={{
          backgroundColor: "#1A3C6D",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "1.1rem",
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        {getIcon()}
        {getTitle()}
      </DialogTitle>

      <DialogContent
        sx={{
          background: "#F4F8FB",
          p: 3,
          minHeight: "400px",
        }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={type === "paciente" ? patientSchema : medicoSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, setFieldValue }) => (
            <Form>
              <Box
                sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 3 }}
              >
                {/* Fila 1: Identificación */}
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                  <Field
                    as={TextField}
                    label="No. Identificación"
                    name="Identificacion"
                    size="small"
                    sx={{
                      flex: 1,
                      minWidth: 200,
                      bgcolor: "#FFFFFF",
                      "& .MuiInputLabel-root": { fontSize: "0.85rem" },
                      "& .MuiInputBase-input": { fontSize: "0.85rem" },
                    }}
                    error={!!errors.Identificacion}
                    helperText={<ErrorMessage name="Identificacion" />}
                  />
                </Box>

                {/* Fila 2: Nombres */}
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                  <Field
                    as={TextField}
                    label="Primer Nombre"
                    name="PrimerNombre"
                    size="small"
                    sx={{
                      flex: 1,
                      minWidth: 180,
                      bgcolor: "#FFFFFF",
                      "& .MuiInputLabel-root": { fontSize: "0.85rem" },
                      "& .MuiInputBase-input": { fontSize: "0.85rem" },
                    }}
                    error={!!errors.Nombre}
                    helperText={<ErrorMessage name="PrimerNombre" />}
                  />
                  <Field
                    as={TextField}
                    label="Segundo Nombre"
                    name="SegundoNombre"
                    size="small"
                    sx={{
                      flex: 1,
                      minWidth: 180,
                      bgcolor: "#FFFFFF",
                      "& .MuiInputLabel-root": { fontSize: "0.85rem" },
                      "& .MuiInputBase-input": { fontSize: "0.85rem" },
                    }}
                    error={!!errors.SegundoNombre}
                    helperText={<ErrorMessage name="SegundoNombre" />}
                  />
                </Box>

                {/* Fila 3: Apellidos */}
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                  <Field
                    as={TextField}
                    label="Primer Apellido"
                    name="PrimerApellido"
                    size="small"
                    sx={{
                      flex: 1,
                      minWidth: 180,
                      bgcolor: "#FFFFFF",
                      "& .MuiInputLabel-root": { fontSize: "0.85rem" },
                      "& .MuiInputBase-input": { fontSize: "0.85rem" },
                    }}
                    error={!!errors.Apellido}
                    helperText={<ErrorMessage name="PrimerApellido" />}
                  />
                  <Field
                    as={TextField}
                    label="Segundo Apellido"
                    name="SegundoApellido"
                    size="small"
                    sx={{
                      flex: 1,
                      minWidth: 180,
                      bgcolor: "#FFFFFF",
                      "& .MuiInputLabel-root": { fontSize: "0.85rem" },
                      "& .MuiInputBase-input": { fontSize: "0.85rem" },
                    }}
                    error={!!errors.SegundoApellido}
                    helperText={<ErrorMessage name="SegundoApellido" />}
                  />
                </Box>

                {/* Fila 4: Fecha Nacimiento, Edad, Sexo */}
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                  <Field
                    as={TextField}
                    label="Fecha de Nacimiento"
                    name="FechaNacimiento"
                    type="date"
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                      style: { fontSize: "0.85rem" },
                    }}
                    sx={{
                      flex: 1,
                      minWidth: 180,
                      bgcolor: "#FFFFFF",
                      "& .MuiInputBase-input": { fontSize: "0.85rem" },
                    }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const fecha = e.target.value;
                      setFieldValue("FechaNacimiento", fecha);
                      const edad = calcularEdad(fecha);
                      setFieldValue("Edad", edad.toString());
                    }}
                    error={!!errors.FechaNacimiento}
                    helperText={<ErrorMessage name="FechaNacimiento" />}
                  />
                  <Field
                    as={TextField}
                    label="Edad"
                    name="Edad"
                    size="small"
                    type="number"
                    InputProps={{ readOnly: true }}
                    sx={{
                      flex: 0.5,
                      minWidth: 100,
                      bgcolor: "#F5F5F5",
                      "& .MuiInputLabel-root": { fontSize: "0.85rem" },
                      "& .MuiInputBase-input": { fontSize: "0.85rem" },
                    }}
                    error={!!errors.Edad}
                    helperText={<ErrorMessage name="Edad" />}
                  />
                  <FormControl
                    size="small"
                    sx={{ flex: 1, minWidth: 120, bgcolor: "#FFFFFF" }}
                  >
                    <InputLabel sx={{ fontSize: "0.85rem" }}>Sexo</InputLabel>
                    <Field
                      as={Select}
                      name="Sexo"
                      label="Sexo"
                      sx={{ fontSize: "0.85rem" }}
                      error={!!errors.Sexo}
                    >
                      <MenuItem value="Masculino" sx={{ fontSize: "0.85rem" }}>
                        Masculino
                      </MenuItem>
                      <MenuItem value="Femenino" sx={{ fontSize: "0.85rem" }}>
                        Femenino
                      </MenuItem>
                      <MenuItem value="Otro" sx={{ fontSize: "0.85rem" }}>
                        Otro
                      </MenuItem>
                    </Field>
                    {errors.Sexo && (
                      <Typography
                        color="error"
                        sx={{ fontSize: "0.75rem", mt: 0.5, ml: 1 }}
                      >
                        <ErrorMessage name="Sexo" />
                      </Typography>
                    )}
                  </FormControl>
                </Box>

                {/* Fila 5: Contacto */}
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                  <Field
                    as={TextField}
                    label="Correo"
                    name="Correo"
                    type="email"
                    size="small"
                    sx={{
                      flex: 1,
                      minWidth: 200,
                      bgcolor: "#FFFFFF",
                      "& .MuiInputLabel-root": { fontSize: "0.85rem" },
                      "& .MuiInputBase-input": { fontSize: "0.85rem" },
                    }}
                    error={!!errors.Correo}
                    helperText={<ErrorMessage name="Correo" />}
                  />
                  <Field
                    as={TextField}
                    label="Teléfono"
                    name="Telefono"
                    size="small"
                    sx={{
                      flex: 1,
                      minWidth: 180,
                      bgcolor: "#FFFFFF",
                      "& .MuiInputLabel-root": { fontSize: "0.85rem" },
                      "& .MuiInputBase-input": { fontSize: "0.85rem" },
                    }}
                    error={!!errors.Telefono}
                    helperText={<ErrorMessage name="Telefono" />}
                  />
                </Box>

                {/* Fila 6: Dirección */}
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                  <Field
                    as={TextField}
                    label="Dirección"
                    name="Direccion"
                    size="small"
                    multiline
                    rows={2}
                    sx={{
                      flex: 1,
                      bgcolor: "#FFFFFF",
                      "& .MuiInputLabel-root": { fontSize: "0.85rem" },
                      "& .MuiInputBase-input": { fontSize: "0.85rem" },
                    }}
                    error={!!errors.Direccion}
                    helperText={<ErrorMessage name="Direccion" />}
                  />
                </Box>

                {/* Fila 7: Especialidad (solo para médicos) */}
                {type === "medico" && (
                  <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                    <Field
                      as={TextField}
                      label="Especialidad"
                      name="Especialidad"
                      size="small"
                      sx={{
                        flex: 1,
                        bgcolor: "#FFFFFF",
                        "& .MuiInputLabel-root": { fontSize: "0.85rem" },
                        "& .MuiInputBase-input": { fontSize: "0.85rem" },
                      }}
                      error={!!errors.Especialidad}
                      helperText={<ErrorMessage name="Especialidad" />}
                    />
                  </Box>
                )}

                {/* Error de envío */}
                {submitError && (
                  <Box
                    sx={{
                      color: "error.main",
                      bgcolor: "#ffebee",
                      p: 2,
                      borderRadius: 2,
                      border: "1px solid #ffcdd2",
                      mt: 2,
                    }}
                  >
                    <Typography sx={{ fontSize: "0.85rem" }}>
                      {submitError}
                    </Typography>
                  </Box>
                )}
              </Box>

              <DialogActions
                sx={{
                  background: "#F4F8FB",
                  pt: 3,
                  pb: 2,
                  px: 3,
                  justifyContent: "center",
                  gap: 3,
                }}
              >
                <Button
                  onClick={onClose}
                  sx={{
                    color: "#fff",
                    background: "#e57373",
                    borderRadius: 2,
                    px: 4,
                    py: 1.5,
                    textTransform: "none",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                    minWidth: 120,
                    "&:hover": { background: "#c62828" },
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  sx={{
                    background: "#4A90E2",
                    borderRadius: 2,
                    px: 4,
                    py: 1.5,
                    textTransform: "none",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                    minWidth: 120,
                    "&:hover": { background: "#3A78C2" },
                    "&:disabled": { background: "#B0BEC5" },
                  }}
                >
                  {isSubmitting ? "Guardando..." : "Guardar"}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

