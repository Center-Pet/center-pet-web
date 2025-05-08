import './EditUser.css'
import ButtonType from '../../components/Atoms/ButtonType/ButtonType'
import ImageInputField from '../../components/Atoms/ImageInputField/ImageInputField'
import TitleType from '../../components/Atoms/TitleType/TitleType'
import InputField from '../../components/Atoms/InputField/InputField'
import Swal from 'sweetalert2'
import { useState } from 'react'

const EditUser = ()=> {

    const [fullName, setFullName] = useState(); // Nome completo
    const [description, setDescription] = useState(); // Descrição
    const [phone, setPhone] = useState(); // Telefone

    const [zipCode, setZipCode] = useState(""); // CEP
    const [street, setStreet] = useState(""); // Rua
    const [number, setNumber] = useState(""); // Número
    const [noNumber, setNoNumber] = useState(false); // Sem número
    const [district, setDistrict] = useState(""); // Bairro
    const [city, setCity] = useState(""); // Cidade
    const [stateUf, setStateUf] = useState(""); // UF

    // Mostra um alert para alterar senha
    const updatePassword = async ()=>{
    
        const {value: formValues} = await Swal.fire({
            title: 'Insira sua nova senha',
            html: 
            `<div>
                <div style="display: flex; flex-direction: column; margin-bottom: 10px">
                    
                    <label style="align-self: start">Digite sua senha atual:</label>
                    <input type="password" id="actual-password-input" class="swal-input">
                </div>
                <div style="display: flex; flex-direction: column">
                    <label style="align-self: start">Digite sua nova senha:</label>
                    <input type="password" id="new-password-input" class="swal-input">
                </div>
            </div>
            <style>
                .swal-input{
                    padding: 0.75rem 1rem;
                    border-radius: 0.5rem;
                    border: 1px solid #fcc8d1;
                    background-color: white;
                    transition: all 0.3s ease;
                }
                .swal-input:focus{
                    outline: none;
                    border-color: #d14d72;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 6px rgba(209, 77, 114, 0.1);
                }
            </style>`,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Alterar',
            cancelButtonText: 'Cancelar',
            allowOutsideClick: true,
            
            preConfirm: () => {
                if(!document.getElementById("actual-password-input").value || !document.getElementById("new-password-input").value){
                    Swal.showValidationMessage("Preencha os dois campos!")
                }
                return [
                    document.getElementById("actual-password-input").value,
                    document.getElementById("new-password-input").value
                ];
            }
        })
        if (formValues) {
            Swal.fire({
                icon: 'success',
                title: 'Senha alterada com sucesso',
                showConfirmButton: false,
                timer: 2000
            })
        }
        
    }

    // Busca de endereço por CEP
    const buscarEnderecoPorCep = async (cepValue) => {
        const cepLimpo = cepValue.replace(/\D/g, "");
        if (cepLimpo.length !== 8) return;

        setIsFetchingZip(true);

        Swal.fire({
            title: 'Buscando endereço...',
            html: `<div style="display:flex;flex-direction:column;align-items:center;">
                <svg width="60" height="60" viewBox="0 0 60 60" style="margin-bottom:8px;">
                  <g>
                    <ellipse cx="30" cy="54" rx="18" ry="5" fill="#f3d6e0"/>
                    <g id="paw" style="animation: pawwalk 1s infinite cubic-bezier(.4,0,.2,1);">
                      <ellipse cx="30" cy="38" rx="12" ry="9" fill="#D14D72"/>
                      <ellipse cx="18" cy="28" rx="4" ry="6" fill="#D14D72"/>
                      <ellipse cx="42" cy="28" rx="4" ry="6" fill="#D14D72"/>
                      <ellipse cx="22" cy="18" rx="3" ry="4" fill="#D14D72"/>
                      <ellipse cx="38" cy="18" rx="3" ry="4" fill="#D14D72"/>
                    </g>
                  </g>
                </svg>
                <span style="margin-top:10px;">Aguarde um instante</span>
            </div>`,
            showConfirmButton: false,
            allowOutsideClick: false,
            didOpen: () => {
                // ANIMAÇÃO DE PATA ANDANDO MELHORADA
                const style = document.createElement('style');
                style.innerHTML = `
                  @keyframes pawwalk {
                    0% { transform: translateX(0) scale(1);}
                    20% { transform: translateX(10px) scale(1.05);}
                    40% { transform: translateX(20px) scale(1);}
                    50% { transform: translateX(25px) scale(0.98);}
                    60% { transform: translateX(20px) scale(1);}
                    80% { transform: translateX(10px) scale(1.05);}
                    100% { transform: translateX(0) scale(1);}
                  }
                `;
                document.head.appendChild(style);
            }
        });

        try {
            const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
            const data = await res.json();
            if (data.erro) {
                Swal.fire({
                    title: 'CEP não encontrado!',
                    text: 'Verifique o CEP digitado.',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 2500,
                    toast: false,
                    position: 'center',
                    customClass: 'swal2-toast error'
                });
                setStreet("");
                setDistrict("");
                setCity("");
                setStateUf("");
            } else {
                setStreet(data.logradouro || "");
                setDistrict(data.bairro || "");
                setCity(data.localidade || "");
                setStateUf(data.uf || "");
                Swal.close();
            }
        } catch {
            Swal.fire({
                title: 'Erro!',
                text: 'Não foi possível buscar o endereço.',
                icon: 'error',
                showConfirmButton: false,
                timer: 2500,
                toast: false,
                position: 'center',
                customClass: 'swal2-toast error'
            });
        }
        setIsFetchingZip(false);
    };

    return (
        <div id="edit_user">
            <div id='edit-form-container'>
                <form id='edit-form' action="">
                    <div id="edit-org-title">
                        <TitleType>Editar perfil</TitleType>
                    </div>
                    <div id='user-img-profile'>
                        <h2>Sua foto de perfil</h2>
                        <ImageInputField/>
                    </div>
                    
                    <label>Nome completo: </label>
                    <InputField
                        type="text"
                        placeholder=""
                        width="70rem"
                        value={fullName}
                        required
                        onChange={(e)=>{setFullName(e.target.value)}}
                    />
                    <label>Número de telefone: </label>
                    <InputField
                        type="tel"
                        placeholder=""
                        width="70rem"
                        value={phone}
                        required
                        onChange={(e)=>{setPhone(e.target.value)}}
                    />
                    <div id='edit-input-textarea'>
                        <label>Descrição</label>
                        <textarea name="edit-form-input" id="edit-user-input-description" rows={6} value={description} onChange={(e)=>{setDescription(e.target.value)}}></textarea>
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
                                            setZipCode(e.target.value);
                                            if (e.target.value.replace(/\D/g, "").length === 8) {
                                                buscarEnderecoPorCep(e.target.value);
                                            }
                                        }}
                                        width="11.4rem"
                                        maxLength={9}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="cep-helper-btn"
                                        onClick={() => window.open("https://buscacepinter.correios.com.br/app/endereco/index.php", "_blank")}
                                    >
                                        Não sei meu CEP
                                    </button>
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
                                    disabled
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


                        </div>
                        <div className="row_user_form">
                            <div className="col_user_form">
                                <label>Bairro:</label>
                                <InputField
                                    type="text"
                                    placeholder="Bairro"
                                    value={district}
                                    width="21rem"
                                    required
                                    disabled
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
                                    disabled
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
                                    disabled
                                    
                                />
                            </div>
                        </div>
                    </div>

                    <button type="button" id='btn-update-password' onClick={()=>{updatePassword()}}>Clique aqui para alterar senha</button>

                    <div id="edit-buttons-options">
                        <ButtonType type="submit" width="250px">Salvar Alterações</ButtonType>
                        <ButtonType type="button" width="250px">Cancelar</ButtonType>
                    </div>
                </form>
            </div>
        </div>
    )    
}
export default EditUser