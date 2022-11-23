import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateWorkspaceElement } from "redux/workspace/workspace.reducers";
import ButtonSettings from "components/dashboard/button-settings";
import ImageSettings from "components/dashboard/image-settings";
import ContainerSettings from "components/dashboard/container-settings";
import InputSettings from "components/dashboard/input-settings";
import GeneralSettings from "components/dashboard/general-settings";
import { IRootState } from "redux/root-state.interface";
import { ISettings } from "redux/workspace/workspace.interfaces";
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
  SMALL = "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  MEDIUM = "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  LARGE = "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
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

const SettingComponent: FC<ISettings> = ({ openTab, setOpenTab }) => {
  const dispatch = useDispatch();
  const selectedElement = useSelector(
    (state: IRootState) => state.workspace.selectedElement
  );

  const handleSettingChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    propertyName: string
  ) => {
    dispatch(
      updateWorkspaceElement({
        settingItemId: selectedElement.i,
        propertyName,
        propertyValue: e.target.value,
      })
    );
  };

  switch (selectedElement.name) {
    case "Button":
      return (
        <ButtonSettings
          handleSettingChange={handleSettingChange}
          openTab={openTab}
          setOpenTab={setOpenTab}
        />
      );
    case "Image":
      return <ImageSettings handleSettingChange={handleSettingChange} />;

    case "Container":
    case "Horizontal Container":
    case "Vertical Container":
      return <ContainerSettings />;
    case "Wall Of Love":
      return (
        <h3 className="ml-[0.5rem] mt-[1.5rem]">
          {selectedElement ? (
            <span className="setting-text">{selectedElement.name}</span>
          ) : null}
        </h3>
      );
    case "Input":
      return <InputSettings handleSettingChange={handleSettingChange} />;

    default:
      return <GeneralSettings handleSettingChange={handleSettingChange} />;
  }
};

export default SettingComponent;
