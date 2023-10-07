import { AlertColor } from "@material-ui/core";

export type EventInfoType = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  className: string;
  color?: string;
};

export type NewEventInfoType = Omit<EventInfoType, "id"> & {
  id?: never;
};

export type AlertInfo = {
  status: AlertColor;
  message: string;
};

export type UpdateEditingEvent =
  | { type: "title"; value: string }
  | { type: "start"; value: Dayjs }
  | { type: "end"; value: Dayjs }
  | { type: "className"; value: string }
  | { type: "all"; value: EventInfoType }
  | { type: "init" };
