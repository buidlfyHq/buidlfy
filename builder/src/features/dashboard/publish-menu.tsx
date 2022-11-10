import { useDispatch } from "react-redux";
import { Menu } from "@headlessui/react";
import global from "assets/icons/global.svg";
import PublishButton from "components/utils/publish-button";
import { toggleModal, toggleModalType } from "redux/modal/modal.reducers";

const PublishMenu = () => {
  const dispatch = useDispatch();
  const handleConfirmPublish = () => {
    dispatch(toggleModal(true));
    dispatch(toggleModalType("publish-confirm"));
  };
  const handleNewPublish = () => {
    localStorage.removeItem("domain");
    localStorage.removeItem("domainName");
    dispatch(toggleModal(true));
    dispatch(toggleModalType("publish-confirm"));
  };
  const newPublishStatus = localStorage.getItem("publishStatus");
  const newDomainName = localStorage.getItem("domainName");

  const publishMenuItems = [
    {
      text: "Need to Re-Publish?",
      classParent:
        "border border-l-0 border-t-0 border-r-0 border-b-1 border-[#F5F5F5]",
      target: "/my-templates",
      isChildren: false,
      children: [],
      buttonText: "Re-publish site",
      handleClick: handleConfirmPublish,
    },
    {
      text: "Need to publish new site?",
      classParent: "mt-4 mb-2",
      target: "",
      isChildren: false,
      children: [],
      buttonText: "Publish site",
      handleClick: handleNewPublish,
    },
  ];
  return (
    <>
      {newPublishStatus ? (
        <Menu>
          <Menu.Button className="flex items-center justify-center my-2 ml-3 active:opacity-70">
            <PublishButton text="Publish" />
          </Menu.Button>
          <Menu.Items className="absolute top-0 right-0 flex flex-col mt-16 shadow-menu mr-5 rounded-[14px] w-[17.8rem] origin-top-right bg-white">
            <div className="border border-l-0 border-t-0 border-r-0 border-b-0 border-[#F5F5F5]">
              <div className="px-3 py-3 font-[16px]">
                <h5 className="text-[#14142B] text-[13px] opacity-50 ml-[0.5rem]">
                  Site is Published
                </h5>
                <div className="flex ml-[0.5rem] items-center gap-2 py-2 w-[17rem]">
                  <img className="w-4 rounded-full" src={global} alt="link" />
                  <a
                    target="_blank"
                    rel="noopener noreferrer external"
                    href={`https://${newDomainName}`}
                    className="gradient-text text-[11px] hover:text-[#5C59E5] cursor-pointer"
                  >
                    {'newDomainName'}
                  </a>
                </div>
              </div>
            </div>

            {publishMenuItems.map((menuItem, i) => {
              const { classParent, text, buttonText, handleClick } = menuItem;
              return (
                <Menu.Item key={i} as="div" className={classParent}>
                  <>
                    <h5 className="text-[#14142B] opacity-50 text-[13px] ml-[1.25rem]">
                      {text}
                    </h5>
                    <button
                      className="bordered-button py-3 px-[1rem] min-w-[15.5rem] ml-[1.2rem] mt-[0.5rem] mb-[1rem] ml-3 text-[14px] text-[#855FD8] font[500] rounded-[10px] whitespace-nowrap"
                      onClick={handleClick}
                    >
                      <span className="gradient-text">{buttonText}</span>
                    </button>
                  </>
                </Menu.Item>
              );
            })}
          </Menu.Items>
        </Menu>
      ) : (
        <PublishButton text="Publish" handleClick={handleNewPublish} />
      )}
    </>
  );
};

export default PublishMenu;
