import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { AnimatedPage } from "../AnimatedPage/AnimatedPage";
import {
  auth,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
} from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export const Login = () => {
  const swalert = withReactContent(Swal);
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate("/listado");
  }, [user, loading]);
  const submitHandler = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const regexEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    console.log("Sendig form data...");
    console.log("email: ", email);
    console.log("password: ", password);
    if (email === "" || password === "") {
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
        text: "Los campos no se deben de dejar vacíos",
        backdrop: false,
        buttonsStyling: false,
      });
      console.log("Los campos email y password no se puede dejar vacíos");
      return;
    }
    if (email !== "" && !regexEmail.test(email)) {
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
        text: "Debes ingresar un email válido",
        backdrop: false,
        buttonsStyling: false,
      });

      console.log("Debes ingresar un email válido");
      return;
    }

    logInWithEmailAndPassword(email, password);

    // if (!user) registerWithEmailAndPassword(email, password);
    // else logInWithEmailAndPassword(email, password);

    // axios
    //   .post(
    //     "https://cors-everywhere.herokuapp.com/http://challenge-react.alkemy.org",
    //     { email, password }
    //   )
    //   .then((res) => {
    //     const { token } = res.data;
    //     sessionStorage.setItem("token", token);
    //     navigate("/listado");
    //   });
  };

  return (
    <AnimatedPage>
      <div className={styles.LoginContainer}>
        <form onSubmit={submitHandler} className={styles.LoginForm}>
          <h2>Sign In</h2>
          <label>
            {/* <span>Correo electrónico:</span> */}
            <br />
            <input type="text" name="email" placeholder="Email" required />
            <br />
          </label>

          <label>
            {/* <span>Contraseña:</span> */}
            <br />
            <input type="password" name="password" placeholder="Password" />
          </label>
          <br />
          <button type="submit" className={styles.loginButton}>
            Ingresar
          </button>
        </form>
      </div>
    </AnimatedPage>
  );
};
