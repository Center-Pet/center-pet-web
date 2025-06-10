import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AdoptionsTable.css";
import { API_URL } from "../../../config/api";
import Title from "../../Atoms/TitleType/TitleType";
import { CaretLeft, CaretRight } from "phosphor-react";

export default function AdoptionsTable({ ongId }) {
  const [adoptions, setAdoptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const translateStatus = (status) => {
    if (!status) return "Solicitação Recebida";
    
    const statusMap = {
      'requestReceived': 'Solicitação Recebida',
      'inProgress': 'Em Andamento',
      'approved': 'Aprovada',
      'rejected': 'Recusada',
      'canceled': 'Cancelada',
      'inAdjustment': 'Em Adaptação',
      'completed': 'Concluída',
      'return': 'Retorno',
      'pendente': 'Solicitação Recebida'
    };
    
    return statusMap[status] || status;
  };
  
  // Buscar adoções da ONG
  useEffect(() => {
    if (!ongId) {
      setLoading(false);
      return;
    }
    const fetchAdoptions = async () => {
      try {        
        const token = localStorage.getItem("token");
        const url = `${API_URL}/adoptions/by-ong/${ongId}`;
        const res = await fetch(url, {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          });
        const data = await res.json();
        if (data && data.adoptions) {
          setAdoptions(data.adoptions);
        } else if (Array.isArray(data)) {
          setAdoptions(data);
        } else {
          setAdoptions([]);
        }
      } catch {
        setAdoptions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAdoptions();
  }, [ongId]);

  // Calcular o total de páginas
  const totalPages = Math.ceil(adoptions.length / itemsPerPage);

  // Obter as adoções da página atual
  const getCurrentAdoptions = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return adoptions.slice(startIndex, endIndex);
  };

  // Função para mudar de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <div className="adoptions-table-loading">Carregando adoções...</div>;
  if (!adoptions.length) return <div className="adoptions-table-empty">Nenhuma adoção encontrada.</div>;

  return (
    <div className="adoptions-table-container">
      <Title marginBottom={20}>Solicitações de adoção</Title>
      <table className="adoptions-table">
        <thead>
          <tr>
            <th>Nome do Pet</th>
            <th>Nome do Adotante</th>
            <th>Cidade</th>
            <th>Contato</th>
            <th>Data de Solicitação</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>          
          {getCurrentAdoptions().map((adoption) => (
            <tr key={adoption._id}>
              <td>{adoption.petId?.name || "Não informado"}</td>
              <td>{adoption.userId?.fullName || "Não informado"}</td>
              <td>{adoption.userId?.city || "Não informado"}</td>
              <td>{adoption.userId?.phone || adoption.userId?.email || "Não informado"}</td>
              <td>
                {adoption.requestDate
                  ? new Date(adoption.requestDate).toLocaleDateString("pt-BR")
                  : "Não informado"}
              </td>
              <td>
                <span className={`adoption-status adoption-status-${adoption.status}`}>
                  {translateStatus(adoption.status)}
                </span>
              </td>              <td>
                <Link
                  className="adoptions-table-link"
                  to={`/adoption/${adoption._id}`}
                >
                  Ver Mais
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Paginação */}
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
  );
}