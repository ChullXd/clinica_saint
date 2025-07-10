import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface HospitalizacionProps {
  patientData: number[];
  filledData: Record<number, any>;
  handleOpenDialog: (index: number) => void;
  calculateDays: (admissionDate: string, dischargeDate?: string) => number;
  setOpenReasignar: (open: boolean) => void;
  setReasignarForm: (form: any) => void;
}

const getHospitalizacionCamaLabel = (index: number) => {
  switch (index) {
    case 2:
      return "CAMA 3A";
    case 3:
      return "CAMA 3B";
    case 4:
      return "CAMA 3C";
    case 5:
      return "CAMA 4";
    case 6:
      return "CAMA 5A";
    case 7:
      return "CAMA 5B";
    case 8:
      return "CAMA 5C";
    case 9:
      return "CAMA 6";
    case 10:
      return "CAMA 7";
    case 11:
      return "CAMA 8";
    case 12:
      return "CAMA 9";
    case 13:
      return "CAMA 10";
    case 14:
      return "CAMA 11";
    case 15:
      return "CAMA 12";
    case 16:
      return "CAMA 13";
    case 17:
      return "CAMA 14";
    case 18:
      return "CAMA 15";
    default:
      return `CAMA ${index + 1}`;
  }
};

// Función para verificar si una cama es compartida (tiene letra)
const esCamaCompartida = (index: number) => {
  return [2, 3, 4, 6, 7, 8].includes(index); // 3A, 3B, 3C, 5A, 5B, 5C
};

// Renderizar una cama individual
const renderCama = (
  index: number,
  data: any,
  handleOpenDialog: (index: number) => void
) => (
  <Grid item xs={12} sm={6} md={4} lg={3} key={index} sx={{ maxWidth: 220 }}>
    {data ? (
      <Card className="camas-card" sx={{ minWidth: 180, maxWidth: 220 }}>
        <CardContent sx={{ padding: "10px" }}>
          <Box
            sx={{
              backgroundColor: "#E6F0FA",
              borderRadius: "8px",
              padding: "6px",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "#1A3C6D",
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >
              {getHospitalizacionCamaLabel(index)}
            </Typography>
            {/* Aquí iría el resto del contenido del paciente */}
            <Typography variant="body2" sx={{ mt: 1 }}>
              {data.pacienteNombre || "Paciente"}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {data.fechaIngreso || "Fecha ingreso"}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    ) : (
      <Card
        className="camas-card-empty"
        onClick={() => handleOpenDialog(index)}
        sx={{
          minWidth: 180,
          maxWidth: 220,
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#f5f5f5",
          },
        }}
      >
        <CardContent sx={{ padding: "10px", textAlign: "center" }}>
          <IconButton color="primary">
            <AddIcon />
          </IconButton>
          <Typography
            className="camas-card-empty-text"
            sx={{ fontSize: "0.9rem", mt: 1 }}
          >
            {getHospitalizacionCamaLabel(index)}
          </Typography>
        </CardContent>
      </Card>
    )}
  </Grid>
);

const Hospitalizacion: React.FC<HospitalizacionProps> = ({
  patientData,
  filledData,
  handleOpenDialog,
}) => {
  // Separar camas individuales y compartidas
  const camasIndividuales = patientData.filter(
    (index) => !esCamaCompartida(index)
  );
  const camasCompartidas = patientData.filter((index) =>
    esCamaCompartida(index)
  );

  // Agrupar camas compartidas por habitación
  const habitacionesCompartidas = [
    { nombre: "HABITACIÓN 3", camas: [2, 3, 4] }, // 3A, 3B, 3C
    { nombre: "HABITACIÓN 5", camas: [6, 7, 8] }, // 5A, 5B, 5C
  ];

  return (
    <Box>
      {/* SECCIÓN DE CAMAS INDIVIDUALES */}
      <Typography
        variant="h5"
        sx={{
          mb: 3,
          fontWeight: "bold",
          color: "#1A3C6D",
          textAlign: "center",
          borderBottom: "2px solid #1A3C6D",
          paddingBottom: 1,
        }}
      >
        CAMAS INDIVIDUALES
      </Typography>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        {camasIndividuales.map((index) =>
          renderCama(index, filledData[index], handleOpenDialog)
        )}
      </Grid>

      <Divider sx={{ my: 4, borderWidth: 2 }} />

      {/* SECCIÓN DE CAMAS COMPARTIDAS */}
      <Typography
        variant="h5"
        sx={{
          mb: 3,
          fontWeight: "bold",
          color: "#1A3C6D",
          textAlign: "center",
          borderBottom: "2px solid #1A3C6D",
          paddingBottom: 1,
        }}
      >
        HABITACIONES COMPARTIDAS
      </Typography>

      {habitacionesCompartidas.map((habitacion, idx) => (
        <Box key={idx} sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              fontWeight: "bold",
              color: "#4A90E2",
              textAlign: "center",
              backgroundColor: "#E6F0FA",
              padding: "8px",
              borderRadius: "8px",
            }}
          >
            {habitacion.nombre}
          </Typography>

          <Grid container spacing={2} justifyContent="center">
            {habitacion.camas.map((index) =>
              renderCama(index, filledData[index], handleOpenDialog)
            )}
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

export default Hospitalizacion;
