import { FC } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "redux/root-state.interface";
import { IUploadedImageData, IWorkspaceElement } from "redux/workspace/workspace.interfaces";
import DefaultImage from 'assets/nft-card-img.png'

interface INftCard {
  i: string;
  backgroundColor: string;
  imgData?: string | ArrayBuffer;
  justifyContent: string;
  backgroundSize?: string;
  isAuto?: boolean; 
}

const NftCard: FC<INftCard> = ({
  i,
  backgroundColor, 
  imgData,
  justifyContent,
  backgroundSize,
  isAuto
}) => {
  console.log(imgData)
  const selectedElement: IWorkspaceElement = useSelector(
    (state: IRootState) => state.workspace.selectedElement
  );
  const imageData = useSelector((state: IRootState) =>
  state.workspace.uploadedImagesData.find(
    (image: IUploadedImageData) => image.settingItemId === i
  )
);
  return (
    <section
      className="flex items-center justify-center h-full p-2"
      id="nft-card"
    >
      <section
        className="w-full h-full p-3 rounded-lg bg-stone-700"
        style={{
          backgroundColor: backgroundColor,
          boxShadow: "0px 2px 7px rgba(0, 0, 0, 0.5)",
        }}
        id={i}
      >
        {/* <div
          id="image-one"
          className="flex items-center justify-center w-full h-[65%] rounded-lg"
          style={{
            backgroundImage: `url(${DefaultImage})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: selectedElement.style.backgroundSize,
          }}
        /> */}
        <div
        id={i}
        className="flex w-full h-[80%] rounded-lg h-full bg-white/100"
        style={{
          backgroundImage: `url(${
            imageData?.uploadedImageData ? imageData.uploadedImageData : DefaultImage
          })`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: 'center',
          backgroundSize: selectedElement?.style?.backgroundSize
        }}
        />
        {/* <div
          className="w-auto h-[65%] rounded-lg bg-white/30 flex justify-center items-center text-white p-4"
          style={{
            boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.5)",
          }}
          id="nft-card-image"
        >
          Your NFT will appear here
        </div> */}
        <div className="flex flex-col justify-center items-start p-2 h-[20%]" id="nft-card-details">
          <div className="text-sm text-white/80" id="nft-card-collection">
            Collection
          </div>
          <div className="text-xl font-bold text-white" id="nft-card-name">
            Name
          </div>
        </div>
        {/* <div
          className="flex justify-around items-center text-center p-2 rounded-lg h-[15%] bg-white/10"
          style={{
            // backgroundColor: `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, 0)`,
            boxShadow: "0px 2px 3px rgba(0, 0, 0, 0.5)",
          }}
          id="nft-card-details"
        >
          <div id="nft-card-price">
            <div className="text-sm text-white/80" id="nft-card-price">
              Price
            </div>
            <div className="font-bold text-white" id="nft-card-price-value">
              -- : --
            </div>
          </div>
          <div id="nft-card-price">
            <div className="text-sm text-white/80" id="nft-card-bid">
              Highest Bid
            </div>
            <div className="font-bold text-white" id="nft-card-bid-value">
              -- : --
            </div>
          </div>
        </div> */}
      </section>
    </section>
  );
};

export default NftCard;
