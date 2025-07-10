import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Paper,
  Divider,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const nacionalidades = [
  "Ecuatoriana",
  "Colombiana",
  "Peruana",
  "Venezolana",
  "Otra",
];

const estadosCiviles = [
  "SOLTERO",
  "CASADO",
  "DIVORCIADO",
  "VIUDO",
  "UNIÓN LIBRE",
  "UNIÓN DE HECHO",
];

const tiposIdentificacion = [
  "Cédula",
  "Pasaporte",
  "Carnet/refugiado",
  "Sin documento",
];

const nivelesEducacion = ["PRIMARIA", "SECUNDARIA", "SUPERIOR", "NINGUNO"];

const estadoNivelEducacion = ["TERMINADO", "EN CURSO"];

const tiposEmpresa = ["Pública", "Privada"];

const segurosSalud = ["ISSPOL", "ISSFA", "Privado", "Ninguno"];

const parentescos = [
  "HIJO(A)",
  "ESPOSO(A)",
  "HERMANO(A)",
  "MADRE",
  "PADRE",
  "SOBRINO(A)",
  "SUEGRO(A)",
  "TÍO(A)",
  "PRIMO(A)",
  "CUÑADO(A)",
  "ABUELO(A)",
  "NUERA",
  "YERNO",
  "OTROS",
];

const formasLlegada = ["Ambulatorio", "Ambulancia", "Otro transporte"];

const categoriasConvenio = [
  "PARTICULARES",
  "SEGUROS",
  "CORPORATIVOS",
  "AFILIACION",
  "LATINA PREPAGADA",
  "LATINA SEGUROS",
  "PAN AMERICAN LIFE",
];

const convenios = ["LATINA PREPAGADA", "LATINA SEGUROS", "PAN AMERICAN LIFE"];

// Define un tamaño estándar para todos los TextField
const textFieldProps = {
  size: "small" as const,
  fullWidth: true,
  InputProps: { style: { fontSize: 15, height: 40 } },
  InputLabelProps: { style: { fontSize: 15 } },
};

// Props estándar para Select y FormControl para igualar el porte de los TextField y hacerlos largos
const selectProps = {
  size: "small" as const,
  fullWidth: true,
  sx: { fontSize: 15, height: 40, minHeight: 40, minWidth: 220 }, // minWidth grande para ver bien el label
  MenuProps: { PaperProps: { style: { fontSize: 15 } } },
};
const formControlProps = {
  size: "small" as const,
  fullWidth: true,
  sx: { minHeight: 40, minWidth: 220 }, // minWidth grande para ver bien el label
};

