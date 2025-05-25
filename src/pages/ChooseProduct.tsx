import CContainer from "@/components/ui-custom/CContainer";
import ChooseProductItem from "@/components/widget/ChooseProductItem";
import Heading from "@/components/widget/Heading";
import NextButton from "@/components/widget/NextButton";
import PageContainer from "@/components/widget/PageContainer";
import { IMAGES_PATH } from "@/constants/paths";
import useRequest from "@/hooks/useRequest";
import { HStack } from "@chakra-ui/react";
import { useState } from "react";

const ChooseProduct = () => {
  // Hooks
  const {} = useRequest({ id: "choose-product" });
  const data = [
    {
      id: 1,
      productPhoto: `${IMAGES_PATH}/product1.png`,
      productName: "PHOTO ONLY",
      productPrice: 30000,
    },
    {
      id: 2,
      productPhoto: `${IMAGES_PATH}/product2.png`,
      productName: "PHOTO ONLY",
      productPrice: 45000,
    },
  ];

  // States
  const [choosed, setChoosed] = useState<any>(null);

  // Utils
  function handleChoose(product: any) {
    setChoosed({
      product: product,
      ammount: 1,
    });
  }

  console.log(choosed);

  return (
    <PageContainer gap={10} justify={"space-between"}>
      <Heading>Choose Product</Heading>

      <CContainer>
        <HStack h={"max"} mx={"auto"} gap={10}>
          {data.map((item, i) => {
            return (
              <ChooseProductItem
                key={i}
                item={item}
                chooseCallback={() => {
                  handleChoose(item);
                }}
                choosed={choosed}
                setChoosed={setChoosed}
              />
            );
          })}
        </HStack>
      </CContainer>

      <NextButton to={`/payment`} disabled={choosed === null} />
    </PageContainer>
  );
};

export default ChooseProduct;
