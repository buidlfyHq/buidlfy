import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { updateItems } from "reducers/itemsReducer";
import ButtonSettings from "components/dashboard/button-settings";
import ImageSettings from "components/dashboard/image-settings";
import ContainerSettings from "components/dashboard/container-settings";
import InputSettings from "components/dashboard/input-settings";
import GeneralSettings from "components/dashboard/general-settings";
import ISettings from "interfaces/settings";
import "styles/components.css";
import "styles/dashboard.css";

export enum ReplaceValue {
  INCREMENT = "increment",
  DECREMENT = "decrement",
  CHANGE = "change",
}
export enum ReplaceSpacingValue {
  LEFT = "left",
  RIGHT = "right",
  TOP = "top",
  BOTTOM = "bottom",
  INCREMENTLEFT = "incrementLeft",
  INCREMENTRIGHT = "incrementRight",
  INCREMENTTOP = "incrementTop",
  INCREMENTBOTTOM = "incrementBottom",
  DECREMENTLEFT = "decrementLeft",
  DECREMENTRIGHT = "decrementRight",
  DECREMENTTOP = "decrementTop",
  DECREMENTBOTTOM = "decrementBottom",
}
export enum ReplaceStyle {
  BOLD = "bold",
  ITALIC = "italic",
  UNDERLINE = "underline",
  LEFT = "left",
  RIGHT = "right",
  CENTER = "center",
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
  TRUE = "true",
  FALSE = "false",
  COVER = "cover",
  CONTAIN = "contain",
  AUTO = "auto",
  WIDTH = "width",
  HEIGHT = "height",
  INCREMENTWIDTH = "incrementWidth",
  INCREMENTHEIGHT = "incrementHeight",
  DECREMENTWIDTH = "decrementWidth",
  DECREMENTHEIGHT = "decrementHeight",
}

const SettingComponent: FC<ISettings> = ({
  selectedItem,
  elementConfig,
  openTab,
  setOpenTab,
}) => {
  const dispatch = useDispatch();

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    propertyName: string
  ) => {
    dispatch(
      updateItems({
        level: 0,
        settingItemId: selectedItem.i,
        propertyName,
        propertyValue: e.target.value,
      })
    );
  };

  switch (selectedItem.name) {
    case "Button":
      return (
        <ButtonSettings
          handleChange={handleChange}
          selectedItem={selectedItem}
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
          handleChange={handleChange}
          selectedItem={selectedItem}
        />
      );
    default:
      return (
        <GeneralSettings
          handleChange={handleChange}
          selectedItem={selectedItem}
        />
      );
  }
};

export default SettingComponent;
