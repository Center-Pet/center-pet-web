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
  const { adoptionId } = useParams();
  const navigate = useNavigate();
  const { userType } = useAuth();

  const [adoption, setAdoption] = useState(null);
  const [pet, setPet] = useState(null);
  const [adopter, setAdopter] = useState(null);
  const [loading, setLoading] = useState(true);

  // Função para traduzir o status da adoção de acordo com o schema do MongoDB
  const translateStatus = (status) => {
    if (!status) return "Solicitação Recebida";
    
    const statusMap = {
      'requestReceived': 'Solicitação Recebida',
      'inProgress': 'Em Andamento',
      'inAdjustment': 'Em Adaptação',
      'rejected': 'Recusada',
      'completed': 'Concluída',
      'pendente': 'Solicitação Recebida'
    };
    
    return statusMap[status] || status;
  };

  useEffect(() => {
    if (!adoptionId) {
      Swal.fire({
        title: "Erro",
        text: "ID da adoção ausente na URL.",
        icon: "error",
      }).then(() => navigate("/", { replace: true }));
      return;
    }

    const fetchData = async () => {
      try {
        console.log("Buscando adoção com ID:", adoptionId);
        const token = localStorage.getItem("token");
        
        // 1. Primeiro buscar os dados da adoção
        const adoptionRes = await fetch(
          `https://centerpet-api.onrender.com/api/adoptions/${adoptionId}`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );

        if (!adoptionRes.ok) {
          throw new Error(`Erro ao buscar informações da adoção (${adoptionRes.status})`);
        }

        const adoptionData = await adoptionRes.json();
        console.log("Dados da adoção:", adoptionData);
        setAdoption(adoptionData);

        // Extrair os IDs necessários dos dados da adoção
        const { petId, userId } = adoptionData;

        if (!petId || !userId) {
          throw new Error("Dados da adoção incompletos. IDs necessários não encontrados.");
        }        // 2. Agora buscar os dados relacionados
        const [petRes, adopterRes] = await Promise.all([
          fetch(`https://centerpet-api.onrender.com/api/pets/${petId._id || petId}`),
          fetch(`https://centerpet-api.onrender.com/api/adopters/${userId._id || userId}`),
        ].map(promise => promise.catch(err => {
          console.error("Erro em uma das requisições:", err);
          return { ok: false, error: err };
        })));
        
        // Verificar se todas as requisições foram bem-sucedidas
        if (!petRes.ok) throw new Error("Erro ao buscar informações do pet.");
        if (!adopterRes.ok) throw new Error("Erro ao buscar informações do adotante.");

        // Processar as respostas
        const [petData, adopterData] = await Promise.all([
          petRes.json(),
          adopterRes.json()
        ]);

        console.log("Dados do pet:", petData);
        console.log("Dados do adotante:", adopterData);
        console.log("Dados da ONG:");

        setPet(petData);
        setAdopter(adopterData);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
        Swal.fire({
          title: "Erro",
          text: err.message || "Erro ao carregar informações da adoção. Por favor, tente novamente.",
          icon: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [adoptionId, navigate]);
  const handleAccept = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`https://centerpet-api.onrender.com/api/adoptions/${adoptionId}/approve`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        }
      });
      
      if (!res.ok) throw new Error(`Erro ao aceitar solicitação (${res.status})`);
      
      await res.json(); // Process response but we don't need to use the data
      
      Swal.fire({
        title: "Solicitação aceita!",
        text: "A adoção foi aprovada com sucesso.",
        icon: "success",
        confirmButtonColor: "#4caf50",
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
      const token = localStorage.getItem("token");
      const res = await fetch(`https://centerpet-api.onrender.com/api/adoptions/${adoptionId}/reject`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        }
      });
      
      if (!res.ok) throw new Error(`Erro ao recusar solicitação (${res.status})`);
      
      await res.json(); // Process response but we don't need to use the data
      
      Swal.fire({
        title: "Solicitação recusada",
        text: "A adoção foi recusada.",
        icon: "info",
        confirmButtonColor: "#ff4d4d",
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
    return (
      <div className="adoption-page-container">
        <div className="loading-spinner-container">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="adoption-page-container">
      <TitleType>Detalhes da Solicitação de Adoção</TitleType>        {adoption && (
        <div className="adoption-status-container">
          <h3>Status da Adoção: 
            <span className={`adoption-status adoption-status-${adoption.status || 'requestreceived'}`}>
              {translateStatus(adoption.status)}
            </span>
          </h3>
          <p>Data da solicitação: {
            adoption.requestDate || adoption.createdAt 
              ? new Date(adoption.requestDate || adoption.createdAt).toLocaleDateString('pt-BR') + ' às ' + new Date(adoption.requestDate || adoption.createdAt).toLocaleTimeString('pt-BR')
              : "Não informada"
          }</p>
        </div>
      )}
      
      <div className="adoption-info-section">
        <div className="adoption-card">
          <h3>Pet</h3>
          <div>
            {pet ? (
              <img
                src={pet.images?.[0] || pet.image?.[0] || "https://i.imgur.com/WanR0b3.png"}
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
        </div>        <div className="adoption-card">
          <h3>Adotante</h3>
          <div>
            <img
              src={adopter?.profileImg || "https://i.imgur.com/WanR0b3.png"}
              alt="Foto do adotante"
              className="adoption-pet-img"
            />            
            <p><strong>Nome:</strong> {adopter?.fullName || "Não informado"}</p>            {(['inProgress', 'inAdjustment', 'completed', 'approved'].includes(adoption?.status)) ? (
              <>
                <p><strong>Email:</strong> {adopter?.email || "Não informado"}</p>
                <p><strong>Telefone:</strong> {adopter?.phone || "Não informado"}</p>
              </>
            ) : (
              <p><em>As informações de contato serão disponibilizadas após aprovação da adoção.</em></p>
            )}
            <p><strong>Profissão:</strong> {adopter?.profession || "Não informado"}</p>
            <p><strong>Descrição pessoal:</strong> {adopter?.description || "Não informada"}</p>
            <p><strong>Data de nascimento:</strong> {adopter?.birth ? new Date(adopter.birth).toLocaleDateString() : "Não informada"}</p>
            <p><strong>Endereço:</strong>{adopter?.neighborhood || "Bairro não informado"} - {adopter?.city || "Rua não informada"}, {adopter?.state || "s/n"}</p>

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
      </div>
        {userType === "Ong" && (adoption?.status === "requestReceived" || adoption?.status?.toLowerCase() === "pendente") && (
        <div className="adoption-actions">
          <ButtonType className="accept-btn" onClick={handleAccept} bgColor="#4caf50">Aceitar Solicitação</ButtonType>
          <ButtonType className="reject-btn" onClick={handleReject} bgColor="#ff4d4d">Recusar Solicitação</ButtonType>
        </div>
      )}
    </div>
  );
}
