import { FC } from 'react';
import { Dialog } from '@headlessui/react';
import LensterHelp from 'assets/help-lenster.png';
import LensterLogo from 'assets/lenster-logo.png';

interface ILensterHelpModal {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const helpSteps = [
  {
    count: '1',
    heading: 'Open Lenster Websit',
    desc: 'To create your wall of love, you need to first open the Lenster’s website:',
    link: 'https://lenster.xyz/',
    query: '',
  },
  {
    count: '2',
    heading: 'Click on any post that you want to add on your wall of love',
    desc: 'Create a new post as a testimonial to add it in your website',
    link: 'https://lenster.xyz/post',
    query: '',
  },
  {
    count: '3',
    heading: 'Copy the unique Id of the Lenster’s post',
    desc: 'To create a wall of love you need to first post some testimonials on lenster, then you can copy those testimonials on your website',
    link: 'https://lenster.xyz/post/',
    query: '0xf976-0xaa',
  },
];

const LensterHelpModal: FC<ILensterHelpModal> = ({ isOpen, setIsOpen }) => {
  return (
    <Dialog as="div" className="fixed inset-0 z-20 overflow-y-auto" open={isOpen} onClose={() => setIsOpen(false)}>
      <div className="min-h-screen px-4 text-right">
        {/* This element is to trick the browser into centering the modal contents. */}
        <span className="inline-block h-screen align-middle" aria-hidden="true">
          &#8203;
        </span>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-10" />
        <section className="inline-block w-[400px] mr-[16rem]  max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-menu border rounded-2xl">
          <img src={LensterHelp} alt="help_image" height={200} />
          <div className="mt-1">
            {helpSteps.map(step => {
              const { count, heading, desc, link, query } = step;
              return (
                <div className="mt-4" key={count}>
                  <span className="text-[12px] text-[#5E5CE8] py-1 px-3 bg-[#F9F5FF] font-[600] rounded-[16px]">Step {count}</span>
                  <div className="text-[#101828] text-[16px] font-[500] ml-1 mt-2">{heading}</div>
                  <div className="text-[#667085] text-[14px] mt-2 ml-1">{desc}</div>
                  <div className="flex items-center mt-2 gap-2">
                    <img src={LensterLogo} alt="lenster_icon" width={24} height={24} />
                    <a
                      href={`${link}${query}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#5C83E8] text-[14px] font-[600] ouline-none border-none"
                    >
                      {link}
                      <span className="text-[#C656D9]">{query}</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </Dialog>
  );
};

export default LensterHelpModal;
