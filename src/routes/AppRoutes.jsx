import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Catalog from './../pages/Catalog/Catalog';
import PetInfo from "../pages/PetInfo/PetInfo";
import AdopterProfile from "../pages/AdopterProfile/AdopterProfile";
import ONGProfile from "../pages/ONGProfile/ONGProfile";
import RegisterPet from "../pages/RegisterPet/RegisterPet";
import EditPet from "../pages/EditPet/EditPet";
import Login from "../pages/Login/Login";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import Home from "../pages/Home/Home";
import TestDraft from "../pages/TestDraft/TestDraft";
import FormSafeAdopter from '../pages/FormSafeAdopter/FormSafeAdopter';
import RegisterOng from '../pages/RegisterOng/RegisterOng'
import EditUser from '../pages/EditUser/EditUser'
import EditOrg from '../pages/EditOrg/EditOrg'
import Dashboard from "../pages/Dashboard/Dashboard";
import TermsAndConditions from "../pages/TermsAndConditions/TermsAndConditions";
import CatalogFilter from "../pages/CatalogFilter/CatalogFilter"
import AdoptionPage from "../pages/AdoptionPage/AdoptionPage";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/pet-info/:petId" element={<PetInfo />} />
      {/* Rota dinâmica para o pet */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/adopter-profile/:adopterId" element={<AdopterProfile />} />
      <Route path="/ong-profile/:ongId" element={<ONGProfile />} />
      <Route path="/register-pet" element={<RegisterPet />} />
      <Route path="/edit-pet/:petId" element={<EditPet />} />
      <Route path="*" element={<PageNotFound />} />
      <Route path="/home" element={<Home />} />
      <Route path="/test-draft" element={<TestDraft />} />
      <Route path="/form-safe-adopter" element={<FormSafeAdopter />} />
      <Route path="/register-ong" element={<RegisterOng />} />
      <Route path="/edit-user" element={<EditUser />} />
      <Route path="/edit-org" element={<EditOrg />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      <Route path="/catalog-filter" element={<CatalogFilter />} />
      <Route path="/adoption/:petId/:userId/:ongId" element={<AdoptionPage />} />
    </Routes>
  );
};

export default AppRoutes;