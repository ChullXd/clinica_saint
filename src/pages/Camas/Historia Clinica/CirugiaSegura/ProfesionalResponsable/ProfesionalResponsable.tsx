import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Autocomplete,
  Button,
  Divider,
  InputAdornment,
} from '@mui/material';
import {
  Person as PersonIcon,
  Assignment as AssignmentIcon,
  MedicalServices as MedicalIcon,
  LocalHospital as HospitalIcon,
  Draw as FirmaIcon,
} from "@mui/icons-material";

interface ProfesionalData {
  // Responsable de verificación
  responsableVerificacion: string;
  firmaResponsableVerificacion: File | null;
  
  // Cirujano
  cirujano: string;
  firmaCirujano: File | null;
  
  // Anestesiólogo
  anestesiologo: string;
  firmaAnestesiologo: File | null;
}

interface Profesional {
  id: number;
  nombre: string;
  cedula: string;
  codigo: string;
  especialidad: string;
  tipo: string;
}

export default function ProfesionalResponsableSG() {
  const [profesionalData, setProfesionalData] = useState<ProfesionalData>({
    responsableVerificacion: '',
    firmaResponsableVerificacion: null,
    cirujano: '',
    firmaCirujano: null,
    anestesiologo: '',
    firmaAnestesiologo: null,
  });

  // Lista de auxiliares de quirófano/licenciadas (solicitar B/D)
  const auxiliaresQuirofano = [
    {
      id: 1,
      nombre: 'LIC. MARÍA GONZÁLEZ PÉREZ',
      cedula: '1234567890',
      codigo: 'AUX-001',
      especialidad: 'Auxiliar de Quirófano',
      tipo: 'Licenciada'
    },
    {
      id: 2,
      nombre: 'LIC. CARMEN RODRÍGUEZ SILVA',
      cedula: '0987654321',
      codigo: 'AUX-002',
      especialidad: 'Instrumentación Quirúrgica',
      tipo: 'Licenciada'
    },
    {
      id: 3,
      nombre: 'AUX. JOSÉ MARTÍNEZ LÓPEZ',
      cedula: '1122334455',
      codigo: 'AUX-003',
      especialidad: 'Auxiliar de Quirófano',
      tipo: 'Auxiliar'
    },
  ];

  // Lista de cirujanos (solicitar B/D)
  const cirujanos = [
    {
      id: 1,
      nombre: 'DR. CARLOS MENDOZA RIVERA',
      cedula: '1234567890',
      codigo: 'CIR-001',
      especialidad: 'Cirugía General',
      tipo: 'Especialista'
    },
    {
      id: 2,
      nombre: 'DR. JUAN PÉREZ SÁNCHEZ',
      cedula: '1122334455',
      codigo: 'CIR-002',
      especialidad: 'Traumatología y Ortopedia',
      tipo: 'Especialista'
    },
    {
      id: 3,
      nombre: 'DRA. ANA RODRÍGUEZ MARTÍN',
      cedula: '5566778899',
      codigo: 'CIR-003',
      especialidad: 'Ginecología',
      tipo: 'Especialista'
    },
  ];

  // Lista de anestesiólogos (solicitar B/D)
  const anestesiologos = [
    {
      id: 1,
      nombre: 'DRA. MARÍA FERNÁNDEZ LÓPEZ',
      cedula: '0987654321',
      codigo: 'ANE-001',
      especialidad: 'Anestesiología',
      tipo: 'Especialista'
    },
    {
      id: 2,
      nombre: 'DR. LUIS TORRES VARGAS',
      cedula: '6677889900',
      codigo: 'ANE-002',
      especialidad: 'Anestesiología',
      tipo: 'Especialista'
    },
    {
      id: 3,
      nombre: 'DR. RICARDO SILVA MORENO',
      cedula: '7788990011',
      codigo: 'ANE-003',
      especialidad: 'Anestesiología',
      tipo: 'Especialista'
    },
  ];

  const handleChange = (field: keyof ProfesionalData, value: string | File | null) => {
    setProfesionalData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileUpload = (field: keyof ProfesionalData) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    handleChange(field, file);
  };

  const renderProfesionalSection = (
    title: string,
    icon: React.ReactNode,
    profesionales: Profesional[],
    selectedField: keyof ProfesionalData,
    firmaField: keyof ProfesionalData,
    color: string,
    backgroundColor: string
  ) => (
    <Card variant="outlined" sx={{ mb: 3, backgroundColor }}>
      <CardContent sx={{ p: 3 }}>
        <Typography
          variant="subtitle1"
          sx={{ 
            mb: 2, 
            fontWeight: "bold", 
            color, 
            fontSize: "0.9rem",
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          {icon}
          {title}
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Selector de profesional */}
          <Autocomplete
            options={profesionales}
            getOptionLabel={(option) => `${option.nombre} - ${option.especialidad}`}
            value={profesionales.find(p => p.nombre === profesionalData[selectedField]) || null}
            onChange={(_, newValue) => {
              handleChange(selectedField, newValue?.nombre || '');
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={`NOMBRE COMPLETO`}
                size="small"
                placeholder="Buscar profesional..."
                sx={{ '& .MuiInputBase-input': { fontSize: '0.8rem' } }}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ fontSize: '1rem', color }} />
                    </InputAdornment>
                  ),
                }}
              />
            )}
            renderOption={(props, option) => (
              <li {...props}>
                <Box>
                  <Typography sx={{ fontSize: '0.8rem', fontWeight: 'bold' }}>
                    {option.nombre}
                  </Typography>
                  <Typography sx={{ fontSize: '0.7rem', color: 'text.secondary' }}>
                    {option.especialidad} - Cédula: {option.cedula} - Código: {option.codigo}
                  </Typography>
                </Box>
              </li>
            )}
          />

          {/* Información del profesional seleccionado */}
          {profesionalData[selectedField] && (
            <Card variant="outlined" sx={{ p: 2, backgroundColor: '#f8f9fa' }}>
              {(() => {
                const selected = profesionales.find(p => p.nombre === profesionalData[selectedField]);
                return selected ? (
                  <Box>
                    <Typography sx={{ fontSize: '0.75rem', color: 'text.primary', mb: 0.5 }}>
                      <strong>Profesional seleccionado:</strong>
                    </Typography>
                    <Typography sx={{ fontSize: '0.7rem', color: 'text.secondary' }}>
                      <strong>Nombre:</strong> {selected.nombre}<br/>
                      <strong>Especialidad:</strong> {selected.especialidad}<br/>
                      <strong>Cédula:</strong> {selected.cedula}<br/>
                      <strong>Código:</strong> {selected.codigo}<br/>
                      <strong>Tipo:</strong> {selected.tipo}
                    </Typography>
                  </Box>
                ) : null;
              })()}
            </Card>
          )}

          {/* Upload de firma y sello */}
          <Box sx={{ 
            border: '2px dashed #1976d2',
            borderRadius: 1,
            p: 2,
            textAlign: 'center',
            backgroundColor: '#f8f9fa'
          }}>
            <Typography sx={{ fontSize: '0.8rem', fontWeight: 'bold', mb: 1, color }}>
              FIRMA Y SELLO:
            </Typography>
            
            {profesionalData[firmaField] ? (
              <Box>
                <FirmaIcon sx={{ fontSize: '2rem', color: '#4caf50' }} />
                <Typography sx={{ fontSize: '0.7rem', color: '#4caf50', fontWeight: 'bold', mb: 1 }}>
                  {(profesionalData[firmaField] as File)?.name}
                </Typography>
                <Typography sx={{ fontSize: '0.65rem', color: 'text.secondary', mb: 1 }}>
                  Firma y sello cargados exitosamente
                </Typography>
                <Button
                  size="small"
                  onClick={() => handleChange(firmaField, null)}
                  sx={{ fontSize: '0.65rem' }}
                  color="error"
                >
                  Remover firma
                </Button>
              </Box>
            ) : (
              <Box>
                <FirmaIcon sx={{ fontSize: '2rem', color: '#1976d2', mb: 1 }} />
                <Typography sx={{ fontSize: '0.7rem', color: 'text.secondary', mb: 1 }}>
                  Cargar imagen de firma y sello del profesional
                </Typography>
                <Button
                  variant="contained"
                  component="label"
                  startIcon={<FirmaIcon />}
                  sx={{ fontSize: '0.7rem', py: 0.5 }}
                >
                  Cargar Firma y Sello
                  <input
                    type="file"
                    hidden
                    accept="image/*,application/pdf"
                    onChange={handleFileUpload(firmaField)}
                  />
                </Button>
                <Typography sx={{ fontSize: '0.65rem', color: 'text.secondary', mt: 1 }}>
                  Formatos: JPG, PNG, PDF (máx. 5MB)
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ p: 2 }}>
      <Card sx={{ boxShadow: 2 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography
            variant="h6"
            sx={{ 
              mb: 3, 
              fontWeight: "bold", 
              color: "#1A3C6D", 
              fontSize: "1rem"
            }}
          >
            F. DATOS DE LOS PROFESIONALES RESPONSABLES
          </Typography>

          {/* RESPONSABLE DE LA LISTA DE VERIFICACIÓN */}
          {renderProfesionalSection(
            'RESPONSABLE DE LA LISTA DE VERIFICACIÓN (AUXILIAR DE QUIRÓFANO/LICENCIADAS)',
            <AssignmentIcon sx={{ fontSize: '1.1rem' }} />,
            auxiliaresQuirofano,
            'responsableVerificacion',
            'firmaResponsableVerificacion',
            '#1976d2',
            '#e3f2fd'
          )}

          <Divider sx={{ my: 3 }} />

          {/* CIRUJANO */}
          {renderProfesionalSection(
            'CIRUJANO RESPONSABLE',
            <MedicalIcon sx={{ fontSize: '1.1rem' }} />,
            cirujanos,
            'cirujano',
            'firmaCirujano',
            '#2e7d32',
            '#e8f5e8'
          )}

          <Divider sx={{ my: 3 }} />

          {/* ANESTESIÓLOGO */}
          {renderProfesionalSection(
            'ANESTESIÓLOGO RESPONSABLE',
            <HospitalIcon sx={{ fontSize: '1.1rem' }} />,
            anestesiologos,
            'anestesiologo',
            'firmaAnestesiologo',
            '#c2185b',
            '#fce4ec'
          )}

         
        </CardContent>
      </Card>
    </Box>
  );
}