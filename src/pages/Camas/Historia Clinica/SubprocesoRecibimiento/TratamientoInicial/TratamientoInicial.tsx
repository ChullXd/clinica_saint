import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Chip,
} from '@mui/material';
import {
  LocalHospital as TratamientoIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Timer as TiempoIcon,
} from "@mui/icons-material";

interface TratamientoData {
  planTratamiento: string;
  fechaCreacion: string;
  ultimaModificacion: string;
}

export default function TratamientoInicial() {
  const [tratamiento, setTratamiento] = useState<TratamientoData>({
    planTratamiento: '',
    fechaCreacion: '',
    ultimaModificacion: '',
  });

  const handleTratamientoChange = (value: string) => {
    const now = new Date().toISOString();
    setTratamiento(prev => ({
      ...prev,
      planTratamiento: value.toUpperCase(),
      fechaCreacion: prev.fechaCreacion || now,
      ultimaModificacion: now,
    }));
  };

  // Contar caracteres y palabras
  const caracteresCount = tratamiento.planTratamiento.length;
  const palabrasCount = tratamiento.planTratamiento.trim() ? 
    tratamiento.planTratamiento.trim().split(/\s+/).length : 0;

  // Sugerencias de tratamiento para neonatología
  



  return (
    <Box>
      {/* Sección L: Plan de Tratamiento Inicial */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 2 }}>
          <Typography
            variant="h6"
            sx={{
              mb: 1.5,
              fontWeight: "bold",
              color: "#1A3C6D",
              fontSize: "1rem",
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <TratamientoIcon sx={{ fontSize: '1.2rem' }} />
            L. PLAN DE TRATAMIENTO INICIAL
          </Typography>

          {/* Campo de texto libre */}
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              multiline
              rows={12}
              placeholder="INGRESE EL PLAN DE TRATAMIENTO INICIAL DEL RECIÉN NACIDO...

Ejemplo:
• MONITOREO DE SIGNOS VITALES CADA 4 HORAS
• LACTANCIA MATERNA EXCLUSIVA A DEMANDA
• VIGILANCIA NEUROLÓGICA CONTINUA
• MANEJO TÉRMICO ADECUADO
• CONTROLES DE LABORATORIO SEGÚN EVOLUCIÓN CLÍNICA
• PROFILAXIS SEGÚN PROTOCOLOS INSTITUCIONALES
• SEGUIMIENTO POR EQUIPO MULTIDISCIPLINARIO

MEDICAMENTOS:
• [Especificar medicamentos, dosis, vía y frecuencia]

PROCEDIMIENTOS:
• [Detallar procedimientos indicados]

CONTROLES:
• [Indicar controles y seguimientos necesarios]"
              value={tratamiento.planTratamiento}
              onChange={(e) => handleTratamientoChange(e.target.value)}
              InputProps={{
                startAdornment: (
                  <Box sx={{ 
                    position: 'absolute', 
                    top: 8, 
                    left: 8, 
                    zIndex: 1,
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    borderRadius: 1,
                    px: 0.5
                  }}>
                    <EditIcon sx={{ fontSize: '1rem', color: '#1A3C6D' }} />
                  </Box>
                ),
              }}
              sx={{ 
                '& .MuiInputBase-input': { 
                  fontSize: '0.85rem',
                  lineHeight: 1.5,
                  fontFamily: 'monospace',
                  pt: 4,
                },
                '& .MuiInputBase-root': {
                  backgroundColor: '#fafafa',
                }
              }}
            />
          </Box>

          {/* Información del texto */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            <Chip
              label={`${caracteresCount} caracteres`}
              size="small"
              color={caracteresCount > 0 ? "primary" : "default"}
              sx={{ fontSize: '0.7rem' }}
            />
            <Chip
              label={`${palabrasCount} palabras`}
              size="small"
              color={palabrasCount > 0 ? "primary" : "default"}
              sx={{ fontSize: '0.7rem' }}
            />
            {tratamiento.fechaCreacion && (
              <Chip
                icon={<TiempoIcon sx={{ fontSize: '0.8rem' }} />}
                label={`Creado: ${new Date(tratamiento.fechaCreacion).toLocaleString()}`}
                size="small"
                color="success"
                sx={{ fontSize: '0.7rem' }}
              />
            )}
            {tratamiento.ultimaModificacion && tratamiento.ultimaModificacion !== tratamiento.fechaCreacion && (
              <Chip
                icon={<SaveIcon sx={{ fontSize: '0.8rem' }} />}
                label={`Modificado: ${new Date(tratamiento.ultimaModificacion).toLocaleString()}`}
                size="small"
                color="warning"
                sx={{ fontSize: '0.7rem' }}
              />
            )}
          </Box>


        </CardContent>
      </Card>

    

    </Box>
  );
}