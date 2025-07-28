import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

interface MedicamentoData {
  id: number;
  nombre: string;
  dosis: string;
  via: string;
  hora: string;
}

interface RegistroTransanestesicoData {
  agenteInhalatorio: string;
  infusionContinua: string;
  oxigeno: string;
  medicamentos: MedicamentoData[];
}

export default function RegistroTransanestesico() {
  const [registroData, setRegistroData] = useState<RegistroTransanestesicoData>({
    agenteInhalatorio: '',
    infusionContinua: '',
    oxigeno: '',
    medicamentos: [
      { id: 1, nombre: '', dosis: '', via: '', hora: '' },
      { id: 2, nombre: '', dosis: '', via: '', hora: '' },
      { id: 3, nombre: '', dosis: '', via: '', hora: '' },
      { id: 4, nombre: '', dosis: '', via: '', hora: '' },
      { id: 5, nombre: '', dosis: '', via: '', hora: '' },
      { id: 6, nombre: '', dosis: '', via: '', hora: '' },
    ],
  });

  const handleInputChange = (field: keyof RegistroTransanestesicoData, value: string) => {
    setRegistroData(prev => ({
      ...prev,
      [field]: value.toUpperCase(),
    }));
  };

  const handleMedicamentoChange = (id: number, field: keyof MedicamentoData, value: string) => {
    setRegistroData(prev => ({
      ...prev,
      medicamentos: prev.medicamentos.map(med =>
        med.id === id 
          ? { ...med, [field]: field === 'hora' ? value : value.toUpperCase() }
          : med
      ),
    }));
  };

  const agregarMedicamento = () => {
    const newId = Math.max(...registroData.medicamentos.map(m => m.id)) + 1;
    setRegistroData(prev => ({
      ...prev,
      medicamentos: [
        ...prev.medicamentos,
        { id: newId, nombre: '', dosis: '', via: '', hora: '' }
      ],
    }));
  };

  const eliminarMedicamento = (id: number) => {
    if (registroData.medicamentos.length > 1) {
      setRegistroData(prev => ({
        ...prev,
        medicamentos: prev.medicamentos.filter(med => med.id !== id),
      }));
    }
  };

  return (
    <Box>
      {/* Sección D: Registro Transanestésico */}
      <Card sx={{ mb: 3, boxShadow: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography
            variant="h6"
            sx={{ 
              mb: 3, 
              fontWeight: "bold", 
              color: "#1A3C6D",
              borderBottom: '2px solid #1A3C6D',
              pb: 1
            }}
          >
            D. REGISTRO TRANSANESTÉSICO
          </Typography>

          <Paper 
            elevation={1} 
            sx={{ 
              p: 3, 
              backgroundColor: '#f8f9fa',
              border: '1px solid #e0e0e0'
            }}
          >
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
              <Box sx={{ flex: '1 1 300px', minWidth: '250px' }}>
                <TextField
                  label="AGENTE INHALATORIO"
                  fullWidth
                  size="small"
                  value={registroData.agenteInhalatorio}
                  onChange={(e) => handleInputChange('agenteInhalatorio', e.target.value)}
                  sx={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '4px',
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '4px',
                    },
                  }}
                />
              </Box>

              <Box sx={{ flex: '1 1 300px', minWidth: '250px' }}>
                <TextField
                  label="INFUSIÓN CONTINUA"
                  fullWidth
                  size="small"
                  value={registroData.infusionContinua}
                  onChange={(e) => handleInputChange('infusionContinua', e.target.value)}
                  sx={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '4px',
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '4px',
                    },
                  }}
                />
              </Box>

              <Box sx={{ flex: '1 1 300px', minWidth: '250px' }}>
                <TextField
                  label="OXÍGENO"
                  fullWidth
                  size="small"
                  value={registroData.oxigeno}
                  onChange={(e) => handleInputChange('oxigeno', e.target.value)}
                  sx={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '4px',
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '4px',
                    },
                  }}
                />
              </Box>
            </Box>
          </Paper>
        </CardContent>
      </Card>
    </Box>
  );
}
