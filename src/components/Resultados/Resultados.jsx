import styles from "./Resultados.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Resultados = () => {
  const [movieList, setMovieList] = useState([]);

  const query = new URLSearchParams(window.location.search);
  const keyword = query.get("keyword");

  useEffect(() => {
    const endpoint = `https://api.themoviedb.org/3/search/movie?api_key=f5e25946824bad668b30933e6ba5d1e8&language=es-ES&query=${keyword}&page=1&include_adult=false`;

    axios.get(endpoint).then((response) => {
      setMovieList(response.data.results);
      console.log("response", response.data.results);
    });
  }, [keyword]);

  return (
    <div className={styles.listadoContainer}>
      {movieList.map(({ title, backdrop_path, id, poster_path }) => (
        <div className={styles.movieCardContainer}>
          <img
            src={`https://image.tmdb.org/t/p/w342/${
              backdrop_path ? backdrop_path : poster_path
            }`}
            className={styles.cardImage}
            alt="movie img"
          />
          <h3>{title} </h3>
          <Link to={`/moviedetail?movieID=${id}`}>View detail</Link>
        </div>
      ))}
    </div>
  );
};
