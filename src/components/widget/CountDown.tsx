import { Center, HStack, StackProps, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface Props extends StackProps {
  initialValue?: number;
  options?: {
    initialValueType?: "seconds" | "minutes" | "hours";
  };
}

const CountDown = (props: Props) => {
  const { initialValue = 0, options, ...restProps } = props;

  // Convert initialValue ke detik
  const getInitialSeconds = () => {
    const type = options?.initialValueType || "seconds";
    switch (type) {
      case "minutes":
        return initialValue * 60;
      case "hours":
        return initialValue * 3600;
      default:
        return initialValue;
    }
  };

  const [secondsLeft, setSecondsLeft] = useState(getInitialSeconds);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  // Helper: format angka jadi 2 digit
  const format = (num: number) => String(num).padStart(2, "0");

  const hours = Math.floor(secondsLeft / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;

  return (
    <HStack {...restProps}>
      <Center
        p={1}
        bg={"pd"}
        aspectRatio={1}
        w={"48px"}
        h={"48px"}
        borderRadius={8}
      >
        <Text color={"p.100"} fontSize="2xl" fontWeight={"medium"}>
          {format(hours)}
        </Text>
      </Center>

      <Text fontSize="2xl">:</Text>

      <Center
        p={1}
        bg={"pd"}
        aspectRatio={1}
        w={"48px"}
        h={"48px"}
        borderRadius={8}
      >
        <Text color={"p.100"} fontSize="2xl" fontWeight={"medium"}>
          {format(minutes)}
        </Text>
      </Center>

      <Text fontSize="2xl">:</Text>

      <Center
        p={1}
        bg={"pd"}
        aspectRatio={1}
        w={"48px"}
        h={"48px"}
        borderRadius={8}
      >
        <Text color={"p.100"} fontSize="2xl" fontWeight={"medium"}>
          {format(seconds)}
        </Text>
      </Center>
    </HStack>
  );
};

export default CountDown;
