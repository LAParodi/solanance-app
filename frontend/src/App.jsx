import {
  Route,
  Routes,
  Navigate,
  BrowserRouter as Router,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Home from "./pages/dashboard/Home";
import Income from "./pages/dashboard/Income";
import Expense from "./pages/dashboard/Expense";
import UserProvider from "./context/UserContext";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/inicio" element={<Home />} />
          <Route path="/ingresar" element={<Login />} />
          <Route path="/registro" element={<SignUp />} />
          <Route path="/ingresos" element={<Income />} />
          <Route path="/consumos" element={<Expense />} />
        </Routes>
      </Router>

      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize: "12px",
          },
        }}
      />
    </UserProvider>
  );
};

export default App;

const Root = () => {
  const isUserAuthenticated = !!localStorage.getItem("token");

  return isUserAuthenticated ? (
    <Navigate to={"/inicio"} />
  ) : (
    <Navigate to={"/ingresar"} />
  );
};
