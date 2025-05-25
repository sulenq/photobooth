import { Icon, StackProps } from "@chakra-ui/react";
import { IconSearch } from "@tabler/icons-react";
import { EmptyState } from "../ui/empty-state";
import CContainer from "./CContainer";
import useLang from "@/context/useLang";

interface Props extends StackProps {
  title?: string;
  description?: string;
  children?: any;
}

export default function FeedbackNotFound({
  title,
  description,
  children,
  ...props
}: Props) {
  // Contexts
  const { l } = useLang();

  return (
    <CContainer w={"fit"} m={"auto"} {...props}>
      <EmptyState
        icon={
          <Icon>
            <IconSearch />
          </Icon>
        }
        title={title || l.not_found_feedback.title}
        description={description || l.not_found_feedback.description}
        maxW={"300px"}
      >
        {children}
      </EmptyState>
    </CContainer>
  );
}
