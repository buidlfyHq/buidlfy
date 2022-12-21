import { FC } from "react";
import IColor from '../../interfaces/color'

interface INftCard {
  image: string;
  collection: string;
  title: string;
  price: string;
  highestBid: string;
  href?: string;
  backgroundColor?: string;
  color?: string;
  backgroundSize?: string;
}

const NftCard: FC<INftCard> = ({
  image,
  collection,
  title,
  href,
  backgroundColor,
  color,
  backgroundSize
}) => {
  const gradientCondition = color?.indexOf("gradient") !== -1;
  return (
    <a href={href} target='_blank'>
    <div className="flex items-center justify-center h-full p-2">
        <div
          className="w-full h-full p-3 rounded-lg nft-card-shadow"
          style={{
            backgroundColor: backgroundColor.slice(0, 4) === "rgba" ? backgroundColor : null,
            // boxShadow: "0px 2px 7px rgba(0, 0, 0, 0.5)",
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
          <div className="w-auto h-[80%] nft-card rounded-lg overflow-hidden">
            <img
              className="flex w-full h-full mx-auto rounded-lg nft-card-img"
              style={{
                backgroundImage: `url(${image})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: 'center',
                backgroundSize: backgroundSize,
                // boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.5)",
              }}
            />
          </div>
          <div 
          style={{
            // textDecorationColor: `${gradientCondition ? "black" : color}`,
            // background: color,
            // WebkitTextFillColor: "transparent",
          }}
            className="flex flex-col justify-center items-start p-2 h-[20%]"
          >
            <div className="text-sm text-white/80">{collection}</div>
            <div className="text-xl font-bold text-white">{title}</div>
          </div>
          {/* <div
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
          </div> */}
        </div>
    </div>
      </a>
  );
};

export default NftCard;