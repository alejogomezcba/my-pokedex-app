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
  const [showToTop, setShowToTop] = useState(false); // Estado para el botón "To Top"

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

  useEffect(() => {
    const handleScroll = () => {
      setShowToTop(window.scrollY > 300); // Mostrar el botón si se baja más de 300px
    };

    console.log('entramos por aca');
    

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return <LoadingComponent />;
  }

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

      {showToTop && (
        <button
          className={styles.toTopButton}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          ↑ To Top
        </button>
      )}

      <Footer />
    </>
  );
};

export default Pokemons;
