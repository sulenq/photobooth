import BButton from "@/components/ui-custom/BButton";
import CContainer from "@/components/ui-custom/CContainer";
import Heading1 from "@/components/ui-custom/Heading1";
import NavLink from "@/components/ui-custom/NavLink";
import PageContainer from "@/components/widget/PageContainer";
import { IMAGES_PATH, SVGS_PATH } from "@/constants/paths";
import { PRESET_MAIN_BUTTON } from "@/constants/presetProps";
import { Box, HStack, Icon, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { IconClock } from "@tabler/icons-react";

const PROSEDUR = [
  {
    label: {
      id: "Mulai Sesi Foto",
      en: "Start Photo Session",
    },
    img: `${IMAGES_PATH}/prosedur/1.png`,
  },
  {
    label: {
      id: "Pilih Frame Foto",
      en: "Choose Photo Frame",
    },
    img: `${IMAGES_PATH}/prosedur/2.png`,
  },
  {
    label: {
      id: "Atur Foto & Tambah Filter",
      en: "Drag, Drop Photo & Add Filter",
    },
    img: `${IMAGES_PATH}/prosedur/3.png`,
  },
  {
    label: {
      id: "Cetak & Simpan Foto",
      en: "Print & Save Photo",
    },
    img: `${IMAGES_PATH}/prosedur/1.png`,
  },
];

const ProcedurePage = () => {
  // Fetch timer data

  return (
    <PageContainer gap={10}>
      <HStack w={"fit"} gap={0} pos={"relative"} mx={"auto"}>
        <Image
          src={`${SVGS_PATH}/bling.svg`}
          pos={"absolute"}
          top={"-20px"}
          left={"-30px"}
          w={"30px"}
          mb={"auto"}
          transform={"rotate(-90deg)"}
        />

        <HStack p={3} borderRadius={8} bg={"p.900"} w={"fit"} mx={"auto"}>
          <Icon color={"p.100"}>
            <IconClock size={32} stroke={3} />
          </Icon>

          <Text color={"p.100"} fontSize={32} fontWeight={"semibold"}>
            00:07:00
          </Text>
        </HStack>

        <Image
          src={`${SVGS_PATH}/!.svg`}
          pos={"absolute"}
          bottom={0}
          right={"-50px"}
          w={"50px"}
          transform={"rotate(30deg)"}
        />
      </HStack>

      <CContainer gap={4}>
        <Text fontSize={20} fontWeight={"semibold"}>
          Pssst...u're almost there!
        </Text>

        <Text fontSize={20} fontWeight={"semibold"}>
          Demi kenyamanan bersama, perlu diperhatikan bahwa ada waktu limit
          dalam satu kali sesi foto, maksimal 1 sesi foto selama 7 menit.
          Pastikan kamu dapat menyelesaikan foto dan cetak sebelum waktu habis.
        </Text>

        <Text fontStyle={"italic"} fontSize={18}>
          For everyone's comfort, please note that there is a time limit for
          each photo session — a maximum of 1 photo session is 7 minutes. Make
          sure to complete your photo-taking and printing before the time runs
          out.
        </Text>
      </CContainer>

      <CContainer gap={4}>
        <Heading1
          className="df"
          fontWeight={"semibold"}
          textAlign={"center"}
          mb={4}
        >
          Prosedur
        </Heading1>

        <SimpleGrid columns={[1, 2, 4]} gap={8}>
          {PROSEDUR.map((item, i) => {
            return (
              <CContainer key={i} gap={4} h={"full"}>
                <Image src={item.img} />

                <CContainer
                  p={2}
                  borderRadius={8}
                  border={"2px solid {colors.pd}"}
                  h={"full"}
                  justify={"center"}
                  gap={2}
                >
                  <Text
                    textAlign={"center"}
                    fontSize={18}
                    fontWeight={"medium"}
                  >
                    {item.label.id}
                  </Text>

                  <Box h={"2px"} w={"full"} bg={"p.300"} />

                  <Text textAlign={"center"} fontWeight={"medium"}>
                    {item.label.en}
                  </Text>
                </CContainer>
              </CContainer>
            );
          })}
        </SimpleGrid>

        <NavLink to="/take-photo" mx={"auto"}>
          <BButton mt={4} mx={"auto"} {...PRESET_MAIN_BUTTON}>
            NEXT
          </BButton>
        </NavLink>
      </CContainer>
    </PageContainer>
  );
};

export default ProcedurePage;
