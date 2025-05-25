import { Text } from "@chakra-ui/react";
import CContainer from "./CContainer";
import { useThemeConfig } from "@/context/useThemeConfig";

const LineChartTooltipContent = ({ active, payload, label }: any) => {
  // Contexts
  const { themeConfig } = useThemeConfig();

  if (active && payload && payload.length) {
    return (
      <CContainer
        bg={"darktrans"}
        backdropFilter={"blur(5px)"}
        px={3}
        py={2}
        gap={1}
        borderRadius={themeConfig.radii.component}
      >
        <Text fontWeight={"bold"} color={"fg.subtle"}>{`${label}`}</Text>

        {payload.map((item: any, index: number) => (
          <Text
            key={index}
            color={"white"}
            // color={item.color}
          >
            {`${item.name}: ${item.value.toLocaleString()}`}
          </Text>
        ))}
      </CContainer>
    );
  }

  return null;
};

export default LineChartTooltipContent;
