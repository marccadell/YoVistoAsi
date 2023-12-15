import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { Fragment, lazy, Suspense } from "react";
import './App.css'

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Spinner from "./components/Spinner";
import Home from './pages/Home';
import Register from './pages/Register';

function App() {
  return (
    <Fragment>
      <Suspense fallback={<Spinner />}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Register />} />
      </Routes>
      <Footer />
      </Suspense>
    </Fragment>
    
  );
}

export default App;