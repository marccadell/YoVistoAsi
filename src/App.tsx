import { Navigate, Routes, Route, BrowserRouter as Router, useLocation } from 'react-router-dom';
import { Fragment, lazy, Suspense, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import './App.css'
import 'react-toastify/dist/ReactToastify.css';

const Navbar = lazy(() => import("./components/Navbar"));
const Footer = lazy(() => import("./components/Footer"));
const Register = lazy(() => import("./pages/Register"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const CreateOutfit = lazy(() => import("./pages/CreateOutfit"));
const GenerateOutfit = lazy(() => import("./pages/GenerateOutfit"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const Contact = lazy(() => import("./pages/Contact"));
const Team = lazy(() => import("./pages/Team"));
const ScrollTop = lazy(() => import("./components/ScrollTop"));
const ScrollToTop = lazy(() => import("./components/ScrollToTop"));
const Objective = lazy(() => import("./pages/Objective"));
const Spinner = lazy(() => import("./components/Spinner"));

import { requireLoggedOut } from "./Guards/RouteGuard";



function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Cambia 5000 a la duración deseada en milisegundos
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
    <Suspense fallback={loading && <Spinner />}>
    <ScrollTop/>
    <Router>
    <ScrollToTop/>
    <Fragment>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Register" element={<Register />} />
        {/*<Route
              path="/Login"
              element={requireLoggedOut() ? <Login /> : <Navigate to="/Login" />}
        /> */}
        <Route path="/Login" element={<Login />} />
        <Route path="/CreateOutfit" element={<CreateOutfit />} />
        <Route path="/GenerateOutfit" element={<GenerateOutfit />} />
        
        <Route path="/TermsAndConditions" element={<TermsAndConditions />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Team" element={<Team />} />
        <Route path="/Objective" element={<Objective />} />
      </Routes>

      <Footer />
      <ToastContainer autoClose={1000}/>
    </Fragment>
    </Router>
    </Suspense>

    
    </>
  );
}

export default App;