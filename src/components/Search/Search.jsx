import styles from "./Search.module.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";

export const Search = () => {
  const swalert = withReactContent(Swal);
  const navigate = useNavigate();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const movieName = e.target.movieName.value.trim();
    // console.log("MovieName", movieName);

    if (movieName.length < 1) {
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
        title: "Oops!",
        text: "Necesitas ingresar información de búsqueda",
        backdrop: false,
        buttonsStyling: false,
      });
    } else {
      e.target.movieName.value = "";
      navigate(`/resultados?keyword=${movieName}`);
    }
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <div className={styles.searchFormContainer}>
        <input
          type="text"
          className={styles.inputTextContainer}
          placeholder="ingresa la película a buscar"
          name="movieName"
        ></input>
        <button type="submit" className={styles.submitButton}>
          Search
        </button>
      </div>
    </form>
  );
};
