import React, { useState } from "react";
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Button,
  Grid,
  IconButton,
  Card,
  CardContent,
  SelectChangeEvent,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PacienteHombre from "/Clinica_Saint/clinica_saint/src/assets/png/PacienteHombre.png";
import PacienteMujer from "/Clinica_Saint/clinica_saint/src/assets/png/PacienteMujer.png";
import AltaMedica from "/Clinica_Saint/clinica_saint/src/assets/png/AltaMedica.png";
import HistoriaClinica from "/Clinica_Saint/clinica_saint/src/assets/png/HistoriaClinica.png";
import Enfermeria from "/Clinica_Saint/clinica_saint/src/assets/png/Enfermeria.png";
import ServiciosInternos from "/Clinica_Saint/clinica_saint/src/assets/png/ServiciosInternos.png";
import CargaInsumos from "/Clinica_Saint/clinica_saint/src/assets/png/CargaInsumos.png";
import OrdenExamen from "/Clinica_Saint/clinica_saint/src/assets/png/OrdenExamen.png";
import Reasignacion from "/Clinica_Saint/clinica_saint/src/assets/png/Reasignacion.png";
import "./Camas.css";
import Hospitalizacion from "./Hopitalizacion/Hospitalizacion";
import IngresoPaciente from "./IngresoPaciente";
import ReasignacionCama from "./ReasignacionCama";

