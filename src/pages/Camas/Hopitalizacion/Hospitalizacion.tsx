import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface HospitalizacionProps {
  patientData: number[];
  filledData: Record<number, any>;
  handleOpenDialog: (index: number) => void;
  calculateDays: (admissionDate: string, dischargeDate?: string) => number;
  setOpenReasignar: (open: boolean) => void; // NUEVO
  setReasignarForm: (form: any) => void; // NUEVO
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

const Hospitalizacion: React.FC<HospitalizacionProps> = ({
  patientData,
  filledData,
  handleOpenDialog,
}) => {
  const elements = [];
  let i = 0;
  while (i < patientData.length) {
    if (i === 2) {
      // Renderizar 3A, 3B, 3C en una fila
      elements.push(
        <Grid
          container
          spacing={2}
          key="fila-3A-3B-3C"
          sx={{ marginBottom: 2 }}
        >
          {[2, 3, 4].map((idx) => {
            const data = filledData[idx];
            return (
              <Grid item xs={12} sm={4} md={4} key={idx} sx={{ maxWidth: 220 }}>
                {data ? (
                  <Card
                    className="camas-card"
                    sx={{ minWidth: 180, maxWidth: 220 }}
                  >
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
                          {getHospitalizacionCamaLabel(idx)}
                        </Typography>
                        {/* ...resto del contenido del card... */}
                      </Box>
                    </CardContent>
                  </Card>
                ) : (
                  <Card
                    className="camas-card-empty"
                    onClick={() => handleOpenDialog(idx)}
                    sx={{ minWidth: 180, maxWidth: 220 }}
                  >
                    <CardContent sx={{ padding: "10px" }}>
                      <IconButton>
                        <AddIcon />
                      </IconButton>
                      <Typography
                        className="camas-card-empty-text"
                        sx={{ fontSize: "0.9rem" }}
                      >
                        {getHospitalizacionCamaLabel(idx)}
                      </Typography>
                    </CardContent>
                  </Card>
                )}
              </Grid>
            );
          })}
        </Grid>
      );
      i += 3; // Saltar los índices 2, 3, 4
    } else if (i === 6) {
      // Renderizar 5A, 5B, 5C en una fila
      elements.push(
        <Grid
          container
          spacing={2}
          key="fila-5A-5B-5C"
          sx={{ marginBottom: 2 }}
        >
          {[6, 7, 8].map((idx) => {
            const data = filledData[idx];
            return (
              <Grid item xs={12} sm={4} md={4} key={idx} sx={{ maxWidth: 220 }}>
                {data ? (
                  <Card
                    className="camas-card"
                    sx={{ minWidth: 180, maxWidth: 220 }}
                  >
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
                          {getHospitalizacionCamaLabel(idx)}
                        </Typography>
                        {/* ...resto del contenido del card... */}
                      </Box>
                    </CardContent>
                  </Card>
                ) : (
                  <Card
                    className="camas-card-empty"
                    onClick={() => handleOpenDialog(idx)}
                    sx={{ minWidth: 180, maxWidth: 220 }}
                  >
                    <CardContent sx={{ padding: "10px" }}>
                      <IconButton>
                        <AddIcon />
                      </IconButton>
                      <Typography
                        className="camas-card-empty-text"
                        sx={{ fontSize: "0.9rem" }}
                      >
                        {getHospitalizacionCamaLabel(idx)}
                      </Typography>
                    </CardContent>
                  </Card>
                )}
              </Grid>
            );
          })}
        </Grid>
      );
      i += 3; // Saltar los índices 6, 7, 8
    } else {
      const index = patientData[i];
      const data = filledData[index];
      elements.push(
        <Grid container key={index} sx={{ marginBottom: 2 }}>
          <Grid item xs={12} sx={{ maxWidth: 220 }}>
            {data ? (
              <Card
                className="camas-card"
                sx={{ minWidth: 180, maxWidth: 220 }}
              >
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
                  </Box>
                </CardContent>
              </Card>
            ) : (
              <Card
                className="camas-card-empty"
                onClick={() => handleOpenDialog(index)}
                sx={{ minWidth: 180, maxWidth: 220 }}
              >
                <CardContent sx={{ padding: "10px" }}>
                  <IconButton>
                    <AddIcon />
                  </IconButton>
                  <Typography
                    className="camas-card-empty-text"
                    sx={{ fontSize: "0.9rem" }}
                  >
                    {getHospitalizacionCamaLabel(index)}
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Grid>
        </Grid>
      );
      i += 1;
    }
  }

  return <Box>{elements}</Box>;
};

export default Hospitalizacion;
