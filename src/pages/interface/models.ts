export interface AdmPaciente {
  CodPaciente?: number; // Matches CreatePacienteDto
  Identificacion: string;
  SegundoNombre?: string;
  SegundoApellido?: string;
  FechaNacimiento: string;
  Edad: string;
  Sexo: string;
  Nombre: string; 
  Apellido: string; // Campo combinado para compatibilidad
  Correo: string; // Matches CreatePacienteDto
  Telefono: string; // Matches CreatePacienteDto
  Direccion: string; // Matches CreatePacienteDto
}

export interface AdmMedico {
  CodMedico?: number;
  Identificacion: string;
  SegundoNombre?: string;
  SegundoApellido?: string;
  FechaNacimiento: string;
  Edad: string;
  Sexo: string;
  Nombre: string;
  Apellido: string; // Campo combinado para compatibilidad
  Correo: string;
  Telefono: string;
  Direccion: string;
  Especialidad?: string; // Solo para médicos
}
