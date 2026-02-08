import React, { useState } from "react";

function SearchBar() {
  return (
    <section className="pokemon">
      <div className="container pokemon__content">
        <h1>Browse Pokémon</h1>
        <form id="search__form" className="search__bar">
          <input id="search__input" type="text" placeholder="Search by name" />
        </form>
      </div>
    </section>
  );
}

export default SearchBar;
