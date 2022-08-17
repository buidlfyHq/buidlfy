import { FC, useEffect, useState } from "react";
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

  const [nftCard, setNftCard] = useState<any>({}); // for rendering nfts one by one

  useEffect(() => {
    let nftY = null;
    let nftCols = 0;
    testConfig.map((item) => {
      if (item.nft && nftY === null) {
        nftY = item.y;
        setNftCard(item);
      }
      if (item.nft && item.y === nftY) {
        nftCols++;
      }
    });
    setTestConfig(testConfig.filter((i) => !i.nft));
  }, []);

  console.log(testConfig);

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
        setAssets(assets);
      });
  };

  // create new nft component
  const renderImage = (attributes) => {
    let newC = {
      i: attributes.id,
      x: 0,
      y: 0,
      h: 6,
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
        justifyContent: "left",
        fontSize: 15,
        deleteComponent: 0,
        margin: {
          marginTop: 10,
          marginRight: 10,
          marginBottom: 10,
          marginLeft: 15,
          fontWeight: "normal",
        },
        padding: {
          paddingTop: 0,
          paddingRight: 0,
          paddingBottom: 0,
          paddingLeft: 0,
        },
      },
    };

    let textC = {
      i: attributes.id + "text",
      x: 0,
      y: 6,
      h: 1,
      w: 6,
      name: "Text",
      value: attributes.name,
      link: "",
      style: {
        backgroundColor: { r: "44", g: "44", b: "44", a: 1 },
        color: { r: "228", g: "228", b: "228", a: "1" },
        fontWeight: "bold",
        fontStyle: "normal",
        textDecoration: "none",
        justifyContent: "left",
        fontSize: 20,
        deleteComponent: 0,
        margin: {
          marginTop: 0,
          marginRight: 0,
          marginBottom: 0,
          marginLeft: 15,
        },
        padding: {
          paddingTop: 0,
          paddingRight: 0,
          paddingBottom: 0,
          paddingLeft: 10,
        },
      },
    };

    let parentComponent = {
      children: [newC, textC],
      i: attributes.id + "container",
      x: 0,
      y: 1,
      h: 7,
      w: 2,
      name: "Container",
      style: {
        backgroundColor: { r: "44", g: "44", b: "44", a: 1 },
        borderRadius: 6,
        borderWidth: 0,
        color: { r: "0", g: "0", b: "0", a: "100" },
        deleteComponent: 0,
        shadow: "none",
      },
    };

    let newItemsArr = testConfig.map((item) => {
      const { y } = item;
      if (y >= parentComponent.y) {
        return {
          ...item,
          y: y + parentComponent.h,
        };
      } else {
        return {
          ...item,
          y: y,
        };
      }
    });

    setTestConfig([...newItemsArr, parentComponent]);
    setAssetNum(assetNum + 1);
  };

  const renderNfts = (attributes) => {
    let nCard: any = {
      ...nftCard,
      i: attributes.id + "container",
      children: [
        {
          ...nftCard.children[0],
          i: attributes.id,
          imgData: attributes.image_url,
        },
        {
          ...nftCard.children[1],
          i: attributes.id + "text",
          value: attributes.name,
        },
      ],
    };

    let newItemsArr = testConfig.map((item) => {
      const { y } = item;
      if (y >= nCard.y) {
        return {
          ...item,
          y: y + nCard.h,
        };
      } else {
        return {
          ...item,
          y: y,
        };
      }
    });

    setTestConfig([...newItemsArr, nCard]);
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
        onClick={() => renderNfts(assets[assetNum])}
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
