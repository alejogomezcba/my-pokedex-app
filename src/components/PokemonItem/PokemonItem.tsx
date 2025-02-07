import { Link } from "react-router-dom";

import styles from './PokemonItem.module.css'

const PokemonItem = ({ name, imgSrc, order }) => {
  return (
    <Link to={`/pokemons/${name.toLowerCase()}`} className={styles.pokemonItem}> 
            <img src={imgSrc} alt={name} className={styles.pokemonItemIcon}/>
            <div className={styles.pokemonItemText}>
              <span >{name}</span>
              <span>{order}</span>
            </div>
    </Link>
  )
}

export default PokemonItem
