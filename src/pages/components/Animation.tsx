import { type NextPage } from "next";
import { useEffect, useRef } from "react";
import { type LottiePlayer } from "lottie-web";
import { useState } from "react";

interface Props {
  animationSrc: string;
}

const Animation: NextPage<Props> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [lottie, setLottie] = useState<LottiePlayer | null>(null);

  useEffect(() => {
    import('lottie-web').then((Lottie) => setLottie(Lottie.default));
  }, []);

  useEffect(() => {
    if (lottie && ref.current) {
      const animation = lottie.loadAnimation({
        container: ref.current,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        // path to your animation file, place it inside public folder
        path: props.animationSrc,
      });

      animation.setSpeed(0.6);

      return () => animation.destroy();
    }
  }, [lottie, props.animationSrc]);

  return (
    <div ref={ref} />
  );
};

export default Animation;
