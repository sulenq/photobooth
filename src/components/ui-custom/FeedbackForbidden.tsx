import { Icon, StackProps } from "@chakra-ui/react";
import { IconBan } from "@tabler/icons-react";
import { EmptyState } from "../ui/empty-state";
import CContainer from "./CContainer";
import useLang from "@/context/useLang";

interface Props extends StackProps {
  title?: string;
  description?: string;
}

export default function FeedbackForbidden({
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
            <IconBan />
          </Icon>
        }
        title={title || l.forbidden_feedback.title}
        description={description || l.forbidden_feedback.description}
        maxW={"300px"}
      />
    </CContainer>
  );
}
