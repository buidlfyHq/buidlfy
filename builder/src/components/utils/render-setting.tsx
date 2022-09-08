import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { updateItems } from "redux/itemsReducer";
import ButtonSettings from "components/dashboard/button-settings";
import ImageSettings from "components/dashboard/image-settings";
import ContainerSettings from "components/dashboard/container-settings";
import InputSettings from "components/dashboard/input-settings";
import GeneralSettings from "components/dashboard/general-settings";
import ISettings from "interfaces/settings";
import "styles/components.css";
import "styles/dashboard.css";

const SettingComponent: FC<ISettings> = ({
  selectedItem,
  showComponent,
  setShowComponent,
  elementConfig,
  openTab,
  setOpenTab,
}) => {
  const dispatch = useDispatch();

  const handleTextChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    dispatch(
      updateItems({
        level: 0,
        settingItemId: selectedItem.i,
        propertyName: "value",
        propertyValue: e.target.value,
      })
    );
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateItems({
        level: 0,
        settingItemId: selectedItem.i,
        propertyName: "link",
        propertyValue: e.target.value,
      })
    );
  };

  const handlePlaceholderChange = (e) => {
    dispatch(
      updateItems({
        level: 0,
        settingItemId: selectedItem.i,
        propertyName: "placeholder",
        propertyValue: e.target.value,
      })
    );
  };

  switch (selectedItem?.name) {
    case "Button":
      return (
        <ButtonSettings
          handleTextChange={handleTextChange}
          handleLinkChange={handleLinkChange}
          selectedItem={selectedItem}
          showComponent={showComponent}
          setShowComponent={setShowComponent}
          elementConfig={elementConfig}
          openTab={openTab}
          setOpenTab={setOpenTab}
        />
      );

    case "Image":
      return <ImageSettings selectedItem={selectedItem} />;

    case "Container":
    case "Horizontal Container":
    case "Vertical Container":
      return <ContainerSettings selectedItem={selectedItem} />;

    case "Input":
      return (
        <InputSettings
          handlePlaceholderChange={handlePlaceholderChange}
          selectedItem={selectedItem}
        />
      );

    default:
      return (
        <GeneralSettings
          handleTextChange={handleTextChange}
          handleLinkChange={handleLinkChange}
          selectedItem={selectedItem}
        />
      );
  }
};

export default SettingComponent;
