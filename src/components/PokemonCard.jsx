import { useNavigate } from "react-router-dom";

function PokemonCard({ p }) {
  const navigate = useNavigate();

  const bst = p.baseStats
    ? Object.values(p.baseStats).reduce((sum, v) => sum + Number(v || 0), 0)
    : "Unknown";

  const primaryAbility =
    p.abilities?.first?.name ||
    p.abilities?.second?.name ||
    p.abilities?.hidden?.name ||
    "Unknown";

  function handleClick() {
    navigate(`/pokemon/${p.num}`);
  }

  return (
    <div className="pokemon__card">
      <div className="pokemon__info" onClick={handleClick}>
        <h3 className="pokemon__name">
          {p.species.charAt(0).toUpperCase() + p.species.slice(1)}
        </h3>
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
          <li className="pokemon__type--container">
            <span className="meta__label">Type:</span>
            <div className="pokemon__card-types">
              {(p.types || []).map((t) => (
                <span
                  key={t.name}
                  className={`type-badge type-${t.name.toLowerCase()}`}
                >
                  {t.name}
                </span>
              ))}
            </div>
          </li>

          <li>
            <span className="meta__label">Base Stat Total:</span> {bst}
          </li>

          <li>
            <span className="meta__label">Primary Ability:</span>{" "}
            {primaryAbility}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default PokemonCard;
