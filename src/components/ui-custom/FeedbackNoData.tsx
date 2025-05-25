import { Icon, StackProps } from "@chakra-ui/react";
import { IconDatabaseOff } from "@tabler/icons-react";
import { EmptyState } from "../ui/empty-state";
import CContainer from "./CContainer";
import useLang from "@/context/useLang";

interface Props extends StackProps {
  title?: string;
  description?: string;
}

export default function FeedbackNoData({
  title,
  description,
  ...props
}: Props) {
  // Contexts
  const { l } = useLang();

  return (
    <CContainer w={"fit"} m={"auto"} {...props}>
      <EmptyState
        icon={
          <Icon>
            <IconDatabaseOff />
          </Icon>
        }
        title={title || l.no_data_feedback.title}
        description={description || l.no_data_feedback.description}
        maxW={"300px"}
      />
    </CContainer>
  );
}
