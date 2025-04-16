import React, { useState } from "react";
import ButtonType from '/src/components/Atoms/ButtonType/ButtonType.jsx';
import Filter from '/src/components/Atoms/Filter/Filter.jsx';
import './Navbar.css';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const CustomComponent = () => {
        if (location.pathname === '/catalog') {
            return <Filter />;
        } else if (location.pathname === '/ong-profile') {
            return <img src="/assets/profile.png" alt="ONG Profile" className="profile-picture" />;
        } else if (location.pathname === '/adopter-profile') {
            return <img src='/assets/omni-man-profile.jpg' className="profile-picture" />;
        }
        return null;
    };

    return (
        <header>
            <div className="pink_square"></div>
            <nav id='navbar'>
                <img id="logo" src="/assets/logo/CenterPet.png" alt="Center Pet Logo" />
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
                        <ButtonType bgColor={"#D14D72"} onClick={() => navigate('/adopter-profile')} icon={"/assets/icons/user.png"}>Meu Perfil</ButtonType>
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
                        <ButtonType bgColor={"#D14D72"} onClick={() => navigate('/adopter-profile')} icon={"/assets/icons/user.png"}>Meu Perfil</ButtonType>
                    </li>
                </ul>
                <div className="custom-component">
                    <CustomComponent />
                </div>
            </nav>
        </header>
    );
};

export default Navbar;