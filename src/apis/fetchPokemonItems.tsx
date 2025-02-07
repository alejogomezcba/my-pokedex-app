export const fetchPokemonItems = async (setLoading: (loading: boolean) => void): Promise<
  { id: number; type: string; description: string; name: string; imgSrc: string }[]
> => {
  const url = "https://raw.githubusercontent.com/Purukitto/pokemon-data.json/master/items.json";
  setLoading(true)
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error al obtener los datos");

    const items = await response.json();

    return items.map((item: any) => ({
      id: item.id,
      type: item.type,
      description: item.description,
      name: item.name.english,
      imgSrc: `https://raw.githubusercontent.com/Purukitto/pokemon-data.json/master/images/items/sprites/${item.id}.png`,
    }));
  } catch (error) {
    console.error("Error:", error);
    return [];
  } finally {
    setLoading(false)
  }
};
