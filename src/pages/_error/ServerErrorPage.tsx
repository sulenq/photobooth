import BButton from "@/components/ui-custom/BButton";
import useLang from "@/context/useLang";
import { useThemeConfig } from "@/context/useThemeConfig";
import { Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function ServerErrorPage() {
  const currentYear = new Date().getFullYear();
  const { themeConfig } = useThemeConfig();
  const { l } = useLang();

  return (
    <VStack h={"100vh"} gap={0}>
      <VStack p={8} flex={1} justify={"center"} gap={4} w={"full"}>
        <Text textAlign={"center"} fontSize={32} fontWeight={600}>
          500 Server Error
        </Text>

        <Text textAlign={"center"} mb={4} maxW={"600px"} color={"fg.muted"}>
          {l.maintenance_page}
        </Text>

        <Link to={"/"}>
          <BButton w="full" colorPalette={themeConfig.colorPalette}>
            {l.back_to_root}
          </BButton>
        </Link>
      </VStack>

      <VStack w={"full"} py={4}>
        <Text
          textAlign={"center"}
          // color={"fg.inverted"}
          fontSize={"sm"}
        >
          © {currentYear} powered by{" "}
          <span style={{ fontWeight: 600 }}>Exium</span>
        </Text>
      </VStack>
    </VStack>
  );
}
