import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import PokeballImg from '../../assets/pokeball.png';
import Footer from '../../components/Footer';

import styles from './Pokemon.module.css';

import { FetchPokemon } from '../../apis/fetchPokemon';

import LoadingComponent from '../../components/LoadingComponent';
import PokemonNotfound from '../../components/PokemonNotfound';

import { FormatName } from '../../utils/utils';

const Pokemon = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState<PokemonDetails>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const formattedName = FormatName(name?.toLowerCase());
  const imgSrc = `https://img.pokemondb.net/sprites/black-white/anim/normal/${formattedName}.gif`;

  const getPokemon = async () => {
    const fetchedPokemon = await FetchPokemon(name as string, setIsLoading as any);
    setPokemon(fetchedPokemon);
  };

  useEffect(() => {
    getPokemon();
  }, [name]);

  if (isLoading) return <LoadingComponent />;
  if (!pokemon) return <PokemonNotfound />;

  return (
    <>
      {pokemon && (
        <>
          <button onClick={() => navigate(-1)} className={styles.pokeballButton}>
            <img src={PokeballImg} alt="Pokeball" className={styles.pokeballImg} />
            Go Back
          </button>
          <main className={styles.cardContainer}>
            <div className={styles.pokemonCard}>
              <h3 className={styles.pokemonTitle}>{name}</h3>
              <p className={styles.pokemonOrder}># {pokemon.id}</p>
              <div className={styles.imgContainer}>
                <img src={imgSrc} alt={name} className={styles.pokemonInfoImg} />
              </div>
              <div className={styles.statsContainer}>
                {Object.entries(pokemon.stats).map(([key, value]) => (
                      <div key={key} className={styles.statsText}>
                        <p className={styles.statName}>{key.replace(/([A-Z])/g, " $1")}</p>
                        <p className={styles.statValue}>{value}</p>
                      </div>
                    ))}
              </div>
            </div>
          </main>
        </>
      )}
      <Footer />
    </>
  );
};

export default Pokemon;
