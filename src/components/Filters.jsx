import React, { useState } from "react";

function Filters() {
  return (
    <section className="results__header">
      <h2>Search results:</h2>

      <div className="filters">
        <div className="filter__group">
          <label htmlFor="type__filter">Type:</label>
          <select id="type__filter" name="type" defaultValue="">
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
            <span id="generation__range--label">1 to 9</span>
          </div>

          <div className="generation__sliders">
            <div>
              <input
                className="gen__min"
                type="range"
                min="1"
                max="9"
                defaultValue="1"
              />
              <p>min</p>
            </div>
            <div>
              <input
                className="gen__max"
                type="range"
                min="1"
                max="9"
                defaultValue="9"
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
