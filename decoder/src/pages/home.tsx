import { FC, useEffect, useState } from "react";
import BuilderConfig from "config";
import RenderItem from "utils/render-item";
import IWorkspace from "interfaces/workspace";
import { IInput, IOutput } from "interfaces/value";
import { Layout, Layouts, Responsive, WidthProvider } from "react-grid-layout";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { providerOptions } from "config/provider-options";

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
  const [nftPosition, setNftPosition] = useState<number>(3); // for storing NFT Layout's starting position
  // const [nftColumns, setNftColumns] = useState<number>(3); // for storing number of columns in NFT Layout
  const [nftCard, setNftCard] = useState<any>(null); // for creating a copy of NFT Card
  const [account, setAccount] = useState<string>(""); // for storing wallet address
  const [slug, setSlug] = useState<string>(""); // for storing collection slug
  const [source, setSource] = useState<string>("") // for api fetching source
  const [limit, setLimit] = useState<number>();
  const [cardsPerRow, setCardsPerRow] = useState<number>();
  const [layoutW, setLayoutW] = useState<number>(); // layout's width
  const [layoutX, setLayoutX] = useState<number>(); // layout's width
  // const [colW, setColW] = useState<number>()

  const connectWallet = async () => {
    try {
      const provider = await web3Modal.connect();
      const library: any = new ethers.providers.Web3Provider(provider); // required
      const accounts: any = await library.listAccounts(); // required
      if (accounts) setAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(testConfig)

  useEffect(() => {
    let nftY = null;
    testConfig
      .filter((i: IWorkspace) => i.nft && i.children)
      .map((i: IWorkspace) => {
        //  set nft layout starting position
        setNftPosition(i.y);
        i.children.map((item) => {
          if (item.nft && nftY === null) {
            nftY = item.y;
            setNftCard(item);
          }
          // user bdefore to count no. of columns for nft card in layout
          // if (item.nft && item.y === nftY) {
          //   nftCols++;
          // }
        });
        // remove the original NFT Layout
        setTestConfig(testConfig.filter((i: IWorkspace) => !i.nft));

        setCardsPerRow(i?.cardsPerRow)
        setLimit(i?.limit)
        setSource(i?.source)
        setLayoutW(i?.w)
        setLayoutX(i?.x)
        
        if (i.slug) {
          setSlug(i.slug);
        } else if (i.wallet) {
          setAccount(i.wallet);
        } else {
          if (!account) connectWallet();
        }
      });

  }, []);

  useEffect(() => {
    console.log(nftCard)
    if (nftCard && source ) {
      switch(source) {
        case 'Opensea':
          fetch(
            `https://testnets-api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=${limit}&collection=${slug}&include_orders=false`,
            { method: "GET", headers: { Accept: "application/json" } }
          )
            .then((response) => response.json())
            .then(({ assets }) => {
              renderTokensForOwner(assets);
            });
            break;
        case 'Rarible' :
          fetch(`https://api.rarible.org/v0.1/items/byCollection?collection=ETHEREUM%3A${slug}&size=${limit}`, 
          {
            method: 'GET',
            redirect: 'follow'
          })
          .then(response => response.json())
          .then(({items}) => {
            renderTokensForOwner(items);
          })
          .catch(error => console.log('error', error));
          break;
      }
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
  }, [account, nftCard]);

  // to persist layout changes
  const onLayoutChange = (layout: Layout[], layouts: Layouts) => {
    setTestConfig(testConfig);
  };

  // render nfts from connected wallet using opensea api
  const renderTokensForOwner = (assets: any[]) => {
    // calculating width of nftCard
    const colW = +(layoutW / +cardsPerRow).toFixed(1);
    let X = layoutX;

    let nCardsArr = assets.map((asset: any) => {
      let modifiedX = X;
      X = X + colW <= layoutW && X + colW < 6 ? X + colW : layoutX;

      let nftDetails = source === 'Opensea' ? {
        image: asset.asset_contract.image_url,
        collection: asset.asset_contract.name,
        title: asset.name,
        price: asset.last_sale?.payment_token.eth_price,
        highestBid: asset.top_bid,
        href: ``,
      } : {
        image: asset.meta.content[0].url,
        collection: asset.meta.name,
        title: asset.meta.name,
        price: asset.last_sale?.payment_token.eth_price,
        highestBid: asset.top_bid,
        href: `https://rarible.com/token/${asset.id.substr(9)}`,
      }

      return {
        ...nftCard,
        i: asset.id,
        x: modifiedX,
        y: nftPosition,
        w: colW,
        ...nftDetails
      };
    });

    // update position of other components
    let newItemsArr = testConfig.map((item: IWorkspace) => { 
      const { y } = item;
      if (y >= nCardsArr[0].y) {
        return {
          ...item,
          y:
            y +
            (nCardsArr.length / +cardsPerRow) * nCardsArr[0].h -
            nCardsArr[0].h,
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
        background: config.background,
      }}
    >
      <ResponsiveGridLayout
        layouts={{ lg: testConfig }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 6, md: 6, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={50}
        isDraggable={false}
        isResizable={false}
        compactType={null}
        margin={[0, 0]}
        className="overflow-hidden h-fit"
      >
        {testConfig.map((c: IWorkspace) => {
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
