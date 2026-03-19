import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import twitterLogo from "../twitter.svg";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate(); // ✅ DEFINIDO AQUI

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username) return;

    localStorage.setItem("@GoTwitter:username", username);

    navigate("/timeline"); // ✅ AGORA FUNCIONA
  };

  return (
    <div className="login-wrapper">
      <img src={twitterLogo} alt="GoTwitter" />
      <form onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nome de usuário"
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}