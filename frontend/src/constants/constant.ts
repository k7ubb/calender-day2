export const API_BASE_URL = "http://localhost:8080/api";

// クラス名とカレンダーに表示する色の対応
export const CLASS_COLORS = [
  {
    className: "仕事",
    color: "blue",
  },
  {
    className: "プライベート",
    color: "pink",
  },
  {
    className: "外出(顧客訪問)",
    color: "green",
  },
  {
    className: "会議(社内)",
    color: "red",
  },
  {
    className: "会議(社外)",
    color: "cyan",
  },
  {
    className: "その他",
    color: "yellow",
  },
];

// 上記のクラス名にマッチしない場合に使用する色
export const DEFAULT_COLOR = "gray";
