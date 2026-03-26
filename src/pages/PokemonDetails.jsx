import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPokemonDetails } from "../pokemonApi";

function PokemonDetails() {
  const navigate = useNavigate();
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await fetchPokemonDetails(name);
        setPokemon(data);
      } catch (e) {
        console.error(e);
        setPokemon(null);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [name]);

  if (loading) return <p style={{ padding: 16 }}>Loading...</p>;
  if (!pokemon) return <p style={{ padding: 16 }}>Not found.</p>;

  return (
    <>
      <button onClick={() => navigate(-1)}>← Back</button>
      <h1>
        {pokemon.species} #{pokemon.num}
      </h1>
      <img
        src={pokemon.sprite}
        alt={pokemon.species}
        width="128"
        height="128"
      />
      <p>Types: {pokemon.types.map((t) => t.name).join(", ")}</p>
      <p>
        Height: {pokemon.height} | Weight: {pokemon.weight}
      </p>
    </>
  );
}

export default PokemonDetails;
