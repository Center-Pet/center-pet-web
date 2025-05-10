import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import ButtonType from "../../components/Atoms/ButtonType/ButtonType";
import InputField from "../../components/Atoms/InputField/InputField";
import TitleType from "../../components/Atoms/TitleType/TitleType";
import ImageInputField from "../../components/Atoms/ImageInputField/ImageInputField";
import "./EditUser.css";

const EditUser = () => {
    const { adopterId } = useParams(); // Obtém o ID da URL, se disponível
    const { user } = useAuth(); // Obtém o usuário autenticado
    const navigate = useNavigate();

    const [adopterData, setAdopterData] = useState({
        fullName: '',
        description: '',
        phone: '',
        cep: '',
        street: '',
        number: '',
        neighborhood: '',
        complement: '',
        city: '',
        profileImg: '',
        profession: '', // Novo campo para profissão
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAdopterData = async () => {
            try {
                const idToFetch = adopterId || user?._id; // Usa o ID da URL ou o ID do usuário autenticado
                if (!idToFetch) {
                    setError("ID do adotante não encontrado.");
                    setLoading(false);
                    return;
                }

                console.log("Buscando dados do adotante com ID:", idToFetch);

                const token = localStorage.getItem("token");
                const response = await fetch(`https://centerpet-api.onrender.com/api/adopters/${idToFetch}`, {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : "",
                    },
                });

                if (!response.ok) {
                    throw new Error(`Erro ao buscar dados do adotante (${response.status})`);
                }

                const data = await response.json();
                console.log("Dados do adotante recebidos:", data);

                setAdopterData({
                    fullName: data.fullName || '',
                    description: data.description || '',
                    phone: data.phone || '',
                    cep: data.cep || '',
                    street: data.street || '',
                    number: data.number || '',
                    neighborhood: data.neighborhood || '',
                    complement: data.complement || '',
                    city: data.city || '',
                    profileImg: data.profileImg || '',
                    profession: data.profession || '', // Inclua o campo profissão
                });
                setLoading(false);
            } catch (error) {
                console.error("Erro ao buscar os dados do adotante:", error);
                setError("Não foi possível carregar os dados do adotante.");
                setLoading(false);
            }
        };

        fetchAdopterData();
    }, [adopterId, user]);

    if (loading) {
        return (
            <div id="edit_user" className="loading-container">
                <div className="loading-content">
                    <h2>Carregando dados do perfil...</h2>
                    <div className="loading-spinner"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="error-container"><p>{error}</p></div>;
    }

    const handleInputChange = (field, value) => {
        setAdopterData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const idToUpdate = adopterId || user?._id; // Usa o ID da URL ou o ID do usuário autenticado

            // Crie um FormData para enviar os dados, incluindo o arquivo de imagem
            const formData = new FormData();
            formData.append("fullName", adopterData.fullName);
            formData.append("description", adopterData.description);
            formData.append("phone", adopterData.phone);
            formData.append("cep", adopterData.cep);
            formData.append("street", adopterData.street);
            formData.append("number", adopterData.number);
            formData.append("neighborhood", adopterData.neighborhood);
            formData.append("complement", adopterData.complement);
            formData.append("city", adopterData.city);
            formData.append("profession", adopterData.profession);

            // Adicione a imagem ao FormData, se houver
            if (adopterData.profileImg instanceof File) {
                formData.append("profileImg", adopterData.profileImg);
            }

            const response = await fetch(`http://localhost:5000/api/adopters/editProfile/${idToUpdate}`, {
                method: "PATCH",
                headers: {
                    Authorization: token ? `Bearer ${token}` : "",
                },
                body: formData, // Envie o FormData
            });

            if (!response.ok) {
                throw new Error("Erro ao atualizar os dados do adotante.");
            }

            Swal.fire("Sucesso!", "Dados atualizados com sucesso.", "success");
            navigate(`/adopter-profile/${idToUpdate}`);
        } catch (error) {
            console.error("Erro ao atualizar os dados do adotante:", error);
            Swal.fire("Erro!", "Não foi possível atualizar os dados.", "error");
        }
    };

    return (
        <div id="edit_user">
            <div id="edit-form-container">
                <form id="edit-form" onSubmit={handleSubmit}>
                    <div id="edit-user-title">
                        <TitleType>Editar Perfil</TitleType>
                    </div>

                    <div id="user-img-profile">
                        <h2>Sua foto de perfil</h2>
                        <div className="image-input-container">
                            <ImageInputField
                                currentImage={adopterData.profileImg}
                                onImageChange={(file) => handleInputChange("profileImg", file)}
                                size={200}
                            />
                        </div>
                    </div>

                    <label>Nome completo:</label>
                    <InputField
                        type="text"
                        value={adopterData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        required
                    />

                    <label htmlFor="description">Descrição:</label>
                    <textarea
                        id="description"
                        className="edit-user-description"
                        value={adopterData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        rows={4}
                        placeholder="Descreva-se brevemente..."
                    ></textarea>

                    <label>Telefone:</label>
                    <InputField
                        type="tel"
                        value={adopterData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        required
                    />

                    <label>Profissão:</label>
                    <InputField
                        type="text"
                        value={adopterData.profession}
                        onChange={(e) => handleInputChange("profession", e.target.value)}
                        placeholder="Digite sua profissão"
                    />


                    <div className="address-section">
                        <h3>Endereço</h3>
                        <label>CEP:</label>
                        <InputField
                            type="text"
                            value={adopterData.cep}
                            onChange={(e) => handleInputChange("cep", e.target.value)}
                        />

                        <label>Rua:</label>
                        <InputField
                            type="text"
                            value={adopterData.street}
                            onChange={(e) => handleInputChange("street", e.target.value)}
                        />

                        <label>Número:</label>
                        <InputField
                            type="text"
                            value={adopterData.number}
                            onChange={(e) => handleInputChange("number", e.target.value)}
                        />

                        <label>Bairro:</label>
                        <InputField
                            type="text"
                            value={adopterData.neighborhood}
                            onChange={(e) => handleInputChange("neighborhood", e.target.value)}
                        />

                        <label>Complemento:</label>
                        <InputField
                            type="text"
                            value={adopterData.complement}
                            onChange={(e) => handleInputChange("complement", e.target.value)}
                        />

                        <label>Cidade:</label>
                        <InputField
                            type="text"
                            value={adopterData.city}
                            onChange={(e) => handleInputChange("city", e.target.value)}
                        />
                    </div>

                    <div id="edit-buttons-options">
                        <ButtonType type="submit" width="250px">Salvar Alterações</ButtonType>
                        <ButtonType
                            type="button"
                            width="250px"
                            onClick={() => navigate(-1)}
                        >
                            Cancelar
                        </ButtonType>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUser;