import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateWorkspaceElement } from "redux/workspace/workspace.reducers";
import ButtonSettings from "components/dashboard/button-settings";
import ImageSettings from "components/dashboard/image-settings";
import ContainerSettings from "components/dashboard/container-settings";
import InputSettings from "components/dashboard/input-settings";
import GeneralSettings from "components/dashboard/general-settings";
import { IWorkspaceElements } from "redux/workspace/workspace.interfaces";
import ISettings from "interfaces/settings";
import "styles/components.css";
import "styles/dashboard.css";

const SettingComponent: FC<ISettings> = ({
  showComponent,
  setShowComponent,
  openTab,
  setOpenTab,
}) => {
  const dispatch = useDispatch();
  const selectedItem: IWorkspaceElements = useSelector(
    (state: any) => state.workspace.selectedElement
  );

  const handleTextChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    dispatch(
      updateWorkspaceElement({
        settingItemId: selectedItem.i,
        propertyName: "value",
        propertyValue: e.target.value,
      })
    );
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateWorkspaceElement({
        settingItemId: selectedItem.i,
        propertyName: "link",
        propertyValue: e.target.value,
      })
    );
  };

  const handlePlaceholderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateWorkspaceElement({
        settingItemId: selectedItem.i,
        propertyName: "placeholder",
        propertyValue: e.target.value,
      })
    );
  };

  switch (selectedItem.name) {
    case "Button":
      return (
        <ButtonSettings
          handleTextChange={handleTextChange}
          handleLinkChange={handleLinkChange}
          showComponent={showComponent}
          setShowComponent={setShowComponent}
          openTab={openTab}
          setOpenTab={setOpenTab}
        />
      );

    case "Image":
      return <ImageSettings />;

    case "Container":
    case "Horizontal Container":
    case "Vertical Container":
      return <ContainerSettings />;

    case "Input":
      return (
        <InputSettings handlePlaceholderChange={handlePlaceholderChange} />
      );

    default:
      return (
        <GeneralSettings
          handleTextChange={handleTextChange}
          handleLinkChange={handleLinkChange}
        />
      );
  }
};

export default SettingComponent;
