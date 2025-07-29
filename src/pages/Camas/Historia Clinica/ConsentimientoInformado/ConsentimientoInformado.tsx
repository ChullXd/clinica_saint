import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  IconButton,
  Autocomplete,
  Divider,
  Chip,
  InputAdornment,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Switch,
  FormControlLabel as MuiFormControlLabel,
} from '@mui/material';
import {
  Assignment as FormIcon,
  AccessTime as TimeIcon,
  Save as SaveIcon,
  Upload as UploadIcon,
  Image as ImageIcon,
  Search as SearchIcon,
  Print as PrintIcon,
  Edit as EditIcon,
  Person as PersonIcon,
  PictureAsPdf as PdfIcon,
  Add as NewIcon,
} from "@mui/icons-material";

interface DatosEstablecimiento {
  institucionSistema: string;
  establecimientoSalud: string;
  numeroHistoriaClinica: string;
  numeroArchivo: string;
}

interface DatosPaciente {
  primerApellido: string;
  segundoApellido: string;
  primerNombre: string;
  segundoNombre: string;
  sexo: string;
  edad: string;
  condicionEdad: string;
}

interface ConsentimientoData {
  consentimientoPara: string;
  servicio: string;
  tipoAtencion: string;
  diagnostico: string;
  nombreProcedimiento: string;
  enQueConsiste: string;
  comoSeRealiza: string;
  imagenAdjunta: File | null;
  duracionEstimada: string;
  beneficiosProcedimiento: string;
  riesgosFrecuentes: string;
  riesgosPocofrecuentes: string;
  riesgosEspecificos: string;
  alternativasProcedimiento: string;
  descripcionManejoPosterior: string;
  consecuenciasSiNoSeRealiza: string;
}

interface DeclaracionConsentimiento {
  fecha: string;
  hora: string;
  nombrePaciente: string;
  cedulaPaciente: string;
  firmaPaciente: File | null;
  nombreProfesional: string;
  documentoProfesional: string;
  firmaProfesional: File | null;
  selloProfesional: File | null;
  codigoProfesional: string;
  necesitaRepresentante: boolean;
  nombreRepresentante: string;
  cedulaRepresentante: string;
  firmaRepresentante: File | null;
  parentesco: string;
}
  // Médicos disponibles para búsqueda
  const medicosDisponibles = [
    {
      id: 1,
      nombre: 'DR. CARLOS MENDOZA RIVERA',
      cedula: '1234567890',
      codigo: 'MED-001',
      especialidad: 'Cirugía General',
      tipo: 'Interno'
    },
    {
      id: 2,
      nombre: 'DRA. MARÍA FERNÁNDEZ LÓPEZ',
      cedula: '0987654321',
      codigo: 'MED-002',
      especialidad: 'Anestesiología',
      tipo: 'Interno'
    },
    {
      id: 3,
      nombre: 'DR. JUAN PÉREZ SÁNCHEZ',
      cedula: '1122334455',
      codigo: 'MED-003',
      especialidad: 'Traumatología y Ortopedia',
      tipo: 'Externo'
    },
    {
      id: 4,
      nombre: 'DRA. ANA RODRÍGUEZ MARTÍN',
      cedula: '5566778899',
      codigo: 'MED-004',
      especialidad: 'Ginecología',
      tipo: 'Interno'
    },
    {
      id: 5,
      nombre: 'DR. LUIS TORRES VARGAS',
      cedula: '6677889900',
      codigo: 'MED-005',
      especialidad: 'Cardiología',
      tipo: 'Externo'
    }
  ];
interface PlantillaConsentimiento {
  id: number;
  nombre: string;
  servicio: string;
  procedimiento: string;
  data: Partial<ConsentimientoData>;
}

