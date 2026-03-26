import { Link } from "react-router-dom";

function Header() {
  return (
    <header id="home" className="site-header">
      <div className="container header-inner">
        <div>
          <span className="logo__text">Pokémon</span>
        </div>

        <nav className="main__nav">
          <Link to="/" className="btn">
            Home
          </Link>
          <Link to="/pokemon" className="btn">
            Pokemon
          </Link>
          <a href="#contact" className="btn">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