const Admision: React.FC = () => {
  // Estado para Extranjero y Nacionalidad
  const [esExtranjero, setEsExtranjero] = useState(false);
  const [nacionalidad, setNacionalidad] = useState("Ecuatoriana");
  // Estado para Fecha de Nacimiento y Edad
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [edad, setEdad] = useState("");

  // Calcular edad automáticamente al cambiar la fecha de nacimiento
  const handleFechaNacimiento = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fecha = e.target.value;
    setFechaNacimiento(fecha);
    if (fecha) {
      const hoy = new Date();
      const nacimiento = new Date(fecha);
      let years = hoy.getFullYear() - nacimiento.getFullYear();
      const m = hoy.getMonth() - nacimiento.getMonth();
      if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
        years--;
      }
      setEdad(years >= 0 ? years.toString() : "");
    } else {
      setEdad("");
    }
  };

  return (
    <Box className="root-container">
      <Paper
        elevation={8}
        sx={{
          borderRadius: 4,
          bgcolor: "#FFFFFF",
          border: "3px solid #4A90E2",
          width: "100%",
          mx: "auto",
          p: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            color: "#1A3C6D",
            textAlign: "left",
            mb: 3,
          }}
        >
          ADMISION PACIENTE
        </Typography>

        {/* DATOS IDENTIFICATORIOS */}
        <SectionTitle title="Datos Identificatorios" />
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={3}>
            <TextField label="Apellido Paterno" required {...textFieldProps} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField label="Apellido Materno" required {...textFieldProps} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField label="Primer Nombre" required {...textFieldProps} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField label="Segundo Nombre" {...textFieldProps} />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField label="Historia Clínica" {...textFieldProps} />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              label="Cédula"
              {...textFieldProps}
              InputProps={{
                ...textFieldProps.InputProps,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="buscar por cédula">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Sexo</InputLabel>
              <Select label="Sexo" sx={{ minWidth: 120 }}>
                <MenuItem value="M">Masculino</MenuItem>
                <MenuItem value="F">Femenino</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Fecha de Nacimiento"
              type="date"
              {...textFieldProps}
              InputLabelProps={{
                ...textFieldProps.InputLabelProps,
                shrink: true,
              }}
              value={fechaNacimiento}
              onChange={handleFechaNacimiento}
            />
          </Grid>
          <Grid item xs={12} sm={1}>
            <TextField
              label="Edad"
              {...textFieldProps}
              sx={{ maxWidth: 80 }}
              value={edad}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={1}>
            <FormControlLabel control={<Checkbox />} label="Aprox." />
          </Grid>
          <Grid item xs={12} sm={1}>
            <FormControlLabel control={<Checkbox />} label="RN" />
          </Grid>
        </Grid>

        {/* PACIENTES EXISTENTES */}
        <SectionTitle title="Provincia, Cantón y Parroquia" />
        <Grid container spacing={2} sx={{ mb: 2 }}>
          {/* Extranjero como checkbox */}
          <Grid item xs={12} sm={2}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={esExtranjero}
                  onChange={(_, checked) => {
                    setEsExtranjero(checked);
                    setNacionalidad(checked ? "" : "Ecuatoriana");
                  }}
                />
              }
              label="Extranjero"
            />
          </Grid>
          {/* Nacionalidad habilitada solo si es extranjero */}
          <Grid item xs={12} sm={2}>
            <FormControl {...formControlProps} disabled={!esExtranjero}>
              <InputLabel>Nacionalidad</InputLabel>
              <Select
                label="Nacionalidad"
                {...selectProps}
                value={esExtranjero ? nacionalidad : "Ecuatoriana"}
                onChange={(e) => setNacionalidad(e.target.value)}
              >
                {nacionalidades.map((nac) => (
                  <MenuItem key={nac} value={nac}>
                    {nac}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {/* País */}
          <Grid item xs={12} sm={2}>
            <FormControl fullWidth size="small" sx={{ minWidth: 120 }}>
              <InputLabel>País</InputLabel>
              <Select label="País" sx={{ minWidth: 120 }}>
                <MenuItem value="ECUADOR">Ecuador</MenuItem>
                <MenuItem value="OTRO">Otro</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {/* Provincia */}
          <Grid item xs={12} sm={2}>
            <FormControl {...formControlProps}>
              <InputLabel>Provincia Reside</InputLabel>
              <Select label="Provincia Reside" {...selectProps}>
                <MenuItem value="IMBABURA">Imbabura</MenuItem>
                <MenuItem value="PICHINCHA">Pichincha</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {/* Cantón */}
          <Grid item xs={12} sm={2}>
            <FormControl {...formControlProps}>
              <InputLabel>Cantón Reside</InputLabel>
              <Select label="Cantón Reside" {...selectProps}>
                <MenuItem value="GUAYAQUIL">Guayaquil</MenuItem>
                <MenuItem value="OTRO">Otro</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {/* Estado Civil */}
          <Grid item xs={12} sm={2}>
            <FormControl {...formControlProps}>
              <InputLabel>Estado Civil</InputLabel>
              <Select label="Estado Civil" {...selectProps}>
                {estadosCiviles.map((estado) => (
                  <MenuItem key={estado} value={estado}>
                    {estado}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={2}>
            <TextField label="Dirección" {...textFieldProps} />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField label="Barrio/Sector" {...textFieldProps} />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField label="C. Principal" {...textFieldProps} />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField label="C. Secundaria" {...textFieldProps} />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField label="Lugar Nacimiento" {...textFieldProps} />
          </Grid>
        </Grid>

        {/* TELEFONOS PACIENTES */}
        <SectionTitle title="Teléfonos Pacientes" />
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={4}>
            <TextField label="Medio" {...textFieldProps} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Número" {...textFieldProps} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Observación" {...textFieldProps} />
          </Grid>
        </Grid>

        {/* DATOS CONVENIOS */}
        <SectionTitle title="Datos Convenios" />
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={4}>
            <FormControl {...formControlProps}>
              <InputLabel>Categoría</InputLabel>
              <Select label="Categoría" {...selectProps}>
                {categoriasConvenio.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl {...formControlProps}>
              <InputLabel>Convenio</InputLabel>
              <Select label="Convenio" {...selectProps}>
                {convenios.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Empresa" {...textFieldProps} />
          </Grid>
        </Grid>

        {/* DATOS COMPLEMENTARIOS HOJA ADMISION */}
        <SectionTitle title="Datos Complementarios Hoja Admisión" />
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={3}>
            <FormControl {...formControlProps}>
              <InputLabel>Nivel de Instrucción</InputLabel>
              <Select label="Nivel de Instrucción" {...selectProps}>
                {nivelesEducacion.map((nivel) => (
                  <MenuItem key={nivel} value={nivel}>
                    {nivel}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl {...formControlProps}>
              <InputLabel>Estado Nivel Educación</InputLabel>
              <Select label="Estado Nivel Educación" {...selectProps}>
                {estadoNivelEducacion.map((estado) => (
                  <MenuItem key={estado} value={estado}>
                    {estado}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Ocupación y Empresa Trabajo"
              {...textFieldProps}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl {...formControlProps}>
              <InputLabel>Tipo Empresa</InputLabel>
              <Select label="Tipo Empresa" {...selectProps}>
                {tiposEmpresa.map((tipo) => (
                  <MenuItem key={tipo} value={tipo}>
                    {tipo}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField label="Etnia" {...textFieldProps} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField label="Nacionalidad Étnica" {...textFieldProps} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField label="Pueblo" {...textFieldProps} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField label="Grupo Cultural / Zona" {...textFieldProps} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField label="Grupo Prioritario" {...textFieldProps} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField label="Tipo Bono" {...textFieldProps} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField label="Médico Tratante" {...textFieldProps} />
          </Grid>
        </Grid>

        {/* EN CASO NECESARIO LLAMAR A */}
        <SectionTitle title="En caso necesario llamar a:" />
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={2}>
            <TextField label="Cédula" {...textFieldProps} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField label="Nombre" {...textFieldProps} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl {...formControlProps}>
              <InputLabel>Afínidad</InputLabel>
              <Select label="Afínidad" {...selectProps}>
                {parentescos.map((par) => (
                  <MenuItem key={par} value={par}>
                    {par}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField label="Dirección" {...textFieldProps} />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField label="Teléfono" {...textFieldProps} />
          </Grid>
        </Grid>

        {/* OPCIONES */}
        <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
          <Button variant="contained" color="primary">
            Registrar
          </Button>
          <Button variant="outlined" color="primary" disabled>
            Actualizar
          </Button>
          <Button variant="contained" color="secondary">
            Nuevo
          </Button>
          <Button variant="outlined" color="secondary">
            Volver
          </Button>
        </Box>
        <Box sx={{ mt: 2, textAlign: "right" }}>
          <Typography variant="caption" color="text.secondary">
            {new Date().toLocaleDateString()}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

// Componente para el Título de Sección
interface SectionTitleProps {
  title: string;
}
const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => (
  <Box sx={{ mt: 3, mb: 1 }}>
    <Divider sx={{ mb: 1, borderColor: "#B6D7ED", borderWidth: 2 }} />
    <Typography
      variant="h6"
      fontWeight={700}
      color="#1A3C6D"
      sx={{ fontSize: { xs: "1rem", sm: "1.2rem" } }}
    >
      {title}
    </Typography>
  </Box>
);

export default Admision;
