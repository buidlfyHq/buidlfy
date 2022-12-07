import { FC } from 'react';
import { useSelector } from 'react-redux';
import StartModal from 'components/modals/start-modal';
import SelectTemplateModal from 'components/modals/select-template-modal';
import SingleTemplateDetails from 'components/modals/single-template-details';
import FinalModal from 'components/modals/final-modal';
import ListTemplate from 'components/modals/list-template';
import SelectWallet from 'components/modals/select-wallet';
import CheckoutModal from 'components/modals/checkout-modal';
import MintTemplateForm from 'components/modals/mint-template-form';
import MintedTemplate from 'components/modals/minted-template';
import MintingProgressModal from 'components/modals/minting-progress';
import PublishProgress from 'components/modals/publish-progress';
import SitePublishedModal from 'components/modals/site-published-modal';
import CompleteListing from 'components/modals/complete-listing';
import ListingReview from 'components/modals/listing-review';
import PublishConfirmModal from 'components/modals/publish-confirm';
import PublishFailed from 'components/modals/publish-failed';
import { IRootState } from 'redux/root-state.interface';

const RenderModal: FC = () => {
  const modalType = useSelector((state: IRootState) => state.modal.modalType);

  switch (modalType) {
    case 'start':
      return <StartModal />;
    case 'template':
      return <SelectTemplateModal />;
    case 'single':
      return <SingleTemplateDetails list={false} />;
    case 'list-single':
      return <SingleTemplateDetails list={true} />;
    case 'final':
      return <FinalModal />;
    case 'list-template-for-sale':
      return <ListTemplate />;
    case 'select-wallet':
      return <SelectWallet />;
    case 'checkout':
      return <CheckoutModal />;
    case 'mint-nft-form':
      return <MintTemplateForm />;
    case 'minted-complete':
      return <MintedTemplate />;
    case 'minting-progress':
      return <MintingProgressModal />;
    case 'publish-process':
      return <PublishProgress />;
    case 'publish-done':
      return <SitePublishedModal />;
    case 'complete-listing':
      return <CompleteListing />;
    case 'listing-review':
      return <ListingReview />;
    case 'publish-confirm':
      return <PublishConfirmModal />;
    case 'publish-failed':
      return <PublishFailed />;
    default:
      return <></>;
  }
};

export default RenderModal;
