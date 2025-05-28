import useSessionTimer from "@/context/useSessionTimer";
import formatDuration from "@/utils/formatDuration";
import { HStack, Icon, StackProps, Text } from "@chakra-ui/react";
import { IconClock } from "@tabler/icons-react";

interface Props extends StackProps {}
const SessionTimer = (props: Props) => {
  // Props
  const { ...restProps } = props;

  // Contexts
  const { seconds } = useSessionTimer();

  return (
    <HStack
      p={2}
      h={"60px"}
      borderRadius={8}
      bg={"p.900"}
      justify={"center"}
      w={"fit"}
      flexShrink={0}
      {...restProps}
    >
      <Icon color={"p.100"}>
        <IconClock size={32} stroke={3} />
      </Icon>

      <Text color={"p.100"} fontSize={32} fontWeight={"semibold"}>
        {formatDuration(seconds, "numeric")}
      </Text>
    </HStack>
  );
};

export default SessionTimer;
