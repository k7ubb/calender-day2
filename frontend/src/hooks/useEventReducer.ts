import { useReducer } from "react";
import { getRoundToNearestTwoHour } from "helpers/dateHelpers";
import { EventInfoType, NewEventInfoType, UpdateEditingEvent } from "types/type";

const initEventInfo: NewEventInfoType = {
  title: "",
  start: new Date(),
  end: new Date(),
  allDay: false,
  className: "",
};

// 保持しているイベント情報を更新する
const reducer = (state: EventInfoType | NewEventInfoType, action: UpdateEditingEvent) => {
  switch (action.type) {
    case "title":
      return { ...state, title: action.value };
    case "allDay":
      return { ...state, allDay: action.value };
    case "start":
      try {
        const newStart = action.value ? action.value.toDate() : new Date();
        return { ...state, start: newStart };
      } catch {
        return state;
      }
    case "end":
      try {
        const newEnd = action.value ? action.value.toDate() : new Date();
        return { ...state, end: newEnd };
      } catch {
        return state;
      }
    case "className":
      return { ...state, className: action.value };
    case "all":
      return action.value;
    case "init":
      const { roundedDate, nextHourDate } = getRoundToNearestTwoHour();

      const newEventInfo: NewEventInfoType = {
        title: "",
        start: roundedDate,
        end: nextHourDate,
        allDay: false,
        className: "",
      };
      return newEventInfo;
    default:
      return state;
  }
};

// diaglogで表示/編集するイベント情報を管理する
export const useEventReducer = () => {
  const [dialogEventInfo, dispatch] = useReducer(reducer, initEventInfo);
  return {
    dialogEventInfo,
    dispatch,
  };
};
