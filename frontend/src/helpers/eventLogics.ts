import axios from "axios";
import { EventInput } from "@fullcalendar/core";
import { API_BASE_URL, CLASS_COLORS, DEFAULT_COLOR } from "constants/constant";
import { NewEventInfoType, EventInfoType } from "types/type";

// イベントのデータを取得(GET)
export const getEventList = () =>
  axios
    .get<EventInfoType[]>(`${API_BASE_URL}/events`)
    .then((res) => {
      res.data.forEach((event) => {
        // classNmaesに応じて色情報を付加する
        event.color = getClassColor(event.className);
      });
      return res.data;
    })
    .catch((error) => {
      console.error("イベントの取得に失敗しました。", error);
      return null;
    });

// イベント作成時・更新ダイアログからの更新時に呼び出される
export const saveEvent = (eventInfo: EventInfoType | NewEventInfoType) => {
  // イベントIDがある場合は更新、ない場合は新規作成
  if (eventInfo.id === undefined) {
    return postEvent(eventInfo);
  } else {
    return putEvent(eventInfo.id, eventInfo);
  }
};

// イベントのデータを更新(PUT)
const putEvent = (eventInfoId: string, eventInfo: EventInfoType) =>
  axios
    .put(`${API_BASE_URL}/events/${eventInfoId}`, eventInfo)
    .then(() => true)
    .catch((error) => {
      console.error("イベントの更新に失敗しました。", error);
      return false;
    });

// イベントのデータを更新(POST)
const postEvent = (eventInfo: NewEventInfoType) =>
  axios
    .post(`${API_BASE_URL}/events`, eventInfo)
    .then((res) => true)
    .catch((error) => {
      console.error("イベントの登録に失敗しました。", error);
      return false;
    });

// イベントのデータを削除(DELETE)
export const deleteEvent = (eventInfoId: string) =>
  axios
    .delete(`${API_BASE_URL}/events/${eventInfoId}`)
    .then(() => true)
    .catch((error) => {
      console.error("イベントの削除に失敗しました。", error);
      return false;
    });

// イベントの開始時刻だけを変更(PATCH)
export const editEventStartEndTime = (eventInfoId: string, start: Date, end: Date, allDay: boolean) =>
  axios
    .patch<EventInfoType>(`${API_BASE_URL}/events/${eventInfoId}`, {
      start: start,
      end: end,
      allDay: allDay,
    })
    .then(() => true)
    .catch((error) => {
      console.error("イベントの更新に失敗しました。", error);
      return false;
    });

// クラス名に対応する色情報を取得する
export const getClassColor = (className: string) => {
  const classEntry = CLASS_COLORS.find((entry: EventInput) => entry.className === className);
  return classEntry ? classEntry.color : DEFAULT_COLOR; // マッチするクラスがない場合はデフォルトの色を使用
};
