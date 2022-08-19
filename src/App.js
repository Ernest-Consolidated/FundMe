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

function App() {
  return (
    <Router>
      <Routes>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.paymentError} element={<PaymentError />} />
      </Routes>
    </Router>
  );
}

export default App;
