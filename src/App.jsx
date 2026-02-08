import "./style.css";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import PokemonGrid from "./components/PokemonGrid";

function App() {
  return (
    <div className="App">
      <Header />
      <SearchBar />
      <main className="container main__content">
        <Filters />
        <PokemonGrid />
      </main>
    </div>
  );
}

export default App;
