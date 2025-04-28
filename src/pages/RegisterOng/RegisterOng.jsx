import './RegisterOng.css'
import ButtonType from '../../components/Atoms/ButtonType/ButtonType'
import InputField from '../../components/Atoms/InputField/InputField'
import TitleType from '../../components/Atoms/TitleType/TitleType'
import { useState } from 'react'
import ImageInputField from '../../components/Atoms/ImageInputField/ImageInputField'
import Swal from 'sweetalert2'
import './RegisterOng.css'

// link para rota: <Route path="/register-user" element={<RegisterUser />} />
// import para página: import RegisterUser from '../pages/RegisterUser/RegisterUser'
const RegisterOng = () => {

    const [roleOption, setRoleOption] = useState("ONG")

    // Informações de Cadastro
    const [fullName, setFullName] = useState(); // Nome completo
    const [description, setDescription] = useState(); // Descrição
    const [email, setEmail] = useState(); // Email
    const [password, setPassword] = useState(); // Senha
    const [passwordConfirm, setPasswordConfirm] = useState(); // Confirmar senha
    const [phone, setPhone] = useState(); // Telefone
    const [instagram, setInstagram] = useState(); // Instagram
    const [facebook, setFacebook] = useState(); // Facebook
    const [website, setWebsite] = useState(); // Site
    const [pixKey, setPixKey] = useState(); // Chave Pix

    const [cpf, setCpf] = useState(); // CPF
    const [cnpj, setCnpj] = useState(); // CNPJ
    const [collaborators, setCollaborators] = useState(); // Número de colaboradores

    const [zipCode, setZipCode] = useState(""); // CEP
    const [street, setStreet] = useState(""); // Rua
    const [number, setNumber] = useState(""); // Número
    const [noNumber, setNoNumber] = useState(false); // Sem número
    const [district, setDistrict] = useState(""); // Bairro
    const [city, setCity] = useState(""); // Cidade
    const [stateUf, setStateUf] = useState(""); // UF
    const [isFetchingZip, setIsFetchingZip] = useState(false); // Buscando CEP

    // Função para validar CNPJ
    function validarCNPJ(cnpj) {
        cnpj = cnpj.replace(/[^\d]+/g, '');

        if (cnpj.length !== 14) return false;

        // Elimina CNPJs com todos os dígitos iguais
        if (/^(\d)\1+$/.test(cnpj)) return false;

        let tamanho = cnpj.length - 2;
        let numeros = cnpj.substring(0, tamanho);
        let digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) pos = 9;
        }
        let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        if (resultado !== parseInt(digitos.charAt(0))) return false;

        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        if (resultado !== parseInt(digitos.charAt(1))) return false;

        return true;
    }

    // Função para validar CPF
    function validarCPF(cpf) {
        cpf = String(cpf).replace(/[^\d]+/g, '');
        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
        let soma = 0, resto;
        for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        resto = (soma * 10) % 11;
        if ((resto === 10) || (resto === 11)) resto = 0;
        if (resto !== parseInt(cpf.substring(9, 10))) return false;
        soma = 0;
        for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        resto = (soma * 10) % 11;
        if ((resto === 10) || (resto === 11)) resto = 0;
        if (resto !== parseInt(cpf.substring(10, 11))) return false;
        return true;
    }

    // Função para buscar endereço por CEP
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

    // Evento acionado ao enviar os dados
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!password) {
            Swal.fire({
                title: 'Atenção!',
                text: 'Por favor, insira uma senha.',
                icon: 'warning',
                showConfirmButton: false,
                timer: 3000,
                toast: false,
                position: 'center',
                customClass: 'swal2-toast warning'
            });
            return
        }
        if (passwordConfirm !== password) {
            Swal.fire({
                title: 'Atenção!',
                text: 'Senhas não coincidem.',
                icon: 'error',
                showConfirmButton: false,
                timer: 3000,
                toast: false,
                position: 'center',
                customClass: 'swal2-toast error'
            });
            return
        }
        if (roleOption === "ONG" && !cnpj) {
            Swal.fire({
                title: 'Atenção!',
                text: 'Por favor, insira um CNPJ válido.',
                icon: 'warning',
                showConfirmButton: false,
                timer: 3000,
                toast: false,
                position: 'center',
                customClass: 'swal2-toast warning'
            });
            return;
        }
        if (roleOption === "ONG" && !validarCNPJ(cnpj)) {
            Swal.fire({
                title: 'Atenção!',
                text: 'CNPJ inválido.',
                icon: 'error',
                showConfirmButton: false,
                timer: 3000,
                toast: false,
                position: 'center',
                customClass: 'swal2-toast error'
            });
            return;
        }
        if ((roleOption === "Projeto" || roleOption === "Protetor")) {
            if (!cpf) {
                Swal.fire({
                    title: 'Atenção!',
                    text: 'Por favor, insira um CPF válido.',
                    icon: 'warning',
                    showConfirmButton: false,
                    timer: 3000,
                    toast: false,
                    position: 'center',
                    customClass: 'swal2-toast warning'
                });
                return;
            }
            else {
                if (!instagram && !facebook && !website) {
                    Swal.fire({
                        title: 'Atenção!',
                        text: 'Insira pelo menos uma rede social caso você seja um projeto ou protetor.',
                        icon: 'warning',
                        showConfirmButton: false,
                        timer: 3000,
                        toast: false,
                        position: 'center',
                        customClass: 'swal2-toast warning'
                    });
                    return
                }
            }
        }
        if (roleOption === "Projeto" && (!collaborators)) {
            Swal.fire({
                title: 'Atenção!',
                text: 'Por favor, preencha todos os campos obrigatórios para Projeto.',
                icon: 'warning',
                showConfirmButton: false,
                timer: 3000,
                toast: false,
                position: 'center',
                customClass: 'swal2-toast warning'
            });
            return;
        }

        // Validação de CPF para Projeto
        if (roleOption === "Projeto") {
            if (!cpf) {
                Swal.fire({
                    title: 'Atenção!',
                    text: 'Por favor, insira um CPF válido para o representante do projeto.',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 3000,
                    toast: false,
                    position: 'center',
                    customClass: 'swal2-toast error'
                });
                return;
            }
            if (!validarCPF(cpf)) {
                Swal.fire({
                    title: 'CPF inválido!',
                    text: 'O CPF do representante do projeto não é válido.',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 3000,
                    toast: false,
                    position: 'center',
                    customClass: 'swal2-toast error'
                });
                return;
            }
        }

        // Validação de CPF para Protetor
        if (roleOption === "Protetor") {
            if (!cpf) {
                Swal.fire({
                    title: 'Atenção!',
                    text: 'Por favor, insira um CPF válido para o protetor.',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 3000,
                    toast: false,
                    position: 'center',
                    customClass: 'swal2-toast error'
                });
                return;
            }
            if (!validarCPF(cpf)) {
                Swal.fire({
                    title: 'CPF inválido!',
                    text: 'O CPF do protetor não é válido.',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 3000,
                    toast: false,
                    position: 'center',
                    customClass: 'swal2-toast error'
                });
                return;
            }
        }

        // LOADING DE PATA ANDANDO (REMOVER DEPOIS DOS TESTES)
        Swal.fire({
            title: 'Enviando...',
            html: `<div style="display:flex;flex-direction:column;align-items:center;">
                <svg width="48" height="48" viewBox="0 0 48 48" style="margin-bottom:8px;">
                  <g>
                    <ellipse cx="24" cy="44" rx="18" ry="4" fill="#f3d6e0"/>
                    <g id="paw" style="animation: pawwalk 0.7s infinite;">
                      <ellipse cx="24" cy="28" rx="10" ry="7" fill="#D14D72"/>
                      <ellipse cx="14" cy="18" rx="3" ry="4" fill="#D14D72"/>
                      <ellipse cx="34" cy="18" rx="3" ry="4" fill="#D14D72"/>
                      <ellipse cx="18" cy="12" rx="2" ry="3" fill="#D14D72"/>
                      <ellipse cx="30" cy="12" rx="2" ry="3" fill="#D14D72"/>
                    </g>
                  </g>
                </svg>
                <span style="margin-top:10px;">Estamos processando seu cadastro...</span>
            </div>`,
            showConfirmButton: false,
            allowOutsideClick: false,
            timer: 4000, // 4 segundos
            didOpen: () => {
                // ANIMAÇÃO DE PATA ANDANDO
                const style = document.createElement('style');
                style.innerHTML = `
                  @keyframes pawwalk {
                    0% { transform: translateY(0);}
                    20% { transform: translateY(-8px);}
                    40% { transform: translateY(0);}
                    60% { transform: translateY(8px);}
                    80% { transform: translateY(0);}
                    100% { transform: translateY(0);}
                  }
                `;
                document.head.appendChild(style);
            }
        });

        await new Promise(resolve => setTimeout(resolve, 4000)); // Espera 4 segundos

        // Aqui você pode colocar sua lógica de envio real e mostrar o resultado
        Swal.fire({
            title: 'Sucesso!',
            text: 'Formulário enviado!',
            icon: 'success',
            showConfirmButton: false,
            timer: 3000,
            toast: false,
            position: 'center',
            customClass: 'swal2-toast success'
        });
        // FIM DO BLOCO DE TESTE DE LOADING DE PATA
    };


    const showOrgInputs = (value) => {
        resetOrgInputs()
        setRoleOption(value)
    }

    // Reseta os valores dos campos de organização
    const resetOrgInputs = () => {
        setCpf("")
        setCnpj("")
        setCollaborators("")
    }

    const socialMediaValidation = () => {
        if (roleOption === "Projeto" || roleOption === "Protetor") {
            if (!instagram && !facebook && !website) {
                return true
            }
        }
        return false
    }

    /* Função para definir a URL da imagem de perfil*/

    return (
        <div className='register_ong'>
            <TitleType>Cadastre sua Organização</TitleType>
            <div id='register-text'>
                <p>Obs: Projetos e Protetores devem informar pelo menos uma rede social</p>
            </div>

            <div id="form-container">
                <form id="register-form" onSubmit={handleSubmit}>
                    <label>Nome: </label>
                    <InputField type="text" placeholder="Nome completo" value={fullName} onChange={(e) => setFullName(e.target.value)} width='30rem' required />
                    <label>Telefone: </label>
                    <InputField type="tel" placeholder="(00)00000-0000" value={phone} onChange={(e) => { setPhone(e.target.value) }} width='30rem' required />
                    <label>Email: </label>
                    <InputField type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} width='30rem' required />
                    <div className='input-textarea'>
                        <label>Descrição (opcional)</label>
                        <textarea name="form-input" id="input-description" rows={6} value={description} onChange={(e) => { setDescription(e.target.value) }}></textarea>
                    </div>

                    {/* Localização */}
                    <div className="endereco-section">
                        <div className="endereco-label-row">
                            <label>
                                CEP <span className="required">*</span>
                            </label>
                            <button
                                type="button"
                                className="cep-info-btn"
                                title="Por que pedimos o endereço?"
                                onClick={() =>
                                    Swal.fire({
                                        title: `<div style="display:flex;align-items:center;gap:0.6rem;">
                                                  <span style="font-size:1.7rem;color:#d14d72;">🔒</span>
                                                  <span style="font-size:1.18rem;color:#d14d72;font-weight:700;">Por que pedimos seu endereço?</span>
                                                </div>`,
                                        html: `
                                        <div style="font-size:1.05rem;text-align:left;max-width:350px;margin:auto;line-height:1.5;">
                                            <p style="margin:0 0 0.7em 0;">
                                                <b style="color:#d14d72;">Seu endereço <span style="text-decoration:underline;">não será exibido no site</span>.</b>
                                            </p>
                                            <div style="background:#fef2f4;border-radius:8px;padding:0.7em 1em;margin-bottom:0.8em;">
                                                <span style="color:#d14d72;font-weight:500;">Pedimos o endereço apenas por motivos de segurança:</span>
                                                <ul style="margin:0.5em 0 0.5em 1.2em;padding:0;">
                                                    <li>Evitar abandono de animais na porta do local</li>
                                                    <li>Proteger a privacidade de protetores e ONGs</li>
                                                    <li>Facilitar a busca por pets próximos</li>
                                                </ul>
                                            </div>
                                            <span style="color:#d14d72;font-weight:500;">Sua privacidade é prioridade!</span>
                                        </div>`,
                                        icon: undefined,
                                        confirmButtonColor: '#d14d72',
                                        confirmButtonText: 'Entendi',
                                        customClass: 'swal2-toast'
                                    })
                                }
                            >
                                <span className="cep-info-icon" aria-label="informação" title="Por que pedimos o endereço?">ℹ️</span> Por que pedimos o endereço?
                            </button>
                            <span className="endereco-privacidade">
                                <span className="lock-icon" aria-label="privado" title="Privacidade">🔒</span>
                                <span>Seu endereço não será divulgado no site</span>
                            </span>
                        </div>
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
                                width="12rem"
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

                        <label>Rua:</label>
                        <InputField
                            type="text"
                            placeholder="Rua"
                            value={street}
                            width="30rem"
                            required
                            disabled
                        />

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

                        <label>Bairro:</label>
                        <InputField
                            type="text"
                            placeholder="Bairro"
                            value={district}
                            width="20rem"
                            required
                            disabled
                        />

                        <label>Cidade:</label>
                        <InputField
                            type="text"
                            placeholder="Cidade"
                            value={city}
                            width="20rem"
                            required
                            disabled
                        />

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

                    <label>Instagram: </label>
                    <InputField type="url" value={instagram} onChange={(e) => setInstagram(e.target.value)} required={socialMediaValidation()} width='30rem' />
                    <label>Facebook: </label>
                    <InputField type="url" value={facebook} onChange={(e) => setFacebook(e.target.value)} required={socialMediaValidation()} width='30rem' />
                    <label>Site: </label>
                    <InputField type="url" value={website} onChange={(e) => setWebsite(e.target.value)} required={socialMediaValidation()} width='30rem' />
                    <label>Chave Pix (opcional): </label>
                    <InputField type="text" value={pixKey} onChange={(e) => setPixKey(e.target.value)} width='30rem' />

                    <label>Senha: </label>
                    <InputField type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required width='30rem' />
                    <label>Confirmar Senha: </label>
                    <InputField type="password" placeholder="Confirmar Senha" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} required width='30rem' />


                    <div id="image">
                        <h2>Insira sua imagem de perfil</h2>
                        <ImageInputField />
                    </div>

                    <div id="options">
                        <label><input type="radio" className='orgOption' name='orgOption' onChange={() => showOrgInputs("ONG")} checked={roleOption === "ONG"} />ONG</label>
                        <label><input type="radio" className='orgOption' name='orgOption' onChange={() => showOrgInputs("Projeto")} checked={roleOption === "Projeto"} />Projeto</label>
                        <label><input type="radio" className='orgOption' name='orgOption' onChange={() => showOrgInputs("Protetor")} checked={roleOption === "Protetor"} />Protetor</label>
                    </div>

                    {roleOption === "ONG" && (
                        <>
                            <label>CNPJ: </label>
                            <InputField type="number" placeholder="CNPJ" value={cnpj} onChange={(e) => setCnpj(e.target.value)} width='30rem' required />
                        </>
                    )}
                    {roleOption === "Projeto" && (
                        <>
                            <label>CPF (do representante do projeto): </label>
                            <InputField type="number" placeholder="CPF" value={cpf} required onChange={(e) => setCpf(e.target.value)} width='30rem' />
                            <label>Número de colaboradores: </label>
                            <InputField type="number" value={collaborators} onChange={(e) => setCollaborators(e.target.value)} width='30rem' required />
                        </>
                    )}
                    {roleOption === "Protetor" && (
                        <>
                            <label>CPF: </label>
                            <InputField type="text" placeholder="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} width='30rem' required />
                        </>
                    )}
                    <p id='text-login'>Já tem uma conta? <a href="/login" id='link-enter'>Entrar</a></p>
                    <ButtonType type="submit" width="100%">Cadastrar</ButtonType>
                </form>
            </div>
        </div>
    )
}

export default RegisterOng