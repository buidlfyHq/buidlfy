import React, { FC, useEffect } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "pages/home";
import Dashboard from "pages/dashboard";
import Template from "pages/templates";

const App: FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
