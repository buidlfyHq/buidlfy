import { FC } from "react";
import SnackbarProvider from "react-simple-snackbar";
import Home from "./pages/home";

const App: FC = () => {
  return (
    <SnackbarProvider>
      <Home />
    </SnackbarProvider>
  );
};

export default App;
