import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Favorites.module.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AnimatedPage } from "../AnimatedPage/AnimatedPage";

export const Favorites = ({ favMoviesList, addRemoveFavs }) => {
  const swalert = withReactContent(Swal);

  const swalertModalTest = (id) => {
    const element = document.getElementById(id);
    console.log("elemento", element);
    let coords = element.getBoundingClientRect();
    document.documentElement.style.cssText =
      "--posLeft: " + coords.left + "px; --posTop: " + coords.top + "px;";

    console.log("coordenadas", coords);
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
      target: document.getElementById(id),
    });
  };

  useEffect(() => {}, []);

  const handleAddRemoveFavs = () => {
    addRemoveFavs();
  };

  return (
    <AnimatedPage>
      <div className={styles.listadoContainer}>
        {favMoviesList.map(
          ({ id, title, poster_path, overview, backdrop_path }) => (
            <div key={id} className={styles.movieCardContainer} id={id}>
              <div className={styles.favBtnContainer}>
                <button
                  onClick={() =>
                    addRemoveFavs(
                      id,
                      title,
                      poster_path,
                      overview,
                      backdrop_path
                    )
                  }
                  className={styles.addFavButton}
                >
                  ★
                </button>
              </div>
              <img
                src={`https://image.tmdb.org/t/p/w342/${backdrop_path}`}
                className={styles.cardImage}
                alt="movie img"
              />
              <h3 className={styles.movieTitle}>{title} </h3>
              <Link
                className={styles.viewDetail}
                to={`/moviedetail?movieID=${id}`}
              >
                View detail
              </Link>
            </div>
          )
        )}
      </div>
    </AnimatedPage>
  );
};
