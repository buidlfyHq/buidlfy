import React from "react";

const NftCard = ({
  backgroundColor
}) => {
  return (
    <section className="flex items-center justify-center h-full p-2" id="nft-card">
      <section
        className="w-full h-full p-2 rounded-lg bg-stone-700"
        style={{
          backgroundColor: `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})`,
          boxShadow: "0px 2px 7px rgba(0, 0, 0, 0.5)",
        }}
        id="nft-card"
      >
        {/* <div
          id="image-one"
          className="items-center justify-center w-auto h-[65%] rounded-lg"
          style={{
            backgroundImage: `url(${NFT})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
          }}
        /> */}
        <div
          className="w-auto h-[65%] rounded-lg bg-white/30 flex justify-center items-center text-white p-4"
          style={{
            boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.5)",
          }}
          id="nft-card-image"
        >
          Your NFT will appear here
        </div>
        <div className="text-center p-2 h-[20%]" id="nft-card-details">
          <div className="text-sm text-white/80" id="nft-card-collection">Collection</div>
          <div className="text-xl font-bold text-white" id="nft-card-name">Name</div>
        </div>
        <div
          className="flex justify-around items-center text-center p-2 rounded-lg h-[15%] bg-white/10"
          style={{
            // backgroundColor: `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, 0)`,
            boxShadow: "0px 2px 3px rgba(0, 0, 0, 0.5)",
          }}
          id="nft-card-details"
        >
          <div id="nft-card-price">
            <div className="text-sm text-white/80" id="nft-card-price">Price</div>
            <div className="font-bold text-white" id="nft-card-price-value">-- : --</div>
          </div>
          <div id="nft-card-price">
            <div className="text-sm text-white/80" id="nft-card-bid">Highest Bid</div>
            <div className="font-bold text-white" id="nft-card-bid-value">-- : --</div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default NftCard;
