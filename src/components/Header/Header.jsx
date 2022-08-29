import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header>
      <div className={styles.headerDiv}>
        <nav>
          <a href="/" className={styles.headerTitle}>
            Netaflix
          </a>
          <Link to="/">Home</Link>
          <Link to="/listado">Listado</Link>
          <Link to="/contacto">Contacto</Link>
        </nav>
      </div>
    </header>
  );
};
