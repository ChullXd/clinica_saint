export interface AdmPaciente {
  CodPaciente?: number; // Matches CreatePacienteDto
  Nombre: string; // Matches CreatePacienteDto
  Correo: string; // Matches CreatePacienteDto
  Telefono: string; // Matches CreatePacienteDto
  Direccion: string; // Matches CreatePacienteDto
}
export interface AdmMedico {
  CodMedico?: number;
  Nombre: string;
  Correo: string;
  Telefono: string;
  Direccion: string;
  Especialidad?: string; // Solo para médicos
}