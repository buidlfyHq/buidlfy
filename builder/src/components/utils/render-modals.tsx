import { FC } from "react";
import { useSelector } from "react-redux";
import StartModal from "components/modals/start-modal";
import SelectTemplateModal from "components/modals/select-template-modal";
import SingleTemplateDetails from "components/modals/single-template-details";
import FinalModal from "components/modals/final-modal";
import ListTemplate from "components/modals/list-template";
import SelectWallet from "components/modals/select-wallet";
import { IRootState } from "redux/root-state.interface";
import CheckoutModal from "components/modals/checkout-modal";
import MintTemplateModal from "components/modals/mint-template-form";
import MintedTemplateModal from "components/modals/minted-template";
import MintingProgressModal from "components/modals/minting-progress";
import PublishingProcessModal from "components/modals/publish-process";
import PublishSiteModal from "components/modals/publish-site";
import SitePublishedModal from "components/modals/site-published-modal";

interface IRenderModal{
  generatedConfig?: string
}

const RenderModal: FC<IRenderModal> = ({generatedConfig}) => {
  const modalType = useSelector((state: IRootState) => state.modal.modalType);

  switch (modalType) {
    case "start":
      return <StartModal />;
    case "template":
      return <SelectTemplateModal />;
    case "single":
      return <SingleTemplateDetails list={false} />;
    case "list-single":
      return <SingleTemplateDetails list={true} />;
    case "final":
      return <FinalModal />;
    case "list-template-for-sale":
      return <ListTemplate />
    case "select-wallet":
      return <SelectWallet />
    case "checkout": 
      return <CheckoutModal />
    case "mint-nft-form": 
      return <MintTemplateModal />
    case "minted-complete":
      return <MintedTemplateModal />
    case "minting-progress": 
      return <MintingProgressModal />
    case "publish-process":
      return <PublishSiteModal generatedConfig={generatedConfig} />
    case "publish-done":
      return <SitePublishedModal />
    default:
      return <></>;
  }
};

export default RenderModal;