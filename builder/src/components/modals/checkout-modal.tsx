import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ethers } from "ethers";
import { Dialog } from "@headlessui/react";
import makeBlockie from "ethereum-blockies-base64";
import { truncateString } from "utils/truncate-string";
import { buyTemplate } from "redux/template/template.actions";
import { toggleModalType } from "redux/modal/modal.reducers";
import { setSelectedTemplate } from "redux/template/template.reducers";
import { SelectedTemplateDto } from "redux/template/template.dto";
import { IRootState } from "redux/root-state.interface";

const CheckoutModal: FC = () => {
  const dispatch = useDispatch();
  const currentAccount = useSelector(
    (state: IRootState) => state.web3.currentAccount
  );
  const currentAccountBalance = useSelector(
    (state: IRootState) => state.web3.currentAccountBalance
  );
  const templateList = useSelector(
    (state: IRootState) => state.template.templateList
  );
  const selectedTemplate = useSelector(
    (state: IRootState) => state.template.selectedTemplate
  );
  const selectedTemplateDto = new SelectedTemplateDto(selectedTemplate);
  const amount = parseFloat(
    ethers.utils.formatUnits(selectedTemplateDto.buyoutPricePerToken)
  );

  useEffect(() => {
    const isOwned = templateList.filter(
      (template) =>
        template.listing_tokenId == selectedTemplateDto.listingTokenId
    )[0];
    if (isOwned) {
      dispatch(setSelectedTemplate(isOwned));
    }
  }, [templateList]);

  return (
    <Dialog.Panel className="flex flex-col justify-center items-center w-full max-w-[342px] my-20 mx-28 rounded-[15px] py-8 px-5 bg-white">
      <div className="w-full">
        <div className="flex flex-col">
          <div className="text-[#1C1C1E] font-[600] text-[18px]">Checkout</div>
          <div className="text-[#4E4B66] opacity-70 text-[12px]">
            You are about to purchase{" "}
            <span className="text-[#4E4B66] opacity-100 font-[600]">
              {selectedTemplateDto.name}
            </span>{" "}
            from
          </div>
          <div className="flex items-center mt-2">
            <div className="bg-[#9CB0D7] w-[32px] h-[32px] rounded-[50%] mt-30">
              {" "}
            </div>
            <div className="ml-2 text-[12px] text-[#14142B] opacity-70">
              {truncateString(selectedTemplateDto?.tokenOwner)}
            </div>
          </div>
          <div className="mt-5 flex items-center bg-[#F8F8FD] rounded-[7px] p-4 text-[18px]">
            <img
              className="bg-black w-8 h-8 rounded-full"
              src={makeBlockie(currentAccount)}
              alt="Blockie"
            />
            <div className="flex flex-col justify-start ml-2 text-[12px]">
              <div className="flex items-center">
                <div className="text-[#AEAEB2]">
                  {truncateString(currentAccount)}
                </div>
                <div className="text-white text-[10px] bg-[#1B7D66] rounded-[4px] px-2 py-1 ml-3">
                  Connected
                </div>
              </div>
              <div className="text-[#14142B] opacity-70 text-[12px]">
                {parseFloat(currentAccountBalance.toString()).toFixed(2)} USDT
              </div>
            </div>
          </div>
          {selectedTemplateDto?.isOwned ? (
            <>
              <div>Template already purchased.</div>
              <div
                onClick={() => dispatch(toggleModalType("single"))}
                className="text-white cursor-pointer connect-wallet-button py-3 px-auto rounded-[7px] mt-8 text-center"
              >
                View Template
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between mt-5">
                <div className="text-[#8E8E93] text-[14px]">Amount</div>
                <div className="text-[#1C1C1E] text-[14px] font-[500]">
                  {amount} USDC
                </div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="text-[#8E8E93] text-[14px]">
                  Platform Fee (5%)
                </div>
                <div className="text-[#1C1C1E] text-[14px] font-[500]">
                  {0.05 * amount} USDC
                </div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="text-[#1C1C1E] text-[14px] font-[500]">
                  Total
                </div>
                <div className="text-[#34C759] text-[14px] font-[500]">
                  {amount + 0.05 * amount} USDC
                </div>
              </div>
              <div
                onClick={() => dispatch(buyTemplate())}
                className="text-white cursor-pointer connect-wallet-button py-3 px-auto rounded-[7px] mt-8 text-center"
              >
                Buy Now
              </div>
            </>
          )}
        </div>
      </div>
    </Dialog.Panel>
  );
};

export default CheckoutModal;
