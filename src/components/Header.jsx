
function Header() {
    return (
        <header id="home" className="site-header">
      <div className="container header-inner">
        <div>
          <span className="logo__text">Pokémon</span>
        </div>
        <nav className="main__nav">
          <a href="#home" className="btn">Home</a>
          <a href="#contact" className="btn">Contact</a>
        </nav>
      </div>
    </header>
    )
}

export default Header