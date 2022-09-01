import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "animate.css";

export const Header = () => {
  const token = localStorage.getItem("token");
  const swalert = withReactContent(Swal);

  console.log("token", token);
  let navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    console.log(e);
    console.log("onHandleClick token", token);
    if (!token) {
      console.log("Sin acceso compadre");
      // swalert.fire({
      //   customClass: {
      //     popup: [styles.swalertPopup],
      //     title: [styles.swalertTitle],
      //     htmlContainer: [styles.swalertHtml],
      //     actions: [styles.swalertActions],
      //     confirmButton: [styles.swalertConfirmButton],
      //   },
      //   showClass: {
      //     popup: `
      //     animate__animated
      //     animate__zoomIn
      //     animate__faster
      //   `,
      //   },
      //   hideClass: {
      //     popup: "animate__animated animate__flipOutX",
      //   },
      //   title: "Error",
      //   text: "Necesitas loguearte para acceder a este contenido",
      //   backdrop: false,
      //   buttonsStyling: false,
      // });
      return;
    }
    console.log("Hacia el listado");
    navigate("/listado");
  };

  return (
    <header>
      <div className={styles.headerDiv}>
        <nav>
          <a href="/" className={styles.headerTitle}>
            Netaflix
          </a>
          <Link to="/">Home</Link>
          <Link to="/listado">Listado</Link>
          <Link to="/moviedetail">Contacto</Link>
        </nav>
      </div>
    </header>
  );
};
