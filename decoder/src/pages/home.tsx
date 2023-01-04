import { FC, useState, useEffect } from "react";
import { useWindowSize } from "hooks/use-window-size";
import BuilderConfig from "config";
import RenderItem from "utils/render-item";
import IWorkspace from "interfaces/workspace";
import { IInput, IOutput } from "interfaces/value";
import { Layout, Layouts, Responsive, WidthProvider } from "react-grid-layout";
import { connectWalletButton } from "utils/connectWallet";

const ResponsiveGridLayout = WidthProvider(Responsive); // for responsive grid layout

const Home: FC = () => {
  const projectConfig = JSON.parse(BuilderConfig);
  const size = useWindowSize();
  const [inputValue, setInputValue] = useState<IInput[]>([]);
  const [outputValue, setOutputValue] = useState<IOutput[]>([]);
  const [workspaceConfig, setWorkspaceConfig] = useState(projectConfig.builder);
  const [nftPosition, setNftPosition] = useState<number>(3); // for storing NFT Layout's starting position
  const [nftCard, setNftCard] = useState<any>(null); // for creating a copy of NFT Card
  const [account, setAccount] = useState<string>(""); // for storing wallet address
  const [slug, setSlug] = useState<string>(""); // for storing collection slug
  const [source, setSource] = useState<string>(""); // for api fetching source
  const [limit, setLimit] = useState<number>(); // size require for api fetch
  const [cardsPerRow, setCardsPerRow] = useState<number>(); // cards in a row
  const [layoutW, setLayoutW] = useState<number>(); // layout's width
  const [layoutX, setLayoutX] = useState<number>(); // layout's width

  useEffect(() => {
    let nftY = null;
    workspaceConfig
      .filter((i: IWorkspace) => i.nft && i.children)
      .map((i: IWorkspace) => {
        //  set nft layout starting position
        setNftPosition(i.y);
        i.children.map((item) => {
          if (item.nft && nftY === null) {
            nftY = item.y;
            setNftCard(item);
          }
        });
        // remove the original NFT Layout
        setWorkspaceConfig(workspaceConfig.filter((i: IWorkspace) => !i.nft));
        setCardsPerRow(i?.cardsPerRow);
        setLimit(i?.limit);
        setSource(i?.source);
        setLayoutW(i?.w);
        setLayoutX(i?.x);

        if (i.slug) {
          setSlug(i.slug);
        } else if (i.wallet) {
          setAccount(i.wallet);
        } else {
          if (!account) connectWalletButton(setAccount);
        }
      });
  }, []);

  useEffect(() => {
    if (nftCard && source) {
      switch (source) {
        case "Opensea":
          fetch(
            `https://testnets-api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=${limit}&collection=${slug}&include_orders=false`,
            { method: "GET", headers: { Accept: "application/json" } }
          )
            .then((response) => response.json())
            .then(({ assets }) => {
              renderTokensForOwner(assets);
            });
          break;
        case "Rarible":
          fetch(
            `https://api.rarible.org/v0.1/items/byCollection?collection=ETHEREUM%3A${slug}&size=${limit}`,
            {
              method: "GET",
              redirect: "follow",
            }
          )
            .then((response) => response.json())
            .then(({ items }) => {
              renderTokensForOwner(items);
            })
            .catch((error) => console.log("error", error));
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
    setWorkspaceConfig(workspaceConfig);
  };

  // render nfts from connected wallet using opensea api
  const renderTokensForOwner = (assets: any[]) => {
    // calculating width of nftCard
    const colW = +(layoutW / +cardsPerRow).toFixed(1);
    let X = layoutX;

    let nCardsArr = assets.map((asset: any) => {
      let modifiedX = X;
      X = X + colW <= layoutW && X + colW < 6 ? X + colW : layoutX;

      let nftDetails =
        source === "Opensea"
          ? {
              image: asset.asset_contract.image_url,
              collection: asset.asset_contract.name,
              title: asset.name,
              price: asset.last_sale?.payment_token.eth_price,
              highestBid: asset.top_bid,
              href: ``,
            }
          : {
              image: asset.meta.content[0].url,
              collection: asset.meta.name,
              title: asset.meta.name,
              price: asset.last_sale?.payment_token.eth_price,
              highestBid: asset.top_bid,
              href: `https://rarible.com/token/${asset.id.substr(9)}`,
            };

      return {
        ...nftCard,
        i: asset.id,
        x: modifiedX,
        y: nftPosition,
        w: colW,
        ...nftDetails,
      };
    });

    // update position of other components
    let newItemsArr = workspaceConfig.map((item: IWorkspace) => {
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

    setWorkspaceConfig([...newItemsArr, ...nCardsArr]);
  };

  return (
    <>
      {size.width > 1024 ? (
        <main
          className="min-h-screen"
          style={{
            background: projectConfig.background,
          }}
        >
          <ResponsiveGridLayout
            layouts={{ lg: workspaceConfig }}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 6, md: 6, sm: 6, xs: 4, xxs: 2 }}
            rowHeight={50}
            isDraggable={false}
            isResizable={false}
            compactType={null}
            margin={[0, 0]}
            className="overflow-hidden h-fit"
          >
            {workspaceConfig.map((c: IWorkspace) => {
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
