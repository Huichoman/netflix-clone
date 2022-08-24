import { Routes, Route } from "react-router-dom";
import { Listado } from "./components/Listado";
import { Login } from "./components/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/listado" element={<Listado />} />
      </Routes>
    </>
  );
}

export default App;
