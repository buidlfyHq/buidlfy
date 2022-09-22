import React, { FC } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
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
