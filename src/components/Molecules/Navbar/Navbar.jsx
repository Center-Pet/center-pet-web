import React, { useState } from "react";
import ButtonType from '/src/components/Atoms/ButtonType/ButtonType.jsx';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import CustomAvatar from '/src/components/Atoms/CustomAvatar/CustomAvatar.jsx';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header>
            <div className="pink_square"></div>
            <nav id='navbar'>
                <img 
                    id="logo" 
                    src="/assets/logo/CenterPet.png" 
                    alt="Center Pet Logo" 
                    onClick={() => navigate('/login')} 
                    style={{ cursor: 'pointer' }} 
                />
                <button className="hamburger-menu" onClick={toggleMenu}>
                    ☰
                </button>
                {/* Menu padrão para telas grandes */}
                <ul className="menu-desktop">
                    <li>
                        <ButtonType bgColor={"#D14D72"} onClick={() => navigate('/home')} icon={"/assets/icons/home.png"}>Home</ButtonType>
                    </li>
                    <li>
                        <ButtonType bgColor={"#D14D72"} onClick={() => navigate('/catalog')} icon={"/assets/icons/pawprint.png"}>Catálogo</ButtonType>
                    </li>
                    
                    <li>
                        <ButtonType bgColor={"#D14D72"} onClick={() => navigate('/ong-profile')} icon={"/assets/icons/heart.png"}>ONG</ButtonType>
                    </li>
                    
                    <li>
                        <ButtonType bgColor={"#D14D72"} onClick={() => navigate('/form-safe-adopter')} icon={"/assets/icons/form.png"}>Formulário</ButtonType>
                    </li>
                </ul>
                {/* Menu lateral para dispositivos móveis */}
                <ul className={`menu ${isMenuOpen ? "open" : ""}`}>
                    <button className="close-menu" onClick={closeMenu}>✕</button>
                    <li>
                        <ButtonType bgColor={"#D14D72"} onClick={() => navigate('/home')} icon={"/assets/icons/home.png"}>Home</ButtonType>
                    </li>
                    <li>
                        <ButtonType bgColor={"#D14D72"} onClick={() => navigate('/catalog')} icon={"/assets/icons/pawprint.png"}>Catálogo</ButtonType>
                    </li>
                    
                    <li>
                        <ButtonType bgColor={"#D14D72"} onClick={() => navigate('/ong-profile')} icon={"/assets/icons/heart.png"}>ONG</ButtonType>
                    </li>
                    <li>
                        <ButtonType bgColor={"#D14D72"} onClick={() => navigate('/form-safe-adopter')} icon={"/assets/icons/form.png"}>Formulário</ButtonType>
                    </li>
                </ul>
                <div className="avatar-icon">
                    <CustomAvatar navigateTo="/adopter-profile" imageSrc="https://i.pinimg.com/736x/76/36/82/76368290b02e36e0ccc1178cfbe17652.jpg"/>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;