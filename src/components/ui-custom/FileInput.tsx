import { Icon } from "@chakra-ui/react";
import { IconUpload } from "@tabler/icons-react";
import {
  FileUploadDropzone,
  FileUploadList,
  FileUploadRoot,
  FileUploadRootProps,
  FileUploadTrigger,
} from "../ui/file-button";
import BButton from "./BButton";
import useLang from "@/context/useLang";

interface Props extends FileUploadRootProps {
  name?: string;
  onChangeSetter?: (inputValue: File[] | undefined) => void;
  inputValue?: File[] | string | undefined;
  accept?: string;
  invalid?: boolean;
  placeholder?: string;
  initialFilepath?: string;
  label?: string;
  dropzine?: boolean;
  description?: string;
  maxFiles?: number;
}
const FileInput = (props: Props) => {
  // Props
  const {
    name,
    onChangeSetter,
    inputValue,
    accept,
    invalid,
    placeholder,
    initialFilepath,
    label,
    dropzine,
    description = `size up to 10 MB, max ${props.maxFiles} file(s)`,
    maxFiles = 1,
    ...restProps
  } = props;

  // Contexts
  const { l } = useLang();

  // Utils
  const handleFileChange = (details: any) => {
    if (onChangeSetter) {
      onChangeSetter(
        details.acceptedFiles && details.acceptedFiles.length > 0
          ? details.acceptedFiles
          : undefined
      );
    }
  };

  return (
    <FileUploadRoot
      alignItems="stretch"
      onFileChange={handleFileChange}
      maxFiles={maxFiles}
      {...restProps}
    >
      <>
        {dropzine ? (
          <FileUploadDropzone
            borderColor={invalid ? "fg.error" : ""}
            description={description}
            label={l.file_dropzone_label}
          />
        ) : (
          <FileUploadTrigger asChild borderColor={invalid ? "fg.error" : ""}>
            <BButton variant="outline">
              <Icon scale={0.8}>
                <IconUpload />
              </Icon>{" "}
              {label || "File upload"}
            </BButton>
          </FileUploadTrigger>
        )}

        <FileUploadList showSize clearable />
      </>
    </FileUploadRoot>
  );
};

export default FileInput;
