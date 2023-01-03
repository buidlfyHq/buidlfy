import { FC } from 'react';
import { useSelector } from 'react-redux';

import { gradientCheck } from 'utils/gradient-check';
import { IRootState } from 'redux/root-state.interface';
import { IUploadedImageData, IWorkspaceElement } from 'redux/workspace/workspace.interfaces';
import DefaultImage from 'assets/nft-card-img.png';

interface INftCard {
  i: string;
  backgroundColor: string;
  color: string;
  imgData?: string | ArrayBuffer;
  justifyContent: string;
  backgroundSize?: string;
  isAuto?: boolean;
}

const NftCard: FC<INftCard> = ({ i, backgroundColor, color, imgData, justifyContent, backgroundSize, isAuto }) => {
  const selectedElement: IWorkspaceElement = useSelector((state: IRootState) => state.workspace.selectedElement);
  const imageData = useSelector((state: IRootState) =>
    state.workspace.uploadedImagesData.find((image: IUploadedImageData) => image.settingItemId === i),
  );
  const gradientCondition = color?.indexOf('gradient') !== -1;
  return (
    <section className="flex items-center justify-center h-full p-2" id="nft-card">
      <section
        className="w-full h-full p-3 rounded-lg bg-stone-700"
        style={{
          backgroundColor: backgroundColor,
          boxShadow: '0px 2px 7px rgba(0, 0, 0, 0.5)',
        }}
        id={i}
      >
        <div
          id={i}
          className="flex w-full h-[80%] rounded-lg h-full bg-white/100"
          style={{
            backgroundImage: `url(${imageData?.uploadedImageData ? imageData.uploadedImageData : DefaultImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: selectedElement?.style?.backgroundSize,
          }}
        />
        <div className="flex items-end justify-between p-2 h-[20%]">
          <div
            style={{
              WebkitTextFillColor: gradientCheck(color, false),
              textDecorationColor: `${gradientCondition ? 'black' : color}`,
            }}
            className="flex flex-col items-start justify-center"
            id="nft-card-details"
          >
            <div className="text-sm text-white/80" id="nft-card-collection">
              Collection
            </div>
            <div className="text-xl font-bold text-white" id="nft-card-name">
              Name
            </div>
          </div>
          <button
            style={{
              backgroundColor: color,
              color: backgroundColor,
            }}
            className="py-2 px-4 rounded-[8px]"
          >
            View Details
          </button>
        </div>
        {/* kept for later use */}
        {/* <div
          className="flex justify-around items-center text-center p-2 rounded-lg h-[15%] bg-white/10"
          style={{
            boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.5)',
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
