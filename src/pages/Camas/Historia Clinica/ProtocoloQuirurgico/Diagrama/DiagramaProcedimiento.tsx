import React, { useState, useRef } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Alert,
  IconButton,
  Paper,
  Tooltip
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon,
  ZoomIn as ZoomInIcon,
  Edit as EditIcon,
  PhotoCamera as PhotoCameraIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Componente estilizado para entrada de archivo oculta
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function DiagramaProcedimiento() {
  // Estado para la imagen
  const [imagenPreview, setImagenPreview] = useState<string | null>(null);
  const [nombreArchivo, setNombreArchivo] = useState('');
  const [error, setError] = useState(false);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  
  // Referencia al input de archivo
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Función para manejar la selección de archivo
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (file) {
      // Validar que sea una imagen
      if (!file.type.startsWith('image/')) {
        setError(true);
        return;
      }
      
      // Crear URL para preview
      const fileUrl = URL.createObjectURL(file);
      setImagenPreview(fileUrl);
      setNombreArchivo(file.name);
      setError(false);
      
      // Obtener dimensiones de la imagen
      const img = new Image();
      img.onload = () => {
        setImageSize({
          width: img.width,
          height: img.height
        });
      };
      img.src = fileUrl;
    }
  };
  
  // Función para eliminar la imagen seleccionada
  const handleDeleteImage = () => {
    if (imagenPreview) {
      URL.revokeObjectURL(imagenPreview);
    }
    setImagenPreview(null);
    setNombreArchivo('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  // Función para abrir el visualizador de imágenes
  const handleViewImage = () => {
    if (imagenPreview) {
      window.open(imagenPreview, '_blank');
    }
  };
  
  // Función para simular tomar una foto (en un entorno real esto accedería a la cámara)
  const handleTakePhoto = () => {
    alert('Esta función permitiría tomar una foto con la cámara del dispositivo.');
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
            I. DIAGRAMA DEL PROCEDIMIENTO
          </Typography>

          {/* Mensaje de campo obligatorio */}
          <Alert 
            severity="info" 
            sx={{ 
              mb: 2, 
              fontSize: "0.8rem",
              '& .MuiAlert-icon': { fontSize: '1.2rem' }
            }}
          >
            Este campo es obligatorio. Debe adjuntar una imagen del diagrama del procedimiento quirúrgico para poder guardar el formulario.
          </Alert>

          {/* Área de carga y visualización */}
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', md: 'row' },
              gap: 2 
            }}
          >
            {/* Panel izquierdo: Opciones de carga */}
            <Box 
              sx={{ 
                flex: { xs: '1 1 100%', md: '0 0 300px' },
                display: 'flex', 
                flexDirection: 'column', 
                gap: 1.5 
              }}
            >
              {/* Botón para seleccionar archivo */}
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                fullWidth
                size="small"
                sx={{
                  background: "#1A3C6D",
                  "&:hover": { background: "#274472" },
                  fontSize: "0.8rem",
                  height: '40px'
                }}
              >
                CARGAR IMAGEN
                <VisuallyHiddenInput 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileSelect}
                  ref={fileInputRef}
                />
              </Button>
             
              {/* Información del archivo */}
              {nombreArchivo && (
                <Paper 
                  elevation={0} 
                  variant="outlined" 
                  sx={{ 
                    p: 1.5, 
                    mt: 1, 
                    borderRadius: 1, 
                    borderColor: '#e0e0e0' 
                  }}
                >
                  <Typography sx={{ fontSize: "0.8rem", fontWeight: "medium" }}>
                    Archivo: {nombreArchivo}
                  </Typography>
                  {imageSize.width > 0 && (
                    <Typography sx={{ fontSize: "0.75rem", color: 'text.secondary', mt: 0.5 }}>
                      Dimensiones: {imageSize.width} x {imageSize.height} px
                    </Typography>
                  )}
                </Paper>
              )}

              {/* Mensaje de error */}
              {error && (
                <Alert 
                  severity="error" 
                  sx={{ 
                    mt: 1, 
                    fontSize: "0.8rem",
                    '& .MuiAlert-icon': { fontSize: '1.2rem' }
                  }}
                >
                  El archivo seleccionado no es una imagen válida. Por favor, seleccione un archivo de imagen (JPG, PNG, etc.).
                </Alert>
              )}
            </Box>

            {/* Panel derecho: Visualización de la imagen */}
            <Box 
              sx={{ 
                flex: '1 1 auto',
                display: 'flex',
                flexDirection: 'column',
                border: '1px dashed #ccc',
                borderRadius: 1,
                p: 1,
                minHeight: '250px',
                position: 'relative',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              {imagenPreview ? (
                <>
                  <Box
                    component="img"
                    src={imagenPreview}
                    alt="Diagrama del procedimiento quirúrgico"
                    sx={{
                      maxWidth: '100%',
                      maxHeight: '400px',
                      objectFit: 'contain'
                    }}
                  />
                  <Box 
                    sx={{ 
                      position: 'absolute', 
                      top: '8px', 
                      right: '8px',
                      display: 'flex',
                      gap: 0.5,
                      bgcolor: 'rgba(255,255,255,0.7)',
                      borderRadius: '4px',
                      p: 0.5
                    }}
                  >
                    <Tooltip title="Ver imagen completa">
                      <IconButton size="small" onClick={handleViewImage} sx={{ color: '#1A3C6D' }}>
                        <ZoomInIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Reemplazar imagen">
                      <IconButton 
                        size="small" 
                        component="label" 
                        sx={{ color: '#1A3C6D' }}
                      >
                        <EditIcon fontSize="small" />
                        <VisuallyHiddenInput 
                          type="file" 
                          accept="image/*" 
                          onChange={handleFileSelect} 
                        />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar imagen">
                      <IconButton size="small" onClick={handleDeleteImage} sx={{ color: '#d32f2f' }}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </>
              ) : (
                <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem', textAlign: 'center' }}>
                  No hay imagen seleccionada. <br />
                  Por favor, cargue una imagen del diagrama del procedimiento quirúrgico.
                </Typography>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}