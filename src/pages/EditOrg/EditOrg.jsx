import './EditOrg.css';
import ButtonType from '../../components/Atoms/ButtonType/ButtonType';
import ImageInputField from '../../components/Atoms/ImageInputField/ImageInputField';
import TitleType from '../../components/Atoms/TitleType/TitleType';
import InputField from '../../components/Atoms/InputField/InputField';
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const EditOrg = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const API_URL = "https://centerpet-api.onrender.com/api"; // URL da API em produção

    const [loadingCep, setLoadingCep] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [profileImage, setProfileImage] = useState("");
    const [profileImageFile, setProfileImageFile] = useState(null);

    const [role, setRole] = useState("");
    const [fullName, setFullName] = useState("");
    const [description, setDescription] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [instagram, setInstagram] = useState("");
    const [facebook, setFacebook] = useState("");
    const [website, setWebsite] = useState("");
    const [pixKey, setPixKey] = useState("");
    const [collaborators, setCollaborators] = useState("");

    const [zipCode, setZipCode] = useState("");
    const [street, setStreet] = useState("");
    const [number, setNumber] = useState("");
    const [noNumber, setNoNumber] = useState(false);
    const [neighborhood, setNeighborhood] = useState("");
    const [city, setCity] = useState("");
    const [stateUf, setStateUf] = useState("");
    const [complement, setComplement] = useState("");

    useEffect(() => {
        const fetchOngData = async () => {
            if (!user || !user._id) {
                Swal.fire({
                    title: 'Erro de Autenticação',
                    text: 'Você precisa estar logado para editar seu perfil',
                    icon: 'error',
                    confirmButtonColor: '#D14D72'
                });
                navigate('/login');
                return;
            }

            setIsLoading(true);

            try {
                const token = localStorage.getItem('token');
                console.log("Buscando ONG com ID:", user._id);

                const response = await fetch(`${API_URL}/ongs/${user._id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Falha ao buscar dados do perfil');
                }

                const responseData = await response.json();
                const ongData = responseData.data || responseData;

                console.log("Dados da ONG recebidos:", ongData);

                setRole(ongData.role || "");
                setFullName(ongData.name || "");
                setDescription(ongData.description || "");
                setPhone(ongData.phone || "");
                setEmail(ongData.email || "");
                setPixKey(ongData.pixKey || "");

                if (ongData.profileImg) {
                    setProfileImage(ongData.profileImg);
                }

                if (ongData.socialMidia) {
                    setInstagram(ongData.socialMidia.instagram || "");
                    setFacebook(ongData.socialMidia.facebook || "");
                    setWebsite(ongData.socialMidia.site || "");
                }

                if (ongData.address) {
                    setZipCode(ongData.address.cep || "");
                    setStreet(ongData.address.street || "");
                    setNumber(ongData.address.number || "");
                    setNoNumber(ongData.address.number === "S/N");
                    setNeighborhood(ongData.address.neighborhood || "");
                    setCity(ongData.address.city || "");
                    setStateUf(ongData.address.uf || "");
                    setComplement(ongData.address.complement || "");
                }

                if (ongData.role === "Projeto" && ongData.collaborators !== undefined) {
                    setCollaborators(ongData.collaborators.toString());
                }
            } catch (error) {
                console.error('Erro ao buscar dados da ONG:', error);
                Swal.fire({
                    title: 'Erro',
                    text: 'Não foi possível carregar seus dados. Por favor, tente novamente mais tarde.',
                    icon: 'error',
                    confirmButtonColor: '#D14D72'
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchOngData();
    }, [user, navigate]);

    const uploadImage = async (file) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "centerpet_default");
        data.append("cloud_name", "dx8zzla5s");

        try {
            const response = await fetch(
                "https://api.cloudinary.com/v1_1/dx8zzla5s/image/upload",
                {
                    method: "POST",
                    body: data,
                }
            );

            const result = await response.json();
            console.log("Resposta do Cloudinary:", result);

            if (!response.ok) {
                throw new Error(
                    result.error ? result.error.message : "Erro ao fazer upload da imagem"
                );
            }
            
            return result.secure_url;
        } catch (error) {
            console.error("Erro ao enviar imagem:", error);
            throw error;
        }
    };    const handleSubmit = async (e) => {
        e.preventDefault();

        Swal.fire({
            title: "Confirmar alterações",
            text: "Tem certeza que deseja salvar as alterações no perfil?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#D14D72",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Sim, salvar alterações",
            cancelButtonText: "Revisar dados",
            showCloseButton: true,
        }).then(async (result) => {
            if (!result.isConfirmed) return;

            try {
                Swal.fire({
                    title: 'Processando...',
                    text: 'Aguarde enquanto salvamos as alterações',
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });

                let finalImageUrl = profileImage;
                if (profileImageFile) {
                    try {
                        finalImageUrl = await uploadImage(profileImageFile);
                    } catch {
                        Swal.fire({
                            title: 'Erro',
                            text: 'Não foi possível fazer o upload da imagem. Tente novamente.',
                            icon: 'error',
                            confirmButtonColor: '#D14D72'
                        });
                        return;
                    }
                }

            // ATENÇÃO: use os nomes corretos dos campos!
            const updateData = {
                name: fullName,
                description,
                email,
                phone,
                pixKey,
                profileImage: finalImageUrl, // <-- nome esperado pelo backend
                collaborators: role === "Projeto" ? Number(collaborators) : undefined,
                address: {
                    cep: zipCode,
                    street,
                    number: noNumber ? "S/N" : number,
                    neighborhood,
                    city,
                    uf: stateUf,
                    complement
                },
                socialMedia: { // <-- nome esperado pelo backend
                    instagram,
                    facebook,
                    website // será convertido para .site no backend
                }
            };

            // Remove campos undefined (especialmente collaborators se não for Projeto)
            Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

            const response = await fetch(`${API_URL}/ongs/editProfile/${user._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(updateData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erro ao atualizar perfil');
            }

            const data = await response.json();
            Swal.fire({
                title: 'Sucesso!',
                text: 'Seu perfil foi atualizado com sucesso.',
                icon: 'success',
                confirmButtonColor: '#D14D72'
            }).then(() => {
                setProfileImage(finalImageUrl);
                setProfileImageFile(null);
                if (data.data) {
                    const updatedUser = { ...user, ...data.data };
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                }
                navigate(`/ong-profile/${user._id}`);
            });

        } catch (error) {
            Swal.fire({
                title: 'Erro',
                text: `Não foi possível atualizar seu perfil: ${error.message}`,
                icon: 'error',
                confirmButtonColor: '#D14D72'
            });
        }
    }); // <-- fechamento do .then do Swal
}; // <-- fechamento da função handleSubmit

// Função para alterar senha
const alterarSenha = async () => {
    // Sua função existente...
};

    // Função para buscar endereço pelo CEP - implementação correta
    const buscarEnderecoPorCep = async (cep) => {
        // Remover caracteres não numéricos do CEP
        const cepLimpo = cep.replace(/\D/g, "");
        
        if (cepLimpo.length !== 8) {
            return; // CEP deve ter 8 dígitos
        }
        
        setLoadingCep(true);
        try {
            // Usar o serviço ViaCEP para buscar o endereço
            const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
            
            if (!response.ok) {
                throw new Error("Erro ao buscar CEP");
            }
            
            const data = await response.json();
            
            // Verificar se o CEP existe e não tem erro
            if (!data.erro) {
                setStreet(data.logradouro || "");
                setNeighborhood(data.bairro || "");
                setCity(data.localidade || "");
                setStateUf(data.uf || ""); // Certifique-se de que o estado está sendo definido
                // Limpar o número caso o CEP mude
                if (!noNumber) {
                    setNumber("");
                }
            } else {
                // Avisar o usuário que o CEP não foi encontrado
                Swal.fire({
                    title: 'CEP não encontrado',
                    text: 'O CEP informado não foi encontrado. Por favor, verifique e tente novamente.',
                    icon: 'warning',
                    confirmButtonColor: '#D14D72'
                });
            }
        } catch (error) {
            console.error("Erro ao buscar CEP:", error);
            Swal.fire({
                title: 'Erro',
                text: 'Ocorreu um erro ao buscar o CEP. Por favor, tente novamente mais tarde.',
                icon: 'error',
                confirmButtonColor: '#D14D72'
            });
        } finally {
            setLoadingCep(false);
        }
    };

    if (isLoading) {
        return (
            <div id="edit_org" className="loading-container">
                <div className="loading-content">
                    <h2>Carregando dados do perfil...</h2>
                    <div className="loading-spinner"></div>
                </div>
            </div>
        );
    }

    return (
        <div id="edit_org">
            <div id='edit-form-container'>
                <form id='edit-form' onSubmit={handleSubmit}>
                    <div id="edit-org-title">
                        <TitleType>Editar Perfil da Organização</TitleType>
                    </div>
                    <div id='org-img-profile'>
                        <h2>Sua foto de perfil</h2>
                        <ImageInputField 
                            currentImage={profileImage} // Passar a URL da imagem atual
                            onImageChange={(file) => {
                                // Criar um estado local para armazenar o arquivo da nova imagem
                                setProfileImageFile(file);
                            }}
                            size={200}
                        />
                    </div>

                    <label>Email: (não editável)</label>
                    <InputField
                        type="email"
                        value={email}
                        width="70rem"
                        readOnly
                    />

                    <label>Nome da organização: </label>
                    <InputField
                        type="text"
                        placeholder="Nome da organização"
                        width="70rem"
                        value={fullName}
                        required
                        onChange={(e) => setFullName(e.target.value)}
                    />

                    <label>Número de telefone: </label>
                    <InputField
                        type="tel"
                        placeholder="(XX) XXXXX-XXXX"
                        width="70rem"
                        value={phone}
                        required
                        onChange={(e) => setPhone(e.target.value)}
                    />

                    {role === "Projeto" && (
                        <>
                            <label>Colaboradores: </label>
                            <InputField
                                type="number"
                                placeholder="Número de colaboradores"
                                width="70rem"
                                value={collaborators}
                                onChange={(e) => setCollaborators(e.target.value)}
                            />
                        </>
                    )}

                    <div id='edit-input-textarea'>
                        <label>Descrição</label>
                        <textarea 
                            name="edit-form-input" 
                            id="edit-org-input-description" 
                            rows={6} 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Descreva sua organização..."
                        ></textarea>
                    </div>
                    
                   <div className="endereco-section">
                        <div className="row_user_form">
                            <div className="col_user_form">
                                <label>
                                    CEP <span className="required">*</span>
                                </label>
                                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
                                    <InputField
                                        type="text"
                                        placeholder="CEP"
                                        value={zipCode}
                                        onChange={e => {
                                            const newCep = e.target.value;
                                            setZipCode(newCep);
                                            // Verificar se o CEP tem 8 dígitos (sem formatação) para buscar automaticamente
                                            if (newCep.replace(/\D/g, "").length === 8) {
                                                buscarEnderecoPorCep(newCep);
                                            }
                                        }}
                                        width="11.4rem"
                                        maxLength={9}
                                        disabled={loadingCep}
                                        required
                                    />
                                    {loadingCep ? (
                                        <span>Buscando CEP...</span>
                                    ) : (
                                        <button
                                            type="button"
                                            className="cep-helper-btn"
                                            onClick={() => window.open("https://buscacepinter.correios.com.br/app/endereco/index.php", "_blank")}
                                        >
                                            Não sei meu CEP
                                        </button>
                                    )}
                                </div>
                            </div>
                            

                            <div className="col_user_form">
                                <label>Rua:</label>
                                <InputField
                                    type="text"
                                    placeholder="Rua"
                                    value={street}
                                    width="20rem"
                                    required
                                    readOnly
                                />
                            </div>
                            <div className="col_user_form">
                                <label>Número:</label>
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
                                    <InputField
                                        type="text"
                                        placeholder="Número"
                                        value={noNumber ? "S/N" : number}
                                        onChange={e => setNumber(e.target.value)}
                                        width="10rem"
                                        required={!noNumber}
                                        disabled={noNumber}
                                    />
                                    <label style={{ display: "flex", alignItems: "center", fontSize: "0.97rem", color: "#d14d72", cursor: "pointer" }}>
                                        <input
                                            type="checkbox"
                                            checked={noNumber}
                                            onChange={e => {
                                                setNoNumber(e.target.checked);
                                                if (e.target.checked) setNumber("S/N");
                                                else setNumber("");
                                            }}
                                            style={{ marginRight: "0.4rem" }}
                                        />
                                        Sem número
                                    </label>
                                </div>
                            </div>
                        </div>                        <div className="row_user_form">
                            <div className="col_user_form">
                                <label>Bairro:</label>
                                <InputField
                                    type="text"
                                    placeholder="Bairro"
                                    value={neighborhood}
                                    width="21rem"
                                    required
                                    readOnly
                                />
                            </div>
                            <div className="col_user_form">
                                <label>Cidade:</label>
                                <InputField
                                    type="text"
                                    placeholder="Cidade"
                                    value={city}
                                    width="20rem"
                                    required
                                    readOnly
                                />
                            </div>
                            <div className="col_user_form">
                                <label>UF:</label>
                                <InputField
                                    type="text"
                                    placeholder="UF"
                                    value={stateUf}
                                    width="6rem"
                                    required
                                    onChange={(e) => setStateUf(e.target.value)} // Permitir edição manual
                                />
                            </div>
                        </div>
                        <div className="row_user_form">
                            <div className="col_user_form">
                                <label>Complemento:</label>
                                <InputField
                                    type="text"
                                    placeholder="Complemento"
                                    value={complement}
                                    width="100%"
                                    onChange={(e) => setComplement(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <label>Instagram: </label>
                    <InputField
                        type="url"
                        placeholder="Link da sua conta Instagram"
                        width="70rem"
                        value={instagram}
                        onChange={(e) => setInstagram(e.target.value)}
                    />
                    
                    <label>Facebook: </label>
                    <InputField
                        type="url"
                        placeholder="Link da sua conta Facebook"
                        width="70rem"
                        value={facebook}
                        onChange={(e) => setFacebook(e.target.value)}
                    />
                    
                    <label>Site: </label>
                    <InputField
                        type="url"
                        placeholder="Link do seu site"
                        width="70rem"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                    />

                    <label>Chave Pix: </label>
                    <InputField
                        type="text"
                        placeholder="Sua chave PIX para doações"
                        width="70rem"
                        value={pixKey}
                        onChange={(e) => setPixKey(e.target.value)}
                    />
                    
                    <button type="button" id='btn-update-password' onClick={alterarSenha}>Clique aqui para alterar senha</button>

                    <div id="edit-buttons-options">
                        <ButtonType type="submit" width="250px">Salvar Alterações</ButtonType>
                        <ButtonType
                            type="button"
                            width="250px"
                            onClick={(e) => {
                                e.preventDefault(); // Previne o comportamento padrão
                                navigate(`/ong-profile/${user._id}`);
                            }}
                        >
                            Cancelar
                        </ButtonType>    
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditOrg;