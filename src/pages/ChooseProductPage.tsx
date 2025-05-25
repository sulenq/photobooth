import CContainer from "@/components/ui-custom/CContainer";
import ChooseProductItem from "@/components/widget/ChooseProductItem";
import Heading from "@/components/widget/Heading";
import NextButton from "@/components/widget/NextButton";
import PageContainer from "@/components/widget/PageContainer";
import { IMAGES_PATH } from "@/constants/paths";
import useChoosedProduct from "@/context/useChoosedProduct";
import useRequest from "@/hooks/useRequest";
import { HStack } from "@chakra-ui/react";

const ChooseProductPage = () => {
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
  const { choosedProduct, setChoosedProduct } = useChoosedProduct();

  // Utils
  function handleChoose(product: any) {
    setChoosedProduct({
      product: product,
      ammount: 1,
    });
  }

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
                choosed={choosedProduct}
                setChoosed={setChoosedProduct}
              />
            );
          })}
        </HStack>
      </CContainer>

      <NextButton to={`/payment`} disabled={choosedProduct === null} />
    </PageContainer>
  );
};

export default ChooseProductPage;
