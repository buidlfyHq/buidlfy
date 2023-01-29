const fetchNFTs = (
  nftCard: any,
  source: string,
  limit: number,
  slug: string,
  account: string,
  renderTokensForOwner: (assets: any) => void
) => {
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
};

export default fetchNFTs;
