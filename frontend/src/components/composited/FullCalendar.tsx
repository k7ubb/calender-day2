import FullCalendarBase from "@fullcalendar/react";
import { EventClickArg, EventDropArg } from "@fullcalendar/core";
import allLocales from "@fullcalendar/core/locales-all";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin, { EventResizeDoneArg } from "@fullcalendar/interaction";
import { getToday } from "helpers/dateHelpers";
import { EventInfoType } from "types/type";

type FullCalendarProps = {
  eventList: EventInfoType[];
  handleEventDrop: (arg: EventDropArg) => void; // イベントをドラッグした時の処理
  handleEventClick: (arg: EventClickArg) => void; // イベントをクリックした時の処理
  handleEventResize: (arg: EventResizeDoneArg) => void; // イベントをリサイズした時の処理
};

// カレンダー本体
const FullCalendar = ({ eventList, handleEventDrop, handleEventClick, handleEventResize }: FullCalendarProps) => {
  type EventInfoNotNull = EventInfoType & { id: string };
  const filteredEventList = eventList.filter((event) => event.id !== null) as EventInfoNotNull[];
  return (
    <FullCalendarBase
      locales={allLocales}
      locale="ja"
      plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      initialDate={getToday()}
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay listMonth",
      }}
      editable
      eventDrop={handleEventDrop}
      events={filteredEventList}
      eventClick={handleEventClick}
      eventResize={handleEventResize}
      height="100%"
    />
  );
};

export default FullCalendar;
