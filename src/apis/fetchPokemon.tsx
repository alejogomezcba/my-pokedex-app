import { PokemonDetails } from "../types/types";
import { FormatName } from "../utils/utils";

// Estructura esperada de la respuesta de la API
interface PokemonListResponse {
  results: { name: string; url: string }[];
}

let pokemonMap: Record<string, number> | null = null;

// Función para cargar los datos de Pokémon si aún no están en memoria
const getPokemonMap = async (): Promise<Record<string, number>> => {
  if (pokemonMap) return pokemonMap; // Si ya tenemos los datos, los usamos

  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1400");
    if (!response.ok) throw new Error(`Failed to fetch Pokémon list: ${response.statusText}`);

    const data: PokemonListResponse = await response.json();
    if (!Array.isArray(data.results)) throw new Error("Invalid response format");

    // Mapear nombres de Pokémon a sus IDs extraídos de la URL
    pokemonMap = data.results.reduce((acc, pokemon) => {
      const idMatch = pokemon.url.match(/\/(\d+)\/$/);
      if (idMatch) acc[pokemon.name] = parseInt(idMatch[1], 10);
      return acc;
    }, {} as Record<string, number>);

  } catch (error) {
    console.error("Error fetching all Pokémon:", error);
    pokemonMap = {}; // Evita futuros intentos en caso de error
  }

  return pokemonMap;
};

// Función principal para obtener los detalles de un Pokémon
export const FetchPokemon = async (
  pokemonName: string,
  setIsLoading: (loading: boolean) => void
): Promise<PokemonDetails | null> => {
  setIsLoading(true);

  try {
    const formattedName = FormatName(pokemonName);
    const map = await getPokemonMap(); // Obtiene el mapa con los IDs

    if (!map[formattedName]) {
      console.error(`Pokémon ${formattedName} not found in the list.`);
      return null;
    }

    const pokemonId = map[formattedName];
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);

    if (!response.ok) {
      console.error(`Error fetching ${formattedName}: ${response.status} - ${response.statusText}`);
      return null;
    }

    const result = await response.json();

    return {
      name: result.name,
      id: result.id,
      imgSrc: result.sprites?.front_default || "", // Evita errores si no hay imagen
      stats: result.stats?.reduce(
        (acc: Record<string, number>, statObj: { stat: { name: string }; base_stat: number }) => {
          acc[statObj.stat.name] = statObj.base_stat;
          return acc;
        },
        {}
      ) || {}
    };
  } catch (error) {
    console.error("Network or parsing error:", error);
    return null;
  } finally {
    setIsLoading(false);
  }
};
