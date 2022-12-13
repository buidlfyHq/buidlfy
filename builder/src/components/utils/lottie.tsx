import { FC } from 'react';
import Lottie from 'react-lottie';

interface ILottieComponent {
  lottie: any;
  width: number;
  height: number;
  className?: string;
}

const LottieComponent: FC<ILottieComponent> = ({ lottie, width, height, className }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: lottie,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className={className}>
      <Lottie options={defaultOptions} height={height} width={width} />
    </div>
  );
};

export default LottieComponent;
