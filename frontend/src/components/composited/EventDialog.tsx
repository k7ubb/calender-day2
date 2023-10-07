import React, { Dispatch, useCallback } from "react";
import { Box, Dialog, DialogContent } from "@mui/material";
import { CustomIconButton } from "components/base/CustomIconButton";
import EditForm from "components/composited/EditForm";
import EventDetails from "components/composited/EventDetails";
import { useComfirmDialog } from "hooks/useConfirmDialog";
import { deleteEvent, saveEvent } from "helpers/eventLogics";
import { EventInfoType, AlertInfo, NewEventInfoType, UpdateEditingEvent } from "types/type";
import "style.css";

type EventDialogProps = {
  open: "edit" | "detail" | "close"; // ダイアログを開くかどうかのフラグ
  setDialogOpenStatus: (open: "edit" | "detail" | "close") => void;
  editingEventInfo: EventInfoType | NewEventInfoType; // 編集中のイベント
  handleCloseDialog: (refresh?: boolean) => void;
  dispatchDialogEventInfo: Dispatch<UpdateEditingEvent>;
  setAlertInfo: (value: AlertInfo | null) => void;
};

// モーダルの画面のコンポーネント
const EventDialog: React.FC<EventDialogProps> = ({
  open,
  setDialogOpenStatus,
  editingEventInfo,
  handleCloseDialog,
  dispatchDialogEventInfo,
  setAlertInfo,
}) => {
  const { openConfirmDialog, ConfirmDialog } = useComfirmDialog();

  // 編集ボタンを押した時の処理
  const handleEdit = useCallback(() => {
    setDialogOpenStatus("edit");
  }, [setDialogOpenStatus]);

  // 削除ボタンを押した時の処理
  const handleDelete = useCallback(async () => {
    if (!editingEventInfo?.id) return;
    if (!(await openConfirmDialog("確認", "イベントを削除しますか？"))) return;
    if (await deleteEvent(editingEventInfo.id)) {
      setAlertInfo({
        status: "success",
        message: "イベントを削除しました",
      });
      handleCloseDialog(true);
    } else {
      setAlertInfo({
        status: "error",
        message: "イベントの削除に失敗しました",
      });
    }
  }, [editingEventInfo, handleCloseDialog, setAlertInfo]);

  // 編集後のイベントを保存する
  const handleSave = useCallback(
    async (refresh: boolean = false) => {
      await saveEvent(editingEventInfo); // TODO
      handleCloseDialog(refresh);
      setAlertInfo({
        status: "success",
        message: "イベントを保存しました",
      });
    },
    [editingEventInfo, handleCloseDialog, setAlertInfo]
  );

  return (
    <>
      <ConfirmDialog />
      <Dialog open={open === "edit" || open === "detail"} onClose={() => handleCloseDialog()}>
        <Box className="dialog-header">
          {open === "detail" && (
            <>
              <CustomIconButton icon="edit" onClick={handleEdit} />
              <CustomIconButton icon="delete" onClick={handleDelete} />
            </>
          )}
          <CustomIconButton
            icon="close"
            onClick={() => {
              handleCloseDialog();
            }}
          />
        </Box>
        {/* openの状態によって表示するコンポーネントを切り替える */}
        <DialogContent style={{ paddingTop: "5px" }}>
          <Box
            component={open === "edit" ? "form" : "div"}
            width={300}
            sx={{ display: "grid", gridTemplateColumns: { sm: "1fr" }, gap: 2 }}
          >
            {open === "edit" ? (
              <EditForm
                eventInfo={editingEventInfo}
                handleSave={handleSave}
                dispatchDialogEventInfo={dispatchDialogEventInfo}
              />
            ) : (
              <EventDetails eventInfo={editingEventInfo} />
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EventDialog;
