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
import Register from "./components/Register";
import Login from "./components/Login";
import UseAuth, { AuthProvider } from "./hooks/UseAuth";
import Dashboard from "./components/Dashboard";

// GlobalGiving Api key: c857816a-f007-41db-a93b-c8cf53b7622c

function App() {
  const { user } = UseAuth();
  console.log(user);
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.paymentError} element={<PaymentError />} />
          <Route path={routes.paymentSuccess} element={<PaymentSuccess />} />
          <Route path={routes.start} element={<Register />} />
          <Route path={routes.login} element={<Login />} />
          <Route
            path={routes.dashboard}
            element={user ? <Dashboard /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
