//https://pokeapi.co/api/v2/pokemon/bulbasaur

// https://pokeapi.co/api/v2/pokemon/bulbasaur

import { PokemonDetails } from "../types/types";
import { FormatName } from "../utils/utils";

export const FetchPokemon = async (
  pokemonName: string
): Promise<PokemonDetails>  => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${FormatName(pokemonName)}`
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const result = await response.json();

  const pokemon = {
    name: result.name,
    id: result.id,
    imgSrc: result.sprites.front_default,
    hp: result.stats[0]?.base_stat,
    attack: result.stats[1]?.base_stat,
    defense: result.stats[2]?.base_stat,
  };

  return pokemon;
}
