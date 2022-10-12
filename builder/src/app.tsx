import React, { FC, useEffect } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import Dashboard from "pages/dashboard";

const App: FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
