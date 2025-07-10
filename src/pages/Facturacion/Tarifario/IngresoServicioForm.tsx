import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  TextField,
} from "@mui/material";

interface IngresoServicioProps {
  open: boolean;
  formData: any;
  handleClose: () => void;
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }
    >
  ) => void;
  handleSave: () => void;
}

const categorias = ["Particulares", "Corporativos"];
const areas = [
  "Emergencia",
  "Hospitalización",
  "Postquirúrgico",
  "Quirófano",
  "neonato",
];
const estados = ["ACTIVO", "INACTIVO"];

const IngresoServicio: React.FC<IngresoServicioProps> = ({
  open,
  formData,
  handleClose,
  handleInputChange,
  handleSave,
}) => (
  <Dialog
    open={open}
    onClose={handleClose}
    TransitionProps={{ timeout: 500 }}
    maxWidth="sm"
    fullWidth
  >
    <DialogTitle
      sx={{
        backgroundColor: "#1A3C6D",
        color: "#FFFFFF",
        textAlign: "center",
      }}
    >
      Registrar Servicio
    </DialogTitle>
    <DialogContent sx={{ padding: "32px", backgroundColor: "#F5F5F5" }}>
      <Grid container spacing={2} justifyContent="center">
        {/* Id */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Id."
            name="id"
            value={formData.id ? formData.id : "Se asignará automáticamente"}
            disabled
            fullWidth
            size="small"
            sx={{
              backgroundColor: "#E0E0E0",
              borderRadius: "4px",
            }}
          />
        </Grid>
        {/* Categoría */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small">
            <InputLabel>Categoría</InputLabel>
            <Select
              name="categoria"
              value={formData.categoria}
              label="Categoría"
              onChange={handleInputChange}
              sx={{
                backgroundColor: "#FFFFFF",
                borderRadius: "4px",
              }}
            >
              {categorias.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {/* Área */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small">
            <InputLabel>Área</InputLabel>
            <Select
              name="area"
              value={formData.area}
              label="Área"
              onChange={handleInputChange}
              sx={{
                backgroundColor: "#FFFFFF",
                borderRadius: "4px",
              }}
            >
              {areas.map((area) => (
                <MenuItem key={area} value={area}>
                  {area}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {/* Precio Venta */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Precio Venta"
            name="precio"
            value={formData.precio}
            onChange={handleInputChange}
            fullWidth
            size="small"
            type="text"
            inputProps={{
              inputMode: "decimal",
              pattern: "^[0-9]+(\\.[0-9]{0,2})?$",
            }}
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: "4px",
            }}
          />
        </Grid>
        {/* Estado */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small">
            <InputLabel>Estado</InputLabel>
            <Select
              name="estado"
              value={formData.estado}
              label="Estado"
              disabled // Solo editable en modificación
              sx={{
                backgroundColor: "#FFFFFF",
                borderRadius: "4px",
              }}
            >
              {estados.map((estado) => (
                <MenuItem key={estado} value={estado}>
                  {estado}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {/* Descripción de servicio al final */}
        <Grid item xs={12}>
          <TextField
            label="Descripción de servicio"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleInputChange}
            fullWidth
            size="small"
            multiline
            minRows={2}
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: "4px",
            }}
          />
        </Grid>
        {/* Botones centrados al final */}
        <Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "center", mt: 2 }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            sx={{ minWidth: 120, mr: 2 }}
          >
            REGISTRAR
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleClose}
            sx={{ minWidth: 120 }}
          >
            CERRAR
          </Button>
        </Grid>
      </Grid>
    </DialogContent>
  </Dialog>
);

export default IngresoServicio;
