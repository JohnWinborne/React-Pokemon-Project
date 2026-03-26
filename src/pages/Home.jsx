import { useState } from "react";
import SearchBar from "../components/SearchBar";
import SearchResults from "./SearchResults";
import Filters from "../components/Filters";
import Header from "../components/Header";

function Home() {
  const [query, setQuery] = useState("");
  //start at Gen 1
  const [typeFilter, setTypeFilter] = useState("");
  const [genMin, setGenMin] = useState(1);
  const [genMax, setGenMax] = useState(9);
  return (
    <>
      <Header />
      <SearchBar query={query} setQuery={setQuery} />

      <main className="container main__content">
        <Filters
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          genMin={genMin}
          setGenMin={(value) => {
            const newMin = Number(value);
            setGenMin(newMin);
            if (newMin > genMax) {
              setGenMax(newMin);
            }
          }}
          genMax={genMax}
          setGenMax={(value) => {
            const newMax = Number(value);
            setGenMax(newMax);
            if (newMax < genMin) {
              setGenMin(newMax);
            }
          }}
        />

        <SearchResults
          query={query}
          typeFilter={typeFilter}
          genMin={genMin}
          genMax={genMax}
        />
      </main>
    </>
  );
}

export default Home;
