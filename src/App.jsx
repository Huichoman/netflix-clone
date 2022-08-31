// import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import * as com from "./components";

// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// import styles from "./App.module.css";

const ProtectedRoute = ({ children }) => {
  // const swalert = withReactContent(Swal);
  const token = localStorage.getItem("token");
  console.log("token app", token);
  if (!token) {
    console.log("Redireccionando");
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <>
      <com.Header />
      <Routes>
        <Route path="/" element={<com.Login />} />
        <Route
          path="/listado"
          element={
            <ProtectedRoute>
              <com.Listado />
            </ProtectedRoute>
          }
        />
        <Route
          path="/moviedetail"
          element={
            <ProtectedRoute>
              <com.MovieDetail />
            </ProtectedRoute>
          }
        />
      </Routes>
      <com.Footer />
    </>
  );
}

export default App;
