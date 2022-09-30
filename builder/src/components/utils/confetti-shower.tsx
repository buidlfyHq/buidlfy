import Confetti from "react-confetti";

const ConfettiShower = () => {
  let height = window.screen.height;
  let width = window.screen.width;

  return (
    <Confetti
      width={width}
      height={height}
      numberOfPieces={300}
      colors={[
        "#9B70FFD9",
        "#70BAFFE5",
        "#70BAFFA6",
        "#70FFF5A6",
        "#9B70FF59",
        "#70FFF5D9",
        "#9B70FF59",
        "#70BAFFE5",
        "#9B70FF",
      ]}
      tweenDuration={9000}
    />
  );
};

export { ConfettiShower };
