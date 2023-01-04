import { FC, useEffect } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Dashboard from 'pages/dashboard';
import MyTemplates from 'pages/my-templates';
import Preview from 'pages/preview';
import Signin from 'pages/signin';
import { fetchTemplates } from 'redux/template/template.actions';
import AppModal from 'features/dashboard/app-modal';

const App: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTemplates());
  }, []); // eslint-disable-line

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/my-templates" element={<MyTemplates />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </Router>

      <AppModal />
    </>
  );
};

export default App;
