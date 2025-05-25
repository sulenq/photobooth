import ItemContainer from "@/components/ui-custom/ItemContainer";
import { EmptyState } from "@/components/ui/empty-state";
import SettingsNavsContainer from "@/components/widget/SettingsNavsContainer";
import useLang from "@/context/useLang";
import { Icon } from "@chakra-ui/react";
import { IconSettings } from "@tabler/icons-react";

const SettingsPage = () => {
  // Contexts
  const { l } = useLang();

  return (
    <SettingsNavsContainer align={"stretch"}>
      <ItemContainer minH={"full"}>
        <EmptyState
          icon={
            <Icon>
              <IconSettings />
            </Icon>
          }
          title={l.settings_page.title}
          description={l.settings_page.description}
          m={"auto"}
        />
      </ItemContainer>
    </SettingsNavsContainer>
  );
};

export default SettingsPage;
