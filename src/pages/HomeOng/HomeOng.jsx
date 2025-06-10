import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../../components/Atoms/TitleType/TitleType";
import "./HomeOng.css";
import { API_URL } from "../../config/api";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

function getWaitingTime(registerDate) {
    if (!registerDate) return 0;
    const created = new Date(registerDate);
    const now = new Date();
    const diffMs = now - created;
    return Math.floor(diffMs / (1000 * 60 * 60 * 24)); // dias
}

const HomeOng = () => {
    const { user, userType, isLogged } = useAuth();
    const navigate = useNavigate();

    const [pets, setPets] = useState([]);
    const [adoptions, setAdoptions] = useState([]);
    const [loading, setLoading] = useState(true);

    // Pega o ID da ONG logada do contexto ou localStorage
    const ongId = user?.id || localStorage.getItem("ongId");

    // Proteção de rota: só ONG logada pode acessar
    useEffect(() => {
        if (!isLogged) {
            Swal.fire({
                icon: "warning",
                title: "Faça login para acessar",
                confirmButtonColor: "#d14d72",
            }).then(() => navigate("/login"));
            return;
        }
        if (userType !== "Ong" && userType !== "ONG") {
            Swal.fire({
                icon: "error",
                title: "Acesso restrito",
                text: "Apenas ONGs podem acessar esta página.",
                confirmButtonColor: "#d14d72",
            }).then(() => navigate("/home"));
            return;
        }
    }, [isLogged, userType, navigate]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Pets cadastrados pela ONG
                const petsRes = await fetch(`${API_URL}/pets?ongId=${ongId}`);
                const petsData = await petsRes.json();
                setPets(Array.isArray(petsData.data) ? petsData.data : petsData);

                // Adoções dessa ONG
                const adoptionsRes = await fetch(`${API_URL}/adoptions?ongId=${ongId}`);
                const adoptionsData = await adoptionsRes.json();
                setAdoptions(Array.isArray(adoptionsData.data) ? adoptionsData.data : adoptionsData);
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Erro ao carregar dados",
                    text: "Não foi possível carregar as informações da ONG.",
                });
            } finally {
                setLoading(false);
            }
        };
        if (ongId) fetchData();
    }, [ongId]);

    // Estatísticas
    const totalPets = pets.length;
    const adoptedPets = pets.filter(p => (p.status || "").toLowerCase().includes("adotad")).length;
    const availablePets = pets.filter(p => (p.status || "").toLowerCase().includes("dispon")).length;
    const pendingAdoptions = adoptions.filter(a => a.status === "pending").length;

    // Tempo médio de espera dos pets disponíveis
    const waitingTimes = pets
        .filter(p => (p.status || "").toLowerCase().includes("dispon"))
        .map(p => getWaitingTime(p.registerDate));
    const avgWaiting = waitingTimes.length
        ? Math.round(waitingTimes.reduce((a, b) => a + b, 0) / waitingTimes.length)
        : 0;

    // Últimos pets cadastrados
    const lastPets = [...pets]
        .sort((a, b) => new Date(b.registerDate) - new Date(a.registerDate))
        .slice(0, 3);

    // Últimas adoções realizadas
    const lastAdoptions = [...adoptions]
        .filter(a => a.status === "inProgress" || a.status === "completed")
        .sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt))
        .slice(0, 3);

    return (
        <main className="home-ong-container">
            <section className="ong-header">
                <img src="/assets/logo/CP.jpg" alt="Logo Center Pet" className="ong-logo" />
                <div>
                    <Title>Bem-vinda, ONG!</Title>
                    <p className="ong-subtitle">
                        Aqui você gerencia seus pets, acompanha adoções e vê o impacto do seu trabalho!
                    </p>
                </div>
            </section>

            <section className="ong-dashboard">
                <div className="ong-stats-card">
                    <i className="fas fa-paw"></i>
                    <span className="stat-number">{totalPets}</span>
                    <span className="stat-label">Pets cadastrados</span>
                </div>
                <div className="ong-stats-card">
                    <i className="fas fa-heart"></i>
                    <span className="stat-number">{adoptedPets}</span>
                    <span className="stat-label">Pets adotados</span>
                </div>
                <div className="ong-stats-card">
                    <i className="fas fa-search"></i>
                    <span className="stat-number">{availablePets}</span>
                    <span className="stat-label">Disponíveis para adoção</span>
                </div>
                <div className="ong-stats-card">
                    <i className="fas fa-clock"></i>
                    <span className="stat-number">{pendingAdoptions}</span>
                    <span className="stat-label">Adoções pendentes</span>
                </div>
                <div className="ong-stats-card">
                    <i className="fas fa-hourglass-half"></i>
                    <span className="stat-number">
                        {avgWaiting > 0 ? `${avgWaiting} dias` : "N/A"}
                    </span>
                    <span className="stat-label">Tempo médio de espera</span>
                </div>
            </section>

            <section className="ong-actions">
                <h2 className="section-title">Ações rápidas</h2>
                <div className="ong-actions-buttons">
                    <a href="/register-pet" className="ong-action-btn">
                        <i className="fas fa-plus"></i> Cadastrar novo pet
                    </a>
                    <a href="/dashboard" className="ong-action-btn">
                        <i className="fas fa-list"></i> Gerenciar pets
                    </a>
                    <a href="/adoptions" className="ong-action-btn">
                        <i className="fas fa-file-alt"></i> Ver solicitações de adoção
                    </a>
                </div>
            </section>

            <section className="ong-impact">
                <h2 className="section-title">Seu impacto</h2>
                <p>
                    Obrigado por fazer parte da Center Pet! Seu trabalho transforma vidas e inspira mais pessoas a adotar.
                </p>
                <ul>
                    <li>🐾 Cada pet cadastrado aumenta as chances de adoção!</li>
                    <li>❤️ Acompanhe o tempo de espera dos pets e divulgue nas redes sociais.</li>
                    <li>📈 Veja o crescimento das adoções mês a mês no seu painel.</li>
                </ul>
            </section>

            <section className="ong-latest">
                <h2 className="section-title">Últimos pets cadastrados</h2>
                <div className="ong-latest-list">
                    {lastPets.length === 0 && <p>Nenhum pet cadastrado ainda.</p>}
                    {lastPets.map(pet => (
                        <div key={pet._id} className="ong-latest-card">
                            <img
                                src={pet.images?.[0] || "/assets/logo/CP.jpg"}
                                alt={pet.name}
                                className="ong-latest-img"
                            />
                            <div>
                                <strong>{pet.name}</strong>
                                <div style={{ fontSize: 13, color: "#888" }}>
                                    {pet.species} • {pet.breed}
                                </div>
                                <div style={{ fontSize: 12, color: "#d14d72" }}>
                                    Cadastrado há {getWaitingTime(pet.registerDate)} dias
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="ong-latest">
                <h2 className="section-title">Últimas adoções realizadas</h2>
                <div className="ong-latest-list">
                    {lastAdoptions.length === 0 && <p>Nenhuma adoção realizada ainda.</p>}
                    {lastAdoptions.map(adoption => (
                        <div key={adoption._id} className="ong-latest-card">
                            <div>
                                <strong>Pet:</strong> {adoption.petName || "Pet"}
                                <br />
                                <strong>Adotante:</strong> {adoption.adopterName || "Adotante"}
                                <br />
                                <span style={{ fontSize: 12, color: "#888" }}>
                                    {adoption.updatedAt
                                        ? `Atualizado em ${new Date(adoption.updatedAt).toLocaleDateString()}`
                                        : adoption.createdAt
                                            ? `Criado em ${new Date(adoption.createdAt).toLocaleDateString()}`
                                            : ""}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default HomeOng;