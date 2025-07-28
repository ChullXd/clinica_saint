import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRowModel,
  GridActionsCellItem,
} from '@mui/x-data-grid';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

interface DrogaData {
  id: number;
  nombre: string;
  dosis: string;
  via: string;
  hora: string;
}

export default function DrogasAdministradas() {
  const [drogas, setDrogas] = useState<DrogaData[]>([]);

  const handleRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = {
      ...newRow,
      nombre: newRow.nombre?.toString().toUpperCase() || '',
      dosis: newRow.dosis?.toString().toUpperCase() || '',
      via: newRow.via?.toString().toUpperCase() || '',
      hora: newRow.hora || '',
    };
    
    setDrogas(prev =>
      prev.map(droga => (droga.id === updatedRow.id ? updatedRow as DrogaData : droga))
    );
    return updatedRow;
  };

  const agregarDroga = () => {
    const newId = drogas.length > 0 ? Math.max(...drogas.map(d => d.id)) + 1 : 1;
    setDrogas(prev => [
      ...prev,
      { id: newId, nombre: '', dosis: '', via: '', hora: '' }
    ]);
  };

  const eliminarDroga = (id: number) => {
    setDrogas(prev => prev.filter(droga => droga.id !== id));
  };

  const columns: GridColDef[] = [
    {
      field: 'numero',
      headerName: '#',
      width: 80,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        const index = drogas.findIndex(droga => droga.id === params.row.id);
        return (
          <Typography 
            variant="subtitle2" 
            sx={{ 
              fontWeight: 'bold', 
              color: '#1A3C6D',
              fontSize: '1.1rem'
            }}
          >
            {index + 1}
          </Typography>
        );
      },
    },
    {
      field: 'nombre',
      headerName: 'NOMBRE DE LA DROGA',
      flex: 2,
      minWidth: 280,
      editable: true,
      headerAlign: 'center',
      renderEditCell: (params) => (
        <input
          style={{
            width: '100%',
            padding: '12px',
            border: '2px solid #1A3C6D',
            borderRadius: '6px',
            fontSize: '14px',
            textTransform: 'uppercase',
            backgroundColor: '#fff',
            color: '#333', // Agregado color del texto
            outline: 'none',
          }}
          placeholder="EJ: PROPOFOL, FENTANILO, MIDAZOLAM..."
          value={params.value || ''}
          onChange={(e) => params.api.setEditCellValue({ 
            id: params.id, 
            field: params.field, 
            value: e.target.value.toUpperCase() 
          })}
        />
      ),
    },
    {
      field: 'dosis',
      headerName: 'DOSIS',
      flex: 1,
      minWidth: 120,
      editable: true,
      headerAlign: 'center',
      renderEditCell: (params) => (
        <input
          style={{
            width: '100%',
            padding: '12px',
            border: '2px solid #1A3C6D',
            borderRadius: '6px',
            fontSize: '14px',
            textTransform: 'uppercase',
            backgroundColor: '#fff',
            color: '#333', // Agregado color del texto
            outline: 'none',
          }}
          placeholder="EJ: 150MG"
          value={params.value || ''}
          onChange={(e) => params.api.setEditCellValue({ 
            id: params.id, 
            field: params.field, 
            value: e.target.value.toUpperCase() 
          })}
        />
      ),
    },
    {
      field: 'via',
      headerName: 'VÍA',
      flex: 1,
      minWidth: 140,
      editable: true,
      headerAlign: 'center',
      renderEditCell: (params) => (
        <input
          style={{
            width: '100%',
            padding: '12px',
            border: '2px solid #1A3C6D',
            borderRadius: '6px',
            fontSize: '14px',
            textTransform: 'uppercase',
            backgroundColor: '#fff',
            color: '#333', // Agregado color del texto
            outline: 'none',
          }}
          placeholder="EJ: IV, IM, SC..."
          value={params.value || ''}
          onChange={(e) => params.api.setEditCellValue({ 
            id: params.id, 
            field: params.field, 
            value: e.target.value.toUpperCase() 
          })}
        />
      ),
    },
    {
      field: 'hora',
      headerName: 'HORA',
      flex: 1,
      minWidth: 120,
      editable: true,
      headerAlign: 'center',
      renderEditCell: (params) => (
        <input
          type="time"
          style={{
            width: '100%',
            padding: '12px',
            border: '2px solid #1A3C6D',
            borderRadius: '6px',
            fontSize: '14px',
            backgroundColor: '#fff',
            color: '#333', // Agregado color del texto
            outline: 'none',
          }}
          value={params.value || ''}
          onChange={(e) => params.api.setEditCellValue({ 
            id: params.id, 
            field: params.field, 
            value: e.target.value 
          })}
        />
      ),
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'ELIMINAR',
      width: 100,
      headerAlign: 'center',
      getActions: (params) => [
        <GridActionsCellItem
          icon={
            <DeleteIcon 
              sx={{
                color: '#d32f2f',
                '&:hover': {
                  color: '#b71c1c',
                  transform: 'scale(1.2)',
                },
                transition: 'all 0.2s',
              }}
            />
          }
          label="Eliminar"
          onClick={() => eliminarDroga(params.row.id)}
        />
      ],
    },
  ];

  return (
    <Card sx={{ mb: 3, boxShadow: 3 }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography
            variant="h6"
            sx={{ 
              fontWeight: "bold", 
              color: "#1A3C6D",
              borderBottom: '2px solid #1A3C6D',
              pb: 1
            }}
          >
            E. DROGAS ADMINISTRADAS
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={agregarDroga}
            sx={{
              backgroundColor: '#1A3C6D',
              '&:hover': {
                backgroundColor: '#153e6e',
              },
              textTransform: 'none',
              fontWeight: 'bold',
              fontSize: '1rem',
              px: 3,
              py: 1,
            }}
          >
            AGREGAR DROGA
          </Button>
        </Box>

        <Typography
          variant="body2"
          sx={{ 
            mb: 3, 
            color: "#666",
            fontStyle: 'italic',
            backgroundColor: '#f0f7ff',
            p: 2,
            borderRadius: 1,
            border: '1px solid #e3f2fd'
          }}
        >
          (Campos numéricos, se permite ingresar más de 10 medicamentos. Haga doble clic en las celdas para editar)
        </Typography>

        <Box sx={{ 
          height: drogas.length === 0 ? 200 : Math.min(600, drogas.length * 60 + 120), 
          width: '100%' 
        }}>
          <DataGrid
            rows={drogas}
            columns={columns}
            processRowUpdate={handleRowUpdate}
            onProcessRowUpdateError={(error) => console.error(error)}
            hideFooter
            disableRowSelectionOnClick
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            localeText={{
              noRowsLabel: 'No hay drogas registradas. Haga clic en "AGREGAR DROGA" para comenzar.',
            }}
            sx={{
              border: '2px solid #1A3C6D',
              borderRadius: 2,
              '& .MuiDataGrid-cell': {
                borderBottom: '1px solid #e0e0e0',
                fontSize: '0.95rem',
                padding: '8px',
                color: '#333', // Color del texto en celdas normales
                '&:focus': {
                  outline: '2px solid #1A3C6D',
                  outlineOffset: '-2px',
                },
              },
              '& .MuiDataGrid-columnHeader': {
                backgroundColor: '#1A3C6D',
                color: '#FFFFFF',
                fontWeight: 'bold',
                fontSize: '1rem',
                borderBottom: '2px solid #1A3C6D',
                '&:focus': {
                  outline: 'none',
                },
              },
              '& .MuiDataGrid-columnHeaderTitle': {
                fontWeight: 'bold',
                fontSize: '0.95rem',
                color: '#FFFFFF', // Asegura que los títulos sean blancos
              },
              '& .MuiDataGrid-row': {
                minHeight: '60px !important',
                '&:nth-of-type(even)': {
                  backgroundColor: '#f8f9fa',
                },
                '&:hover': {
                  backgroundColor: '#e3f2fd',
                },
              },
              '& .MuiDataGrid-cell--editable': {
                backgroundColor: '#fff',
                color: '#333', // Color del texto en celdas editables
                '&:hover': {
                  backgroundColor: '#f0f7ff',
                },
              },
              '& .MuiDataGrid-overlay': {
                backgroundColor: '#f8f9fa',
              },
            }}
          />
        </Box>

        {/* Resumen */}
        <Box sx={{ 
          mt: 3, 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#f0f7ff',
          p: 2,
          borderRadius: 2,
          border: '1px solid #e3f2fd'
        }}>
          <Typography 
            variant="subtitle2" 
            sx={{ 
              fontWeight: 'bold', 
              color: '#1A3C6D'
            }}
          >
            TOTAL DE DROGAS: {drogas.length} | COMPLETADAS: {drogas.filter(d => d.nombre && d.dosis).length}
          </Typography>
          
          {drogas.filter(d => d.nombre && d.dosis).length > 0 && (
            <Typography variant="caption" sx={{ color: '#4caf50', fontWeight: 'bold' }}>
              ✅ DROGAS REGISTRADAS
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}