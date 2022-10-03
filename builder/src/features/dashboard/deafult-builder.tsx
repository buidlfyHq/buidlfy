import React, { FC } from "react";
import feather from "assets/feather.png";
import { IoIosAddCircleOutline } from "react-icons/io";
import { SidebarEnum } from "redux/workspace/workspace.interfaces";
import "styles/components.css";

interface IDefaultBuilder {
  showSidebar?: () => void;
  setSideElement?: (sideElement?: string) => void;
}

const DefaultBuilder: FC<IDefaultBuilder> = ({
  showSidebar,
  setSideElement,
}) => {
  const handleSidebar = (selectedSidebarElements: string) => {
    setSideElement(selectedSidebarElements);
  };
  return (
    <section className="z-100">
      <section
        style={{
          width: "-webkit-fill-available",
        }}
        className="mt-[90px] z-[100] ml-[120px] mb-[20px] min-h-[87vh] main-section flex items-center justify-center mr-[290px]"
      >
        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="flex justify-center">
              <div className="feather-div">
                <img src={feather} style={{ width: "2rem" }} alt="default" />
              </div>
            </div>
            <h4 className="color-[#14142B] text-[18px] font-semibold mt-[1rem]">
              Please add your first element to start
            </h4>
            <h6 className="color-[#4E4B66] text-[15px] font-light mt-[0.5rem]">
              Click on the add elements button and start designing your site.
            </h6>
            <div className="flex justify-center">
              <button
                onClick={() => {
                  showSidebar();
                  handleSidebar(SidebarEnum.ELEMENTS);
                }}
                className="flex add-btn mt-[1.5rem]"
              >
                Add Elements
                <IoIosAddCircleOutline className="text-[18px] ml-1 mt-[4px]" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default DefaultBuilder;
