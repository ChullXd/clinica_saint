import React, { useState, RefObject } from "react";
import { styled } from "@mui/material/styles";
import {
  List,
  Box,
  Typography,
  Collapse,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  Assessment as ReportIcon,
  PersonAdd as PersonAddIcon,
  LocalHospital as LocalHospitalIcon,
  Event as EventIcon,
  MonitorHeart as MonitorHeartIcon,
  AirlineSeatFlat as AirlineSeatFlatIcon,
  Receipt as ReceiptIcon,
  AccountBalance as AccountBalanceIcon,
  PointOfSale as PointOfSaleIcon,
  LockPerson as LockPersonIcon,
  Inventory as InventoryIcon,
  Settings as SettingsIcon,
  SwapHoriz as SwapHorizIcon,
  Security as SecurityIcon,
  Group as GroupIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
  People as PeopleIcon,
  MedicalServices as MedicalServicesIcon,
  Warehouse as WarehouseIcon,
  Description as DescriptionIcon,
  Storage as StorageIcon,
} from "@mui/icons-material";
import logoHorizontal from "../../assets/png/LogoHorizontal.png";
import logo from "../../assets/png/Logo1.png";
import { Sidebar } from "../../components/common/Sidebar";

interface SidebarMenuProps {
  open: boolean;
  selectedPage: string;
  handlePageSelect: (page: string) => void;
  isSmallLogo: boolean;
  sidebarListRef: RefObject<HTMLDivElement | null>;
}

const LogoContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  background: "linear-gradient(180deg, #005A9C 0%, #003087 100%)",
  padding: theme.spacing(2, 1),
  position: "sticky",
  top: 0,
  zIndex: 1002,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    borderTopRightRadius: 0,
  },
}));

const LogoHorizontal = styled("img")<{ isSmall: boolean }>(
  ({ theme, isSmall }) => ({
    width: isSmall ? "24px" : "180px",
    height: "auto",
    objectFit: "contain",
    transition: "width 0.3s ease-in-out",
    [theme.breakpoints.down("sm")]: {
      width: isSmall ? "20px" : "150px",
    },
    [theme.breakpoints.up("lg")]: {
      width: isSmall ? "28px" : "200px",
    },
  })
);

const SidebarListContainer = styled("div")(({ theme }) => ({
  flex: 1,
  overflowY: "auto",
  padding: theme.spacing(0, 2, 2, 2),
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#003087",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#005A9C",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#004080",
  },
}));

const SidebarList = styled(List)({
  width: "100%",
});

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: "10px",
  margin: theme.spacing(0.5, 0),
  padding: theme.spacing(1.5),
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  "& .MuiListItemIcon-root": {
    color: "#fff",
  },
  "& .MuiListItemText-primary": {
    fontWeight: 500,
  },
  "&.Mui-selected": {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.4)",
    },
  },
}));

