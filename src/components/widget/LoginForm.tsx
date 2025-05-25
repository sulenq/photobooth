import useLang from "@/context/useLang";
import { useThemeConfig } from "@/context/useThemeConfig";
import useRequest from "@/hooks/useRequest";
import { FieldsetRoot, HStack, Text } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import BButton from "../ui-custom/BButton";
import CContainer from "../ui-custom/CContainer";
import Heading6 from "../ui-custom/Heading6";
import PasswordInput from "../ui-custom/PasswordInput";
import StringInput from "../ui-custom/StringInput";
import TextRouterLink from "../ui-custom/TextRouterLink";
import { Field } from "../ui/field";

const LoginForm = () => {
  // Contexts
  const { l } = useLang();
  // const { setAuthToken, setPermissions } = useAuthMiddleware();
  const { themeConfig } = useThemeConfig();

  // Utils
  const { loading } = useRequest({
    id: "login",
    loadingMessage: {
      ...l.login_loading_toast,
    },
    successMessage: {
      ...l.login_success_toast,
    },
    errorMessage: {
      400: {
        WRONG_CREDENTIALS: {
          ...l.login_wrong_credentials_toast,
        },
      },
    },
  });
  const navigate = useNavigate();

  // Formik
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      identifier: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      identifier: yup.string().required(l.required_form),
      password: yup.string().required(l.required_form),
    }),
    onSubmit: () => {
      // const payload = {
      //   email: values.identifier,
      //   password: values.password,
      // };
      // const config = {
      //   method: "post",
      //   url: `/login`,
      //   data: payload,
      // };
      // req({
      //   config,
      //   onResolve: {
      //     onSuccess: (r: any) => {
      //       //! Dummy
      //       const dummy_user = {
      //         name: "Sulenq Wazawsky",
      //         avatar: "https://bit.ly/sage-adebayo",
      //         email: "sulengpol@gmail.com",
      //         subscriptions: [
      //           {
      //             id: 1,
      //             name: "HRIS",
      //             pricing: {
      //               id: 1,
      //               name: "Essential",
      //             },
      //           },
      //         ],
      //         permissions: [], // number array
      //       };
      //       localStorage.setItem("__auth_token", r.data.token);
      //       localStorage.setItem(
      //         "__user_data",
      //         r.data.data?.user || JSON.stringify(dummy_user)
      //       );
      //       setAuthToken(r.data.token);
      //       setPermissions(r.data.user.permission ?? []);
      //       navigate("/home");
      //     },
      //   },
      // });
      navigate("/profile");
    },
  });

  return (
    <CContainer
      bg={"body"}
      m={"auto"}
      w={"full"}
      maxW={"380px"}
      p={4}
      borderRadius={8}
    >
      <FieldsetRoot disabled={loading}>
        <CContainer mb={4} gap={1}>
          <Heading6 fontWeight={"bold"}>{l.login_form.title}</Heading6>
          <Text fontSize={"sm"}>{l.login_form.description}</Text>
        </CContainer>

        <form id="login-form" onSubmit={formik.handleSubmit}>
          <Field
            label="Email/Username"
            invalid={!!formik.errors.identifier}
            errorText={formik.errors.identifier}
            mb={4}
          >
            <StringInput
              name="identifier"
              onChangeSetter={(input) => {
                formik.setFieldValue("identifier", input);
              }}
              inputValue={formik.values.identifier}
              placeholder="example@email.com"
            />
          </Field>

          <Field
            label="Password"
            invalid={!!formik.errors.password}
            errorText={formik.errors.password}
          >
            <PasswordInput
              name="password"
              onChangeSetter={(input) => {
                formik.setFieldValue("password", input);
              }}
              inputValue={formik.values.password}
              placeholder="example@email.comm"
            />
          </Field>

          <HStack mt={4}>
            <TextRouterLink to="/">{l.forgot_password}</TextRouterLink>
          </HStack>

          <BButton
            type="submit"
            form="login-form"
            w={"full"}
            mt={6}
            size={"lg"}
            loading={loading}
            colorPalette={themeConfig.colorPalette}
          >
            Login
          </BButton>
        </form>
      </FieldsetRoot>
    </CContainer>
  );
};

export default LoginForm;
