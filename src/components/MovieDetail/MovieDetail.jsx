import styles from "./MovieDetail.module.css";
import { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
import axios from "axios";
import { MovieTrailer } from "../MovieTrailer/MovieTrailer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
let animationCounter = 2;
export const MovieDetail = () => {
  // let token = localStorage.getItem("token");

  const swalert = withReactContent(Swal);
  let query = new URLSearchParams(window.location.search);
  let movieID = query.get("movieID");
  const [movieDetail, setMovieDetail] = useState(null);
  const [movieTrailer, setMovieTrailer] = useState(null);
  const apiKey = "f5e25946824bad668b30933e6ba5d1e8";

  const animatedEntrances = [
    " animate__flipInX",
    " animate__rotateIn",
    " animate__rollIn",
    " animate__jackInTheBox",
    " animate__zoomIn",
    " animate__slideInDown",
    " animate__slideInLeft",
    " animate__fadeIn",
    " animate__lightSpeedInLeft",
  ];
  const animatedExits = [
    " animate__flipOutX",
    " animate__rotateOut",
    " animate__rollOut",
    " animate__hinge",
    " animate__zoomOut",
    " animate__slideOutDown",
    " animate__slideOutRight",
    " animate__fadeOut",
    " animate__lightSpeedOutRight",
  ];

  // console.log("movieDetail", movieDetail);
  // console.log("movieTrailer", movieTrailer);

  useEffect(() => {
    axios
      .all([
        axios.get(
          `https://api.themoviedb.org/3/movie/${movieID}?api_key=${apiKey}&language=es-ES`
        ),
        axios.get(
          `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=${apiKey}&language=en-EN`
        ),
      ])
      .then(
        axios.spread((detailData, videoData) => {
          let filterTrailer = [];
          // console.log("detailData", detailData);
          filterTrailer = videoData.data.results.filter(
            (video) => video.type === "Trailer"
          );
          // console.log("videoData", videoData);
          // console.log("Filter by Type>Trailer: ", filterTrailer);
          setMovieDetail(detailData.data);
          setMovieTrailer(filterTrailer[0].key);
        })
      );

    // const endpoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=${apiKey}&language=es-ES`;
    // axios.get(endpoint).then((response) => {
    //   console.log("response", response);
    // });
  }, [movieID]);

  const swalertModalTest = (e) => {
    swalert.fire();
    swalert.fire({
      customClass: {
        container: [styles.swalertContainer],
        popup: [styles.swalertPopup],
        title: [styles.swalertTitle],
        htmlContainer: [styles.swalertHtml],
        actions: [styles.swalertActions],
        confirmButton: [styles.swalertConfirmButton],
      },
      showClass: {
        popup: "animate__animated" + [animatedEntrances[animationCounter]],
        backdrop: "swal2-backdrop-show",
        icon: "swal2-icon-show",
      },
      hideClass: {
        popup: "animate__animated" + [animatedExits[4]],
      },
      html: <MovieTrailer trailerId={movieTrailer} />,

      backdrop: false,
      showCloseButton: true,
      showConfirmButton: false,
      allowOutsideClick: false,

      // buttonsStyling: false,
    });
    // animationCounter++;
    if (animationCounter === animatedEntrances.length) animationCounter = 0;
  };

  return (
    <>
      {movieDetail && (
        <>
          <div className={styles.movieDetailContainer}>
            <div
              className={styles.overviewContainer}
              style={{
                backgroundImage: `url("${`https://image.tmdb.org/t/p/w1280/${movieDetail.backdrop_path}`}")`,
              }}
            >
              <div className={styles.infoBackgroundContainer}>
                <div className={styles.infoContainer} id="detail">
                  <h1 className={styles.movieTitle}>{movieDetail.title}</h1>
                  <h3 className={styles.overviewText}>
                    {movieDetail.overview}
                  </h3>
                  {movieTrailer && (
                    <button
                      className={styles.modalButton}
                      onClick={swalertModalTest}
                    >
                      PLAY
                    </button>
                  )}
                </div>
                <div className={styles.rightDiv}>
                  {/* <MovieTrailer trailerId={movieTrailer} /> */}
                  {/* <h1>Aimi Memo</h1> */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
