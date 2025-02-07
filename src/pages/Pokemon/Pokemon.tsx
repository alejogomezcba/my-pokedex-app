import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';

import PokeballImg from '../../assets/pokeball.png'
import Footer from '../../components/Footer';

import styles from './Pokemon.module.css';

import { FetchPokemon } from '../../apis/fetchPokemon';

import LoadingComponent from '../../components/LoadingComponent';

const Pokemon = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState<PokemonDetails>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const getPokemon = async () => {
    setIsLoading(true);
     setTimeout(() => {
       setIsLoading(false);
     }, 4000);
    const fetchedPokemon = await FetchPokemon(name as string);
    setPokemon(fetchedPokemon);
  }
  
  useEffect(() => {
    getPokemon();
  }, [name]);

  if (!pokemon || isLoading) {
    return <LoadingComponent/>
  }
  
  return (
    <>
        {pokemon && <>
          <button onClick={() => navigate(-1)} className={styles.pokeballButton}>
          <img src={PokeballImg} alt="Pokeball" className={styles.pokeballImg}/>
          Go Back
        </button>
        <div>
          <main >
            <div className={styles.pokemonInfo}>
              <p className={styles.pokemonTitle}>{name?.toUpperCase()}</p>
              <p>Nr. {pokemon.id}</p>
              <img src={pokemon.imgSrc} alt={name} className={styles.pokemonInfoImg}/>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <p>HP: <span>{pokemon.hp}</span></p>
                <p>Attack: <span>{pokemon.attack}</span></p>
                <p>Defence: <span>{pokemon.defense}</span></p>
              </div>
            </div>
          </main>
        </div></>}

        <Footer/>
    </>
  )
}

export default Pokemon
