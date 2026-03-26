
function SearchBar({ query, setQuery }) {
  console.log("props:", query, typeof setQuery);
  return (
    <section className="pokemon">
      <div className="container pokemon__content">
        <h1>Browse Pokémon</h1>
        <form id="search__form" className="search__bar">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Pokémon"
          />
        </form>
      </div>
    </section>
  );
}

export default SearchBar;