const Camas: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    sala: "EMERGENCIA",
    cama: "",
    name: "",
    id: "",
    sex: "",
    admissionDate: "",
    dischargeDate: "",
    medicoTratante: { medico: false, clinica: false },
    medicoCirujano: { medico: false, clinica: false },
    medicoAnestesiologo: "",
    procedencia: "",
    cuadroClinico: "",
  });
  const [patientData, setPatientData] = useState<number[][]>([
    Array.from({ length: 5 }, (_, i) => i), // HOSPITALIZACIÓN (15 camas)
    Array.from({ length: 19 }, (_, i) => i), // HOSPITALIZACIÓN (15 camas)
    Array.from({ length: 9 }, (_, i) => i), // POSTQUIRÚRGICO (9 camas)
    Array.from({ length: 4 }, (_, i) => i), // POSTQUIRÚRGICO (4 camas)
    Array.from({ length: 3 }, (_, i) => i), // POSTQUIRÚRGICO (4 camas)
  ]);
  const [filledData, setFilledData] = useState<
    Record<
      number,
      Record<
        number,
        {
          sala: string;
          cama: string;
          name: string;
          id: string;
          sex: string;
          genderImage: string;
          admissionDate: string;
          dischargeDate: string;
          medicoTratante: { medico: boolean; clinica: boolean };
          medicoCirujano: { medico: boolean; clinica: boolean };
          medicoAnestesiologo: string;
          procedencia: string;
          cuadroClinico: string;
        }
      >
    >
  >({ 0: {}, 1: {}, 2: {}, 3: {}, 4: {} });

  const [openReasignar, setOpenReasignar] = useState(false);
  const [reasignarForm, setReasignarForm] = useState({
    sala: "",
    cama: "",
    procedencia: "",
    resumen: "",
  });

  const camasDisponibles = {
    EMERGENCIA: [
      { value: "1", label: "CAMA 1" },
      { value: "2", label: "CAMA 2" },
    ],
    HOSPITALIZACIÓN: [
      { value: "3A", label: "CAMA 3A" },
      { value: "3B", label: "CAMA 3B" },
    ],
    POSTOPERATORIO: [{ value: "1", label: "CAMA 1" }],
    QUIROFANO: [{ value: "Q1", label: "CAMA Q1" }],
  };

  const salas = [
    "EMERGENCIA",
    "HOSPITALIZACIÓN",
    "POSTOPERATORIO",
    "QUIROFANO",
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleOpenDialog = (index: number) => {
    if (selectedTab !== 0) {
      alert("Solo se pueden agregar pacientes en EMERGENCIA.");
      return;
    }
    setSelectedCard(index);
    setFormData((prev) => ({ ...prev, cama: `Cama ${index + 1}` }));
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCard(null);
    setFormData({
      sala: "EMERGENCIA",
      cama: "",
      name: "",
      id: "",
      sex: "",
      admissionDate: "",
      dischargeDate: "",
      medicoTratante: { medico: false, clinica: false },
      medicoCirujano: { medico: false, clinica: false },
      medicoAnestesiologo: "",
      procedencia: "",
      cuadroClinico: "",
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }
    >
  ) => {
    const { name, value } = e.target;
    const upperCaseFields = [
      "name",
      "id",
      "medicoAnestesiologo",
      "procedencia",
      "cuadroClinico",
    ];
    setFormData((prev) => ({
      ...prev,
      [name as string]:
        upperCaseFields.includes(name as string) && typeof value === "string"
          ? value.toUpperCase()
          : value,
    }));
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "medicoTratante" | "medicoCirujano"
  ) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [field]: { ...prev[field], [name]: checked },
    }));
  };

  const handleSave = () => {
    if (selectedCard !== null && selectedTab === 0) {
      if (!formData.sex) {
        alert("Por favor seleccione el sexo del paciente");
        return;
      }
      const genderImage =
        formData.sex === "Masculino"
          ? PacienteHombre
          : formData.sex === "Femenino"
          ? PacienteMujer
          : PacienteHombre;
      setFilledData((prev) => ({
        ...prev,
        [selectedTab]: {
          ...prev[selectedTab],
          [selectedCard]: {
            sala: formData.sala,
            cama: formData.cama,
            name: formData.name,
            id: formData.id,
            sex: formData.sex,
            genderImage,
            admissionDate: formData.admissionDate,
            dischargeDate: formData.dischargeDate,
            medicoTratante: formData.medicoTratante,
            medicoCirujano: formData.medicoCirujano,
            medicoAnestesiologo: formData.medicoAnestesiologo,
            procedencia: formData.procedencia,
            cuadroClinico: formData.cuadroClinico,
          },
        },
      }));
      handleCloseDialog();
    }
  };

  const handleReasignarChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setReasignarForm((prev) => ({ ...prev, [name!]: value }));
  };

  const handleReasignarInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setReasignarForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleReasignar = () => {
    // lógica para reasignar
    setOpenReasignar(false);
  };

  const getTabContent = () => {
    if (selectedTab === 1) {
      return (
        <Hospitalizacion
          patientData={patientData[1]}
          filledData={filledData[1]}
          handleOpenDialog={handleOpenDialog}
          calculateDays={calculateDays}
          setOpenReasignar={setOpenReasignar} // NUEVO
          setReasignarForm={setReasignarForm} // NUEVO
        />
      );
    }

    const currentTabData = patientData[selectedTab];

    // POSTQUIRÚRGICO (índice 2)
    if (selectedTab === 2) {
      // PRE: camas 0, 1, 2
      const preCamas = currentTabData.slice(0, 3);
      // POST: camas 3, 4, 5, 6, 7, 8
      const postCamas = currentTabData.slice(3, 9);

      return (
        <Box>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", color: "#1A3C6D", mb: 1 }}
          >
            PRE
          </Typography>
          <Grid
            container
            spacing={2}
            sx={{ marginBottom: 3, justifyContent: "center" }}
          >
            {preCamas.map((index) => {
              const data = filledData[selectedTab]?.[index];
              return (
                <Grid
                  item
                  xs={12}
                  sm={4}
                  md={4}
                  key={index}
                  sx={{ maxWidth: 220 }}
                >
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
                            {`CAMA ${index + 1}`}
                          </Typography>
                          <img
                            src={data.genderImage}
                            alt="Paciente"
                            style={{
                              width: "60px",
                              height: "60px",
                              margin: "8px auto",
                              borderRadius: "50%",
                              border: "2px solid #FFFFFF",
                            }}
                          />
                          <Typography
                            sx={{
                              fontSize: "0.95rem",
                              fontWeight: "600",
                              color: "#1A3C6D",
                            }}
                          >
                            {data.name}
                          </Typography>
                          <Typography
                            sx={{ fontSize: "0.8rem", color: "#4A4A4A" }}
                          >
                            H.C. {data.id}
                          </Typography>
                          <Typography
                            sx={{ fontSize: "0.8rem", color: "#4A4A4A" }}
                          >
                            Fecha de Ingreso: {data.admissionDate}
                          </Typography>
                          <Typography
                            sx={{ fontSize: "0.8rem", color: "#4A4A4A" }}
                          >
                            {calculateDays(
                              data.admissionDate,
                              data.dischargeDate
                            )}{" "}
                            días de estadía
                          </Typography>
                          <Box
                            sx={{
                              display: "grid",
                              gridTemplateColumns: "repeat(3, 1fr)",
                              gap: "4px", // antes 8px
                              marginTop: "10px",
                              maxWidth: "180px",
                              mx: "auto",
                            }}
                          >
                            <IconButton title="Alta Médica">
                              <img
                                src={AltaMedica}
                                alt="Alta Médica"
                                style={{ width: "24px", height: "24px" }}
                              />
                            </IconButton>
                            <IconButton title="Historia Clínica">
                              <img
                                src={HistoriaClinica}
                                alt="Historia Clínica"
                                style={{ width: "24px", height: "24px" }}
                              />
                            </IconButton>
                            <IconButton title="Enfermería">
                              <img
                                src={Enfermeria}
                                alt="Enfermería"
                                style={{ width: "24px", height: "24px" }}
                              />
                            </IconButton>
                            <IconButton title="Servicios Internos">
                              <img
                                src={ServiciosInternos}
                                alt="Servicios Internos"
                                style={{ width: "24px", height: "24px" }}
                              />
                            </IconButton>
                            <IconButton title="Insumos">
                              <img
                                src={CargaInsumos}
                                alt="Insumos"
                                style={{ width: "24px", height: "24px" }}
                              />
                            </IconButton>
                            <IconButton title="Orden de Examen">
                              <img
                                src={OrdenExamen}
                                alt="Orden de Examen"
                                style={{ width: "24px", height: "24px" }}
                              />
                            </IconButton>
                            <Button
                              variant="contained"
                              color="primary"
                              size="small"
                              sx={{
                                background: "#1A3C6D",
                                textTransform: "none",
                              }}
                              onClick={() => {
                                setOpenReasignar(true);
                                setReasignarForm({
                                  sala: data.sala,
                                  cama: data.cama,
                                  procedencia: data.sala,
                                  resumen: "",
                                });
                              }}
                            >
                              Reasignar
                            </Button>
                          </Box>
                        </Box>
                      </CardContent>
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
                            {`CAMA ${index + 1}`}
                          </Typography>
                          <img
                            src={data.genderImage}
                            alt="Paciente"
                            style={{
                              width: "60px",
                              height: "60px",
                              margin: "8px auto",
                              borderRadius: "50%",
                              border: "2px solid #FFFFFF",
                            }}
                          />
                          <Typography
                            sx={{
                              fontSize: "0.95rem",
                              fontWeight: "600",
                              color: "#1A3C6D",
                            }}
                          >
                            {data.name}
                          </Typography>
                          <Typography
                            sx={{ fontSize: "0.8rem", color: "#4A4A4A" }}
                          >
                            H.C. {data.id}
                          </Typography>
                          <Typography
                            sx={{ fontSize: "0.8rem", color: "#4A4A4A" }}
                          >
                            Fecha de Ingreso: {data.admissionDate}
                          </Typography>
                          <Typography
                            sx={{ fontSize: "0.8rem", color: "#4A4A4A" }}
                          >
                            {calculateDays(
                              data.admissionDate,
                              data.dischargeDate
                            )}{" "}
                            días de estadía
                          </Typography>
                          <Box
                            sx={{
                              display: "grid",
                              gridTemplateColumns: "repeat(3, 1fr)",
                              gap: "4px", // antes 8px
                              marginTop: "10px",
                              maxWidth: "180px",
                              mx: "auto",
                            }}
                          >
                            <IconButton title="Alta Médica">
                              <img
                                src={AltaMedica}
                                alt="Alta Médica"
                                style={{ width: "24px", height: "24px" }}
                              />
                            </IconButton>
                            <IconButton title="Historia Clínica">
                              <img
                                src={HistoriaClinica}
                                alt="Historia Clínica"
                                style={{ width: "24px", height: "24px" }}
                              />
                            </IconButton>
                            <IconButton title="Enfermería">
                              <img
                                src={Enfermeria}
                                alt="Enfermería"
                                style={{ width: "24px", height: "24px" }}
                              />
                            </IconButton>
                            <IconButton title="Servicios Internos">
                              <img
                                src={ServiciosInternos}
                                alt="Servicios Internos"
                                style={{ width: "24px", height: "24px" }}
                              />
                            </IconButton>
                            <IconButton title="Insumos">
                              <img
                                src={CargaInsumos}
                                alt="Insumos"
                                style={{ width: "24px", height: "24px" }}
                              />
                            </IconButton>
                            <IconButton title="Orden de Examen">
                              <img
                                src={OrdenExamen}
                                alt="Orden de Examen"
                                style={{ width: "24px", height: "24px" }}
                              />
                            </IconButton>
                            <Button
                              variant="contained"
                              color="primary"
                              size="small"
                              sx={{
                                background: "#1A3C6D",
                                textTransform: "none",
                              }}
                              onClick={() => {
                                setOpenReasignar(true);
                                setReasignarForm({
                                  sala: data.sala,
                                  cama: data.cama,
                                  procedencia: data.sala,
                                  resumen: "",
                                });
                              }}
                            >
                              <img
                                src={Reasignacion}
                                alt="Reasignación"
                                style={{ width: "32px", height: "32px" }}
                              />
                            </Button>
                          </Box>
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
                          {`CAMA ${index + 1}`}
                        </Typography>
                      </CardContent>
                    </Card>
                  )}
                </Grid>
              );
            })}
          </Grid>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", color: "#1A3C6D", mb: 1 }}
          >
            POST
          </Typography>
          <Grid
            container
            spacing={2}
            sx={{ marginBottom: 3, justifyContent: "center" }}
          >
            {postCamas.slice(0, 3).map((index) => {
              const data = filledData[selectedTab]?.[index];
              return (
                <Grid
                  item
                  xs={12}
                  sm={4}
                  md={4}
                  key={index}
                  sx={{ maxWidth: 220 }}
                >
                  {data ? (
                    <Card
                      className="camas-card"
                      sx={{ minWidth: 180, maxWidth: 220 }}
                    >
                      <CardContent sx={{ padding: "10px" }}>
                        <Box
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(3, 1fr)",
                            gap: "4px", // antes 8px
                            marginTop: "10px",
                            maxWidth: "180px",
                            mx: "auto",
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
                            {`CAMA ${index + 1}`}
                          </Typography>
                          <img
                            src={data.genderImage}
                            alt="Paciente"
                            style={{
                              width: "60px",
                              height: "60px",
                              margin: "8px auto",
                              borderRadius: "50%",
                              border: "2px solid #FFFFFF",
                            }}
                          />
                          <Typography
                            sx={{
                              fontSize: "0.95rem",
                              fontWeight: "600",
                              color: "#1A3C6D",
                            }}
                          >
                            {data.name}
                          </Typography>
                          <Typography
                            sx={{ fontSize: "0.8rem", color: "#4A4A4A" }}
                          >
                            H.C. {data.id}
                          </Typography>
                          <Typography
                            sx={{ fontSize: "0.8rem", color: "#4A4A4A" }}
                          >
                            Fecha de Ingreso: {data.admissionDate}
                          </Typography>
                          <Typography
                            sx={{ fontSize: "0.8rem", color: "#4A4A4A" }}
                          >
                            {calculateDays(
                              data.admissionDate,
                              data.dischargeDate
                            )}{" "}
                            días de estadía
                          </Typography>
                          // ...existing code...
                          <Box
                            sx={{
                              display: "grid",
                              gridTemplateColumns: "repeat(3, 1fr)",
                              gap: "4px", // antes 8px
                              marginTop: "10px",
                              maxWidth: "180px",
                              mx: "auto",
                            }}
                          >
                            <IconButton title="Alta Médica">
                              <img
                                src={AltaMedica}
                                alt="Alta Médica"
                                style={{ width: "24px", height: "24px" }}
                              />
                            </IconButton>
                            <IconButton title="Historia Clínica">
                              <img
                                src={HistoriaClinica}
                                alt="Historia Clínica"
                                style={{ width: "24px", height: "24px" }}
                              />
                            </IconButton>
                            <IconButton title="Enfermería">
                              <img
                                src={Enfermeria}
                                alt="Enfermería"
                                style={{ width: "24px", height: "24px" }}
                              />
                            </IconButton>
                            <IconButton title="Servicios Internos">
                              <img
                                src={ServiciosInternos}
                                alt="Servicios Internos"
                                style={{ width: "24px", height: "24px" }}
                              />
                            </IconButton>
                            <IconButton title="Insumos">
                              <img
                                src={CargaInsumos}
                                alt="Insumos"
                                style={{ width: "24px", height: "24px" }}
                              />
                            </IconButton>
                            <IconButton title="Orden de Examen">
                              <img
                                src={OrdenExamen}
                                alt="Orden de Examen"
                                style={{ width: "24px", height: "24px" }}
                              />
                            </IconButton>
                            <Button
                              variant="contained"
                              color="primary"
                              size="small"
                              sx={{
                                background: "#1A3C6D",
                                textTransform: "none",
                              }}
                              onClick={() => {
                                setOpenReasignar(true);
                                setReasignarForm({
                                  sala: data.sala,
                                  cama: data.cama,
                                  procedencia: data.sala,
                                  resumen: "",
                                });
                              }}
                            >
                              <img
                                src={Reasignacion}
                                alt="Reasignación"
                                style={{ width: "32px", height: "32px" }}
                              />
                            </Button>
                          </Box>
                          {/* Nuevo icono de reasignación centrado debajo de los iconos */}
                          // ...existing code...
                        </Box>
                      </CardContent>
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
                            {`CAMA ${index + 1}`}
                          </Typography>
                          <img
                            src={data.genderImage}
                            alt="Paciente"
                            style={{
                              width: "60px",
                              height: "60px",
                              margin: "8px auto",
                              borderRadius: "50%",
                              border: "2px solid #FFFFFF",
                            }}
                          />
                          <Typography
                            sx={{
                              fontSize: "0.95rem",
                              fontWeight: "600",
                              color: "#1A3C6D",
                            }}
                          >
                            {data.name}
                          </Typography>
                          <Typography
                            sx={{ fontSize: "0.8rem", color: "#4A4A4A" }}
                          >
                            H.C. {data.id}
                          </Typography>
                          <Typography
                            sx={{ fontSize: "0.8rem", color: "#4A4A4A" }}
                          >
                            Fecha de Ingreso: {data.admissionDate}
                          </Typography>
                          <Typography
                            sx={{ fontSize: "0.8rem", color: "#4A4A4A" }}
                          >
                            {calculateDays(
                              data.admissionDate,
                              data.dischargeDate
                            )}{" "}
                            días de estadía
                          </Typography>
                          // ...existing code...
                          <Box
                            sx={{
                              display: "grid",
                              gridTemplateColumns: "repeat(3, 1fr)",
                              gap: "4px", // antes 8px
                              marginTop: "10px",
                              maxWidth: "180px",
                              mx: "auto",
                            }}
                          >
                            <IconButton title="Alta Médica">
                              <img
                                src={AltaMedica}
                                alt="Alta Médica"
                                style={{ width: "24px", height: "24px" }}
                              />
                            </IconButton>
                            <IconButton title="Historia Clínica">
                              <img
                                src={HistoriaClinica}
                                alt="Historia Clínica"
                                style={{ width: "24px", height: "24px" }}
                              />
                            </IconButton>
                            <IconButton title="Enfermería">
                              <img
                                src={Enfermeria}
                                alt="Enfermería"
                                style={{ width: "24px", height: "24px" }}
                              />
                            </IconButton>
                            <IconButton title="Servicios Internos">
                              <img
                                src={ServiciosInternos}
                                alt="Servicios Internos"
                                style={{ width: "24px", height: "24px" }}
                              />
                            </IconButton>
                            <IconButton title="Insumos">
                              <img
                                src={CargaInsumos}
                                alt="Insumos"
                                style={{ width: "24px", height: "24px" }}
                              />
                            </IconButton>
                            <IconButton title="Orden de Examen">
                              <img
                                src={OrdenExamen}
                                alt="Orden de Examen"
                                style={{ width: "24px", height: "24px" }}
                              />
                            </IconButton>
                            <Button
                              variant="contained"
                              color="primary"
                              size="small"
                              sx={{
                                background: "#1A3C6D",
                                textTransform: "none",
                              }}
                              onClick={() => {
                                setOpenReasignar(true);
                                setReasignarForm({
                                  sala: data.sala,
                                  cama: data.cama,
                                  procedencia: data.sala,
                                  resumen: "",
                                });
                              }}
                            >
                              Reasignar
                            </Button>
                          </Box>
                          // ...existing code...
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
                          {`CAMA ${index + 1}`}
                        </Typography>
                      </CardContent>
                    </Card>
                  )}
                </Grid>
              );
            })}
          </Grid>
          <Grid
            container
            spacing={2}
            sx={{ marginBottom: 3, justifyContent: "center" }}
          >
            {postCamas.slice(3, 6).map((index) => {
              const data = filledData[selectedTab]?.[index];
              return (
                <Grid
                  item
                  xs={12}
                  sm={4}
                  md={4}
                  key={index}
                  sx={{ maxWidth: 220 }}
                >
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
                            {`CAMA ${index + 1}`}
                          </Typography>
                          <img
                            src={data.genderImage}
                            alt="Paciente"
                            style={{
                              width: "60px",
                              height: "60px",
                              margin: "8px auto",
                              borderRadius: "50%",
                              border: "2px solid #FFFFFF",
                            }}
                          />
                          <Typography
                            sx={{
                              fontSize: "0.95rem",
                              fontWeight: "600",
                              color: "#1A3C6D",
                            }}
                          >
                            {data.name}
                          </Typography>
                          <Typography
                            sx={{ fontSize: "0.8rem", color: "#4A4A4A" }}
                          >
                            H.C. {data.id}
                          </Typography>
                          <Typography
                            sx={{ fontSize: "0.8rem", color: "#4A4A4A" }}
                          >
                            Fecha de Ingreso: {data.admissionDate}
                          </Typography>
                          <Typography
                            sx={{ fontSize: "0.8rem", color: "#4A4A4A" }}
                          >
                            {calculateDays(
                              data.admissionDate,
                              data.dischargeDate
                            )}{" "}
                            días de estadía
                          </Typography>
                          <Box
                            sx={{
                              display: "grid",
                              gridTemplateColumns: "repeat(3, 1fr)",
                              gap: "4px", // antes 8px
                              marginTop: "10px",
                              maxWidth: "180px",
                              mx: "auto",
                            }}
                          >
                            <IconButton title="Alta Médica">
                              <img
                                src={AltaMedica}
                                alt="Alta Médica"
                                style={{ width: "24px", height: "24px" }}
                              />
                            </IconButton>
                            <IconButton title="Historia Clínica">
                              <img
                                src={HistoriaClinica}
                                alt="Historia Clínica"
                                style={{ width: "24px", height: "24px" }}
                              />
                            </IconButton>
                            <IconButton title="Enfermería">
                              <img
                                src={Enfermeria}
                                alt="Enfermería"
                                style={{ width: "24px", height: "24px" }}
                              />
                            </IconButton>
                            <IconButton title="Servicios Internos">
                              <img
                                src={ServiciosInternos}
                                alt="Servicios Internos"
                                style={{ width: "24px", height: "24px" }}
                              />
                            </IconButton>
                            <IconButton title="Insumos">
                              <img
                                src={CargaInsumos}
                                alt="Insumos"
                                style={{ width: "24px", height: "24px" }}
                              />
                            </IconButton>
                            <IconButton title="Orden de Examen">
                              <img
                                src={OrdenExamen}
                                alt="Orden de Examen"
                                style={{ width: "24px", height: "24px" }}
                              />
                            </IconButton>
                            <Button
                              variant="contained"
                              color="primary"
                              size="small"
                              sx={{
                                background: "#1A3C6D",
                                textTransform: "none",
                              }}
                              onClick={() => {
                                setOpenReasignar(true);
                                setReasignarForm({
                                  sala: data.sala,
                                  cama: data.cama,
                                  procedencia: data.sala,
                                  resumen: "",
                                });
                              }}
                            >
                              Reasignar
                            </Button>
                          </Box>
                        </Box>
                      </CardContent>
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
                            {`CAMA ${index + 1}`}
                          </Typography>
                          <img
                            src={data.genderImage}
                            alt="Paciente"
                            style={{
                              width: "60px",
                              height: "60px",
                              margin: "8px auto",
                              borderRadius: "50%",
                              border: "2px solid #FFFFFF",
                            }}
                          />
                          <Typography
                            sx={{
                              fontSize: "0.95rem",
                              fontWeight: "600",
                              color: "#1A3C6D",
                            }}
                          >
                            {data.name}
                          </Typography>
                          <Typography
                            sx={{ fontSize: "0.8rem", color: "#4A4A4A" }}
                          >
                            H.C. {data.id}
                          </Typography>
                          <Typography
                            sx={{ fontSize: "0.8rem", color: "#4A4A4A" }}
                          >
                            Fecha de Ingreso: {data.admissionDate}
                          </Typography>
                          <Typography
                            sx={{ fontSize: "0.8rem", color: "#4A4A4A" }}
                          >
                            {calculateDays(
                              data.admissionDate,
                              data.dischargeDate
                            )}{" "}
                            días de estadía
                          </Typography>
                          <Box
                            sx={{
                              display: "grid",
                              gridTemplateColumns: "repeat(3, 1fr)",
                              gap: "4px", // antes 8px
                              marginTop: "10px",
                              maxWidth: "180px",
                              mx: "auto",
                            }}
                          >
                            <IconButton title="Alta Médica">
                              <img
                                src={AltaMedica}
                                alt="Alta Médica"
                                style={{ width: "24px", height: "24px" }}
                              />
                            </IconButton>
                            <IconButton title="Historia Clínica">
                              <img
                                src={HistoriaClinica}
                                alt="Historia Clínica"
                                style={{ width: "24px", height: "24px" }}
                              />
                            </IconButton>
                            <IconButton title="Enfermería">
                              <img
                                src={Enfermeria}
                                alt="Enfermería"
                                style={{ width: "24px", height: "24px" }}
                              />
                            </IconButton>
                            <IconButton title="Servicios Internos">
                              <img
                                src={ServiciosInternos}
                                alt="Servicios Internos"
                                style={{ width: "24px", height: "24px" }}
                              />
                            </IconButton>
                            <IconButton title="Insumos">
                              <img
                                src={CargaInsumos}
                                alt="Insumos"
                                style={{ width: "24px", height: "24px" }}
                              />
                            </IconButton>
                            <IconButton title="Orden de Examen">
                              <img
                                src={OrdenExamen}
                                alt="Orden de Examen"
                                style={{ width: "24px", height: "24px" }}
                              />
                            </IconButton>
                            <Button
                              variant="contained"
                              color="primary"
                              size="small"
                              sx={{
                                background: "#1A3C6D",
                                textTransform: "none",
                              }}
                              onClick={() => {
                                setOpenReasignar(true);
                                setReasignarForm({
                                  sala: data.sala,
                                  cama: data.cama,
                                  procedencia: data.sala,
                                  resumen: "",
                                });
                              }}
                            >
                              Reasignar
                            </Button>
                          </Box>
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
                          {`CAMA ${index + 1}`}
                        </Typography>
                      </CardContent>
                    </Card>
                  )}
                </Grid>
              );
            })}
          </Grid>
        </Box>
      );
    }

    // Para los otros tabs, layout normal
    return (
      <Grid
        container
        spacing={2}
        sx={{ marginBottom: 3, paddingLeft: 0 }}
        direction="row"
        alignItems="stretch"
      >
        {currentTabData.map((index) => {
          const data = filledData[selectedTab]?.[index];
          return (
            <Grid item xs={12} key={index}>
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
                        {data.cama}
                      </Typography>
                      <img
                        src={data.genderImage}
                        alt="Paciente"
                        style={{
                          width: "60px",
                          height: "60px",
                          margin: "8px auto",
                          borderRadius: "50%",
                          border: "2px solid #FFFFFF",
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: "0.95rem",
                          fontWeight: "600",
                          color: "#1A3C6D",
                        }}
                      >
                        {data.name}
                      </Typography>
                      <Typography sx={{ fontSize: "0.8rem", color: "#4A4A4A" }}>
                        H.C. {data.id}
                      </Typography>
                      <Typography sx={{ fontSize: "0.8rem", color: "#4A4A4A" }}>
                        Fecha de Ingreso: {data.admissionDate}
                      </Typography>
                      <Typography sx={{ fontSize: "0.8rem", color: "#4A4A4A" }}>
                        {calculateDays(data.admissionDate, data.dischargeDate)}{" "}
                        días de estadía
                      </Typography>
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "repeat(3, 1fr)",
                          gap: "4px", // antes 8px
                          marginTop: "10px",
                          maxWidth: "180px",
                          mx: "auto",
                        }}
                      >
                        <IconButton title="Alta Médica">
                          <img
                            src={AltaMedica}
                            alt="Alta Médica"
                            style={{ width: "24px", height: "24px" }}
                          />
                        </IconButton>
                        <IconButton title="Historia Clínica">
                          <img
                            src={HistoriaClinica}
                            alt="Historia Clínica"
                            style={{ width: "24px", height: "24px" }}
                          />
                        </IconButton>
                        <IconButton title="Enfermería">
                          <img
                            src={Enfermeria}
                            alt="Enfermería"
                            style={{ width: "24px", height: "24px" }}
                          />
                        </IconButton>
                        <IconButton title="Servicios Internos">
                          <img
                            src={ServiciosInternos}
                            alt="Servicios Internos"
                            style={{ width: "24px", height: "24px" }}
                          />
                        </IconButton>
                        <IconButton title="Insumos">
                          <img
                            src={CargaInsumos}
                            alt="Insumos"
                            style={{ width: "24px", height: "24px" }}
                          />
                        </IconButton>
                        <IconButton title="Orden de Examen">
                          <img
                            src={OrdenExamen}
                            alt="Orden de Examen"
                            style={{ width: "24px", height: "24px" }}
                          />
                        </IconButton>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          sx={{
                            background: "#1A3C6D",
                            textTransform: "none",
                          }}
                          onClick={() => {
                            setOpenReasignar(true);
                            setReasignarForm({
                              sala: data.sala,
                              cama: data.cama,
                              procedencia: data.sala,
                              resumen: "",
                            });
                          }}
                        >
                          Reasignar
                        </Button>
                      </Box>
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
                      {`CAMA ${index + 1}`}
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

  const calculateDays = (admissionDate: string, dischargeDate?: string) => {
    if (!admissionDate) return 0;
    const start = new Date(admissionDate);
    const end = dischargeDate ? new Date(dischargeDate) : new Date();
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <div className="camas-container">
      <div className="camas-inner-container">
        <Typography
          variant="h5"
          sx={{
            color: "#1A3C6D",
            fontWeight: "bold",
            marginBottom: "20px",
            paddingLeft: 0,
          }}
        >
          ADMINISTRACION DE CAMAS
        </Typography>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            margin: 0,
            padding: 0,
          }}
        >
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
        <IngresoPaciente
          open={openDialog}
          formData={formData}
          handleClose={handleCloseDialog}
          handleInputChange={handleInputChange}
          handleCheckboxChange={handleCheckboxChange}
          handleSave={handleSave}
        />
        <ReasignacionCama
          open={openReasignar}
          sala={reasignarForm.sala}
          cama={reasignarForm.cama}
          procedencia={reasignarForm.procedencia}
          resumen={reasignarForm.resumen}
          handleClose={() => setOpenReasignar(false)}
          handleSelectChange={handleReasignarChange}
          handleInputChange={handleReasignarInputChange}
          handleReasignar={handleReasignar}
          camasDisponibles={camasDisponibles}
          salas={salas}
        />
      </div>
    </div>
  );
};

export default Camas;
