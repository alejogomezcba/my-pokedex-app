import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styles from "./PokemonsMaps.module.css";

import Footer from "../../components/Footer";
import PokeballImg from "../../assets/pokeball.png";

import PokemonsAmericaSur from "../../assets/pokemons-america-del-sur.jpg";
import PokemonsAmericaNorte from "../../assets/pokemons-america-del-norte.jpg";
import PokemonsEuropa from "../../assets/pokemons-en-europa.jpg";
import PokemonsOrienteMedio from "../../assets/pokemons-oriente-medio.jpg";
import PokemonsAsia from "../../assets/pokemons-asia.jpg";
import PokemonsAfrica from "../../assets/pokemons-africa.jpg";

import arrow from '../../assets/arrow.png';
import { useNavigate } from "react-router-dom";

interface ImageData {
  id: number;
  title: string;
  imgSrc: string;
}

const imagesArray: ImageData[] = [
  { id: 1, title: "América del Sur", imgSrc: PokemonsAmericaSur },
  { id: 2, title: "América del Norte", imgSrc: PokemonsAmericaNorte },
  { id: 3, title: "Europa", imgSrc: PokemonsEuropa },
  { id: 4, title: "Oriente Medio", imgSrc: PokemonsOrienteMedio },
  { id: 5, title: "Asia", imgSrc: PokemonsAsia },
  { id: 6, title: "África", imgSrc: PokemonsAfrica },
];

const PokemonsMaps = () => {
  const [slider, setSlider] = useState<Slider | null>(null);

  const navigate = useNavigate()

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // Oculta los botones por defecto
  };

  return (
    <div style={ {display:'flex', flexDirection: 'column', alignItems: 'center'} }>
        <button onClick={() => navigate('/pokemons')} className={styles.pokeballButton}>
          <img src={PokeballImg} alt="Pokeball" className={styles.pokeballImg} />
          Go Back
        </button>
        <div className={styles.container}>
        <button className={styles.navButton} onClick={() => slider?.slickPrev()} style={{ transform: "rotate(180deg)" }}>
            <img src={arrow} alt="arrow left" />
        </button>
        <Slider ref={setSlider} {...settings} className={styles.slider}>
            {imagesArray.map((item) => (
            <div className={styles.itemContainer} key={item.id}>
                <h3 className={styles.title}>{item.title}</h3>
                <img src={item.imgSrc} alt={item.title} className={styles.image} />
            </div>
            ))}
        </Slider>
        <button className={styles.navButton} onClick={() => slider?.slickNext()}>
            <img src={arrow} alt="arrow rigth" />
        </button>

        </div>
    <Footer/>
    </div>
  );
};

export default PokemonsMaps;
