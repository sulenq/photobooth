import CContainer from "@/components/ui-custom/CContainer";
import FeedbackRetry from "@/components/ui-custom/FeedbackRetry";
import ChooseProductItem from "@/components/widget/ChooseProductItem";
import Header1 from "@/components/widget/Header1";
import NextButton from "@/components/widget/NextButton";
import PageContainer from "@/components/widget/PageContainer";
import useChoosedProduct from "@/context/useChoosedProduct";
import useRequest from "@/hooks/useRequest";
import { HStack, Spinner } from "@chakra-ui/react";
import { useEffect } from "react";

const ChooseProductPage = () => {
  // Hooks
  const { req, loading, response, error } = useRequest({
    id: "choose-product",
    showLoadingToast: false,
    showErrorToast: false,
    showSuccessToast: false,
  });

  // States
  const { choosedProduct, setChoosedProduct } = useChoosedProduct();

  // States
  const data = response?.data?.result?.productList;

  // Utils
  function handleChoose(product: any) {
    setChoosedProduct({
      product: product,
      qty: 1,
    });
  }
  function getProduct() {
    const url = `/products/get-public`;
    req({ config: { url } });
  }

  // Handle get product on page load
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <PageContainer gap={10} justify={"space-between"} p={0}>
      <CContainer p={5}>
        <Header1>Choose Product</Header1>
      </CContainer>

      {loading && (
        <CContainer flex={1} p={5}>
          <Spinner m={"auto"} size={"xl"} />
        </CContainer>
      )}

      {!loading && (
        <>
          {!error && (
            <CContainer overflowX={"auto"} className="noScroll">
              <HStack h={"max"} mx={"auto"} gap={10} px={10}>
                {data?.map((item: any, i: number) => {
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
          )}

          {error && <FeedbackRetry onRetry={getProduct} />}
        </>
      )}

      <CContainer p={5} align={"center"}>
        <NextButton to={`/payment`} disabled={choosedProduct === null} />
      </CContainer>
    </PageContainer>
  );
};

export default ChooseProductPage;
