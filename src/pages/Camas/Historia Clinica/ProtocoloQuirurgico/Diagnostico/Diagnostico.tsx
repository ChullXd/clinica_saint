import React, { useState } from "react";
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
  Paper,
  Checkbox
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

// Interfaz para diagnósticos
interface Diagnostico {
  descripcion: string;
  codigo: string;
  preOperatorio: boolean;
  postOperatorio: boolean;
}

export default function Diagnostico() {
  const [diagnosticos, setDiagnosticos] = useState<Diagnostico[]>([
    { descripcion: "Apendicitis aguda", codigo: "K35.8", preOperatorio: true, postOperatorio: false },
    { descripcion: "", codigo: "", preOperatorio: false, postOperatorio: false }
  ]);

  const [busquedaCIE, setBusquedaCIE] = useState("");

  // Función para actualizar un diagnóstico
  const handleUpdateDiagnostico = (index: number, field: string, value: any) => {
    const newDiagnosticos = [...diagnosticos];
    // @ts-ignore
    newDiagnosticos[index][field] = value;
    setDiagnosticos(newDiagnosticos);
  };

  // Función para agregar una nueva fila de diagnóstico
  const handleAddDiagnostico = () => {
    setDiagnosticos([...diagnosticos, { descripcion: "", codigo: "", preOperatorio: false, postOperatorio: false }]);
  };

  // Función para simular búsqueda de CIE
  const handleBuscarCIE = () => {
    // Aquí iría la lógica real para buscar códigos CIE
    alert("Función para buscar códigos CIE");
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
            B.DIAGNÓSTICOS PRE Y POST-OPERATORIOS
          </Typography>
          
          {/* Buscador de CIE */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 1.5 }}>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 65%' } }}>
              <TextField
                label="Buscar en catálogo CIE-10"
                value={busquedaCIE}
                onChange={(e) => setBusquedaCIE(e.target.value)}
                size="small"
                fullWidth
                placeholder="Escriba para buscar diagnóstico"
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
              />
            </Box>
          </Box>

          {/* Tabla de diagnósticos */}
          <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: "0.8rem" }}>Descripción</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', width: '120px', fontSize: "0.8rem" }}>Código CIE</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', width: '120px', fontSize: "0.8rem" }}>Pre-operatorio</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', width: '120px', fontSize: "0.8rem" }}>Post-operatorio</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {diagnosticos.map((diagnostico, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <TextField
                        value={diagnostico.descripcion}
                        onChange={(e) => handleUpdateDiagnostico(index, 'descripcion', e.target.value)}
                        size="small"
                        fullWidth
                        placeholder="Descripción del diagnóstico"
                        InputProps={{ sx: { fontSize: "0.8rem" } }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={diagnostico.codigo}
                        onChange={(e) => handleUpdateDiagnostico(index, 'codigo', e.target.value)}
                        size="small"
                        fullWidth
                        placeholder="CIE-10"
                        InputProps={{ sx: { fontSize: "0.8rem" } }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Checkbox
                        checked={diagnostico.preOperatorio}
                        onChange={(e) => handleUpdateDiagnostico(index, 'preOperatorio', e.target.checked)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Checkbox
                        checked={diagnostico.postOperatorio}
                        onChange={(e) => handleUpdateDiagnostico(index, 'postOperatorio', e.target.checked)}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Button
            variant="outlined"
            onClick={handleAddDiagnostico}
            size="small"
            sx={{ 
              color: '#1A3C6D', 
              borderColor: '#1A3C6D',
              fontSize: "0.8rem" 
            }}
          >
            AGREGAR DIAGNÓSTICO
          </Button>
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
            OPERACIÓN REALIZADA
          </Typography>
          
          <TextField
            label="Descripción de la operación realizada"
            multiline
            rows={4}
            fullWidth
            placeholder="Describa la operación realizada"
            sx={{ mb: 2 }}
            InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
            InputProps={{ sx: { fontSize: "0.8rem" } }}
          />
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%' } }}>
              <TextField
                label="Código CIAP-2"
                fullWidth
                size="small"
                placeholder="Código de clasificación"
                helperText="Clasificación Internacional de Atención Primaria"
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                InputProps={{ sx: { fontSize: "0.8rem" } }}
                FormHelperTextProps={{ sx: { fontSize: "0.7rem" } }}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}