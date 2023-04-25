import React from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

function CustomAlert(props: AlertProps) {
  return (
    <MuiAlert
      elevation={6}
      variant="filled"
      {...props}
      sx={{
        backgroundColor:
          props.severity === "success" ? "#4caf50" : "#f44336",
      }}
    />
  );
}

export default CustomAlert;
