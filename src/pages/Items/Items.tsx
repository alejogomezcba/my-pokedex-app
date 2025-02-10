import { useEffect, useState } from "react";
import { fetchPokemonItems } from "../../apis/fetchPokemonItems";
import styles from "./Items.module.css";

import Footer from "../../components/Footer";
import LoadingComponent from "../../components/LoadingComponent";
import SearchBar from "../../components/SearchBar";
import { useNavigate } from "react-router-dom";

// Definición de la interfaz para los items
interface PokemonItem {
  id: number;
  type: string;
  description: string;
  name: string;
  imgSrc: string;
}

const Items = () => {
  const [items, setItems] = useState<PokemonItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showToTop, setShowToTop] = useState<boolean>(false);
  const [itemToSearch, setItemToSearch] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const getItems = async () => {
      setLoading(true);
      try {
        const fetchedItems = await fetchPokemonItems();
        setItems(fetchedItems);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };
    getItems();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Función para filtrar los items
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(itemToSearch.toLowerCase())
  );

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <div className={styles.mainItems}>
      <SearchBar
        itemToSearch={itemToSearch}
        setItemToSearch={setItemToSearch}
        navigate={navigate}
      />

      <div className={styles.mainContainer}>
        <h2 className={styles.sectionTitle}>Lista de Items</h2>
        <div className={styles.itemsContainer}>
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div key={item.id} className={styles.itemContainer}>
                <img
                  src={item.imgSrc}
                  alt={item.name}
                  className={styles.itemImg}
                />
                <h3 className={styles.itemName}>{item.name}</h3>
                <p className={styles.itemDescription}>{item.description}</p>
              </div>
            ))
          ) : (
            <p>No se encontraron ítems.</p>
          )}
        </div>
      </div>

      {showToTop && (
        <button
          className={styles.toTopButton}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          ↑ To Top
        </button>
      )}

      <Footer />
    </div>
  );
};

export default Items;
