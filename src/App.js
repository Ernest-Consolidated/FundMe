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

// GlobalGiving Api key: c857816a-f007-41db-a93b-c8cf53b7622c

function App() {
  return (
    <Router>
      <Routes>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.paymentError} element={<PaymentError />} />
        <Route path={routes.paymentSuccess} element={<PaymentSuccess />} />
      </Routes>
    </Router>
  );
}

export default App;
