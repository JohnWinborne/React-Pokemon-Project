import React, { useEffect, useMemo, useState } from "react";
import PokemonCard from "./PokemonCard";
import Loading from "./Loading";
import { fetchPokemonList } from "./pokemonApi";

const RESULTS_PER_PAGE = 6;

function PokemonGrid() {
  console.log("PokemonGrid rendered");
  const [pokemon, setPokemon] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPokemon() {
      try {
        setLoading(true);
        setError("");

        const data = await fetchPokemonList();

        const cleaned = data
          .filter((p) => Number.isFinite(Number(p.num)))
          .sort((a, b) => Number(a.num) - Number(b.num));

        setPokemon(cleaned);
      } catch (err) {
        setError("Failed to load Pokémon.");
      } finally {
        setLoading(false);
      }
    }

    loadPokemon();
  }, []);

  const visiblePokemon = useMemo(() => {
    return pokemon.slice(0, visibleCount);
  }, [pokemon, visibleCount]);

  const canLoadMore = visibleCount < pokemon.length;

  function handleLoadMore() {
    setVisibleCount((prev) => prev + RESULTS_PER_PAGE);
  }

  if (loading) {
    return (
      <section id="results">
        <Loading />
      </section>
    );
  }

  if (error) {
    return (
      <section id="results">
        <p>{error}</p>
      </section>
    );
  }

  if (!pokemon.length) {
    return (
      <section id="results">
        <p>No Pokémon found.</p>
      </section>
    );
  }
  console.log("pokemon length:", pokemon.length);
  console.log("visibleCount:", visibleCount);
  console.log("canLoadMore:", canLoadMore);
  return (
    <section id="results">
      <div className="pokemon__results">
        {visiblePokemon.map((p) => (
          <PokemonCard key={p.num} p={p} />
        ))}
      </div>

      {canLoadMore && (
        <div className="load-more__wrapper">
          <button className="load-more__btn" onClick={handleLoadMore}>
            Load More
          </button>
        </div>
      )}
    </section>
  );
}

export default PokemonGrid;
