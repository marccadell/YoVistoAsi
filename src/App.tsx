import React, { Fragment, useContext, useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import { Home } from './pages/Home';
import './App.css'


function App() {

  return (
    <Fragment>
      <Navbar />
      <Home />
    </Fragment>
  );
}

export default App
