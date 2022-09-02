import styles from "./MovieDetail.module.css";
import { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
import axios from "axios";

export const MovieDetail = () => {
  // let token = localStorage.getItem("token");

  let query = new URLSearchParams(window.location.search);
  let movieID = query.get("movieID");
  const [movieDetail, setMovieDetail] = useState([]);
  const [movieTrailer, setMovieTrailer] = useState([]);
  const apiKey = "f5e25946824bad668b30933e6ba5d1e8";

  console.log("movieDetail", movieDetail);
  console.log("movieTrailer", movieTrailer);

  useEffect(() => {
    axios
      .all([
        axios.get(
          `https://api.themoviedb.org/3/movie/${movieID}?api_key=${apiKey}&language=es-ES`
        ),
        axios.get(
          `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=${apiKey}&language=es-ES`
        ),
      ])
      .then(
        axios.spread((detailData, videoData) => {
          console.log("detailData", detailData);
          console.log("videoData", videoData);
          setMovieDetail(detailData.data);
          setMovieTrailer(videoData.data.results);
        })
      );

    // const endpoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=${apiKey}&language=es-ES`;
    // axios.get(endpoint).then((response) => {
    //   console.log("response", response);
    // });
  }, [movieID]);

  return (
    <div className={styles.movieDetailContainer}>
      <div
        className={styles.overviewContainer}
        style={{
          backgroundImage: `url("${`https://image.tmdb.org/t/p/w1280/${movieDetail.backdrop_path}`}")`,
        }}
      >
        <div className={styles.infoBackgroundContainer}>
          <div className={styles.infoContainer}>
            <h1 className={styles.movieTitle}>{movieDetail.title}</h1>
            <h3 className={styles.overviewText}>{movieDetail.overview}</h3>
          </div>
          <div className={styles.rightDiv}>
            <h1>Aimi Memo</h1>
          </div>
        </div>
      </div>
    </div>
  );
};
