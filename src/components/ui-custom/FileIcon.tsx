import { Icon as ChakraIcon, IconProps } from "@chakra-ui/react";
import {
  IconFile,
  IconFileTypeCsv,
  IconFileTypeDoc,
  IconFileTypePdf,
  IconFileTypeXls,
  IconPhoto,
  IconPresentation,
} from "@tabler/icons-react";
import { forwardRef } from "react";

interface Props extends IconProps {
  mimeType?: string;
  iconProps?: any;
}

const FileIcon = forwardRef<SVGSVGElement, Props>(
  ({ mimeType, iconProps, ...props }, ref) => {
    let iconColor = "current";
    let IconComponent;

    switch (mimeType?.toLowerCase()) {
      default:
        IconComponent = IconFile;
        break;
      case "pdf":
      case "application/pdf":
        iconColor = "red.500";
        IconComponent = IconFileTypePdf;
        break;
      case "docx":
      case "doc":
      case "vnd.ms-word":
      case "vnd.openxmlformats-officedocument.wordprocessingml.document":
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        iconColor = "blue.500";
        IconComponent = IconFileTypeDoc;
        break;
      case "xls":
      case "xlsx":
      case "vnd.ms-excel":
      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        iconColor = "green.500";
        IconComponent = IconFileTypeXls;
        break;
      case "ppt":
      case "pptx":
      case "vnd.ms-presentation":
      case "vnd.openxmlformats-officedocument.presentationml.presentation":
        iconColor = "green.500";
        IconComponent = IconPresentation;
        break;
      case "csv":
        iconColor = "green.500";
        IconComponent = IconFileTypeCsv;
        break;
      case "jpg":
      case "jpeg":
      case "png":
      case "svg":
      case "heic":
      case "webp":
      case "gif":
      case "tiff":
      case "tif":
      case "image/jpg":
      case "image/jpeg":
      case "image/png":
      case "image/svg":
      case "image/heic":
      case "image/webp":
      case "image/gif":
      case "image/tiff":
      case "image/tif":
        iconColor = "purple.500";
        IconComponent = IconPhoto;
        break;
    }

    return (
      <ChakraIcon color={iconColor} ref={ref} {...props}>
        <IconComponent {...iconProps} />
      </ChakraIcon>
    );
  }
);

export default FileIcon;
