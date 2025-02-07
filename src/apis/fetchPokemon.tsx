import { PokemonDetails } from "../types/types";
import { FormatName } from "../utils/utils";

export const FetchPokemon = async (
    pokemonName: string,
    setIsLoading: (loading: boolean) => void
  ): Promise<PokemonDetails | null> => {
    setIsLoading(true);
    try {
        const formattedName = FormatName(pokemonName);
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${formattedName}`);

        if (!response.ok) {
            console.error(`Error fetching ${formattedName}: ${response.status} - ${response.statusText}`);
            return null; // Retorna null en lugar de lanzar un error
        }

        const result = await response.json();

        console.log('datos-pokemon', result);
        
        return {
          name: result.name,
          id: result.id,
          imgSrc: result.sprites?.front_default || "", // Evita errores si la imagen no existe
          stats: Array.isArray(result.stats) ? result.stats.reduce((acc: Record<string, number>, statObj: { stat: { name: string }; base_stat: number }) => {
              acc[statObj.stat.name] = statObj.base_stat;
              return acc;
          }, {}) : {} // Verifica que stats es un array
      };
      
    } catch (error) {
        console.error("Network or parsing error:", error);
        return null; // Retorna null si la solicitud falla
    } finally {
      setIsLoading(false);
    }
};
