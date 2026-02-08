import React, { useState } from "react";
import PokemonCard from "./PokemonCard";
// temp set up
function PokemonGrid() {
  const placeholder = Array.from({ length: 6 }, (_, i) => ({
    species: `Pokemon ${i + 1}`,
    num: i + 1,
    sprite: "/assets/pokemon-404.svg",
    types: [{ name: "Normal" }],
    baseStatsTotal: 300,
    abilities: { first: { name: "Overgrow" } },
  }));
  const loading = true; 

  return (
    <section id="results">
      <div className={`pokemon__results ${loading ? "pokemon__loading" : ""}`}>
        <i className="fas fa-spinner pokemon__loading--spinner"></i>

        {!loading && placeholder.map((p) => <PokemonCard key={p.num} p={p} />)}
      </div>
    </section>
  );
}

export default PokemonGrid;
