import { FC, useState } from "react";
import BuilderConfig from "config";
import { Responsive, WidthProvider } from "react-grid-layout";
import RenderItem from "components/Home/RenderItem";
import ConnectWallet from "components/ConnectWallet";

const ResponsiveGridLayout = WidthProvider(Responsive); // for responsive grid layout

const Home: FC = () => {
  const config = JSON.parse(BuilderConfig);
  const [inputValue, setInputValue] = useState<object[]>([]);
  const [outputValue, setOutputValue] = useState<object[]>([]);
  const [account, setAccount] = useState(null);
  return (
    <section>
      {/* <>
        <ConnectWallet
          text={"Connect"}
          account={account}
          setAccount={setAccount}
        />
      </> */}

      <ResponsiveGridLayout
        layouts={config.builder}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 6, md: 6, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={50}
        compactType="horizontal"
        // useCSSTransforms={true}
        // allowOverlap={true}
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
                outputValue={outputValue}
                setOutputValue={setOutputValue}
              />
            </div>
          );
        })}
      </ResponsiveGridLayout>
    </section>
  );
};

export default Home;
