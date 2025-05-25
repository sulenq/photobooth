import useLang from "@/context/useLang";
import useBackOnClose from "@/hooks/useBackOnClose";
import { Icon, useDisclosure } from "@chakra-ui/react";
import { IconInbox, IconInboxOff } from "@tabler/icons-react";
import BackButton from "../ui-custom/BackButton";
import BButton from "../ui-custom/BButton";
import ConfirmationDisclosure from "../ui-custom/ConfirmationDisclosure";
import DisclosureHeaderContent from "../ui-custom/DisclosureHeaderContent";
import FloatCounter from "../ui-custom/FloatCounter";
import {
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
} from "../ui/drawer";
import { EmptyState } from "../ui/empty-state";
import { Tooltip } from "../ui/tooltip";

const Inbox = () => {
  // Contexts
  const { l } = useLang();

  // Utils
  const { open, onOpen, onClose } = useDisclosure();
  useBackOnClose(`merchant-inbox`, open, onOpen, onClose);

  return (
    <>
      <Tooltip content={"Inbox"}>
        <BButton iconButton unclicky variant={"ghost"} onClick={onOpen}>
          <>
            <FloatCounter circleProps={{ mt: "18px", mr: "18px" }}>
              2
            </FloatCounter>

            <Icon>
              <IconInbox stroke={1.5} />
            </Icon>
          </>
        </BButton>
      </Tooltip>

      <DrawerRoot open={open} size={["sm", null, "xs"]}>
        <DrawerContent>
          <DrawerHeader pt={5}>
            <DisclosureHeaderContent prefix="drawer" title="Inbox" />
          </DrawerHeader>

          <DrawerBody display={"flex"}>
            <EmptyState
              icon={<IconInboxOff />}
              title={`Inbox ${l.empty.toLowerCase()}`}
              description={l.no_data_feedback.description}
              maxW={"300px"}
              m={"auto"}
            />
          </DrawerBody>

          <DrawerFooter>
            <BackButton />
            <ConfirmationDisclosure
              id="loggingout"
              title={l.delete_all_inbox_disclosure.title}
              description={l.delete_all_inbox_disclosure.description}
              confirmLabel={l.delete_label}
              confirmButtonProps={{ colorPalette: "red" }}
              confirmCallback={() => {}}
            >
              <BButton colorPalette={"red"} variant={"surface"}>
                {l.delete_all_inbox_button}
              </BButton>
            </ConfirmationDisclosure>
          </DrawerFooter>
        </DrawerContent>
      </DrawerRoot>
    </>
  );
};

export default Inbox;
