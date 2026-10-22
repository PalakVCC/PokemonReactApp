import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function HomePage() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon/');
        setPokemonList(response.data.results);
        setLoading(false);
      } catch (err) {
        setError('Failed to load Pokemon list.');
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  if (loading) return <p className="status-msg">Loading Pokemon...</p>;
  if (error) return <p className="status-msg error">{error}</p>;

  return (
    <div className="app-container">
      <h1>Pokemon</h1>
      <div className="pokemon-grid">
        {pokemonList.map((pokemon) => {
          const urlParts = pokemon.url.split('/');
          const pokemonId = urlParts[urlParts.length - 2];
          const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

          return (
            <Link key={pokemon.name} to={`/pokemon/${pokemon.name}`} className="pokemon-card">
              <img src={imageUrl} alt={pokemon.name} />
              <h3>{pokemon.name.toUpperCase()}</h3>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;