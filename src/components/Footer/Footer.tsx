import { Link, useNavigate } from 'react-router-dom';

import pokemonImage from '../../assets/pikachu.png';
import itemsImage from '../../assets/pokeball.png';
import locationImage from '../../assets/pointer.png';

import styles from './footer.module.css';

const Footer = () => {
  const navigation = useNavigate();
  return (
    <footer className={styles.footer}>
      <Link 
        onClick={() => navigation('pokemons')}
        to="/pokemons"
        className={styles.footerLink}
      >
        <img src={pokemonImage} alt="Pokeball" className={styles.footerIcon}/>
        Pokemons
      </Link>
      <Link 
      onClick={() => navigation('items')}
      to="/items" className={styles.footerLink}>
        <img src={itemsImage} alt="Pokeball" className={styles.footerIcon}/>
        Items
      </Link>
      <Link 
        onClick={() => navigation('maps')}
        to="/maps"
        className={styles.footerLink}
      >
          <img src={locationImage} alt="Pokeball" className={styles.footerIcon}/>
          Map
      </Link>
    </footer>
  )
}

export default Footer
