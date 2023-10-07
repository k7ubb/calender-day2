import { useEffect, useState, useCallback } from "react";
import { EventClickArg, EventDropArg } from "@fullcalendar/core";
import { EventResizeDoneArg } from "@fullcalendar/interaction";
import { Box, Button } from "@mui/material";
import CalendarLogo from "components/base/CalendarLogo";
import { CustomAlert } from "components/base/CustomAlert";
import EventDialog from "components/composited/EventDialog";
import FullCalendar from "components/composited/FullCalendar";
import { getEventList, editEventStartEndTime } from "helpers/eventLogics";
import { useEventReducer } from "hooks/useEventReducer";
import { EventInfoType, AlertInfo } from "types/type";

// このアプリのメインのコンポーネント
const Calendar = () => {
  // カレンダーに表示するイベントの情報
  const [eventList, setEventList] = useState<EventInfoType[]>([]);
  // 編集画面で表示するイベントの情報
  const { dialogEventInfo, dispatch } = useEventReducer();
  // 編集画面のダイアログの開閉状態
  const [dialogOpenStatus, setDialogOpenStatus] = useState<"edit" | "detail" | "close">("close");
  // Alertの情報
  const [alertInfo, setAlertInfo] = useState<AlertInfo | null>(null);
  // キー入力履歴
  const [keyHistoryList, setKeyHistoryList] = useState<string[]>([]);

  // App初期化
  useEffect(() => {
    // イベントの一覧をバックエンドから取得する
    updateEventList();

    // キー入力履歴を10個まで保存する
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;
      setKeyHistoryList((prev) => [...prev, key].slice(-10));
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // ダイアログに表示するイベントの情報を変更する
  const changeDialogEventInfoId = useCallback(
    (newEventInfoId?: string) => {
      const eventInfo = eventList.find((event) => event.id === newEventInfoId);
      if (eventInfo) {
        dispatch({ type: "all", value: eventInfo });
      } else {
        dispatch({ type: "init" });
      }
    },
    [eventList]
  );

  // イベントの一覧をバックエンドから取得する
  const updateEventList = async () => {
    const eventList = await getEventList();
    if (!eventList) {
      console.error("error");
      return;
    }
    setEventList(eventList);
  };

  // カレンダーのイベントをクリックしたときの処理
  // イベントの詳細を表示するダイアログを開く
  const handleEventClick = useCallback(
    (arg: EventClickArg) => {
      changeDialogEventInfoId(arg.event.id);
      setDialogOpenStatus("detail");
    },
    [changeDialogEventInfoId]
  );

  // カレンダーのイベントをドラッグ&ドロップしたときの処理
  // イベントの開始時間と終了時間を変更する
  const handleEventDrop = useCallback(async (eventDropInfo: EventDropArg) => {
    const { event } = eventDropInfo;
    const start = event.start ?? new Date();
    const end = event.end ?? new Date(start.getTime() + 60 * 60 * 1000); // 終日から時間指定に変更した場合、endがnullになるので、startの1時間後にする
    const allDay = event.allDay;
    const id = event.id;

    if (await editEventStartEndTime(id, start, end, allDay)) {
      await updateEventList();
      setAlertInfo({ status: "success", message: "変更しました" });
    } else {
      eventDropInfo.revert();
      setAlertInfo({ status: "error", message: "変更に失敗しました" });
    }
  }, []);

  // カレンダーのイベントをリサイズしたときの処理
  // イベントの開始時間と終了時間を変更する
  const handleEventResize = useCallback(async (eventResizeInfo: EventResizeDoneArg) => {
    const { event } = eventResizeInfo;
    const start = new Date(event.startStr);
    const end = new Date(event.endStr);
    const allDay = event.allDay;
    const id = event.id;
    if (await editEventStartEndTime(id, start, end, allDay)) {
      setAlertInfo({ status: "success", message: "変更しました" });
    } else {
      eventResizeInfo.revert();
      setAlertInfo({ status: "error", message: "変更に失敗しました" });
    }
    updateEventList();
  }, []);

  // 予定を追加ボタンをクリックしたときの処理
  // イベントの新規作成画面を開く
  const handleAddEventClick = useCallback(() => {
    changeDialogEventInfoId(undefined);
    setDialogOpenStatus("edit");
  }, [changeDialogEventInfoId]);

  // ダイアログを閉じるときの処理
  const handleCloseDialog = useCallback(async (refresh = false) => {
    if (refresh) {
      await updateEventList();
    }
    setDialogOpenStatus("close");
  }, []);

  // キー入力履歴を監視して、コマンドを入力したらロゴを回転させる
  useEffect(() => {
    const code = "ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba";
    if (keyHistoryList.join("") === code) {
      setAlertInfo({ status: "info", message: "コマンドを入力しました" });
      const logo = document.querySelector(".calendar-logo");
      if (logo) {
        logo.children[0].classList.add("rotate");
      }
    }
  }, [keyHistoryList]);

  return (
    <>
      <CalendarLogo />
      <CustomAlert alertInfo={alertInfo} />
      <Box className="container">
        <FullCalendar
          eventList={eventList}
          handleEventClick={handleEventClick}
          handleEventDrop={handleEventDrop}
          handleEventResize={handleEventResize}
        />
        {/* 予定を追加するボタン */}
        <Button className="add-button" variant="contained" onClick={handleAddEventClick}>
          予定を追加
        </Button>
        {/* イベントか予定を追加ボタンをクリックした時に開くダイアログ */}
        <EventDialog
          open={dialogOpenStatus}
          setDialogOpenStatus={setDialogOpenStatus}
          editingEventInfo={dialogEventInfo}
          handleCloseDialog={handleCloseDialog}
          dispatchDialogEventInfo={dispatch}
          setAlertInfo={setAlertInfo}
        />
      </Box>
    </>
  );
};

export default Calendar;
