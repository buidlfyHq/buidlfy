import { FC, useState } from "react";
import Navbar from "./components/Navbar";
import AbiComponent from "./components/AbiComponent";

const App: FC = () => {
  const [account, setAccount] = useState();

  return (
    <div className="App">
      <Navbar account={account} setAccount={setAccount} />
      {/* <AbiComponent account={account} /> */}
    </div>
  );
};

export default App;
