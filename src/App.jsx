import "./style.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import PokemonDetails from "./pages/PokemonDetails";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon" element={<SearchResults />} />
        <Route path="/pokemon/search/:query" element={<SearchResults />} />
        <Route path="/pokemon/:id" element={<PokemonDetails />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
