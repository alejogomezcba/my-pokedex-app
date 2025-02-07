import PokemonNotfoundImg from "../../assets/error404.png"
import notFoundImg from "../../assets/noDataFound.png"

import styles from './PokemonNotfound.module.css';
import Footer from "../Footer";

const PokemonNotfound = () => {
  return (
    <div className={styles.container}>
      <img src={notFoundImg} alt="Pokemon not found" className={styles.notFoundImg}/>
      <img src={PokemonNotfoundImg} alt="Pokemon not found" className={styles.notFoundImg}/>

      <Footer/>
    </div>
  )
}

export default PokemonNotfound
