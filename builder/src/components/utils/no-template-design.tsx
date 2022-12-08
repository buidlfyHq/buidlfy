import { FC } from 'react';
import NoTemplateImg from 'assets/no-template-default.png';
import { ReactComponent as ColorFeather } from 'assets/svgAsIcons/feather.svg';
import { Link } from 'react-router-dom';

interface INoTemplateDesign {
  heading: string;
  desc: string;
  buttonText?: string;
}

const NoTemplateDesign: FC<INoTemplateDesign> = ({ heading, desc, buttonText }) => {
  return (
    <div className="flex flex-col items-center col-span-3">
      <img src={NoTemplateImg} alt="img_temp" width={264} height={60} className="my-5" />
      <div className="text-[24px] text-center gradient-text-no-template font-[600] mt-2">{heading}</div>
      <div className="text-[14px] text-center text-[#14142B] opacity-70 mt-2 px-2">{desc}</div>
      {buttonText && (
        <Link to="/">
          <div className="flex items-center gap-3 text-[14px] px-6 py-3 mt-6 connect-wallet-button font-[600] text-white rounded-[8px] cursor-pointer">
            {buttonText}
            <ColorFeather className="w-[18px]" />
          </div>
        </Link>
      )}
    </div>
  );
};

export default NoTemplateDesign;
