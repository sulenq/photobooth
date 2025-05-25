import { StackProps } from "@chakra-ui/react";
import CContainer from "./CContainer";

interface Props extends StackProps {
  children?: any;
}
const ProjectStatsContainer = ({ children, ...props }: Props) => {
  return (
    <CContainer
      flex={"1 1 150px"}
      gap={2}
      p={4}
      borderRadius={6}
      justify={"center"}
      {...props}
    >
      {children}
    </CContainer>
  );
};

export default ProjectStatsContainer;
