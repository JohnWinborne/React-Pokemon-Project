import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen((prev) => !prev);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header id="home" className="site-header">
      <div className="container header-inner">
        <div>
          <span className="logo__text">Pokémon</span>
        </div>

        <button
          className="nav-toggle"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`main__nav ${menuOpen ? "main__nav--open" : ""}`}>
          <Link to="/" className="btn" onClick={closeMenu}>
            Home
          </Link>
          <Link to="/pokemon" className="btn" onClick={closeMenu}>
            Pokemon
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;