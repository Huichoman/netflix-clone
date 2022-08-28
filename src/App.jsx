import { Routes, Route } from "react-router-dom";
import * as com from "./components";

function App() {
  return (
    <>
      <com.Header />
      <Routes>
        <Route path="/" element={<com.Login />} />
        <Route path="/listado" element={<com.Listado />} />
      </Routes>
      <com.Footer />
    </>
  );
}

export default App;
