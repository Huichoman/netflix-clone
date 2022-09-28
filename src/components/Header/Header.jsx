import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "animate.css";
import { Search } from "../Search/Search";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export const Header = () => {
  const [user] = useAuthState(auth);
  const token = sessionStorage.getItem("token");
  const swalert = withReactContent(Swal);

  console.log("token", token);
  let navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    console.log(e);
    console.log("onHandleClick token", token);
    if (!user) {
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
        backdrop: true,
        buttonsStyling: false,
      });
      return;
    }
    console.log("Hacia el listado");
    navigate("/listado");
  };

  return (
    <header>
      <nav>
        <div className={styles.headerDiv}>
          <a href="/" className={styles.headerTitle}>
            Netaflix
          </a>
          <Link to="/">Home</Link>
          <Link to="/listado" onClick={handleClick}>
            Listado
          </Link>
          <Link to="/favorites">Favoritos</Link>
          <div className={styles.push}>
            <Search />
          </div>
        </div>
      </nav>
    </header>
  );
};
