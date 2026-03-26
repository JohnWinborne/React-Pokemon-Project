import { useEffect, useMemo, useState } from "react";
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

// Keep one pokemon per dex number (removes mega/gmax/forms)
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

// Filter list to only pokemon whose dex number falls inside gen min/max
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

export default function SearchResults({ query, typeFilter, genMin, genMax }) {
  const [allPokemon, setAllPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(RESULTS_PER_PAGE);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const list = await fetchPokemonList();
        list.sort((a, b) => Number(a.num) - Number(b.num));
        setAllPokemon(list);
      } catch (e) {
        console.error(e);
        setAllPokemon([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filteredResults = useMemo(() => {
    let filtered = dedupeByDexNumber(allPokemon);

    const safeMin = Math.min(Number(genMin), Number(genMax));
    const safeMax = Math.max(Number(genMin), Number(genMax));

    filtered = filterByGeneration(filtered, safeMin, safeMax);

    if (typeFilter) {
      filtered = filtered.filter((p) =>
        (p.types || []).some((t) => t.name === typeFilter),
      );
    }

    const search = (query || "").trim().toLowerCase();
    if (search) {
      filtered = filtered.filter((p) =>
        (p.species || "").toLowerCase().includes(search),
      );
    }

    filtered.sort((a, b) => Number(a.num) - Number(b.num));
    return filtered;
  }, [allPokemon, query, typeFilter, genMin, genMax]);

  useEffect(() => {
    setVisibleCount(RESULTS_PER_PAGE);
  }, [query, typeFilter, genMin, genMax]);

  const visibleResults = filteredResults.slice(0, visibleCount);
  const canLoadMore = visibleCount < filteredResults.length;

  function handleLoadMore() {
    setVisibleCount((prev) => prev + RESULTS_PER_PAGE);
  }

  return (
    <section id="results">
      {loading ? (
        <Loading />
      ) : filteredResults.length === 0 ? (
        <p>No results.</p>
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
  );
}
