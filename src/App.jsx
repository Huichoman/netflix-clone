// import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import * as com from "./components";
import { AnimatePresence } from "framer-motion";
import styles from "./App.module.css";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// import styles from "./App.module.css";

const ProtectedRoute = ({ children }) => {
  // const swalert = withReactContent(Swal);

  const [user] = useAuthState(auth);
  // const token = sessionStorage.getItem("token");
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const [favMoviesList, setFavMoviesList] = useState([]);
  const favMovies = localStorage.getItem("favMovies");
  let tempFavMovies;

  if (!favMovies) {
    tempFavMovies = [];
  } else {
    tempFavMovies = JSON.parse(favMovies);
    // setFavMoviesList(tempFavMovies);
    // console.log("movies from storage", tempFavMovies);
  }

  useEffect(() => {
    setFavMoviesList(tempFavMovies);
  }, []);

  const addRemoveFavs = (
    id,
    title,
    poster_path,
    overview,
    backdrop_path,
    isfav
  ) => {
    const movieData = {
      id,
      title,
      poster_path,
      overview,
      backdrop_path,
      isfav,
    };
    // console.log(movieData.title, movieData.isfav);
    const found = tempFavMovies.find((e) => e.id === id);
    // console.log("found", found);
    if (!found) {
      movieData.isfav = true;
      tempFavMovies.push(movieData);

      localStorage.setItem("favMovies", JSON.stringify(tempFavMovies));
      setFavMoviesList(tempFavMovies);
      // console.log("Se agregó la película", tempFavMovies);
    } else {
      tempFavMovies = tempFavMovies.filter((e) => e.id !== id);
      localStorage.setItem("favMovies", JSON.stringify(tempFavMovies));
      setFavMoviesList(tempFavMovies);
      // console.log("Se eliminó la película", tempFavMovies);
    }
    // console.log("local Storage", localStorage.getItem("favMovies"));
  };

  return (
    <>
      <com.Header />
      {/* <AnimatePresence mode="wait"> */}
      <Routes>
        <Route path="/" element={<com.Login />} />
        <Route
          path="/listado"
          element={
            <ProtectedRoute>
              <com.Listado
                addRemoveFavs={addRemoveFavs}
                favMoviesList={favMoviesList}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/moviedetail"
          element={
            <ProtectedRoute>
              <com.MovieDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/resultados"
          element={
            <ProtectedRoute>
              <com.Resultados
                addRemoveFavs={addRemoveFavs}
                favMoviesList={favMoviesList}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <com.Favorites
                addRemoveFavs={addRemoveFavs}
                favMoviesList={favMoviesList}
              />
            </ProtectedRoute>
          }
        />
      </Routes>
      {/* </AnimatePresence> */}
      <com.Footer />
    </>
  );
}

export default App;
