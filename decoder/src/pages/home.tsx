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

  const [nftCard, setNftCard] = useState<any>({});
  const [nftX, setNftX] = useState(0);
  const [nftY, setNftY] = useState(null);
  const [nftCols, setNftCols] = useState(0);

  useEffect(() => {
    let itemY = nftY;
    let itemCols = nftCols;
    testConfig.map((item) => {
      if (item.nft && itemY === null) {
        itemY = item.y;
        setNftCard(item);
      }
      if (item.nft && item.y === itemY) {
        itemCols++;
      }
    });
    setNftY(itemY);
    setNftCols(itemCols);

    // delete default nft containers
    setTestConfig(testConfig.filter((i) => !i.nft));
  }, []);

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

  const renderNfts = (attributes) => {
    if (nftX / nftCard.w < nftCols - 1) {
      setNftX(nftX + nftCard.w);
    } else {
      setNftX(0);
      setNftY(nftY + nftCard.h);
    }

    let nCard: any = {
      ...nftCard,
      x: nftX,
      y: nftY,
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
      if (!item.nft && y >= nCard.y) {
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
