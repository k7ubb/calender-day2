import React, { Dispatch, useCallback } from "react";
import {
  Box,
  Button,
  DialogActions,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps,
  SxProps,
  Theme,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { CustomDateTimePicker } from "components/base/CustomDatePicker";
import { CustomTextField } from "components/base/CustomTextField";
import { EventInfoType, NewEventInfoType, UpdateEditingEvent } from "types/type";
import { CLASS_COLORS } from "constants/constant";

type EditFormProps = {
  eventInfo: EventInfoType | NewEventInfoType;
  handleSave: (refresh?: boolean) => Promise<void>;
  dispatchDialogEventInfo: Dispatch<UpdateEditingEvent>;
  eventTitleEmptyError: boolean;
};

// イベント編集フォーム
const EditForm: React.FC<EditFormProps> = ({ eventInfo, handleSave, dispatchDialogEventInfo, eventTitleEmptyError }) => {
  // タイトルを変更した時の処理
  const handleChangeEventTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      dispatchDialogEventInfo({ type: "title", value: e.target.value });
    },
    [dispatchDialogEventInfo]
  );

  // 開始日時を変更した時の処理
  const handleChangeStartDateTime = useCallback(
    (value: Dayjs | null) => {
      if (value) dispatchDialogEventInfo({ type: "start", value: value });
    },
    [dispatchDialogEventInfo]
  );

  // 終了日時を変更した時の処理
  const handleChangeEndDateTime = useCallback(
    (value: Dayjs | null) => {
      if (value) dispatchDialogEventInfo({ type: "end", value: value });
    },
    [dispatchDialogEventInfo]
  );

  // ラベルを変更した時の処理
  const handleChangeClassName = useCallback(
    (event: SelectChangeEvent<string>) => {
      dispatchDialogEventInfo({ type: "className", value: event.target.value });
    },
    [dispatchDialogEventInfo]
  );

  return (
    <>
      <CustomTextField
        id="eventTitle"
        label="タイトル"
        type="text"
        placeholder="予定を追加"
        fullWidth
        autoFocus
        value={eventInfo.title ?? ""}
        onChange={handleChangeEventTitle}
        error={eventTitleEmptyError}
        helperText={eventTitleEmptyError? "タイトルを入力してください" : ""}
      />
      <CustomDateTimePicker label="開始日時" value={dayjs(eventInfo.start)} onChange={handleChangeStartDateTime} />
      <CustomDateTimePicker label="終了日時" value={dayjs(eventInfo.end)} onChange={handleChangeEndDateTime} />

      <FormControl variant="standard" fullWidth>
        <InputLabel>ラベル</InputLabel>
        <ClassNameSelect value={eventInfo.className ?? ""} onChange={handleChangeClassName} />
      </FormControl>

      <DialogActions>
        <Button variant="contained" onClick={() => handleSave(true)}>
          保存
        </Button>
      </DialogActions>
    </>
  );
};

// 項目のセレクトボックス
const ClassNameSelect: React.FC<SelectProps<string>> = ({ ...props }) => {
  const menuItemStyle: SxProps<Theme> = { gap: 1 };
  const boxStyle: SxProps<Theme> = { width: 10, height: 10, borderRadius: "50%" }; // ラベルの色を表示するためのボックス（円形）

  return (
    <Select {...props}>
      <MenuItem key="0" value="" sx={menuItemStyle}>
        <Box component="span" sx={{ ...boxStyle, opacity: 0 }} />
        なし
      </MenuItem>
      {CLASS_COLORS.map(({ className, color }) => {
        return (
          <MenuItem key={`${className}:${color}`} value={className} sx={menuItemStyle}>
            <Box component="span" sx={{ ...boxStyle, bgcolor: color }} />
            {className}
          </MenuItem>
        );
      })}
    </Select>
  );
};

export default EditForm;
