import { Routes, Route } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Listado } from "./components/Listado";
import { Login } from "./components/Login";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/listado" element={<Listado />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
