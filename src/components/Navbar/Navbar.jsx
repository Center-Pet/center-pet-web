import ButtonType from '../ButtonType/ButtonType';
import Dropdown from '../Dropdown/Dropdown';
import SearchBar from '../SearchBar/SearchBar';
import './Navbar.css';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Importar useLocation

const Navbar = () => {
    const navigate = useNavigate(); // Inicializar o hook useNavigate
    const location = useLocation(); // Obter a rota atual

    useEffect(() => {
        const dropdown_button = document.querySelector('#dropdown_button');

        if (dropdown_button) {
            dropdown_button.addEventListener("click", showDropdown);
        }
        return () => {
            if (dropdown_button) {
                dropdown_button.removeEventListener('click', showDropdown);
            }
        };
    });

    const showDropdown = () => {
        document.getElementById("filtros_dropdown").classList.toggle("show");
    };

    const CustomComponent = () => {
        if (location.pathname === '/catalog') {
            return <Dropdown />; // Exibe o Dropdown na página Catalog
        } else if (location.pathname === '/ong-profile') {
            return <img src="/assets/profile.png" alt="ONG Profile" className="profile-picture" />; // Exibe a foto de perfil na página da ONG
        } else if (location.pathname === '/adopter-profile') {
            return <img src="/assets/adopter-profile.png" alt="Adopter Profile" className="profile-picture" />; // Exibe a foto de perfil do adotante
        } else if (location.pathname === '/home') {
            return <SearchBar /> // Exibe a barra de pesquisa na home
        }
        return null; // Não exibe nada em outras páginas
    };

    return (
        <>
            <header>
                <div className="pink_square"></div>
                <nav id='navbar'>
                    <img id="logo" src="/assets/CenterPet.png" alt="Center Pet Logo" />
                    <ul>
                        <li>
                            <ButtonType bgColor={"#D14D72"} onClick={() => navigate('/catalog')}>Catálogo</ButtonType>
                        </li>
                        <li>
                            <ButtonType bgColor={"#D14D72"} onClick={() => navigate('/home')}>Home</ButtonType>
                        </li>
                        <li>
                            <ButtonType bgColor={"#D14D72"} onClick={() => navigate('/ong-profile')}>ONG</ButtonType>
                        </li>
                    </ul>
                    <div className="custom-component">
                        <CustomComponent /> {/* Renderiza o componente apropriado com base na rota */}
                    </div>
                </nav>
            </header>
        </>
    );
};

export default Navbar;