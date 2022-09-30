import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { updateWorkspaceElementSubStyle } from "redux/workspace/workspace.reducers";
import SpaceInput from "components/utils/space-input";
import "styles/components.css";
import "styles/dashboard.css";

interface IPaddingComponent {
  i: string;
  padding: {
    paddingLeft?: number;
    paddingRight?: number;
    paddingTop?: number;
    paddingBottom?: number;
  };
  name?: string;
}

enum Padding {
  PADDINGLEFT = "paddingLeft",
  PADDINGRIGHT = "paddingRight",
  PADDINGTOP = "paddingTop",
  PADDINGBOTTOM = "paddingBottom",
}

const PaddingComponent: FC<IPaddingComponent> = ({ i, padding, name }) => {
  const dispatch = useDispatch();

  const handleChange = (property: string, updatedPadding?: number) => {
    dispatch(
      updateWorkspaceElementSubStyle({
        settingItemId: i,
        propertyName: "padding",
        propertyValue: updatedPadding,
        childPropertyName: property,
      })
    );
  };

  const incrementCounter = (property: string, value: number) => {
    dispatch(
      updateWorkspaceElementSubStyle({
        settingItemId: i,
        propertyName: "padding",
        propertyValue: value + 1,
        childPropertyName: property,
      })
    );
  };

  const decrementCounter = (property: string, value: number) => {
    dispatch(
      updateWorkspaceElementSubStyle({
        settingItemId: i,
        propertyName: "padding",
        propertyValue: value - 1,
        childPropertyName: property,
      })
    );
  };

  const paddingData = {
    container: {
      text: ["L", "R"],
      value: [padding?.paddingLeft, padding?.paddingRight],
      handleChange: [
        (updatedPadding: number) =>
          handleChange(Padding.PADDINGLEFT, updatedPadding),
        (updatedPadding: number) =>
          handleChange(Padding.PADDINGRIGHT, updatedPadding),
      ],
      handleIncrement: [
        () => incrementCounter(Padding.PADDINGLEFT, padding?.paddingLeft),
        () => incrementCounter(Padding.PADDINGRIGHT, padding?.paddingRight),
      ],
      handleDecrement: [
        () => decrementCounter(Padding.PADDINGLEFT, padding?.paddingLeft),
        () => decrementCounter(Padding.PADDINGRIGHT, padding?.paddingRight),
      ],
    },
    text: ["L", "R", "T", "B"],
    value: [
      padding?.paddingLeft,
      padding?.paddingRight,
      padding?.paddingTop,
      padding?.paddingBottom,
    ],
    handleChange: [
      (updatedPadding: number) =>
        handleChange(Padding.PADDINGLEFT, updatedPadding),
      (updatedPadding: number) =>
        handleChange(Padding.PADDINGRIGHT, updatedPadding),
      (updatedPadding: number) =>
        handleChange(Padding.PADDINGTOP, updatedPadding),
      (updatedPadding: number) =>
        handleChange(Padding.PADDINGBOTTOM, updatedPadding),
    ],
    handleIncrement: [
      () => incrementCounter(Padding.PADDINGLEFT, padding?.paddingLeft),
      () => incrementCounter(Padding.PADDINGRIGHT, padding?.paddingRight),
      () => incrementCounter(Padding.PADDINGTOP, padding?.paddingTop),
      () => incrementCounter(Padding.PADDINGBOTTOM, padding?.paddingBottom),
    ],
    handleDecrement: [
      () => decrementCounter(Padding.PADDINGLEFT, padding?.paddingLeft),
      () => decrementCounter(Padding.PADDINGRIGHT, padding?.paddingRight),
      () => decrementCounter(Padding.PADDINGTOP, padding?.paddingTop),
      () => decrementCounter(Padding.PADDINGBOTTOM, padding?.paddingBottom),
    ],
  };

  const isContainer = name === "Container";

  return (
    <>
      {isContainer ? (
        <SpaceInput
          heading="Padding"
          text={paddingData.container.text}
          value={paddingData.container.value}
          handleChange={paddingData.container.handleChange}
          handleIncrement={paddingData.container.handleIncrement}
          handleDecrement={paddingData.container.handleDecrement}
        />
      ) : (
        <SpaceInput
          heading="Padding"
          text={paddingData.text}
          value={paddingData.value}
          handleChange={paddingData.handleChange}
          handleIncrement={paddingData.handleIncrement}
          handleDecrement={paddingData.handleDecrement}
        />
      )}
    </>
  );
};
export default PaddingComponent;
