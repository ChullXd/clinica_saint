import React from "react";
import { Link } from "react-router-dom";
import "./Camas.css";

const Camas: React.FC = () => {
  return (
    <div className="camas-container">
      <nav className="camas-nav">
        <ul className="nav-list">
          {/* Emergencia */}
          <li className="nav-item">
            <span className="nav-link">EMERGENCIA</span>
            <ul className="dropdown">
              <li>
                <Link to="/emergencia/alta">Alta Médica</Link>
              </li>
              <li className="dropdown-item">
                <span>Historia Clínica</span>
                <ul className="sub-dropdown">
                  <li>
                    <Link to="/emergencia/historia/evolucion">Evolución</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/emergencia/enfermeria">Enfermería</Link>
              </li>
              <li>
                <Link to="/emergencia/certificado">Certificado Médico</Link>
              </li>
              <li>
                <Link to="/emergencia/insumos">Carga de Insumos</Link>
              </li>
            </ul>
          </li>

          {/* Hospitalización */}
          <li className="nav-item">
            <span className="nav-link">HOSPITALIZACIÓN</span>
            <ul className="dropdown">
              <li>
                <Link to="/hospitalizacion/alta">Alta Médica</Link>
              </li>
              <li className="dropdown-item">
                <span>Historia Clínica</span>
                <ul className="sub-dropdown">
                  <li>
                    <Link to="/hospitalizacion/historia/evolucion">
                      Evolución
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/hospitalizacion/enfermeria">Enfermería</Link>
              </li>
              <li>
                <Link to="/hospitalizacion/certificado">
                  Certificado Médico
                </Link>
              </li>
              <li>
                <Link to="/hospitalizacion/insumos">Carga de Insumos</Link>
              </li>
            </ul>
          </li>

          {/* Postquirúrgico */}
          <li className="nav-item">
            <span className="nav-link">POSTQUIRÚRGICO</span>
            <ul className="dropdown">
              <li>
                <Link to="/postquirurgico/alta">Alta Médica</Link>
              </li>
              <li className="dropdown-item">
                <span>Historia Clínica</span>
                <ul className="sub-dropdown">
                  <li>
                    <Link to="/postquirurgico/historia/evolucion">
                      Evolución
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/postquirurgico/enfermeria">Enfermería</Link>
              </li>
              <li>
                <Link to="/postquirurgico/certificado">Certificado Médico</Link>
              </li>
              <li>
                <Link to="/postquirurgico/insumos">Carga de Insumos</Link>
              </li>
            </ul>
          </li>

          {/* Quirófano */}
          <li className="nav-item">
            <span className="nav-link">QUIRÓFANO</span>
            <ul className="dropdown">
              <li>
                <Link to="/quirofano/alta">Alta Médica</Link>
              </li>
              <li>
                <Link to="/quirofano/historia">Historia Clínica</Link>
              </li>
              <li>
                <Link to="/quirofano/anestesia">Protocolo Anestésico</Link>
              </li>
            </ul>
          </li>

          {/* Neonatos */}
          <li className="nav-item">
            <span className="nav-link">NEONATOS</span>
            <ul className="dropdown">
              <li>
                <Link to="/neonatos/alta">Alta Médica</Link>
              </li>
              <li className="dropdown-item">
                <span>Historia Clínica</span>
                <ul className="sub-dropdown">
                  <li>
                    <Link to="/neonatos/historia/evolucion">Evolución</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/neonatos/enfermeria">Enfermería</Link>
              </li>
              <li>
                <Link to="/neonatos/certificado">Certificado Médico</Link>
              </li>
              <li>
                <Link to="/neonatos/insumos">Carga de Insumos</Link>
              </li>
            </ul>
          </li>

          {/* Reporte Historia Clínica */}
          <li className="nav-item">
            <Link to="/reporte-historia" className="nav-link">
              REPORTE HISTORIA
            </Link>
          </li>
        </ul>
      </nav>
      <div className="camas-content">
        <h1>Gestión de Camas</h1>
        <p>Selecciona una opción del menú superior para gestionar las camas.</p>
      </div>
    </div>
  );
};

export default Camas;
