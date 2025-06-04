import useSessionTimer from "@/context/useSessionTimer";
import formatDuration from "@/utils/formatDuration";
import { Circle, HStack, Icon, StackProps, Text } from "@chakra-ui/react";
import { IconClock } from "@tabler/icons-react";
import { useEffect, useState } from "react";

interface Props extends StackProps {}

const SessionTimer = (props: Props) => {
  // Props
  const { ...restProps } = props;

  // Contexts
  const { seconds } = useSessionTimer();

  // State
  const [timingout, setTimingout] = useState(false);
  const timingoutStyle = timingout && seconds !== 0;

  // Handle update state
  useEffect(() => {
    setTimingout(seconds < 60);
  }, [seconds]);

  return (
    <HStack
      p={2}
      h={"60px"}
      borderRadius={8}
      bg={timingoutStyle ? "red.500" : "p.900"}
      w={"fit"}
      flexShrink={0}
      justify={"center"}
      pos={"relative"}
      {...restProps}
    >
      {timingoutStyle && (
        <Circle
          pos={"absolute"}
          opacity={0.5}
          top={"50%"}
          left={"50%"}
          transform={"translate(-50%, -50%)"}
          bg={"red.500"}
          animation={"ripple-sm 1s infinite"}
          w={"100px"}
          h={"100px"}
        />
      )}

      <Icon color={timingoutStyle ? "white" : "p.100"}>
        <IconClock size={32} stroke={3} />
      </Icon>

      <Text
        color={timingoutStyle ? "white" : "p.100"}
        fontSize={32}
        fontWeight={"semibold"}
      >
        {formatDuration(seconds, "numeric")}
      </Text>
    </HStack>
  );
};

export default SessionTimer;
