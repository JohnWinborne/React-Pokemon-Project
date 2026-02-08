import React, { useState } from 'react';

function PokemonCard({ p }) {
  const types = (p.types || []).map((t) => t.name).join(", ") || "Unknown";
  const bst = p.baseStatsTotal ?? "Unknown";
  const ability = p.abilities?.first?.name ?? "Unknown";

  return (
    <div className="pokemon__info">
      <h3 className="pokemon__name">{p.species}</h3>
      <p className="pokemon__number">#{p.num}</p>

      <img
        src={p.sprite}
        alt={p.species}
        className="pokemon__sprite"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = "/assets/pokemon-404.svg";
        }}
      />

      <ul className="pokemon__meta">
        <li><span className="meta__label">Type:</span> {types}</li>
        <li><span className="meta__label">Base Stat Total:</span> {bst}</li>
        <li><span className="meta__label">Primary Ability:</span> {ability}</li>
      </ul>
    </div>
  );
}


export default PokemonCard