const SidebarMenu: React.FC<SidebarMenuProps> = ({
  open,
  selectedPage,
  handlePageSelect,
  isSmallLogo,
  sidebarListRef,
}) => {
  const [openProgramacion, setOpenProgramacion] = useState(false);
  const [openServiciosAmbulatorios, setOpenServiciosAmbulatorios] = useState(false);
  const [openHospitalario, setOpenHospitalario] = useState(false);
  const [openFacturacion, setOpenFacturacion] = useState(false);
  const [openFarmacia, setOpenFarmacia] = useState(false);
  const [openReportes, setOpenReportes] = useState(false);
  const [openSeguridad, setOpenSeguridad] = useState(false);

  const handleProgramacionClick = () => setOpenProgramacion(!openProgramacion);
  const handleServiciosClick = () => setOpenServiciosAmbulatorios(!openServiciosAmbulatorios);
  const handleHospitalarioClick = () => setOpenHospitalario(!openHospitalario);
  const handleFacturacionClick = () => setOpenFacturacion(!openFacturacion);
  const handleFarmaciaClick = () => setOpenFarmacia(!openFarmacia);
  const handleReportesClick = () => setOpenReportes(!openReportes);
  const handleSeguridadClick = () => setOpenSeguridad(!openSeguridad);

  return (
    <Sidebar open={open}>
      <LogoContainer>
        <LogoHorizontal
          src={isSmallLogo ? logo : logoHorizontal}
          alt="Logo Horizontal"
          isSmall={isSmallLogo}
        />
      </LogoContainer>
      <SidebarListContainer ref={sidebarListRef}>
        <SidebarList>
          <Typography
            variant="subtitle1"
            sx={{
              padding: "8px 16px",
              color: "#fff",
              textTransform: "uppercase",
              fontWeight: 600,
              letterSpacing: "0.05em",
              fontSize: "16px",
            }}
          >
            MENU PRINCIPAL
          </Typography>

          <StyledListItemButton
            onClick={handleProgramacionClick}
            selected={selectedPage === "PREADMISION" || selectedPage === "AGENDA VIRTUAL"}
          >
            <ListItemIcon>
              <EventIcon />
            </ListItemIcon>
            <ListItemText
              primary="PROGRAMACION"
              primaryTypographyProps={{ fontSize: "15px", fontWeight: 600 }}
            />
            {openProgramacion ? <ExpandLess /> : <ExpandMore />}
          </StyledListItemButton>
          <Collapse in={openProgramacion} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <StyledListItemButton
                sx={{ pl: 4 }}
                onClick={() => handlePageSelect("PREADMISION")}
                selected={selectedPage === "PREADMISION"}
              >
                <ListItemIcon>
                  <PersonAddIcon />
                </ListItemIcon>
                <ListItemText
                  primary="PREADMISION"
                  primaryTypographyProps={{ fontSize: "14px" }}
                />
              </StyledListItemButton>
              <StyledListItemButton
                sx={{ pl: 4 }}
                onClick={() => handlePageSelect("AGENDA VIRTUAL")}
                selected={selectedPage === "AGENDA VIRTUAL"}
              >
                <ListItemIcon>
                  <EventIcon />
                </ListItemIcon>
                <ListItemText
                  primary="AGENDA VIRTUAL"
                  primaryTypographyProps={{ fontSize: "14px" }}
                />
              </StyledListItemButton>
            </List>
          </Collapse>

          <StyledListItemButton
            onClick={handleServiciosClick}
            selected={selectedPage === "SERVICIOS AMBULATORIOS"}
          >
            <ListItemIcon>
              <MonitorHeartIcon />
            </ListItemIcon>
            <ListItemText
              primary="SERVICIOS AMBULATORIOS"
              primaryTypographyProps={{ fontSize: "15px", fontWeight: 600 }}
            />
            {openServiciosAmbulatorios ? <ExpandLess /> : <ExpandMore />}
          </StyledListItemButton>
          <Collapse in={openServiciosAmbulatorios} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <StyledListItemButton
                sx={{ pl: 4 }}
                onClick={() => handlePageSelect("SERVICIOS AMBULATORIOS")}
                selected={selectedPage === "SERVICIOS AMBULATORIOS"}
              >
                <ListItemIcon>
                  <MonitorHeartIcon />
                </ListItemIcon>
                <ListItemText
                  primary="SERVICIOS AMBULATORIOS"
                  primaryTypographyProps={{ fontSize: "14px" }}
                />
              </StyledListItemButton>
            </List>
          </Collapse>

          <StyledListItemButton
            onClick={handleHospitalarioClick}
            selected={selectedPage === "CAMAS" || selectedPage === "REPORTE HISTORIA CLINICA"}
          >
            <ListItemIcon>
              <LocalHospitalIcon />
            </ListItemIcon>
            <ListItemText
              primary="HOSPITALARIO"
              primaryTypographyProps={{ fontSize: "15px", fontWeight: 600 }}
            />
            {openHospitalario ? <ExpandLess /> : <ExpandMore />}
          </StyledListItemButton>
          <Collapse in={openHospitalario} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <StyledListItemButton
                sx={{ pl: 4 }}
                onClick={() => handlePageSelect("CAMAS")}
                selected={selectedPage === "CAMAS"}
              >
                <ListItemIcon>
                  <AirlineSeatFlatIcon />
                </ListItemIcon>
                <ListItemText
                  primary="CAMAS"
                  primaryTypographyProps={{ fontSize: "14px" }}
                />
              </StyledListItemButton>
              <StyledListItemButton
                sx={{ pl: 4 }}
                onClick={() => handlePageSelect("REPORTE HISTORIA CLINICA")}
                selected={selectedPage === "REPORTE HISTORIA CLINICA"}
              >
                <ListItemIcon>
                  <ReportIcon />
                </ListItemIcon>
                <ListItemText
                  primary="REPORTE HISTORIA CLINICA"
                  primaryTypographyProps={{ fontSize: "14px" }}
                />
              </StyledListItemButton>
            </List>
          </Collapse>

          <StyledListItemButton
            onClick={handleFacturacionClick}
            selected={
              selectedPage === "ADMISION" ||
              selectedPage === "TARIFARIO DE SERVICIOS" ||
              selectedPage === "TARIFARIO DE CONVENIO" ||
              selectedPage === "AUTORIZACION (CREDITO / DESCUENTO)" ||
              selectedPage === "CAJA (FACTURACION)" ||
              selectedPage === "ANULACION DE DOCUMENTO" ||
              selectedPage === "ANTICIPOS" ||
              selectedPage === "ESTADO DE CUENTAS" ||
              selectedPage === "VENTAS" ||
              selectedPage === "CARTERA" ||
              selectedPage === "CIERRE DE CAJA"
            }
          >
            <ListItemIcon>
              <ReceiptIcon />
            </ListItemIcon>
            <ListItemText
              primary="FACTURACION"
              primaryTypographyProps={{ fontSize: "15px", fontWeight: 600 }}
            />
            {openFacturacion ? <ExpandLess /> : <ExpandMore />}
          </StyledListItemButton>
          <Collapse in={openFacturacion} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <StyledListItemButton
                sx={{ pl: 4 }}
                onClick={() => handlePageSelect("ADMISION")}
                selected={selectedPage === "ADMISION"}
              >
                <ListItemIcon>
                  <PersonAddIcon />
                </ListItemIcon>
                <ListItemText
                  primary="ADMISION"
                  primaryTypographyProps={{ fontSize: "14px" }}
                />
              </StyledListItemButton>
              <StyledListItemButton
                sx={{ pl: 4 }}
                onClick={() => handlePageSelect("TARIFARIO DE SERVICIOS")}
                selected={selectedPage === "TARIFARIO DE SERVICIOS"}
              >
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText
                  primary="TARIFARIO DE SERVICIOS"
                  primaryTypographyProps={{ fontSize: "14px" }}
                />
              </StyledListItemButton>
              <StyledListItemButton
                sx={{ pl: 4 }}
                onClick={() => handlePageSelect("TARIFARIO DE CONVENIO")}
                selected={selectedPage === "TARIFARIO DE CONVENIO"}
              >
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText
                  primary="TARIFARIO DE CONVENIO"
                  primaryTypographyProps={{ fontSize: "14px" }}
                />
              </StyledListItemButton>
              <StyledListItemButton
                sx={{ pl: 4 }}
                onClick={() => handlePageSelect("AUTORIZACION (CREDITO / DESCUENTO)")}
                selected={selectedPage === "AUTORIZACION (CREDITO / DESCUENTO)"}
              >
                <ListItemIcon>
                  <AccountBalanceIcon />
                </ListItemIcon>
                <ListItemText
                  primary="AUTORIZACION (CREDITO / DESCUENTO)"
                  primaryTypographyProps={{ fontSize: "14px" }}
                />
              </StyledListItemButton>
              <StyledListItemButton
                sx={{ pl: 4 }}
                onClick={() => handlePageSelect("CAJA (FACTURACION)")}
                selected={selectedPage === "CAJA (FACTURACION)"}
              >
                <ListItemIcon>
                  <PointOfSaleIcon />
                </ListItemIcon>
                <ListItemText
                  primary="CAJA (FACTURACION)"
                  primaryTypographyProps={{ fontSize: "14px" }}
                />
              </StyledListItemButton>
              <StyledListItemButton
                sx={{ pl: 4 }}
                onClick={() => handlePageSelect("ANULACION DE DOCUMENTO")}
                selected={selectedPage === "ANULACION DE DOCUMENTO"}
              >
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText
                  primary="ANULACION DE DOCUMENTO"
                  primaryTypographyProps={{ fontSize: "14px" }}
                />
              </StyledListItemButton>
              <StyledListItemButton
                sx={{ pl: 4 }}
                onClick={() => handlePageSelect("ANTICIPOS")}
                selected={selectedPage === "ANTICIPOS"}
              >
                <ListItemIcon>
                  <AccountBalanceIcon />
                </ListItemIcon>
                <ListItemText
                  primary="ANTICIPOS"
                  primaryTypographyProps={{ fontSize: "14px" }}
                />
              </StyledListItemButton>
              <StyledListItemButton
                sx={{ pl: 4 }}
                onClick={() => handlePageSelect("ESTADO DE CUENTAS")}
                selected={selectedPage === "ESTADO DE CUENTAS"}
              >
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText
                  primary="ESTADO DE CUENTAS"
                  primaryTypographyProps={{ fontSize: "14px" }}
                />
              </StyledListItemButton>
              <StyledListItemButton
                sx={{ pl: 4 }}
                onClick={() => handlePageSelect("VENTAS")}
                selected={selectedPage === "VENTAS"}
              >
                <ListItemIcon>
                  <PointOfSaleIcon />
                </ListItemIcon>
                <ListItemText
                  primary="VENTAS"
                  primaryTypographyProps={{ fontSize: "14px" }}
                />
              </StyledListItemButton>
              <StyledListItemButton
                sx={{ pl: 4 }}
                onClick={() => handlePageSelect("CARTERA")}
                selected={selectedPage === "CARTERA"}
              >
                <ListItemIcon>
                  <AccountBalanceIcon />
                </ListItemIcon>
                <ListItemText
                  primary="CARTERA"
                  primaryTypographyProps={{ fontSize: "14px" }}
                />
              </StyledListItemButton>
              <StyledListItemButton
                sx={{ pl: 4 }}
                onClick={() => handlePageSelect("CIERRE DE CAJA")}
                selected={selectedPage === "CIERRE DE CAJA"}
              >
                <ListItemIcon>
                  <LockPersonIcon />
                </ListItemIcon>
                <ListItemText
                  primary="CIERRE DE CAJA"
                  primaryTypographyProps={{ fontSize: "14px" }}
                />
              </StyledListItemButton>
            </List>
          </Collapse>

          <StyledListItemButton
            onClick={handleFarmaciaClick}
            selected={
              selectedPage === "INSUMOS" ||
              selectedPage === "BODEGAS" ||
              selectedPage === "MOVIMIENTOS" ||
              selectedPage === "AJUSTE DE INSUMO" ||
              selectedPage === "TOMA DE INVENTARIO" ||
              selectedPage === "KARDEX" ||
              selectedPage === "PROVEEDORES" ||
              selectedPage === "STOCK DE INSUMOS"
            }
          >
            <ListItemIcon>
              <MedicalServicesIcon />
            </ListItemIcon>
            <ListItemText
              primary="FARMACIA"
              primaryTypographyProps={{ fontSize: "15px", fontWeight: 600 }}
            />
            {openFarmacia ? <ExpandLess /> : <ExpandMore />}
          </StyledListItemButton>
          <Collapse in={openFarmacia} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <StyledListItemButton
                sx={{ pl: 4 }}
                onClick={() => handlePageSelect("INSUMOS")}
                selected={selectedPage === "INSUMOS"}
              >
                <ListItemIcon>
                  <MedicalServicesIcon />
                </ListItemIcon>
                <ListItemText
                  primary="INSUMOS"
                  primaryTypographyProps={{ fontSize: "14px" }}
                />
              </StyledListItemButton>
              <StyledListItemButton
                sx={{ pl: 4 }}
                onClick={() => handlePageSelect("BODEGAS")}
                selected={selectedPage === "BODEGAS"}
              >
                <ListItemIcon>
                  <WarehouseIcon />
                </ListItemIcon>
                <ListItemText
                  primary="BODEGAS"
                  primaryTypographyProps={{ fontSize: "14px" }}
                />
              </StyledListItemButton>
              <StyledListItemButton
                sx={{ pl: 4 }}
                onClick={() => handlePageSelect("MOVIMIENTOS")}
                selected={selectedPage === "MOVIMIENTOS"}
              >
                <ListItemIcon>
                  <SwapHorizIcon />
                </ListItemIcon>
                <ListItemText
                  primary="MOVIMIENTOS"
                  primaryTypographyProps={{ fontSize: "14px" }}
                />
              </StyledListItemButton>
              <StyledListItemButton
                sx={{ pl: 4 }}
                onClick={() => handlePageSelect("AJUSTE DE INSUMO")}
                selected={selectedPage === "AJUSTE DE INSUMO"}
              >
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText
                  primary="AJUSTE DE INSUMO"
                  primaryTypographyProps={{ fontSize: "14px" }}
                />
              </StyledListItemButton>
              <StyledListItemButton
                sx={{ pl: 4 }}
                onClick={() => handlePageSelect("TOMA DE INVENTARIO")}
                selected={selectedPage === "TOMA DE INVENTARIO"}
              >
                <ListItemIcon>
                  <InventoryIcon />
                </ListItemIcon>
                <ListItemText
                  primary="TOMA DE INVENTARIO"
                  primaryTypographyProps={{ fontSize: "14px" }}
                />
              </StyledListItemButton>
              <StyledListItemButton
                sx={{ pl: 4 }}
                onClick={() => handlePageSelect("KARDEX")}
                selected={selectedPage === "KARDEX"}
              >
                <ListItemIcon>
                  <DescriptionIcon />
                </ListItemIcon>
                <ListItemText
                  primary="KARDEX"
                  primaryTypographyProps={{ fontSize: "14px" }}
                />
              </StyledListItemButton>
              <StyledListItemButton
                sx={{ pl: 4 }}
                onClick={() => handlePageSelect("PROVEEDORES")}
                selected={selectedPage === "PROVEEDORES"}
              >
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText
                  primary="PROVEEDORES"
                  primaryTypographyProps={{ fontSize: "14px" }}
                />
              </StyledListItemButton>
              <StyledListItemButton
                sx={{ pl: 4 }}
                onClick={() => handlePageSelect("STOCK DE INSUMOS")}
                selected={selectedPage === "STOCK DE INSUMOS"}
              >
                <ListItemIcon>
                  <StorageIcon />
                </ListItemIcon>
                <ListItemText
                  primary="STOCK DE INSUMOS"
                  primaryTypographyProps={{ fontSize: "14px" }}
                />
              </StyledListItemButton>
            </List>
          </Collapse>

          <StyledListItemButton
            onClick={handleReportesClick}
            selected={selectedPage === "MOVIMIENTO DE PACIENTES"}
          >
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText
              primary="REPORTES"
              primaryTypographyProps={{ fontSize: "15px", fontWeight: 600 }}
            />
            {openReportes ? <ExpandLess /> : <ExpandMore />}
          </StyledListItemButton>
          <Collapse in={openReportes} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <StyledListItemButton
                sx={{ pl: 4 }}
                onClick={() => handlePageSelect("MOVIMIENTO DE PACIENTES")}
                selected={selectedPage === "MOVIMIENTO DE PACIENTES"}
              >
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText
                  primary="MOVIMIENTO DE PACIENTES"
                  primaryTypographyProps={{ fontSize: "14px" }}
                />
              </StyledListItemButton>
            </List>
          </Collapse>

          <StyledListItemButton
            onClick={handleSeguridadClick}
            selected={selectedPage === "USUARIOS" || selectedPage === "PERFILES" || selectedPage === "AUDITORIA"}
          >
            <ListItemIcon>
              <SecurityIcon />
            </ListItemIcon>
            <ListItemText
              primary="SEGURIDAD"
              primaryTypographyProps={{ fontSize: "15px", fontWeight: 600 }}
            />
            {openSeguridad ? <ExpandLess /> : <ExpandMore />}
          </StyledListItemButton>
          <Collapse in={openSeguridad} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <StyledListItemButton
                sx={{ pl: 4 }}
                onClick={() => handlePageSelect("USUARIOS")}
                selected={selectedPage === "USUARIOS"}
              >
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText
                  primary="USUARIOS"
                  primaryTypographyProps={{ fontSize: "14px" }}
                />
              </StyledListItemButton>
              <StyledListItemButton
                sx={{ pl: 4 }}
                onClick={() => handlePageSelect("PERFILES")}
                selected={selectedPage === "PERFILES"}
              >
                <ListItemIcon>
                  <AdminPanelSettingsIcon />
                </ListItemIcon>
                <ListItemText
                  primary="PERFILES"
                  primaryTypographyProps={{ fontSize: "14px" }}
                />
              </StyledListItemButton>
              <StyledListItemButton
                sx={{ pl: 4 }}
                onClick={() => handlePageSelect("AUDITORIA")}
                selected={selectedPage === "AUDITORIA"}
              >
                <ListItemIcon>
                  <SecurityIcon />
                </ListItemIcon>
                <ListItemText
                  primary="AUDITORIA"
                  primaryTypographyProps={{ fontSize: "14px" }}
                />
              </StyledListItemButton>
            </List>
          </Collapse>
        </SidebarList>
      </SidebarListContainer>
    </Sidebar>
  );
};

export default SidebarMenu;