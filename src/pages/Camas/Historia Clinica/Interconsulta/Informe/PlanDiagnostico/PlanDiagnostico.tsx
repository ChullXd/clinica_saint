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
  Psychology as CriterioIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Timer as TiempoIcon,
} from "@mui/icons-material";

interface ResumenCritericoData {
  descripcion: string;
  fechaCreacion: string;
  ultimaModificacion: string;
}

export default function PlanDiagnostico() {
  const [resumenCriterio, setResumenCriterio] = useState<ResumenCritericoData>({
    descripcion: '',
    fechaCreacion: '',
    ultimaModificacion: '',
  });


  const handleDescripcionChange = (value: string) => {
    const now = new Date().toISOString();
    setResumenCriterio(prev => ({
      ...prev,
      descripcion: value.toUpperCase(),
      fechaCreacion: prev.fechaCreacion || now,
      ultimaModificacion: now,
    }));
  };
  // Contar caracteres y palabras
  const caracteresCount = resumenCriterio.descripcion.length;
  const palabrasCount = resumenCriterio.descripcion.trim() ? 
    resumenCriterio.descripcion.trim().split(/\s+/).length : 0;


  return (
    <Box>
      {/* Sección C: Resumen del Criterio Clínico */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 2 }}>
          <Typography
            variant="h6"
            sx={{
              mb: 1.5,
              fontWeight: "bold",
              color: "#1A3C6D",
              fontSize: "0.9rem",
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <CriterioIcon sx={{ fontSize: '1rem' }} />
            E. PLAN DE DIAGNOSTICO PROPUESTO
          </Typography>

          {/* Campo de texto libre */}
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              multiline
              rows={15}
              placeholder="DESCRIBIR EL PLAN DE DIAGNOSTICO ..."
              value={resumenCriterio.descripcion}
              onChange={(e) => handleDescripcionChange(e.target.value)}
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
                  fontSize: '0.8rem',
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
              sx={{ fontSize: '0.65rem' }}
            />
            <Chip
              label={`${palabrasCount} palabras`}
              size="small"
              color={palabrasCount > 0 ? "primary" : "default"}
              sx={{ fontSize: '0.65rem' }}
            />
            {resumenCriterio.fechaCreacion && (
              <Chip
                icon={<TiempoIcon sx={{ fontSize: '0.7rem' }} />}
                label={`Creado: ${new Date(resumenCriterio.fechaCreacion).toLocaleString()}`}
                size="small"
                color="success"
                sx={{ fontSize: '0.65rem' }}
              />
            )}
            {resumenCriterio.ultimaModificacion && resumenCriterio.ultimaModificacion !== resumenCriterio.fechaCreacion && (
              <Chip
                icon={<SaveIcon sx={{ fontSize: '0.7rem' }} />}
                label={`Modificado: ${new Date(resumenCriterio.ultimaModificacion).toLocaleString()}`}
                size="small"
                color="warning"
                sx={{ fontSize: '0.65rem' }}
              />
            )}
          </Box>
         
        </CardContent>
      </Card>
    </Box>
  );
}