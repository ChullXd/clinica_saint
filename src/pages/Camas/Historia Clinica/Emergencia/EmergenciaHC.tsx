import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
} from "@mui/material";
import {
  Assignment as FormIcon,
} from "@mui/icons-material";

export default function EmergenciaHC() {
  return (
    <Box sx={{ p: 3, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
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
              FORMULARIO 008 MSP - INGRESO
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Sección A: Datos del establecimiento */}
      <Card sx={{ mb: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography
            variant="h6"
            sx={{ mb: 2, fontWeight: "bold", color: "#1A3C6D", fontSize: "0.9rem" }} // Agregué fontSize más pequeño
          >
            A. DATOS DEL ESTABLECIMIENTO
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            <Box sx={{ flex: "1 1 300px" }}>
              <TextField
                label="Institución del Sistema"
                value="RPC (RED PUBLICA COMPLEMENTARIA)"
                fullWidth
                variant="outlined"
                size="small"
                InputProps={{ readOnly: true }}
                sx={{
                  bgcolor: "#f9fffa",
                  '& .MuiInputLabel-root': { fontSize: '0.7rem' }, // Label más pequeño
                  '& .MuiInputBase-input': { fontSize: '0.7rem' }, // Input más pequeño
                }}
              />
            </Box>
            <Box sx={{ flex: "1 1 300px" }}>
              <TextField
                label="Unicódigo"
                value="64876"
                fullWidth
                variant="outlined"
                size="small"
                InputProps={{ readOnly: true }}
                sx={{
                  bgcolor: "#f9fffa",
                  '& .MuiInputLabel-root': { fontSize: '0.7rem' },
                  '& .MuiInputBase-input': { fontSize: '0.7rem' },
                }}
              />
            </Box>
            <Box sx={{ flex: "1 1 300px" }}>
              <TextField
                label="Establecimiento de Salud"
                value="RIVAMEDIC S.A."
                fullWidth
                variant="outlined"
                size="small"
                InputProps={{ readOnly: true }}
                sx={{
                  bgcolor: "#f9fffa",
                  '& .MuiInputLabel-root': { fontSize: '0.7rem' },
                  '& .MuiInputBase-input': { fontSize: '0.7rem' },
                }}
              />
            </Box>
            <Box sx={{ flex: "1 1 300px" }}>
              <TextField
                label="Número de Historia Clínica"
                value="1712345678"
                fullWidth
                variant="outlined"
                size="small"
                InputProps={{ readOnly: true }}
                sx={{
                  bgcolor: "#f9fffa",
                  '& .MuiInputLabel-root': { fontSize: '0.7rem' },
                  '& .MuiInputBase-input': { fontSize: '0.7rem' },
                }}
              />
            </Box>
            <Box sx={{ flex: "1 1 300px" }}>
              <TextField
                label="Número de archivo"
                value="HC-001234"
                fullWidth
                variant="outlined"
                size="small"
                InputProps={{ readOnly: true }}
                sx={{
                  bgcolor: "#f9fffa",
                  '& .MuiInputLabel-root': { fontSize: '0.7rem' },
                  '& .MuiInputBase-input': { fontSize: '0.7rem' },
                }}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>

        {/* Sección B: Registro de Admisión */}
        <Card sx={{ mb: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography
              variant="h6"
              sx={{ mb: 2, fontWeight: "bold", color: "#1A3C6D", fontSize: "0.9rem" }}
            >
              B. REGISTRO DE ADMISIÓN
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3 }}>
              <Box sx={{ flex: "1 1 250px" }}>
                <TextField
                  label="Fecha de Admisión (YYYY/MM/DD)"
                  value="2025/07/23"
                  fullWidth
                  variant="outlined"
                  size="small"
                  InputProps={{ readOnly: true }}
                  sx={{
                    bgcolor: "#f9fffa",
                    '& .MuiInputLabel-root': { fontSize: '0.7rem' },
                    '& .MuiInputBase-input': { fontSize: '0.7rem' },
                  }}
                />
              </Box>
              <Box sx={{ flex: "1 1 250px" }}>
                <TextField
                  label="Hora de Admisión (HH:MM)"
                  value="14:30"
                  fullWidth
                  variant="outlined"
                  size="small"
                  InputProps={{ readOnly: true }}
                  sx={{
                    bgcolor: "#f9fffa",
                    '& .MuiInputLabel-root': { fontSize: '0.7rem' },
                    '& .MuiInputBase-input': { fontSize: '0.7rem' },
                  }}
                />
              </Box>
              <Box
                sx={{ flex: "1 1 250px", display: "flex", alignItems: "center" }}
              >
                <Typography variant="body2" sx={{ mr: 2, fontSize: "0.7rem" }}>
                  Historia Clínica en establecimiento:
                </Typography>
                <FormControlLabel
                  control={<Checkbox defaultChecked disabled size="small" />}
                  label={<Typography sx={{ fontSize: "0.7rem" }}>SI</Typography>}
                />
                <FormControlLabel
                  control={<Checkbox disabled size="small" />}
                  label={<Typography sx={{ fontSize: "0.7rem" }}>NO</Typography>}
                />
              </Box>
            </Box>

            {/* Datos del paciente */}
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: "bold", fontSize: "0.8rem" }}>
              DATOS DEL PACIENTE
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3 }}>
              <Box sx={{ flex: "1 1 200px" }}>
                <TextField
                  label="Primer Apellido"
                  value="PEREZ"
                  fullWidth
                  variant="outlined"
                  size="small"
                  InputProps={{ readOnly: true }}
                  sx={{
                    bgcolor: "#f9fffa",
                    '& .MuiInputLabel-root': { fontSize: '0.7rem' },
                    '& .MuiInputBase-input': { fontSize: '0.7rem' },
                  }}
                />
              </Box>
              <Box sx={{ flex: "1 1 200px" }}>
                <TextField
                  label="Segundo Apellido"
                  value="GÓMEZ"
                  fullWidth
                  variant="outlined"
                  size="small"
                  InputProps={{ readOnly: true }}
                  sx={{
                    bgcolor: "#f9fffa",
                    '& .MuiInputLabel-root': { fontSize: '0.7rem' },
                    '& .MuiInputBase-input': { fontSize: '0.7rem' },
                  }}
                />
              </Box>
              <Box sx={{ flex: "1 1 200px" }}>
                <TextField
                  label="Primer Nombre"
                  value="JUAN"
                  fullWidth
                  variant="outlined"
                  size="small"
                  InputProps={{ readOnly: true }}
                  sx={{
                    bgcolor: "#f9fffa",
                    '& .MuiInputLabel-root': { fontSize: '0.7rem' },
                    '& .MuiInputBase-input': { fontSize: '0.7rem' },
                  }}
                />
              </Box>
              <Box sx={{ flex: "1 1 200px" }}>
                <TextField
                  label="Segundo Nombre"
                  value="CARLOS"
                  fullWidth
                  variant="outlined"
                  size="small"
                  InputProps={{ readOnly: true }}
                  sx={{
                    bgcolor: "#f9fffa",
                    '& .MuiInputLabel-root': { fontSize: '0.7rem' },
                    '& .MuiInputBase-input': { fontSize: '0.7rem' },
                  }}
                />
              </Box>
            </Box>

            {/* Datos de identificación */}
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3 }}>
              <Box sx={{ flex: "1 1 200px" }}>
                <TextField
                  label="Número de Cédula/Pasaporte"
                  value="1712345678"
                  fullWidth
                  variant="outlined"
                  size="small"
                  InputProps={{ readOnly: true }}
                  sx={{
                    bgcolor: "#f9fffa",
                    '& .MuiInputLabel-root': { fontSize: '0.7rem' },
                    '& .MuiInputBase-input': { fontSize: '0.7rem' },
                  }}
                />
              </Box>
              <Box sx={{ flex: "1 1 200px" }}>
                <TextField
                  label="Fecha de Nacimiento"
                  value="12/05/1980"
                  fullWidth
                  variant="outlined"
                  size="small"
                  InputProps={{ readOnly: true }}
                  sx={{
                    bgcolor: "#f9fffa",
                    '& .MuiInputLabel-root': { fontSize: '0.7rem' },
                    '& .MuiInputBase-input': { fontSize: '0.7rem' },
                  }}
                />
              </Box>
              <Box sx={{ flex: "1 1 200px" }}>
                <TextField
                  label="Edad"
                  value="45 AÑOS"
                  fullWidth
                  variant="outlined"
                  size="small"
                  InputProps={{ readOnly: true }}
                  sx={{
                    bgcolor: "#f9fffa",
                    '& .MuiInputLabel-root': { fontSize: '0.7rem' },
                    '& .MuiInputBase-input': { fontSize: '0.7rem' },
                  }}
                />
              </Box>
              <Box sx={{ flex: "1 1 200px" }}>
                <TextField
                  label="Nacionalidad"
                  value="ECUATORIANA"
                  fullWidth
                  variant="outlined"
                  size="small"
                  InputProps={{ readOnly: true }}
                  sx={{
                    bgcolor: "#f9fffa",
                    '& .MuiInputLabel-root': { fontSize: '0.7rem' },
                    '& .MuiInputBase-input': { fontSize: '0.7rem' },
                  }}
                />
              </Box>
            </Box>

            {/* Tipo de documento */}
            <Box sx={{ mb: 3 }}>
              <FormControl component="fieldset">
                <FormLabel
                  component="legend"
                  sx={{ fontWeight: "bold", color: "text.primary", fontSize: "0.75rem" }}
                >
                  Tipo de documento de identificación del paciente:
                </FormLabel>
                <RadioGroup row name="documento-type" defaultValue="CC/CI" sx={{ mt: 1 }}>
                  <FormControlLabel
                    value="CC/CI"
                    control={<Radio size="small" defaultChecked disabled />}
                    label={<Typography sx={{ fontSize: "0.7rem" }}>CC/CI</Typography>}
                  />
                  <FormControlLabel
                    value="PAS"
                    control={<Radio size="small" disabled />}
                    label={<Typography sx={{ fontSize: "0.7rem" }}>PAS</Typography>}
                  />
                  <FormControlLabel
                    value="CARNE"
                    control={<Radio size="small" disabled />}
                    label={<Typography sx={{ fontSize: "0.7rem" }}>CARNE</Typography>}
                  />
                  <FormControlLabel
                    value="S/D"
                    control={<Radio size="small" disabled />}
                    label={<Typography sx={{ fontSize: "0.7rem" }}>S/D</Typography>}
                  />
                </RadioGroup>
              </FormControl>
            </Box>

            {/* Estado civil */}
            <Box sx={{ mb: 3 }}>
              <FormControl component="fieldset">
                <FormLabel
                  component="legend"
                  sx={{ fontWeight: "bold", color: "text.primary", fontSize: "0.75rem" }}
                >
                  Estado civil:
                </FormLabel>
                <RadioGroup row name="estado-civil" defaultValue="Cas" sx={{ mt: 1 }}>
                  <FormControlLabel
                    value="Sol"
                    control={<Radio size="small" disabled />}
                    label={<Typography sx={{ fontSize: "0.7rem" }}>Sol = Soltera</Typography>}
                  />
                  <FormControlLabel
                    value="Cas"
                    control={<Radio size="small" defaultChecked disabled />}
                    label={<Typography sx={{ fontSize: "0.7rem" }}>Cas = Casado</Typography>}
                  />
                  <FormControlLabel
                    value="Div"
                    control={<Radio size="small" disabled />}
                    label={<Typography sx={{ fontSize: "0.7rem" }}>Div = Divorciado</Typography>}
                  />
                  <FormControlLabel
                    value="Viu"
                    control={<Radio size="small" disabled />}
                    label={<Typography sx={{ fontSize: "0.7rem" }}>Viu = Viuda</Typography>}
                  />
                  <FormControlLabel
                    value="Un"
                    control={<Radio size="small" disabled />}
                    label={<Typography sx={{ fontSize: "0.7rem" }}>Un = Unión libre</Typography>}
                  />
                  <FormControlLabel
                    value="U-H"
                    control={<Radio size="small" disabled />}
                    label={<Typography sx={{ fontSize: "0.7rem" }}>U-H = Unión de hecho</Typography>}
                  />
                  <FormControlLabel
                    value="N/A"
                    control={<Radio size="small" disabled />}
                    label={<Typography sx={{ fontSize: "0.7rem" }}>N/A = Ninguna de las anteriores</Typography>}
                  />
                </RadioGroup>
              </FormControl>
            </Box>

            {/* Sexo */}
            <Box sx={{ mb: 3 }}>
              <FormControl component="fieldset">
                <FormLabel
                  component="legend"
                  sx={{ fontWeight: "bold", color: "text.primary", fontSize: "0.75rem" }}
                >
                  Sexo:
                </FormLabel>
                <RadioGroup row name="sexo" defaultValue="H" sx={{ mt: 1 }}>
                  <FormControlLabel
                    value="M"
                    control={<Radio size="small" disabled />}
                    label={<Typography sx={{ fontSize: "0.7rem" }}>Mujer (M)</Typography>}
                  />
                  <FormControlLabel
                    value="H"
                    control={<Radio size="small" defaultChecked disabled />}
                    label={<Typography sx={{ fontSize: "0.7rem" }}>Hombre (H)</Typography>}
                  />
                </RadioGroup>
              </FormControl>
            </Box>

            {/* Datos adicionales */}
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3 }}>
              <Box sx={{ flex: "1 1 200px" }}>
                <TextField
                  label="No. Teléfono fijo"
                  value="02-2345678"
                  fullWidth
                  variant="outlined"
                  size="small"
                  InputProps={{ readOnly: true }}
                  sx={{
                    bgcolor: "#f9fffa",
                    '& .MuiInputLabel-root': { fontSize: '0.7rem' },
                    '& .MuiInputBase-input': { fontSize: '0.7rem' },
                  }}
                />
              </Box>
              <Box sx={{ flex: "1 1 200px" }}>
                <TextField
                  label="No. Teléfono celular"
                  value="0987654321"
                  fullWidth
                  variant="outlined"
                  size="small"
                  InputProps={{ readOnly: true }}
                  sx={{
                    bgcolor: "#f9fffa",
                    '& .MuiInputLabel-root': { fontSize: '0.7rem' },
                    '& .MuiInputBase-input': { fontSize: '0.7rem' },
                  }}
                />
              </Box>
              <Box sx={{ flex: "1 1 200px" }}>
                <TextField
                  label="Correo electrónico"
                  value="juan.perez@email.com"
                  fullWidth
                  variant="outlined"
                  size="small"
                  InputProps={{ readOnly: true }}
                  sx={{
                    bgcolor: "#f9fffa",
                    '& .MuiInputLabel-root': { fontSize: '0.7rem' },
                    '& .MuiInputBase-input': { fontSize: '0.7rem' },
                  }}
                />
              </Box>
            </Box>

            {/* Datos de residencia del paciente */}
            <Typography
              variant="subtitle1"
              sx={{ mt: 3, mb: 2, fontWeight: "bold", fontSize: "0.8rem" }}
            >
              DATOS DE RESIDENCIA DEL PACIENTE
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3 }}>
              <Box sx={{ flex: "1 1 200px" }}>
                <TextField
                  label="Provincia"
                  value="PICHINCHA"
                  fullWidth
                  variant="outlined"
                  size="small"
                  InputProps={{ readOnly: true }}
                  sx={{
                    bgcolor: "#f9fffa",
                    '& .MuiInputLabel-root': { fontSize: '0.7rem' },
                    '& .MuiInputBase-input': { fontSize: '0.7rem' },
                  }}
                />
              </Box>
              <Box sx={{ flex: "1 1 200px" }}>
                <TextField
                  label="Cantón"
                  value="QUITO"
                  fullWidth
                  variant="outlined"
                  size="small"
                  InputProps={{ readOnly: true }}
                  sx={{
                    bgcolor: "#f9fffa",
                    '& .MuiInputLabel-root': { fontSize: '0.7rem' },
                    '& .MuiInputBase-input': { fontSize: '0.7rem' },
                  }}
                />
              </Box>
              <Box sx={{ flex: "1 1 200px" }}>
                <TextField
                  label="Parroquia"
                  value="IÑAQUITO"
                  fullWidth
                  variant="outlined"
                  size="small"
                  InputProps={{ readOnly: true }}
                  sx={{
                    bgcolor: "#f9fffa",
                    '& .MuiInputLabel-root': { fontSize: '0.7rem' },
                    '& .MuiInputBase-input': { fontSize: '0.7rem' },
                  }}
                />
              </Box>
              <Box sx={{ flex: "1 1 200px" }}>
                <TextField
                  label="Barrio/Sector"
                  value="LA CAROLINA"
                  fullWidth
                  variant="outlined"
                  size="small"
                  InputProps={{ readOnly: true }}
                  sx={{
                    bgcolor: "#f9fffa",
                    '& .MuiInputLabel-root': { fontSize: '0.7rem' },
                    '& .MuiInputBase-input': { fontSize: '0.7rem' },
                  }}
                />
              </Box>
            </Box>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3 }}>
              <Box sx={{ flex: "2 1 400px" }}>
                <TextField
                  label="Dirección domiciliaria"
                  value="AV. AMAZONAS N24-240 Y COLÓN"
                  fullWidth
                  variant="outlined"
                  size="small"
                  InputProps={{ readOnly: true }}
                  sx={{
                    bgcolor: "#f9fffa",
                    '& .MuiInputLabel-root': { fontSize: '0.7rem' },
                    '& .MuiInputBase-input': { fontSize: '0.7rem' },
                  }}
                />
              </Box>
              <Box sx={{ flex: "1 1 200px" }}>
                <TextField
                  label="Referencia domiciliaria"
                  value="FRENTE AL PARQUE LA CAROLINA"
                  fullWidth
                  variant="outlined"
                  size="small"
                  InputProps={{ readOnly: true }}
                  sx={{
                    bgcolor: "#f9fffa",
                    '& .MuiInputLabel-root': { fontSize: '0.7rem' },
                    '& .MuiInputBase-input': { fontSize: '0.7rem' },
                  }}
                />
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Sección C: Inicio de Atención */}
        <Card sx={{ mb: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography
              variant="h6"
              sx={{ mb: 2, fontWeight: "bold", color: "#1A3C6D" }}
            >
              C. INICIO DE ATENCIÓN
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                mb: 3,
                "& .MuiTextField-root": { bgcolor: "#f9fffa" },
              }}
            >
              <Box sx={{ flex: "1 1 200px" }}>
                <TextField
                  label="Fecha (YYYY/MM/DD)"
                  value={new Date().toISOString().split("T")[0]} // Fecha actual
                  fullWidth
                  variant="outlined"
                  size="small"
                  InputProps={{ readOnly: true }}
                />
              </Box>
              <Box sx={{ flex: "1 1 200px" }}>
                <TextField
                  label="Hora (HH:MM)"
                  value={new Date().toLocaleTimeString("es-EC", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })} // Hora actual
                  fullWidth
                  variant="outlined"
                  size="small"
                  InputProps={{ readOnly: true }}
                />
              </Box>
            </Box>

            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Condición de llegada:
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                mb: 3,
                p: 2,
                border: "1px solid #e0e0e0",
                borderRadius: 1,
                bgcolor: "#f9fffa",
              }}
            >
              <FormControlLabel
                control={<Radio name="condicion" />}
                label="Estable"
              />
              <FormControlLabel
                control={<Radio name="condicion" />}
                label="Inestable"
              />
              <FormControlLabel
                control={<Radio name="condicion" />}
                label="Fallecido"
              />
            </Box>

            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Motivo de atención:
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              multiline
              rows={3}
              placeholder="Ingrese el motivo de atención del paciente"
              sx={{ bgcolor: "#f9fffa" }}
            />
          </CardContent>
        </Card>

        {/* Sección D: Accidente, Violencia, Intoxicación */}
        <Card sx={{ mb: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography
              variant="h6"
              sx={{ mb: 2, fontWeight: "bold", color: "#1A3C6D" }}
            >
              D. ACCIDENTE, VIOLENCIA, INTOXICACIÓN
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                mb: 3,
                "& .MuiTextField-root": { bgcolor: "#f9fffa" },
              }}
            >
              <Box sx={{ flex: "1 1 200px" }}>
                <TextField
                  label="Fecha (YYYY/MM/DD)"
                  fullWidth
                  variant="outlined"
                  size="small"
                  placeholder="Ingrese la fecha del evento"
                />
              </Box>
              <Box sx={{ flex: "1 1 200px" }}>
                <TextField
                  label="Hora (HH:MM)"
                  fullWidth
                  variant="outlined"
                  size="small"
                  placeholder="Ingrese la hora del evento"
                />
              </Box>
              <Box sx={{ flex: "1 1 200px" }}>
                <TextField
                  label="Lugar del evento"
                  fullWidth
                  variant="outlined"
                  size="small"
                />
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                mb: 3,
                "& .MuiTextField-root": { bgcolor: "#f9fffa" },
              }}
            >
              <Box sx={{ flex: "2 1 400px" }}>
                <TextField
                  label="Dirección del evento"
                  fullWidth
                  variant="outlined"
                  size="small"
                />
              </Box>
              <Box
                sx={{
                  flex: "1 1 200px",
                  display: "flex",
                  alignItems: "center",
                  p: 1,
                  border: "1px solid #e0e0e0",
                  borderRadius: 1,
                  bgcolor: "#f9fffa",
                }}
              >
                <Typography variant="body2" sx={{ mr: 2 }}>
                  Custodia Policial:
                </Typography>
                <FormControlLabel
                  control={<Radio name="custodia" />}
                  label="SI"
                />
                <FormControlLabel
                  control={<Radio name="custodia" />}
                  label="NO"
                />
              </Box>
            </Box>

            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
              TIPOS DE EVENTOS
            </Typography>

            {/* Eventos de Accidentes */}
            <Box
              sx={{
                border: "1px solid #e0e0e0",
                borderRadius: 1,
                mb: 2,
                bgcolor: "#f9fffa",
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  p: 1,
                  bgcolor: "#e8f5e9",
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                Accidentes
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "repeat(2, 1fr)",
                    sm: "repeat(3, 1fr)",
                    md: "repeat(4, 1fr)",
                  },
                  p: 1,
                  gap: 1,
                }}
              >
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label="Accidente de Tránsito"
                />
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label="Caída"
                />
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label="Quemadura"
                />
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label="Mordedura"
                />
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label="Ahogamiento"
                />
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label="Cuerpo extraño"
                />
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label="Aplastamiento"
                />
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label="Otro Accidente"
                />
              </Box>
            </Box>

            {/* Eventos de Violencia */}
            <Box
              sx={{
                border: "1px solid #e0e0e0",
                borderRadius: 1,
                mb: 2,
                bgcolor: "#f9fffa",
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  p: 1,
                  bgcolor: "#ffebee",
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                Violencia
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "repeat(2, 1fr)",
                    sm: "repeat(3, 1fr)",
                    md: "repeat(4, 1fr)",
                  },
                  p: 1,
                  gap: 1,
                }}
              >
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label="Violencia por arma de fuego"
                />
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label="Violencia por arma C. punzante"
                />
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label="Violencia por Riña"
                />
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label="Violencia Familiar"
                />
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label="Presunta Violencia Física"
                />
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label="Presunta Violencia Psicológica"
                />
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label="Presunta Violencia Sexual"
                />
              </Box>
            </Box>

            {/* Eventos de Intoxicación */}
            <Box
              sx={{
                border: "1px solid #e0e0e0",
                borderRadius: 1,
                mb: 3,
                bgcolor: "#f9fffa",
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  p: 1,
                  bgcolor: "#e3f2fd",
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                Intoxicación y Otros
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "repeat(2, 1fr)",
                    sm: "repeat(3, 1fr)",
                    md: "repeat(4, 1fr)",
                  },
                  p: 1,
                  gap: 1,
                }}
              >
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label="Intoxicación Alcohólica"
                />
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label="Intoxicación Alimentaria"
                />
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label="Intoxicación Por Drogas"
                />
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label="Inhalación de Gases"
                />
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label="Otra Intoxicación"
                />
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label="Picadura"
                />
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label="Envenenamiento"
                />
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label="Anafilaxia"
                />
              </Box>
            </Box>

            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Observaciones:
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              multiline
              rows={2}
              placeholder="Ingrese observaciones adicionales"
              sx={{ mb: 2, bgcolor: "#f9fffa" }}
            />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                p: 1,
                border: "1px solid #e0e0e0",
                borderRadius: 1,
                bgcolor: "#f9fffa",
              }}
            >
              <Typography variant="body1" sx={{ mr: 2, fontWeight: "bold" }}>
                Sugestivo de aliento alcohólico:
              </Typography>
              <FormControlLabel control={<Checkbox />} label="" />
            </Box>
          </CardContent>
        </Card>

        {/* Sección E: Antecedentes Patológicos Personales y Familiares */}
        <Card sx={{ mb: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography
              variant="h6"
              sx={{ mb: 2, fontWeight: "bold", color: "#1A3C6D" }}
            >
              E. ANTECEDENTES PATOLÓGICOS PERSONALES Y FAMILIARES
            </Typography>

            <Typography variant="body2" sx={{ mb: 1 }}>
              Marque los antecedentes familiares o personales que manifieste el
              paciente:
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(2, 1fr)",
                  sm: "repeat(3, 1fr)",
                  md: "repeat(5, 1fr)",
                },
                gap: 2,
                mb: 3,
                p: 2,
                border: "1px solid #e0e0e0",
                borderRadius: 1,
                bgcolor: "#f9fffa",
              }}
            >
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="1. Alérgicos"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="2. Clínicos"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="3. Ginecológicos"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="4. Traumatológicos"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="5. Pediátricos"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="6. Quirúrgicos"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="7. Farmacológicos"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="8. Hábitos"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="9. Familiares"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="10. Otros"
              />
            </Box>

            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Descripción de antecedentes:
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              multiline
              rows={4}
              placeholder="Describa los antecedentes patológicos del paciente. En caso de no presentar antecedentes, escriba 'No refiere antecedentes'."
              sx={{ bgcolor: "#f9fffa" }}
            />
          </CardContent>
        </Card>

        {/* Sección F: Enfermedad o Problema Actual */}
        <Card sx={{ mb: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography
              variant="h6"
              sx={{ mb: 2, fontWeight: "bold", color: "#1A3C6D" }}
            >
              F. ENFERMEDAD O PROBLEMA ACTUAL
            </Typography>

            <TextField
              fullWidth
              variant="outlined"
              size="small"
              multiline
              rows={6}
              placeholder="Describa la enfermedad o problema actual que está cursando el paciente"
              sx={{ bgcolor: "#f9fffa" }}
            />
          </CardContent>
        </Card>

        {/* Sección G: Constantes vitales y Antropometría */}
        <Card sx={{ mb: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography
              variant="h6"
              sx={{ mb: 2, fontWeight: "bold", color: "#1A3C6D" }}
            >
              G. CONSTANTES VITALES Y ANTROPOMETRÍA
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                mb: 3,
              }}
            >
              <Box sx={{ flex: "1 1 200px", mb: 2 }}>
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label="1. Sin constantes vitales"
                />
              </Box>
              <Box sx={{ flex: "1 1 200px" }}>
                <TextField
                  label="2. Presión arterial (mmHg)"
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={{ bgcolor: "#f9fffa" }}
                />
              </Box>
              <Box sx={{ flex: "1 1 200px" }}>
                <TextField
                  label="3. Pulso/min"
                  fullWidth
                  variant="outlined"
                  size="small"
                  type="number"
                  sx={{ bgcolor: "#f9fffa" }}
                />
              </Box>
              <Box sx={{ flex: "1 1 200px" }}>
                <TextField
                  label="4. Frecuencia Respiratoria/min"
                  fullWidth
                  variant="outlined"
                  size="small"
                  type="number"
                  sx={{ bgcolor: "#f9fffa" }}
                />
              </Box>
              <Box sx={{ flex: "1 1 200px" }}>
                <TextField
                  label="5. Pulsioximetría"
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={{ bgcolor: "#f9fffa" }}
                />
              </Box>
              <Box sx={{ flex: "1 1 200px" }}>
                <TextField
                  label="6. Perímetro Cefálico (cm)"
                  fullWidth
                  variant="outlined"
                  size="small"
                  type="number"
                  sx={{ bgcolor: "#f9fffa" }}
                />
              </Box>
              <Box sx={{ flex: "1 1 200px" }}>
                <TextField
                  label="7. Peso (Kg)"
                  fullWidth
                  variant="outlined"
                  size="small"
                  type="number"
                  sx={{ bgcolor: "#f9fffa" }}
                />
              </Box>
              <Box sx={{ flex: "1 1 200px" }}>
                <TextField
                  label="8. Talla (cm)"
                  fullWidth
                  variant="outlined"
                  size="small"
                  type="number"
                  sx={{ bgcolor: "#f9fffa" }}
                />
              </Box>
              <Box sx={{ flex: "1 1 200px" }}>
                <TextField
                  label="9. Glicemia Capilar (mg/dl)"
                  fullWidth
                  variant="outlined"
                  size="small"
                  type="number"
                  sx={{ bgcolor: "#f9fffa" }}
                />
              </Box>
            </Box>

            {/* Glasgow */}
            <Typography
              variant="subtitle1"
              sx={{
                mb: 2,
                fontWeight: "bold",
                borderTop: "1px solid #e0e0e0",
                pt: 2,
              }}
            >
              10. Glasgow Inicial
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                mb: 3,
                p: 2,
                border: "1px solid #e0e0e0",
                borderRadius: 1,
                bgcolor: "#f9fffa",
              }}
            >
              <Box sx={{ flex: "1 1 150px" }}>
                <TextField
                  label="Ocular (4)"
                  fullWidth
                  variant="outlined"
                  size="small"
                  type="number"
                  InputProps={{ inputProps: { min: 1, max: 4 } }}
                />
              </Box>
              <Box sx={{ flex: "1 1 150px" }}>
                <TextField
                  label="Verbal (5)"
                  fullWidth
                  variant="outlined"
                  size="small"
                  type="number"
                  InputProps={{ inputProps: { min: 1, max: 5 } }}
                />
              </Box>
              <Box sx={{ flex: "1 1 150px" }}>
                <TextField
                  label="Motora (6)"
                  fullWidth
                  variant="outlined"
                  size="small"
                  type="number"
                  InputProps={{ inputProps: { min: 1, max: 6 } }}
                />
              </Box>
              <Box sx={{ flex: "1 1 150px" }}>
                <TextField
                  label="Reacción Pupilar Der"
                  fullWidth
                  variant="outlined"
                  size="small"
                />
              </Box>
              <Box sx={{ flex: "1 1 150px" }}>
                <TextField
                  label="Reacción Pupilar Izq"
                  fullWidth
                  variant="outlined"
                  size="small"
                />
              </Box>
              <Box sx={{ flex: "1 1 150px" }}>
                <TextField
                  label="T. Llenado Capilar"
                  fullWidth
                  variant="outlined"
                  size="small"
                />
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Sección H: Examen Físico */}
        <Card sx={{ mb: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography
              variant="h6"
              sx={{ mb: 2, fontWeight: "bold", color: "#1A3C6D" }}
            >
              H. EXAMEN FÍSICO
            </Typography>

            <Typography variant="body2" sx={{ mb: 1 }}>
              Seleccione las áreas examinadas:
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                },
                gap: 1,
                mb: 3,
                p: 2,
                border: "1px solid #e0e0e0",
                borderRadius: 1,
                bgcolor: "#f9fffa",
              }}
            >
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="1. Piel - Faneras"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="2. Cabeza"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="3. Ojos"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="4. Oidos"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="5. Nariz"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="6. Boca"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="7. Orofaringe"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="8. Cuello"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="9. Axilas - Mamas"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="10. Tórax"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="11. Abdomen"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="12. Vertebral"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="13. Ingle - Periné"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="14. Miembros Superiores"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="15. Miembros Inferiores"
              />
            </Box>

            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Descripción de hallazgos:
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              multiline
              rows={4}
              placeholder="Describa los hallazgos encontrados en el examen físico"
              sx={{ bgcolor: "#f9fffa" }}
            />
          </CardContent>
        </Card>
        <Card sx={{ mb: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography
              variant="h6"
              sx={{ mb: 2, fontWeight: "bold", color: "#1A3C6D" }}
            >
              I. EXAMEN FÍSICO DE TRAUMA/CRÍTICO
            </Typography>

            <TextField
              label="Descripción del examen físico de trauma/crítico"
              fullWidth
              variant="outlined"
              size="small"
              multiline
              rows={6}
              placeholder="Describa detalladamente el examen físico de trauma/crítico realizado al paciente"
              sx={{ bgcolor: "#f9fffa" }}
            />
          </CardContent>
        </Card>

        {/* Sección J: Embarazo - Parto */}
        <Card sx={{ mb: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography
              variant="h6"
              sx={{ mb: 2, fontWeight: "bold", color: "#1A3C6D" }}
            >
              J. EMBARAZO - PARTO
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3 }}>
              <Box sx={{ flex: "1 1 150px" }}>
                <TextField
                  label="Número Gestas"
                  type="number"
                  fullWidth
                  variant="outlined"
                  size="small"
                  InputProps={{ inputProps: { min: 0 } }}
                  sx={{ bgcolor: "#f9fffa" }}
                />
              </Box>
              <Box sx={{ flex: "1 1 150px" }}>
                <TextField
                  label="Número Partos"
                  type="number"
                  fullWidth
                  variant="outlined"
                  size="small"
                  InputProps={{ inputProps: { min: 0 } }}
                  sx={{ bgcolor: "#f9fffa" }}
                />
              </Box>
              <Box sx={{ flex: "1 1 150px" }}>
                <TextField
                  label="Número Abortos"
                  type="number"
                  fullWidth
                  variant="outlined"
                  size="small"
                  InputProps={{ inputProps: { min: 0 } }}
                  sx={{ bgcolor: "#f9fffa" }}
                />
              </Box>
              <Box sx={{ flex: "1 1 150px" }}>
                <TextField
                  label="Número Cesáreas"
                  type="number"
                  fullWidth
                  variant="outlined"
                  size="small"
                  InputProps={{ inputProps: { min: 0 } }}
                  sx={{ bgcolor: "#f9fffa" }}
                />
              </Box>
            </Box>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3 }}>
              <Box sx={{ flex: "1 1 150px" }}>
                <TextField
                  label="FUM (DD/MM/YYYY)"
                  fullWidth
                  variant="outlined"
                  size="small"
                  placeholder="DD/MM/YYYY"
                  sx={{ bgcolor: "#f9fffa" }}
                />
              </Box>
              <Box sx={{ flex: "1 1 150px" }}>
                <TextField
                  label="Semanas Gestación"
                  type="number"
                  fullWidth
                  variant="outlined"
                  size="small"
                  InputProps={{ inputProps: { min: 0, max: 42 } }}
                  sx={{ bgcolor: "#f9fffa" }}
                />
              </Box>
              <Box
                sx={{ flex: "1 1 150px", display: "flex", alignItems: "center" }}
              >
                <FormControlLabel
                  control={<Checkbox />}
                  label="Movimiento fetal"
                  sx={{
                    bgcolor: "#f9fffa",
                    p: 1,
                    borderRadius: 1,
                    width: "100%",
                  }}
                />
              </Box>
              <Box sx={{ flex: "1 1 150px" }}>
                <TextField
                  label="Frecuencia cardíaca fetal"
                  fullWidth
                  variant="outlined"
                  size="small"
                  placeholder="x min"
                  sx={{ bgcolor: "#f9fffa" }}
                />
              </Box>
            </Box>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3 }}>
              <Box sx={{ flex: "1 1 150px" }}>
                <TextField
                  label="Ruptura de Membranas"
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={{ bgcolor: "#f9fffa" }}
                />
              </Box>
              <Box sx={{ flex: "1 1 150px" }}>
                <TextField
                  label="Tiempo (hrs)"
                  type="number"
                  fullWidth
                  variant="outlined"
                  size="small"
                  InputProps={{ inputProps: { min: 0 } }}
                  sx={{ bgcolor: "#f9fffa" }}
                />
              </Box>
              <Box sx={{ flex: "1 1 150px" }}>
                <TextField
                  label="AFU"
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={{ bgcolor: "#f9fffa" }}
                />
              </Box>
              <Box sx={{ flex: "1 1 150px" }}>
                <TextField
                  label="Presentación"
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={{ bgcolor: "#f9fffa" }}
                />
              </Box>
            </Box>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3 }}>
              <Box sx={{ flex: "1 1 150px" }}>
                <TextField
                  label="Dilatación (cm)"
                  type="number"
                  fullWidth
                  variant="outlined"
                  size="small"
                  InputProps={{ inputProps: { min: 0, max: 10 } }}
                  sx={{ bgcolor: "#f9fffa" }}
                />
              </Box>
              <Box sx={{ flex: "1 1 150px" }}>
                <TextField
                  label="Borramiento (%)"
                  type="number"
                  fullWidth
                  variant="outlined"
                  size="small"
                  InputProps={{ inputProps: { min: 0, max: 100 } }}
                  sx={{ bgcolor: "#f9fffa" }}
                />
              </Box>
              <Box sx={{ flex: "1 1 150px" }}>
                <TextField
                  label="Plano"
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={{ bgcolor: "#f9fffa" }}
                />
              </Box>
              <Box sx={{ flex: "1 1 150px" }}>
                <TextField
                  label="Pelvis viable"
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={{ bgcolor: "#f9fffa" }}
                />
              </Box>
            </Box>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3 }}>
              <Box sx={{ flex: "1 1 150px" }}>
                <TextField
                  label="Sangrado vaginal"
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={{ bgcolor: "#f9fffa" }}
                />
              </Box>
              <Box sx={{ flex: "1 1 150px" }}>
                <TextField
                  label="Contracciones"
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={{ bgcolor: "#f9fffa" }}
                />
              </Box>
              <Box sx={{ flex: "1 1 150px" }}>
                <TextField
                  label="Score Mamá"
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={{ bgcolor: "#f9fffa" }}
                />
              </Box>
            </Box>

            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Descripción adicional:
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              multiline
              rows={4}
              placeholder="Describa información adicional relevante sobre el embarazo o parto"
              sx={{ bgcolor: "#f9fffa" }}
            />
          </CardContent>
        </Card>
        {/* Sección K: Exámenes Complementarios */}
        <Card sx={{ mb: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography
              variant="h6"
              sx={{ mb: 2, fontWeight: "bold", color: "#1A3C6D" }}
            >
              K. EXÁMENES COMPLEMENTARIOS
            </Typography>

            <Typography variant="body2" sx={{ mb: 1 }}>
              Seleccione los exámenes complementarios realizados:
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(4, 1fr)",
                },
                gap: 1,
                mb: 3,
                p: 2,
                border: "1px solid #e0e0e0",
                borderRadius: 1,
                bgcolor: "#f9fffa",
              }}
            >
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="1. Biometría"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="2. Uroanálisis"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="3. Química Sanguínea"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="4. Electrolitos"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="5. Gasometría"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="6. Electro cardiograma"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="7. Endoscopia"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="8. Rx Tórax"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="9. Rx Abdomen"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="10. Rx Ósea"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="11. Ecografía Abdomen"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="12. Ecografía Pélvica"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="13. Tomografía"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="14. Resonancia"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="15. Interconsulta"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="16. Otros"
              />
            </Box>

            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Observaciones:
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              multiline
              rows={3}
              placeholder="Ingrese observaciones sobre los exámenes complementarios"
              sx={{ bgcolor: "#f9fffa" }}
            />
          </CardContent>
        </Card>

        {/* Sección L: Diagnósticos Presuntivos */}
        <Card sx={{ mb: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography
              variant="h6"
              sx={{ mb: 2, fontWeight: "bold", color: "#1A3C6D" }}
            >
              L. DIAGNÓSTICOS PRESUNTIVOS
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {/* Primer diagnóstico */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: { xs: "stretch", md: "center" },
                  gap: 2,
                  p: 2,
                  border: "1px solid #e0e0e0",
                  borderRadius: 1,
                  bgcolor: "#f9fffa",
                }}
              >
                <TextField
                  label="Descripción del diagnóstico"
                  fullWidth
                  variant="outlined"
                  size="small"
                  placeholder="Buscar diagnóstico..."
                  sx={{ flex: 3 }}
                />
                <TextField
                  label="Código CIE-10"
                  variant="outlined"
                  size="small"
                  placeholder="CIE-10"
                  sx={{ flex: 1, minWidth: { xs: "100%", md: "120px" } }}
                />
              </Box>

              {/* Segundo diagnóstico */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: { xs: "stretch", md: "center" },
                  gap: 2,
                  p: 2,
                  border: "1px solid #e0e0e0",
                  borderRadius: 1,
                  bgcolor: "#f9fffa",
                }}
              >
                <TextField
                  label="Descripción del diagnóstico"
                  fullWidth
                  variant="outlined"
                  size="small"
                  placeholder="Buscar diagnóstico..."
                  sx={{ flex: 3 }}
                />
                <TextField
                  label="Código CIE-10"
                  variant="outlined"
                  size="small"
                  placeholder="CIE-10"
                  sx={{ flex: 1, minWidth: { xs: "100%", md: "120px" } }}
                />
              </Box>

              {/* Tercer diagnóstico */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: { xs: "stretch", md: "center" },
                  gap: 2,
                  p: 2,
                  border: "1px solid #e0e0e0",
                  borderRadius: 1,
                  bgcolor: "#f9fffa",
                }}
              >
                <TextField
                  label="Descripción del diagnóstico"
                  fullWidth
                  variant="outlined"
                  size="small"
                  placeholder="Buscar diagnóstico..."
                  sx={{ flex: 3 }}
                />
                <TextField
                  label="Código CIE-10"
                  variant="outlined"
                  size="small"
                  placeholder="CIE-10"
                  sx={{ flex: 1, minWidth: { xs: "100%", md: "120px" } }}
                />
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Sección M: Diagnósticos Definitivos */}
        <Card sx={{ mb: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography
              variant="h6"
              sx={{ mb: 2, fontWeight: "bold", color: "#1A3C6D" }}
            >
              M. DIAGNÓSTICOS DEFINITIVOS
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {/* Primer diagnóstico definitivo */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: { xs: "stretch", md: "center" },
                  gap: 2,
                  p: 2,
                  border: "1px solid #e0e0e0",
                  borderRadius: 1,
                  bgcolor: "#f9fffa",
                }}
              >
                <TextField
                  label="Descripción del diagnóstico definitivo"
                  fullWidth
                  variant="outlined"
                  size="small"
                  placeholder="Buscar diagnóstico..."
                  sx={{ flex: 3 }}
                />
                <TextField
                  label="Código CIE-10"
                  variant="outlined"
                  size="small"
                  placeholder="CIE-10"
                  sx={{ flex: 1, minWidth: { xs: "100%", md: "120px" } }}
                />
              </Box>

              {/* Segundo diagnóstico definitivo */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: { xs: "stretch", md: "center" },
                  gap: 2,
                  p: 2,
                  border: "1px solid #e0e0e0",
                  borderRadius: 1,
                  bgcolor: "#f9fffa",
                }}
              >
                <TextField
                  label="Descripción del diagnóstico definitivo"
                  fullWidth
                  variant="outlined"
                  size="small"
                  placeholder="Buscar diagnóstico..."
                  sx={{ flex: 3 }}
                />
                <TextField
                  label="Código CIE-10"
                  variant="outlined"
                  size="small"
                  placeholder="CIE-10"
                  sx={{ flex: 1, minWidth: { xs: "100%", md: "120px" } }}
                />
              </Box>

              {/* Tercer diagnóstico definitivo */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: { xs: "stretch", md: "center" },
                  gap: 2,
                  p: 2,
                  border: "1px solid #e0e0e0",
                  borderRadius: 1,
                  bgcolor: "#f9fffa",
                }}
              >
                <TextField
                  label="Descripción del diagnóstico definitivo"
                  fullWidth
                  variant="outlined"
                  size="small"
                  placeholder="Buscar diagnóstico..."
                  sx={{ flex: 3 }}
                />
                <TextField
                  label="Código CIE-10"
                  variant="outlined"
                  size="small"
                  placeholder="CIE-10"
                  sx={{ flex: 1, minWidth: { xs: "100%", md: "120px" } }}
                />
              </Box>
            </Box>
          </CardContent>
        </Card>
        {/* Sección N: Plan de Tratamiento */}
        <Card sx={{ mb: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography
              variant="h6"
              sx={{ mb: 2, fontWeight: "bold", color: "#1A3C6D" }}
            >
              N. PLAN DE TRATAMIENTO
            </Typography>

            <Box
              component="ol"
              sx={{
                p: 2,
                mb: 2,
                border: "1px solid #e0e0e0",
                borderRadius: 1,
                bgcolor: "#f9fffa",
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {/* Medicamento 1 */}
              <Box
                sx={{
                  mb: 1,
                }}
              >
                <TextField
                  label="Medicamento/Indicación 1"
                  fullWidth
                  variant="outlined"
                  size="small"
                  multiline
                  rows={2}
                  placeholder="Ej: Paracetamol 500mg, 1 tableta vía oral cada 8 horas por 3 días"
                />
              </Box>

              {/* Medicamento 2 */}
              <Box
                sx={{
                  mb: 1,
                }}
              >
                <TextField
                  label="Medicamento/Indicación 2"
                  fullWidth
                  variant="outlined"
                  size="small"
                  multiline
                  rows={2}
                  placeholder="Ej: Ibuprofeno 400mg, 1 tableta vía oral cada 8 horas por 5 días"
                />
              </Box>

              {/* Medicamento 3 */}
              <Box
                sx={{
                  mb: 1,
                }}
              >
                <TextField
                  label="Medicamento/Indicación 3"
                  fullWidth
                  variant="outlined"
                  size="small"
                  multiline
                  rows={2}
                  placeholder="Ej: Amoxicilina 500mg, 1 cápsula vía oral cada 8 horas por 7 días"
                />
              </Box>

              {/* Espacio para más indicaciones */}
              <Box
                sx={{
                  mb: 1,
                }}
              >
                <TextField
                  label="Medicamento/Indicación adicional"
                  fullWidth
                  variant="outlined"
                  size="small"
                  multiline
                  rows={2}
                  placeholder="Ingrese otra indicación o medicamento"
                />
              </Box>
            </Box>

            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Recomendaciones generales:
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              multiline
              rows={3}
              placeholder="Ingrese recomendaciones generales para el paciente"
              sx={{ bgcolor: "#f9fffa" }}
            />
          </CardContent>
        </Card>

        {/* Sección O: Condición al egreso de Emergencia */}
        <Card sx={{ mb: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography
              variant="h6"
              sx={{ mb: 2, fontWeight: "bold", color: "#1A3C6D" }}
            >
              O. CONDICIÓN AL EGRESO DE EMERGENCIA
            </Typography>

            <Typography variant="body2" sx={{ mb: 1 }}>
              Seleccione la situación del paciente al momento del egreso:
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                },
                gap: 1,
                mb: 3,
                p: 2,
                border: "1px solid #e0e0e0",
                borderRadius: 1,
                bgcolor: "#f9fffa",
              }}
            >
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="1. Vivo"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="2. Estable"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="3. Inestable"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="4. Fallecido"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="5. Alta definitiva"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="6. Consulta externa"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="7. Observación de Emergencia"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="8. Hospitalización"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="9. Referencia"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="10. Referencia Inversa"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="11. Derivación"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="12. Establecimiento"
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                mb: 3,
              }}
            >
              <Box sx={{ flex: "0 1 200px" }}>
                <TextField
                  label="Días de reposo"
                  type="number"
                  fullWidth
                  variant="outlined"
                  size="small"
                  InputProps={{ inputProps: { min: 0 } }}
                  sx={{ bgcolor: "#f9fffa" }}
                />
              </Box>
              <Box sx={{ flex: "1 1 300px" }}>
                <TextField
                  label="Observaciones"
                  fullWidth
                  variant="outlined"
                  size="small"
                  multiline
                  rows={1}
                  placeholder="Ingrese observaciones adicionales"
                  sx={{ bgcolor: "#f9fffa" }}
                />
              </Box>
            </Box>

            {/* Datos del médico */}
            <Box
              sx={{
                mt: 4,
                p: 2,
                border: "1px solid #e0e0e0",
                borderRadius: 1,
                bgcolor: "#f9fffa",
              }}
            >
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: "bold" }}>
                DATOS DEL PROFESIONAL
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2,
                }}
              >
                <Box sx={{ flex: "1 1 200px" }}>
                  <TextField
                    label="Nombre del médico"
                    fullWidth
                    variant="outlined"
                    size="small"
                  />
                </Box>
                <Box sx={{ flex: "1 1 200px" }}>
                  <TextField
                    label="Código"
                    fullWidth
                    variant="outlined"
                    size="small"
                  />
                </Box>
                <Box sx={{ flex: "1 1 200px" }}>
                  <TextField
                    label="Firma"
                    fullWidth
                    variant="outlined"
                    size="small"
                    InputProps={{ readOnly: true }}
                  />
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
        {/* Sección P: Datos del Profesional Responsable */}
        <Card sx={{ mb: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography
              variant="h6"
              sx={{ mb: 2, fontWeight: "bold", color: "#1A3C6D" }}
            >
              P. DATOS DEL PROFESIONAL RESPONSABLE
            </Typography>

            <Typography variant="body2" sx={{ mb: 2, fontStyle: "italic" }}>
              Datos del médico que realiza la atención (generados
              automáticamente).
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3 }}>
              <Box sx={{ flex: "1 1 200px" }}>
                <TextField
                  label="Fecha (DD/MM/YYYY)"
                  value={new Date().toLocaleDateString("es-EC")}
                  fullWidth
                  variant="outlined"
                  size="small"
                  InputProps={{ readOnly: true }}
                  sx={{ bgcolor: "#f9fffa" }}
                />
              </Box>
              <Box sx={{ flex: "1 1 200px" }}>
                <TextField
                  label="Hora (HH:MM)"
                  value={new Date().toLocaleTimeString("es-EC", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  fullWidth
                  variant="outlined"
                  size="small"
                  InputProps={{ readOnly: true }}
                  sx={{ bgcolor: "#f9fffa" }}
                />
              </Box>
              <Box sx={{ flex: "1 1 200px" }}>
                <TextField
                  label="Número de documento de identificación"
                  defaultValue="0987654321"
                  fullWidth
                  variant="outlined"
                  size="small"
                  InputProps={{ readOnly: true }}
                  sx={{ bgcolor: "#f9fffa" }}
                />
              </Box>
            </Box>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 4 }}>
              <Box sx={{ flex: "1 1 200px" }}>
                <TextField
                  label="Primer nombre"
                  defaultValue="Carlos"
                  fullWidth
                  variant="outlined"
                  size="small"
                  InputProps={{ readOnly: true }}
                  sx={{ bgcolor: "#f9fffa" }}
                />
              </Box>
              <Box sx={{ flex: "1 1 200px" }}>
                <TextField
                  label="Primer apellido"
                  defaultValue="Rodríguez"
                  fullWidth
                  variant="outlined"
                  size="small"
                  InputProps={{ readOnly: true }}
                  sx={{ bgcolor: "#f9fffa" }}
                />
              </Box>
              <Box sx={{ flex: "1 1 200px" }}>
                <TextField
                  label="Segundo apellido"
                  defaultValue="Méndez"
                  fullWidth
                  variant="outlined"
                  size="small"
                  InputProps={{ readOnly: true }}
                  sx={{ bgcolor: "#f9fffa" }}
                />
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 4,
                justifyContent: "center",
                mb: 2,
              }}
            >
              <Box
                sx={{
                  flex: "1 1 300px",
                  maxWidth: "300px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Firma digital:
                </Typography>
                <Box
                  sx={{
                    width: "100%",
                    height: "100px",
                    border: "1px dashed #ccc",
                    borderRadius: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    bgcolor: "#f9fffa",
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    [Firma digital del médico]
                  </Typography>
                </Box>
                <Typography
                  variant="caption"
                  sx={{ mt: 1, color: "text.secondary" }}
                >
                  Cargada automáticamente de la base de datos
                </Typography>
              </Box>

              <Box
                sx={{
                  flex: "1 1 300px",
                  maxWidth: "300px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Sello:
                </Typography>
                <Box
                  sx={{
                    width: "100%",
                    height: "100px",
                    border: "1px dashed #ccc",
                    borderRadius: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    bgcolor: "#f9fffa",
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    [Sello del médico]
                  </Typography>
                </Box>
                <Typography
                  variant="caption"
                  sx={{ mt: 1, color: "text.secondary" }}
                >
                  Cargado automáticamente de la base de datos
                </Typography>
              </Box>
            </Box>

            <Typography
              variant="body2"
              sx={{
                mt: 2,
                textAlign: "center",
                fontStyle: "italic",
                color: "text.secondary",
              }}
            >
              Nota: Estos datos se obtienen automáticamente del médico que ingresó
              los datos de la hoja de Emergencia (Formulario 008 MSP).
            </Typography>
          </CardContent>
        </Card>
    </Box>
  );
}
