import { useThemeConfig } from "@/context/useThemeConfig";
import { Icon, StackProps } from "@chakra-ui/react";
import { IconAlertTriangle } from "@tabler/icons-react";
import { EmptyState } from "../ui/empty-state";
import BButton from "./BButton";
import CContainer from "./CContainer";
import useLang from "@/context/useLang";

interface Props extends StackProps {
  title?: string;
  description?: string;
}

export default function FeedbackRetry({ title, description, ...props }: Props) {
  // Contexts
  const { themeConfig } = useThemeConfig();
  const { l } = useLang();

  return (
    <CContainer w={"fit"} m={"auto"} {...props}>
      <EmptyState
        icon={
          <Icon>
            <IconAlertTriangle />
          </Icon>
        }
        title={title || l.retry_feedback.title}
        description={description || l.retry_feedback.description}
        maxW={"300px"}
      >
        <BButton className="clicky" colorPalette={themeConfig.colorPalette}>
          {l.retry}
        </BButton>
      </EmptyState>
    </CContainer>
  );
}
