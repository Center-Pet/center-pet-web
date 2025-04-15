import { BrowserRouter as Router, useLocation } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/Molecules/Footer/Footer";
import Navbar from "./components/Molecules/Navbar/Navbar";

function AppContent() {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/cadastro"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="app-wrapper">
      {!shouldHideNavbar && <Navbar />}
      <AppRoutes />
      {!shouldHideNavbar && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
