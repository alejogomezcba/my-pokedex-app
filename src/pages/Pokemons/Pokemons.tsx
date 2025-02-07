import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PokemonItem from '../../components/PokemonItem';
import LoadingComponent from '../../components/LoadingComponent';

import BulbasaurPic from '../../assets/bulbasaur.gif';

import styles from './pokemons.module.css';

import { fetchPokemons } from '../../apis/fetchPokemons'

const Pokemons = () => {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [pokemons, setPokemons] = useState([]);

  const fetchAllPokemons = async () => {
    setLoading(true);
    const allPokemons = await fetchPokemons();
    setPokemons(allPokemons)
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }

  useEffect(() => {
    fetchAllPokemons()
  }, [])
  
  if ( loading) {
    return <LoadingComponent/>
  }

  console.log('pokemons', pokemons);
  

  const filteredPokemons = pokemons?.filter( pokemon => pokemon.imgSrc && pokemon.name.toLowerCase().match(query.toLowerCase()) )
 
  return (
    <>
     <Header query={query} setQuery={setQuery}/>
      <main>
        <nav className={styles.nav}>
            {filteredPokemons?.map( e => <PokemonItem name={e.name} imgSrc={e.imgSrc} order={e.id} key={e.id} />)}
        </nav>
      </main>
      <Footer/>
    </>
  )
}

export default Pokemons
