import React, { Fragment, useContext, useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Home } from './pages/Home';
import './App.css'


function App() {

  return (
    <Fragment>
      <Navbar />
      {/*<Routes>
        <Route path="/favoritos" element={<FavoritosPage />} />
        <Route path="/iniciar-sesion" element={<IniciarSesionPage />} />
        <Route path="/crear-outfit" element={<CrearOutfitPage />} />
        <Route path="/contacta" element={<ContactaPage />} />
        // ... otras rutas
      </Routes>*/}
      <Home />
      <Footer />
    </Fragment>
  );
}

export default App
