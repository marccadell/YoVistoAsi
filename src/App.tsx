import { Navigate, Routes, Route, BrowserRouter as Router, useLocation } from 'react-router-dom';
import { Fragment, lazy, Suspense, useEffect } from "react";
import './App.css'

const Navbar = lazy(() => import("./components/Navbar"));
const Footer = lazy(() => import("./components/Footer"));
const Register = lazy(() => import("./pages/Register"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const CreateOutfit = lazy(() => import("./pages/CreateOutfit"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const Contact = lazy(() => import("./pages/Contact"));
const Team = lazy(() => import("./pages/Team"));
const ScrollTop = lazy(() => import("./components/ScrollTop"));
const ScrollToTop = lazy(() => import("./components/ScrollToTop"));


import { requireLoggedOut } from "./Guards/RouteGuard";

import { ToastContainer } from "react-toastify";

import Spinner from "./components/Spinner";


import Objective from './pages/Objective';


function App() {

  return (
    <>
    <ScrollTop/>
    <Router>
    <ScrollToTop/>
    <Fragment>
      <Suspense fallback={<Spinner />}>
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
        
        <Route path="/TermsAndConditions" element={<TermsAndConditions />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Team" element={<Team />} />
        <Route path="/Objective" element={<Objective />} />
      </Routes>

      <Footer />
      <ToastContainer autoClose={1000}/>
      </Suspense>
    </Fragment>
    </Router>

    
    </>
  );
}

export default App;