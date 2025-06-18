import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  RadioGroup,
  FormControlLabel,
  Radio,
  Card,
  CardContent,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PacienteHombre from "/Clinica_Saint/clinica_saint/src/assets/png/PacienteHombre.png";
import PacienteMujer from "/Clinica_Saint/clinica_saint/src/assets/png/PacienteMujer.png";
import AltaMedica from "/Clinica_Saint/clinica_saint/src/assets/png/AltaMedica.png";
import HistoriaClinica from "/Clinica_Saint/clinica_saint/src/assets/png/HistoriaClinica.png";
import Enfermeria from "/Clinica_Saint/clinica_saint/src/assets/png/Enfermeria.png";
import CertificadoMedico from "/Clinica_Saint/clinica_saint/src/assets/png/CertificadoMedico.png";
import CargaInsumos from "/Clinica_Saint/clinica_saint/src/assets/png/CargaInsumos.png";
import "./Camas.css";

const Camas: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    sex: "",
    admissionDate: "",
    dischargeDate: "",
  });
  const [patientData, setPatientData] = useState<number[][]>([
    [0, 1, 2, 3], // EMERGENCIA
    [4, 5, 6, 7], // HOSPITALIZACIÓN
    [8, 9, 10, 11], // POSTQUIRÚRGICO
    [12, 13, 14, 15], // QUIRÓFANO
    [16, 17, 18, 19], // NEONATOS
  ]);
  const [filledData, setFilledData] = useState<
    Record<
      number,
      {
        name: string;
        id: string;
        genderImage: string;
        admissionDate: string;
        dischargeDate: string;
      }
    >
  >({});

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleOpenDialog = (index: number) => {
    setSelectedCard(index);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCard(null);
    setFormData({
      name: "",
      id: "",
      sex: "",
      admissionDate: "",
      dischargeDate: "",
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, sex: e.target.value }));
  };

  const handleSave = () => {
    if (selectedCard !== null) {
      const genderImage =
        formData.sex === "Femenino" ? PacienteMujer : PacienteHombre;
      setFilledData((prev) => ({
        ...prev,
        [selectedCard]: {
          name: formData.name,
          id: formData.id,
          genderImage,
          admissionDate: formData.admissionDate,
          dischargeDate: formData.dischargeDate,
        },
      }));
      handleCloseDialog();
    }
  };

  const getTabContent = () => {
    const currentTabData = patientData[selectedTab];
    return (
      <Grid container spacing={2} sx={{ marginBottom: 3, paddingLeft: 0 }}>
        {currentTabData.map((index) => {
          const data = filledData[index];
          return (
            <Grid item xs={12} sm={6} md={3} key={index}>
              {data ? (
                <Card className="camas-card">
                  <CardContent>
                    <Box
                      sx={{
                        backgroundColor: "#E6F0FA",
                        borderRadius: "8px",
                        padding: "10px",
                        textAlign: "center",
                      }}
                    >
                      <Typography variant="h6" sx={{ color: "#1A3C6D", fontWeight: "bold" }}>
                        CAMA {index + 1}
                      </Typography>
                      <img
                        src={data.genderImage === PacienteHombre ? PacienteHombre : PacienteMujer}
                        alt="Paciente"
                        style={{ width: "100px", height: "100px", margin: "10px auto", borderRadius: "50%", border: "2px solid #FFFFFF" }}
                      />
                      <Typography sx={{ fontSize: "1.1rem", fontWeight: "600", color: "#1A3C6D" }}>
                        {data.name}
                      </Typography>
                      <Typography sx={{ fontSize: "0.9rem", color: "#4A4A4A" }}>
                        H.C. {data.id}
                      </Typography>
                      <Typography sx={{ fontSize: "0.9rem", color: "#4A4A4A" }}>
                        Fecha de Ingreso: {data.admissionDate}
                      </Typography>
                      <Typography sx={{ fontSize: "0.9rem", color: "#4A4A4A" }}>
                        {calculateDays(data.admissionDate)} días de estadía
                      </Typography>
                      <Box sx={{ display: "flex", justifyContent: "space-around", marginTop: "10px" }}>
                        <IconButton>
                          <img src={HistoriaClinica} alt="Historia Clínica" style={{ width: "24px", height: "24px" }} />
                        </IconButton>
                        <IconButton>
                          <img src={Enfermeria} alt="Enfermería" style={{ width: "24px", height: "24px" }} />
                        </IconButton>
                        <IconButton>
                          <img src={AltaMedica} alt="Alta Médica" style={{ width: "24px", height: "24px" }} />
                        </IconButton>
                        <IconButton>
                          <img src={CertificadoMedico} alt="Certificado Médico" style={{ width: "24px", height: "24px" }} />
                        </IconButton>
                      </Box>
                    </Box>
                    <Button
                      className="camas-card-button"
                      onClick={() => handleOpenDialog(index)}
                      sx={{ marginTop: "10px", width: "100%" }}
                    >
                      Editar
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card className="camas-card-empty" onClick={() => handleOpenDialog(index)}>
                  <CardContent>
                    <IconButton>
                      <AddIcon />
                    </IconButton>
                    <Typography className="camas-card-empty-text">
                      Agregar Paciente
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </Grid>
          );
        })}
      </Grid>
    );
  };

  // Función auxiliar para calcular días de estadía
  const calculateDays = (admissionDate: string) => {
    const start = new Date(admissionDate);
    const today = new Date("2025-06-18T11:48:00-05:00"); // 11:48 AM -05, June 18, 2025
    const diffTime = Math.abs(today.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="camas-container">
      <div className="camas-inner-container">
        <Box sx={{ borderBottom: 1, borderColor: "divider", margin: 0, padding: 0 }}>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            aria-label="camas tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="EMERGENCIA" />
            <Tab label="HOSPITALIZACIÓN" />
            <Tab label="POSTQUIRÚRGICO" />
            <Tab label="QUIRÓFANO" />
            <Tab label="NEONATOS" />
          </Tabs>
        </Box>
        <Box sx={{ padding: 2, margin: 0 }}>{getTabContent()}</Box>
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          TransitionProps={{ timeout: 500 }}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle
            sx={{
              backgroundColor: "#1A3C6D",
              color: "#FFFFFF",
              textAlign: "center",
            }}
          >
            Agregar Paciente
          </DialogTitle>
          <DialogContent sx={{ padding: "20px", backgroundColor: "#F5F5F5" }}>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Nombre"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.name}
              onChange={handleInputChange}
              sx={{
                marginBottom: "15px",
                backgroundColor: "#FFFFFF",
                borderRadius: "4px",
              }}
            />
            <TextField
              margin="dense"
              name="id"
              label="Cédula"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.id}
              onChange={handleInputChange}
              sx={{
                marginBottom: "15px",
                backgroundColor: "#FFFFFF",
                borderRadius: "4px",
              }}
            />
            <RadioGroup
              name="sex"
              value={formData.sex}
              onChange={handleSexChange}
              row
              sx={{ marginBottom: "15px", justifyContent: "center" }}
            >
              <FormControlLabel
                value="Masculino"
                control={<Radio sx={{ color: "#1A3C6D" }} />}
                label="Masculino"
                sx={{ marginRight: "20px" }}
              />
              <FormControlLabel
                value="Femenino"
                control={<Radio sx={{ color: "#1A3C6D" }} />}
                label="Femenino"
              />
            </RadioGroup>
            <TextField
              margin="dense"
              name="admissionDate"
              label="Fecha de Ingreso"
              type="date"
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              value={formData.admissionDate}
              onChange={handleInputChange}
              sx={{
                marginBottom: "15px",
                backgroundColor: "#FFFFFF",
                borderRadius: "4px",
              }}
            />
            <TextField
              margin="dense"
              name="dischargeDate"
              label="Fecha de Salida"
              type="date"
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              value={formData.dischargeDate}
              onChange={handleInputChange}
              sx={{ backgroundColor: "#FFFFFF", borderRadius: "4px" }}
            />
          </DialogContent>
          <DialogActions sx={{ padding: "20px", backgroundColor: "#F5F5F5" }}>
            <Button onClick={handleCloseDialog} sx={{ color: "#1A3C6D" }}>
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              disabled={
                !formData.name ||
                !formData.id ||
                !formData.sex ||
                !formData.admissionDate ||
                !formData.dischargeDate
              }
              sx={{
                color: "#FFFFFF",
                backgroundColor: "#1A3C6D",
                "&:hover": { backgroundColor: "#153e6e" },
              }}
            >
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Camas;