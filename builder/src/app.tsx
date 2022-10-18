import { FC, useEffect } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import Dashboard from "pages/dashboard";
import MyTemplates from "pages/my-templates";
import { fetchTemplates } from "redux/template/template.actions";

const App: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTemplates());
  }, []);

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