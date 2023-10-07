import TextField, { TextFieldProps } from "@mui/material/TextField";

type CustomTextFieldProps = {
  margin?: "none" | "dense" | "normal";
  variant?: "standard" | "filled" | "outlined";
};

export const CustomTextField = ({
  margin = "dense",
  variant = "standard",
  ...props
}: TextFieldProps & CustomTextFieldProps) => {
  return <TextField {...props} margin={margin} variant={variant} />;
};
