import React, { useState } from "react";

const API_URL = "https://centerpet-api.onrender.com/api/auth/reset-password"; // Altere se necessário

function getTokenFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("token");
}

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const token = getTokenFromUrl();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMsg("");

    if (!password || !confirm) {
      setError("Preencha todos os campos.");
      return;
    }
    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    if (password !== confirm) {
      setError("As senhas não coincidem.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg("Senha redefinida com sucesso! Você já pode fazer login.");
      } else {
        setError(data.message || "Erro ao redefinir senha.");
      }
    } catch  {
      setError("Erro ao conectar ao servidor.");
    }
    setLoading(false);
  };

  if (!token) {
    return <div style={{ padding: 32, color: "#d14d72" }}>Token inválido ou ausente.</div>;
  }

  return (
    <div className="reset-password-container" style={{ maxWidth: 400, margin: "40px auto", background: "#fff", borderRadius: 12, boxShadow: "0 4px 24px #d14d7215", padding: 32 }}>
      <h2 style={{ color: "#d14d72", marginBottom: 20 }}>Redefinir Senha</h2>
      <form onSubmit={handleSubmit}>
        <label style={{ display: "block", marginBottom: 8 }}>
          Nova senha:
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: "100%", padding: 8, marginTop: 4, borderRadius: 6, border: "1px solid #eee" }}
            minLength={6}
            required
          />
        </label>
        <label style={{ display: "block", marginBottom: 16 }}>
          Confirmar nova senha:
          <input
            type="password"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            style={{ width: "100%", padding: 8, marginTop: 4, borderRadius: 6, border: "1px solid #eee" }}
            minLength={6}
            required
          />
        </label>
        {error && <div style={{ color: "#d14d72", marginBottom: 12 }}>{error}</div>}
        {msg && <div style={{ color: "#2e7d32", marginBottom: 12 }}>{msg}</div>}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            background: "#d14d72",
            color: "#fff",
            padding: "10px 0",
            border: "none",
            borderRadius: 8,
            fontWeight: "bold",
            fontSize: 16,
            cursor: loading ? "not-allowed" : "pointer",
            marginTop: 8,
          }}
        >
          {loading ? "Redefinindo..." : "Redefinir Senha"}
        </button>
      </form>
    </div>
  );
}