import React, { FC, useEffect } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "pages/home";
import Dashboard from "pages/dashboard";
import Template from "pages/templates";
<<<<<<< HEAD
import { Web3Storage } from "web3.storage";
=======
>>>>>>> b50f8f7310d58d824de28a99e1816a021e67eb8c

const App: FC = () => {
  useEffect(() => {
    // storeFiles(makeFileObjects());
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
<<<<<<< HEAD
        {/* <Route path="/templates" element={<Template />} /> */}
=======
        <Route path="/templates" element={<Template />} />
>>>>>>> b50f8f7310d58d824de28a99e1816a021e67eb8c
      </Routes>
    </Router>
  );
};

export default App;
