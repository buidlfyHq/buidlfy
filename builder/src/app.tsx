import { FC, useEffect } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Dashboard from 'pages/dashboard';
import MyTemplates from 'pages/my-templates';
import Preview from 'pages/preview';
import Waitlist from 'pages/waitlist';
import AppModal from 'features/dashboard/app-modal';
import { fetchListedTemplatesAsync } from 'redux/template/template.thunk-actions';

const App: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchListedTemplatesAsync());
  }, []); // eslint-disable-line

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/my-templates" element={<MyTemplates />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/waitlist" element={<Waitlist />} />
        </Routes>
      </Router>

      <AppModal />
    </>
  );
};

export default App;
