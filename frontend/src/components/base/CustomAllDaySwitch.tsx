import { FormControlLabel, Switch } from "@mui/material";

type CustomAllDaySwitchProp = {
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
};

export const CustomAllDaySwitch = ({ label, checked, onChange }: CustomAllDaySwitchProp) => {
  return (
    <FormControlLabel control={
        <Switch
          defaultChecked={checked}
          onChange={onChange}
        />
      }
      label={label}
    />
  );
};
