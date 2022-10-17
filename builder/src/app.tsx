import React, { FC } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "pages/dashboard";
import MyTemplates from "pages/my-templates";

const App: FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/my-templates" element={<MyTemplates />} />
      </Routes>
    </Router>
  );
};

export default App;
