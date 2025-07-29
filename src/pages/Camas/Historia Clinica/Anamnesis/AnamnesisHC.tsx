import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  Button,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  IconButton,
  Tooltip,
  Stack,
} from "@mui/material";
import {
  GetApp as ExportIcon,
  Assignment as FormIcon,
  Info as InfoIcon,
  History as HistoryIcon,
} from "@mui/icons-material";

export default function AnamnesisHC() {
  // Función para exportar a PDF
  const handleExportPDF = () => {
    alert("Exportando a PDF...");
  };

  // Función para imprimir
  const handlePrint = () => {
    alert("Enviando a impresora...");
  };

  // Datos de ejemplo que vendrían del formulario de Emergencia 008
  const pacienteData = {
    numeroHistoria: "A-123456",
    apellidos: "PEREZ GÓMEZ",
    nombres: "JUAN CARLOS",
    sexo: "MASCULINO",
    edad: "45 AÑOS",
    fechaNacimiento: "12/05/1980",
    nacionalidad: "ECUATORIANA",
    cedula: "1712345678",
    fechaAdmision: "23/07/2025",
    horaAdmision: "14:30",
    motivoConsulta: "DOLOR ABDOMINAL INTENSO DE 24 HORAS DE EVOLUCIÓN",
    enfermedadActual:
      "PACIENTE REFIERE DOLOR ABDOMINAL TIPO CÓLICO EN HIPOCONDRIO DERECHO IRRADIADO A ESPALDA, ACOMPAÑADO DE NÁUSEAS Y VÓMITOS DE CONTENIDO ALIMENTICIO. INICIA HACE 24 HORAS POSTERIOR A INGESTA DE ALIMENTOS GRASOS.",
    revisionSistemas: {
      cardiovascular: "SIN ALTERACIONES",
      respiratorio: "SIN ALTERACIONES",
      digestivo: "DOLOR ABDOMINAL, NÁUSEAS, VÓMITOS",
      genitourinario: "SIN ALTERACIONES",
      nervioso: "SIN ALTERACIONES",
    },
    antecedentes: {
      personales: "HIPERTENSIÓN ARTERIAL CONTROLADA CON LOSARTAN 50MG/DÍA",
      familiares: "PADRE CON DIABETES MELLITUS TIPO 2, MADRE HIPERTENSA",
      quirurgicos: "APENDICECTOMÍA HACE 20 AÑOS",
      alergicos: "NINGUNO CONOCIDO",
      habitos: "NO FUMA, ALCOHOL OCASIONAL",
    },
    signosVitales: {
      presion: "140/90 mmHg",
      frecuenciaCardiaca: "88 lpm",
      frecuenciaRespiratoria: "18 rpm",
      temperatura: "37.8 °C",
      saturacion: "96%",
      peso: "78 kg",
      talla: "170 cm",
    },
    impresionDiagnostica: "COLECISTITIS AGUDA",
  };

  return (
    <Paper elevation={3} sx={{ p: 2, m: 2 }}>
      {/* Encabezado */}
      <Box
        sx={{
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <FormIcon sx={{ fontSize: 28, color: "#1A3C6D", mr: 2 }} /> {/* Cambié de 36 a 28 */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "#1A3C6D",
              fontSize: "1.1rem", // Cambié a tamaño más pequeño
            }}
          >
            FORMULARIO 003 MSP - ANAMNESIS
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Datos del paciente */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{ 
                color: "#1A3C6D", 
                fontWeight: "bold",
                fontSize: "0.9rem", // Cambié a tamaño más pequeño
              }}
            >
              DATOS DEL PACIENTE
            </Typography>
            <Tooltip title="Datos obtenidos del registro de admisión">
              <IconButton size="small">
                <InfoIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>

          <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            {/* Columna izquierda */}
            <Box sx={{ flex: 1, minWidth: "300px" }}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" sx={{ color: "#666", fontSize: "0.65rem" }}> {/* Cambié de 0.75rem a 0.65rem */}
                  N° HISTORIA CLÍNICA:
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "bold", color: "#1A3C6D", fontSize: "0.85rem" }}> {/* Agregué fontSize más pequeño */}
                  {pacienteData.numeroHistoria}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" sx={{ color: "#666", fontSize: "0.65rem" }}> {/* Cambié de 0.75rem a 0.65rem */}
                  APELLIDOS:
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "medium", fontSize: "0.8rem" }}> {/* Agregué fontSize más pequeño */}
                  {pacienteData.apellidos}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" sx={{ color: "#666", fontSize: "0.65rem" }}> {/* Cambié de 0.75rem a 0.65rem */}
                  NOMBRES:
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "medium", fontSize: "0.8rem" }}> {/* Agregué fontSize más pequeño */}
                  {pacienteData.nombres}
                </Typography>
              </Box>
            </Box>

            {/* Columna derecha */}
            <Box sx={{ flex: 1, minWidth: "300px" }}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" sx={{ color: "#666", fontSize: "0.65rem" }}> {/* Cambié de 0.75rem a 0.65rem */}
                  SEXO / EDAD:
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "medium", fontSize: "0.8rem" }}> {/* Agregué fontSize más pequeño */}
                  {pacienteData.sexo} / {pacienteData.edad}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" sx={{ color: "#666", fontSize: "0.65rem" }}> {/* Cambié de 0.75rem a 0.65rem */}
                  FECHA DE NACIMIENTO:
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "medium", fontSize: "0.8rem" }}> {/* Agregué fontSize más pequeño */}
                  {pacienteData.fechaNacimiento}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" sx={{ color: "#666", fontSize: "0.65rem" }}> {/* Cambié de 0.75rem a 0.65rem */}
                  CÉDULA / NACIONALIDAD:
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "medium", fontSize: "0.8rem" }}> {/* Agregué fontSize más pequeño */}
                  {pacienteData.cedula} / {pacienteData.nacionalidad}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            <HistoryIcon fontSize="small" sx={{ mr: 1, color: "#1A3C6D" }} />
            <Typography variant="body2" sx={{ fontSize: "0.75rem" }}> {/* Agregué fontSize más pequeño */}
              <strong>Admisión:</strong> {pacienteData.fechaAdmision} -{" "}
              {pacienteData.horaAdmision}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Impresión Diagnóstica */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 2 }}>
          <Typography
            variant="h6"
            sx={{ 
              color: "#1A3C6D", 
              fontWeight: "bold", 
              mb: 2,
              fontSize: "0.9rem", // Cambié a tamaño más pequeño
            }}
          >
            IMPRESIÓN DIAGNÓSTICA
          </Typography>

          <Box
            sx={{
              p: 1.5,
              border: "1px solid #e0e0e0",
              borderRadius: 1,
              bgcolor: "#f9f9f9",
            }}
          >
            <Typography variant="body1" fontWeight="medium" sx={{ fontSize: "0.8rem" }}> {/* Agregué fontSize más pequeño */}
              {pacienteData.impresionDiagnostica}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Botones de acción */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}>
        <Button
          variant="contained"
          startIcon={<ExportIcon />}
          onClick={handleExportPDF}
          sx={{
            background: "linear-gradient(45deg, #1A3C6D 30%, #274472 90%)",
            color: "white",
            fontWeight: "bold",
            fontSize: "0.75rem", // Agregué fontSize más pequeño
            px: 3,
            py: 1,
            borderRadius: 2,
            boxShadow: "0 3px 15px rgba(26, 60, 109, 0.25)",
            "&:hover": {
              background: "linear-gradient(45deg, #274472 30%, #1A3C6D 90%)",
              boxShadow: "0 5px 20px rgba(26, 60, 109, 0.4)",
              transform: "translateY(-2px)",
            },
            transition: "all 0.3s ease",
          }}
        >
          EXPORTAR PDF
        </Button>
      </Box>

      {/* Nota de pie */}
      <Box
        sx={{
          mt: 3,
          pt: 2,
          borderTop: "1px solid #e0e0e0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
      </Box>
    </Paper>
  );
}