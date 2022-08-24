import React from "react";
import NFT from "assets/nft.jpg";

const NftCard = () => {
  return (
    <section className="flex justify-center items-center h-full p-2">
      <section
        className="bg-stone-700 w-full h-full p-2 rounded-lg"
        style={{
          boxShadow: "0px 2px 7px rgba(0, 0, 0, 0.5)",
        }}
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
        >
          Your NFT will appear here
        </div>
        <div className="text-center p-2 h-[20%]">
          <div className="text-white/80 text-sm">Collection</div>
          <div className="text-white font-bold text-xl">Name</div>
        </div>
        <div
          className="flex justify-around items-center text-center bg-stone-600 p-2 rounded-lg h-[15%]"
          style={{
            boxShadow: "0px 2px 3px rgba(0, 0, 0, 0.5)",
          }}
        >
          <div>
            <div className="text-white/80 text-sm">Price</div>
            <div className="text-white font-bold">-- : --</div>
          </div>
          <div>
            <div className="text-white/80 text-sm">Highest Bid</div>
            <div className="text-white font-bold">-- : --</div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default NftCard;
