import axios from "axios";

export const Login = () => {
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
      console.log("Los campos email y password no se puede dejar vacíos");
      return;
    }
    if (email !== "" && !regexEmail.test(email)) {
      console.log("Debes ingresar un email válido");
      return;
    }

    if (email !== "challenge@alkemy.org" || password !== "react") {
      console.log("Credenciales incorrectas");
      return;
    }

    console.log("Datos validados OK");

    axios
      .post("http://challenge-react.alkemy.org", { email, password })
      .then((res) => {
        console.log(res.data);
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
