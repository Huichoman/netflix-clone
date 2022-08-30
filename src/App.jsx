import { Routes, Route, Navigate } from "react-router-dom";
import * as com from "./components";

const ProtectedRoute = ({ children }) => {
  let token = localStorage.getItem("token");

  if (!token) {
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
