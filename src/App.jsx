import { BrowserRouter as Router, useLocation } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/Molecules/Footer/Footer";
import Navbar from "./components/Molecules/Navbar/Navbar";
import AnimatedBackground from "./components/Molecules/Background/Background";
import ChatButton from "./components/Molecules/ChatButton/ChatButton";
import AuthProvider from "./Providers/AuthProvider"; 
import FontControls from "./components/Molecules/FontControls/FontControls";
import ColorBlindFilter from './components/Molecules/ColorBlindFilter/ColorBlindFilter'; 
import SvgColorBlindFilters from "./components/Molecules/ColorBlindFilter/SvgColorBlindFilters";
import ThemeToggle from "./components/Molecules/ThemeToggle/ThemeToggle";

function AppContent() {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/cadastro", "/register-ong"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="app-wrapper" style={{ position: 'relative' }}>
      <AnimatedBackground /> {/* 👈 Background animado adicionado aqui */}
      <FontControls /> {/* 👈 Controles de acessibilidade adicionados aqui */}
      <ColorBlindFilter />{/* 👈 Filtro de daltonismo adicionado aqui */}
      <SvgColorBlindFilters /> {/* 👈 SVGs para filtros de daltonismo */}
      <ThemeToggle /> {/* 👈 Pode ficar na navbar ou flutuando */}
      {!shouldHideNavbar && <Navbar />} 
      <AppRoutes />
      <ChatButton />
      {!shouldHideNavbar && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
