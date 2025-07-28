import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Paper,
  Chip,
} from '@mui/material';

export default function Observacion() {
  const [observaciones, setObservaciones] = useState<string>('');

  return (
    <Card sx={{ mb: 2, boxShadow: 3 }}>
      <CardContent sx={{ p: 2 }}>
        <Typography
          variant="h6"
          sx={{ 
            mb: 2, 
            fontWeight: "bold", 
            color: "#1A3C6D",
            borderBottom: '2px solid #1A3C6D',
            pb: 0.5
          }}
        >
          P. OBSERVACIONES
        </Typography>

        <Typography
          variant="caption"
          sx={{ 
            mb: 2, 
            color: "#666",
            fontStyle: 'italic',
            backgroundColor: '#f0f7ff',
            p: 1,
            borderRadius: 1,
            border: '1px solid #e3f2fd',
            display: 'block'
          }}
        >
          (Campo de texto libre para registrar observaciones adicionales del procedimiento anestésico)
        </Typography>

        <Paper elevation={1} sx={{ p: 2, backgroundColor: '#f8f9fa' }}>
          <TextField
            fullWidth
            multiline
            rows={6}
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value.toUpperCase())}
            placeholder="REGISTRE AQUÍ CUALQUIER OBSERVACIÓN RELEVANTE SOBRE EL PROCEDIMIENTO ANESTÉSICO, COMPLICACIONES, RESPUESTA DEL PACIENTE, CONSIDERACIONES ESPECIALES, ETC..."
            sx={{ 
              '& .MuiOutlinedInput-root': {
                backgroundColor: observaciones.trim() ? '#f3e5f515' : 'transparent',
                '&:hover fieldset': { borderColor: '#031482ff' },
                '&.Mui-focused fieldset': { borderColor: '#031482ff' },
              },
              '& .MuiInputLabel-root.Mui-focused': { color: '#031482ff' },
              '& textarea': {
                fontSize: '0.95rem',
                fontWeight: 500,
                lineHeight: 1.6,
                fontFamily: 'monospace',
              }
            }}
          />

          {/* Contador de caracteres */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mt: 1
          }}>
            <Typography variant="caption" sx={{ color: '#666' }}>
              💡 <strong>Sugerencia:</strong> Incluya información sobre respuesta del paciente, técnicas especiales utilizadas, complicaciones o consideraciones importantes.
            </Typography>
            <Typography variant="caption" sx={{ 
              color: observaciones.length > 1000 ? '#d32f2f' : '#666',
              fontWeight: 'bold'
            }}>
              {observaciones.length} caracteres
            </Typography>
          </Box>
        </Paper>
      </CardContent>
    </Card>
  );
}