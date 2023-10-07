import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

type CustomIconButtonProps = ButtonProps & {
  icon: "edit" | "delete" | "close";
};

export const CustomIconButton: React.FC<CustomIconButtonProps> = ({ icon, ...props }) => {
  return (
    <Button {...props} className="icon-button">
      <Icon icon={icon} />
    </Button>
  );
};

// icon に応じて適切なアイコンコンポーネントを選択
const Icon: React.FC<Pick<CustomIconButtonProps, "icon">> = ({ icon }) => {
  if (icon === "edit") return <EditIcon />;
  if (icon === "delete") return <DeleteIcon />;
  if (icon === "close") return <CloseIcon />;
  return null;
};
