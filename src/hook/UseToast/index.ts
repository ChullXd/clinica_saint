
import * as Yup from 'yup';

export const patientSchema = Yup.object().shape({
  // Nombre: Yup.string()
  //   .required('El nombre es obligatorio')
  //   .min(2, 'El nombre debe tener al menos 2 caracteres')
  //   .max(60, 'El nombre no puede exceder 60 caracteres'),
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

export const medicoSchema = Yup.object().shape({
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
