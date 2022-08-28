import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const swalert = withReactContent(Swal);
  const navigate = useNavigate();

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
      swalert.fire(
        "Oops!",
        "Los campos email y password no se puede dejar vacíos",
        "warning"
      );
      console.log("Los campos email y password no se puede dejar vacíos");
      return;
    }
    if (email !== "" && !regexEmail.test(email)) {
      swalert.fire("Oops!", "Debes ingresar un email válido", "warning");
      console.log("Debes ingresar un email válido");
      return;
    }

    if (email !== "challenge@alkemy.org" || password !== "react") {
      swalert.fire("Opps!", "Credenciales incorrectas", "warning");
      console.log("Credenciales incorrectas");
      return;
    }

    Swal.fire("Datos enviados correctamente", "", "success");

    axios
      .post("http://challenge-react.alkemy.org", { email, password })
      .then((res) => {
        const { token } = res.data;
        localStorage.setItem("token", token);
        navigate("/listado");
      });
  };

  return (
    <>
      <h2>Formulario de login</h2>
      <form onSubmit={submitHandler}>
        <label>
          <span>Correo electrónico:</span>
          <br />
          <input type="text" name="email" />
          <br />
        </label>

        <label>
          <span>Contraseña:</span>
          <br />
          <input type="password" name="password" />
        </label>
        <br />
        <button type="submit">Ingresar</button>
      </form>
    </>
  );
};