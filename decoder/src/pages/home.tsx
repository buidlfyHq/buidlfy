import { FC, useState } from "react";
import config from "config";
import { Responsive, WidthProvider } from "react-grid-layout";
import RenderItem from "components/Home/RenderItem";
// import AbiComponent from "components/AbiComponent";

const ResponsiveGridLayout = WidthProvider(Responsive); // for responsive grid layout

const Home: FC = () => {
  const [inputValue, setInputValue] = useState<object>({});

  return (
    <section>
      {/* <AbiComponent /> */}
      <ResponsiveGridLayout
        layouts={config.builder}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 10, md: 8, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={50}
        compactType="horizontal"
        isDraggable={false}
        isResizable={false}
      >
        {config.builder.map((c) => {
          const { x, y, w, h, minW, i } = c;
          return (
            <div key={i} data-grid={{ x, y, w, h, minW }}>
              <RenderItem
                item={c}
                inputValue={inputValue}
                setInputValue={setInputValue}
              />
            </div>
          );
        })}
      </ResponsiveGridLayout>
    </section>
  );
};

export default Home;
