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
          <FormIcon sx={{ fontSize: 36, color: "#1A3C6D", mr: 2 }} />
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "#1A3C6D",
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
              sx={{ color: "#1A3C6D", fontWeight: "bold" }}
            >
              DATOS DEL PACIENTE
            </Typography>
            <Tooltip title="Datos obtenidos del registro de admisión">
              <IconButton size="small">
                <InfoIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 1 }}>
                <Typography variant="caption" sx={{ color: "#666" }}>
                  N° HISTORIA CLÍNICA:
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  {pacienteData.numeroHistoria}
                </Typography>
              </Box>

              <Box sx={{ mb: 1 }}>
                <Typography variant="caption" sx={{ color: "#666" }}>
                  APELLIDOS:
                </Typography>
                <Typography variant="body1">
                  {pacienteData.apellidos}
                </Typography>
              </Box>

              <Box sx={{ mb: 1 }}>
                <Typography variant="caption" sx={{ color: "#666" }}>
                  NOMBRES:
                </Typography>
                <Typography variant="body1">{pacienteData.nombres}</Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 1 }}>
                <Typography variant="caption" sx={{ color: "#666" }}>
                  SEXO / EDAD:
                </Typography>
                <Typography variant="body1">
                  {pacienteData.sexo} / {pacienteData.edad}
                </Typography>
              </Box>

              <Box sx={{ mb: 1 }}>
                <Typography variant="caption" sx={{ color: "#666" }}>
                  FECHA DE NACIMIENTO:
                </Typography>
                <Typography variant="body1">
                  {pacienteData.fechaNacimiento}
                </Typography>
              </Box>

              <Box sx={{ mb: 1 }}>
                <Typography variant="caption" sx={{ color: "#666" }}>
                  CÉDULA / NACIONALIDAD:
                </Typography>
                <Typography variant="body1">
                  {pacienteData.cedula} / {pacienteData.nacionalidad}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            <HistoryIcon fontSize="small" sx={{ mr: 1, color: "#1A3C6D" }} />
            <Typography variant="body2">
              <strong>Admisión:</strong> {pacienteData.fechaAdmision} -{" "}
              {pacienteData.horaAdmision}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Motivo de Consulta y Enfermedad Actual */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 2 }}>
          <Typography
            variant="h6"
            sx={{ color: "#1A3C6D", fontWeight: "bold", mb: 2 }}
          >
            MOTIVO DE CONSULTA Y ENFERMEDAD ACTUAL
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ color: "#1A3C6D" }}>
              MOTIVO DE CONSULTA:
            </Typography>
            <Typography variant="body1" sx={{ mt: 0.5 }}>
              {pacienteData.motivoConsulta}
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ color: "#1A3C6D" }}>
              ENFERMEDAD ACTUAL:
            </Typography>
            <Typography variant="body1" sx={{ mt: 0.5 }}>
              {pacienteData.enfermedadActual}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Antecedentes */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 2 }}>
          <Typography
            variant="h6"
            sx={{ color: "#1A3C6D", fontWeight: "bold", mb: 2 }}
          >
            ANTECEDENTES
          </Typography>

          <TableContainer>
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell
                    component="th"
                    sx={{
                      width: "30%",
                      fontWeight: "bold",
                      border: "1px solid #eee",
                    }}
                  >
                    PERSONALES:
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #eee" }}>
                    {pacienteData.antecedentes.personales}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    sx={{ fontWeight: "bold", border: "1px solid #eee" }}
                  >
                    FAMILIARES:
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #eee" }}>
                    {pacienteData.antecedentes.familiares}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    sx={{ fontWeight: "bold", border: "1px solid #eee" }}
                  >
                    QUIRÚRGICOS:
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #eee" }}>
                    {pacienteData.antecedentes.quirurgicos}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    sx={{ fontWeight: "bold", border: "1px solid #eee" }}
                  >
                    ALÉRGICOS:
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #eee" }}>
                    {pacienteData.antecedentes.alergicos}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    sx={{ fontWeight: "bold", border: "1px solid #eee" }}
                  >
                    HÁBITOS:
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #eee" }}>
                    {pacienteData.antecedentes.habitos}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Revisión de Sistemas y Signos Vitales */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={7}>
          <Card sx={{ height: "100%" }}>
            <CardContent sx={{ p: 2, height: "100%" }}>
              <Typography
                variant="h6"
                sx={{ color: "#1A3C6D", fontWeight: "bold", mb: 2 }}
              >
                REVISIÓN DE SISTEMAS
              </Typography>

              <TableContainer>
                <Table size="small">
                  <TableBody>
                    {Object.entries(pacienteData.revisionSistemas).map(
                      ([sistema, valor]) => (
                        <TableRow key={sistema}>
                          <TableCell
                            component="th"
                            sx={{
                              width: "40%",
                              fontWeight: "bold",
                              border: "1px solid #eee",
                            }}
                          >
                            {sistema.toUpperCase()}:
                          </TableCell>
                          <TableCell sx={{ border: "1px solid #eee" }}>
                            {valor}
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={5}>
          <Card sx={{ height: "100%" }}>
            <CardContent sx={{ p: 2, height: "100%" }}>
              <Typography
                variant="h6"
                sx={{ color: "#1A3C6D", fontWeight: "bold", mb: 2 }}
              >
                SIGNOS VITALES
              </Typography>

              <Stack spacing={1}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2" fontWeight="bold">
                    Presión Arterial:
                  </Typography>
                  <Typography variant="body2">
                    {pacienteData.signosVitales.presion}
                  </Typography>
                </Box>
                <Divider />

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2" fontWeight="bold">
                    Frecuencia Cardíaca:
                  </Typography>
                  <Typography variant="body2">
                    {pacienteData.signosVitales.frecuenciaCardiaca}
                  </Typography>
                </Box>
                <Divider />

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2" fontWeight="bold">
                    Frecuencia Respiratoria:
                  </Typography>
                  <Typography variant="body2">
                    {pacienteData.signosVitales.frecuenciaRespiratoria}
                  </Typography>
                </Box>
                <Divider />

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2" fontWeight="bold">
                    Temperatura:
                  </Typography>
                  <Typography variant="body2">
                    {pacienteData.signosVitales.temperatura}
                  </Typography>
                </Box>
                <Divider />

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2" fontWeight="bold">
                    Saturación O2:
                  </Typography>
                  <Typography variant="body2">
                    {pacienteData.signosVitales.saturacion}
                  </Typography>
                </Box>
                <Divider />

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2" fontWeight="bold">
                    Peso / Talla:
                  </Typography>
                  <Typography variant="body2">
                    {pacienteData.signosVitales.peso} /{" "}
                    {pacienteData.signosVitales.talla}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Impresión Diagnóstica */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 2 }}>
          <Typography
            variant="h6"
            sx={{ color: "#1A3C6D", fontWeight: "bold", mb: 2 }}
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
            <Typography variant="body1" fontWeight="medium">
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
