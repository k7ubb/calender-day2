import React, { useEffect, useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import { AlertInfo } from "types/type";

type CustomAlertProps = {
  alertInfo: AlertInfo | null;
};

export const CustomAlert: React.FC<CustomAlertProps> = ({ alertInfo }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (alertInfo) {
      setOpen(true);
      const timeout = setTimeout(() => {
        setOpen(false);
      }, 1500);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [alertInfo]);

  return (
    <Snackbar open={open}>
      <Alert severity={alertInfo?.status}>{alertInfo?.message}</Alert>
    </Snackbar>
  );
};
