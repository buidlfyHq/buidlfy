import { FC, useState } from "react";
import { useWindowSize } from "hooks/use-window-size";
import { Responsive, WidthProvider } from "react-grid-layout";
import BuilderConfig from "config";
import RenderItem from "utils/render-item";
import IWorkspace from "interfaces/workspace";
import { IInput, IOutput } from "interfaces/value";

const ResponsiveGridLayout = WidthProvider(Responsive); // for responsive grid layout

const Home: FC = () => {
  const config = JSON.parse(BuilderConfig);
  const size = useWindowSize();
  const [inputValue, setInputValue] = useState<IInput[]>([]);
  const [outputValue, setOutputValue] = useState<IOutput[]>([]);
  return (
    <>
      {size.width > 1024 ? (
        <main
          className="min-h-screen"
          style={{
            background: config.background,
          }}
        >
          <ResponsiveGridLayout
            layouts={config.builder}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 6, md: 6, sm: 6, xs: 4, xxs: 2 }}
            rowHeight={50}
            isDraggable={false}
            isResizable={false}
            compactType="vertical"
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
      ) : (
        <h1 className="items-center text-center justify-center flex h-[100vh]">
          Use this on desktop for better experience <br /> Responsive view
          coming soon!
        </h1>
      )}
    </>
  );
};

export default Home;
