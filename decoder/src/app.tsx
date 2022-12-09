import { FC } from "react";
import { Helmet } from "react-helmet";
import BuilderConfig from "config";
import DefaultLogo from "assets/buidl.png";
import Home from "./pages/home";

const App: FC = () => {
  const config = JSON.parse(BuilderConfig);
  return (
    <>
      {/* set head - logo and title */}
      <Helmet>
        <title>{config.head?.title ? config.head.title : "Buidlfy"}</title>
        <link
          rel="icon"
          type="image/png"
          href={config.head?.logo ? config.head.logo : DefaultLogo}
          sizes="16x16"
        />
        {config.fonts.map((font: string) => {
          let head = document.getElementsByTagName("head")[0];
          let link = document.createElement("link");
          link.id = font;
          link.rel = "stylesheet";
          link.type = "text/css";
          link.href =
            "http://fonts.googleapis.com/css?family=" +
            font +
            ":wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap";
          link.media = "all";
          head.appendChild(link);
        })}
      </Helmet>
      <Home />
    </>
  );
};

export default App;
