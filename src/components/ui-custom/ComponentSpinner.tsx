import { Spinner, SpinnerProps, StackProps, VStack } from "@chakra-ui/react";

interface Props extends StackProps {
  spinnerProps?: SpinnerProps;
}

export default function ComponentSpinner({ spinnerProps, ...props }: Props) {
  return (
    <VStack w={"full"} h={"200px"} justify={"center"} {...props}>
      <Spinner {...spinnerProps} />
    </VStack>
  );
}
