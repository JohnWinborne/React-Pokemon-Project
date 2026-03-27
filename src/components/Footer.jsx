function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer__content">
        <p>© {new Date().getFullYear()} Pokémon App</p>
        <p>Built by John Winborne</p>
        <p>
          <a href="https://github.com/JohnWinborne" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;