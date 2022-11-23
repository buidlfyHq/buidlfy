import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { ReplaceValue } from "components/utils/render-setting";
import { updateWorkspaceElementStyle } from "redux/workspace/workspace.reducers";
import { fontOptions } from "components/utils/font-option";
import { fontStyles } from "components/utils/font-family-styles";
import "styles/components.css";
import "styles/dashboard.css";

interface IFontFamilyComponent {
  i: string;
  fontFamily: string;
}

const FontFamilyComponent: FC<IFontFamilyComponent> = ({ i, fontFamily }) => {
  const dispatch = useDispatch();
  const handleFontFamily = (action: ReplaceValue, value: string) => {
    if (action === ReplaceValue.CHANGE) {
      dispatch(
        updateWorkspaceElementStyle({
          settingItemId: i,
          propertyName: "fontFamily",
          propertyValue: value,
        })
      );
    }
  };

  const onChange = (option: { value: string }) => {
    handleFontFamily(ReplaceValue.CHANGE, option.value);
  };

  return (
    <div className="px-1 py-4">
      <div className="ml-3 margin-text flex w-[135px] mt-[5px] items-center">
        Font Family
      </div>
      <Select
        onChange={onChange}
        defaultValue={fontOptions[0]}
        className="ml-[8px] mt-4 w-[13.5rem] text-black"
        name="font-family"
        options={fontOptions}
        maxMenuHeight={200}
        styles={fontStyles}
      />
    </div>
  );
};
export default FontFamilyComponent;
