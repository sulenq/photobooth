import { Button, ButtonProps } from "@chakra-ui/react";
import useLang from "../../context/useLang";
import { Tooltip } from "../ui/tooltip";

interface Props extends ButtonProps {}

export default function LangSwitcher({ ...props }: Props) {
  const { lang, setLang } = useLang();

  return (
    <Tooltip content={""}>
      <Button
        className={"btn"}
        onClick={() => {
          if (lang === "id") setLang("en");
          if (lang === "en") setLang("id");
        }}
        px={"4px !important"}
        {...props}
      >
        {lang === "en" ? "ID" : "EN"}
      </Button>
    </Tooltip>
  );
}
