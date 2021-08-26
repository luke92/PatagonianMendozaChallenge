import React, { useState } from "react";
import parse from "html-react-parser";
import "./styles.css";

export default function App() {
  const [activationCode, setActivationCode] = useState("");
  const [mensaje, setMensaje] = useState("");
  return (
    <div className="App">
      <h1>Ingrese el código de seguridad</h1>
      <input
        id="activationCode"
        onChange={(e) => setActivationCode(e.target.value)}
        value={activationCode}
      />
      <button
        id="activationCodeSubmit"
        onClick={() => {
          if (!activationCode || activationCode === "") {
            alert("El código de activacion no puede ser vacio!");
          } else {
            fetch(
              `https://us-central1-patagoniankpi-1540493789432.cloudfunctions.net/MendozaPatagonianChallenge?activationCode=${activationCode}`,
              {
                // Adding method type
                method: "POST"
              }
            )
              .then((r) => r.json())
              .then((r) => setMensaje(r.message));
          }
        }}
      >
        Cancelar explosion
      </button>
      <div>
        {mensaje.length > 0 && (
          <div style={{ marginTop: "20px" }}>{parse(mensaje)}</div>
        )}
        {mensaje.length === 0 && (
          <img
            src={"/tickingbomb.gif"}
            style={{ marginTop: "20px", width: "200px", height: "200px" }}
            alt="Bomba tic tac..."
          />
        )}
      </div>
    </div>
  );
}
