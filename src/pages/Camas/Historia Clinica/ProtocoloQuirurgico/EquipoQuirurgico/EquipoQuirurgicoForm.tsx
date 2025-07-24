import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";
import { 
  Add as AddIcon,
  Delete as DeleteIcon
} from "@mui/icons-material";
import { useState } from "react";

// Interfaz para los miembros del equipo quirúrgico
interface MiembroEquipo {
  id: number;
  rol: string;
  nombre: string;
  codigo: string;
}

export default function EquipoQuirurgicoForm() {
  // Estado para el equipo quirúrgico
  const [equipoQuirurgico, setEquipoQuirurgico] = useState<MiembroEquipo[]>([
    { id: 1, rol: "Cirujano", nombre: "", codigo: "" },
    { id: 2, rol: "Ayudante", nombre: "", codigo: "" },
    { id: 3, rol: "Anestesiólogo", nombre: "", codigo: "" }
  ]);

  // Estado para el nuevo miembro
  const [nuevoMiembro, setNuevoMiembro] = useState({
    rol: "",
    nombre: "",
    codigo: ""
  });

  // Función para actualizar un miembro existente
  const handleUpdateMiembro = (id: number, field: string, value: string) => {
    setEquipoQuirurgico(equipoQuirurgico.map(miembro => 
      miembro.id === id ? { ...miembro, [field]: value } : miembro
    ));
  };

  // Función para agregar un nuevo miembro
  const handleAddMiembro = () => {
    if (nuevoMiembro.rol && nuevoMiembro.nombre) {
      const newId = Math.max(0, ...equipoQuirurgico.map(m => m.id)) + 1;
      setEquipoQuirurgico([
        ...equipoQuirurgico,
        { ...nuevoMiembro, id: newId }
      ]);
      setNuevoMiembro({ rol: "", nombre: "", codigo: "" });
    }
  };

  // Función para eliminar un miembro
  const handleDeleteMiembro = (id: number) => {
    setEquipoQuirurgico(equipoQuirurgico.filter(miembro => miembro.id !== id));
  };

  return (
    <Box>
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
            D. EQUIPO QUIRÚRGICO
          </Typography>

          <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: "0.8rem" }}>Rol</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: "0.8rem" }}>Nombre</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: "0.8rem" }}>Código</TableCell>
                  <TableCell sx={{ width: '50px' }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {equipoQuirurgico.map((miembro) => (
                  <TableRow key={miembro.id}>
                    <TableCell>
                      <TextField
                        value={miembro.rol}
                        onChange={(e) => handleUpdateMiembro(miembro.id, 'rol', e.target.value)}
                        size="small"
                        fullWidth
                        InputProps={{ sx: { fontSize: "0.8rem" } }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={miembro.nombre}
                        onChange={(e) => handleUpdateMiembro(miembro.id, 'nombre', e.target.value)}
                        size="small"
                        fullWidth
                        InputProps={{ sx: { fontSize: "0.8rem" } }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={miembro.codigo}
                        onChange={(e) => handleUpdateMiembro(miembro.id, 'codigo', e.target.value)}
                        size="small"
                        fullWidth
                        InputProps={{ sx: { fontSize: "0.8rem" } }}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton 
                        size="small" 
                        color="error"
                        onClick={() => handleDeleteMiembro(miembro.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Formulario para agregar nuevo miembro */}
          <Typography 
            variant="subtitle1" 
            gutterBottom
            sx={{ 
              fontWeight: "bold", 
              fontSize: "0.9rem", 
              color: "#1A3C6D"
            }}
          >
            AGREGAR NUEVO MIEMBRO DEL EQUIPO
          </Typography>
          <Box 
            sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 1.5, 
              alignItems: 'center' 
            }}
          >
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 23%' } }}>
              <TextField
                label="Rol"
                value={nuevoMiembro.rol}
                onChange={(e) => setNuevoMiembro({...nuevoMiembro, rol: e.target.value})}
                size="small"
                fullWidth
                placeholder="Ej: Instrumentista"
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                InputProps={{ sx: { fontSize: "0.8rem" } }}
              />
            </Box>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 32%' } }}>
              <TextField
                label="Nombre"
                value={nuevoMiembro.nombre}
                onChange={(e) => setNuevoMiembro({...nuevoMiembro, nombre: e.target.value})}
                size="small"
                fullWidth
                placeholder="Nombre completo"
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                InputProps={{ sx: { fontSize: "0.8rem" } }}
              />
            </Box>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 23%' } }}>
              <TextField
                label="Código"
                value={nuevoMiembro.codigo}
                onChange={(e) => setNuevoMiembro({...nuevoMiembro, codigo: e.target.value})}
                size="small"
                fullWidth
                placeholder="Código profesional"
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                InputProps={{ sx: { fontSize: "0.8rem" } }}
              />
            </Box>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 15%' } }}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddMiembro}
                fullWidth
                size="small"
                sx={{ 
                  height: '40px', 
                  background: "#1A3C6D",
                  "&:hover": { background: "#274472" },
                  fontSize: "0.8rem"
                }}
              >
                AGREGAR
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

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
            E. TIPO DE ANESTESIA
          </Typography>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 32%' } }}>
              <TextField
                label="Tipo de anestesia"
                select
                fullWidth
                size="small"
                SelectProps={{ native: true }}
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                InputProps={{ sx: { fontSize: "0.8rem" } }}
              >
                <option value="">Seleccione...</option>
                <option value="general">General</option>
                <option value="raquídea">Raquídea</option>
                <option value="peridural">Peridural</option>
                <option value="local">Local</option>
                <option value="local-asistida">Local Asistida</option>
                <option value="otra">Otra</option>
              </TextField>
            </Box>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 65%' } }}>
              <TextField
                label="Observaciones"
                fullWidth
                size="small"
                multiline
                rows={2}
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                InputProps={{ sx: { fontSize: "0.8rem" } }}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}