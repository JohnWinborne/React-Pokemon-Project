import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar({ initialQuery = "" }) {
  const [query, setQuery] = useState(initialQuery);
  const navigate = useNavigate();

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  function handleSubmit(e) {
    e.preventDefault();

    const trimmed = query.trim();

    if (!trimmed) {
      navigate("/pokemon");
      return;
    }

    navigate(`/pokemon/search/${encodeURIComponent(trimmed)}`);
  }

  return (
    <form className="search__bar" onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Pokémon"
      />
    </form>
  );
}

export default SearchBar;
