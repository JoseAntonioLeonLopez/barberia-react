import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./Auth/pages/Auth";
import Dashboard from "./Dashboard/pages/Dashboard";
import Home from "./Home/pages/Home";
import ServiciosComponent from "./Home/components/ServiciosComponent";
import PreciosComponent from "./Home/components/PreciosComponent";
import ReservarCitaComponent from "./Home/components/ReservarCitaComponent";
import ContactoComponent from "./Home/components/ContactoComponent";
import InicioComponent from "./Home/components/InicioComponent";
import LogoutComponent from "./Global Components/Logout";
import NotFoundComponent from "./Global Components/404"; 

const App = () => {
  return (
    <Router>
      <div className="App">
        {/* Definición de las rutas */}
        <Routes>
          {/* Rutas sin proteger */}
          <Route path="/auth" element={<Auth />} />
          <Route path="/logout" element={<LogoutComponent />} />

          {/* Ruta con contenedor Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Ruta con contenedor Home */}
          <Route path="/" element={<Home />}>
            <Route path="/" element={<InicioComponent />} />
            <Route path="services" element={<ServiciosComponent />} />
            <Route path="pricing" element={<PreciosComponent />} />
            <Route path="booking" element={<ReservarCitaComponent />} />
            <Route path="contact" element={<ContactoComponent />} />
          </Route>

          {/* Ruta para manejar errores 404 */}
          <Route path="*" element={<NotFoundComponent />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
