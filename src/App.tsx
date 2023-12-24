import { Navigate, Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { Fragment, lazy, Suspense } from "react";
import './App.css'

const Navbar = lazy(() => import("./components/Navbar"));
const Footer = lazy(() => import("./components/Footer"));
const Register = lazy(() => import("./pages/Register"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));

import { requireLoggedOut } from "./Guards/RouteGuard";

import { ToastContainer } from "react-toastify";
import ScrollTop from "./pages/ScrollTop";
import Spinner from "./components/Spinner";

function App() {
  return (
    <>
    <ScrollTop/>
    <Router>
    <Fragment>
      <Suspense fallback={<Spinner />}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Register" element={<Register />} />
        <Route
              path="/Login"
              element={requireLoggedOut() ? <Login /> : <Navigate to="/Login" />}
            />
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