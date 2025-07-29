import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  Chip,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  Person as PacienteIcon,
  LocationOn as UbicacionIcon,
  Phone as TelefonoIcon,
  LocalHospital as HospitalIcon,
  Search as BuscarIcon,
  Delete as EliminarIcon,
  Save as GuardarIcon,
  Close as CerrarIcon,
  CalendarToday as FechaIcon,
  Assignment as DiagnosticoIcon,
  Description as TratamientoIcon,
  AccountBox as ProfesionalIcon,
  Badge as CodigoIcon,
  Create as FirmaIcon,
  CheckCircle,
    Assignment as FormIcon,
} from "@mui/icons-material";

interface DatosPaciente {
  apellidoPaterno: string;
  apellidoMaterno: string;
  nombres: string;
  fechaNacimiento: string;
  edad: number;
  sexo: 'H' | 'M' | '';
  nacionalidad: string;
  pais: string;
  cedula: string;
  provincia: string;
  canton: string;
  parroquia: string;
  direccion: string;
  telefono: string;
}

interface DatosInstitucion {
  tipoTransferencia: 'REFERENCIA' | 'DERIVACION' | '';
  histClinicaNo: string;
  establecimientoOrigen: string;
  tipo: string;
  distritoArea: string;
  establecimientoDestino: string;
  servicio: string;
  especialidad: string;
  fechaTransferencia: string;
}

interface MotivoTransferencia {
  limitadaCapacidad: boolean;
  ausenciaProfesional: boolean;
  faltaProfesional: boolean;
  saturacionCapacidad: boolean;
  otros: boolean;
  especifiqueOtros: string;
}

interface DiagnosticoCIE10 {
  codigo: string;
  descripcion: string;
  tipo: 'PRE' | 'DEF';
  orden: number;
}

interface ProfesionalTransferencia {
  nombreCompleto: string;
  codigoMSP: string;
  firmaImagen: string;
}

