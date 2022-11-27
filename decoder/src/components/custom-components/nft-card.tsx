import { FC } from "react";
import IColor from '../../interfaces/color'

interface INftCard {
  image: string;
  collection: string;
  title: string;
  price: string;
  highestBid: string;
  backgroundColor?: IColor;
}

const NftCard: FC<INftCard> = ({
  image,
  collection,
  title,
  price,
  highestBid,
  backgroundColor
}) => {
  return (
    <div className="flex items-center justify-center h-full p-2">
      <div
        className="w-full h-full p-2 rounded-lg bg-stone-700"
        style={{
          backgroundColor: `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})`,
          boxShadow: "0px 2px 7px rgba(0, 0, 0, 0.5)",
        }}
      >
        <div className="w-auto h-[65%]">
          <img
            src={image}
            className="w-auto h-full mx-auto rounded-lg"
            style={{
              boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.5)",
            }}
          />
        </div>
        <div className="text-center p-2 h-[20%]">
          <div className="text-sm text-white/80">{collection}</div>
          <div className="text-xl font-bold text-white">{title}</div>
        </div>
        <div
          className="flex justify-around items-center text-center bg-stone-600 p-1 rounded-lg h-[15%] bg-white/10"
          style={{
            boxShadow: "0px 2px 3px rgba(0, 0, 0, 0.5)",
          }}
        >
          <div>
            <div className="text-sm text-white/80">Price</div>
            <div className="font-bold text-white">
              {price ? `${Math.abs(parseInt(price))} ETH` : "NA"}
            </div>
          </div>
          <div>
            <div className="text-sm text-white/80">Highest Bid</div>
            <div className="font-bold text-white">
              {highestBid ? `${highestBid} ETH` : "No bids yet"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NftCard;