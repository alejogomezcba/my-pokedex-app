import { useEffect, useState } from "react";
import { fetchPokemonItems } from "../../apis/fetchPokemonItems"; // Asegúrate de importar la función correctamente
import PokeballImg from '../../assets/pokeball.png';

import styles from './Items.module.css';

import Footer from "../../components/Footer";
import LoadingComponent from "../../components/LoadingComponent";
import { useNavigate } from "react-router-dom";

const Items = () => {
  const [items, setItems] = useState<
    { id: number; type: string; description: string; name: string; imgSrc: string }[]
  >([]);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getItems = async () => {
      const fetchedItems = await fetchPokemonItems(setLoading);
      setItems(fetchedItems);
    };
    getItems();
  }, []);

  if ( loading) {
    return <LoadingComponent/>
  }

  return (
    <div className={styles.mainItems}>
      <button onClick={() => navigate('/pokemons')} className={styles.pokeballButton}>
        <img src={PokeballImg} alt="Pokeball" className={styles.pokeballImg} />
        Go Back
      </button>    
      <div className={styles.mainContainer}>
        <h2 className={styles.sectionTitle}>Lista de Items</h2>
        <div className={styles.itemsContainer}>
          {items.length > 0 ? (
            items.map((item) => (
              <div
                key={item.id}
                className={styles.itemContainer}
              >
                <img src={item.imgSrc} alt={item.name} className={styles.itemImg} />
                <h3 className={styles.itemName} >{item.name}</h3>
                <p className={styles.itemDescription} >{item.description}</p>
              </div>
            ))
          ) : (
            <p>Cargando items...</p>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Items;
