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
    const [nome, setNome] = useState()
    const [description, setDescription] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [passwordConfirm, setPasswordConfirm] = useState()
    const [phone, setPhone] = useState()
    const [city, setCity] = useState()
    const [instagram, setInstagram] = useState()
    const [facebook, setFacebook] = useState()
    const [site, setSite] = useState()
    const [pixKey, setPixKey] = useState()

    const [cpf, setCpf] = useState()
    const [cnpj, setCnpj] = useState()
    const [numCollaborators, setNumCollaborators] = useState()

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

    // Evento acionado ao enviar os dados
    const handleSubmit = (e) => {
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
                if (!instagram && !facebook && !site) {
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
        if (roleOption === "Projeto" && (!numCollaborators)) {
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
        // Sucesso
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
        return
    };


    const showOrgInputs = (value) => {
        resetOrgInputs()
        setRoleOption(value)
    }

    // Reseta os valores dos campos de organização
    const resetOrgInputs = () => {
        setCpf("")
        setCnpj("")
        setNumCollaborators("")
    }

    const socialMediaValidation = () => {
        if (roleOption === "Projeto" || roleOption === "Protetor") {
            if (!instagram && !facebook && !site) {
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
                    <InputField type="text" placeholder="Nome completo" value={nome} onChange={(e) => setNome(e.target.value)} width='30rem' required />
                    <label>Telefone: </label>
                    <InputField type="tel" placeholder="(00)00000-0000" value={phone} onChange={(e) => { setPhone(e.target.value) }} width='30rem' required />
                    <label>Email: </label>
                    <InputField type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} width='30rem' required />
                    <label>Cidade: </label>
                    <InputField type="text" placeholder="Cidade" value={city} onChange={(e) => setCity(e.target.value)} width='30rem' required />
                    <div className='input-textarea'>
                        <label>Descrição (opcional)</label>
                        <textarea name="form-input" id="input-description" rows={6} value={description} onChange={(e) => { setDescription(e.target.value) }}></textarea>
                    </div>

                    <label>Instagram: </label>
                    <InputField type="url" value={instagram} onChange={(e) => setInstagram(e.target.value)} required={socialMediaValidation()} width='30rem' />
                    <label>Facebook: </label>
                    <InputField type="url" value={facebook} onChange={(e) => setFacebook(e.target.value)} required={socialMediaValidation()} width='30rem' />
                    <label>Site: </label>
                    <InputField type="url" value={site} onChange={(e) => setSite(e.target.value)} required={socialMediaValidation()} width='30rem' />
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
                            <InputField type="number" value={numCollaborators} onChange={(e) => setNumCollaborators(e.target.value)} width='30rem' required />
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