import { Text } from "@chakra-ui/react";
import CContainer from "./CContainer";

const DoughnutChartTooltipContent = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <CContainer
        bg={"darktrans"}
        backdropFilter={"blur(5px)"}
        p={3}
        borderRadius={6}
      >
        {payload.map((item: any, index: number) => {
          return (
            <Text
              key={index}
              color={"white"}
              // color={item.payload.fill}
            >
              {`${item.name}: ${item.value.toLocaleString()} ${
                item.payload.percentage
                  ? `(${item.payload.percentage.toFixed(0)}%)`
                  : ""
              }`}
            </Text>
          );
        })}
      </CContainer>
    );
  }

  return null;
};

export default DoughnutChartTooltipContent;
