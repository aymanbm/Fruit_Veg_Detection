// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import FruitDetectionWebcam from './FruitDetectionWebcam';
import './App.css'
import Accueil from './Accueil';
import ImageDetection from './ImageDetection';
import About from './About';
import Contact from './Contact';

function App() {
  return (
    <Router>
      <header>
        <NavBar />
      </header>

      <>
        <Routes>
          <Route path="/detection" element={<FruitDetectionWebcam />} />

          <Route path="/" element={<Accueil />} />
          <Route path="/ImageDetection" element={<ImageDetection />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="*" element={<h2>Page not found</h2>} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
