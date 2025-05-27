import React, { useState } from "react";
import ButtonType from '../../Atoms/ButtonType/ButtonType';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import CustomAvatar from '../../Atoms/CustomAvatar/CustomAvatar';
import useAuth from '../../../hooks/useAuth';
import { Heart, House, PawPrint, Note, User, ChartLine } from "phosphor-react";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { isAuthenticated, userType, user, isLoading } = useAuth();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    // Verificar se o usuário precisa preencher o formulário
    const needsToFillForm = isAuthenticated && userType === "Adopter" && !user?.safeAdopter;

    return (
        <header>
            <div className="pink_square"></div>
            <nav id='navbar'>
                <img
                    id="logo"
                    src="/assets/logo/CenterPet.png"
                    alt="Center Pet Logo"
                    onClick={() => navigate('/')}
                    style={{ cursor: 'pointer' }}
                />
                <button className="hamburger-menu" onClick={toggleMenu}>
                    ☰
                </button>

                {/* Menu para desktop */}
                <ul className="menu-desktop">
                    <li>
                        <ButtonType bgColor={"#D14D72"} onClick={() => navigate('/home')}><House size={25} />Home</ButtonType>
                    </li>
                    <li>
                        <ButtonType bgColor={"#D14D72"} onClick={() => navigate('/catalog')}><PawPrint size={25} />Catálogo</ButtonType>
                    </li>

                    {/* Botão de ONG apenas para usuários do tipo ONG */}
                    {isAuthenticated && userType === "Ong" && (
                        <li>
                            <ButtonType bgColor={"#D14D72"} onClick={() => navigate('/dashboard')}><ChartLine size={25} />Estatísticas</ButtonType>
                        </li>
                    )}

                    {/* Botão formulário apenas para adotantes que NÃO preencheram o formulário */}
                    {needsToFillForm && (
                        <li>
                            <ButtonType bgColor={"#D14D72"} onClick={() => navigate('/form-safe-adopter')}><Note size={25} /> Formulário</ButtonType>
                        </li>
                    )}

                    {/* Se não estiver logado, mostrar botão de login */}
                    {!isAuthenticated && (
                        <li>
                            <ButtonType bgColor={"#D14D72"} onClick={() => navigate('/login')}><User size={25} />Login</ButtonType>
                        </li>
                    )}
                </ul>

                {/* Menu para mobile */}
                <ul className={`menu ${isMenuOpen ? "open" : ""}`}>
                    <button className="close-menu" onClick={closeMenu}>✕</button>
                    <li>
                        <ButtonType bgColor={"#D14D72"} onClick={() => { navigate('/home'); closeMenu(); }}><House size={25} />Home</ButtonType>
                    </li>
                    <li>
                        <ButtonType bgColor={"#D14D72"} onClick={() => { navigate('/catalog'); closeMenu(); }}><PawPrint size={25} /> Catálogo</ButtonType>
                    </li>

                    {isAuthenticated && userType === "Ong" && (
                        <li>
                            <ButtonType bgColor={"#D14D72"} onClick={() => { navigate('/dashboard'); closeMenu(); }}><ChartLine size={25} />Estatísticas</ButtonType>
                        </li>
                    )}

                    {/* Botão formulário apenas para adotantes que NÃO preencheram o formulário */}
                    {needsToFillForm && (
                        <li>
                            <ButtonType bgColor={"#D14D72"} onClick={() => { navigate('/form-safe-adopter'); closeMenu(); }}><Note size={25} />Formulário</ButtonType>
                        </li>
                    )}

                    {!isAuthenticated && (
                        <li>
                            <ButtonType bgColor={"#D14D72"} onClick={() => { navigate('/login'); closeMenu(); }}><User size={25} /> Login</ButtonType>
                        </li>
                    )}
                </ul>

                {/* Avatar do usuário - mostrar APENAS se estiver autenticado */}
                {!isLoading && isAuthenticated && (
                    <div className="avatar-icon">
                        <CustomAvatar
                            navigateTo={userType === "Adopter"
                                ? `/adopter-profile/${user?._id}`
                                : `/ong-profile/${user?._id}`
                            }
                            imageSrc={user?.profileImg || "https://i.imgur.com/WanR0b3.png"}
                        />
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Navbar;