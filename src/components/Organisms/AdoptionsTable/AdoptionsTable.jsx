import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AdoptionsTable.css";

export default function AdoptionsTable({ ongId }) {
  const [adoptions, setAdoptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ongId) return;
    const fetchAdoptions = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `https://centerpet-api.onrender.com/api/adoptions/by-ong/${ongId}`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );
        const data = await res.json();
        setAdoptions(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        setAdoptions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAdoptions();
  }, [ongId]);

  if (loading) return <div className="adoptions-table-loading">Carregando adoções...</div>;
  if (!adoptions.length) return <div className="adoptions-table-empty">Nenhuma adoção encontrada.</div>;

  return (
    <div className="adoptions-table-container">
      <h2 className="adoptions-table-title">Solicitações de Adoção</h2>
      <table className="adoptions-table">
        <thead>
          <tr>
            <th>Nome do Pet</th>
            <th>Nome do Adotante</th>
            <th>Data de Solicitação</th>
            <th>Status</th>
            <th>Ver Mais</th>
          </tr>
        </thead>
        <tbody>
          {adoptions.map((adoption) => (
            <tr key={adoption._id}>
              <td>{adoption.pet?.name || "Não informado"}</td>
              <td>{adoption.adopter?.fullName || "Não informado"}</td>
              <td>
                {adoption.createdAt
                  ? new Date(adoption.createdAt).toLocaleDateString("pt-BR")
                  : "Não informado"}
              </td>
              <td>
                <span className={`adoption-status adoption-status-${adoption.status?.toLowerCase()}`}>
                  {adoption.status || "Pendente"}
                </span>
              </td>
              <td>
                <Link
                  className="adoptions-table-link"
                  to={`/adoption-page/${adoption.pet?._id}/${adoption.adopter?._id}/${adoption.ong?._id}`}
                >
                  Ver Mais
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}