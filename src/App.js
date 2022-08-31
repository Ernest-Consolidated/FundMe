import React from "react";
import "./App.css";
import Home from "./components/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import routes from "./routes";
import PaymentError from "./components/PaymentError";
import PaymentSuccess from "./components/PaymentSuccess";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import UseAuth, { AuthProvider } from "./hooks/UseAuth";
import Dashboard from "./components/Dashboard";
import { useSelector } from "react-redux";
import PasswordReset from "./components/auth/PasswordReset";

// GlobalGiving Api key: c857816a-f007-41db-a93b-c8cf53b7622c

function App() {
  const { accessToken } = useSelector((state) => state.auth);
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path={routes.home}
            element={
              accessToken ? <Navigate to={routes.dashboard} /> : <Home />
            }
          />
          <Route path={routes.paymentError} element={<PaymentError />} />
          <Route path={routes.paymentSuccess} element={<PaymentSuccess />} />
          <Route path={routes.start} element={<Register />} />
          <Route path={routes.login} element={<Login />} />
          <Route
            path={routes.dashboard}
            element={accessToken ? <Dashboard /> : <Navigate to="/" />}
          />
          <Route path={routes.resetPassword} element={<PasswordReset />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
