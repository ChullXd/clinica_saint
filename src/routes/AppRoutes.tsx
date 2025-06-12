import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import App from "../App";
import Camas from "../pages/Camas/CamasPage";
import ReservationTabs from "../pages/Programacion/Preadmision/ReservationTabs";
import AgendaVirtual from "../pages/Programacion/AgendaVirtual/AgendaVirtual";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/preadmision" element={<ReservationTabs />} />
      <Route path="/*" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/camas" element={<Camas />} />
      <Route path="/agenda-virtual" element={<AgendaVirtual />} />
    </Routes>
  );
};

export default AppRoutes;
