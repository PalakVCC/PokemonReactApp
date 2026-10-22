import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PokemonDetailsPage from './pages/PokemonDetailsPage';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <nav className="navbar">
        <Link to="/">Home</Link>
      </nav>
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