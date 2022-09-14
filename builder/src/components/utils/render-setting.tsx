import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateWorkspaceElement } from "redux/workspace/workspace.reducers";
import ButtonSettings from "components/dashboard/button-settings";
import ImageSettings from "components/dashboard/image-settings";
import ContainerSettings from "components/dashboard/container-settings";
import InputSettings from "components/dashboard/input-settings";
import GeneralSettings from "components/dashboard/general-settings";
import { ISettings, IWorkspaceElements } from "redux/workspace/workspace.interfaces";
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

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    propertyName: string
  ) => {
    dispatch(
      updateWorkspaceElement({
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
        <InputSettings handleChange={handleChange} />
      );

    default:
      return (
        <GeneralSettings
          handleChange={handleChange}
        />
      );
  }
};

export default SettingComponent;
