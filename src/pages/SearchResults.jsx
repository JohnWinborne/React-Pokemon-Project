import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import PokemonCard from "../components/PokemonCard";
import Loading from "../components/Loading";
import { fetchPokemonList } from "../pokemonApi";

const GENERATION_RANGES = {
  1: [1, 151],
  2: [152, 251],
  3: [252, 386],
  4: [387, 493],
  5: [494, 649],
  6: [650, 721],
  7: [722, 809],
  8: [810, 905],
  9: [906, 1025],
};

const RESULTS_PER_PAGE = 6;

function dedupeByDexNumber(list) {
  const seen = new Set();

  return list.filter((p) => {
    const n = Number(p.num);
    if (!Number.isFinite(n)) return false;
    if (seen.has(n)) return false;
    seen.add(n);
    return true;
  });
}

function filterByGeneration(list, minGen, maxGen) {
  const minRange = GENERATION_RANGES[minGen];
  const maxRange = GENERATION_RANGES[maxGen];
  if (!minRange || !maxRange) return list;

  const dexMin = minRange[0];
  const dexMax = maxRange[1];

  return list.filter((p) => {
    const n = Number(p.num);
    return Number.isFinite(n) && n >= dexMin && n <= dexMax;
  });
}

export default function SearchResults() {
  const { query = "" } = useParams();
  const decodedQuery = decodeURIComponent(query || "");

  const [allPokemon, setAllPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(RESULTS_PER_PAGE);

  const [typeFilter, setTypeFilter] = useState("");
  const [genMin, setGenMin] = useState(1);
  const [genMax, setGenMax] = useState(9);

  useEffect(() => {
    async function loadPokemon() {
      setLoading(true);
      try {
        const list = await fetchPokemonList();
        const sortedList = [...list].sort(
          (a, b) => Number(a.num) - Number(b.num),
        );
        setAllPokemon(sortedList);
      } catch (error) {
        console.error("Failed to load Pokémon:", error);
        setAllPokemon([]);
      } finally {
        setLoading(false);
      }
    }

    loadPokemon();
  }, []);

  const filteredResults = useMemo(() => {
    let filtered = dedupeByDexNumber(allPokemon);

    const safeMin = Math.min(genMin, genMax);
    const safeMax = Math.max(genMin, genMax);

    filtered = filterByGeneration(filtered, safeMin, safeMax);

    if (typeFilter) {
      filtered = filtered.filter((p) =>
        (p.types || []).some((t) => t.name === typeFilter),
      );
    }

    const searchText = decodedQuery.trim().toLowerCase();

    if (searchText) {
      filtered = filtered.filter((p) =>
        (p.species || "").toLowerCase().includes(searchText),
      );
    }

    filtered.sort((a, b) => Number(a.num) - Number(b.num));
    return filtered;
  }, [allPokemon, decodedQuery, typeFilter, genMin, genMax]);

  useEffect(() => {
    setVisibleCount(RESULTS_PER_PAGE);
  }, [decodedQuery, typeFilter, genMin, genMax]);

  const visibleResults = filteredResults.slice(0, visibleCount);
  const canLoadMore = visibleCount < filteredResults.length;

  function handleLoadMore() {
    setVisibleCount((prev) => prev + RESULTS_PER_PAGE);
  }

  return (
    <>
      <section className="pokemon">
        <div className="container pokemon__content">
          <h1>Browse Pokémon</h1>
          <SearchBar initialQuery={decodedQuery} />
        </div>
      </section>

      <main className="container main__content">
        <Filters
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          genMin={genMin}
          setGenMin={(value) => {
            const newMin = Number(value);
            setGenMin(newMin);
            if (newMin > genMax) setGenMax(newMin);
          }}
          genMax={genMax}
          setGenMax={(value) => {
            const newMax = Number(value);
            setGenMax(newMax);
            if (newMax < genMin) setGenMin(newMax);
          }}
        />

        <section id="results">
          {loading ? (
            <Loading />
          ) : filteredResults.length === 0 ? (
            <p>No Pokémon found.</p>
          ) : (
            <>
              <div className="pokemon__results">
                {visibleResults.map((p) => (
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
            </>
          )}
        </section>
      </main>
    </>
  );
}
