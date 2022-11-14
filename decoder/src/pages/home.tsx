import { FC, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import BuilderConfig from "config";
import RenderItem from "utils/render-item";
import IWorkspace from "interfaces/workspace";
import logo from "assets/spheron-logo.png";
import { IInput, IOutput } from "interfaces/value";
import "styles/components.css";

const ResponsiveGridLayout = WidthProvider(Responsive); // for responsive grid layout

const Home: FC = () => {
  const config = JSON.parse(BuilderConfig);
  const [inputValue, setInputValue] = useState<IInput[]>([]);
  const [outputValue, setOutputValue] = useState<IOutput[]>([]);

  return (
    <main
      className="min-h-screen"
      style={{
        background: config.background,
      }}
    >
      <a
        href="https://spheron.network/"
        style={{ textDecoration: "none" }}
        rel="noreferrer"
        target="_blank"
      >
        <div className="float-btn py-3 px-5 fixed bottom-[2rem] right-[2rem] rounded-[42px] bg-white">
          <img className="w-[5.8rem] h-[1.5rem]" src={logo} />
        </div>
      </a>

      <ResponsiveGridLayout
        layouts={config.builder}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 6, md: 6, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={50}
        isDraggable={false}
        isResizable={false}
        compactType={null}
        margin={[0, 0]}
        className="h-fit overflow-hidden"
      >
        {config.builder.map((c: IWorkspace) => {
          const { x, y, w, h, minW, i } = c;
          return (
            <div key={i} data-grid={{ x, y, w, h, minW }}>
              <RenderItem
                item={c}
                inputValue={inputValue}
                setInputValue={setInputValue}
                outputValue={outputValue}
                setOutputValue={setOutputValue}
              />
            </div>
          );
        })}
      </ResponsiveGridLayout>
    </main>
  );
};

export default Home;
