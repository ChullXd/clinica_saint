import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Paper,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  Save as SaveIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  GetApp as ExportIcon,
  Timeline as TimelineIcon,
} from "@mui/icons-material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";

// Componente para el gráfico de signos vitales mejorado
const GraficoSignosVitales = ({
  pulso,
  temperatura,
  hora,
}: {
  pulso: number;
  temperatura: number;
  hora: string;
}) => {
  const [puntosPulso, setPuntosPulso] = useState<
    Array<{ x: number; y: number; hora: string; fecha: string }>
  >([]);
  const [puntosTemperatura, setPuntosTemperatura] = useState<
    Array<{ x: number; y: number; hora: string; fecha: string }>
  >([]);

  const agregarPunto = () => {
    if (pulso && temperatura && hora) {
      const fechaActual = new Date().toLocaleDateString('es-ES');
      const horaActual = new Date().toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
      
      // Calcular posición X basada en el número de puntos existentes
      // Cada punto se separa por una distancia fija para avanzar a la derecha
      const siguientePosicionPulso = puntosPulso.length * 50; // 50px de separación
      const siguientePosicionTemp = puntosTemperatura.length * 50; // 50px de separación

      // Agregar punto de pulso (círculo rojo)
      setPuntosPulso((prev) => [...prev, { 
        x: siguientePosicionPulso, 
        y: pulso, 
        hora: horaActual,
        fecha: fechaActual
      }]);

      // Agregar punto de temperatura (triángulo azul)
      setPuntosTemperatura((prev) => [
        ...prev,
        { 
          x: siguientePosicionTemp, 
          y: temperatura, 
          hora: horaActual,
          fecha: fechaActual
        },
      ]);
    }
  };

  const limpiarGrafico = () => {
    setPuntosPulso([]);
    setPuntosTemperatura([]);
  };

  // Componente SVG para triángulo
  const Triangulo = ({
    x,
    y,
    title,
  }: {
    x: string;
    y: string;
    title: string;
  }) => (
    <svg
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: "10px",
        height: "10px",
        transform: "translate(-50%, -50%)",
        zIndex: 15,
      }}
    >
      <title>{title}</title>
      <polygon
        points="5,1 9,8 1,8"
        fill="#0066cc"
        stroke="#003d7a"
        strokeWidth="1"
      />
    </svg>
  );

  return (
    <Card sx={{ mt: 2, mb: 2 }}>
      <CardContent>
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
              fontWeight: "bold",
              fontSize: "0.9rem" // Letras más pequeñas
            }}
          >
            GRÁFICO DE SIGNOS VITALES
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="contained"
              size="small"
              onClick={agregarPunto}
              startIcon={<TimelineIcon sx={{ fontSize: "0.8rem" }} />}
              sx={{
                background: "#1A3C6D",
                "&:hover": { background: "#274472" },
                fontSize: "0.7rem", // Letras más pequeñas
                px: 1,
                py: 0.5
              }}
            >
              AGREGAR PUNTO
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={limpiarGrafico}
              sx={{
                color: "#1A3C6D",
                borderColor: "#1A3C6D",
                "&:hover": { borderColor: "#274472", color: "#274472" },
                fontSize: "0.7rem", // Letras más pequeñas
                px: 1,
                py: 0.5
              }}
            >
              LIMPIAR
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            width: "100%",
            height: 400,
            border: "2px solid #000",
            background: "white",
            backgroundImage: `
              linear-gradient(to right, #ddd 1px, transparent 1px),
              linear-gradient(to bottom, #ddd 1px, transparent 1px)
            `,
            backgroundSize: "25px 20px", // Grilla más pequeña
            position: "relative",
            overflow: "auto", // Permitir scroll horizontal
          }}
        >
          {/* Escala Y izquierda (Pulso) - Rango 60-140 */}
          <Box
            sx={{
              position: "absolute",
              left: -35,
              top: 0,
              height: "100%",
              width: 35,
              backgroundColor: "#f5f5f5",
              borderRight: "2px solid #000",
              zIndex: 20,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                position: "absolute",
                top: -18,
                left: 2,
                fontWeight: "bold",
                color: "#cc0000",
                fontSize: "0.6rem", // Letras más pequeñas
              }}
            >
              PULSO
            </Typography>
            {Array.from({ length: 17 }, (_, i) => {
              const valor = 140 - i * 5;
              return (
                <Typography
                  key={i}
                  variant="caption"
                  sx={{
                    position: "absolute",
                    top: `${(i * 100) / 16}%`,
                    right: 2,
                    fontSize: "0.5rem", // Letras más pequeñas
                    color: "#cc0000",
                    fontWeight: "bold",
                  }}
                >
                  {valor}
                </Typography>
              );
            })}
          </Box>

          {/* Escala Y derecha (Temperatura) - Rango 35-42°C */}
          <Box
            sx={{
              position: "absolute",
              right: -35,
              top: 0,
              height: "100%",
              width: 35,
              backgroundColor: "#f5f5f5",
              borderLeft: "2px solid #000",
              zIndex: 20,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                position: "absolute",
                top: -18,
                right: 2,
                fontWeight: "bold",
                color: "#0066cc",
                fontSize: "0.6rem", // Letras más pequeñas
              }}
            >
              TEMP °C
            </Typography>
            {Array.from({ length: 15 }, (_, i) => {
              const valor = 42 - i * 0.5;
              return (
                <Typography
                  key={i}
                  variant="caption"
                  sx={{
                    position: "absolute",
                    top: `${(i * 100) / 14}%`,
                    left: 2,
                    fontSize: "0.5rem", // Letras más pequeñas
                    color: "#0066cc",
                    fontWeight: "bold",
                  }}
                >
                  {valor.toFixed(1)}
                </Typography>
              );
            })}
          </Box>

          {/* Líneas de referencia principales */}
          <svg
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 1,
            }}
          >
            {/* Líneas horizontales cada 20 puntos de pulso */}
            {[80, 100, 120].map((pulsoRef, index) => (
              <line
                key={`linea-pulso-${index}`}
                x1="0"
                y1={`${100 - ((pulsoRef - 60) / 80) * 100}%`}
                x2="100%"
                y2={`${100 - ((pulsoRef - 60) / 80) * 100}%`}
                stroke="#cc0000"
                strokeWidth="0.5"
                strokeDasharray="3,3"
                opacity="0.3"
              />
            ))}
            {/* Líneas horizontales temperatura normal */}
            {[37, 38, 39].map((tempRef, index) => (
              <line
                key={`linea-temp-${index}`}
                x1="0"
                y1={`${100 - ((tempRef - 35) / 7) * 100}%`}
                x2="100%"
                y2={`${100 - ((tempRef - 35) / 7) * 100}%`}
                stroke="#0066cc"
                strokeWidth="0.5"
                strokeDasharray="3,3"
                opacity="0.3"
              />
            ))}
          </svg>

          {/* Puntos de Pulso (círculos rojos) con fechas */}
          {puntosPulso.map((punto, index) => (
            <React.Fragment key={`pulso-${index}`}>
              {/* Círculo del pulso */}
              <Box
                sx={{
                  position: "absolute",
                  left: `${punto.x + 50}px`, // Offset inicial + posición
                  top: `${100 - ((punto.y - 60) / 80) * 100}%`,
                  width: 8,
                  height: 8,
                  backgroundColor: "#cc0000",
                  border: "1px solid #800000",
                  borderRadius: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 10,
                  cursor: "pointer",
                  "&:hover": {
                    transform: "translate(-50%, -50%) scale(1.3)",
                  },
                }}
                title={`Pulso: ${punto.y} lpm - ${punto.hora} - ${punto.fecha}`}
              />
              {/* Fecha debajo del punto */}
              <Typography
                sx={{
                  position: "absolute",
                  left: `${punto.x + 50}px`,
                  top: `${100 - ((punto.y - 60) / 80) * 100 + 8}%`,
                  transform: "translateX(-50%)",
                  fontSize: "0.5rem", // Letras más pequeñas
                  color: "#cc0000",
                  fontWeight: "bold",
                  backgroundColor: "rgba(255,255,255,0.8)",
                  padding: "1px 2px",
                  borderRadius: "2px",
                  zIndex: 12,
                  whiteSpace: "nowrap",
                }}
              >
                {punto.fecha}
              </Typography>
              {/* Hora debajo de la fecha */}
              <Typography
                sx={{
                  position: "absolute",
                  left: `${punto.x + 50}px`,
                  top: `${100 - ((punto.y - 60) / 80) * 100 + 15}%`,
                  transform: "translateX(-50%)",
                  fontSize: "0.45rem", // Letras más pequeñas
                  color: "#cc0000",
                  backgroundColor: "rgba(255,255,255,0.8)",
                  padding: "1px 2px",
                  borderRadius: "2px",
                  zIndex: 12,
                  whiteSpace: "nowrap",
                }}
              >
                {punto.hora}
              </Typography>
            </React.Fragment>
          ))}

          {/* Puntos de Temperatura (triángulos azules) con fechas */}
          {puntosTemperatura.map((punto, index) => (
            <React.Fragment key={`temp-${index}`}>
              {/* Triángulo de temperatura */}
              <Triangulo
                x={`${punto.x + 50}px`}
                y={`${100 - ((punto.y - 35) / 7) * 100}%`}
                title={`Temperatura: ${punto.y}°C - ${punto.hora} - ${punto.fecha}`}
              />
              {/* Fecha debajo del punto */}
              <Typography
                sx={{
                  position: "absolute",
                  left: `${punto.x + 50}px`,
                  top: `${100 - ((punto.y - 35) / 7) * 100 + 8}%`,
                  transform: "translateX(-50%)",
                  fontSize: "0.5rem", // Letras más pequeñas
                  color: "#0066cc",
                  fontWeight: "bold",
                  backgroundColor: "rgba(255,255,255,0.8)",
                  padding: "1px 2px",
                  borderRadius: "2px",
                  zIndex: 12,
                  whiteSpace: "nowrap",
                }}
              >
                {punto.fecha}
              </Typography>
              {/* Hora debajo de la fecha */}
              <Typography
                sx={{
                  position: "absolute",
                  left: `${punto.x + 50}px`,
                  top: `${100 - ((punto.y - 35) / 7) * 100 + 15}%`,
                  transform: "translateX(-50%)",
                  fontSize: "0.45rem", // Letras más pequeñas
                  color: "#0066cc",
                  backgroundColor: "rgba(255,255,255,0.8)",
                  padding: "1px 2px",
                  borderRadius: "2px",
                  zIndex: 12,
                  whiteSpace: "nowrap",
                }}
              >
                {punto.hora}
              </Typography>
            </React.Fragment>
          ))}

          {/* Líneas conectoras para Pulso */}
          {puntosPulso.length > 1 && (
            <svg
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 5,
              }}
            >
              {puntosPulso.slice(1).map((punto, index) => {
                const puntoAnterior = puntosPulso[index];
                return (
                  <line
                    key={`linea-pulso-${index}`}
                    x1={`${puntoAnterior.x + 50}px`}
                    y1={`${100 - ((puntoAnterior.y - 60) / 80) * 100}%`}
                    x2={`${punto.x + 50}px`}
                    y2={`${100 - ((punto.y - 60) / 80) * 100}%`}
                    stroke="#cc0000"
                    strokeWidth="2"
                    opacity="0.8"
                  />
                );
              })}
            </svg>
          )}

          {/* Líneas conectoras para Temperatura */}
          {puntosTemperatura.length > 1 && (
            <svg
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 5,
              }}
            >
              {puntosTemperatura.slice(1).map((punto, index) => {
                const puntoAnterior = puntosTemperatura[index];
                return (
                  <line
                    key={`linea-temp-${index}`}
                    x1={`${puntoAnterior.x + 50}px`}
                    y1={`${100 - ((puntoAnterior.y - 35) / 7) * 100}%`}
                    x2={`${punto.x + 50}px`}
                    y2={`${100 - ((punto.y - 35) / 7) * 100}%`}
                    stroke="#0066cc"
                    strokeWidth="2"
                    opacity="0.8"
                  />
                );
              })}
            </svg>
          )}
        </Box>

        {/* Leyenda mejorada */}
        <Box sx={{ display: "flex", gap: 3, mt: 2, justifyContent: "center", flexWrap: "wrap" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 8,
                height: 8,
                backgroundColor: "#cc0000",
                borderRadius: "50%",
                border: "1px solid #800000",
              }}
            />
            <Typography 
              variant="caption" 
              sx={{ 
                fontWeight: "bold",
                fontSize: "0.65rem" // Letras más pequeñas
              }}
            >
              PULSO (círculos rojos)
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <svg width="10" height="10">
              <polygon
                points="5,1 9,8 1,8"
                fill="#0066cc"
                stroke="#003d7a"
                strokeWidth="1"
              />
            </svg>
            <Typography 
              variant="caption" 
              sx={{ 
                fontWeight: "bold",
                fontSize: "0.65rem" // Letras más pequeñas
              }}
            >
              TEMPERATURA (triángulos azules)
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography
              variant="caption"
              sx={{ 
                fontWeight: "bold", 
                color: "#666",
                fontSize: "0.65rem" // Letras más pequeñas
              }}
            >
              Puntos: {puntosPulso.length + puntosTemperatura.length}
            </Typography>
          </Box>
        </Box>

        {/* Valores actuales */}
        <Box
          sx={{
            display: "flex",
            gap: 3,
            mt: 2,
            justifyContent: "center",
            p: 1.5,
            backgroundColor: "#f8f9fa",
            borderRadius: 1,
            flexWrap: "wrap",
          }}
        >
          <Typography
            variant="body2"
            sx={{ 
              fontWeight: "bold", 
              color: "#cc0000",
              fontSize: "0.7rem" // Letras más pequeñas
            }}
          >
            Pulso actual: {pulso} lpm
          </Typography>
          <Typography
            variant="body2"
            sx={{ 
              fontWeight: "bold", 
              color: "#0066cc",
              fontSize: "0.7rem" // Letras más pequeñas
            }}
          >
            Temperatura actual: {temperatura}°C
          </Typography>
          <Typography
            variant="body2"
            sx={{ 
              fontWeight: "bold", 
              color: "#666",
              fontSize: "0.7rem" // Letras más pequeñas
            }}
          >
            Hora: {hora}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

