import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import './AdoptionsList.css'
import Title from "../../Atoms/TitleType/TitleType";
// Corrigido: Caminho de importação do API_URL
import { API_URL } from '../../../config/api';
import useIsMobile from '../../../hooks/useIsMobile';
import { CaretDown, CaretLeft, CaretRight } from "phosphor-react";


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

    const ItemsPage = 10

    // Calcular o total de páginas
    const totalPages = Math.ceil(displayAdoptions.length / ItemsPage);

    const [actualPage, setactualPage] = useState(1);
    const initialI = (actualPage - 1) * ItemsPage;
    const visibleItems = displayAdoptions.slice(initialI, initialI + ItemsPage);

    
    // Função para mudar de página

    const handleNextPage = () => {
        if (actualPage < totalPages) {
            setactualPage(actualPage + 1);
        }
    }
    const handlePreviousPage = () => {
        if (actualPage > 1) {
            setactualPage(actualPage - 1);
        }
    }

    // Esconde e mostra a descrição da adoção
    const showDescription = (target)=>{
        const itemDescription = target.nextElementSibling;
        const iconCaret = target.querySelector('svg')
        
        if(itemDescription.classList.contains('active')){
            itemDescription.classList.remove('active');
            itemDescription.classList.add('inactive');
            iconCaret.classList.remove('active');
            iconCaret.classList.add('inactive');
        }
        else {
            itemDescription.classList.remove('inactive');
            itemDescription.classList.add('active');
            iconCaret.classList.remove('inactive');
            iconCaret.classList.add('active');
        }
    }

    if (loading) return <div className="adoptions-table-loading">Carregando adoções...</div>;
    if (!displayAdoptions.length) return <div className="adoptions-table-empty">Nenhuma adoção encontrada.</div>;

    return (
        <div className="adoptions-list-container">
            <Title marginBottom={20}>Solicitações de adoção</Title>
            <div className="adoptions-list">
                <div className="adoptions-list-mobile">
                    {visibleItems.map((adoption)=>(
                        <div key={adoption._id} className="adoptions-list-item-mobile">
                            <div className="adoption-list-item-summary" onClick={(e)=> showDescription(e.currentTarget)}>
                                <div className="adoption-basic-details">
                                    <p><b>Pet:</b> {adoption.petId?.name || "Não informado"}</p>
                                    <p><b>Status:</b> <span className={`adoption-status adoption-status-${adoption.status}`}>{traduzirStatus(adoption.status)}</span></p>
                                </div>
                                <CaretDown size={45} color="rgb(0, 0, 0)"/>
                            </div>

                            <div className="adoption-list-item-description">
                                <p><b>Nome do pet:</b> {adoption.petId?.name || "Não informado"}</p>
                                <p><b>Nome do adotante:</b> {adoption.adopterDetails?.fullName || adoption.userId?.fullName || "Não informado"}</p>
                                <p><b>Cidade:</b> {adoption.adopterDetails?.city || (adoption.adopterDetails?.address?.city) || "Não informado"}</p>
                                <p><b>Contato:</b> {adoption.adopterDetails?.phone || adoption.adopterDetails?.email || adoption.userId?.email || "Não informado"}</p>
                                <p><b>Data de Solicitação:</b> {adoption.requestDate? new Date(adoption.requestDate).toLocaleDateString("pt-BR") : "Não informado"}</p>
                                <p><b>Status:</b> <span className={`adoption-status adoption-status-${adoption.status}`}>{traduzirStatus(adoption.status)}</span></p>
                                <Link
                                    className="adoptions-table-link"
                                    to={`/adoption/${adoption._id}`}
                                >
                                    Ver Mais
                                </Link>
                            </div>
                        
                        </div>
                        )
                    )}
                </div>
                <div className="pagination-list">
                    <button className="pagination-list-button" onClick={handlePreviousPage} disabled={actualPage == 1}>
                        <CaretLeft size={25} color="#FFC8D1"/>
                    </button>
                    <span>{actualPage} de {totalPages} páginas</span>
                    <button className="pagination-list-button" onClick={handleNextPage} disabled={actualPage == totalPages}>
                        <CaretRight size={25} color="#FFC8D1"/>
                    </button>
                </div>
            </div>
        </div>
    )
}