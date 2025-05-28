import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import  useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import "./AdoptionPage.css";

export default function AdoptionPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user, userType } = useAuth();

  const [pet, setPet] = useState(null);
  const [adopter, setAdopter] = useState(null);
  const [ong, setOng] = useState(null);
  const [loading, setLoading] = useState(true);

  // IDs vindos do state (navegação)
  const { petId, userId, ongId } = state || {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Buscar informações do pet
        const petRes = await fetch(`https://centerpet-api.onrender.com/api/pets/${petId}`);
        const petData = await petRes.json();
        setPet(petData);

        // Buscar informações do adotante
        const adopterRes = await fetch(`https://centerpet-api.onrender.com/api/users/${userId}`);
        const adopterData = await adopterRes.json();
        setAdopter(adopterData);

        // Buscar informações da ONG
        const ongRes = await fetch(`https://centerpet-api.onrender.com/api/ongs/${ongId}`);
        const ongData = await ongRes.json();
        setOng(ongData);

        setLoading(false);
      } catch (err) {
        Swal.fire({
          title: "Erro",
          text: "Erro ao carregar informações da adoção.",
          icon: "error",
        });
        setLoading(false);
      }
    };

    if (petId && userId && ongId) {
      fetchData();
    }
  }, [petId, userId, ongId]);

  const handleAccept = async () => {
    try {
      // Chame a API para aceitar a adoção (ajuste a rota conforme seu backend)
      const res = await fetch(`https://centerpet-api.onrender.com/api/adoptions/accept`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ petId, userId, ongId }),
      });
      if (!res.ok) throw new Error("Erro ao aceitar solicitação.");
      Swal.fire({
        title: "Solicitação aceita!",
        icon: "success",
        confirmButtonColor: "#FF8BA7",
      }).then(() => navigate(-1));
    } catch (err) {
      Swal.fire({
        title: "Erro",
        text: err.message,
        icon: "error",
      });
    }
  };

  const handleReject = async () => {
    try {
      // Chame a API para recusar a adoção (ajuste a rota conforme seu backend)
      const res = await fetch(`https://centerpet-api.onrender.com/api/adoptions/reject`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ petId, userId, ongId }),
      });
      if (!res.ok) throw new Error("Erro ao recusar solicitação.");
      Swal.fire({
        title: "Solicitação recusada!",
        icon: "info",
        confirmButtonColor: "#FF8BA7",
      }).then(() => navigate(-1));
    } catch (err) {
      Swal.fire({
        title: "Erro",
        text: err.message,
        icon: "error",
      });
    }
  };

  if (loading) {
    return <div className="adoption-page-container">Carregando...</div>;
  }

  return (
    <div className="adoption-page-container">
      <h2>Detalhes da Solicitação de Adoção</h2>
      <div className="adoption-info-section">
        <div className="adoption-card">
          <h3>Pet</h3>
          {pet ? (
            <div>
              <img src={pet.images?.[0] || "https://i.imgur.com/WanR0b3.png"} alt={pet.name} className="adoption-pet-img" />
              <p><strong>Nome:</strong> {pet.name}</p>
              <p><strong>Espécie:</strong> {pet.species}</p>
              <p><strong>Idade:</strong> {pet.age}</p>
            </div>
          ) : (
            <p>Informações do pet não encontradas.</p>
          )}
        </div>
        <div className="adoption-card">
          <h3>Adotante</h3>
          {adopter ? (
            <div>
              <p><strong>Nome:</strong> {adopter.name}</p>
              <p><strong>Email:</strong> {adopter.email}</p>
              <p><strong>Telefone:</strong> {adopter.phone}</p>
            </div>
          ) : (
            <p>Informações do adotante não encontradas.</p>
          )}
        </div>
        <div className="adoption-card">
          <h3>ONG Responsável</h3>
          {ong ? (
            <div>
              <p><strong>Nome:</strong> {ong.name}</p>
              <p><strong>Email:</strong> {ong.email}</p>
              <p><strong>Telefone:</strong> {ong.phone}</p>
            </div>
          ) : (
            <p>Informações da ONG não encontradas.</p>
          )}
        </div>
      </div>
      {userType === "Ong" && (
        <div className="adoption-actions">
          <button className="accept-btn" onClick={handleAccept}>Aceitar Solicitação</button>
          <button className="reject-btn" onClick={handleReject}>Recusar Solicitação</button>
        </div>
      )}
    </div>
  );
}