import axios from "axios";

const ENDPOINT = "https://graphqlpokemon.favware.tech/v8";

export async function fetchPokemonList() {
  const query = `
    query {
      getAllPokemon(take: 200, offset: 0) {
        species
        num
        sprite
        types { name }
      }
    }
  `;

  const res = await axios.post(ENDPOINT, { query });

  if (res.data.errors) {
    throw new Error(res.data.errors.map(e => e.message).join("\n"));
  }

  return res.data.data.getAllPokemon;
}

export async function fetchPokemonDetails(name) {
  const query = `
    query Pokemon($pokemon: Pokemon!) {
      getPokemon(pokemon: $pokemon) {
        species
        num
        sprite
        types { name }
        height
        weight
        abilities { first { name } second { name } hidden { name } }
        baseStats {
          hp attack defense
          specialattack specialdefense speed
        }
      }
    }
  `;

  const res = await axios.post(ENDPOINT, {
    query,
    variables: { pokemon: name },
  });

  if (res.data.errors) {
    throw new Error(res.data.errors.map(e => e.message).join("\n"));
  }

  return res.data.data.getPokemon;
}
