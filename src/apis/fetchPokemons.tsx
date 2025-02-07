import { FormatName } from "../utils/utils";

// Definimos la interfaz del Pokémon recibido de la API
interface PokemonData {
    name: string;
    national_number: string;
}

// Interfaz para los Pokémon procesados
interface PokemonDetails {
    name: string;
    id: string;
    imgSrc: string;
}

export const fetchPokemons = async (): Promise<PokemonDetails[]> => {
    const response = await fetch("https://unpkg.com/pokemons@1.1.0/pokemons.json");

    if (!response.ok) {
        throw new Error("Failed to fetch Pokemons");
    }

    const results = await response.json();

    if (!results.results || !Array.isArray(results.results)) {
        throw new Error("Invalid Pokemon data format");
    }

    const seenIds = new Set<string>();

    const validateImage = (url: string): Promise<boolean> => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = url;
            img.onload = () => resolve(true); // Imagen existe
            img.onerror = () => resolve(false); // Imagen no existe
        });
    };

    const pokemons: PokemonDetails[] = (
        await Promise.all(
            results.results
                .filter((pokemon: PokemonData) => {
                    if (seenIds.has(pokemon.national_number)) return false; // Evitar duplicados
                    seenIds.add(pokemon.national_number);
                    return true;
                })
                .map(async (pokemon: PokemonData) => {
                    const formattedName = FormatName(pokemon.name.toLowerCase());
                    const imgSrc = `https://img.pokemondb.net/sprites/black-white/anim/normal/${formattedName}.gif`;

                    const imgExists = await validateImage(imgSrc);

                    return imgExists
                        ? { name: pokemon.name, id: pokemon.national_number, imgSrc }
                        : null;
                })
        )
    ).filter((pokemon): pokemon is PokemonDetails => pokemon !== null); // Filtrar valores nulos

    return pokemons;
};
