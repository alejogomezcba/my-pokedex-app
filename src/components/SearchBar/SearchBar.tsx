import styles from './SearchBar.module.css';
import PokeballImg from '../../assets/pokeball.png';

import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  setItemToSearch: (value: string) => void;
  itemToSearch: string;
  navigate: ReturnType<typeof useNavigate>;
}

const SearchBar: FC<SearchBarProps> = ({ setItemToSearch, itemToSearch, navigate }) => {
  return (
    <header className={styles.header}>
      <button onClick={() => navigate('/pokemons')} className={styles.pokeballButton}>
        <img src={PokeballImg} alt="Pokeball" className={styles.pokeballImg} />
        Go Back
      </button>

      <input
        className={styles.input}
        type="text"
        placeholder="Search an Item"
        value={itemToSearch}
        onChange={(e) => setItemToSearch(e.target.value)}
      />
    </header>
  );
};

export default SearchBar;
