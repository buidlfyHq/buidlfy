import { FC, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { IText } from 'redux/workspace/workspace.interfaces';
import 'styles/components.css';

const PreviewText: FC<IText> = ({
  i,
  fontWeight,
  italic,
  underline,
  color,
  justifyContent,
  fontSize,
  value,
  link,
  outputValue,
  backgroundColor,
  margin,
  padding,
  fontFamily,
}) => {
  const [isValue, setIsValue] = useState<string>(value);
  const gradientCondition = color?.indexOf('gradient') !== -1;

  useEffect(() => {
    handleOnChange();
  }, [outputValue]); // eslint-disable-line

  const handleOnChange = () => {
    if (outputValue && outputValue.find(output => output.id === i)) {
      const val = outputValue.find(output => output.id === i).value;
      if (val?._isBigNumber) {
        setIsValue(ethers.utils.formatUnits(val));
      } else {
        setIsValue(JSON.stringify(val));
      }
    }
  };

  const textArea = (
    <textarea
      readOnly
      style={{
        fontWeight: fontWeight,
        fontStyle: italic,
        textDecoration: underline,
        textDecorationColor: `${gradientCondition ? 'black' : color}`,
        background: color,
        WebkitTextFillColor: 'transparent',
        display: 'flex',
        justifyContent,
        alignItems: 'center',
        textAlign: `${justifyContent}` as CanvasTextAlign,
        fontSize: `${fontSize}px`,
        fontFamily: fontFamily,
        padding: `${padding.paddingTop}px ${padding.paddingRight}px ${padding.paddingBottom}px ${padding.paddingLeft}px`,
      }}
      value={isValue}
      className="text-area resize-none cursor-auto text-class overflow-hidden h-full w-full outline-none"
    />
  );

  return (
    <section
      id="text-one"
      style={{
        height: '-webkit-fill-available',
        background: backgroundColor,
        textDecoration: underline,
        textDecorationColor: color,
        margin: `${margin.marginTop}px ${margin.marginRight}px ${margin.marginBottom}px ${margin.marginLeft}px`,
      }}
      className="flex overflow-hidden items-center justify-center w-auto h-full"
    >
      {link ? (
        <a
          target="_blank"
          rel="noreferrer"
          href={link}
          className="text-class cursor-pointer flex overflow-hidden items-center justify-center w-auto h-full"
        >
          {textArea}
        </a>
      ) : (
        textArea
      )}
    </section>
  );
};

export default PreviewText;
