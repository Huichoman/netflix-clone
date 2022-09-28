import styles from "./Resultados.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

export const Resultados = ({ addRemoveFavs, favMoviesList }) => {
  const [movieList, setMovieList] = useState([]);
  // const query = new URLSearchParams(window.location.search);
  // const keyword = query.get("keyword");

  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  console.log("KEYWORD :", keyword);

  useEffect(() => {
    const endpoint = `https://api.themoviedb.org/3/search/movie?api_key=f5e25946824bad668b30933e6ba5d1e8&language=es-ES&query=${keyword}&page=1&include_adult=false`;

    axios.get(endpoint).then((response) => {
      response.data.results.forEach((movie) => {
        movie.isfav = false;
        favMoviesList.forEach((favMovie) => {
          if (favMovie.id === movie.id) movie.isfav = true;
        });
      });
      setMovieList(
        response.data.results.filter((movie) => movie.backdrop_path != null)
      );
      console.log("RESULTADOS : ", response.data.results);
    });
  }, [keyword, favMoviesList]);

  return (
    <div className={styles.listadoContainer}>
      {movieList.map(
        ({ title, backdrop_path, id, poster_path, overview, isfav }) => (
          <div className={styles.movieCardContainer} key={id} id={id}>
            <div className={styles.favBtnContainer}>
              <button
                onClick={() =>
                  addRemoveFavs(
                    id,
                    title,
                    poster_path,
                    overview,
                    backdrop_path,
                    isfav
                  )
                }
                className={isfav ? styles.addFavButton : styles.delFavButton}
              >
                ★
              </button>
            </div>
            <img
              src={`https://image.tmdb.org/t/p/w342/${backdrop_path}`}
              className={styles.cardImage}
              alt="movie img"
            />
            <h3>{title} </h3>
            <Link to={`/moviedetail?movieID=${id}`}>View detail</Link>
          </div>
        )
      )}
    </div>
  );
};
