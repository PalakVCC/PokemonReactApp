import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function PokemonDetailsPage() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        setPokemon(response.data);
        setLoading(false);
      } catch (err) {
        setError('Could not fetch details for this Pokémon.');
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [name]);

  if (loading) return <p className="status-msg">Loading details for {name}...</p>;
  if (error) return <p className="status-msg error">{error}</p>;
  if (!pokemon) return null;

  return (
    <div className="details-container">
      <Link to="/" className="back-btn">&larr; Back to Home</Link>

      <div className="detail-card">
        <h2>{pokemon.name.toUpperCase()}</h2>
        <img 
          src={pokemon.sprites.front_default} 
          alt={pokemon.name} 
          className="detail-img"
        />

        <div className="info-section">
          <h3>Abilities</h3>
          <ul>
            {pokemon.abilities.map((item, index) => (
              <li key={index}>
                {item.ability.name} {item.is_hidden && '(Hidden)'}
              </li>
            ))}
          </ul>
        </div>

        <div className="info-section">
          <h3>Stats</h3>
          <p><strong>Height:</strong> {pokemon.height}</p>
          <p><strong>Weight:</strong> {pokemon.weight}</p>
          <p><strong>Base Experience:</strong> {pokemon.base_experience}</p>
        </div>

        <div className="info-section">
          <h3>Types</h3>
          <div className="types-container">
            {pokemon.types.map((typeObj, index) => (
              <span key={index} className="type-tag">
                {typeObj.type.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetailsPage;