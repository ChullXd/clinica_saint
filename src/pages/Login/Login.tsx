import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import illustration from "/Clinica_Saint/clinica_saint/src/assets/png/LogoHorizontal.png"; // Ajusta la ruta
import loos from "/Clinica_Saint/clinica_saint/src/assets/png/Logo1.png"; // Ajusta la ruta

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(illustration); // Estado para alternar imágenes

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(currentImage === illustration ? loos : illustration); // Alterna cada 5 segundos
    }, 3000); // 5000 milisegundos = 5 segundos

    // Limpieza del intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, [currentImage]); // Dependencia para evitar duplicados

  const handleLogin = () => {
    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <div className="login-grid">
        <div className="login-illustration">
          <img
            src={currentImage}
            alt="Logo Clinica"
            className="transition-image"
          />{" "}
          {/* Imagen con transición */}
        </div>
        <div className="login-form">
          <img src={illustration} alt="Logo Horizontal" />{" "}
          {/* Imagen estática */}
          <input type="text" placeholder="User name" />
          <input type="password" placeholder="Create password" />
          <div className="password-strength">
            <div></div>
          </div>
          <button className="sign-in-btn" onClick={handleLogin}>
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
