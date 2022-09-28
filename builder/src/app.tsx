import React, { FC, useEffect, useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "pages/dashboard";
import StartModal from "components/custom-components/modals/start-modal";
import TemplateModal from "components/custom-components/modals/template-modal";
import SingleTemplateDetails from "components/custom-components/modals/single-template-details";

const App: FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenTemplate, setIsOpenTemplate] = useState(false)
  const [isOpenSingleTemplate, setIsOpenSingleTemplate] = useState(false)

  useEffect(() => {
    setIsOpen(true)
    // storeFiles(makeFileObjects());
  }, []);

  const handleStartFromTemplate = () => {
    setIsOpen(false)
    setIsOpenTemplate(true)
  }
  const handleStartFromScratch = () => {
    setIsOpen(false)
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
      <StartModal 
        isOpen={isOpen} 
        setIsOpen={setIsOpen}
        handleStartFromTemplate={handleStartFromTemplate} 
        handleStartFromScratch={handleStartFromScratch}
      />
      <TemplateModal 
        isOpenTemplate={isOpenTemplate}
        setIsOpenTemplate={setIsOpenTemplate}
        setIsOpenSingleTemplate={setIsOpenSingleTemplate}
      />
      <SingleTemplateDetails
        isOpenSingleTemplate={isOpenSingleTemplate}
        setIsOpenSingleTemplate={setIsOpenSingleTemplate} 
      />
    </Router>
  );
};

export default App;
