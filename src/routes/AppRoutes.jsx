import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Catalog from './../pages/Catalog/Catalog';
import PetInfo from "../pages/PetInfo/PetInfo";
import AdopterProfile from "../pages/AdopterProfile/AdopterProfile";
import ONGProfile from "../pages/ONGProfile/ONGProfile";
import RegisterPet from "../pages/RegisterPet/RegisterPet";
import Login from "../pages/Login/Login";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import Home from "../pages/Home/Home";
import TestDraft from "../pages/TestDraft/TestDraft";
import FormSafeAdopter from '../pages/FormSafeAdopter/FormSafeAdopter';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/pet" element={<PetInfo />} />
            <Route path="/pet/:id" element={<PetInfo />} /> {/* Rota dinâmica para o pet */}
            <Route path="/adopter-profile" element={<AdopterProfile />} /> 
            <Route path="/ong-profile" element={<ONGProfile />} />
            <Route path="/register-pet" element={<RegisterPet />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/home" element={<Home />} />
            <Route path="/test-draft" element={<TestDraft />} />
            <Route path="/form-safe-adopter" element={<FormSafeAdopter />} />
        </Routes>
    );
};

export default AppRoutes;