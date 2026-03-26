import "./style.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import PokemonDetails from "./pages/PokemonDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search/:query" element={<SearchResults />} />
      <Route path="/pokemon/:name" element={<PokemonDetails />} />
    </Routes>
  );
}

export default App;
