import { useState, useEffect } from 'react';
import styles from './LoadingComponent.module.css';
import Pokedex from "../../assets/pokedex.png";
import PikachuImg from "../../assets/pikachu.gif";

const LoadingComponent = () => {
  const [text, setText] = useState("");
  const fullText = "Loading...";
  const typingSpeed = 150;

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) index = 0;
    }, typingSpeed);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.loadingMainContainer}>
      <div className={styles.loadingContent}>
        <img className={styles.gameboyImage} src={Pokedex} alt="Pokedex" />
        
        {/* Contenedor de ambas pantallas */}
        <div className={styles.screensContainer}>
          {/* Pantalla Superior con Pikachu */}
          <div className={styles.screenTop}>
            <img className={styles.pikachuImg} src={PikachuImg} alt="Pikachu" />
          </div>

          {/* Pantalla Inferior con "Loading..." */}
          <div className={styles.screenBottom}>
            <p className={styles.loadingText}>{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingComponent;
