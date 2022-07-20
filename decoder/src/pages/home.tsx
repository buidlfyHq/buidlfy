import { FC, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import BuilderConfig from "config";
import RenderItem from "utils/render-item";
import IItems from "interfaces/items";

const ResponsiveGridLayout = WidthProvider(Responsive); // for responsive grid layout

const Home: FC = () => {
  const config = JSON.parse(BuilderConfig);
  const [inputValue, setInputValue] = useState<
    {
      id: string;
      value: string;
    }[]
  >([]);
  const [outputValue, setOutputValue] = useState<object[]>([]);

  return (
    <ResponsiveGridLayout
      layouts={config.builder}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 6, md: 6, sm: 6, xs: 4, xxs: 2 }}
      rowHeight={50}
      compactType="horizontal"
      isDraggable={false}
      isResizable={false}
      style={{
        backgroundColor: `rgba(${config.background.r}, ${config.background.g}, ${config.background.b}, ${config.background.a})`,
      }}
    >
      {config.builder.map((c: IItems) => {
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
  );
};

export default Home;
