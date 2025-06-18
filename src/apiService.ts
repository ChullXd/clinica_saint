import axios from 'axios';
import { AdmMedico, AdmPaciente } from './pages/interface/models';

const API_BASE_URL = 'https://localhost:44345/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    config.headers = config.headers || {};
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Detalles del error de la API:', {
      mensaje: error.message,
      respuesta: error.response ? {
        estado: error.response.status,
        datos: error.response.data,
        headers: error.response.headers,
      } : null,
    });
    return Promise.reject(error);
  }
);

const apiService = {
  savePaciente: async (pacienteData: AdmPaciente): Promise<AdmPaciente & { CodPaciente?: number }> => {
    try {
      const payload = {
        Nombre: pacienteData.Nombre,
        Correo: pacienteData.Correo,
        Telefono: pacienteData.Telefono,
        Direccion: pacienteData.Direccion,
      };
      const response = await api.post<AdmPaciente & { CodPaciente: number }>('/Paciente/Crear_Paciente', payload);
      return response.data;
    } catch (error: any) {
      const errors = error.response?.data?.errors;
      let message = 'Error al guardar el paciente';
      if (errors) {
        const errorMessages = Object.values(errors).flat().join(', ');
        message = errorMessages || message;
      } else if (error.response?.data) {
        message = error.response.data.message || JSON.stringify(error.response.data);
      }
      throw new Error(message);
    }
  },
   saveMedico: async (medicoData: AdmMedico): Promise<AdmMedico & { CodPersona?: number }> => {
    try {
      const payload = {
        Nombre: medicoData.Nombre,
        Correo: medicoData.Correo,
        Telefono: medicoData.Telefono,
        Direccion: medicoData.Direccion,
        Especialidad: medicoData.Especialidad,
      };
      const response = await api.post<AdmMedico & { CodPersona: number }>('/Medico/Crear_Medico', payload);
      return response.data;
    } catch (error: any) {
      const errors = error.response?.data?.errors;
      let message = 'Error al guardar el médico';
      if (errors) {
        const errorMessages = Object.values(errors).flat().join(', ');
        message = errorMessages || message;
      } else if (error.response?.data) {
        message = error.response.data.message || JSON.stringify(error.response.data);
      }
      throw new Error(message);
    }
  },
};

export default apiService;