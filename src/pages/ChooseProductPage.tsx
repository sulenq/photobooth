import CContainer from "@/components/ui-custom/CContainer";
import FeedbackNoData from "@/components/ui-custom/FeedbackNoData";
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

  // Contexts
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
  function getProducts() {
    const url = `/products/get-public-v2`;
    req({ config: { url } });
  }

  // Handle get product on page load
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <PageContainer gap={10} justify={"space-between"} p={0}>
      <CContainer p={5}>
        <Header1 backLink="/">Choose Product</Header1>
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
                {!data && <FeedbackNoData />}

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

          {error && <FeedbackRetry onRetry={getProducts} />}
        </>
      )}

      <CContainer p={5} align={"center"}>
        <NextButton
          to={`/choose-template`}
          disabled={choosedProduct === null}
        />
      </CContainer>
    </PageContainer>
  );
};

export default ChooseProductPage;
