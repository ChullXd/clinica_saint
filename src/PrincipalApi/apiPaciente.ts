import { AdmPaciente, AdmMedico } from "../pages/interface/models";
import { api } from "./apiService";

const apiService = {
  savePaciente: async (
    pacienteData: AdmPaciente
  ): Promise<AdmPaciente & { CodPaciente?: number }> => {
    try {
      const payload = {
        Identificacion: pacienteData.Identificacion,
        Nombre: pacienteData.Nombre, // Campo completo del modelo
        SegundoNombre: pacienteData.SegundoNombre,
        Apellido: pacienteData.Apellido, // Campo completo del modelo
        SegundoApellido: pacienteData.SegundoApellido,
        FechaNacimiento: pacienteData.FechaNacimiento,
        Edad: pacienteData.Edad,
        Sexo: pacienteData.Sexo,
        Correo: pacienteData.Correo,
        Telefono: pacienteData.Telefono,
        Direccion: pacienteData.Direccion,
      };

      const response = await api.post<AdmPaciente & { CodPaciente: number }>(
        "/Paciente/Crear_Paciente",
        payload
      );
      return response.data;
    } catch (error: any) {
      const errors = error.response?.data?.errors;
      let message = "Error al guardar el paciente";
      if (errors) {
        const errorMessages = Object.values(errors).flat().join(", ");
        message = errorMessages || message;
      } else if (error.response?.data) {
        message =
          error.response.data.message || JSON.stringify(error.response.data);
      }
      throw new Error(message);
    }
  },

  saveMedico: async (
    medicoData: AdmMedico
  ): Promise<AdmMedico & { CodPersona?: number }> => {
    try {
      const payload = {
        Identificacion: medicoData.Identificacion,
        Nombre: medicoData.Nombre, // Campo completo del modelo
        SegundoNombre: medicoData.SegundoNombre,
        Apellido: medicoData.Apellido, // Campo completo del modelo
        SegundoApellido: medicoData.SegundoApellido,
        FechaNacimiento: medicoData.FechaNacimiento,
        Edad: medicoData.Edad,
        Sexo: medicoData.Sexo,
        Correo: medicoData.Correo,
        Telefono: medicoData.Telefono,
        Direccion: medicoData.Direccion,
        Especialidad: medicoData.Especialidad,
      };

      const response = await api.post<AdmMedico & { CodPersona: number }>(
        "/Medico/Crear_Medico",
        payload
      );
      return response.data;
    } catch (error: any) {
      const errors = error.response?.data?.errors;
      let message = "Error al guardar el médico";
      if (errors) {
        const errorMessages = Object.values(errors).flat().join(", ");
        message = errorMessages || message;
      } else if (error.response?.data) {
        message =
          error.response.data.message || JSON.stringify(error.response.data);
      }
      throw new Error(message);
    }
  },
};

export default apiService;
