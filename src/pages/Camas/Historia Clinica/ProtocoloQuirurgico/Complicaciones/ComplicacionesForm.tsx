import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputAdornment
} from '@mui/material';

export default function ComplicacionesForm() {
  // Estados para los campos del formulario
  const [complicaciones, setComplicaciones] = useState('');
  const [perdidaSanguinea, setPerdidaSanguinea] = useState('');
  const [sangradoAproximado, setSangradoAproximado] = useState('');
  const [usoMaterialProtetico, setUsoMaterialProtetico] = useState('no');
  const [descripcionMaterial, setDescripcionMaterial] = useState('');

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
            G. COMPLICACIONES DEL PROCEDIMIENTO QUIRÚRGICO
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {/* Campo para las complicaciones */}
            <TextField
              label="COMPLICACIONES"
              value={complicaciones}
              onChange={(e) => setComplicaciones(e.target.value)}
              multiline
              rows={3}
              fullWidth
              inputProps={{ maxLength: 100 }}
              placeholder="Describa las complicaciones presentadas durante el procedimiento (máx. 100 caracteres)"
              InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
              InputProps={{ 
                sx: { fontSize: "0.8rem" },
              }}
              helperText={`${complicaciones.length}/100 caracteres`}
              FormHelperTextProps={{ sx: { fontSize: "0.7rem", textAlign: 'right' } }}
            />

            {/* Campos para pérdida sanguínea y sangrado aproximado */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
              <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%' } }}>
                <TextField
                  label="PÉRDIDA SANGUÍNEA TOTAL"
                  value={perdidaSanguinea}
                  onChange={(e) => {
                    // Solo permitir números
                    const value = e.target.value.replace(/\D/g, '');
                    setPerdidaSanguinea(value);
                  }}
                  fullWidth
                  size="small"
                  inputProps={{ maxLength: 10 }}
                  InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                  InputProps={{ 
                    sx: { fontSize: "0.8rem" },
                    endAdornment: <InputAdornment position="end">ml</InputAdornment>,
                  }}
                />
              </Box>
              <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 48%' } }}>
                <TextField
                  label="SANGRADO APROXIMADO"
                  value={sangradoAproximado}
                  onChange={(e) => {
                    // Solo permitir números
                    const value = e.target.value.replace(/\D/g, '');
                    setSangradoAproximado(value);
                  }}
                  fullWidth
                  size="small"
                  inputProps={{ maxLength: 10 }}
                  InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                  InputProps={{ 
                    sx: { fontSize: "0.8rem" },
                    endAdornment: <InputAdornment position="end">ml</InputAdornment>,
                  }}
                />
              </Box>
            </Box>

            {/* Campo para uso de material protésico */}
            <Box sx={{ mt: 1 }}>
              <FormControl component="fieldset">
                <FormLabel 
                  component="legend" 
                  sx={{ 
                    fontSize: "0.8rem", 
                    fontWeight: "bold",
                    color: "#1A3C6D"
                  }}
                >
                  USO DE MATERIAL PROTÉSICO
                </FormLabel>
                <RadioGroup
                  row
                  value={usoMaterialProtetico}
                  onChange={(e) => setUsoMaterialProtetico(e.target.value)}
                >
                  <FormControlLabel 
                    value="si" 
                    control={<Radio size="small" />} 
                    label={
                      <Typography sx={{ fontSize: "0.8rem" }}>
                        SI
                      </Typography>
                    }
                  />
                  <FormControlLabel 
                    value="no" 
                    control={<Radio size="small" />} 
                    label={
                      <Typography sx={{ fontSize: "0.8rem" }}>
                        NO
                      </Typography>
                    }
                  />
                </RadioGroup>
              </FormControl>
            </Box>

            {/* Descripción del material protésico (solo visible si se seleccionó "SI") */}
            {usoMaterialProtetico === 'si' && (
              <TextField
                label="DESCRIPCIÓN DEL MATERIAL PROTÉSICO"
                value={descripcionMaterial}
                onChange={(e) => setDescripcionMaterial(e.target.value)}
                fullWidth
                size="small"
                inputProps={{ maxLength: 50 }}
                placeholder="Describa el material protésico utilizado (máx. 50 caracteres)"
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
                InputProps={{ sx: { fontSize: "0.8rem" } }}
                helperText={`${descripcionMaterial.length}/50 caracteres`}
                FormHelperTextProps={{ sx: { fontSize: "0.7rem", textAlign: 'right' } }}
              />
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}