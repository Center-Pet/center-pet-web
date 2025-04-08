import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/Footer/Footer"; 
import Navbar from "./components/Navbar/Navbar"; 
function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />
        <AppRoutes />

        <Footer />
      </div>
    </Router>
  );
}

export default App;
