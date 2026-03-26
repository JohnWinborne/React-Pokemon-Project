function Filters({
  typeFilter,
  setTypeFilter,
  genMin,
  setGenMin,
  genMax,
  setGenMax,
}) {
  function onMinChange(v) {
    const next = Number(v);
    setGenMin(next);
    if (next > genMax) setGenMax(next); // clamp
  }

  function onMaxChange(v) {
    const next = Number(v);
    setGenMax(next);
    if (next < genMin) setGenMin(next); // clamp
  }

  return (
    <section className="results__header">
      <h2>Search results:</h2>

      <div className="filters">
        <div className="filter__group">
          <label htmlFor="type__filter">Type:</label>
          <select
            id="type__filter"
            name="type"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">All types</option>
            <option value="Normal">Normal</option>
            <option value="Fire">Fire</option>
            <option value="Water">Water</option>
            <option value="Grass">Grass</option>
            <option value="Electric">Electric</option>
            <option value="Ice">Ice</option>
            <option value="Fighting">Fighting</option>
            <option value="Poison">Poison</option>
            <option value="Ground">Ground</option>
            <option value="Flying">Flying</option>
            <option value="Psychic">Psychic</option>
            <option value="Bug">Bug</option>
            <option value="Rock">Rock</option>
            <option value="Ghost">Ghost</option>
            <option value="Dragon">Dragon</option>
            <option value="Dark">Dark</option>
            <option value="Steel">Steel</option>
            <option value="Fairy">Fairy</option>
          </select>
        </div>

        <div className="filter__group">
          <div className="filter__label--row">
            <span>Generation range:</span>
            <span id="generation__range--label">
              {genMin} to {genMax}
            </span>
          </div>

          <div className="generation__sliders">
            <div>
              <input
                className="gen__min"
                type="range"
                min="1"
                max="9"
                value={genMin}
                onChange={(e) => onMinChange(e.target.value)}
              />
              <p>min</p>
            </div>

            <div>
              <input
                className="gen__max"
                type="range"
                min="1"
                max="9"
                value={genMax}
                onChange={(e) => onMaxChange(e.target.value)}
              />
              <p>max</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Filters;
