import { FC } from 'react';
import Container from 'components/custom-components/container';
import Button from 'components/custom-components/button';
import Text from 'components/custom-components/text';
import Image from 'components/custom-components/image';
import Input from 'components/custom-components/input';
import Spacer from 'components/custom-components/spacer';
import Divider from 'components/custom-components/divider';
import LensterWidget from 'components/custom-components/lenster-widget';
import PreviewContainer from 'components/custom-components/preview/preview-container';
import PreviewButton from 'components/custom-components/preview/preview-button';
import PreviewText from 'components/custom-components/preview/preview-text';
import PreviewInput from 'components/custom-components/preview/preview-input';
import PreviewLensterWidget from 'components/custom-components/preview/preview-lenster-widget';
import List from 'components/custom-components/list';
import Checkbox from 'components/custom-components/checkbox';
import Dropdown from 'components/custom-components/dropdown';
import Badge from 'components/custom-components/badge';
import RadioButton from 'components/custom-components/radio';
import { IInput, IOutput, IWorkspaceElement } from 'redux/workspace/workspace.interfaces';

interface IRenderItem {
  item: IWorkspaceElement;
  setDrag?: (drag?: boolean) => void;
  setOpenSetting?: (openSetting: boolean) => void;
  setOpenTab?: (openTab: number) => void;
  setIsContainerSelected?: (isContainerSelected: boolean) => void;
  setSideElement?: (sideElement: string) => void;
  setHideNavbar?: (hideNavbar: boolean) => void;
  hideSettingSidebar?: () => void;
  preview?: boolean;
  inputValue?: IInput[];
  setInputValue?: (inputValue: IInput[]) => void;
  outputValue?: IOutput[];
  setOutputValue?: (outputValue: IOutput[]) => void;
}

