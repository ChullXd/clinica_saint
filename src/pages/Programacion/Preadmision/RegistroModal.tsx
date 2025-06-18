import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
} from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AdmMedico } from '../../interface/models';

interface RegistroModalProps {
  open: boolean;
  type: 'paciente' | 'medico' | null;
  onClose: () => void;
  onSave: (data: AdmMedico) => void;
}

const patientSchema = Yup.object().shape({
  Nombre: Yup.string()
    .required('El nombre es obligatorio')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(60, 'El nombre no puede exceder 60 caracteres'),
  Correo: Yup.string()
    .email('Formato de correo inválido')
    .required('El correo es obligatorio')
    .max(100, 'El correo no puede exceder 100 caracteres'),
  Telefono: Yup.string()
    .required('El teléfono es obligatorio')
    .matches(/^\d{10}$/, 'El teléfono debe tener 10 dígitos'),
  Direccion: Yup.string()
    .required('La dirección es obligatoria')
    .min(5, 'La dirección debe tener al menos 5 caracteres')
    .max(150, 'La dirección no puede exceder 150 caracteres'),
});

const medicoSchema = Yup.object().shape({
  Nombre: Yup.string()
    .required('El nombre es obligatorio')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(60, 'El nombre no puede exceder 60 caracteres'),
  Correo: Yup.string()
    .email('Formato de correo inválido')
    .required('El correo es obligatorio')
    .max(100, 'El correo no puede exceder 100 caracteres'),
  Telefono: Yup.string()
    .required('El teléfono es obligatorio')
    .matches(/^\d{10}$/, 'El teléfono debe tener 10 dígitos'),
  Direccion: Yup.string()
    .required('La dirección es obligatoria')
    .min(5, 'La dirección debe tener al menos 5 caracteres')
    .max(150, 'La dirección no puede exceder 150 caracteres'),
  Especialidad: Yup.string()
    .required('La especialidad es obligatoria')
    .min(3, 'La especialidad debe tener al menos 3 caracteres')
    .max(50, 'La especialidad no puede exceder 50 caracteres'),
});

const RegistroModal: React.FC<RegistroModalProps> = ({ open, type, onClose, onSave }) => {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const initialValues: AdmMedico = {
    Nombre: '',
    Correo: '',
    Telefono: '',
    Direccion: '',
    Especialidad: '',
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
      setSubmitError(err.message || `Error al guardar el ${type === 'paciente' ? 'paciente' : 'médico'}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={1}>
          <PersonIcon />
          {type === 'paciente' ? 'Registrar Paciente' : 'Registrar Médico'}
        </Box>
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          validationSchema={type === 'paciente' ? patientSchema : medicoSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors }) => (
            <Form>
              <Box sx={{ mt: 2 }}>
                <Field
                  as={TextField}
                  fullWidth
                  label="Nombre"
                  name="Nombre"
                  sx={{ mb: 2 }}
                  error={!!errors.Nombre}
                  helperText={<ErrorMessage name="Nombre" />}
                />
                <Field
                  as={TextField}
                  fullWidth
                  label="Correo"
                  name="Correo"
                  type="email"
                  sx={{ mb: 2 }}
                  error={!!errors.Correo}
                  helperText={<ErrorMessage name="Correo" />}
                />
                <Field
                  as={TextField}
                  fullWidth
                  label="Teléfono"
                  name="Telefono"
                  sx={{ mb: 2 }}
                  error={!!errors.Telefono}
                  helperText={<ErrorMessage name="Telefono" />}
                />
                <Field
                  as={TextField}
                  fullWidth
                  label="Dirección"
                  name="Direccion"
                  sx={{ mb: 2 }}
                  error={!!errors.Direccion}
                  helperText={<ErrorMessage name="Direccion" />}
                />
                {type === 'medico' && (
                  <Field
                    as={TextField}
                    fullWidth
                    label="Especialidad"
                    name="Especialidad"
                    sx={{ mb: 2 }}
                    error={!!errors.Especialidad}
                    helperText={<ErrorMessage name="Especialidad" />}
                  />
                )}
                {submitError && (
                  <Box sx={{ color: 'red', mt: 2 }}>
                    <Typography>{submitError}</Typography>
                  </Box>
                )}
              </Box>
              <DialogActions>
                <Button onClick={onClose} color="secondary">
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Guardando...' : 'Guardar'}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default RegistroModal;