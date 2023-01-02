import { FC, useEffect, useState } from 'react';
import GridLayout from 'react-grid-layout';
import RenderItem from 'components/utils/render-item';
import { IWorkspaceElement } from 'redux/workspace/workspace.interfaces';

interface IPreviewContainer {
  item: IWorkspaceElement;
  children: IWorkspaceElement[];
  backgroundColor: string;
  color: string;
  borderRadius: number;
  borderWidth: number;
  shadow: string;
  backgroundSize?: string;
  padding?: {
    paddingLeft?: number;
    paddingRight?: number;
    paddingTop?: number;
    paddingBottom?: number;
  };
  margin?: {
    marginLeft?: number;
    marginRight?: number;
    marginTop?: number;
    marginBottom?: number;
  };
  imgData?: string | ArrayBuffer;
}

const PreviewContainer: FC<IPreviewContainer> = ({
  item,
  children,
  backgroundColor,
  color,
  borderRadius,
  borderWidth,
  shadow,
  backgroundSize,
  padding,
  margin,
  imgData,
}) => {
  const [containerW, setContainerW] = useState(null);

  useEffect(() => {
    const cw = document?.getElementById(`${item.i}`)?.getBoundingClientRect().width;
    if (cw) setContainerW(cw);
  }, []); // eslint-disable-line

  let finalSpacing = margin?.marginLeft + margin?.marginRight + padding?.paddingLeft + padding?.paddingRight;

  return (
    <section
      id={item.i}
      style={{
        paddingLeft: `${margin?.marginLeft}px`,
        paddingRight: `${margin?.marginRight}px`,
      }}
      className="w-full h-fit"
    >
      {containerW && (
        <GridLayout
          layout={children}
          cols={6}
          rowHeight={children?.length ? 50 - (borderWidth ? borderWidth * 2 : 0) / children?.length : 50}
          width={containerW - (finalSpacing + borderWidth * 2) || 1000}
          isDraggable={false}
          isResizable={false}
          compactType="vertical"
          margin={[0, 0]}
          className="btn-border"
          style={{
            backgroundColor: backgroundColor.slice(0, 4) === 'rgba' ? backgroundColor : null,
            backgroundImage: imgData ? `url(${imgData})` : backgroundColor.slice(0, 4) === 'rgba' ? null : `${backgroundColor}`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: backgroundSize,
            border: `${borderWidth}px solid ${color}`,
            borderRadius: `${borderRadius}px`,
            borderImage: color,
            boxShadow: shadow,
            paddingLeft: `${padding.paddingLeft}px`,
            paddingRight: `${padding.paddingRight}px`,
          }}
        >
          {children.map(c => {
            const { x, y, w, h, minW, i } = c;
            return (
              <div key={i} data-grid={{ x, y, w, h, minW }}>
                <RenderItem item={c} />
              </div>
            );
          })}
        </GridLayout>
      )}
    </section>
  );
};

export default PreviewContainer;
