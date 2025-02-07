import { FormatName } from '../utils/utils';

export const fetchPokemons = async () => {
    const response = await fetch("https://unpkg.com/pokemons@1.1.0/pokemons.json");

    if (!response.ok) {
        throw new Error('Failed to fetch Pokemons');
    }

    const results = await response.json();
    const seenIds = new Set();

    const validateImage = (url: string) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = url;
            img.onload = () => resolve(true);  // Imagen existe
            img.onerror = () => resolve(false); // Imagen no existe
        });
    };

    const pokemons = results.results
        .filter((pokemon: any) => {
            if (seenIds.has(pokemon.national_number)) return false; // Evitar duplicados
            seenIds.add(pokemon.national_number);
            return true;
        })
        .map(async (pokemon: any) => {
            const formattedName = FormatName(pokemon.name.toLowerCase());
            const imgSrc = `https://img.pokemondb.net/sprites/black-white/anim/normal/${formattedName}.gif`;

            const imgExists = await validateImage(imgSrc);

            return imgExists
                ? { name: pokemon.name, id: pokemon.national_number, imgSrc }
                : null;
        });

    const resolvedPokemons = await Promise.all(pokemons);

    return resolvedPokemons.filter(pokemon => pokemon !== null);
};
