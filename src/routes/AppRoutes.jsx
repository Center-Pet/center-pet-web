import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Catalog from './../pages/Catalog/Catalog';
import PetInfo from "../pages/PetInfo/PetInfo";
import AdopterProfile from "../pages/AdopterProfile/AdopterProfile"; // Caminho corrigido

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/catalog" />} /> {/* Redireciona para /catalog */}
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/pet" element={<PetInfo />} />
            <Route path="/adopter-profile" element={<AdopterProfile />} /> {/* Adicione o caminho para o perfil do adotante */}
            <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
    );
};

export default AppRoutes;