// Interfaces
interface ConstantesVitales {
  fecha: string;
  diaInternacion: number;
  diaPostQuirurgico: number;
  hora: string;
  pulso: number;
  temperatura: number;
  frecuenciaRespiratoria: number;
  pulsiometria: number;
  presionSistolica: number;
  presionDiastolica: number;
  responsable: string;
}

interface MedidasAntropometricas {
  peso: number;
  talla: number;
  perimetroCefalico: number;
  perimetroAbdominal: number;
  otros: string;
}

interface BalanceHidricoData {
  ingresos: {
    enteral: number;
    parenteral: number;
    viaOral: number;
    total: number;
  };
  eliminaciones: {
    orina: number;
    drenaje: number;
    vomito: number;
    diarreas: number;
    otros: string;
    total: number;
  };
  balanceTotal: number;
  dietaPrescrita: string;
  numeroComidas: number;
  numeroMicciones: number;
  numeroDeposiciones: number;
}

interface CuidadosGenerales {
  aseo: string;
  bano: string;
  reposo: string;
  posicion: string;
  otros: string;
}

interface DispositivosMedicos {
  viaCentral: string;
  viaPeripherica: string;
  sondaNasogastrica: string;
  sondaVesical: string;
  otros: string;
  responsable: string;
}

export default function BalanceHidrico() {
  // Estados
  const [numeroHistoria, setNumeroHistoria] = useState("");
  const [numeroArchivo, setNumeroArchivo] = useState("");
  const [numeroHoja, setNumeroHoja] = useState("");
  const [nombrePaciente, setNombrePaciente] = useState("");
  const [sexo, setSexo] = useState("");
  const [edad, setEdad] = useState("");
  const [tipoPaciente, setTipoPaciente] = useState("");

  const [constantesVitales, setConstantesVitales] = useState<ConstantesVitales>(
    {
      fecha: dayjs().format("YYYY-MM-DD"),
      diaInternacion: 1,
      diaPostQuirurgico: 0,
      hora: dayjs().format("HH:mm"),
      pulso: 80, // SIEMPRE EMPIEZA EN 80
      temperatura: 37.0, // SIEMPRE EMPIEZA EN 37
      frecuenciaRespiratoria: 0,
      pulsiometria: 0,
      presionSistolica: 0,
      presionDiastolica: 0,
      responsable: "Usuario Actual",
    }
  );

  const [medidasAntropometricas, setMedidasAntropometricas] =
    useState<MedidasAntropometricas>({
      peso: 0,
      talla: 0,
      perimetroCefalico: 0,
      perimetroAbdominal: 0,
      otros: "",
    });

  const [balanceHidrico, setBalanceHidrico] = useState<BalanceHidricoData>({
    ingresos: {
      enteral: 0,
      parenteral: 0,
      viaOral: 0,
      total: 0,
    },
    eliminaciones: {
      orina: 0,
      drenaje: 0,
      vomito: 0,
      diarreas: 0,
      otros: "",
      total: 0,
    },
    balanceTotal: 0,
    dietaPrescrita: "",
    numeroComidas: 0,
    numeroMicciones: 0,
    numeroDeposiciones: 0,
  });

  const [cuidadosGenerales, setCuidadosGenerales] = useState<CuidadosGenerales>(
    {
      aseo: "",
      bano: "",
      reposo: "",
      posicion: "",
      otros: "",
    }
  );

  const [dispositivosMedicos, setDispositivosMedicos] =
    useState<DispositivosMedicos>({
      viaCentral: "",
      viaPeripherica: "",
      sondaNasogastrica: "",
      sondaVesical: "",
      otros: "",
      responsable: "Usuario Actual",
    });

  const [expandedPanel, setExpandedPanel] = useState<string | false>(
    "constantes"
  );
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "warning" | "info",
  });
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [motivoEliminacion, setMotivoEliminacion] = useState("");

  // Efectos
  useEffect(() => {
    const totalIngresos =
      balanceHidrico.ingresos.enteral +
      balanceHidrico.ingresos.parenteral +
      balanceHidrico.ingresos.viaOral;
    const totalEliminaciones =
      balanceHidrico.eliminaciones.orina +
      balanceHidrico.eliminaciones.drenaje +
      balanceHidrico.eliminaciones.vomito +
      balanceHidrico.eliminaciones.diarreas;
    const balanceTotal = totalIngresos - totalEliminaciones;

    setBalanceHidrico((prev) => ({
      ...prev,
      ingresos: { ...prev.ingresos, total: totalIngresos },
      eliminaciones: { ...prev.eliminaciones, total: totalEliminaciones },
      balanceTotal: balanceTotal,
    }));
  }, [
    balanceHidrico.ingresos.enteral,
    balanceHidrico.ingresos.parenteral,
    balanceHidrico.ingresos.viaOral,
    balanceHidrico.eliminaciones.orina,
    balanceHidrico.eliminaciones.drenaje,
    balanceHidrico.eliminaciones.vomito,
    balanceHidrico.eliminaciones.diarreas,
  ]);

  // Funciones
  const buscarPaciente = () => {
    if (numeroHistoria === "9952") {
      setNombrePaciente("ALCIVAR VALERO GEOVANNY ULICES");
      setSexo("MASCULINO");
      setEdad("50 AÑOS");
      setTipoPaciente("SEGURO");
      setNumeroArchivo("2024-BH-001234");
    }
  };

  const handleAccordionChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedPanel(isExpanded ? panel : false);
    };

  const handleGuardar = () => {
    setSnackbar({
      open: true,
      message: "BALANCE HÍDRICO GUARDADO EXITOSAMENTE",
      severity: "success",
    });
  };

  const handleEditar = () => {
    setSnackbar({
      open: true,
      message: "MODO EDICIÓN ACTIVADO",
      severity: "info",
    });
  };

  const handleEliminar = () => {
    setOpenDeleteDialog(true);
  };

  const confirmarEliminacion = () => {
    if (motivoEliminacion.trim()) {
      setSnackbar({
        open: true,
        message: "BALANCE HÍDRICO ELIMINADO CORRECTAMENTE",
        severity: "success",
      });
      setOpenDeleteDialog(false);
      setMotivoEliminacion("");
    }
  };

  const handleExportar = () => {
    setSnackbar({
      open: true,
      message: "EXPORTANDO INFORME PDF...",
      severity: "info",
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper elevation={3} sx={{ p: 3, m: 2 }}>
        <Typography
          variant="h5"
          sx={{ mb: 3, fontWeight: "bold", color: "#1A3C6D" }}
        >
          BALANCE HÍDRICO
        </Typography>

        {/* Datos del Paciente */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              DATOS DEL PACIENTE
            </Typography>
            <Box sx={{ mb: 2 }}>
              {/* Primera fila */}
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
                <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 16.66%" } }}>
                  <TextField
                    label="H.C."
                    value={numeroHistoria}
                    onChange={(e) => setNumeroHistoria(e.target.value)}
                    size="small"
                    fullWidth
                  />
                </Box>
                <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 33.33%" } }}>
                  <TextField
                    label="NOMBRE DEL PACIENTE"
                    value={nombrePaciente}
                    disabled
                    size="small"
                    fullWidth
                  />
                </Box>
                <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 16.66%" } }}>
                  <TextField
                    label="ARCHIVO"
                    value={numeroArchivo}
                    disabled
                    size="small"
                    fullWidth
                  />
                </Box>
                <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 16.66%" } }}>
                  <TextField
                    label="No. HOJA"
                    value={numeroHoja}
                    onChange={(e) => setNumeroHoja(e.target.value)}
                    size="small"
                    fullWidth
                    type="number"
                  />
                </Box>
              </Box>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box>
              {/* Segunda fila */}
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 33.33%" } }}>
                  <TextField
                    label="SEXO"
                    value={sexo}
                    disabled
                    size="small"
                    fullWidth
                  />
                </Box>
                <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 33.33%" } }}>
                  <TextField
                    label="EDAD"
                    value={edad}
                    disabled
                    size="small"
                    fullWidth
                  />
                </Box>
                <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 33.33%" } }}>
                  <TextField
                    label="TIPO DE PACIENTE"
                    value={tipoPaciente}
                    disabled
                    size="small"
                    fullWidth
                  />
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Gráfico de Signos Vitales mejorado */}
        <GraficoSignosVitales
          pulso={constantesVitales.pulso}
          temperatura={constantesVitales.temperatura}
          hora={constantesVitales.hora}
        />

        {/* B. Constantes Vitales */}
        <Accordion
          expanded={expandedPanel === "constantes"}
          onChange={handleAccordionChange("constantes")}
          sx={{ mb: 2 }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ backgroundColor: "#e3eaf6", fontWeight: "bold" }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              B. CONSTANTES VITALES
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ mb: 2 }}>
              {/* Primera fila */}
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
                <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 25%" } }}>
                  <DatePicker
                    label="FECHA"
                    value={dayjs(constantesVitales.fecha)}
                    onChange={(newValue) =>
                      setConstantesVitales({
                        ...constantesVitales,
                        fecha: newValue?.format("YYYY-MM-DD") || "",
                      })
                    }
                    slotProps={{
                      textField: { size: "small", fullWidth: true },
                    }}
                  />
                </Box>
                <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 25%" } }}>
                  <TextField
                    label="DÍA INTERNACIÓN"
                    value={constantesVitales.diaInternacion}
                    disabled
                    size="small"
                    fullWidth
                    helperText="Calculado automáticamente"
                  />
                </Box>
                <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 25%" } }}>
                  <TextField
                    label="DÍA POST QUIRÚRGICO"
                    value={constantesVitales.diaPostQuirurgico}
                    disabled
                    size="small"
                    fullWidth
                    helperText="Calculado automáticamente"
                  />
                </Box>
                <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 25%" } }}>
                  <TimePicker
                    label="HORA"
                    value={dayjs(constantesVitales.hora, "HH:mm")}
                    onChange={(newValue) =>
                      setConstantesVitales({
                        ...constantesVitales,
                        hora: newValue?.format("HH:mm") || "",
                      })
                    }
                    slotProps={{
                      textField: { size: "small", fullWidth: true },
                    }}
                  />
                </Box>
              </Box>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box>
              {/* Segunda fila */}
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                <Box sx={{ flex: { xs: "1 1 50%", md: "1 1 16.66%" } }}>
                  <TextField
                    label="PULSO"
                    value={constantesVitales.pulso}
                    onChange={(e) =>
                      setConstantesVitales({
                        ...constantesVitales,
                        pulso: Number(e.target.value),
                      })
                    }
                    size="small"
                    fullWidth
                    type="number"
                    helperText="Empieza en 80"
                    InputProps={{
                      endAdornment: (
                        <span style={{ color: "#cc0000", fontWeight: "bold" }}>
                          ●
                        </span>
                      ),
                    }}
                  />
                </Box>
                <Box sx={{ flex: { xs: "1 1 50%", md: "1 1 16.66%" } }}>
                  <TextField
                    label="TEMPERATURA"
                    value={constantesVitales.temperatura}
                    onChange={(e) =>
                      setConstantesVitales({
                        ...constantesVitales,
                        temperatura: Number(e.target.value),
                      })
                    }
                    size="small"
                    fullWidth
                    type="number"
                    inputProps={{ step: 0.1 }}
                    helperText="Empieza en 37°C"
                    InputProps={{
                      endAdornment: (
                        <span style={{ color: "#0066cc", fontWeight: "bold" }}>
                          ▲
                        </span>
                      ),
                    }}
                  />
                </Box>
                <Box sx={{ flex: { xs: "1 1 50%", md: "1 1 16.66%" } }}>
                  <TextField
                    label="F. RESPIRATORIA XMIN"
                    value={constantesVitales.frecuenciaRespiratoria}
                    onChange={(e) =>
                      setConstantesVitales({
                        ...constantesVitales,
                        frecuenciaRespiratoria: Number(e.target.value),
                      })
                    }
                    size="small"
                    fullWidth
                    type="number"
                  />
                </Box>
                <Box sx={{ flex: { xs: "1 1 50%", md: "1 1 16.66%" } }}>
                  <TextField
                    label="PULSIOMETRÍA"
                    value={constantesVitales.pulsiometria}
                    onChange={(e) =>
                      setConstantesVitales({
                        ...constantesVitales,
                        pulsiometria: Number(e.target.value),
                      })
                    }
                    size="small"
                    fullWidth
                    type="number"
                  />
                </Box>
                <Box sx={{ flex: { xs: "1 1 50%", md: "1 1 16.66%" } }}>
                  <TextField
                    label="PRESIÓN SISTÓLICA"
                    value={constantesVitales.presionSistolica}
                    onChange={(e) =>
                      setConstantesVitales({
                        ...constantesVitales,
                        presionSistolica: Number(e.target.value),
                      })
                    }
                    size="small"
                    fullWidth
                    type="number"
                  />
                </Box>
                <Box sx={{ flex: { xs: "1 1 50%", md: "1 1 16.66%" } }}>
                  <TextField
                    label="PRESIÓN DIASTÓLICA"
                    value={constantesVitales.presionDiastolica}
                    onChange={(e) =>
                      setConstantesVitales({
                        ...constantesVitales,
                        presionDiastolica: Number(e.target.value),
                      })
                    }
                    size="small"
                    fullWidth
                    type="number"
                  />
                </Box>
              </Box>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box>
              {/* Tercera fila */}
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 50%" } }}>
                  <TextField
                    label="RESPONSABLE"
                    value={constantesVitales.responsable}
                    disabled
                    size="small"
                    fullWidth
                  />
                </Box>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* C. Medidas Antropométricas */}
        <Accordion
          expanded={expandedPanel === "medidas"}
          onChange={handleAccordionChange("medidas")}
          sx={{ mb: 2 }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ backgroundColor: "#e3eaf6", fontWeight: "bold" }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              C. MEDIDAS ANTROPOMÉTRICAS
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ mb: 2 }}>
              {/* Primera fila */}
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
                <Box sx={{ flex: { xs: "1 1 50%", md: "1 1 25%" } }}>
                  <TextField
                    label="PESO (KG)"
                    value={medidasAntropometricas.peso}
                    onChange={(e) =>
                      setMedidasAntropometricas({
                        ...medidasAntropometricas,
                        peso: Number(e.target.value),
                      })
                    }
                    size="small"
                    fullWidth
                    type="number"
                  />
                </Box>
                <Box sx={{ flex: { xs: "1 1 50%", md: "1 1 25%" } }}>
                  <TextField
                    label="TALLA (CM)"
                    value={medidasAntropometricas.talla}
                    onChange={(e) =>
                      setMedidasAntropometricas({
                        ...medidasAntropometricas,
                        talla: Number(e.target.value),
                      })
                    }
                    size="small"
                    fullWidth
                    type="number"
                  />
                </Box>
                <Box sx={{ flex: { xs: "1 1 50%", md: "1 1 25%" } }}>
                  <TextField
                    label="PERÍMETRO CEFÁLICO (CM)"
                    value={medidasAntropometricas.perimetroCefalico}
                    onChange={(e) =>
                      setMedidasAntropometricas({
                        ...medidasAntropometricas,
                        perimetroCefalico: Number(e.target.value),
                      })
                    }
                    size="small"
                    fullWidth
                    type="number"
                  />
                </Box>
                <Box sx={{ flex: { xs: "1 1 50%", md: "1 1 25%" } }}>
                  <TextField
                    label="PERÍMETRO ABDOMINAL (CM)"
                    value={medidasAntropometricas.perimetroAbdominal}
                    onChange={(e) =>
                      setMedidasAntropometricas({
                        ...medidasAntropometricas,
                        perimetroAbdominal: Number(e.target.value),
                      })
                    }
                    size="small"
                    fullWidth
                    type="number"
                  />
                </Box>
              </Box>
            </Box>
            <Box>
              {/* Segunda fila */}
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 100%" } }}>
                  <TextField
                    label="OTROS ESPECIFIQUE"
                    value={medidasAntropometricas.otros}
                    onChange={(e) =>
                      setMedidasAntropometricas({
                        ...medidasAntropometricas,
                        otros: e.target.value,
                      })
                    }
                    size="small"
                    fullWidth
                    multiline
                    rows={2}
                  />
                </Box>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* D. Balance Hídrico */}
        <Accordion
          expanded={expandedPanel === "balance"}
          onChange={handleAccordionChange("balance")}
          sx={{ mb: 2 }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ backgroundColor: "#e3eaf6", fontWeight: "bold" }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              D. INGESTA – ELIMINACIÓN/BALANCE HÍDRICO
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ mb: 3 }}>
              {/* Contenedor principal */}
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                {/* INGRESOS */}
                <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 50%" } }}>
                  <Box
                    sx={{ p: 2, backgroundColor: "#f8f9fa", borderRadius: 1 }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", mb: 2, color: "#1A3C6D" }}
                    >
                      INGRESOS (ML)
                    </Typography>
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                    >
                      <TextField
                        label="ENTERAL"
                        value={balanceHidrico.ingresos.enteral}
                        onChange={(e) =>
                          setBalanceHidrico({
                            ...balanceHidrico,
                            ingresos: {
                              ...balanceHidrico.ingresos,
                              enteral: Number(e.target.value),
                            },
                          })
                        }
                        size="small"
                        fullWidth
                        type="number"
                      />
                      <TextField
                        label="PARENTERAL"
                        value={balanceHidrico.ingresos.parenteral}
                        onChange={(e) =>
                          setBalanceHidrico({
                            ...balanceHidrico,
                            ingresos: {
                              ...balanceHidrico.ingresos,
                              parenteral: Number(e.target.value),
                            },
                          })
                        }
                        size="small"
                        fullWidth
                        type="number"
                      />
                      <TextField
                        label="VÍA ORAL"
                        value={balanceHidrico.ingresos.viaOral}
                        onChange={(e) =>
                          setBalanceHidrico({
                            ...balanceHidrico,
                            ingresos: {
                              ...balanceHidrico.ingresos,
                              viaOral: Number(e.target.value),
                            },
                          })
                        }
                        size="small"
                        fullWidth
                        type="number"
                      />
                      <TextField
                        label="TOTAL INGRESOS"
                        value={balanceHidrico.ingresos.total}
                        disabled
                        size="small"
                        fullWidth
                        sx={{
                          backgroundColor: "#e8f5e8",
                          "& .MuiInputBase-input": { fontWeight: "bold" },
                        }}
                      />
                    </Box>
                  </Box>
                </Box>

                {/* ELIMINACIONES */}
                <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 50%" } }}>
                  <Box
                    sx={{ p: 2, backgroundColor: "#fff8f0", borderRadius: 1 }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", mb: 2, color: "#1A3C6D" }}
                    >
                      ELIMINACIONES (ML)
                    </Typography>
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                    >
                      <Box sx={{ display: "flex", gap: 2 }}>
                        <TextField
                          label="ORINA"
                          value={balanceHidrico.eliminaciones.orina}
                          onChange={(e) =>
                            setBalanceHidrico({
                              ...balanceHidrico,
                              eliminaciones: {
                                ...balanceHidrico.eliminaciones,
                                orina: Number(e.target.value),
                              },
                            })
                          }
                          size="small"
                          fullWidth
                          type="number"
                        />
                        <TextField
                          label="DRENAJE"
                          value={balanceHidrico.eliminaciones.drenaje}
                          onChange={(e) =>
                            setBalanceHidrico({
                              ...balanceHidrico,
                              eliminaciones: {
                                ...balanceHidrico.eliminaciones,
                                drenaje: Number(e.target.value),
                              },
                            })
                          }
                          size="small"
                          fullWidth
                          type="number"
                        />
                      </Box>
                      <Box sx={{ display: "flex", gap: 2 }}>
                        <TextField
                          label="VÓMITO"
                          value={balanceHidrico.eliminaciones.vomito}
                          onChange={(e) =>
                            setBalanceHidrico({
                              ...balanceHidrico,
                              eliminaciones: {
                                ...balanceHidrico.eliminaciones,
                                vomito: Number(e.target.value),
                              },
                            })
                          }
                          size="small"
                          fullWidth
                          type="number"
                        />
                        <TextField
                          label="DIARREAS"
                          value={balanceHidrico.eliminaciones.diarreas}
                          onChange={(e) =>
                            setBalanceHidrico({
                              ...balanceHidrico,
                              eliminaciones: {
                                ...balanceHidrico.eliminaciones,
                                diarreas: Number(e.target.value),
                              },
                            })
                          }
                          size="small"
                          fullWidth
                          type="number"
                        />
                      </Box>
                      <TextField
                        label="OTROS ESPECIFIQUE"
                        value={balanceHidrico.eliminaciones.otros}
                        onChange={(e) =>
                          setBalanceHidrico({
                            ...balanceHidrico,
                            eliminaciones: {
                              ...balanceHidrico.eliminaciones,
                              otros: e.target.value,
                            },
                          })
                        }
                        size="small"
                        fullWidth
                      />
                      <TextField
                        label="TOTAL ELIMINACIONES"
                        value={balanceHidrico.eliminaciones.total}
                        disabled
                        size="small"
                        fullWidth
                        sx={{
                          backgroundColor: "#ffe8e8",
                          "& .MuiInputBase-input": { fontWeight: "bold" },
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* BALANCE TOTAL Y OTROS */}
            <Box sx={{ p: 2, backgroundColor: "#f0f8ff", borderRadius: 1 }}>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 33.33%" } }}>
                  <TextField
                    label="BALANCE HÍDRICO TOTAL (ML)"
                    value={balanceHidrico.balanceTotal}
                    disabled
                    size="small"
                    fullWidth
                    sx={{
                      backgroundColor: "#ffffff",
                      "& .MuiInputBase-input": {
                        fontWeight: "bold",
                        fontSize: "1.1rem",
                        color:
                          balanceHidrico.balanceTotal >= 0
                            ? "#4caf50"
                            : "#f44336",
                      },
                    }}
                  />
                </Box>
                <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 33.33%" } }}>
                  <TextField
                    label="DIETA PRESCRITA"
                    value={balanceHidrico.dietaPrescrita}
                    onChange={(e) =>
                      setBalanceHidrico({
                        ...balanceHidrico,
                        dietaPrescrita: e.target.value,
                      })
                    }
                    size="small"
                    fullWidth
                  />
                </Box>
                <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 33.33%" } }}>
                  <TextField
                    label="NÚMERO DE COMIDAS"
                    value={balanceHidrico.numeroComidas}
                    onChange={(e) =>
                      setBalanceHidrico({
                        ...balanceHidrico,
                        numeroComidas: Number(e.target.value),
                      })
                    }
                    size="small"
                    fullWidth
                    type="number"
                  />
                </Box>
                <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 50%" } }}>
                  <TextField
                    label="NÚMERO DE MICCIONES"
                    value={balanceHidrico.numeroMicciones}
                    onChange={(e) =>
                      setBalanceHidrico({
                        ...balanceHidrico,
                        numeroMicciones: Number(e.target.value),
                      })
                    }
                    size="small"
                    fullWidth
                    type="number"
                  />
                </Box>
                <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 50%" } }}>
                  <TextField
                    label="NÚMERO DE DEPOSICIONES"
                    value={balanceHidrico.numeroDeposiciones}
                    onChange={(e) =>
                      setBalanceHidrico({
                        ...balanceHidrico,
                        numeroDeposiciones: Number(e.target.value),
                      })
                    }
                    size="small"
                    fullWidth
                    type="number"
                  />
                </Box>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* E. Cuidados Generales */}
        <Accordion
          expanded={expandedPanel === "cuidados"}
          onChange={handleAccordionChange("cuidados")}
          sx={{ mb: 2 }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ backgroundColor: "#e3eaf6", fontWeight: "bold" }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              E. CUIDADOS GENERALES
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                <Box sx={{ flex: { xs: "1 1 50%", md: "1 1 16.66%" } }}>
                  <FormControl size="small" fullWidth>
                    <InputLabel>ASEO</InputLabel>
                    <Select
                      value={cuidadosGenerales.aseo}
                      label="ASEO"
                      onChange={(e) =>
                        setCuidadosGenerales({
                          ...cuidadosGenerales,
                          aseo: e.target.value,
                        })
                      }
                    >
                      <MenuItem value="SI">SI</MenuItem>
                      <MenuItem value="NO">NO</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ flex: { xs: "1 1 50%", md: "1 1 16.66%" } }}>
                  <FormControl size="small" fullWidth>
                    <InputLabel>BAÑO</InputLabel>
                    <Select
                      value={cuidadosGenerales.bano}
                      label="BAÑO"
                      onChange={(e) =>
                        setCuidadosGenerales({
                          ...cuidadosGenerales,
                          bano: e.target.value,
                        })
                      }
                    >
                      <MenuItem value="SI">SI</MenuItem>
                      <MenuItem value="NO">NO</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ flex: { xs: "1 1 50%", md: "1 1 16.66%" } }}>
                  <FormControl size="small" fullWidth>
                    <InputLabel>REPOSO</InputLabel>
                    <Select
                      value={cuidadosGenerales.reposo}
                      label="REPOSO"
                      onChange={(e) =>
                        setCuidadosGenerales({
                          ...cuidadosGenerales,
                          reposo: e.target.value,
                        })
                      }
                    >
                      <MenuItem value="SI">SI</MenuItem>
                      <MenuItem value="NO">NO</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ flex: { xs: "1 1 50%", md: "1 1 25%" } }}>
                  <TextField
                    label="POSICIÓN ESPECIFIQUE"
                    value={cuidadosGenerales.posicion}
                    onChange={(e) =>
                      setCuidadosGenerales({
                        ...cuidadosGenerales,
                        posicion: e.target.value,
                      })
                    }
                    size="small"
                    fullWidth
                  />
                </Box>
                <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 25%" } }}>
                  <TextField
                    label="OTROS ESPECIFIQUE"
                    value={cuidadosGenerales.otros}
                    onChange={(e) =>
                      setCuidadosGenerales({
                        ...cuidadosGenerales,
                        otros: e.target.value,
                      })
                    }
                    size="small"
                    fullWidth
                  />
                </Box>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* F. Dispositivos Médicos */}
        <Accordion
          expanded={expandedPanel === "dispositivos"}
          onChange={handleAccordionChange("dispositivos")}
          sx={{ mb: 2 }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ backgroundColor: "#e3eaf6", fontWeight: "bold" }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              F. FECHA DE COLOCACIÓN DE DISPOSITIVOS MÉDICOS
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
                <Box sx={{ flex: { xs: "1 1 50%", md: "1 1 25%" } }}>
                  <TextField
                    label="VÍA CENTRAL"
                    type="date"
                    value={dispositivosMedicos.viaCentral}
                    onChange={(e) =>
                      setDispositivosMedicos({
                        ...dispositivosMedicos,
                        viaCentral: e.target.value,
                      })
                    }
                    size="small"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                </Box>
                <Box sx={{ flex: { xs: "1 1 50%", md: "1 1 25%" } }}>
                  <TextField
                    label="VÍA PERIFÉRICA"
                    type="date"
                    value={dispositivosMedicos.viaPeripherica}
                    onChange={(e) =>
                      setDispositivosMedicos({
                        ...dispositivosMedicos,
                        viaPeripherica: e.target.value,
                      })
                    }
                    size="small"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                </Box>
                <Box sx={{ flex: { xs: "1 1 50%", md: "1 1 25%" } }}>
                  <TextField
                    label="SONDA NASOGÁSTRICA"
                    type="date"
                    value={dispositivosMedicos.sondaNasogastrica}
                    onChange={(e) =>
                      setDispositivosMedicos({
                        ...dispositivosMedicos,
                        sondaNasogastrica: e.target.value,
                      })
                    }
                    size="small"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                </Box>
                <Box sx={{ flex: { xs: "1 1 50%", md: "1 1 25%" } }}>
                  <TextField
                    label="SONDA VESICAL"
                    type="date"
                    value={dispositivosMedicos.sondaVesical}
                    onChange={(e) =>
                      setDispositivosMedicos({
                        ...dispositivosMedicos,
                        sondaVesical: e.target.value,
                      })
                    }
                    size="small"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                </Box>
              </Box>
            </Box>
            <Box>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 66.66%" } }}>
                  <TextField
                    label="OTROS ESPECIFIQUE"
                    value={dispositivosMedicos.otros}
                    onChange={(e) =>
                      setDispositivosMedicos({
                        ...dispositivosMedicos,
                        otros: e.target.value,
                      })
                    }
                    size="small"
                    fullWidth
                  />
                </Box>
                <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 33.33%" } }}>
                  <TextField
                    label="RESPONSABLE"
                    value={dispositivosMedicos.responsable}
                    disabled
                    size="small"
                    fullWidth
                  />
                </Box>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Botones */}
        <Box sx={{ display: "flex", gap: 2, mt: 3, flexWrap: "wrap" }}>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleGuardar}
            sx={{ background: "#1A3C6D", "&:hover": { background: "#274472" } }}
          >
            GUARDAR
          </Button>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={handleEditar}
            sx={{ background: "#1A3C6D", "&:hover": { background: "#274472" } }}
          >
            EDITAR
          </Button>
          <Button
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={handleEliminar}
            sx={{ background: "#1A3C6D", "&:hover": { background: "#274472" } }}
          >
            ELIMINAR
          </Button>
          <Button
            variant="contained"
            startIcon={<ExportIcon />}
            onClick={handleExportar}
            sx={{ background: "#1A3C6D", "&:hover": { background: "#274472" } }}
          >
            EXPORTAR INFORME
          </Button>
        </Box>

        {/* Diálogos y Snackbars */}
        <Dialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>CONFIRMAR ELIMINACIÓN</DialogTitle>
          <DialogContent>
            <Typography sx={{ mb: 2 }}>
              ¿ESTÁ SEGURO DE ELIMINAR ESTE BALANCE HÍDRICO?
            </Typography>
            <TextField
              label="MOTIVO DE LA ELIMINACIÓN"
              value={motivoEliminacion}
              onChange={(e) => setMotivoEliminacion(e.target.value)}
              multiline
              rows={3}
              fullWidth
              required
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setOpenDeleteDialog(false)}
              color="secondary"
            >
              CANCELAR
            </Button>
            <Button
              onClick={confirmarEliminacion}
              color="error"
              variant="contained"
              disabled={!motivoEliminacion.trim()}
            >
              ELIMINAR
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Paper>
    </LocalizationProvider>
  );
}
