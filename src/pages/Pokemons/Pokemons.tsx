import { useState, useEffect } from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PokemonItem from '../../components/PokemonItem';
import LoadingComponent from '../../components/LoadingComponent';

import styles from './pokemons.module.css';

import { fetchPokemons } from '../../apis/fetchPokemons';

// Definir el tipo de Pokemon
interface Pokemon {
  id: number;
  name: string;
  imgSrc: string;
}

const Pokemons = () => {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  const fetchAllPokemons = async () => {
    setLoading(true);
    try {
      const allPokemons: Pokemon[] = await fetchPokemons();
      setPokemons(allPokemons);
    } catch (error) {
      console.error('Error fetching Pokemons:', error);
    } finally {
      setTimeout(() => setLoading(false), 4000);
    }
  };

  useEffect(() => {
    fetchAllPokemons();
  }, []);

  if (loading) {
    return <LoadingComponent />;
  }

  console.log('pokemons', pokemons);

  const filteredPokemons = pokemons.filter(
    (pokemon) =>
      pokemon?.imgSrc && pokemon?.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <Header query={query} setQuery={setQuery} />
      <main>
        <nav className={styles.nav}>
          {filteredPokemons.map((e) => (
            <PokemonItem name={e.name} imgSrc={e.imgSrc} order={e.id} key={e.id || e.name} />
          ))}
        </nav>
      </main>
      <Footer />
    </>
  );
};

export default Pokemons;