import React from "react";
import { Box, DialogContentText, DialogTitle, Grid } from "@mui/material";
import { getFormatedDate, getFormatedDateTime } from "helpers/dateHelpers";
import { EventInfoType, NewEventInfoType } from "types/type";

type EventDetailsProps = {
  eventInfo: EventInfoType | NewEventInfoType;
};

// イベントの詳細を表示するコンポーネント
const EventDetails: React.FC<EventDetailsProps> = ({ eventInfo }) => {
  return (
    <>
      <Grid container alignItems="center">
        <Box
          sx={{
            width: "1.2rem",
            height: "1.2rem",
            backgroundColor: eventInfo.color!,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        ></Box>
        <DialogTitle style={{ padding: "0px 10px" }}>{eventInfo.title}</DialogTitle>
      </Grid>
      {eventInfo.end && eventInfo.end.toString() !== "Invalid Date" ? (
        <>
          <DialogContentText>開始時刻: {getFormatedDateTime(eventInfo.start)}</DialogContentText>
          <DialogContentText>終了時刻: {getFormatedDateTime(eventInfo.end)}</DialogContentText>
        </>
      ) : (
        <DialogContentText>{getFormatedDate(eventInfo.start)}</DialogContentText>
      )}
      <DialogContentText>{eventInfo.className}</DialogContentText>
    </>
  );
};

export default EventDetails;
