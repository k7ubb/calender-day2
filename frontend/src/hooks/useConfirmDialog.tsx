import React, { useState, useRef, useCallback } from "react";
import { Button, DialogContentText, DialogTitle, DialogContent, DialogActions, Dialog } from "@mui/material";

type ConfirmDialogProps = {
  message?: string;
  title?: string;
  open: boolean;
  handleOk: () => void;
  handleCancel: () => void;
};

// ダイアログを表示するためのカスタムフック
// ダイアログを表示するための関数と、ダイアログのコンポーネントを返す
export const useComfirmDialog = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const open = useRef(false);
  const response = useRef(false);

  // 画面更新用
  const [refleshState, setRefleshState] = useState(false);
  const reflesh = () => setRefleshState((prev) => !prev);

  // ダイアログを開いて、Openの状態が変わったら、responseを返す
  const openConfirmDialog = useCallback((title: string, message: string) => {
    setTitle(title);
    setMessage(message);
    open.current = true;
    reflesh();
    return new Promise((resolve: (value: boolean) => void) => {
      // 100msごとにOpenの状態を確認して、falseになったらresponseを返す
      const interval = setInterval(() => {
        if (!open.current) {
          resolve(response.current);
          clearInterval(interval);
        }
      }, 100);
    });
  }, []);

  // ダイアログのOKボタンを押した時の処理
  const handleOk = () => {
    response.current = true;
    open.current = false;
    reflesh();
  };

  // ダイアログのキャンセルボタンを押した時の処理
  const handleCancel = () => {
    response.current = false;
    open.current = false;
    reflesh();
  };

  return {
    openConfirmDialog,
    ConfirmDialog: () => (
      <ConfirmDialog
        title={title}
        message={message}
        open={open.current}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    ),
  };
};

// ダイアログのコンポーネント
const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ title, message, open, handleOk, handleCancel }) => {
  return (
    <Dialog open={open}>
      <DialogTitle>{title || "確認"}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message || "よろしいですか？"}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleCancel}>
          キャンセル
        </Button>
        <Button variant="contained" onClick={handleOk}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};
