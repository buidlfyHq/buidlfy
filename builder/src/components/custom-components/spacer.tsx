import { FC } from 'react';

interface ISpacer {
  i: string;
  backgroundColor: string;
  margin?: {
    marginLeft?: number;
    marginRight?: number;
    marginTop?: number;
    marginBottom?: number;
  };
}

const Spacer: FC<ISpacer> = ({ i, backgroundColor, margin }) => (
  <section className="w-full h-full overflow-hidden">
    <div
      id={i}
      style={{
        height: '-webkit-fill-available',
        background: backgroundColor,
        margin: `${margin?.marginTop}px ${margin?.marginRight}px ${margin?.marginBottom}px ${margin?.marginLeft}px`,
      }}
      className="h-full"
    />
  </section>
);

export default Spacer;
