import { FC, useEffect, useState } from "react";
import { Layout, Layouts, Responsive, WidthProvider } from "react-grid-layout";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import BuilderConfig from "config";
import { providerOptions } from "config/provider-options";
import RenderItem from "utils/render-item";
import IItems from "interfaces/items";
import { IInput, IOutput } from "interfaces/value";

const web3Modal = new Web3Modal({
  cacheProvider: true, // optional
  providerOptions, // required
});

const ResponsiveGridLayout = WidthProvider(Responsive); // for responsive grid layout

const Home: FC = () => {
  const config = JSON.parse(BuilderConfig);
  const [inputValue, setInputValue] = useState<IInput[]>([]);
  const [outputValue, setOutputValue] = useState<IOutput[]>([]);
  const [testConfig, setTestConfig] = useState(
    JSON.parse(BuilderConfig).builder
  );
  const [nftPosition, setNftPosition] = useState<number>(3);
  const [nftColumns, setNftColumns] = useState<number>(3);
  const [nftCard, setNftCard] = useState<any>(null);
  const [account, setAccount] = useState<string>("");
  const [slug, setSlug] = useState<string>("");

  const connectWalletButton = async () => {
    try {
      const provider = await web3Modal.connect();
      const library: any = new ethers.providers.Web3Provider(provider); // required
      const accounts: any = await library.listAccounts(); // required
      if (accounts) setAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let nftY = null;
    let nftCols = 0;
    testConfig
      .filter((i) => i.nft && i.children)
      .map((i) => {
        setNftPosition(i.y);
        i.children.map((item) => {
          if (item.nft && nftY === null) {
            nftY = item.y;
            setNftCard(item);
          }
          if (item.nft && item.y === nftY) {
            nftCols++;
          }
        });
        setTestConfig(testConfig.filter((i) => !i.nft));

        const hasSlug = i.children.filter(
          (item: { slug: string }) => item.slug
        );
        const hasWallet = i.children.filter(
          (item: { wallet: string }) => item.wallet && item.wallet !== "wallet"
        );

        if (hasSlug) {
          setSlug(hasSlug[0]?.slug);
        }
        if (hasWallet) {
          setAccount(hasWallet[0]?.wallet);
        } else {
          if (!account) connectWalletButton();
        }
      });

    setNftColumns(nftCols);
  }, []);

  useEffect(() => {
    if (nftCard && slug) {
      fetch(
        `https://testnets-api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=20&collection=${slug}&include_orders=false`,
        { method: "GET", headers: { Accept: "application/json" } }
      )
        .then((response) => response.json())
        .then(({ assets }) => {
          renderTokensForOwner(assets);
        });
    } else if (nftCard && account) {
      fetch(
        `https://testnets-api.opensea.io/api/v1/assets?owner=${account}&order_direction=desc&offset=0&limit=20&include_orders=false`,
        { method: "GET", headers: { Accept: "application/json" } }
      )
        .then((response) => response.json())
        .then(({ assets }) => {
          renderTokensForOwner(assets);
        });
    }
  }, [nftCard, account]);

  // to persist layout changes
  const onLayoutChange = (layout: Layout[], layouts: Layouts) => {
    setTestConfig(testConfig);
  };

  // render nfts from connected wallet using opensea api
  const renderTokensForOwner = (assets) => {
    const colW = Math.ceil(6 / nftColumns);
    let X = 0;

    let nCardsArr = assets.map((asset: any, index: number) => {
      let modifiedX = X;
      X = X + colW;
      X = X + colW <= 6 ? X : 0;

      return {
        ...nftCard,
        i: asset.id,
        x: modifiedX,
        y: nftPosition,
        w: colW,
        image: asset.image_url,
        collection: asset.asset_contract.name,
        title: asset.name,
        price: asset.last_sale?.payment_token.eth_price,
        highestBid: asset.top_bid,
      };
    });

    let newItemsArr = testConfig.map((item: IItems) => {
      const { y } = item;
      if (y >= nCardsArr[0].y) {
        const diff = y - nftPosition;
        return {
          ...item,
          y:
            y +
            Math.ceil(nCardsArr.length / nftColumns) * nCardsArr[0].h -
            diff,
        };
      } else {
        return {
          ...item,
          y: y,
        };
      }
    });

    setTestConfig([...newItemsArr, ...nCardsArr]);
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
    </main>
  );
};

export default Home;
