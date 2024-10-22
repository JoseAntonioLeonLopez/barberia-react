import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./Auth/pages/Auth";
import Dashboard from "./Dashboard/pages/Dashboard";
import Home from "./Home/pages/Home";
import Barber from "./Barber/pages/Barber";
import ServiciosComponent from "./Home/components/ServiciosComponent";
import PreciosComponent from "./Home/components/PreciosComponent";
import ReservarCitaComponent from "./Home/components/ReservarCitaComponent";
import ContactoComponent from "./Home/components/ContactoComponent";
import InicioComponent from "./Home/components/InicioComponent";
import LogoutComponent from "./Global Components/Logout";
import NotFoundComponent from "./Global Components/404";
import UsersComponent from "./Dashboard/components/Users";
import { AuthProvider } from "./Auth/context/AuthContext";
import ProtectedRoute from "./Auth/components/ProtectedRoute";
import Appointments from "./Global Components/Appointments";
import ScrollToTop from "./Global Components/ScrollToTop";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
        <ScrollToTop />
          <Routes>
            {/* Rutas sin proteger */}
            <Route path="/auth" element={<Auth />} />
            <Route path="/logout" element={<LogoutComponent />} />

            {/* Ruta con contenedor Home para CLIENT y ADMIN*/}
            <Route element={<ProtectedRoute allowedRoles={["CLIENT", "ADMIN"]} />}>
              <Route path="/" element={<Home />}>
                <Route path="/" element={<InicioComponent />} />
                <Route path="services" element={<ServiciosComponent />} />
                <Route path="pricing" element={<PreciosComponent />} />
                <Route path="booking" element={<ReservarCitaComponent />} />
                <Route path="contact" element={<ContactoComponent />} />
              </Route>
            </Route>

            {/* Ruta con contenedor Barber para BARBER */}
            <Route element={<ProtectedRoute allowedRoles={["BARBER"]} />}>
              <Route path="/barber" element={<Barber />} />
            </Route>

            {/* Ruta con contenedor Dashboard para ADMIN */}
            <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
              <Route path="/dashboard" element={<Dashboard />}>
                <Route path="/dashboard" element={<Appointments />} />
                <Route path="users" element={<UsersComponent />} />
              </Route>
            </Route>

            {/* Ruta para manejar errores 404 */}
            <Route path="*" element={<NotFoundComponent />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
