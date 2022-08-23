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
  const [inputVal, setInputVal] = useState("");
  const [nftCard, setNftCard] = useState<any>({}); // for rendering nfts one by one

  console.log(testConfig);
  

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
        // setAssets(assets);
        // set no. of cols
        // let cols = 6/colW
        // let colW = 6 / nftCard?.columns;
        let colW = 1;
        let X = 0;
        let nCardsArr = assets.map((asset: any, index: number) => {
          // check config y if any other elements present above it
          // let minY = Math.min(testConfig.map((item) => item.y))
          // let el = testConfig.children?.filter((item) => item.y === minY)[0];
          // let height = el ? el.h + el.y : 0

          let modifiedX = X;
          X = X + colW;
          X = X + colW <= 6 ? X : 0;
          return {
            ...nftCard,
            i: asset.id,
            x: modifiedX,
            w: colW,
            image: asset.image_url,
            title: asset.name,
            price: asset.traits[0].value
          };
        });

        let newItemsArr = testConfig.map((item) => {
          const { y } = item;
          if (y >= nCardsArr[0].y) {
            return {
              ...item,
              y: y + nCardsArr.length * nCardsArr[0].h,
            };
          } else {
            return {
              ...item,
              y: y,
            };
          }
        });

        setTestConfig([...newItemsArr, ...nCardsArr]);
      });
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
        className="overflow-hidden h-fit"
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
      <div>
        <input
          type="text"
          className="px-2 py-1 ml-2 border"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
        />
        <button
          className="px-4 py-2 m-4 text-white bg-purple-600 rounded-full"
          onClick={renderTokensForOwner}
        >
          Fetch
        </button>
      </div>
      {/* <button
        className="px-4 py-2 m-4 bg-purple-600 border border-purple-400 rounded-full shadow-md"
        onClick={() => renderNfts(assets[assetNum])}
      >
        + Add
      </button>
      <button
        className="px-4 py-2 m-4 bg-green-600 border border-green-500 rounded-full shadow-md"
        onClick={renderTokensForOwner}
      >
        Connect Wallet
      </button> */}
    </main>
  );
};

export default Home;
