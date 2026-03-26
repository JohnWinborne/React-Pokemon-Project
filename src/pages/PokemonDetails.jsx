import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Loading from "../components/Loading";
import PokemonCard from "../components/PokemonCard";
import {
  fetchPokemonDetailsByDexNumber,
  fetchPokemonList,
} from "../pokemonApi";

function PokemonDetails() {
  const { id } = useParams();

  const [pokemon, setPokemon] = useState(null);
  const [allPokemon, setAllPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [relatedLoading, setRelatedLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDetails() {
      setLoading(true);
      setError("");

      try {
        const data = await fetchPokemonDetailsByDexNumber(id);
        setPokemon(data);
      } catch (e) {
        console.error(e);
        setPokemon(null);
        setError("Pokémon not found.");
      } finally {
        setLoading(false);
      }
    }

    loadDetails();
  }, [id]);

  useEffect(() => {
    async function loadList() {
      setRelatedLoading(true);

      try {
        const list = await fetchPokemonList();
        const sorted = [...list].sort((a, b) => Number(a.num) - Number(b.num));
        setAllPokemon(sorted);
      } catch (e) {
        console.error(e);
        setAllPokemon([]);
      } finally {
        setRelatedLoading(false);
      }
    }

    loadList();
  }, []);

  const nextPokemon = useMemo(() => {
    if (!pokemon || !allPokemon.length) return [];

    const currentNum = Number(pokemon.num);

    return allPokemon.filter((p) => Number(p.num) > currentNum).slice(0, 3);
  }, [pokemon, allPokemon]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="container details__page">
          <Loading />
        </main>
      </>
    );
  }

  if (error || !pokemon) {
    return (
      <>
        <Header />
        <main className="container details__page">
          <p>{error || "Pokémon not found."}</p>
        </main>
      </>
    );
  }

  const types = (pokemon.types || []).map((t) => t.name).join(", ");
  const abilities = [
    pokemon.abilities?.first?.name,
    pokemon.abilities?.second?.name,
    pokemon.abilities?.hidden?.name,
  ].filter(Boolean);

  return (
    <>
      <Header />

      <main className="container details__page">
        <section className="pokemon-details">
          <div className="pokemon-details__left">
            <div className="pokemon-details__image-box">
              <p className="pokemon-details__num">#{pokemon.num}</p>
              <img
                src={pokemon.sprite}
                alt={pokemon.species}
                className="pokemon-details__image"
              />
            </div>
          </div>

          <div className="pokemon-details__right">
            <h1 className="pokemon-details__title">{pokemon.species}</h1>
            <div className="pokemon-details__types">
              {(pokemon.types || []).map((t) => (
                <span
                  key={t.name}
                  className={`type-badge type-${t.name.toLowerCase()}`}
                >
                  {t.name}
                </span>
              ))}
            </div>
            <div className="pokemon-details__info">
              <p>
                <strong>Height:</strong> {pokemon.height} m
              </p>
              <p>
                <strong>Weight:</strong> {pokemon.weight} kg
              </p>
              <p>
                <strong>Abilities:</strong> {abilities.join(", ") || "Unknown"}
              </p>
            </div>

            <div className="pokemon-details__stats">
              <h3>Stats</h3>

              <div className="pokemon-details__stats-grid">
                <div className="stat-row">
                  <span className="stat-label">HP</span>
                  <span className="stat-value">
                    {pokemon.baseStats?.hp ?? "Unknown"}
                  </span>
                </div>

                <div className="stat-row">
                  <span className="stat-label">Attack</span>
                  <span className="stat-value">
                    {pokemon.baseStats?.attack ?? "Unknown"}
                  </span>
                </div>

                <div className="stat-row">
                  <span className="stat-label">Defense</span>
                  <span className="stat-value">
                    {pokemon.baseStats?.defense ?? "Unknown"}
                  </span>
                </div>

                <div className="stat-row">
                  <span className="stat-label">Sp. Attack</span>
                  <span className="stat-value">
                    {pokemon.baseStats?.specialattack ?? "Unknown"}
                  </span>
                </div>

                <div className="stat-row">
                  <span className="stat-label">Sp. Defense</span>
                  <span className="stat-value">
                    {pokemon.baseStats?.specialdefense ?? "Unknown"}
                  </span>
                </div>

                <div className="stat-row">
                  <span className="stat-label">Speed</span>
                  <span className="stat-value">
                    {pokemon.baseStats?.speed ?? "Unknown"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="next-pokemon">
          <h2>Next Pokémon</h2>

          {relatedLoading ? (
            <Loading />
          ) : nextPokemon.length === 0 ? (
            <p>No more Pokémon in the Pokédex.</p>
          ) : (
            <div className="pokemon__results">
              {nextPokemon.map((p) => (
                <PokemonCard key={p.num} p={p} />
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default PokemonDetails;
