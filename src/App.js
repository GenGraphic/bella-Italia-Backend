import React from "react";

import { Routes, Route } from "react-router-dom";

import LogIn from "./pages/LogIn";
import Rechnungen from "./pages/Rechnungen";
import Shop from "./pages/Shop";

import Menu from "./comp/Menu";

function App() {
  return (
    <div className="App">
      <Menu />
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/Rechnung" element={<Rechnungen />} />
        <Route path="/adminShop" element={<Shop />} />
      </Routes>
    </div>
  );
}

export default App;
