const NftCard = ({ image, collection, title, price, highestBid }) => {
  return (
    <div className="flex justify-center items-center h-full p-2">
      <div
        className="bg-stone-700 w-full h-full p-2 rounded-lg"
        style={{
          boxShadow: "0px 2px 7px rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* <div
          id="image-one"
          className="items-center justify-center w-auto h-[65%] rounded-lg"
          style={{
            backgroundImage: `url(${image ? image : defaultImage})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
            boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.5)",
          }}
        /> */}
        <div className="w-auto h-[65%]">
          <img
            src={image}
            className="h-full w-auto mx-auto rounded-lg"
            style={{
              boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.5)",
            }}
          />
        </div>
        <div className="text-center p-2 h-[20%]">
          <div className="text-white/80 text-sm">{collection}</div>
          <div className="text-white font-bold text-xl">{title}</div>
        </div>
        <div
          className="flex justify-around items-center text-center bg-stone-600 p-1 rounded-lg h-[15%]"
          style={{
            boxShadow: "0px 2px 3px rgba(0, 0, 0, 0.5)",
          }}
        >
          <div>
            <div className="text-white/80 text-sm">Price</div>
            <div className="text-white font-bold">{price} ETH</div>
          </div>
          <div>
            <div className="text-white/80 text-sm">Highest Bid</div>
            <div className="text-white font-bold">{highestBid ? `${highestBid} ETH` : 'NA'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NftCard;
