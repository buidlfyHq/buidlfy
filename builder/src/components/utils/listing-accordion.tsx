import { FC } from 'react';
import { useSelector } from 'react-redux';
import Spinner from './assets/spinner';
import { IRootState } from 'redux/root-state.interface';
import Approve1 from 'assets/approve-1.png';
import Approve2 from 'assets/approve-2.png';

interface IListingAccordion {
  isApprove: boolean;
  title: string;
  description: string;
}

const ListingAccordion: FC<IListingAccordion> = ({ isApprove, title, description }) => {
  const approveListingLoading = useSelector((state: IRootState) => state.minted.approveListingLoading);
  const listTemplateLoading = useSelector((state: IRootState) => state.minted.listTemplateLoading);

  return (
    <aside className="flex gap-5 py-5">
      <div>
        <img src={isApprove ? Approve1 : Approve2} alt="icon" width={isApprove ? 35 : 24} height={isApprove ? 35 : 24} />
      </div>
      <div className="flex flex-col items-start">
        <div className="text-[#202525] font-[500] text-[14px]">{title}</div>
        <div className="text-[#14142B] opacity-50 text-[13px] mt-2.5">{description}</div>
        {isApprove && approveListingLoading && (
          <div className="flex items-center gap-2 px-3.5 cursor-pointer py-3 bg-gray-200 text-[#14142B] mt-4 font-[500] text-[13px] rounded-[4px]">
            <Spinner />
            <span>Waiting for Approval...</span>
          </div>
        )}
        {!isApprove && !approveListingLoading && listTemplateLoading && (
          <div className="flex items-center gap-2 px-3.5 cursor-pointer py-5 bg-gray-200 text-[#14142B] mt-4 font-[500] text-[13px] rounded-[4px]">
            <Spinner />
            <span>Confirming...</span>
          </div>
        )}
      </div>
    </aside>
  );
};

export default ListingAccordion;