export default function Transferencia() {
  const [datosPaciente, setDatosPaciente] = useState<DatosPaciente>({
    apellidoPaterno: '',
    apellidoMaterno: '',
    nombres: '',
    fechaNacimiento: '',
    edad: 0,
    sexo: '',
    nacionalidad: '',
    pais: '',
    cedula: '',
    provincia: '',
    canton: '',
    parroquia: '',
    direccion: '',
    telefono: ''
  });

  const [datosInstitucion, setDatosInstitucion] = useState<DatosInstitucion>({
    tipoTransferencia: '',
    histClinicaNo: '',
    establecimientoOrigen: '',
    tipo: '',
    distritoArea: '',
    establecimientoDestino: '',
    servicio: '',
    especialidad: '',
    fechaTransferencia: ''
  });

  const [motivoTransferencia, setMotivoTransferencia] = useState<MotivoTransferencia>({
    limitadaCapacidad: false,
    ausenciaProfesional: false,
    faltaProfesional: false,
    saturacionCapacidad: false,
    otros: false,
    especifiqueOtros: ''
  });

  const [hallazgosExamenes, setHallazgosExamenes] = useState('');
  const [resumenCuadroClinico, setResumenCuadroClinico] = useState('');
  const [diagnosticos, setDiagnosticos] = useState<DiagnosticoCIE10[]>([]);
  const [tratamientoRecomendado, setTratamientoRecomendado] = useState('');
  
  const [profesional, setProfesional] = useState<ProfesionalTransferencia>({
    nombreCompleto: '',
    codigoMSP: '',
    firmaImagen: ''
  });

  const [openBuscadorDiagnostico, setOpenBuscadorDiagnostico] = useState(false);
  const [busquedaDiagnostico, setBusquedaDiagnostico] = useState('');
  const [resultadosBusqueda, setResultadosBusqueda] = useState<any[]>([]);

  // Base de datos CIE10 simulada
  const baseCIE10 = [
    { codigo: 'I21.9', descripcion: 'Infarto agudo del miocardio, sin otra especificación' },
    { codigo: 'I50.9', descripcion: 'Insuficiencia cardíaca, no especificada' },
    { codigo: 'I10', descripcion: 'Hipertensión esencial (primaria)' },
    { codigo: 'E78.5', descripcion: 'Hiperlipidemia, no especificada' },
    { codigo: 'E11.9', descripcion: 'Diabetes mellitus no insulinodependiente, sin complicaciones' },
    { codigo: 'J44.1', descripcion: 'Enfermedad pulmonar obstructiva crónica con exacerbación aguda' },
    { codigo: 'N18.6', descripcion: 'Enfermedad renal crónica, estadio 5' },
    { codigo: 'I48.9', descripcion: 'Fibrilación y aleteo auricular, no especificados' }
  ];

  // Cargar datos iniciales
  useEffect(() => {
    // Datos del paciente desde admisión
    setDatosPaciente({
      apellidoPaterno: 'GARCÍA',
      apellidoMaterno: 'MORALES',
      nombres: 'JUAN CARLOS',
      fechaNacimiento: '15/03/1965',
      edad: 59,
      sexo: 'H',
      nacionalidad: 'ECUATORIANA',
      pais: 'ECUADOR',
      cedula: '0912345678',
      provincia: 'GUAYAS',
      canton: 'GUAYAQUIL',
      parroquia: 'TARQUI',
      direccion: 'AV. 9 DE OCTUBRE Y MALECÓN, EDIFICIO TORRES DEL RÍO, APTO 504',
      telefono: '04-2345678 / 0987654321'
    });

    // Datos de la institución
    setDatosInstitucion({
      tipoTransferencia: 'DERIVACION',
      histClinicaNo: '68814',
      establecimientoOrigen: 'Hospital Clínica Saint Joseph',
      tipo: 'HGN',
      distritoArea: 'Guayaquil/Zona8',
      establecimientoDestino: 'Hospital Luis Vernaza',
      servicio: 'Emergencia',
      especialidad: 'Cardiología',
      fechaTransferencia: '29/07/2025'
    });

    // Motivo de transferencia
    setMotivoTransferencia({
      limitadaCapacidad: false,
      ausenciaProfesional: false,
      faltaProfesional: false,
      saturacionCapacidad: true,
      otros: false,
      especifiqueOtros: ''
    });

    // Hallazgos relevantes
    setHallazgosExamenes(`HALLAZGOS RELEVANTES DE EXÁMENES Y PROCEDIMIENTOS DIAGNÓSTICOS:

ELECTROCARDIOGRAMA (ECG):
• Ritmo sinusal a 85 lpm
• Ondas Q patológicas en derivaciones II, III, aVF
• Elevación del segmento ST en derivaciones inferiores (V7-V8)
• Inversión de ondas T en V1-V3
• QRS: 110 ms - PR: 160 ms - QT: 420 ms

ECOCARDIOGRAMA TRANSTORÁCICO:
• Ventrículo izquierdo: Dimensiones normales
• FEVI: 45% (levemente deprimida)
• Hipocinesia de pared inferior y lateral
• Válvulas: Insuficiencia mitral leve
• No derrame pericárdico

LABORATORIO CLÍNICO:
• Troponina I: 12.5 ng/mL (VN: <0.04) - ELEVADA
• CK-MB: 85 U/L (VN: <25) - ELEVADA
• Creatinina: 1.2 mg/dL - NORMAL
• Glucosa: 180 mg/dL - ELEVADA
• Colesterol total: 245 mg/dL - ELEVADO
• Triglicéridos: 220 mg/dL - ELEVADOS

RADIOGRAFÍA DE TÓRAX:
• Silueta cardíaca normal
• Campos pulmonares libres
• No congestión pulmonar
• Ángulos costofrénicos libres

PROCEDIMIENTOS REALIZADOS:
• Cateterismo cardíaco de urgencia
• Angioplastia primaria de arteria coronaria derecha
• Colocación de stent medicado 3.0 x 18 mm
• Resultado: Flujo TIMI III post-procedimiento`);

    // Resumen cuadro clínico
    setResumenCuadroClinico(`RESUMEN DEL CUADRO CLÍNICO (Datos de Hoja de Emergencia 008):

MOTIVO DE CONSULTA:
Paciente masculino de 59 años que acude por dolor torácico de 4 horas de evolución.

ENFERMEDAD ACTUAL:
Inicia cuadro clínico hace 4 horas con dolor torácico retroesternal de tipo opresivo, intensidad 9/10, irradiado a brazo izquierdo y mandíbula, acompañado de diaforesis profusa, náuseas y sensación de muerte inminente. Dolor no cede con analgésicos comunes ni con reposo.

ANTECEDENTES PATOLÓGICOS:
• Hipertensión arterial diagnosticada hace 10 años, en tratamiento irregular
• Dislipidemia conocida sin tratamiento
• Tabaquismo: 20 cigarrillos/día por 25 años
• Diabetes mellitus tipo 2 diagnosticada hace 5 años

ANTECEDENTES FAMILIARES:
• Padre: Infarto agudo del miocardio a los 62 años
• Madre: Diabetes mellitus tipo 2

EXAMEN FÍSICO DE INGRESO:
• Paciente consciente, orientado, en regular estado general
• Signos vitales: PA: 160/95 mmHg, FC: 95 lpm, FR: 22 rpm, T°: 36.8°C, SatO2: 94%
• Piel: Pálida, diaforética
• Cardiovascular: Ruidos cardíacos rítmicos, no soplos audibles
• Pulmonar: Murmullo vesicular conservado, no agregados
• Abdomen: Blando, depresible, no doloroso
• Extremidades: Sin edemas, pulsos presentes

EVOLUCIÓN EN EMERGENCIA:
• Se inicia protocolo de síndrome coronario agudo
• Administración de aspirina, clopidogrel, atorvastatina
• Analgesia con morfina
• Mejoría parcial del dolor tras analgesia
• Se decide traslado para cateterismo de urgencia por saturación de capacidad de UCI`);

    // Diagnósticos iniciales
    setDiagnosticos([
      { codigo: 'I21.9', descripcion: 'Infarto agudo del miocardio, sin otra especificación', tipo: 'DEF', orden: 1 },
      { codigo: 'I10', descripcion: 'Hipertensión esencial (primaria)', tipo: 'DEF', orden: 2 },
      { codigo: 'E78.5', descripcion: 'Hiperlipidemia, no especificada', tipo: 'DEF', orden: 3 },
      { codigo: 'E11.9', descripcion: 'Diabetes mellitus no insulinodependiente, sin complicaciones', tipo: 'DEF', orden: 4 }
    ]);

    // Tratamiento recomendado
    setTratamientoRecomendado(`TRATAMIENTO RECOMENDADO A SEGUIR EN ESTABLECIMIENTO DE SALUD DE MENOR NIVEL DE COMPLEJIDAD:

1. MANEJO MÉDICO INMEDIATO:
   • Monitoreo cardíaco continuo por 48-72 horas
   • Control de signos vitales cada 2 horas las primeras 12 horas
   • Reposo absoluto en cama por 24 horas, luego movilización progresiva
   • Dieta cardioprotectora, hiposódica, hipograsa
   • Balance hídrico estricto

2. MEDICACIÓN:
   • Aspirina 100 mg VO cada 24 horas (indefinido)
   • Clopidogrel 75 mg VO cada 24 horas por 12 meses
   • Atorvastatina 80 mg VO cada 24 horas (indefinido)
   • Metoprolol 25 mg VO cada 12 horas (iniciar dosis baja, titular según tolerancia)
   • Enalapril 5 mg VO cada 12 horas (iniciar dosis baja, titular según PA)
   • Metformina 850 mg VO cada 12 horas con las comidas
   • Insulina NPH según esquema móvil si glucemia >180 mg/dL

3. CONTROL Y SEGUIMIENTO:
   • ECG de control en 6-12 horas
   • Enzimas cardíacas (Troponina, CK-MB) a las 6 y 12 horas
   • Química sanguínea completa diaria
   • Gasometría arterial si deterioro respiratorio
   • Ecocardiograma de control en 48-72 horas

4. CRITERIOS DE REFERENCIA INMEDIATA:
   • Dolor torácico recurrente o persistente
   • Cambios electrocardiográficos nuevos
   • Signos de insuficiencia cardíaca (disnea, edemas, terceros ruidos)
   • Arritmias malignas (TV, FV, BAV completo)
   • Shock cardiogénico (PA sistólica <90 mmHg, signos de hipoperfusión)
   • Complicaciones mecánicas (soplo nuevo, thrill)

5. EDUCACIÓN AL PACIENTE Y FAMILIA:
   • Importancia de la adherencia al tratamiento
   • Reconocimiento de signos de alarma
   • Modificación de factores de riesgo
   • Cesación completa del tabaquismo
   • Control dietético y ejercicio progresivo
   • Importancia del seguimiento médico regular

6. SEGUIMIENTO AMBULATORIO:
   • Control por Cardiología en 1 semana
   • Control por Medicina Interna en 72 horas
   • Laboratorio de control en 1 semana (perfil lipídico, función renal)
   • Rehabilitación cardíaca en 2-4 semanas`);

    // Profesional que transfiere
    setProfesional({
      nombreCompleto: 'DR. CARLOS EDUARDO MENDOZA SILVA',
      codigoMSP: 'MSP-12345-2024',
      firmaImagen: '/firmas/dr_mendoza_silva.png'
    });
  }, []);

  // Funciones para manejar diagnósticos
  const buscarDiagnosticos = (termino: string) => {
    if (termino.length < 2) {
      setResultadosBusqueda([]);
      return;
    }

    const resultados = baseCIE10.filter(item =>
      item.codigo.toLowerCase().includes(termino.toLowerCase()) ||
      item.descripcion.toLowerCase().includes(termino.toLowerCase())
    );

    setResultadosBusqueda(resultados.slice(0, 10));
  };

  const agregarDiagnostico = (diagnostico: any, tipo: 'PRE' | 'DEF') => {
    if (diagnosticos.length >= 6) {
      alert('Máximo 6 diagnósticos permitidos');
      return;
    }

    const nuevoDiagnostico: DiagnosticoCIE10 = {
      codigo: diagnostico.codigo,
      descripcion: diagnostico.descripcion,
      tipo: tipo,
      orden: diagnosticos.length + 1
    };

    setDiagnosticos(prev => [...prev, nuevoDiagnostico]);
    setOpenBuscadorDiagnostico(false);
    setBusquedaDiagnostico('');
    setResultadosBusqueda([]);
  };

  const eliminarDiagnostico = (orden: number) => {
    setDiagnosticos(prev => 
      prev
        .filter(d => d.orden !== orden)
        .map((d, index) => ({ ...d, orden: index + 1 }))
    );
  };

  const calcularEdad = (fechaNacimiento: string) => {
    const [dia, mes, año] = fechaNacimiento.split('/').map(Number);
    const hoy = new Date();
    const nacimiento = new Date(año, mes - 1, dia);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mesActual = hoy.getMonth();
    const mesNacimiento = nacimiento.getMonth();
    
    if (mesActual < mesNacimiento || (mesActual === mesNacimiento && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    
    return edad;
  };

  const handleFechaNacimientoChange = (fecha: string) => {
    setDatosPaciente(prev => ({
      ...prev,
      fechaNacimiento: fecha,
      edad: calcularEdad(fecha)
    }));
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Título principal */}
       <Card sx={{ mb: 3, boxShadow: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "left" }}>
                    <FormIcon sx={{ fontSize: 36, color: "#1A3C6D", mr: 2 }} />
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: "bold",
                        color: "#1A3C6D",
                        textAlign: "center",
                      }}
                    >
                      FORMULARIO 053 MSP TRANSFERENCIA 
                    </Typography>
                  </Box>
                </CardContent>
              </Card>

      {/* Sección I: Datos del Paciente */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 2 }}>
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              fontWeight: "bold",
              color: "#1A3C6D",
              fontSize: "0.9rem",
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <PacienteIcon sx={{ fontSize: '1rem' }} />
            I. DATOS DEL PACIENTE (a):
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {/* Fila 1: Apellidos y Nombres */}
            <Box sx={{ flex: { xs: '100%', md: 'calc(4/12 * 100%)' }, minWidth: 200 }}>
              <TextField
                label="Apellido Paterno"
                value={datosPaciente.apellidoPaterno}
                onChange={(e) => setDatosPaciente(prev => ({
                  ...prev,
                  apellidoPaterno: e.target.value
                }))}
                fullWidth
                size="small"
                sx={{ '& .MuiInputBase-input': { fontSize: '0.7rem' } }}
              />
            </Box>
            <Box sx={{ flex: { xs: '100%', md: 'calc(4/12 * 100%)' }, minWidth: 200 }}>
              <TextField
                label="Apellido Materno"
                value={datosPaciente.apellidoMaterno}
                onChange={(e) => setDatosPaciente(prev => ({
                  ...prev,
                  apellidoMaterno: e.target.value
                }))}
                fullWidth
                size="small"
                sx={{ '& .MuiInputBase-input': { fontSize: '0.7rem' } }}
              />
            </Box>
            <Box sx={{ flex: { xs: '100%', md: 'calc(4/12 * 100%)' }, minWidth: 200 }}>
              <TextField
                label="Nombres"
                value={datosPaciente.nombres}
                onChange={(e) => setDatosPaciente(prev => ({
                  ...prev,
                  nombres: e.target.value
                }))}
                fullWidth
                size="small"
                sx={{ '& .MuiInputBase-input': { fontSize: '0.7rem' } }}
              />
            </Box>

            {/* Fila 2: Fecha nacimiento, Edad, Sexo */}
            <Box sx={{ flex: { xs: '100%', md: 'calc(4/12 * 100%)' }, minWidth: 200 }}>
              <TextField
                label="Fecha de Nacimiento (DD/MM/YYYY)"
                value={datosPaciente.fechaNacimiento}
                onChange={(e) => handleFechaNacimientoChange(e.target.value)}
                fullWidth
                size="small"
                placeholder="15/03/1965"
                sx={{ '& .MuiInputBase-input': { fontSize: '0.7rem' } }}
              />
            </Box>
            <Box sx={{ flex: { xs: '100%', md: 'calc(2/12 * 100%)' }, minWidth: 100 }}>
              <TextField
                label="Edad"
                value={datosPaciente.edad}
                disabled
                fullWidth
                size="small"
                sx={{ '& .MuiInputBase-input': { fontSize: '0.7rem' } }}
              />
            </Box>
            <Box sx={{ flex: { xs: '100%', md: 'calc(2/12 * 100%)' }, minWidth: 100 }}>
              <FormControl fullWidth size="small">
                <InputLabel sx={{ fontSize: '0.7rem' }}>Sexo</InputLabel>
                <Select
                  value={datosPaciente.sexo}
                  onChange={(e) => setDatosPaciente(prev => ({
                    ...prev,
                    sexo: e.target.value as 'H' | 'M'
                  }))}
                  sx={{ fontSize: '0.7rem' }}
                >
                  <MenuItem value="H" sx={{ fontSize: '0.7rem' }}>H - Hombre</MenuItem>
                  <MenuItem value="M" sx={{ fontSize: '0.7rem' }}>M - Mujer</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ flex: { xs: '100%', md: 'calc(4/12 * 100%)' }, minWidth: 200 }}>
              <TextField
                label="Nacionalidad"
                value={datosPaciente.nacionalidad}
                onChange={(e) => setDatosPaciente(prev => ({
                  ...prev,
                  nacionalidad: e.target.value
                }))}
                fullWidth
                size="small"
                sx={{ '& .MuiInputBase-input': { fontSize: '0.7rem' } }}
              />
            </Box>

            {/* Fila 3: País y Cédula */}
            <Box sx={{ flex: { xs: '100%', md: 'calc(6/12 * 100%)' }, minWidth: 200 }}>
              <TextField
                label="País"
                value={datosPaciente.pais}
                onChange={(e) => setDatosPaciente(prev => ({
                  ...prev,
                  pais: e.target.value
                }))}
                fullWidth
                size="small"
                sx={{ '& .MuiInputBase-input': { fontSize: '0.7rem' } }}
              />
            </Box>
            <Box sx={{ flex: { xs: '100%', md: 'calc(6/12 * 100%)' }, minWidth: 200 }}>
              <TextField
                label="Cédula de Ciudadanía ó Pasaporte"
                value={datosPaciente.cedula}
                onChange={(e) => setDatosPaciente(prev => ({
                  ...prev,
                  cedula: e.target.value
                }))}
                fullWidth
                size="small"
                sx={{ '& .MuiInputBase-input': { fontSize: '0.7rem' } }}
              />
            </Box>

            {/* Lugar de residencia */}
            <Box sx={{ width: '100%' }}>
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#666', mb: 1 }}>
                <UbicacionIcon sx={{ fontSize: '0.8rem', mr: 0.5 }} />
                Lugar de Residencia Actual:
              </Typography>
            </Box>
            <Box sx={{ flex: { xs: '100%', md: 'calc(4/12 * 100%)' }, minWidth: 200 }}>
              <TextField
                label="Provincia"
                value={datosPaciente.provincia}
                onChange={(e) => setDatosPaciente(prev => ({
                  ...prev,
                  provincia: e.target.value
                }))}
                fullWidth
                size="small"
                sx={{ '& .MuiInputBase-input': { fontSize: '0.7rem' } }}
              />
            </Box>
            <Box sx={{ flex: { xs: '100%', md: 'calc(4/12 * 100%)' }, minWidth: 200 }}>
              <TextField
                label="Cantón"
                value={datosPaciente.canton}
                onChange={(e) => setDatosPaciente(prev => ({
                  ...prev,
                  canton: e.target.value
                }))}
                fullWidth
                size="small"
                sx={{ '& .MuiInputBase-input': { fontSize: '0.7rem' } }}
              />
            </Box>
            <Box sx={{ flex: { xs: '100%', md: 'calc(4/12 * 100%)' }, minWidth: 200 }}>
              <TextField
                label="Parroquia"
                value={datosPaciente.parroquia}
                onChange={(e) => setDatosPaciente(prev => ({
                  ...prev,
                  parroquia: e.target.value
                }))}
                fullWidth
                size="small"
                sx={{ '& .MuiInputBase-input': { fontSize: '0.7rem' } }}
              />
            </Box>

            {/* Dirección y Teléfono */}
            <Box sx={{ flex: { xs: '100%', md: 'calc(8/12 * 100%)' }, minWidth: 200 }}>
              <TextField
                label="Dirección Domicilio"
                value={datosPaciente.direccion}
                onChange={(e) => setDatosPaciente(prev => ({
                  ...prev,
                  direccion: e.target.value
                }))}
                fullWidth
                size="small"
                sx={{ '& .MuiInputBase-input': { fontSize: '0.7rem' } }}
              />
            </Box>
            <Box sx={{ flex: { xs: '100%', md: 'calc(4/12 * 100%)' }, minWidth: 200 }}>
              <TextField
                label="No. Telefónico"
                value={datosPaciente.telefono}
                onChange={(e) => setDatosPaciente(prev => ({
                  ...prev,
                  telefono: e.target.value
                }))}
                fullWidth
                size="small"
                InputProps={{
                  startAdornment: <TelefonoIcon sx={{ fontSize: '0.8rem', color: '#666', mr: 0.5 }} />
                }}
                sx={{ '& .MuiInputBase-input': { fontSize: '0.7rem' } }}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Sección II: Referencia/Derivación */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 2 }}>
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              fontWeight: "bold",
              color: "#1A3C6D",
              fontSize: "0.9rem",
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <HospitalIcon sx={{ fontSize: '1rem' }} />
            II. REFERENCIA: 1 ( ) DERIVACIÓN: 2 ( )
          </Typography>

          {/* Tipo de transferencia */}
          <Paper variant="outlined" sx={{ p: 1.5, mb: 2, backgroundColor: '#f8f9fa' }}>
            <FormControl component="fieldset">
              <RadioGroup
                value={datosInstitucion.tipoTransferencia}
                onChange={(e) => setDatosInstitucion(prev => ({
                  ...prev,
                  tipoTransferencia: e.target.value as 'REFERENCIA' | 'DERIVACION'
                }))}
                sx={{ display: 'flex', flexDirection: 'row', gap: 3 }}
              >
                <FormControlLabel
                  value="REFERENCIA"
                  control={<Radio size="small" />}
                  label={<Typography sx={{ fontSize: '0.75rem' }}>1. REFERENCIA</Typography>}
                />
                <FormControlLabel
                  value="DERIVACION"
                  control={<Radio size="small" />}
                  label={<Typography sx={{ fontSize: '0.75rem' }}>2. DERIVACIÓN</Typography>}
                />
              </RadioGroup>
            </FormControl>
          </Paper>

          {/* 1. Datos Instituciones */}
          <Typography sx={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#666', mb: 1.5 }}>
            1. DATOS INSTITUCIONES:
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
            <Box sx={{ flex: { xs: '100%', md: 'calc(6/12 * 100%)' }, minWidth: 200 }}>
              <TextField
                label="Entidad del Sistema"
                value={datosInstitucion.tipoTransferencia || 'No seleccionado'}
                disabled
                fullWidth
                size="small"
                sx={{ '& .MuiInputBase-input': { fontSize: '0.7rem' } }}
              />
            </Box>
            <Box sx={{ flex: { xs: '100%', md: 'calc(6/12 * 100%)' }, minWidth: 200 }}>
              <TextField
                label="Hist. Clínica No."
                value={datosInstitucion.histClinicaNo}
                onChange={(e) => setDatosInstitucion(prev => ({
                  ...prev,
                  histClinicaNo: e.target.value
                }))}
                fullWidth
                size="small"
                placeholder="68814"
                sx={{ '& .MuiInputBase-input': { fontSize: '0.7rem' } }}
              />
            </Box>
            <Box sx={{ flex: { xs: '100%', md: 'calc(6/12 * 100%)' }, minWidth: 200 }}>
              <TextField
                label="Establecimiento de Salud"
                value={datosInstitucion.establecimientoOrigen}
                onChange={(e) => setDatosInstitucion(prev => ({
                  ...prev,
                  establecimientoOrigen: e.target.value
                }))}
                fullWidth
                size="small"
                placeholder="Hospital Clínica Saint Joseph"
                sx={{ '& .MuiInputBase-input': { fontSize: '0.7rem' } }}
              />
            </Box>
            <Box sx={{ flex: { xs: '100%', md: 'calc(3/12 * 100%)' }, minWidth: 150 }}>
              <TextField
                label="Tipo"
                value={datosInstitucion.tipo}
                onChange={(e) => setDatosInstitucion(prev => ({
                  ...prev,
                  tipo: e.target.value
                }))}
                fullWidth
                size="small"
                placeholder="HGN"
                sx={{ '& .MuiInputBase-input': { fontSize: '0.7rem' } }}
              />
            </Box>
            <Box sx={{ flex: { xs: '100%', md: 'calc(3/12 * 100%)' }, minWidth: 150 }}>
              <TextField
                label="Distrito/Área"
                value={datosInstitucion.distritoArea}
                onChange={(e) => setDatosInstitucion(prev => ({
                  ...prev,
                  distritoArea: e.target.value
                }))}
                fullWidth
                size="small"
                placeholder="Guayaquil/Zona8"
                sx={{ '& .MuiInputBase-input': { fontSize: '0.7rem' } }}
              />
            </Box>
          </Box>

          {/* Refiere o Deriva a */}
          <Typography sx={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#666', mb: 1.5 }}>
            REFIERE O DERIVA A:
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ flex: { xs: '100%', md: 'calc(6/12 * 100%)' }, minWidth: 200 }}>
              <TextField
                label="Entidad del Sistema"
                value="MINISTERIO DE SALUD PÚBLICA"
                disabled
                fullWidth
                size="small"
                sx={{ '& .MuiInputBase-input': { fontSize: '0.7rem' } }}
              />
            </Box>
            <Box sx={{ flex: { xs: '100%', md: 'calc(6/12 * 100%)' }, minWidth: 200 }}>
              <TextField
                label="Establecimiento de Salud"
                value={datosInstitucion.establecimientoDestino}
                onChange={(e) => setDatosInstitucion(prev => ({
                  ...prev,
                  establecimientoDestino: e.target.value
                }))}
                fullWidth
                size="small"
                sx={{ '& .MuiInputBase-input': { fontSize: '0.7rem' } }}
              />
            </Box>
            <Box sx={{ flex: { xs: '100%', md: 'calc(4/12 * 100%)' }, minWidth: 150 }}>
              <TextField
                label="Servicio"
                value={datosInstitucion.servicio}
                onChange={(e) => setDatosInstitucion(prev => ({
                  ...prev,
                  servicio: e.target.value
                }))}
                fullWidth
                size="small"
                placeholder="Emergencia"
                sx={{ '& .MuiInputBase-input': { fontSize: '0.7rem' } }}
              />
            </Box>
            <Box sx={{ flex: { xs: '100%', md: 'calc(4/12 * 100%)' }, minWidth: 150 }}>
              <TextField
                label="Especialidad"
                value={datosInstitucion.especialidad}
                onChange={(e) => setDatosInstitucion(prev => ({
                  ...prev,
                  especialidad: e.target.value
                }))}
                fullWidth
                size="small"
                sx={{ '& .MuiInputBase-input': { fontSize: '0.7rem' } }}
              />
            </Box>
            <Box sx={{ flex: { xs: '100%', md: 'calc(4/12 * 100%)' }, minWidth: 150 }}>
              <TextField
                label="Fecha (DD/MM/YYYY)"
                value={datosInstitucion.fechaTransferencia}
                onChange={(e) => setDatosInstitucion(prev => ({
                  ...prev,
                  fechaTransferencia: e.target.value
                }))}
                fullWidth
                size="small"
                InputProps={{
                  startAdornment: <FechaIcon sx={{ fontSize: '0.8rem', color: '#666', mr: 0.5 }} />
                }}
                sx={{ '& .MuiInputBase-input': { fontSize: '0.7rem' } }}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* 2. Motivo de Referencia/Derivación */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 2 }}>
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              fontWeight: "bold",
              color: "#d32f2f",
              fontSize: "0.9rem"
            }}
          >
            2. MOTIVO DE LA REFERENCIA O DERIVACIÓN:
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <FormControlLabel
              control={
                <Radio
                  checked={motivoTransferencia.limitadaCapacidad}
                  onChange={(e) => setMotivoTransferencia(prev => ({
                    ...prev,
                    limitadaCapacidad: e.target.checked,
                    ausenciaProfesional: false,
                    faltaProfesional: false,
                    saturacionCapacidad: false,
                    otros: false
                  }))}
                  size="small"
                />
              }
              label={<Typography sx={{ fontSize: '0.75rem' }}>1. Limitada capacidad resolutiva</Typography>}
            />
            <FormControlLabel
              control={
                <Radio
                  checked={motivoTransferencia.ausenciaProfesional}
                  onChange={(e) => setMotivoTransferencia(prev => ({
                    ...prev,
                    limitadaCapacidad: false,
                    ausenciaProfesional: e.target.checked,
                    faltaProfesional: false,
                    saturacionCapacidad: false,
                    otros: false
                  }))}
                  size="small"
                />
              }
              label={<Typography sx={{ fontSize: '0.75rem' }}>2. Ausencia temporal del profesional</Typography>}
            />
            <FormControlLabel
              control={
                <Radio
                  checked={motivoTransferencia.faltaProfesional}
                  onChange={(e) => setMotivoTransferencia(prev => ({
                    ...prev,
                    limitadaCapacidad: false,
                    ausenciaProfesional: false,
                    faltaProfesional: e.target.checked,
                    saturacionCapacidad: false,
                    otros: false
                  }))}
                  size="small"
                />
              }
              label={<Typography sx={{ fontSize: '0.75rem' }}>3. Falta de profesional</Typography>}
            />
            <FormControlLabel
              control={
                <Radio
                  checked={motivoTransferencia.saturacionCapacidad}
                  onChange={(e) => setMotivoTransferencia(prev => ({
                    ...prev,
                    limitadaCapacidad: false,
                    ausenciaProfesional: false,
                    faltaProfesional: false,
                    saturacionCapacidad: e.target.checked,
                    otros: false
                  }))}
                  size="small"
                />
              }
              label={<Typography sx={{ fontSize: '0.75rem' }}>4. Saturación de capacidad</Typography>}
            />
            <FormControlLabel
              control={
                <Radio
                  checked={motivoTransferencia.otros}
                  onChange={(e) => setMotivoTransferencia(prev => ({
                    ...prev,
                    limitadaCapacidad: false,
                    ausenciaProfesional: false,
                    faltaProfesional: false,
                    saturacionCapacidad: false,
                    otros: e.target.checked
                  }))}
                  size="small"
                />
              }
              label={<Typography sx={{ fontSize: '0.75rem' }}>5. Otros/Especifique</Typography>}
            />
          </Box>

          {motivoTransferencia.otros && (
            <TextField
              label="Especifique otros motivos"
              value={motivoTransferencia.especifiqueOtros}
              onChange={(e) => setMotivoTransferencia(prev => ({
                ...prev,
                especifiqueOtros: e.target.value
              }))}
              fullWidth
              multiline
              rows={2}
              size="small"
              sx={{ mt: 2, '& .MuiInputBase-input': { fontSize: '0.7rem' } }}
            />
          )}
        </CardContent>
      </Card>

      {/* 6. Hallazgos Relevantes */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 2 }}>
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              fontWeight: "bold",
              color: "#f57c00",
              fontSize: "0.9rem"
            }}
          >
            6. HALLAZGOS RELEVANTES DE EXÁMENES Y PROCEDIMIENTOS DIAGNÓSTICOS:
          </Typography>

          <TextField
            value={hallazgosExamenes}
            onChange={(e) => setHallazgosExamenes(e.target.value)}
            fullWidth
            multiline
            minRows={10}
            maxRows={20}
            sx={{
              '& .MuiInputBase-root': {
                fontSize: '0.7rem',
                fontFamily: 'monospace',
                lineHeight: 1.4
              }
            }}
            placeholder="Describa los hallazgos relevantes de exámenes y procedimientos diagnósticos..."
          />
        </CardContent>
      </Card>

      {/* 3. Resumen del Cuadro Clínico */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 2 }}>
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              fontWeight: "bold",
              color: "#2e7d32",
              fontSize: "0.9rem"
            }}
          >
            3. RESUMEN DEL CUADRO CLÍNICO:
          </Typography>
          <Typography sx={{ fontSize: '0.7rem', color: '#666', mb: 1 }}>
            (Se cargan los datos de hoja de emergencia 008)
          </Typography>

          <TextField
            value={resumenCuadroClinico}
            onChange={(e) => setResumenCuadroClinico(e.target.value)}
            fullWidth
            multiline
            minRows={15}
            maxRows={25}
            sx={{
              '& .MuiInputBase-root': {
                fontSize: '0.7rem',
                fontFamily: 'monospace',
                lineHeight: 1.4
              }
            }}
            placeholder="Resumen detallado del cuadro clínico del paciente..."
          />
        </CardContent>
      </Card>

      {/* 4. Diagnósticos CIE10 */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#1976d2",
                fontSize: "0.9rem",
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <DiagnosticoIcon sx={{ fontSize: '1rem' }} />
              4. DIAGNÓSTICO (CIE10):
            </Typography>

            <Button
              variant="contained"
              startIcon={<BuscarIcon />}
              onClick={() => setOpenBuscadorDiagnostico(true)}
              sx={{ 
                fontSize: '0.65rem', 
                textTransform: 'none',
                backgroundColor: '#1976d2'
              }}
            >
              Buscar Diagnóstico
            </Button>
          </Box>

          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell sx={{ fontSize: '0.7rem', fontWeight: 'bold', width: '50px' }}>#</TableCell>
                  <TableCell sx={{ fontSize: '0.7rem', fontWeight: 'bold' }}>DIAGNÓSTICO</TableCell>
                  <TableCell sx={{ fontSize: '0.7rem', fontWeight: 'bold', width: '100px' }}>CIE</TableCell>
                  <TableCell sx={{ fontSize: '0.7rem', fontWeight: 'bold', width: '80px' }}>PRE</TableCell>
                  <TableCell sx={{ fontSize: '0.7rem', fontWeight: 'bold', width: '80px' }}>DEF</TableCell>
                  <TableCell sx={{ fontSize: '0.7rem', fontWeight: 'bold', width: '80px' }}>ACCIONES</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.from({ length: 6 }, (_, index) => {
                  const diagnostico = diagnosticos.find(d => d.orden === index + 1);
                  return (
                    <TableRow key={index + 1} hover>
                      <TableCell sx={{ fontSize: '0.7rem', fontWeight: 'bold' }}>
                        {index + 1}.
                      </TableCell>
                      <TableCell sx={{ fontSize: '0.7rem' }}>
                        {diagnostico ? diagnostico.descripcion : ''}
                      </TableCell>
                      <TableCell sx={{ fontSize: '0.7rem', fontFamily: 'monospace' }}>
                        {diagnostico ? (
                          <Chip
                            label={diagnostico.codigo}
                            size="small"
                            color="primary"
                            sx={{ fontSize: '0.6rem' }}
                          />
                        ) : ''}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>
                        {diagnostico && diagnostico.tipo === 'PRE' ? (
                          <CheckCircle sx={{ fontSize: '1rem', color: '#4caf50' }} />
                        ) : ''}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>
                        {diagnostico && diagnostico.tipo === 'DEF' ? (
                          <CheckCircle sx={{ fontSize: '1rem', color: '#f44336' }} />
                        ) : ''}
                      </TableCell>
                      <TableCell>
                        {diagnostico && (
                          <Tooltip title="Eliminar diagnóstico">
                            <IconButton
                              size="small"
                              onClick={() => eliminarDiagnostico(diagnostico.orden)}
                              sx={{ color: '#d32f2f' }}
                            >
                              <EliminarIcon sx={{ fontSize: '0.8rem' }} />
                            </IconButton>
                          </Tooltip>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* 5. Tratamiento Recomendado */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 2 }}>
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              fontWeight: "bold",
              color: "#9c27b0",
              fontSize: "0.9rem",
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <TratamientoIcon sx={{ fontSize: '1rem' }} />
            5. TRATAMIENTO RECOMENDADO A SEGUIR EN ESTABLECIMIENTO DE SALUD DE MENOR NIVEL DE COMPLEJIDAD:
          </Typography>

          <TextField
            value={tratamientoRecomendado}
            onChange={(e) => setTratamientoRecomendado(e.target.value)}
            fullWidth
            multiline
            minRows={20}
            maxRows={30}
            sx={{
              '& .MuiInputBase-root': {
                fontSize: '0.7rem',
                fontFamily: 'monospace',
                lineHeight: 1.4
              }
            }}
            placeholder="Describa el tratamiento recomendado a seguir..."
          />
        </CardContent>
      </Card>

      {/* Profesional que realiza la transferencia */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 2 }}>
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              fontWeight: "bold",
              color: "#795548",
              fontSize: "0.9rem",
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <ProfesionalIcon sx={{ fontSize: '1rem' }} />
            PROFESIONAL QUE REALIZA LA TRANSFERENCIA:
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ flex: { xs: '100%', md: 'calc(6/12 * 100%)' }, minWidth: 200 }}>
              <TextField
                label="Nombre del Profesional"
                value={profesional.nombreCompleto}
                onChange={(e) => setProfesional(prev => ({
                  ...prev,
                  nombreCompleto: e.target.value
                }))}
                fullWidth
                size="small"
                placeholder="Primer nombre y apellidos del médico"
                sx={{ '& .MuiInputBase-input': { fontSize: '0.7rem' } }}
              />
            </Box>
            <Box sx={{ flex: { xs: '100%', md: 'calc(6/12 * 100%)' }, minWidth: 200 }}>
              <TextField
                label="Código MSP"
                value={profesional.codigoMSP}
                onChange={(e) => setProfesional(prev => ({
                  ...prev,
                  codigoMSP: e.target.value
                }))}
                fullWidth
                size="small"
                placeholder="Número de identificación MSP"
                InputProps={{
                  startAdornment: <CodigoIcon sx={{ fontSize: '0.8rem', color: '#666', mr: 0.5 }} />
                }}
                sx={{ '& .MuiInputBase-input': { fontSize: '0.7rem' } }}
              />
            </Box>
            <Box sx={{ width: '100%' }}>
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  backgroundColor: '#f8f9fa'
                }}
              >
                <FirmaIcon sx={{ fontSize: '1.5rem', color: '#666' }} />
                <Box>
                  <Typography sx={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#333' }}>
                    Firma Digital del Profesional:
                  </Typography>
                  <Typography sx={{ fontSize: '0.7rem', color: '#666' }}>
                    {profesional.firmaImagen ? `Firma cargada: ${profesional.firmaImagen}` : 'Solicitar B/D de las firmas'}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ mt: 1, fontSize: '0.6rem', textTransform: 'none' }}
                    onClick={() => alert('Función para cargar firma desde base de datos')}
                  >
                    Cargar Firma desde B/D
                  </Button>
                </Box>
              </Paper>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Dialog Buscador de Diagnósticos */}
      <Dialog
        open={openBuscadorDiagnostico}
        onClose={() => setOpenBuscadorDiagnostico(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          fontSize: '0.8rem',
          fontWeight: 'bold'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <BuscarIcon sx={{ fontSize: '1rem' }} />
            BUSCADOR DE DIAGNÓSTICOS CIE10
          </Box>
          <IconButton onClick={() => setOpenBuscadorDiagnostico(false)} size="small">
            <CerrarIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            placeholder="Buscar por código o descripción..."
            value={busquedaDiagnostico}
            onChange={(e) => {
              setBusquedaDiagnostico(e.target.value);
              buscarDiagnosticos(e.target.value);
            }}
            sx={{ mb: 2, '& .MuiInputBase-input': { fontSize: '0.7rem' } }}
            InputProps={{
              startAdornment: <BuscarIcon sx={{ fontSize: '1rem', color: '#666', mr: 1 }} />
            }}
          />

          {busquedaDiagnostico.length < 2 ? (
            <Alert severity="info" sx={{ fontSize: '0.7rem' }}>
              Ingrese al menos 2 caracteres para buscar diagnósticos CIE10
            </Alert>
          ) : resultadosBusqueda.length === 0 ? (
            <Alert severity="warning" sx={{ fontSize: '0.7rem' }}>
              No se encontraron diagnósticos que coincidan con "{busquedaDiagnostico}"
            </Alert>
          ) : (
            <Box>
              <Typography sx={{ fontSize: '0.7rem', fontWeight: 'bold', mb: 1, color: '#666' }}>
                {resultadosBusqueda.length} diagnóstico(s) encontrado(s):
              </Typography>
              
              {resultadosBusqueda.map((diagnostico) => (
                <Paper
                  key={diagnostico.codigo}
                  variant="outlined"
                  sx={{ p: 1.5, mb: 1, cursor: 'pointer', '&:hover': { backgroundColor: '#f5f5f5' } }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <Chip
                          label={diagnostico.codigo}
                          size="small"
                          color="primary"
                          sx={{ fontSize: '0.65rem', fontWeight: 'bold' }}
                        />
                      </Box>
                      <Typography sx={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#333' }}>
                        {diagnostico.descripcion}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => agregarDiagnostico(diagnostico, 'PRE')}
                        sx={{ fontSize: '0.6rem', textTransform: 'none' }}
                      >
                        PRE
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => agregarDiagnostico(diagnostico, 'DEF')}
                        sx={{ fontSize: '0.6rem', textTransform: 'none' }}
                      >
                        DEF
                      </Button>
                    </Box>
                  </Box>
                </Paper>
              ))}
            </Box>
          )}
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => setOpenBuscadorDiagnostico(false)}
            sx={{ fontSize: '0.65rem', textTransform: 'none' }}
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Botones de acción */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
        <Button
          variant="outlined"
          sx={{ fontSize: '0.7rem', textTransform: 'none' }}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          startIcon={<GuardarIcon />}
          sx={{ 
            fontSize: '0.7rem', 
            textTransform: 'none',
            backgroundColor: '#4caf50',
            '&:hover': { backgroundColor: '#388e3c' }
          }}
        >
          Generar Formulario de Transferencia
        </Button>
      </Box>
    </Box>
  );
}