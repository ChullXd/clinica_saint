import React, { useState } from "react";
import { Box, Button, IconButton } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Add as AddIcon, Close as CloseIcon } from "@mui/icons-material";

const ProcedimientosDataGrid: React.FC = () => {
  const [rows, setRows] = useState([
    { id: 1, codigo: "", nombre: "Extracción de apéndice" },
    { id: 2, codigo: "", nombre: "Reparación de hernia" },
  ]);

  const handleAddRow = () => {
    const newRow = {
      id: Date.now(),
      codigo: "",
      nombre: "",
    };
    setRows([...rows, newRow]);
  };

  const handleDeleteRow = (id: number) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const columns: GridColDef[] = [
    {
      field: "codigo",
      headerName: "Código",
      width: 200,
      editable: true,
    },
    {
      field: "nombre",
      headerName: "Nombre",
      width: 300,
      renderHeader: () => (
        <Box display="flex" alignItems="center">
          Nombre
          <IconButton color="primary" size="small" onClick={handleAddRow} sx={{ ml: 1 }}>
            <AddIcon />
          </IconButton>
        </Box>
      ),
      editable: true,
    },
    {
      field: "actions",
      headerName: "Acciones",
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <IconButton color="error" onClick={() => handleDeleteRow(params.row.id)} size="small">
          <CloseIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box sx={{ width: "100%", height: 400 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10, 20]}
        sx={{
          bgcolor: "#F7FAFF",
          borderRadius: 2,
          width: "100%",
          boxSizing: "border-box",
        }}
      />
    </Box>
  );
};

export default ProcedimientosDataGrid;