export default function ConsentimientoInformado() {
  // Médicos disponibles para búsqueda
  const medicosDisponibles = [
    {
      id: 1,
      nombre: 'DR. CARLOS MENDOZA RIVERA',
      cedula: '1234567890',
      codigo: 'MED-001',
      especialidad: 'Cirugía General',
      tipo: 'Interno'
    },
    {
      id: 2,
      nombre: 'DRA. MARÍA FERNÁNDEZ LÓPEZ',
      cedula: '0987654321',
      codigo: 'MED-002',
      especialidad: 'Anestesiología',
      tipo: 'Interno'
    },
    {
      id: 3,
      nombre: 'DR. JUAN PÉREZ SÁNCHEZ',
      cedula: '1122334455',
      codigo: 'MED-003',
      especialidad: 'Traumatología y Ortopedia',
      tipo: 'Externo'
    },
    {
      id: 4,
      nombre: 'DRA. ANA RODRÍGUEZ MARTÍN',
      cedula: '5566778899',
      codigo: 'MED-004',
      especialidad: 'Ginecología',
      tipo: 'Interno'
    },
    {
      id: 5,
      nombre: 'DR. LUIS TORRES VARGAS',
      cedula: '6677889900',
      codigo: 'MED-005',
      especialidad: 'Cardiología',
      tipo: 'Externo'
    }
  ];

  const [datosEstablecimiento, setDatosEstablecimiento] = useState<DatosEstablecimiento>({
    institucionSistema: 'RPC',
    establecimientoSalud: 'RIVAMEDIC S. A.',
    numeroHistoriaClinica: '',
    numeroArchivo: '',
  });

  const [datosPaciente, setDatosPaciente] = useState<DatosPaciente>({
    primerApellido: '',
    segundoApellido: '',
    primerNombre: '',
    segundoNombre: '',
    sexo: '',
    edad: '',
    condicionEdad: 'años',
  });

  const [consentimientoData, setConsentimientoData] = useState<ConsentimientoData>({
    consentimientoPara: '',
    servicio: '',
    tipoAtencion: '',
    diagnostico: '',
    nombreProcedimiento: '',
    enQueConsiste: '',
    comoSeRealiza: '',
    imagenAdjunta: null,
    duracionEstimada: '',
    beneficiosProcedimiento: '',
    riesgosFrecuentes: '',
    riesgosPocofrecuentes: '',
    riesgosEspecificos: '',
    alternativasProcedimiento: '',
    descripcionManejoPosterior: '',
    consecuenciasSiNoSeRealiza: '',
  });

  const [declaracionData, setDeclaracionData] = useState<DeclaracionConsentimiento>({
    fecha: new Date().toISOString().split('T')[0],
    hora: new Date().toTimeString().slice(0, 5),
    nombrePaciente: '',
    cedulaPaciente: '',
    firmaPaciente: null,
    nombreProfesional: '',
    documentoProfesional: '',
    firmaProfesional: null,
    selloProfesional: null,
    codigoProfesional: '',
    necesitaRepresentante: false,
    nombreRepresentante: '',
    cedulaRepresentante: '',
    firmaRepresentante: null,
    parentesco: '',
  });

  const [openPlantillasDialog, setOpenPlantillasDialog] = useState(false);
  const [openCrearPlantillaDialog, setOpenCrearPlantillaDialog] = useState(false);
  const [nombreNuevaPlantilla, setNombreNuevaPlantilla] = useState('');

  // Diagnósticos CIE10 simulados
  const diagnosticosCIE10 = [
    { codigo: 'K35.9', descripcion: 'APENDICECTOMIA_CONVENCIONAL_ANESTESIOLOGIA' },
    { codigo: 'K36.9', descripcion: 'APENDICECTOMIA_CONVENCIONAL_CIRUGIA' },
    { codigo: 'K37.0', descripcion: 'APENDILAR_ANESTESIOLOGIA' },
    { codigo: 'K38.1', descripcion: 'APENDILAR_CIRUGIA' },
    { codigo: 'M17.0', descripcion: 'ARTROSCOPIA_HOMBRO_ANESTESIOLOGIA' },
    { codigo: 'M17.1', descripcion: 'ARTROSCOPIA_HOMBRO_CIRUGIA' },
    { codigo: 'M23.9', descripcion: 'ARTROSCOPIA_RODILLA_ANESTESIOLOGIA' },
  ];

  // Plantillas predefinidas
  const [plantillasConsentimiento, setPlantillasConsentimiento] = useState<PlantillaConsentimiento[]>([
    {
      id: 1,
      nombre: 'Apendicectomía Convencional',
      servicio: 'Cirugía General',
      procedimiento: 'Apendicectomía Laparoscópica',
      data: {
        consentimientoPara: 'Procedimiento quirúrgico de apendicectomía',
        servicio: 'Cirugía General',
        nombreProcedimiento: 'Apendicectomía Laparoscópica',
        enQueConsiste: 'Extirpación del apéndice cecal mediante técnica mínimamente invasiva',
        comoSeRealiza: 'A través de pequeñas incisiones en el abdomen usando un laparoscopio',
        duracionEstimada: '01:30',
        beneficiosProcedimiento: 'Resolución definitiva de la apendicitis, menor dolor postoperatorio',
        riesgosFrecuentes: 'Dolor postoperatorio, náuseas, vómitos leves',
        riesgosPocofrecuentes: 'Infección, sangrado, lesión de órganos adyacentes',
        alternativasProcedimiento: 'Apendicectomía abierta convencional',
        descripcionManejoPosterior: 'Reposo relativo 24-48 horas, dieta progresiva, control de herida',
        consecuenciasSiNoSeRealiza: 'Perforación apendicular, peritonitis, sepsis, riesgo vital',
      }
    },
    {
      id: 2,
      nombre: 'Artroscopia de Rodilla',
      servicio: 'Traumatología',
      procedimiento: 'Artroscopia Diagnóstica y Terapéutica de Rodilla',
      data: {
        consentimientoPara: 'Procedimiento artroscópico de rodilla',
        servicio: 'Traumatología y Ortopedia',
        nombreProcedimiento: 'Artroscopia Diagnóstica y Terapéutica de Rodilla',
        enQueConsiste: 'Visualización y tratamiento de lesiones intraarticulares de la rodilla',
        comoSeRealiza: 'Mediante pequeñas incisiones e introducción de cámara y instrumental especializado',
        duracionEstimada: '02:00',
        beneficiosProcedimiento: 'Diagnóstico preciso, tratamiento mínimamente invasivo, recuperación rápida',
        riesgosFrecuentes: 'Dolor, inflamación, rigidez temporal',
        riesgosPocofrecuentes: 'Infección, lesión vascular o nerviosa, trombosis',
        alternativasProcedimiento: 'Cirugía abierta, tratamiento conservador con fisioterapia',
        descripcionManejoPosterior: 'Fisioterapia, reposo parcial, uso de muletas según evolución',
        consecuenciasSiNoSeRealiza: 'Progresión del daño articular, limitación funcional permanente',
      }
    }
  ]);

  useEffect(() => {
    // Datos simulados del paciente desde admisión
    setDatosPaciente({
      primerApellido: 'VÁSQUEZ',
      segundoApellido: 'ROSALES',
      primerNombre: 'PACO',
      segundoNombre: 'RODOLFO',
      sexo: 'Masculino',
      edad: '53',
      condicionEdad: 'años',
    });

    // Datos del establecimiento (simulando datos desde el sistema)
    setDatosEstablecimiento(prev => ({
      ...prev,
      numeroHistoriaClinica: '1753456789', // Cédula del paciente
      numeroArchivo: 'EST-2024-001234', // Número de estadística
    }));
  }, []);

  useEffect(() => {
    // Actualizar datos de declaración con datos del paciente
    setDeclaracionData(prev => ({
      ...prev,
      nombrePaciente: `${datosPaciente.primerNombre} ${datosPaciente.segundoNombre} ${datosPaciente.primerApellido} ${datosPaciente.segundoApellido}`.trim(),
      cedulaPaciente: datosEstablecimiento.numeroHistoriaClinica,
    }));
  }, [datosPaciente, datosEstablecimiento]);

  const handleDatosEstablecimientoChange = (field: keyof DatosEstablecimiento, value: string) => {
    setDatosEstablecimiento(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDatosPacienteChange = (field: keyof DatosPaciente, value: string) => {
    setDatosPaciente(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleConsentimientoChange = (field: keyof ConsentimientoData, value: string | File | null) => {
    setConsentimientoData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDeclaracionChange = (field: keyof DeclaracionConsentimiento, value: string | boolean | File | null) => {
    setDeclaracionData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleConsentimientoChange('imagenAdjunta', file);
    }
  };

  const handleFileUpload = (field: keyof DeclaracionConsentimiento, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleDeclaracionChange(field, file);
    }
  };

  const aplicarPlantilla = (plantilla: PlantillaConsentimiento) => {
    setConsentimientoData(prev => ({
      ...prev,
      ...plantilla.data,
    }));
    setOpenPlantillasDialog(false);
  };

  const crearNuevaPlantilla = () => {
    if (nombreNuevaPlantilla.trim()) {
      const nuevaPlantilla: PlantillaConsentimiento = {
        id: plantillasConsentimiento.length + 1,
        nombre: nombreNuevaPlantilla,
        servicio: consentimientoData.servicio,
        procedimiento: consentimientoData.nombreProcedimiento,
        data: { ...consentimientoData },
      };
      
      setPlantillasConsentimiento(prev => [...prev, nuevaPlantilla]);
      setNombreNuevaPlantilla('');
      setOpenCrearPlantillaDialog(false);
      
      alert('Plantilla guardada exitosamente');
    }
  };

  const limpiarFormulario = () => {
    setConsentimientoData({
      consentimientoPara: '',
      servicio: '',
      tipoAtencion: '',
      diagnostico: '',
      nombreProcedimiento: '',
      enQueConsiste: '',
      comoSeRealiza: '',
      imagenAdjunta: null,
      duracionEstimada: '',
      beneficiosProcedimiento: '',
      riesgosFrecuentes: '',
      riesgosPocofrecuentes: '',
      riesgosEspecificos: '',
      alternativasProcedimiento: '',
      descripcionManejoPosterior: '',
      consecuenciasSiNoSeRealiza: '',
    });
    
    setDeclaracionData(prev => ({
      ...prev,
      fecha: new Date().toISOString().split('T')[0],
      hora: new Date().toTimeString().slice(0, 5),
      firmaPaciente: null,
      nombreProfesional: '',
      documentoProfesional: '',
      firmaProfesional: null,
      selloProfesional: null,
      codigoProfesional: '',
      necesitaRepresentante: false,
      nombreRepresentante: '',
      cedulaRepresentante: '',
      firmaRepresentante: null,
      parentesco: '',
    }));
  };

  return (
    <Box sx={{ p: 2, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {/* Encabezado */}
      <Card sx={{ mb: 2, boxShadow: 2 }}>
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <FormIcon sx={{ fontSize: 24, color: "#1A3C6D" }} />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "#1A3C6D",
                  fontSize: "0.9rem"
                }}
              >
                FORMULARIO 024 MSP - CONSENTIMIENTO INFORMADO
              </Typography>
            </Box>
            
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                onClick={() => setOpenPlantillasDialog(true)}
                sx={{ fontSize: '0.7rem', px: 2 }}
                variant="outlined"
              >
                Plantillas
              </Button>
              <IconButton
                onClick={() => setOpenCrearPlantillaDialog(true)}
                sx={{ color: '#1A3C6D' }}
                title="Crear nueva plantilla"
              >
                <SaveIcon />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* A. DATOS DEL ESTABLECIMIENTO */}
      <Card sx={{ mb: 2, boxShadow: 2 }}>
        <CardContent sx={{ p: 2 }}>
          <Typography
            variant="subtitle1"
            sx={{ mb: 2, fontWeight: "bold", color: "#1A3C6D", fontSize: "0.8rem" }}
          >
            A. DATOS DEL ESTABLECIMIENTO
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
            <Box sx={{ flex: "1 1 280px" }}>
              <TextField
                label="Institución del Sistema"
                value={datosEstablecimiento.institucionSistema}
                fullWidth
                variant="outlined"
                size="small"
                InputProps={{ 
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <FormIcon sx={{ fontSize: '0.8rem', color: '#1A3C6D' }} />
                    </InputAdornment>
                  ),
                }}
                helperText="Red Pública Complementaria - Dato del sistema"
                sx={{ 
                  '& .MuiInputBase-input': { fontSize: '0.75rem', fontWeight: 'bold' },
                  '& .MuiInputBase-root': { backgroundColor: '#e3f2fd' }
                }}
              />
            </Box>
            <Box sx={{ flex: "1 1 280px" }}>
              <TextField
                label="Establecimiento de Salud"
                value={datosEstablecimiento.establecimientoSalud}
                fullWidth
                variant="outlined"
                size="small"
                InputProps={{ 
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <FormIcon sx={{ fontSize: '0.8rem', color: '#1A3C6D' }} />
                    </InputAdornment>
                  ),
                }}
                helperText="Nombre del establecimiento de salud"
                sx={{ 
                  '& .MuiInputBase-input': { fontSize: '0.75rem', fontWeight: 'bold' },
                  '& .MuiInputBase-root': { backgroundColor: '#e3f2fd' }
                }}
              />
            </Box>
            <Box sx={{ flex: "1 1 240px" }}>
              <TextField
                label="Número de Historia Clínica"
                value={datosEstablecimiento.numeroHistoriaClinica}
                onChange={(e) => handleDatosEstablecimientoChange('numeroHistoriaClinica', e.target.value)}
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Cédula, pasaporte o carnet"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ fontSize: '0.8rem' }} />
                    </InputAdornment>
                  ),
                }}
                helperText="Cédula de ciudadanía, pasaporte o carnet de refugiado"
                sx={{ '& .MuiInputBase-input': { fontSize: '0.75rem' } }}
              />
            </Box>
            <Box sx={{ flex: "1 1 240px" }}>
              <TextField
                label="Número de archivo"
                value={datosEstablecimiento.numeroArchivo}
                onChange={(e) => handleDatosEstablecimientoChange('numeroArchivo', e.target.value)}
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Número de estadística"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FormIcon sx={{ fontSize: '0.8rem' }} />
                    </InputAdornment>
                  ),
                }}
                helperText="Número emitido por el área de estadística"
                sx={{ '& .MuiInputBase-input': { fontSize: '0.75rem' } }}
              />
            </Box>
          </Box>

          {/* Información adicional del establecimiento */}
          <Box sx={{ 
            mt: 2, 
            p: 1.5, 
            backgroundColor: '#f8f9fa', 
            borderRadius: 1,
            border: '1px solid #dee2e6'
          }}>
            <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#495057', fontSize: '0.7rem', display: 'block', mb: 0.5 }}>
              📋 INFORMACIÓN DEL ESTABLECIMIENTO:
            </Typography>
            <Typography variant="caption" sx={{ color: '#6c757d', fontSize: '0.65rem' }}>
              • Institución: {datosEstablecimiento.institucionSistema} (Red Pública Complementaria)<br/>
              • Establecimiento: {datosEstablecimiento.establecimientoSalud}<br/>
              • Historia Clínica: {datosEstablecimiento.numeroHistoriaClinica || 'No asignada'}<br/>
              • Archivo Estadística: {datosEstablecimiento.numeroArchivo || 'No asignado'}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* DATOS DEL PACIENTE (Datos de admisión) */}
      <Card sx={{ mb: 2, boxShadow: 2 }}>
        <CardContent sx={{ p: 2 }}>
          <Typography
            variant="subtitle1"
            sx={{ mb: 2, fontWeight: "bold", color: "#1A3C6D", fontSize: "0.8rem" }}
          >
            📋 DATOS DEL PACIENTE (Datos de admisión)
          </Typography>

          {/* Nombres y Apellidos */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: 2 }}>
            <Box sx={{ flex: "1 1 180px" }}>
              <TextField
                label="Primer Apellido"
                value={datosPaciente.primerApellido}
                onChange={(e) => handleDatosPacienteChange('primerApellido', e.target.value.toUpperCase())}
                fullWidth
                variant="outlined"
                size="small"
                InputProps={{
                  readOnly: true, // Dato viene de admisión
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ fontSize: '0.8rem' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ 
                  '& .MuiInputBase-input': { fontSize: '0.75rem', fontWeight: 'bold' },
                  '& .MuiInputBase-root': { backgroundColor: '#f0f8ff' }
                }}
                helperText="Dato de admisión"
              />
            </Box>
            <Box sx={{ flex: "1 1 180px" }}>
              <TextField
                label="Segundo Apellido"
                value={datosPaciente.segundoApellido}
                onChange={(e) => handleDatosPacienteChange('segundoApellido', e.target.value.toUpperCase())}
                fullWidth
                variant="outlined"
                size="small"
                InputProps={{
                  readOnly: true, // Dato viene de admisión
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ fontSize: '0.8rem' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ 
                  '& .MuiInputBase-input': { fontSize: '0.75rem', fontWeight: 'bold' },
                  '& .MuiInputBase-root': { backgroundColor: '#f0f8ff' }
                }}
                helperText="Dato de admisión"
              />
            </Box>
            <Box sx={{ flex: "1 1 180px" }}>
              <TextField
                label="Primer Nombre"
                value={datosPaciente.primerNombre}
                onChange={(e) => handleDatosPacienteChange('primerNombre', e.target.value.toUpperCase())}
                fullWidth
                variant="outlined"
                size="small"
                InputProps={{
                  readOnly: true, // Dato viene de admisión
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ fontSize: '0.8rem' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ 
                  '& .MuiInputBase-input': { fontSize: '0.75rem', fontWeight: 'bold' },
                  '& .MuiInputBase-root': { backgroundColor: '#f0f8ff' }
                }}
                helperText="Dato de admisión"
              />
            </Box>
            <Box sx={{ flex: "1 1 180px" }}>
              <TextField
                label="Segundo Nombre"
                value={datosPaciente.segundoNombre}
                onChange={(e) => handleDatosPacienteChange('segundoNombre', e.target.value.toUpperCase())}
                fullWidth
                variant="outlined"
                size="small"
                InputProps={{
                  readOnly: true, // Dato viene de admisión
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ fontSize: '0.8rem' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ 
                  '& .MuiInputBase-input': { fontSize: '0.75rem', fontWeight: 'bold' },
                  '& .MuiInputBase-root': { backgroundColor: '#f0f8ff' }
                }}
                helperText="Dato de admisión"
              />
            </Box>
            <Box sx={{ flex: "1 1 120px" }}>
              <TextField
                label="Edad"
                type="number"
                value={datosPaciente.edad}
                onChange={(e) => handleDatosPacienteChange('edad', e.target.value)}
                fullWidth
                variant="outlined"
                size="small"
                InputProps={{
                  readOnly: true, // Dato viene de admisión
                  startAdornment: (
                    <InputAdornment position="start">
                      <TimeIcon sx={{ fontSize: '0.8rem' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ 
                  '& .MuiInputBase-input': { fontSize: '0.75rem', fontWeight: 'bold' },
                  '& .MuiInputBase-root': { backgroundColor: '#f0f8ff' }
                }}
                helperText="Dato de admisión"
              />
            </Box>
          </Box>

          {/* Sexo y Condición Edad */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4, alignItems: "flex-start", mb: 2 }}>
            <FormControl component="fieldset">
              <Typography
                component="legend"
                sx={{ fontWeight: "bold", color: "text.primary", mb: 1, fontSize: "0.75rem" }}
              >
                👤 Sexo:
              </Typography>
              <RadioGroup 
                row 
                name="sexo" 
                value={datosPaciente.sexo}
                onChange={(e) => handleDatosPacienteChange('sexo', e.target.value)}
                sx={{ gap: 2 }}
              >
                <FormControlLabel
                  value="Masculino"
                  control={<Radio size="small" />}
                  label={
                    <Typography sx={{ fontSize: '0.7rem', fontWeight: 'bold' }}>
                      Masculino
                    </Typography>
                  }
                />
                <FormControlLabel
                  value="Femenino"
                  control={<Radio size="small" />}
                  label={
                    <Typography sx={{ fontSize: '0.7rem', fontWeight: 'bold' }}>
                      Femenino
                    </Typography>
                  }
                />
              </RadioGroup>
              <Typography variant="caption" sx={{ fontSize: '0.65rem', color: 'text.secondary', mt: 0.5 }}>
                Dato obtenido de admisión
              </Typography>
            </FormControl>

            <FormControl component="fieldset">
              <Typography
                component="legend"
                sx={{ fontWeight: "bold", color: "text.primary", mb: 1, fontSize: "0.75rem" }}
              >
                ⏰ Condición Edad:
              </Typography>
              <RadioGroup 
                row 
                name="condicion-edad" 
                value={datosPaciente.condicionEdad}
                onChange={(e) => handleDatosPacienteChange('condicionEdad', e.target.value)}
                sx={{ gap: 1.5 }}
              >
                <FormControlLabel
                  value="horas"
                  control={<Radio size="small" />}
                  label={<Typography sx={{ fontSize: '0.7rem' }}>Horas</Typography>}
                />
                <FormControlLabel
                  value="días"
                  control={<Radio size="small" />}
                  label={<Typography sx={{ fontSize: '0.7rem' }}>Días</Typography>}
                />
                <FormControlLabel
                  value="meses"
                  control={<Radio size="small" />}
                  label={<Typography sx={{ fontSize: '0.7rem' }}>Meses</Typography>}
                />
                <FormControlLabel
                  value="años"
                  control={<Radio size="small" />}
                  label={<Typography sx={{ fontSize: '0.7rem' }}>Años</Typography>}
                />
              </RadioGroup>
              <Typography variant="caption" sx={{ fontSize: '0.65rem', color: 'text.secondary', mt: 0.5 }}>
                Unidad de medida para la edad
              </Typography>
            </FormControl>
          </Box>

          {/* Resumen del Paciente */}
          {(datosPaciente.primerNombre || datosPaciente.primerApellido) && (
            <Card variant="outlined" sx={{ 
              p: 1.5, 
              backgroundColor: '#e8f5e8', 
              borderColor: '#4caf50',
              borderWidth: 2
            }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#2e7d32', fontSize: '0.75rem', mb: 0.5 }}>
                📋 RESUMEN DEL PACIENTE:
              </Typography>
              <Typography variant="caption" sx={{ color: '#1b5e20', fontSize: '0.7rem' }}>
                <strong>Nombre Completo:</strong> {datosPaciente.primerNombre} {datosPaciente.segundoNombre} {datosPaciente.primerApellido} {datosPaciente.segundoApellido}<br/>
                <strong>Sexo:</strong> {datosPaciente.sexo || 'No especificado'}<br/>
                <strong>Edad:</strong> {datosPaciente.edad ? `${datosPaciente.edad} ${datosPaciente.condicionEdad}` : 'No especificada'}<br/>
                <strong>Historia Clínica:</strong> {datosEstablecimiento.numeroHistoriaClinica || 'No asignada'}<br/>
                <strong>Archivo:</strong> {datosEstablecimiento.numeroArchivo || 'No asignado'}
              </Typography>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* B. CONSENTIMIENTO INFORMADO */}
      <Card sx={{ mb: 2, boxShadow: 2 }}>
        <CardContent sx={{ p: 2 }}>
          <Typography
            variant="subtitle1"
            sx={{ mb: 2, fontWeight: "bold", color: "#1A3C6D", fontSize: "0.8rem" }}
          >
            B. CONSENTIMIENTO INFORMADO
          </Typography>

          {/* Primera fila: Consentimiento para, Servicio, Tipo de atención */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: 2 }}>
            <Box sx={{ flex: "1 1 300px" }}>
              <TextField
                label="Consentimiento informado para"
                value={consentimientoData.consentimientoPara}
                onChange={(e) => handleConsentimientoChange('consentimientoPara', e.target.value)}
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Descripción general del consentimiento"
                sx={{ '& .MuiInputBase-input': { fontSize: '0.75rem' } }}
              />
            </Box>
            <Box sx={{ flex: "1 1 200px" }}>
              <TextField
                label="Servicio"
                value={consentimientoData.servicio}
                onChange={(e) => handleConsentimientoChange('servicio', e.target.value)}
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Ej: Cirugía General, Traumatología"
                sx={{ '& .MuiInputBase-input': { fontSize: '0.75rem' } }}
              />
            </Box>
            <Box sx={{ flex: "1 1 250px" }}>
              <FormControl component="fieldset">
                <Typography
                  component="legend"
                  sx={{ fontWeight: "bold", color: "text.primary", mb: 0.5, fontSize: "0.75rem" }}
                >
                  🏥 Tipo de atención:
                </Typography>
                <RadioGroup 
                  row 
                  value={consentimientoData.tipoAtencion}
                  onChange={(e) => handleConsentimientoChange('tipoAtencion', e.target.value)}
                  sx={{ gap: 2 }}
                >
                  <FormControlLabel
                    value="Ambulatorio"
                    control={<Radio size="small" />}
                    label={<Typography sx={{ fontSize: '0.7rem', fontWeight: 'bold' }}>Ambulatorio</Typography>}
                  />
                  <FormControlLabel
                    value="Hospitalización"
                    control={<Radio size="small" />}
                    label={<Typography sx={{ fontSize: '0.7rem', fontWeight: 'bold' }}>Hospitalización</Typography>}
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </Box>

          {/* Segunda fila: Diagnóstico y Procedimiento */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: 2 }}>
            <Box sx={{ flex: "1 1 400px" }}>
              <Autocomplete
                options={diagnosticosCIE10}
                getOptionLabel={(option) => `${option.codigo} - ${option.descripcion}`}
                value={diagnosticosCIE10.find(d => d.descripcion === consentimientoData.diagnostico) || null}
                onChange={(_, newValue) => {
                  handleConsentimientoChange('diagnostico', newValue?.descripcion || '');
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="🔍 Diagnóstico (CIE10)"
                    size="small"
                    placeholder="Buscar diagnóstico por código o descripción"
                    sx={{ '& .MuiInputBase-input': { fontSize: '0.75rem' } }}
                  />
                )}
                renderOption={(props, option) => (
                  <li {...props}>
                    <Box>
                      <Typography sx={{ fontSize: '0.75rem', fontWeight: 'bold' }}>
                        {option.codigo}
                      </Typography>
                      <Typography sx={{ fontSize: '0.65rem', color: 'text.secondary' }}>
                        {option.descripcion}
                      </Typography>
                    </Box>
                  </li>
                )}
              />
            </Box>
            <Box sx={{ flex: "1 1 300px" }}>
              <TextField
                label="Nombre del procedimiento recomendado"
                value={consentimientoData.nombreProcedimiento}
                onChange={(e) => handleConsentimientoChange('nombreProcedimiento', e.target.value)}
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Nombre específico del procedimiento"
                sx={{ '& .MuiInputBase-input': { fontSize: '0.75rem' } }}
              />
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Descripción del Procedimiento */}
          <Typography
            variant="subtitle2"
            sx={{ mb: 1.5, fontWeight: "bold", color: "#1A3C6D", fontSize: "0.75rem" }}
          >
            📋 DESCRIPCIÓN DEL PROCEDIMIENTO
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: 2 }}>
            <Box sx={{ flex: "1 1 400px" }}>
              <TextField
                label="En qué consiste"
                value={consentimientoData.enQueConsiste}
                onChange={(e) => handleConsentimientoChange('enQueConsiste', e.target.value)}
                fullWidth
                multiline
                rows={3}
                variant="outlined"
                size="small"
                placeholder="Descripción detallada de en qué consiste el procedimiento..."
                sx={{ '& .MuiInputBase-input': { fontSize: '0.75rem' } }}
              />
            </Box>
            <Box sx={{ flex: "1 1 400px" }}>
              <TextField
                label="Cómo se realiza"
                value={consentimientoData.comoSeRealiza}
                onChange={(e) => handleConsentimientoChange('comoSeRealiza', e.target.value)}
                fullWidth
                multiline
                rows={3}
                variant="outlined"
                size="small"
                placeholder="Explicación del procedimiento paso a paso..."
                sx={{ '& .MuiInputBase-input': { fontSize: '0.75rem' } }}
              />
            </Box>
          </Box>

          {/* Imagen y Duración */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: 2 }}>
            <Box sx={{ flex: "1 1 300px" }}>
              <Typography sx={{ fontSize: "0.75rem", fontWeight: "bold", mb: 1, color: "text.primary" }}>
                📊 Gráfico de la intervención:
              </Typography>
              <Box sx={{
                border: '2px dashed #1976d2',
                borderRadius: 1,
                p: 2,
                textAlign: 'center',
                minHeight: '120px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                backgroundColor: '#f8f9fa'
              }}>
                {consentimientoData.imagenAdjunta ? (
                  <Box>
                    <ImageIcon sx={{ fontSize: '2rem', color: '#4caf50' }} />
                    <Typography sx={{ fontSize: '0.7rem', color: '#4caf50', fontWeight: 'bold' }}>
                      {consentimientoData.imagenAdjunta.name}
                    </Typography>
                    <Typography sx={{ fontSize: '0.65rem', color: 'text.secondary' }}>
                      Archivo cargado exitosamente
                    </Typography>
                    <Button
                      size="small"
                      onClick={() => handleConsentimientoChange('imagenAdjunta', null)}
                      sx={{ fontSize: '0.65rem', mt: 0.5 }}
                      color="error"
                    >
                      Remover imagen
                    </Button>
                  </Box>
                ) : (
                  <>
                    <ImageIcon sx={{ fontSize: '2rem', color: '#1976d2' }} />
                    <Typography sx={{ fontSize: '0.7rem', color: 'text.secondary', mb: 1 }}>
                      Adjunte una imagen explicativa del procedimiento
                    </Typography>
                    <Button
                      variant="contained"
                      component="label"
                      startIcon={<UploadIcon />}
                      sx={{ fontSize: '0.7rem', py: 0.5 }}
                    >
                      Cargar imagen
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </Button>
                  </>
                )}
              </Box>
            </Box>
            <Box sx={{ flex: "1 1 200px" }}>
              <TextField
                label="⏱️ Duración estimada de la intervención"
                type="time"
                value={consentimientoData.duracionEstimada}
                onChange={(e) => handleConsentimientoChange('duracionEstimada', e.target.value)}
                fullWidth
                variant="outlined"
                size="small"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TimeIcon sx={{ fontSize: '0.8rem' }} />
                    </InputAdornment>
                  ),
                }}
                helperText="Formato HH:MM (Ej: 02:30)"
                sx={{ '& .MuiInputBase-input': { fontSize: '0.75rem' } }}
              />
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Beneficios y Riesgos */}
          <Typography
            variant="subtitle2"
            sx={{ mb: 1.5, fontWeight: "bold", color: "#1A3C6D", fontSize: "0.75rem" }}
          >
            ⚖️ BENEFICIOS Y RIESGOS
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: 2 }}>
            <Box sx={{ flex: "1 1 100%" }}>
              <TextField
                label="✅ Beneficios del procedimiento"
                value={consentimientoData.beneficiosProcedimiento}
                onChange={(e) => handleConsentimientoChange('beneficiosProcedimiento', e.target.value)}
                fullWidth
                multiline
                rows={2}
                variant="outlined"
                size="small"
                placeholder="Describa los beneficios esperados del procedimiento..."
                sx={{ 
                  '& .MuiInputBase-input': { fontSize: '0.75rem' },
                  '& .MuiInputBase-root': { backgroundColor: '#e8f5e8' }
                }}
              />
            </Box>
          </Box>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: 2 }}>
            <Box sx={{ flex: "1 1 400px" }}>
              <TextField
                label="⚠️ Riesgos frecuentes (pocos graves)"
                value={consentimientoData.riesgosFrecuentes}
                onChange={(e) => handleConsentimientoChange('riesgosFrecuentes', e.target.value)}
                fullWidth
                multiline
                rows={3}
                variant="outlined"
                size="small"
                placeholder="Riesgos comunes pero generalmente no graves..."
                sx={{ 
                  '& .MuiInputBase-input': { fontSize: '0.75rem' },
                  '& .MuiInputBase-root': { backgroundColor: '#fff3e0' }
                }}
              />
            </Box>
            <Box sx={{ flex: "1 1 400px" }}>
              <TextField
                label="🚨 Riesgos poco frecuentes (graves)"
                value={consentimientoData.riesgosPocofrecuentes}
                onChange={(e) => handleConsentimientoChange('riesgosPocofrecuentes', e.target.value)}
                fullWidth
                multiline
                rows={3}
                variant="outlined"
                size="small"
                placeholder="Riesgos poco comunes pero potencialmente graves..."
                sx={{ 
                  '& .MuiInputBase-input': { fontSize: '0.75rem' },
                  '& .MuiInputBase-root': { backgroundColor: '#ffebee' }
                }}
              />
            </Box>
          </Box>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: 2 }}>
            <Box sx={{ flex: "1 1 100%" }}>
              <TextField
                label="👤 Riesgos específicos del paciente (edad, estado de salud, creencias, valores, etc.)"
                value={consentimientoData.riesgosEspecificos}
                onChange={(e) => handleConsentimientoChange('riesgosEspecificos', e.target.value)}
                fullWidth
                multiline
                rows={2}
                variant="outlined"
                size="small"
                placeholder="Riesgos particulares relacionados con las características específicas de este paciente..."
                sx={{ 
                  '& .MuiInputBase-input': { fontSize: '0.75rem' },
                  '& .MuiInputBase-root': { backgroundColor: '#f3e5f5' }
                }}
              />
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Alternativas y Manejo Posterior */}
          <Typography
            variant="subtitle2"
            sx={{ mb: 1.5, fontWeight: "bold", color: "#1A3C6D", fontSize: "0.75rem" }}
          >
            🔄 ALTERNATIVAS Y CUIDADOS POSTERIORES
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: 2 }}>
            <Box sx={{ flex: "1 1 400px" }}>
              <TextField
                label="🔄 Alternativas al procedimiento"
                value={consentimientoData.alternativasProcedimiento}
                onChange={(e) => handleConsentimientoChange('alternativasProcedimiento', e.target.value)}
                fullWidth
                multiline
                rows={3}
                variant="outlined"
                size="small"
                placeholder="Describa las alternativas disponibles al procedimiento propuesto..."
                sx={{ 
                  '& .MuiInputBase-input': { fontSize: '0.75rem' },
                  '& .MuiInputBase-root': { backgroundColor: '#e1f5fe' }
                }}
              />
            </Box>
            <Box sx={{ flex: "1 1 400px" }}>
              <TextField
                label="🏥 Descripción manejo posterior al procedimiento"
                value={consentimientoData.descripcionManejoPosterior}
                onChange={(e) => handleConsentimientoChange('descripcionManejoPosterior', e.target.value)}
                fullWidth
                multiline
                rows={3}
                variant="outlined"
                size="small"
                placeholder="Cuidados, recuperación, seguimiento médico, medicamentos..."
                sx={{ 
                  '& .MuiInputBase-input': { fontSize: '0.75rem' },
                  '& .MuiInputBase-root': { backgroundColor: '#f1f8e9' }
                }}
              />
            </Box>
          </Box>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: 2 }}>
            <Box sx={{ flex: "1 1 100%" }}>
              <TextField
                label="⛔ Consecuencias posibles si NO se realiza el procedimiento"
                value={consentimientoData.consecuenciasSiNoSeRealiza}
                onChange={(e) => handleConsentimientoChange('consecuenciasSiNoSeRealiza', e.target.value)}
                fullWidth
                multiline
                rows={2}
                variant="outlined"
                size="small"
                placeholder="Explique qué podría suceder si el paciente decide no realizarse el procedimiento..."
                sx={{ 
                  '& .MuiInputBase-input': { fontSize: '0.75rem' },
                  '& .MuiInputBase-root': { backgroundColor: '#fce4ec' }
                }}
              />
            </Box>
          </Box>

          {/* Resumen del Consentimiento */}
          {(consentimientoData.nombreProcedimiento || consentimientoData.servicio) && (
            <Card variant="outlined" sx={{ 
              mt: 2,
              p: 1.5, 
              backgroundColor: '#e3f2fd', 
              borderColor: '#1976d2',
              borderWidth: 2
            }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#1565c0', fontSize: '0.75rem', mb: 0.5 }}>
                📋 RESUMEN DEL CONSENTIMIENTO:
              </Typography>
              <Typography variant="caption" sx={{ color: '#0d47a1', fontSize: '0.7rem' }}>
                <strong>Procedimiento:</strong> {consentimientoData.nombreProcedimiento || 'No especificado'}<br/>
                <strong>Servicio:</strong> {consentimientoData.servicio || 'No especificado'}<br/>
                <strong>Tipo:</strong> {consentimientoData.tipoAtencion || 'No especificado'}<br/>
                <strong>Duración:</strong> {consentimientoData.duracionEstimada || 'No especificada'}<br/>
                <strong>Diagnóstico:</strong> {consentimientoData.diagnostico || 'No especificado'}
              </Typography>
            </Card>
          )}
        </CardContent>
      </Card>

           {/* C. DECLARACIÓN DE CONSENTIMIENTO INFORMADO */}
      <Card sx={{ mb: 2, boxShadow: 2 }}>
        <CardContent sx={{ p: 2 }}>
          <Typography
            variant="subtitle1"
            sx={{ mb: 2, fontWeight: "bold", color: "#1A3C6D", fontSize: "0.8rem" }}
          >
            C. DECLARACIÓN DE CONSENTIMIENTO INFORMADO
          </Typography>

          {/* Fecha y Hora */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: 2 }}>
            <Box sx={{ flex: "1 1 200px" }}>
              <TextField
                label="Fecha"
                type="date"
                value={declaracionData.fecha}
                onChange={(e) => handleDeclaracionChange('fecha', e.target.value)}
                fullWidth
                variant="outlined"
                size="small"
                InputLabelProps={{ shrink: true }}
                sx={{ '& .MuiInputBase-input': { fontSize: '0.75rem' } }}
              />
            </Box>
            <Box sx={{ flex: "1 1 150px" }}>
              <TextField
                label="Hora"
                type="time"
                value={declaracionData.hora}
                onChange={(e) => handleDeclaracionChange('hora', e.target.value)}
                fullWidth
                variant="outlined"
                size="small"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TimeIcon sx={{ fontSize: '0.8rem' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ '& .MuiInputBase-input': { fontSize: '0.75rem' } }}
              />
            </Box>
          </Box>

          {/* Datos del Paciente */}
          <Typography
            variant="subtitle2"
            sx={{ mb: 1.5, fontWeight: "bold", color: "#1A3C6D", fontSize: "0.75rem" }}
          >
            📋 DATOS DEL PACIENTE
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: 2 }}>
            <Box sx={{ flex: "1 1 300px" }}>
              <TextField
                label="Nombre del paciente"
                value={declaracionData.nombrePaciente}
                fullWidth
                variant="outlined"
                size="small"
                InputProps={{ 
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ fontSize: '0.8rem' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ 
                  '& .MuiInputBase-input': { fontSize: '0.75rem' },
                  '& .MuiInputBase-root': { backgroundColor: '#f5f5f5' }
                }}
                helperText="Dato obtenido de admisión"
              />
            </Box>
            <Box sx={{ flex: "1 1 200px" }}>
              <TextField
                label="Cédula"
                value={declaracionData.cedulaPaciente}
                fullWidth
                variant="outlined"
                size="small"
                InputProps={{ 
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ fontSize: '0.8rem' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ 
                  '& .MuiInputBase-input': { fontSize: '0.75rem' },
                  '& .MuiInputBase-root': { backgroundColor: '#f5f5f5' }
                }}
                helperText="Dato obtenido de admisión"
              />
            </Box>
            <Box sx={{ flex: "1 1 200px" }}>
              <Typography sx={{ fontSize: "0.75rem", fontWeight: "bold", mb: 1, color: "text.primary" }}>
                Firma del paciente:
              </Typography>
              <Box sx={{
                border: '2px dashed #ccc',
                borderRadius: 1,
                p: 1.5,
                textAlign: 'center',
                minHeight: '80px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1
              }}>
                {declaracionData.firmaPaciente ? (
                  <Box>
                    <ImageIcon sx={{ fontSize: '1.5rem', color: '#4caf50' }} />
                    <Typography sx={{ fontSize: '0.65rem', color: '#4caf50' }}>
                      {declaracionData.firmaPaciente.name}
                    </Typography>
                    <Button
                      size="small"
                      onClick={() => handleDeclaracionChange('firmaPaciente', null)}
                      sx={{ fontSize: '0.6rem', mt: 0.5 }}
                    >
                      Remover
                    </Button>
                  </Box>
                ) : (
                  <>
                    <ImageIcon sx={{ fontSize: '1.5rem', color: '#ccc' }} />
                    <Button
                      variant="outlined"
                      component="label"
                      startIcon={<UploadIcon />}
                      sx={{ fontSize: '0.65rem', py: 0.3 }}
                    >
                      Cargar firma
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(e) => handleFileUpload('firmaPaciente', e)}
                      />
                    </Button>
                  </>
                )}
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Datos del Profesional */}
          <Typography
            variant="subtitle2"
            sx={{ mb: 1.5, fontWeight: "bold", color: "#1A3C6D", fontSize: "0.75rem" }}
          >
            👨‍⚕️ PROFESIONAL QUE REALIZA EL PROCEDIMIENTO
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: 2 }}>
            <Box sx={{ flex: "1 1 350px" }}>
              <Autocomplete
                options={medicosDisponibles}
                getOptionLabel={(option) => `${option.nombre} - ${option.especialidad}`}
                value={medicosDisponibles.find(m => m.nombre === declaracionData.nombreProfesional) || null}
                onChange={(_, newValue) => {
                  if (newValue) {
                    handleDeclaracionChange('nombreProfesional', newValue.nombre);
                    handleDeclaracionChange('documentoProfesional', newValue.cedula);
                    handleDeclaracionChange('codigoProfesional', newValue.codigo);
                  } else {
                    handleDeclaracionChange('nombreProfesional', '');
                    handleDeclaracionChange('documentoProfesional', '');
                    handleDeclaracionChange('codigoProfesional', '');
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Nombre del profesional que realiza procedimiento"
                    size="small"
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon sx={{ fontSize: '0.8rem' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ '& .MuiInputBase-input': { fontSize: '0.75rem' } }}
                  />
                )}
                renderOption={(props, option) => (
                  <li {...props}>
                    <Box>
                      <Typography sx={{ fontSize: '0.75rem', fontWeight: 'bold' }}>
                        {option.nombre}
                      </Typography>
                      <Typography sx={{ fontSize: '0.65rem', color: 'text.secondary' }}>
                        {option.especialidad} | Cédula: {option.cedula} | Código: {option.codigo}
                      </Typography>
                    </Box>
                  </li>
                )}
              />
            </Box>
            <Box sx={{ flex: "1 1 200px" }}>
              <TextField
                label="Número de documento de identificación"
                value={declaracionData.documentoProfesional}
                fullWidth
                variant="outlined"
                size="small"
                InputProps={{ 
                  readOnly: true,
                }}
                sx={{ 
                  '& .MuiInputBase-input': { fontSize: '0.75rem' },
                  '& .MuiInputBase-root': { backgroundColor: '#f5f5f5' }
                }}
                helperText="Se completa automáticamente"
              />
            </Box>
            <Box sx={{ flex: "1 1 200px" }}>
              <TextField
                label="Código del profesional"
                value={declaracionData.codigoProfesional}
                fullWidth
                variant="outlined"
                size="small"
                InputProps={{ 
                  readOnly: true,
                }}
                sx={{ 
                  '& .MuiInputBase-input': { fontSize: '0.75rem' },
                  '& .MuiInputBase-root': { backgroundColor: '#f5f5f5' }
                }}
                helperText="Se completa automáticamente"
              />
            </Box>
          </Box>

          {/* Firma y Sello del Profesional */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: 2 }}>
            <Box sx={{ flex: "1 1 250px" }}>
              <Typography sx={{ fontSize: "0.75rem", fontWeight: "bold", mb: 1, color: "text.primary" }}>
                Firma del profesional:
              </Typography>
              <Box sx={{
                border: '2px dashed #ccc',
                borderRadius: 1,
                p: 1.5,
                textAlign: 'center',
                minHeight: '80px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1
              }}>
                {declaracionData.firmaProfesional ? (
                  <Box>
                    <ImageIcon sx={{ fontSize: '1.5rem', color: '#4caf50' }} />
                    <Typography sx={{ fontSize: '0.65rem', color: '#4caf50' }}>
                      {declaracionData.firmaProfesional.name}
                    </Typography>
                    <Button
                      size="small"
                      onClick={() => handleDeclaracionChange('firmaProfesional', null)}
                      sx={{ fontSize: '0.6rem', mt: 0.5 }}
                    >
                      Remover
                    </Button>
                  </Box>
                ) : (
                  <>
                    <ImageIcon sx={{ fontSize: '1.5rem', color: '#ccc' }} />
                    <Button
                      variant="outlined"
                      component="label"
                      startIcon={<UploadIcon />}
                      sx={{ fontSize: '0.65rem', py: 0.3 }}
                    >
                      Cargar firma
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(e) => handleFileUpload('firmaProfesional', e)}
                      />
                    </Button>
                  </>
                )}
              </Box>
            </Box>
            <Box sx={{ flex: "1 1 250px" }}>
              <Typography sx={{ fontSize: "0.75rem", fontWeight: "bold", mb: 1, color: "text.primary" }}>
                Sello del profesional:
              </Typography>
              <Box sx={{
                border: '2px dashed #ccc',
                borderRadius: 1,
                p: 1.5,
                textAlign: 'center',
                minHeight: '80px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1
              }}>
                {declaracionData.selloProfesional ? (
                  <Box>
                    <ImageIcon sx={{ fontSize: '1.5rem', color: '#4caf50' }} />
                    <Typography sx={{ fontSize: '0.65rem', color: '#4caf50' }}>
                      {declaracionData.selloProfesional.name}
                    </Typography>
                    <Button
                      size="small"
                      onClick={() => handleDeclaracionChange('selloProfesional', null)}
                      sx={{ fontSize: '0.6rem', mt: 0.5 }}
                    >
                      Remover
                    </Button>
                  </Box>
                ) : (
                  <>
                    <ImageIcon sx={{ fontSize: '1.5rem', color: '#ccc' }} />
                    <Button
                      variant="outlined"
                      component="label"
                      startIcon={<UploadIcon />}
                      sx={{ fontSize: '0.65rem', py: 0.3 }}
                    >
                      Cargar sello
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(e) => handleFileUpload('selloProfesional', e)}
                      />
                    </Button>
                  </>
                )}
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Representante Legal */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <MuiFormControlLabel
              control={
                <Switch
                  checked={declaracionData.necesitaRepresentante}
                  onChange={(e) => handleDeclaracionChange('necesitaRepresentante', e.target.checked)}
                  color="primary"
                />
              }
              label={
                <Typography sx={{ fontSize: '0.75rem', fontWeight: 'bold' }}>
                  ⚠️ El paciente NO está en capacidad para firmar el consentimiento
                </Typography>
              }
            />
          </Box>

          {declaracionData.necesitaRepresentante && (
            <Card variant="outlined" sx={{ p: 2, backgroundColor: '#fff3e0' }}>
              <Typography
                variant="subtitle2"
                sx={{ mb: 1.5, fontWeight: "bold", color: "#f57c00", fontSize: "0.75rem" }}
              >
                👥 DATOS DEL REPRESENTANTE LEGAL
              </Typography>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: 2 }}>
                <Box sx={{ flex: "1 1 250px" }}>
                  <TextField
                    label="Nombre del representante legal"
                    value={declaracionData.nombreRepresentante}
                    onChange={(e) => handleDeclaracionChange('nombreRepresentante', e.target.value.toUpperCase())}
                    fullWidth
                    variant="outlined"
                    size="small"
                    sx={{ '& .MuiInputBase-input': { fontSize: '0.75rem' } }}
                  />
                </Box>
                <Box sx={{ flex: "1 1 180px" }}>
                  <TextField
                    label="Cédula"
                    value={declaracionData.cedulaRepresentante}
                    onChange={(e) => handleDeclaracionChange('cedulaRepresentante', e.target.value)}
                    fullWidth
                    variant="outlined"
                    size="small"
                    sx={{ '& .MuiInputBase-input': { fontSize: '0.75rem' } }}
                  />
                </Box>
                <Box sx={{ flex: "1 1 180px" }}>
                  <TextField
                    label="Parentesco"
                    value={declaracionData.parentesco}
                    onChange={(e) => handleDeclaracionChange('parentesco', e.target.value)}
                    fullWidth
                    variant="outlined"
                    size="small"
                    placeholder="Ej: Madre, Padre, Cónyuge"
                    sx={{ '& .MuiInputBase-input': { fontSize: '0.75rem' } }}
                  />
                </Box>
              </Box>

              <Box sx={{ flex: "1 1 250px" }}>
                <Typography sx={{ fontSize: "0.75rem", fontWeight: "bold", mb: 1, color: "text.primary" }}>
                  Firma del representante:
                </Typography>
                <Box sx={{
                  border: '2px dashed #ff9800',
                  borderRadius: 1,
                  p: 1.5,
                  textAlign: 'center',
                  minHeight: '80px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                  backgroundColor: 'white'
                }}>
                  {declaracionData.firmaRepresentante ? (
                    <Box>
                      <ImageIcon sx={{ fontSize: '1.5rem', color: '#4caf50' }} />
                      <Typography sx={{ fontSize: '0.65rem', color: '#4caf50' }}>
                        {declaracionData.firmaRepresentante.name}
                      </Typography>
                      <Button
                        size="small"
                        onClick={() => handleDeclaracionChange('firmaRepresentante', null)}
                        sx={{ fontSize: '0.6rem', mt: 0.5 }}
                      >
                        Remover
                      </Button>
                    </Box>
                  ) : (
                    <>
                      <ImageIcon sx={{ fontSize: '1.5rem', color: '#ff9800' }} />
                      <Button
                        variant="outlined"
                        component="label"
                        startIcon={<UploadIcon />}
                        sx={{ 
                          fontSize: '0.65rem', 
                          py: 0.3, 
                          color: '#ff9800',
                          borderColor: '#ff9800'
                        }}
                      >
                        Cargar firma
                        <input
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={(e) => handleFileUpload('firmaRepresentante', e)}
                        />
                      </Button>
                    </>
                  )}
                </Box>
              </Box>
            </Card>
          )}

          {/* Nota informativa */}
          <Alert severity="info" sx={{ mt: 2, fontSize: '0.7rem' }}>
            <Typography sx={{ fontSize: '0.7rem', fontWeight: 'bold', mb: 0.5 }}>
              📄 Información importante:
            </Typography>
            <Typography sx={{ fontSize: '0.65rem' }}>
              • Este documento se imprime y debe ser firmado físicamente por el paciente o familiar<br/>
              • Las firmas digitales son solo para referencia en el sistema<br/>
              • El documento físico firmado debe adjuntarse a la historia clínica
            </Typography>
          </Alert>
        </CardContent>
      </Card>

      {/* Botones de acción */}
      <Card sx={{ mb: 2, boxShadow: 2 }}>
        <CardContent sx={{ p: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 1.5, flexWrap: "wrap" }}>
                  <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    size="small"
                    sx={{
                      background: "#1A3C6D",
                      "&:hover": { background: "#274472" },
                      fontSize: "0.8rem"
                    }}
                  >
                    GUARDAR
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    size="small"
                    sx={{
                      color: "#1A3C6D",
                      borderColor: "#1A3C6D",
                      fontSize: "0.8rem"
                    }}
                  >
                    EDITAR
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<PrintIcon />}
                    size="small"
                    sx={{
                      color: "#1A3C6D",
                      borderColor: "#1A3C6D",
                      fontSize: "0.8rem"
                    }}
                  >
                    IMPRIMIR
                  </Button>
                </Box>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <Dialog open={openPlantillasDialog} onClose={() => setOpenPlantillasDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Seleccionar Plantilla</DialogTitle>
        <DialogContent>
          <List>
            {plantillasConsentimiento.map((plantilla) => (
              <ListItem key={plantilla.id} disablePadding>
                <ListItemButton onClick={() => aplicarPlantilla(plantilla)}>
                  <ListItemText
                    primary={plantilla.nombre}
                    secondary={`${plantilla.servicio} - ${plantilla.procedimiento}`}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPlantillasDialog(false)}>Cancelar</Button>
        </DialogActions>
      </Dialog>

           <Dialog 
        open={openCrearPlantillaDialog} 
        onClose={() => setOpenCrearPlantillaDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
          }
        }}
      >
        <DialogTitle sx={{ 
          pb: 1, 
          background: 'linear-gradient(135deg, #1A3C6D 0%, #1A3C6D 100%)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <SaveIcon sx={{ fontSize: '1.2rem' }} />
          <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
            Crear Nueva Plantilla
          </Typography>
        </DialogTitle>
        
        <DialogContent sx={{ pt: 3, pb: 2 }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ 
              mb: 2, 
              color: 'text.secondary', 
              fontSize: '0.85rem',
              lineHeight: 1.4
            }}>
              📋 Guarde los datos actuales del consentimiento como una plantilla reutilizable para futuros procedimientos similares.
            </Typography>
          </Box>

          <TextField
            autoFocus
            label="Nombre de la plantilla"
            fullWidth
            variant="outlined"
            value={nombreNuevaPlantilla}
            onChange={(e) => setNombreNuevaPlantilla(e.target.value)}
            placeholder="Ej: Apendicectomía Laparoscópica, Artroscopia de Rodilla..."
            sx={{ 
              mb: 2,
              '& .MuiInputBase-input': { fontSize: '0.9rem' },
              '& .MuiInputLabel-root': { fontSize: '0.9rem' }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FormIcon sx={{ fontSize: '1rem', color: '#1A3C6D' }} />
                </InputAdornment>
              ),
            }}
            helperText="El nombre debe ser descriptivo del procedimiento"
          />

          {/* Vista previa de datos que se guardarán */}
          <Card variant="outlined" sx={{ 
            backgroundColor: '#f8f9fa',
            border: '1px solid #e9ecef'
          }}>
            
          </Card>
        </DialogContent>
        
        <DialogActions sx={{ 
          p: 2.5, 
          pt: 1,
          gap: 1,
          backgroundColor: '#f8f9fa',
          borderTop: '1px solid #e9ecef'
        }}>
          <Button 
            onClick={() => {
              setOpenCrearPlantillaDialog(false);
              setNombreNuevaPlantilla('');
            }}
            variant="outlined"
            sx={{ 
              fontSize: '0.85rem',
              px: 3,
              color: '#6c757d',
              borderColor: '#6c757d',
              '&:hover': {
                borderColor: '#495057',
                color: '#495057'
              }
            }}
          >
            Cancelar
          </Button>
          
          <Button 
            onClick={crearNuevaPlantilla}
            variant="contained"
            disabled={!nombreNuevaPlantilla.trim()}
            startIcon={<SaveIcon />}
            sx={{ 
              fontSize: '0.85rem',
              px: 3,
              background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #218838 0%, #1e7e34 100%)',
              },
              '&:disabled': {
                background: '#e9ecef',
                color: '#6c757d'
              }
            }}
          >
            Guardar Plantilla
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}