import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import TitleType from "../../components/Atoms/TitleType/TitleType";
import "./AdopterProfile.css";
import useAuth from "../../hooks/useAuth";
import ButtonType from "../../components/Atoms/ButtonType/ButtonType"; // Importe o componente ButtonType
import Swal from "sweetalert2";


const AdopterProfile = () => {
  const { adopterId } = useParams();
  const { user, isAuthenticated, logout} = useAuth();
  const navigate = useNavigate();
  
  const [adopter, setAdopter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Lógica de redirecionamento movida para dentro do useEffect
    if (!adopterId && isAuthenticated && user?._id) {
      navigate(`/adopter-profile/${user._id}`, { replace: true });
      return;
    }

    const fetchAdopter = async () => {
      try {
        if (!adopterId) {
          setError("ID do adotante não encontrado na URL");
          setLoading(false);
          return;
        }
        
        console.log("Buscando adotante com ID:", adopterId);
        
        const token = localStorage.getItem('token');
        const response = await fetch(`https://centerpet-api.onrender.com/api/adopters/${adopterId}`, {
          headers: {
            'Authorization': token ? `Bearer ${token}` : '',
          }
        });
        
        if (!response.ok) {
          throw new Error(`Erro ao buscar dados do adotante (${response.status})`);
        }
        
        const data = await response.json();
        
        // Adicione este log detalhado
        console.log("Dados completos do adotante:", data);
        console.log("Cidade do adotante:", data.city);
        console.log("Bairro do adotante:", data.neighborhood);
        
        setAdopter(data);
      } catch (error) {
        console.error("Erro:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (adopterId) {
      fetchAdopter();
    }
  }, [adopterId, isAuthenticated, user, navigate]);

  if (loading) return <div className="loading-container"><p>Carregando perfil do adotante...</p></div>;
  if (error) return <div className="error-container"><p>Erro: {error}</p></div>;
  if (!adopter) return <div className="not-found-container"><p>Adotante não encontrado.</p></div>;

  return (
    <div className="adopter-profile-container">
      <div className="adopter-profile-content">
        <div className="adopter-profile-header-container">
          <div className="adopter-profile-header">
            <img
              src={adopter.profileImg || "https://i.imgur.com/WanR0b3.png"}
              alt={`Foto de ${adopter.fullName}`}
              className="adopter-profile-image"
            />
            <div className="adopter-profile-header-main">
              <div className="adopter-profile-header-top-item">
                <div className="name-adopter">
                  <TitleType color="#D14D72">{adopter.fullName || "Nome não disponível"}</TitleType>
                </div>
                <div>
                  {/* Adicionar botão de edição - apenas se o usuário logado for o dono do perfil */}
                  {user && user._id === adopter._id && (
                    <ButtonType
                      onClick={() => navigate('/edit-user')}
                      bgColor="#D14D72"
                      color="#FFFFFF"
                      width="150px"
                      margin="0 auto"
                    >
                      Editar
                    </ButtonType>
                  )}
                </div>
              </div>
              <div className="description-adopter">
                <p>{adopter.description || "Descrição não disponível."}</p>
              </div>
              <div className="info-adopter">
                <div className="info-adopter-item">
                  <h3>Cidade</h3>
                  <p>{adopter.city || "Cidade não informada"}</p>
                </div>
                
                {/* Adicione um campo de endereço completo se desejar */}
                <div className="info-adopter-item">
                  <h3>Bairro</h3>
                  <p>{adopter.neighborhood || "Não informado"}</p>
                </div>
                
                <div className="info-adopter-item">
                  <h3>Adotante seguro</h3>
                  <p>{adopter.safeAdopter ? "Sim" : "Não"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '1rem', marginBottom: '1.5dhv' }}>
          <ButtonType
            width="200px"
            bgColor="#FF4D4D" // Cor de fundo para indicar ação perigosa
            color="#FFFFFF" // Cor do texto
            onClick={() => {
              Swal.fire({
                title: 'Tem certeza?',
                text: 'Esta ação é irreversível. Deseja realmente deletar sua conta?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#FF4D4D',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Sim, deletar',
                cancelButtonText: 'Cancelar'
              }).then(async (result) => {
                if (result.isConfirmed) {
                  try {
                    const token = localStorage.getItem('token'); // Obter o token de autenticação
                    const response = await fetch(`https://centerpet-api.onrender.com/api/adopters/delete/${adopterId}`, {
                      method: 'DELETE',
                      headers: {
                        'Authorization': token ? `Bearer ${token}` : '',
                        'Content-Type': 'application/json'
                      }
                    });

                    if (!response.ok) {
                      throw new Error('Erro ao deletar a conta. Tente novamente.');
                    }

                    // Logout: limpar token e atualizar estado de autenticação
                    localStorage.removeItem('token'); // Remove o token do localStorage
                    logout(); // Chama a função de logout do contexto de autenticação
                    Swal.fire('Deletado!', 'Sua conta foi deletada com sucesso.', 'success');
                    navigate('/home'); // Redireciona para a página /home após a exclusão
                  } catch (error) {
                    console.error(error);
                    Swal.fire('Erro!', 'Não foi possível deletar a conta. Tente novamente mais tarde.', 'error');
                  }
                }
              });
            }}
          >
            Deletar conta
          </ButtonType>
        </div>
    </div>
  );
};

export default AdopterProfile;
