import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

// 今日の日付を取得
// カレンダーのデフォルト表示に利用している
export const getToday = (): string => {
  const d = dayjs.tz();
  return d.format("YYYY-MM-DD");
};

// 時間を丸める
export const getRoundedDate = (date: dayjs.Dayjs): dayjs.Dayjs => {
  const roundedHour = date.hour();
  const roundedDate = resetTime(date, ["minute", "second", "millisecond"]);
  roundedDate.set("hour", roundedHour);
  return roundedDate;
};

// 指定した日時部分をリセットする
const resetTime = (date: dayjs.Dayjs, resetParamList: dayjs.UnitTypeLong[]) => {
  resetParamList.forEach((param) => {
    date = date.set(param, 0);
  });
  return date;
};

// 時間を丸めた二つのデフォルト値を取得
// 予定を追加する際のデフォルト値に利用している
export const getRoundToNearestTwoHour = (): { roundedDate: Date; nextHourDate: Date } => {
  const currentDate = dayjs.tz();

  const roundedDateDayjs = getRoundedDate(currentDate).add(1, "hour");
  const nextHourDateDayjs = roundedDateDayjs.add(1, "hour");

  const roundedDate = roundedDateDayjs.toDate();
  const nextHourDate = nextHourDateDayjs.toDate();

  return { roundedDate, nextHourDate };
};

// dateを表示用にフォーマットする
export const getFormatedDateTime = (date: Date): string => {
  // get timezone offset from date
  const dateDayjs = dayjs(date).tz();

  return dateDayjs.format("YYYY-MM-DD HH:mm");
};

export const getFormatedDate = (date: Date): string => {
  // get timezone offset from date
  const dateDayjs = dayjs.tz(date);

  return dateDayjs.format("YYYY-MM-DD");
};
