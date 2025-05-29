import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import TitleType from "../../components/Atoms/TitleType/TitleType";
import ButtonType from "../../components/Atoms/ButtonType/ButtonType";
import Swal from "sweetalert2";
import "./AdoptionPage.css";

export default function AdoptionPage() {
  const [showDetails, setShowDetails] = useState(false);
  const toggleDetails = () => setShowDetails((prev) => !prev);
  const { petId, userId, ongId } = useParams();
  const navigate = useNavigate();
  const { userType } = useAuth();

  const [pet, setPet] = useState(null);
  const [adopter, setAdopter] = useState(null);
  const [ong, setOng] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!petId || !userId || !ongId) {
      Swal.fire({
        title: "Erro",
        text: "IDs necessários estão ausentes na URL.",
        icon: "error",
      }).then(() => navigate("/", { replace: true }));
      return;
    }

    const fetchData = async () => {
      try {
        const [petRes, adopterRes, ongRes] = await Promise.all([
          fetch(`https://centerpet-api.onrender.com/api/pets/${petId}`),
          fetch(`https://centerpet-api.onrender.com/api/users/${userId}`),
          fetch(`https://centerpet-api.onrender.com/api/ongs/${ongId}`)
        ]);

        if (!petRes.ok) throw new Error("Erro ao buscar informações do pet.");
        if (!adopterRes.ok) throw new Error("Erro ao buscar informações do adotante.");
        if (!ongRes.ok) throw new Error("Erro ao buscar informações da ONG.");

        const [petData, adopterData, ongData] = await Promise.all([
          petRes.json(),
          adopterRes.json(),
          ongRes.json()
        ]);

        setPet(petData);
        setAdopter(adopterData);
        setOng(ongData);
      } catch (err) {
        console.error(err);
        Swal.fire({
          title: "Erro",
          text: "Erro ao carregar informações da adoção. Por favor, tente novamente.",
          icon: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [petId, userId, ongId, navigate]);

  const handleAccept = async () => {
    try {
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
      console.error(err);
      Swal.fire({
        title: "Erro",
        text: err.message || "Erro ao aceitar solicitação.",
        icon: "error",
      });
    }
  };

  const handleReject = async () => {
    try {
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
      console.error(err);
      Swal.fire({
        title: "Erro",
        text: err.message || "Erro ao recusar solicitação.",
        icon: "error",
      });
    }
  };

  if (loading) {
    return <div className="adoption-page-container">Carregando...</div>;
  }

  return (
    <div className="adoption-page-container">
      <TitleType>Detalhes da Solicitação de Adoção</TitleType>
      <div className="adoption-info-section">
        <div className="adoption-card">
          <h3>Pet</h3>
          <div>
            {pet ? (
              <img
                src={pet.images?.[0] || "https://i.imgur.com/WanR0b3.png"}
                alt={pet.name || "Imagem do pet"}
                className="adoption-pet-img"
              />
            ) : (
              <img
                src="https://i.imgur.com/WanR0b3.png"
                alt="Imagem do pet não disponível"
                className="adoption-pet-img"
              />
            )}

            <p><strong>Nome:</strong> {pet?.name || "Não informado"}</p>
            <p><strong>Espécie:</strong> {pet?.type || "Não informado"}</p>
            <p><strong>Raça:</strong> {pet?.breed || "Não informado"}</p>
            <p><strong>Sexo:</strong> {pet?.gender || "Não informado"}</p>
            <p><strong>Idade:</strong> {pet?.age || "Não informado"}</p>
            <p><strong>Porte:</strong> {pet?.size || "Não informado"}</p>
            <p><strong>Pelagem:</strong> {pet?.coat || "Não informado"}</p>
            <p><strong>Cidade:</strong> {pet?.city || "Não informada"}</p>
            <p><strong>Estado:</strong> {pet?.state || "Não informado"}</p>
            <p><strong>Tempo de espera:</strong> {pet?.waitingTime ? `${pet.waitingTime} dias` : "Não informado"}</p>
          </div>
        </div>
        <div className="adoption-card">
          <h3>Adotante</h3>
          <div>
            <img
              src={adopter?.profileImg || "https://i.imgur.com/WanR0b3.png"}
              alt="Foto do adotante"
              className="adoption-pet-img"
            />

            <p><strong>Nome:</strong> {adopter?.fullName || "Não informado"}</p>
            <p><strong>Email:</strong> {adopter?.email || "Não informado"}</p>
            <p><strong>Telefone:</strong> {adopter?.phone || "Não informado"}</p>
            <p><strong>Profissão:</strong> {adopter?.profession || "Não informado"}</p>
            <p><strong>Descrição pessoal:</strong> {adopter?.description || "Não informada"}</p>
            <p><strong>Data de nascimento:</strong> {adopter?.birth ? new Date(adopter.birth).toLocaleDateString() : "Não informada"}</p>
            <p><strong>CPF:</strong> {adopter?.cpf || "Não informado"}</p>
            <p><strong>Endereço:</strong> {adopter?.street || "Rua não informada"}, Nº {adopter?.number || "s/n"} — {adopter?.neighborhood || "Bairro não informado"}, {adopter?.city || "Cidade não informada"} - {adopter?.cep || "CEP não informado"}</p>

            <ButtonType onClick={toggleDetails} className="toggle-details-btn">
              {showDetails ? "Ocultar detalhes" : "Mostrar mais detalhes"}
            </ButtonType>

            {showDetails && (
              <div className="adopter-details">

                <p><strong>Tipo de moradia:</strong> {adopter?.housingType || "Não informado"}</p>
                <p><strong>Possui casa própria:</strong> {adopter?.homeOwnership === "Own" ? "Sim" : adopter?.homeOwnership === "Rent" ? "Alugada" : "Não informado"}</p>
                <p><strong>Animais são permitidos:</strong> {adopter?.petsAllowed === true ? "Sim" : adopter?.petsAllowed === false ? "Não" : "Não informado"}</p>
                <p><strong>Local é seguro:</strong> {adopter?.homeSafety === true ? "Sim" : adopter?.homeSafety === false ? "Não" : "Não informado"}</p>

                <p><strong>Número de moradores:</strong> {adopter?.numberOfHouseholdMembers ?? "Não informado"}</p>
                <p><strong>Já teve ou tem pets?</strong> {adopter?.hasOrHadPets || "Não informado"}</p>
                <p><strong>Detalhes dos pets:</strong> {adopter?.currentPetsDetails || "Não informado"}</p>
                <p><strong>Onde o pet dormirá:</strong> {adopter?.sleepingPlace || "Não informado"}</p>
                <p><strong>Horas sozinho por dia:</strong> {adopter?.petAloneHoursPerDay || "Não informado"}</p>

                <p><strong>Motivo para adoção:</strong> {adopter?.reasonToAdopt || "Não informado"}</p>
                <p><strong>Comportamento esperado:</strong> {adopter?.expectedPetBehavior || "Não informado"}</p>
                <p><strong>Como lida com comportamento ruim:</strong> {adopter?.howHandleUndesiredBehavior || "Não informado"}</p>
                <p><strong>Treinar o pet:</strong> {adopter?.willingToTrain === true ? "Sim" : "Não"}</p>
                <p><strong>Vacinar regularmente:</strong> {adopter?.keepVaccinesUpToDate === true ? "Sim" : "Não"}</p>
                <p><strong>Veterinário com frequência:</strong> {adopter?.regularVetVisits === true ? "Sim" : "Não"}</p>
                <p><strong>Compromisso de não abandonar:</strong> {adopter?.commitToNeverAbandon === true ? "Sim" : "Não"}</p>
                <p><strong>Devolveria à ONG?</strong> {adopter?.returnToOng === true ? "Sim" : "Não"}</p>
                <p><strong>Possui alergia:</strong> {adopter?.allergy === true ? "Sim" : "Não"}</p>

                <p><strong>Ciente da lei:</strong> {adopter?.awareOfLaw === true ? "Sim" : "Não"}</p>
                <p><strong>Ciente das responsabilidades:</strong> {adopter?.awareOfResponsibilities === true ? "Sim" : "Não"}</p>
                <p><strong>Família concorda:</strong> {adopter?.familyAgreement === true ? "Sim" : "Não"}</p>
                <p><strong>Concorda com declaração final:</strong> {adopter?.finalDeclarationAgreement === true ? "Sim" : "Não"}</p>
                <p><strong>Tem condições financeiras:</strong> {adopter?.financialConditions === true ? "Sim" : "Não"}</p>
              </div>
            )}
          </div>
        </div>
        <div className="adoption-card">
          <h3>ONG Responsável</h3>
          <div>
            <img
              src={ong?.profileImg || "https://i.imgur.com/WanR0b3.png"}
              alt="Foto da ONG"
              className="adoption-pet-img"
            />

            <p><strong>Nome:</strong> {ong?.name || "Não informado"}</p>
            <p><strong>Email:</strong> {ong?.email || "Não informado"}</p>
            <p><strong>Telefone:</strong> {ong?.phone || "Não informado"}</p>
            <p><strong>Função:</strong> {ong?.role || "Não informada"}</p>
            <p><strong>Pets registrados:</strong> {ong?.petsRegisters ?? "Não informado"}</p>
            <p><strong>Pets adotados:</strong> {ong?.petsAdopted ?? "Não informado"}</p>
            <p><strong>Verificada:</strong> {ong?.verified ? "Sim" : "Não"}</p>

            <p><strong>Endereço:</strong></p>
            <p>
              {[
                ong?.address?.street || "Rua não informada",
                ong?.address?.number || "s/n",
                ong?.address?.neighborhood || "Bairro não informado",
                ong?.address?.city || "Cidade não informada",
                ong?.address?.uf || "UF não informada",
                ong?.address?.cep || "CEP não informado",
                ong?.address?.complement && `(${ong.address.complement})`,
              ]
                .filter(Boolean)
                .join(", ")}
            </p>
          </div>
        </div>
      </div>
      {userType === "Ong" && (
        <div className="adoption-actions">
          <ButtonType className="accept-btn" onClick={handleAccept} bgColor="green">Aceitar Solicitação</ButtonType>
          <ButtonType className="reject-btn" onClick={handleReject} bgColor="red">Recusar Solicitação</ButtonType>
        </div>
      )}
    </div>
  );
}
