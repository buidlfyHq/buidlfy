import { FC, useState } from "react";
import { Layout, Layouts, Responsive, WidthProvider } from "react-grid-layout";
import BuilderConfig from "config";
import RenderItem from "utils/render-item";
import IItems from "interfaces/items";
import { IInput, IOutput } from "interfaces/value";

const ResponsiveGridLayout = WidthProvider(Responsive); // for responsive grid layout

const Home: FC = () => {
  const config = JSON.parse(BuilderConfig);
  const [inputValue, setInputValue] = useState<IInput[]>([]);
  const [outputValue, setOutputValue] = useState<IOutput[]>([]);
  const [testConfig, setTestConfig] = useState(
    JSON.parse(BuilderConfig).builder
  );
  const [assets, setAssets] = useState([]); // for storing all nfts
  const [assetNum, setAssetNum] = useState(0); // for rendering nfts one by one

  // to persist layout changes
  const onLayoutChange = (layout: Layout[], layouts: Layouts) => {
    setTestConfig(testConfig);
  };

  // render nfts from connected wallet using opensea api
  const renderTokensForOwner = () => {
    fetch(
      `https://testnets-api.opensea.io/api/v1/assets?owner=0xd6c72729EbCC987b171eCF074993ce3C4e34b9f0&order_direction=desc&offset=0&limit=20&include_orders=false`,
      { method: "GET", headers: { Accept: "application/json" } }
    )
      .then((response) => response.json())
      .then(({ assets }) => {
        // ISSUE: unable to render all nfts using forEach
        // assets.forEach((attributes) => {
        // });
        setAssets(assets);
      });
  };

  // create new nft component
  const renderImage = (attributes) => {
    let newC = {
      i: attributes.id,
      x: 0,
      y: 1 + assetNum,
      h: 1,
      w: 6,
      name: "Image",
      imgData: attributes.image_url,
      link: "",
      style: {
        backgroundColor: { r: "0", g: "0", b: "0" },
        color: { r: "0", g: "0", b: "0", a: "100" },
        fontWeight: "normal",
        fontStyle: "normal",
        textDecoration: "none",
        justifyContent: "center",
        fontSize: 15,
        deleteComponent: 0,
        margin: {
          marginTop: 0,
          marginRight: 0,
          marginBottom: 0,
          marginLeft: 0,
        },
        padding: {
          paddingTop: 0,
          paddingRight: 0,
          paddingBottom: 0,
          paddingLeft: 0,
        },
      },
    };

    let newItemsArr = testConfig.map((item) => {
      const { y } = item;
      if (y >= newC.y) {
        return {
          ...item,
          y: y + newC.h,
        };
      } else {
        return {
          ...item,
          y: y,
        };
      }
    });

    setTestConfig([...newItemsArr, newC]);
    setAssetNum(assetNum + 1);
  };

  return (
    <main
      className="min-h-screen"
      style={{
        backgroundColor: `rgba(${config.background?.r}, ${config.background?.g}, ${config.background?.b}, ${config.background?.a})`,
      }}
    >
      <ResponsiveGridLayout
        layouts={{ lg: testConfig }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 6, md: 6, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={50}
        isDraggable={false}
        isResizable={false}
        onLayoutChange={onLayoutChange}
        compactType={null}
        margin={[0, 0]}
        className="h-fit overflow-hidden"
      >
        {testConfig.map((c: IItems) => {
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
      <button
        className="m-4 px-4 py-2 bg-purple-600 rounded-full shadow-md border border-purple-400"
        onClick={() => renderImage(assets[assetNum])}
      >
        + Add
      </button>
      <button
        className="m-4 px-4 py-2 bg-green-600 rounded-full shadow-md border border-green-500"
        onClick={renderTokensForOwner}
      >
        Connect Wallet
      </button>
    </main>
  );
};

export default Home;
