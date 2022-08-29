import { Navigate } from "react-router-dom";
import styles from "./Listado.module.css";
import movieTestImage from "../../images/movie-img-test.jpg";

export const Listado = () => {
  // let token = localStorage.getItem("token");

  // if (!token) {
  //   return <Navigate to="/" replace />;
  // }

  const testMovieArray = [
    "El club de la pelea",
    "Deadpool",
    "Godzilla",
    "Minions",
    "Halo",
    "Covenant",
    "Jurassic Park",
    "Avengers",
    "Spacejam",
    "Robocop",
    "Hulk",
    "Hero mode",
    "The power",
    "El buen vecino",
    "Endgame",
    "Heart of champions",
    "The wrong blind date",
    "Sout park the streaming wars Part 2",
    "Noche americana",
    "Borrego",
    "Pitbull",
    "Teléfono negro",
    "Jurassic world",
    "La vida en silencio",
    "Cha cha",
    "Noche americana",
    "Green lantern",
    "Red rocket",
    "El monstruo marino",
  ];

  return (
    <>
      <div className={styles.listadoContainer}>
        {testMovieArray.map((movieName, index) => (
          <div key={index} className={styles.movieCardContainer}>
            <img
              src={movieTestImage}
              className={styles.cardImage}
              alt="movie img"
            />
            {movieName}
          </div>
        ))}
      </div>
    </>
  );
};
