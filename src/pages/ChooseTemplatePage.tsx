import BButton from "@/components/ui-custom/BButton";
import CContainer from "@/components/ui-custom/CContainer";
import ComponentSpinner from "@/components/ui-custom/ComponentSpinner";
import FeedbackRetry from "@/components/ui-custom/FeedbackRetry";
import Heading1 from "@/components/ui-custom/Heading1";
import NextButton from "@/components/widget/NextButton";
import SessionTimer from "@/components/widget/SessionTimer";
import useChoosedProduct from "@/context/useChoosedProduct";
import useSessionTemplate from "@/context/useSessionTemplate";
import useRequest from "@/hooks/useRequest";
import { Box, HStack, Icon, Image } from "@chakra-ui/react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useEffect, useRef } from "react";

const OptionList = () => {
  // Hooks
  const { req, loading, response, error } = useRequest({
    id: "choose-template",
    showLoadingToast: false,
    showErrorToast: false,
    showSuccessToast: false,
  });

  // Contexts
  const setTemplate = useSessionTemplate((s) => s.setTemplate);
  const { choosedProduct } = useChoosedProduct();

  // States
  const data = response?.data?.result;

  // Refs
  const carouselContainerRef = useRef<HTMLDivElement>(null);

  // Utils
  function prev() {
    if (carouselContainerRef.current) {
      carouselContainerRef.current.scrollLeft -= 300;
    }
  }
  function next() {
    if (carouselContainerRef.current) {
      carouselContainerRef.current.scrollLeft += 300;
    }
  }
  function handleChoose(template: any) {
    setTemplate(template);
  }
  function getTemplates() {
    const url = `/templates/get-by-productid`;
    const payload = {
      productId: choosedProduct?.product?.productId,
    };
    req({ config: { url, method: "post", data: payload } });
  }

  // Handle get product on page load
  useEffect(() => {
    getTemplates();
  }, []);

  return (
    <CContainer
      flexShrink={0}
      h={"50%"}
      bg={"p.900"}
      overflow={"clip"}
      gap={8}
      pt={6}
    >
      <Heading1
        className="df"
        color={"p.100"}
        fontWeight={"semibold"}
        textAlign={"center"}
      >
        Choose a Template
      </Heading1>

      <CContainer pos={"relative"} h={"calc(100% - 64px - 20px)"} pb={10}>
        {loading && (
          <ComponentSpinner
            flex={1}
            spinnerProps={{ size: "xl", color: "white" }}
          />
        )}

        {!loading && (
          <>
            {error && <FeedbackRetry onRetry={getTemplates} />}

            {!error && (
              <>
                {/* Controls */}
                <HStack
                  position={"absolute"}
                  top={"50%"}
                  transform={"translateY(-50%)"}
                  w={"full"}
                  justify={"space-between"}
                  zIndex={2}
                  pointerEvents={"none"}
                  p={10}
                >
                  <BButton
                    iconButton
                    pointerEvents={"auto"}
                    w={"fit"}
                    borderRadius={"full"}
                    bg={"white"}
                    size={"xl"}
                    ml={-4}
                    onClick={prev}
                  >
                    <Icon color={"p.900"} boxSize={6}>
                      <IconChevronLeft stroke={3} />
                    </Icon>
                  </BButton>

                  <BButton
                    iconButton
                    pointerEvents={"auto"}
                    w={"fit"}
                    borderRadius={"full"}
                    bg={"white"}
                    size={"xl"}
                    mr={-4}
                    onClick={next}
                  >
                    <Icon color={"p.900"} boxSize={6}>
                      <IconChevronRight stroke={3} />
                    </Icon>
                  </BButton>
                </HStack>

                {/* Option List */}
                <Box
                  ref={carouselContainerRef}
                  scrollBehavior={"smooth"}
                  h={"full"}
                  overflowX={"auto"}
                  className="noScroll"
                >
                  <HStack
                    h={"full"}
                    w={"max"}
                    align={"stretch"}
                    gap={8}
                    px={10}
                  >
                    {data?.map((item: any, i: number) => {
                      return (
                        <CContainer
                          key={i}
                          h={"full"}
                          w={"fit"}
                          cursor={"pointer"}
                          className="clicky"
                          onClick={() => handleChoose(item)}
                        >
                          <Image src={item?.production} h={"full"} />
                        </CContainer>
                      );
                    })}
                  </HStack>
                </Box>
              </>
            )}
          </>
        )}
      </CContainer>
    </CContainer>
  );
};

const ChooseTemplatePage = () => {
  // Contexts
  const template = useSessionTemplate((s) => s.template);

  return (
    <Box h={"100dvh"}>
      <Box flexShrink={0} h={"50%"} bg={"p.100"} p={10}>
        <HStack align={"start"} h={"full"} w={"full"} justify={"space-between"}>
          <SessionTimer w={"250px"} />

          <CContainer h={"full"} w={"fit"}>
            <Image
              src={template?.production}
              h={"full"}
              objectFit={"contain"}
            />
          </CContainer>

          <NextButton to={"/edit-photo"} disabled={!template} />
        </HStack>
      </Box>

      <OptionList />
    </Box>
  );
};

export default ChooseTemplatePage;
