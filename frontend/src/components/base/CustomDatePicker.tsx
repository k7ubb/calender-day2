import { DateTimePicker, DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import ja from "dayjs/locale/ja";

type CustomDateTimePickerProp = {
  label: string;
  value: dayjs.Dayjs;
  onChange: (value: dayjs.Dayjs | null) => void;
};

export const CustomDateTimePicker = ({ label, value, onChange }: CustomDateTimePickerProp) => {
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale={dayjs.locale(ja)}
      dateFormats={{ monthAndYear: "YYYY年 MM月" }}
      localeText={{
        previousMonth: "前月",
        nextMonth: "次月",
      }}
    >
      <DateTimePicker
        ampm={false}
        value={value}
        onChange={onChange}
        label={label}
        slotProps={{ textField: { variant: "standard" } }}
      />
    </LocalizationProvider>
  );
};

export const CustomDatePicker = ({ label, value, onChange }: CustomDateTimePickerProp) => {
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale={dayjs.locale(ja)}
      dateFormats={{ monthAndYear: "YYYY年 MM月" }}
      localeText={{
        previousMonth: "前月",
        nextMonth: "次月",
      }}
    >
      <DatePicker
        value={value}
        onChange={onChange}
        label={label}
        slotProps={{ textField: { variant: "standard" } }}
      />
    </LocalizationProvider>
  );
};
