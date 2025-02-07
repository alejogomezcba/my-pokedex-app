export const fetchPokemonItems = async (setLoading: (loading: boolean) => void): Promise<
  { id: number; type: string; description: string; name: string; imgSrc: string }[]
> => {
  const url = "https://raw.githubusercontent.com/Purukitto/pokemon-data.json/master/items.json";
  setLoading(true);
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error al obtener los datos");

    const items = await response.json();
    
    if (!Array.isArray(items)) throw new Error("Los datos obtenidos no son un array");

    return items.map((item: { id: number; type: string; description: string; name: { english: string } }) => ({
      id: item.id,
      type: item.type,
      description: item.description,
      name: item.name?.english || "Unknown", // Evita errores si la propiedad no existe
      imgSrc: `https://raw.githubusercontent.com/Purukitto/pokemon-data.json/master/images/items/sprites/${item.id}.png`,
    }));
  } catch (error) {
    console.error("Error:", error);
    return [];
  } finally {
    setLoading(false);
  }
};