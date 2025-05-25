import { Text, TextProps } from "@chakra-ui/react";
import { Tooltip, TooltipProps } from "../ui/tooltip";

interface Props extends Omit<TooltipProps, "content"> {
  children: string;
  tooltipContent: any;
  textProps?: TextProps;
}

const TruncatedText = ({
  children,
  tooltipContent,
  textProps,
  ...props
}: Props) => {
  return (
    <Tooltip
      content={tooltipContent}
      positioning={{ placement: "bottom-start" }}
      {...props}
    >
      <Text textAlign={"left"} truncate {...textProps}>
        {children}
      </Text>
    </Tooltip>
  );
};

export default TruncatedText;
