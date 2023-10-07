import { DateTimePicker, DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import ja from "dayjs/locale/ja";

type CustomDateTimePickerProp = {
  label: string;
  value: dayjs.Dayjs;
  onChange: (value: dayjs.Dayjs | null) => void;
  error?: boolean;
};

export const CustomDateTimePicker = ({ label, value, onChange, error }: CustomDateTimePickerProp) => {
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
        slotProps={{
          textField: {
            variant: "standard",
            error: error,
            helperText: error? "終了日時は開始日時より後にしてください" : "",
          }
        }}
      />
    </LocalizationProvider>
  );
};

export const CustomDatePicker = ({ label, value, onChange, error }: CustomDateTimePickerProp) => {
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
        slotProps={{
          textField: {
            variant: "standard",
            error: error,
            helperText: error? "終了日時は開始日時より後にしてください" : "",
          }
        }}
      />
    </LocalizationProvider>
  );
};
