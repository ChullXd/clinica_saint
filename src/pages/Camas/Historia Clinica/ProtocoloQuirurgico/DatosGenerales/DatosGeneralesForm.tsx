import React, { useState } from "react";
import {
  Box,
  TextField,
  Card,
  CardContent,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

export default function DatosGeneralesForm() {
  const [pacienteId, setPacienteId] = useState("");
  const [datosEstablecimiento, setDatosEstablecimiento] = useState({
    institucion: "MINISTERIO DE SALUD PÚBLICA",
    unicodigo: "000000",
    establecimiento: "HOSPITAL GENERAL",
    historiaClinica: "",
    numeroArchivo: "",
    numeroHoja: "1",
  });

  const [datosPaciente, setDatosPaciente] = useState({
    primerApellido: "",
    segundoApellido: "",
    primerNombre: "",
    segundoNombre: "",
    sexo: "",
    edad: "",
    condicionEdad: "Años",
  });

  const handleBuscarPaciente = () => {
    // Simulación de búsqueda
    if (datosEstablecimiento.historiaClinica) {
      setDatosPaciente({
        primerApellido: "TORRES",
        segundoApellido: "GÓMEZ",
        primerNombre: "MARÍA",
        segundoNombre: "ELENA",
        sexo: "F",
        edad: "45",
        condicionEdad: "Años",
      });
    }
  };

  return (
    <Box>
      {/* Sección A: Datos del Establecimiento */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 2 }}>
          <Typography
            variant="h6"
            sx={{
              mb: 1.5,
              fontWeight: "bold",
              color: "#1A3C6D",
              fontSize: "1rem",
            }}
          >
            A. DATOS DEL ESTABLECIMIENTO
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: 1.5 }}>
            <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 31%" } }}>
              <TextField
                label="INSTITUCIÓN DEL SISTEMA"
                value={datosEstablecimiento.institucion}
                fullWidth
                size="small"
                InputProps={{ readOnly: true }}
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
              />
            </Box>
            <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 31%" } }}>
              <TextField
                label="UNICÓDIGO"
                value={datosEstablecimiento.unicodigo}
                fullWidth
                size="small"
                InputProps={{ readOnly: true }}
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
              />
            </Box>
            <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 31%" } }}>
              <TextField
                label="ESTABLECIMIENTO DE SALUD"
                value={datosEstablecimiento.establecimiento}
                fullWidth
                size="small"
                InputProps={{ readOnly: true }}
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
              />
            </Box>
          </Box>
          
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
            <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 31%" } }}>
              <TextField
                label="N° HISTORIA CLÍNICA"
                value={datosEstablecimiento.historiaClinica}
                onChange={(e) =>
                  setDatosEstablecimiento({
                    ...datosEstablecimiento,
                    historiaClinica: e.target.value,
                  })
                }
                fullWidth
                size="small"
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
              />
            </Box>
           
            <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 23%" } }}>
              <TextField
                label="N° ARCHIVO"
                value={datosEstablecimiento.numeroArchivo}
                onChange={(e) =>
                  setDatosEstablecimiento({
                    ...datosEstablecimiento,
                    numeroArchivo: e.target.value,
                  })
                }
                fullWidth
                size="small"
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
              />
            </Box>
            <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 23%" } }}>
              <TextField
                label="N° HOJA"
                value={datosEstablecimiento.numeroHoja}
                onChange={(e) =>
                  setDatosEstablecimiento({
                    ...datosEstablecimiento,
                    numeroHoja: e.target.value,
                  })
                }
                fullWidth
                size="small"
                type="number"
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Sección B: Datos del Paciente */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 2 }}>
          <Typography
            variant="h6"
            sx={{
              mb: 1.5,
              fontWeight: "bold",
              color: "#1A3C6D",
              fontSize: "1rem",
            }}
          >
            B. DATOS DEL PACIENTE
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: 1.5 }}>
            <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 23%" } }}>
              <TextField
                label="PRIMER APELLIDO"
                value={datosPaciente.primerApellido}
                onChange={(e) =>
                  setDatosPaciente({
                    ...datosPaciente,
                    primerApellido: e.target.value,
                  })
                }
                fullWidth
                size="small"
                InputProps={{ readOnly: true }}
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
              />
            </Box>
            <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 23%" } }}>
              <TextField
                label="SEGUNDO APELLIDO"
                value={datosPaciente.segundoApellido}
                onChange={(e) =>
                  setDatosPaciente({
                    ...datosPaciente,
                    segundoApellido: e.target.value,
                  })
                }
                fullWidth
                size="small"
                InputProps={{ readOnly: true }}
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
              />
            </Box>
            <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 23%" } }}>
              <TextField
                label="PRIMER NOMBRE"
                value={datosPaciente.primerNombre}
                onChange={(e) =>
                  setDatosPaciente({
                    ...datosPaciente,
                    primerNombre: e.target.value,
                  })
                }
                fullWidth
                size="small"
                InputProps={{ readOnly: true }}
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
              />
            </Box>
            <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 23%" } }}>
              <TextField
                label="SEGUNDO NOMBRE"
                value={datosPaciente.segundoNombre}
                onChange={(e) =>
                  setDatosPaciente({
                    ...datosPaciente,
                    segundoNombre: e.target.value,
                  })
                }
                fullWidth
                size="small"
                InputProps={{ readOnly: true }}
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
              />
            </Box>
          </Box>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
            <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 15%" } }}>
              <TextField
                label="SEXO"
                value={datosPaciente.sexo}
                onChange={(e) =>
                  setDatosPaciente({ ...datosPaciente, sexo: e.target.value })
                }
                fullWidth
                size="small"
                InputProps={{ readOnly: true }}
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
              />
            </Box>
            <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 15%" } }}>
              <TextField
                label="EDAD"
                value={datosPaciente.edad}
                onChange={(e) =>
                  setDatosPaciente({ ...datosPaciente, edad: e.target.value })
                }
                fullWidth
                size="small"
                InputProps={{ readOnly: true }}
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
              />
            </Box>
            <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 23%" } }}>
              <FormControl fullWidth size="small">
                <InputLabel sx={{ fontSize: "0.8rem" }}>CONDICIÓN EDAD</InputLabel>
                <Select
                  value={datosPaciente.condicionEdad}
                  label="CONDICIÓN EDAD"
                  onChange={(e) =>
                    setDatosPaciente({
                      ...datosPaciente,
                      condicionEdad: e.target.value,
                    })
                  }
                  disabled
                  sx={{ fontSize: "0.8rem" }}
                >
                  <MenuItem value="Años">Años</MenuItem>
                  <MenuItem value="Meses">Meses</MenuItem>
                  <MenuItem value="Días">Días</MenuItem>
                  <MenuItem value="Horas">Horas</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Sección C: Signos Vitales */}
      <Card>
        <CardContent sx={{ p: 2 }}>
          <Typography
            variant="h6"
            sx={{
              mb: 1.5,
              fontWeight: "bold",
              color: "#1A3C6D",
              fontSize: "1rem",
            }}
          >
            C. SIGNOS VITALES PREOPERATORIOS
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
            <Box sx={{ flex: { xs: "1 1 45%", md: "1 1 15%" } }}>
              <TextField
                label="T. ARTERIAL"
                placeholder="mmHg"
                fullWidth
                size="small"
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
              />
            </Box>
            <Box sx={{ flex: { xs: "1 1 45%", md: "1 1 15%" } }}>
              <TextField
                label="PULSO"
                placeholder="lat/min"
                fullWidth
                size="small"
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
              />
            </Box>
            <Box sx={{ flex: { xs: "1 1 45%", md: "1 1 15%" } }}>
              <TextField
                label="TEMPERATURA"
                placeholder="°C"
                fullWidth
                size="small"
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
              />
            </Box>
            <Box sx={{ flex: { xs: "1 1 45%", md: "1 1 15%" } }}>
              <TextField
                label="F. RESPIRATORIA"
                placeholder="resp/min"
                fullWidth
                size="small"
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
              />
            </Box>
            <Box sx={{ flex: { xs: "1 1 45%", md: "1 1 15%" } }}>
              <TextField 
                label="PESO" 
                placeholder="kg" 
                fullWidth 
                size="small"
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
              />
            </Box>
            <Box sx={{ flex: { xs: "1 1 45%", md: "1 1 15%" } }}>
              <TextField
                label="TALLA"
                placeholder="cm"
                fullWidth
                size="small"
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}