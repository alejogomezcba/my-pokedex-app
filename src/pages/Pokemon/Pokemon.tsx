import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import PokeballImg from "../../assets/pokeball.png";
import Footer from "../../components/Footer";

import styles from "./Pokemon.module.css";

import { FetchPokemon } from "../../apis/fetchPokemon";

import LoadingComponent from "../../components/LoadingComponent";
import PokemonNotfound from "../../components/PokemonNotfound";

import { FormatName } from "../../utils/utils";
import { PokemonDetails } from "../../types/types";

const Pokemon = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const formattedName = name && FormatName(name.toLowerCase());
  const imgSrc = `https://img.pokemondb.net/sprites/black-white/anim/normal/${formattedName}.gif`;

  useEffect(() => {
    if (!name) {
      throw new Error("Pokemon name is undefined");
    }

    const fetchData = async () => {
      setIsLoading(true);
      const fetchedPokemon = await FetchPokemon(name, setIsLoading);
      setPokemon(fetchedPokemon);
    };
    fetchData();
  }, [name]);

  if (isLoading) return <LoadingComponent />;
  if (!pokemon) return <PokemonNotfound />;


  return (
    <>
      <button onClick={() => navigate(-1)} className={styles.pokeballButton}>
        <img src={PokeballImg} alt="Pokeball" className={styles.pokeballImg} />
        Go Back
      </button>
      <main className={styles.cardContainer}>
        <div className={styles.pokemonCard}>
          <h3 className={styles.pokemonTitle}>{pokemon.name}</h3>
          <p className={styles.pokemonOrder}># {pokemon.id}</p>
          <div className={styles.imgContainer}>
            <img src={imgSrc} alt={pokemon.name} className={styles.pokemonInfoImg} />
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
      <Footer />
    </>
  );
};

export default Pokemon;
