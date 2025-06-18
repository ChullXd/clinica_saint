import React, { useState } from "react";
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
      <Grid container spacing={2} sx={{ marginBottom: 3 }}>
        {currentTabData.map((index) => {
          const data = filledData[index];
          return (
            <Grid item xs={12} sm={6} md={3} key={index}>
              {data ? (
                <Card className="camas-card">
                  <CardContent>
                    <img src={data.genderImage} alt="Paciente" />
                    <Typography className="camas-card-title">{data.name}</Typography>
                    <Typography className="camas-card-text">Cédula: {data.id}</Typography>
                    <Typography className="camas-card-text">
                      Ingreso: {data.admissionDate}
                    </Typography>
                    <Typography className="camas-card-text">
                      Salida: {data.dischargeDate}
                    </Typography>
                    <Button
                      className="camas-card-button"
                      onClick={() => handleOpenDialog(index)}
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
                  </CardContent>
                </Card>
              )}
            </Grid>
          );
        })}
      </Grid>
    );
  };

  return (
    <div className="camas-container">
      <div className="camas-inner-container">
        <Typography className="reservation-title">Gestión de Camas</Typography>
        <Box className="camas-tabs">
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            aria-label="camas tabs"
            centered
          >
            <Tab label="EMERGENCIA" />
            <Tab label="HOSPITALIZACIÓN" />
            <Tab label="POSTQUIRÚRGICO" />
            <Tab label="QUIRÓFANO" />
            <Tab label="NEONATOS" />
          </Tabs>
        </Box>
        <Box sx={{ padding: 2 }}>{getTabContent()}</Box>
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          TransitionProps={{ timeout: 500 }}
          maxWidth="sm"
          fullWidth
          className="camas-dialog"
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
          <DialogContent>
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
            />
          </DialogContent>
          <DialogActions>
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