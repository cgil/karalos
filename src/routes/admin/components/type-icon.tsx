import React from "react";
import FolderIcon from "@mui/icons-material/Folder";
import ImageIcon from "@mui/icons-material/ImageOutlined";

type TypeIconProps = {
  droppable: boolean;
  fileType?: string;
};

export const TypeIcon: React.FC<TypeIconProps> = (props) => {
  if (props.droppable) {
    return <FolderIcon />;
  }

  switch (props.fileType) {
    case "image":
      return <ImageIcon />;
    default:
      return null;
  }
};
