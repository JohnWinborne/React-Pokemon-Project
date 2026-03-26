import axios from "axios";

const ENDPOINT = "https://graphqlpokemon.favware.tech/v8";
const MAX_MAIN_DEX = 1025;
const BATCH_SIZE = 200;

export async function fetchPokemonList() {
  const allPokemon = [];
  const seenNums = new Set();
  let offset = 0;

  while (seenNums.size < MAX_MAIN_DEX) {
    const query = `
      query GetPokemonBatch($take: Int!, $offset: Int!) {
        getAllPokemon(take: $take, offset: $offset) {
          species
          num
          sprite
          types { name }
          abilities {
            first { name }
            second { name }
            hidden { name }
          }
          baseStats {
            hp
            attack
            defense
            specialattack
            specialdefense
            speed
          }
        }
      }
    `;

    const res = await axios.post(ENDPOINT, {
      query,
      variables: {
        take: BATCH_SIZE,
        offset,
      },
    });

    if (res.data.errors) {
      throw new Error(res.data.errors.map((e) => e.message).join("\n"));
    }

    const batch = res.data.data.getAllPokemon || [];
    if (batch.length === 0) break;

    for (const p of batch) {
      const n = Number(p.num);

      if (!Number.isFinite(n)) continue;
      if (n < 1 || n > MAX_MAIN_DEX) continue;

      if (!seenNums.has(n)) {
        seenNums.add(n);
        allPokemon.push(p);
      }
    }

    offset += BATCH_SIZE;
  }

  allPokemon.sort((a, b) => Number(a.num) - Number(b.num));
  return allPokemon;
}

export async function fetchPokemonDetailsByDexNumber(id) {
  const query = `
    query PokemonByDex($num: Int!) {
      getPokemonByDexNumber(number: $num) {
        species
        num
        sprite
        types { name }
        height
        weight
        abilities {
          first { name }
          second { name }
          hidden { name }
        }
        baseStats {
          hp
          attack
          defense
          specialattack
          specialdefense
          speed
        }
      }
    }
  `;

  const res = await axios.post(ENDPOINT, {
    query,
    variables: { num: Number(id) },
  });

  if (res.data.errors) {
    throw new Error(res.data.errors.map((e) => e.message).join("\n"));
  }

  return res.data.data.getPokemonByDexNumber;
}
