import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import './AdoptionsList.css'
import Title from "../../Atoms/TitleType/TitleType";
// Corrigido: Caminho de importação do API_URL
import { API_URL } from '../../../config/api';
import useIsMobile from '../../../hooks/useIsMobile';
import { CaretLeft, CaretRight } from "phosphor-react";


export default function AdoptionsList ({ongId}) {

    const [adoptions, setAdoptions] = useState([]);
    const [adoptionsWithDetails, setAdoptionsWithDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const isMobile = useIsMobile();
    const scrollRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    
    // Primeiro useEffect para buscar as adoções básicas
    useEffect(() => {
        if (!ongId) {
        console.log("AdoptionsTable: ongId não fornecido, abortando busca de adoções");
        setLoading(false);
        return;
        }
        
        console.log("AdoptionsTable: Buscando adoções para a ONG com ID:", ongId);
        
        const fetchAdoptions = async () => {
        try {        
            const token = localStorage.getItem("token");
            console.log("AdoptionsTable: Token de autenticação presente?", !!token);
            
            // Corrigido: URL definida usando API_URL
            const url = `${API_URL}/adoptions/by-ong/${ongId}`;
            console.log("AdoptionsTable: Fazendo requisição para:", url);
            
            // Corrigido: URL completa usando a variável url
            const res = await fetch(url, {
                headers: {
                Authorization: token ? `Bearer ${token}` : "",
                },
            });
            
            console.log("AdoptionsTable: Status da resposta:", res.status);
            
            const data = await res.json();
            // Verificamos e registramos a estrutura da resposta para depuração
            console.log("Resposta da API de adoções:", data);
            
            // Verificamos se a resposta contém o formato esperado com o campo "adoptions"
            if (data && data.adoptions) {
            console.log("Adoções encontradas:", data.adoptions.length);
            setAdoptions(data.adoptions);
            } else if (Array.isArray(data)) {
            console.log("Array de adoções encontrado:", data.length);
            setAdoptions(data);
            } else if (data && data.message && data.message.includes('Nenhuma adoção encontrada')) {
            console.log("Mensagem da API:", data.message);
            setAdoptions([]);
            setLoading(false);
            } else {
            console.log("Formato de resposta desconhecido:", data);
            setAdoptions([]);
            setLoading(false);
            }
        } catch (err) {
            console.error("Erro ao buscar adoções:", err);
            setAdoptions([]);
            setLoading(false);
        }
        };
        fetchAdoptions();
    }, [ongId]);
    
    // Segundo useEffect para buscar detalhes de cada adotante
    useEffect(() => {
        if (adoptions.length === 0) return;
        
        const fetchAdoptersDetails = async () => {
        try {
            const token = localStorage.getItem("token");
            const adoptionsWithAdopterDetails = [];
            
            console.log("Buscando detalhes dos adotantes para", adoptions.length, "adoções");
            
            // Para cada adoção, buscar detalhes do adotante
            for (const adoption of adoptions) {
            if (!adoption.userId || !adoption.userId._id) {
                console.log("Adoção sem ID de usuário válido:", adoption);
                adoptionsWithAdopterDetails.push(adoption);
                continue;
            }
            
            try {
                console.log("Buscando detalhes do adotante com ID:", adoption.userId._id);
                const adopterRes = await fetch(
                `${API_URL}/adopters/${adoption.userId._id}`,
                {
                    headers: {
                    Authorization: token ? `Bearer ${token}` : "",
                    },
                }
                );
                if (adopterRes.ok) {
                const adopterDetails = await adopterRes.json();
                console.log("Detalhes do adotante recebidos:", adopterDetails);
                console.log("Nome do adotante:", adopterDetails.fullName);
                console.log("Email do adotante:", adopterDetails.email);
                console.log("Cidade do adotante:", adopterDetails.city);
                
                // Adicionar os detalhes do adotante à adoção
                adoptionsWithAdopterDetails.push({
                    ...adoption,
                    adopterDetails
                });
                } else {
                console.log("Erro ao buscar detalhes do adotante:", adopterRes.status);
                adoptionsWithAdopterDetails.push(adoption);
                }
            } catch (err) {
                console.error("Erro ao buscar detalhes do adotante:", err);
                adoptionsWithAdopterDetails.push(adoption);
            }
            }
            
            console.log("Adoções com detalhes dos adotantes:", adoptionsWithAdopterDetails);
            setAdoptionsWithDetails(adoptionsWithAdopterDetails);
        } catch (err) {
            console.error("Erro ao buscar detalhes dos adotantes:", err);
        } finally {
            setLoading(false);
        }
        };
        
        fetchAdoptersDetails();
    }, [adoptions]);

    const displayAdoptions = adoptionsWithDetails.length > 0 ? adoptionsWithDetails : adoptions;

    // Calcular o total de páginas
    const totalPages = Math.ceil(displayAdoptions.length / itemsPerPage);

    // Obter as adoções da página atual
    const getCurrentPageItems = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return displayAdoptions.slice(startIndex, endIndex);
    };

    // Função para mudar de página
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Função para traduzir status
    function traduzirStatus(status) {
      switch ((status || '').toLowerCase()) {
        case 'requestreceived':
          return 'Solicitação Recebida';
        case 'inprogress':
          return 'Em Andamento';
        case 'approved':
          return 'Aprovada';
        case 'rejected':
          return 'Recusada';
        case 'canceled':
          return 'Cancelada';
        case 'inadjustment':
          return 'Em Adaptação';
        case 'completed':
          return 'Concluída';
        case 'return':
          return 'Retorno';
        default:
          return status || 'Pendente';
      }
    }

    // Função para centralizar o card mais próximo
    const centerCard = useCallback((index) => {
      const container = scrollRef.current;
      if (!container) return;
      const cards = container.querySelectorAll('.adoptions-list-item-mobile');
      if (!cards.length) return;
      const card = cards[index];
      if (!card) return;
      const containerRect = container.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const scrollLeft = container.scrollLeft + (cardRect.left - containerRect.left) - (containerRect.width/2 - cardRect.width/2);
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }, []);

    // Função para encontrar o card mais centralizado
    const getCenteredIndex = () => {
      const container = scrollRef.current;
      if (!container) return 0;
      const cards = container.querySelectorAll('.adoptions-list-item-mobile');
      let minDiff = Infinity;
      let centeredIdx = 0;
      const containerRect = container.getBoundingClientRect();
      cards.forEach((card, idx) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width/2;
        const containerCenter = containerRect.left + containerRect.width/2;
        const diff = Math.abs(cardCenter - containerCenter);
        if (diff < minDiff) {
          minDiff = diff;
          centeredIdx = idx;
        }
      });
      return centeredIdx;
    };

    const scrollLeft = () => {
      const idx = getCenteredIndex();
      const prevIdx = Math.max(0, idx - 1);
      centerCard(prevIdx);
    };
    const scrollRight = () => {
      const idx = getCenteredIndex();
      const cards = scrollRef.current?.querySelectorAll('.adoptions-list-item-mobile') || [];
      const nextIdx = Math.min(cards.length - 1, idx + 1);
      centerCard(nextIdx);
    };

    if (loading) return <div className="adoptions-table-loading">Carregando adoções...</div>;
    if (!displayAdoptions.length) return <div className="adoptions-table-empty">Nenhuma adoção encontrada.</div>;

    return (
        <div className="adoptions-list-container">
            <Title marginBottom={20}>Solicitações de adoção</Title>
            <div className="adoptions-list">
                {isMobile ? (
                    <div className="adoptions-list-mobile-scroll-wrapper">
                        <button className="carousel-arrow left" onClick={scrollLeft} aria-label="Anterior">❮</button>
                        <div className="adoptions-list-mobile-scroll" ref={scrollRef}>
                            {getCurrentPageItems().map((adoption) => (
                                <div key={adoption._id} className="adoptions-list-item-mobile">
                                    <div className="adoption-list-item-title">
                                        <h4>Solicitação de {adoption.adopterDetails?.fullName}</h4>
                                    </div>
                                    <div className="adoption-list-item-description">
                                        <p><b>Nome do pet:</b> {adoption.petId?.name || "Não informado"}</p>
                                        <p><b>Nome do adotante:</b> {adoption.adopterDetails?.fullName || adoption.userId?.fullName || "Não informado"}</p>
                                        <p><b>Cidade:</b> {adoption.adopterDetails?.city || (adoption.adopterDetails?.address?.city) || "Não informado"}</p>
                                        <p><b>Contato:</b> {adoption.adopterDetails?.phone || adoption.adopterDetails?.email || adoption.userId?.email || "Não informado"}</p>
                                        <p><b>Data de Solicitação:</b> {adoption.createdAt? new Date(adoption.createdAt).toLocaleDateString("pt-BR") : "Não informado"}</p>
                                        <p><b>Status:</b> <span className={`adoption-status adoption-status-${adoption.status}`}>{traduzirStatus(adoption.status)}</span></p>
                                        <Link
                                            className="adoptions-table-link"
                                            to={`/adoption/${adoption._id}`}
                                        >
                                            Ver Mais
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="carousel-arrow right" onClick={scrollRight} aria-label="Próximo">❯</button>
                    </div>
                ) : (
                    <div className="adoptions-list-desktop">
                        {getCurrentPageItems().map((adoption) => (
                            <div key={adoption._id} className="adoptions-list-item-mobile">
                                <div className="adoption-list-item-title">
                                    <h4>Solicitação de {adoption.adopterDetails?.fullName}</h4>
                                </div>
                                <div className="adoption-list-item-description">
                                    <p><b>Nome do pet:</b> {adoption.petId?.name || "Não informado"}</p>
                                    <p><b>Nome do adotante:</b> {adoption.adopterDetails?.fullName || adoption.userId?.fullName || "Não informado"}</p>
                                    <p><b>Cidade:</b> {adoption.adopterDetails?.city || (adoption.adopterDetails?.address?.city) || "Não informado"}</p>
                                    <p><b>Contato:</b> {adoption.adopterDetails?.phone || adoption.adopterDetails?.email || adoption.userId?.email || "Não informado"}</p>
                                    <p><b>Data de Solicitação:</b> {adoption.createdAt? new Date(adoption.createdAt).toLocaleDateString("pt-BR") : "Não informado"}</p>
                                    <p><b>Status:</b> <span className={`adoption-status adoption-status-${adoption.status}`}>{traduzirStatus(adoption.status)}</span></p>
                                    <Link
                                        className="adoptions-table-link"
                                        to={`/adoption/${adoption._id}`}
                                    >
                                        Ver Mais
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Controles de paginação */}
            {totalPages > 1 && (
                <div className="pagination-controls" style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    gap: '20px', 
                    margin: '30px 0',
                    padding: '20px'
                }}>
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="pagination-button"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '40px',
                            height: '40px',
                            padding: 0,
                            backgroundColor: currentPage === 1 ? '#cccccc' : '#d25b82',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                            transition: 'background-color 0.3s, transform 0.2s'
                        }}
                        aria-label="Página anterior"
                    >
                        <CaretLeft size={24} weight="bold" />
                    </button>
                    
                    <span className="page-info" style={{
                        fontSize: '16px',
                        color: '#666',
                        minWidth: '120px',
                        textAlign: 'center'
                    }}>
                        Página {currentPage} de {totalPages}
                    </span>

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="pagination-button"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '40px',
                            height: '40px',
                            padding: 0,
                            backgroundColor: currentPage === totalPages ? '#cccccc' : '#d25b82',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                            transition: 'background-color 0.3s, transform 0.2s'
                        }}
                        aria-label="Próxima página"
                    >
                        <CaretRight size={24} weight="bold" />
                    </button>
                </div>
            )}


        </div>
    )
}