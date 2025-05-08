import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PetShowcase from "../../components/Organisms/PetShowcase/PetShowcase";
import TitleType from "../../components/Atoms/TitleType/TitleType";
import "./ONGProfile.css";

const pets = [
  {
    id: 1,
    image: "/assets/teste.jpg",
    name: "Rex",
    gender: "Macho",
    age: "3 meses",
  },
  {
    id: 2,
    image: "/assets/teste2.jpg",
    name: "Luna",
    gender: "Fêmea",
    age: "2 anos",
  },
  {
    id: 3,
    image: "/assets/teste.jpg",
    name: "Buddy",
    gender: "Macho",
    age: "5 anos",
  },
  {
    id: 4,
    image: "/assets/teste2.jpg",
    name: "Lucy",
    gender: "Fêmea",
    age: "8 meses",
  },
  {
    id: 2,
    image: "/assets/teste2.jpg",
    name: "Luna",
    gender: "Fêmea",
    age: "2 anos",
  },
  {
    id: 3,
    image: "/assets/teste.jpg",
    name: "Buddy",
    gender: "Macho",
    age: "5 anos",
  },
  {
    id: 4,
    image: "/assets/teste2.jpg",
    name: "Lucy",
    gender: "Fêmea",
    age: "8 meses",
  },
];

const ONGProfile = () => {
  const { id } = useParams(); // Obtém o ID da ONG dos parâmetros da URL
  const [ongData, setOngData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOngData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://centerpet-api.onrender.com/ong/${id}`);
        
        if (!response.ok) {
          throw new Error(`Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.success) {
          throw new Error(data.message || "Erro ao buscar dados da ONG");
        }
        
        setOngData(data.data);
      } catch (err) {
        console.error("Erro ao buscar dados da ONG:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOngData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="ong-profile-container">
        <div className="ong-profile-content">
          <div className="loading">Carregando dados da ONG...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ong-profile-container">
        <div className="ong-profile-content">
          <div className="error">
            <h3>Erro ao carregar dados da ONG</h3>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ong-profile-container">
      <div className="ong-profile-content">
        <div className="ong-profile-header-container">
          <div className="ong-profile-header">
              <img 
                src={ongData?.profileImage || "/assets/teste.jpg"} 
                alt={`Foto da ONG ${ongData?.name}`}
              />
            <div className="ong-profile-header-main">
              <div className="ong-profile-header-top-item">
                <div className="name-ong">
                  <TitleType color="#D14D72">{ongData?.name || "Nome da ONG"}</TitleType>
                </div>
              </div>
              <div className="description-ong">
                <p>{ongData?.description || "Sem descrição disponível"}</p>
              </div>
              <div className="info-ong">
                <div className="info-ong-item">
                  <h3>Contato:</h3>
                  <p>{ongData?.phone || "Não informado"}</p>
                </div>
                <div className="info-ong-item">
                  <h3>Instagram:</h3>
                  <p>{ongData?.instagram || "Não informado"}</p>
                </div>
                <div className="info-ong-item">
                  <h3>Doações:</h3>
                  <p>{ongData?.pixKey || "Não informado"}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="ong-profile-header-statistics">
            <div className="ong-profile-header-statistics-item">
              <p>Pets adotados:</p>
              <p>{ongData?.adoptedPetsCount || 0}</p>
            </div>
            <div className="ong-profile-header-statistics-item">
              <p>Pets disponíveis:</p>
              <p>{ongData?.availablePetsCount || 0}</p>
            </div>
          </div>
        </div>
        <div className="carousel-container">
          <div className="carousel-content">
            <TitleType>Pets desta ONG disponíveis para adoção</TitleType>
            <PetShowcase pets={pets} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ONGProfile;
