import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Catalog from './../pages/Catalog/Catalog';
import PetInfo from "../pages/PetInfo/PetInfo"


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/catalog" />} /> {/* Redireciona para /catalog */}
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/pet" element={<PetInfo />} />
            <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
    );
};



export default AppRoutes;