import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header className="w-100">
      <div className={styles.headerDiv}>
        Test
        <nav className="navbar-dark bg-dark w-50">
          <a href="/">Netflix</a>
          <Link to="/">Home</Link>
          <Link to="/listado">Listado</Link>
          <Link to="/contacto">Contacto</Link>
        </nav>
      </div>
    </header>
  );
};
