import { FC } from "react";
import defaultImage from "assets/default-image.png";
import "styles/components.css";

interface IImageComponent {
  imgData: string | ArrayBuffer;
  justifyContent: string;
  margin?: {
    marginLeft?: number;
    marginRight?: number;
    marginTop?: number;
    marginBottom?: number;
  };
  width?: number;
  height?: number;
  backgroundSize?: string;
  isAuto?: boolean;
  link: string;
}

const Image: FC<IImageComponent> = ({
  imgData,
  justifyContent,
  margin,
  width,
  height,
  backgroundSize,
  isAuto,
  link,
}) => {
  const imageDiv = (
    <div
      className="flex h-full w-full"
      style={{
        backgroundImage: `url(${imgData ? imgData : defaultImage})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: justifyContent,
        backgroundSize: `${isAuto ? backgroundSize : `${width}px ${height}px`}`,
        margin: `${margin.marginTop}px ${margin.marginRight}px ${margin.marginBottom}px ${margin.marginLeft}px`,
      }}
    />
  );

  return (
    <section className="w-full h-full overflow-hidden">
      {link ? (
        <a
          style={{ textDecoration: "none" }}
          target="_blank"
          rel="noreferrer"
          href={link}
          className="cursor-pointer"
          rel="noreferrer"
        >
          {imageDiv}
        </a>
      ) : (
        imageDiv
      )}
    </section>
  );
};

export default Image;
