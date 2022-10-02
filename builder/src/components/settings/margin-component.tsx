import React, { FC } from "react";
import { useDispatch } from "react-redux";
import SpaceInput from "components/utils/space-input";
import { updateWorkspaceElementSubStyle } from "redux/workspace/workspace.reducers";
import "styles/components.css";
import "styles/dashboard.css";

interface IMarginComponent {
  i: string;
  margin: {
    marginLeft?: number;
    marginRight?: number;
    marginTop?: number;
    marginBottom?: number;
  };
}

enum Margin {
  MARGINLEFT = "marginLeft",
  MARGINRIGHT = "marginRight",
  MARGINTOP = "marginTop",
  MARGINBOTTOM = "marginBottom",
}

const MarginComponent: FC<IMarginComponent> = ({ i, margin }) => {
  const dispatch = useDispatch();

  const handleChange = (property: string, updatedMargin?: number) => {
    dispatch(
      updateWorkspaceElementSubStyle({
        settingItemId: i,
        propertyName: "margin",
        propertyValue: updatedMargin,
        childPropertyName: property,
      })
    );
  };

  const incrementCounter = (property: string, value: number) => {
    dispatch(
      updateWorkspaceElementSubStyle({
        settingItemId: i,
        propertyName: "margin",
        propertyValue: value + 1,
        childPropertyName: property,
      })
    );
  };

  const decrementCounter = (property: string, value: number) => {
    dispatch(
      updateWorkspaceElementSubStyle({
        settingItemId: i,
        propertyName: "margin",
        propertyValue: value - 1,
        childPropertyName: property,
      })
    );
  };

  const marginData = {
    text: ["L", "R", "T", "B"],
    value: [
      margin?.marginLeft || 0,
      margin?.marginRight || 0,
      margin?.marginTop || 0,
      margin?.marginBottom || 0,
    ],
    handleChange: [
      (updatedMargin: number) => handleChange(Margin.MARGINLEFT, updatedMargin),
      (updatedMargin: number) =>
        handleChange(Margin.MARGINRIGHT, updatedMargin),
      (updatedMargin: number) => handleChange(Margin.MARGINTOP, updatedMargin),
      (updatedMargin: number) =>
        handleChange(Margin.MARGINBOTTOM, updatedMargin),
    ],
    handleIncrement: [
      () => incrementCounter(Margin.MARGINLEFT, margin?.marginLeft),
      () => incrementCounter(Margin.MARGINRIGHT, margin?.marginRight),
      () => incrementCounter(Margin.MARGINTOP, margin?.marginTop),
      () => incrementCounter(Margin.MARGINBOTTOM, margin?.marginBottom),
    ],
    handleDecrement: [
      () => decrementCounter(Margin.MARGINLEFT, margin?.marginLeft),
      () => decrementCounter(Margin.MARGINRIGHT, margin?.marginRight),
      () => decrementCounter(Margin.MARGINTOP, margin?.marginTop),
      () => decrementCounter(Margin.MARGINBOTTOM, margin?.marginBottom),
    ],
  };

  return (
    <SpaceInput
      heading="Margin"
      text={marginData.text}
      value={marginData.value}
      handleChange={marginData.handleChange}
      handleIncrement={marginData.handleIncrement}
      handleDecrement={marginData.handleDecrement}
    />
  );
};
export default MarginComponent;
