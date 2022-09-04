import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Listado.module.css";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AnimatedPage } from "../AnimatedPage/AnimatedPage";

export const Listado = () => {
  const swalert = withReactContent(Swal);
  const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {
    const endPoint =
      "https://api.themoviedb.org/3/discover/movie?api_key=f5e25946824bad668b30933e6ba5d1e8&language=es-ES&sort_by=popularity.desc&include_adult=false&include_video=true&page=1&with_watch_monetization_types=flatrate";
    axios
      .get(endPoint)
      .then((response) => setMoviesList(response.data.results))
      .catch((error) => {
        swalert.fire("Hubo un error", "Intenta más tarde");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const swalertModalTest = () => {
    swalert.fire();
    swalert.fire({
      customClass: {
        popup: [styles.swalertPopup],
        title: [styles.swalertTitle],
        htmlContainer: [styles.swalertHtml],
        actions: [styles.swalertActions],
        confirmButton: [styles.swalertConfirmButton],
      },
      showClass: {
        popup: `
        animate__animated
        animate__zoomIn
        animate__faster
      `,
      },
      hideClass: {
        popup: "animate__animated animate__flipOutX",
      },
      title: "Error",
      text: "Necesitas loguearte para acceder a este contenido",
      backdrop: false,
      buttonsStyling: false,
    });
  };

  // const endPoint =
  //   "https://api.themoviedb.org/3/discover/movie?api_key=f5e25946824bad668b30933e6ba5d1e8&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1&with_watch_monetization_types=flatrate";

  // startTransition(() => {
  //   axios
  //     .get(endPoint)
  //     .then((response) => setMoviesList(response.data.results))
  //     .catch((error) => {
  //       swalert.fire("Hubo un error", "Intenta más tarde");
  //     });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // });

  return (
    <AnimatedPage>
      <div className={styles.listadoContainer}>
        {moviesList.map(
          ({ id, title, poster_path, overview, backdrop_path }) => (
            <div key={id} className={styles.movieCardContainer}>
              <img
                src={`https://image.tmdb.org/t/p/w342/${backdrop_path}`}
                className={styles.cardImage}
                alt="movie img"
              />
              <h3>{title}</h3>
              <Link to={`/moviedetail?movieID=${id}`}>View detail</Link>
              <button className={styles.modalButton} onClick={swalertModalTest}>
                Test
              </button>
            </div>
          )
        )}
      </div>
    </AnimatedPage>
  );
};
