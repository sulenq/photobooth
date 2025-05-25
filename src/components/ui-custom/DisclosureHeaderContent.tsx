import useBackOnDefaultPage from "@/hooks/useBackOnDefaultPage";
import back from "@/utils/back";
import { HStack, Text } from "@chakra-ui/react";
import { DisclosureCloseTrigger } from "./Disclosure";
import { DialogCloseTrigger } from "../ui/dialog";
import { DrawerCloseTrigger } from "../ui/drawer";

type Props = {
  title?: string;
  withCloseButton?: boolean;
  content?: any;
  prefix?: "drawer" | "dialog";
};
const DisclosureHeaderContent = ({
  title,
  withCloseButton = true,
  prefix,
  content,
}: Props) => {
  const handleBackOnDefaultPage = useBackOnDefaultPage();

  function handleBack() {
    back();
    handleBackOnDefaultPage();
  }

  return (
    <HStack justify={"space-between"} mb={1}>
      {content ? (
        content
      ) : (
        <Text
          fontSize={"16px"}
          fontWeight={"semibold"}
          ml={!prefix ? [-1, null, 0] : ""}
        >
          {title}
        </Text>
      )}

      {withCloseButton && (
        <>
          {prefix && (
            <>
              {prefix === "dialog" && (
                <DialogCloseTrigger
                  borderRadius={"full"}
                  top={"12px"}
                  right={"14px"}
                  onClick={handleBack}
                  mt={"-2px"}
                  mr={"-6px"}
                />
              )}

              {prefix === "drawer" && (
                <DrawerCloseTrigger
                  borderRadius={"full"}
                  top={3}
                  right={"14px"}
                  onClick={handleBack}
                />
              )}
            </>
          )}

          {!prefix && (
            <DisclosureCloseTrigger
              borderRadius={"full"}
              top={3}
              right={"14px"}
              onClick={handleBack}
            />
          )}
        </>
      )}
    </HStack>
  );
};

export default DisclosureHeaderContent;