const RenderItem: FC<IRenderItem> = ({
  item,
  setDrag,
  setOpenSetting,
  setOpenTab,
  setIsContainerSelected,
  setSideElement,
  setHideNavbar,
  hideSettingSidebar,
  preview,
  inputValue,
  setInputValue,
  outputValue,
  setOutputValue,
}) => {
  switch (item.name) {
    case 'Button':
      return (
        <>
          {preview ? (
            <PreviewButton
              i={item.i}
              fontWeight={item.style.fontWeight}
              italic={item.style.fontStyle}
              underline={item.style.textDecoration}
              color={item.style.color}
              borderColor={item.style.borderColor}
              justifyContent={item.style.justifyContent}
              fontSize={item.style.fontSize}
              value={item.value}
              backgroundColor={item.style.backgroundColor}
              contractFunction={item.contract}
              oracleFunction={item.oracle}
              inputValue={inputValue}
              setInputValue={setInputValue}
              outputValue={outputValue}
              setOutputValue={setOutputValue}
              link={item.link}
              borderRadius={item.style.borderRadius}
              borderWidth={item.style.borderWidth}
              shadow={item.style.shadow}
              connectWallet={item.connectWallet}
              margin={item.style.margin}
              padding={item.style.padding}
              fontFamily={item.style.fontFamily}
            />
          ) : (
            <Button
              i={item.i}
              fontWeight={item.style.fontWeight}
              italic={item.style.fontStyle}
              underline={item.style.textDecoration}
              color={item.style.color}
              borderColor={item.style.borderColor}
              justifyContent={item.style.justifyContent}
              fontSize={item.style.fontSize}
              value={item.value}
              backgroundColor={item.style.backgroundColor}
              link={item.link}
              borderRadius={item.style.borderRadius}
              borderWidth={item.style.borderWidth}
              shadow={item.style.shadow}
              connectWallet={item.connectWallet}
              margin={item.style.margin}
              padding={item.style.padding}
              fontFamily={item.style.fontFamily}
            />
          )}
        </>
      );
    case 'Text':
    case 'Heading 1':
    case 'Heading 2':
    case 'Heading 3':
      return (
        <>
          {preview ? (
            <PreviewText
              i={item.i}
              fontWeight={item.style.fontWeight}
              italic={item.style.fontStyle}
              underline={item.style.textDecoration}
              color={item.style.color}
              justifyContent={item.style.justifyContent}
              fontSize={item.style.fontSize}
              value={item.value}
              link={item.link}
              outputValue={outputValue}
              backgroundColor={item.style.backgroundColor}
              margin={item.style.margin}
              padding={item.style.padding}
              fontFamily={item.style.fontFamily}
            />
          ) : (
            <Text
              i={item.i}
              fontWeight={item.style.fontWeight}
              italic={item.style.fontStyle}
              underline={item.style.textDecoration}
              color={item.style.color}
              justifyContent={item.style.justifyContent}
              fontSize={item.style.fontSize}
              value={item.value}
              backgroundColor={item.style.backgroundColor}
              link={item.link}
              margin={item.style.margin}
              padding={item.style.padding}
              fontFamily={item.style.fontFamily}
            />
          )}
        </>
      );
    case 'Input':
      return (
        <>
          {preview ? (
            <PreviewInput
              i={item.i}
              inputValue={inputValue}
              setInputValue={setInputValue}
              borderRadius={item.style.borderRadius}
              shadow={item.style.shadow}
              color={item.style.color}
              margin={item.style.margin}
              padding={item.style.padding}
              placeholder={item.placeholder}
              backgroundColor={item.style.backgroundColor}
              borderColor={item.style.borderColor}
            />
          ) : (
            <Input
              i={item.i}
              placeholder={item.placeholder}
              borderRadius={item.style.borderRadius}
              shadow={item.style.shadow}
              color={item.style.color}
              margin={item.style.margin}
              padding={item.style.padding}
              backgroundColor={item.style.backgroundColor}
              borderColor={item.style.borderColor}
            />
          )}
        </>
      );
    case 'Image':
      return (
        <Image
          i={item.i}
          justifyContent={item.style.justifyContent}
          width={item.style.width}
          height={item.style.height}
          backgroundSize={item.style.backgroundSize}
          isAuto={item.style.isAuto}
          manualSizing={item.style.manualSizing}
          margin={item.style.margin}
          imgData={item.imgData}
          link={item.link}
          preview={preview}
        />
      );
    case 'Spacer':
      return <Spacer i={item.i} backgroundColor={item.style.backgroundColor} margin={item.style.margin} />;
    case 'Divider':
      return (
        <Divider
          margin={item.style.margin}
          borderRadius={item.style.borderRadius}
          borderWidth={item.style.borderWidth}
          borderColor={item.style.borderColor}
        />
      );
    case 'List':
      return (
        <List
          i={item.i}
          fontWeight={item.style.fontWeight}
          italic={item.style.fontStyle}
          underline={item.style.textDecoration}
          color={item.style.color}
          justifyContent={item.style.justifyContent}
          fontSize={item.style.fontSize}
          value={item.value}
          backgroundColor={item.style.backgroundColor}
          link={item.link}
          margin={item.style.margin}
          padding={item.style.padding}
          fontFamily={item.style.fontFamily}
          listType={item.style.listType}
          listOptions={item.listOptions}
          preview={preview}
        />
      );
    case 'Dropdown':
      return (
        <Dropdown
          i={item.i}
          fontWeight={item.style.fontWeight}
          italic={item.style.fontStyle}
          underline={item.style.textDecoration}
          color={item.style.color}
          justifyContent={item.style.justifyContent}
          fontSize={item.style.fontSize}
          value={item.value}
          backgroundColor={item.style.backgroundColor}
          link={item.link}
          margin={item.style.margin}
          padding={item.style.padding}
          fontFamily={item.style.fontFamily}
          borderRadius={item.style.borderRadius}
          borderWidth={item.style.borderWidth}
          shadow={item.style.shadow}
          borderColor={item.style.borderColor}
          listOptions={item.listOptions}
          preview={preview}
        />
      );
    case 'Checkbox':
      return (
        <Checkbox
          i={item.i}
          fontWeight={item.style.fontWeight}
          italic={item.style.fontStyle}
          underline={item.style.textDecoration}
          color={item.style.color}
          justifyContent={item.style.justifyContent}
          fontSize={item.style.fontSize}
          value={item.value}
          backgroundColor={item.style.backgroundColor}
          link={item.link}
          margin={item.style.margin}
          padding={item.style.padding}
          fontFamily={item.style.fontFamily}
        />
      );
    case 'Radio':
      return (
        <RadioButton
          i={item.i}
          fontWeight={item.style.fontWeight}
          italic={item.style.fontStyle}
          underline={item.style.textDecoration}
          color={item.style.color}
          justifyContent={item.style.justifyContent}
          fontSize={item.style.fontSize}
          value={item.value}
          backgroundColor={item.style.backgroundColor}
          link={item.link}
          margin={item.style.margin}
          padding={item.style.padding}
          fontFamily={item.style.fontFamily}
        />
      );
    case 'Badge':
    case 'Status':
      return (
        <Badge
          i={item.i}
          name={item.name}
          fontWeight={item.style.fontWeight}
          italic={item.style.fontStyle}
          underline={item.style.textDecoration}
          color={item.style.color}
          borderColor={item.style.borderColor}
          justifyContent={item.style.justifyContent}
          fontSize={item.style.fontSize}
          value={item.value}
          backgroundColor={item.style.backgroundColor}
          link={item.link}
          borderRadius={item.style.borderRadius}
          borderWidth={item.style.borderWidth}
          shadow={item.style.shadow}
          connectWallet={item.connectWallet}
          margin={item.style.margin}
          padding={item.style.padding}
          fontFamily={item.style.fontFamily}
        />
      );
    case 'Container':
    case 'Horizontal Container':
    case 'Vertical Container':
      return (
        <>
          {preview ? (
            <PreviewContainer
              item={item}
              children={item.children}
              backgroundColor={item.style.backgroundColor}
              color={item.style.color}
              borderRadius={item.style.borderRadius}
              borderWidth={item.style.borderWidth}
              shadow={item.style.shadow}
              backgroundSize={item.style.backgroundSize}
              padding={item.style.padding}
              margin={item.style.margin}
              imgData={item.imgData}
            />
          ) : (
            <Container
              item={item}
              children={item.children}
              backgroundColor={item.style.backgroundColor}
              color={item.style.color}
              borderRadius={item.style.borderRadius}
              borderWidth={item.style.borderWidth}
              shadow={item.style.shadow}
              setOpenSetting={setOpenSetting}
              setOpenTab={setOpenTab}
              setDrag={setDrag}
              setIsContainerSelected={setIsContainerSelected}
              setSideElement={setSideElement}
              setHideNavbar={setHideNavbar}
              hideSettingSidebar={hideSettingSidebar}
              backgroundSize={item.style.backgroundSize}
              padding={item.style.padding}
              margin={item.style.margin}
              imgData={item.imgData}
            />
          )}
        </>
      );
    case 'Lenster Card':
      return (
        <>{preview ? <PreviewLensterWidget preview={preview} i={item.i} posts={item.posts} /> : <LensterWidget i={item.i} setDrag={setDrag} />}</>
      );
    default:
      return <></>;
  }
};

export default RenderItem;
