import styles from './SearchBar.module.css';

import PokeballImg from '../../assets/pokeball.png';

const SearchBar = ({ setItemToSearch, itemToSearch, navigate }) => {
  return (
    <header className={styles.header} >
       <button onClick={() => navigate('/pokemons')} className={styles.pokeballButton}>
         <img src={PokeballImg} alt="Pokeball" className={styles.pokeballImg} />
         Go Back
       </button>   
       
       <input
        className={styles.input}
        type="text"
        placeholder='Search an Item'
        value={itemToSearch}
        onChange={(e) => setItemToSearch(e.target.value)}
       />  
    </header>
  )
}

export default SearchBar
