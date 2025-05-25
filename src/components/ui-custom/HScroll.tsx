import { HStack, StackProps } from "@chakra-ui/react";
import { useRef } from "react";

interface Props extends StackProps {
  fRef?: any;
  children?: any;
}

const HScroll = ({ fRef, children, ...props }: Props) => {
  const hStackRef = fRef ?? useRef<HTMLDivElement>(null);
  const scrollVelocity = useRef(0);
  const rafId = useRef<number | null>(null);

  const handleScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    if (!hStackRef.current) return;

    const canScroll =
      hStackRef.current.scrollWidth > hStackRef.current.clientWidth;

    if (canScroll) {
      event.preventDefault();
      scrollVelocity.current += event.deltaY * 0.2;

      if (!rafId.current) {
        const smoothScroll = () => {
          if (!hStackRef.current) return;
          hStackRef.current.scrollLeft += scrollVelocity.current;
          scrollVelocity.current *= 0.85;

          if (Math.abs(scrollVelocity.current) > 0.5) {
            rafId.current = requestAnimationFrame(smoothScroll);
          } else {
            rafId.current = null;
          }
        };
        rafId.current = requestAnimationFrame(smoothScroll);
      }
    }
  };

  return (
    <HStack
      ref={hStackRef}
      overflowY="hidden"
      w="full"
      className={`scrollX ${props.className}`}
      onWheel={handleScroll}
      {...props}
    >
      {children}
    </HStack>
  );
};

export default HScroll;
