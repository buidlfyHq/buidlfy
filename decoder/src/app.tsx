import { FC } from "react";
import { Helmet } from "react-helmet";
import BuilderConfig from "config";
import DefaultLogo from "assets/buidl.png";
import Home from "./pages/home";

const App: FC = () => {
  const config = JSON.parse(BuilderConfig);

  return (
    <>
      {/* set site head - logo and title */}
      <Helmet>
        <title>{config.head?.title ? config.head.title : "Buidlfy"}</title>
        <link
          rel="icon"
          type="image/png"
          href={config.head?.logo ? config.head.logo : DefaultLogo}
          sizes="16x16"
        />
      </Helmet>

      <Home />
    </>
  );
};

export default App;
