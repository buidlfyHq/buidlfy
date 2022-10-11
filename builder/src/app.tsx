import React, { FC, useEffect } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import Dashboard from "pages/dashboard";
import { updateContractList } from "redux/contract/contract.reducers";
import { IContract } from "redux/contract/contract.interfaces";

const App: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      const contractList = localStorage.getItem("contractList");
      const newContract: IContract[] = JSON.parse(contractList);
      dispatch(updateContractList(newContract));
    } catch (error) {
      console.log(error, "error");
    }
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
