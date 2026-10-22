import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PokemonDetailsPage from './pages/PokemonDetailsPage';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pokemon/:name" element={<PokemonDetailsPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;