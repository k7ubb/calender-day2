import React from "react";
import logo from "assets/calendar_icon.svg";
import Box from "@mui/material/Box";

const CalendarLogo: React.FC = () => {
  return (
    <Box className="calendar-logo">
      <img src={logo} alt="Calendar Logo" />
    </Box>
  );
};

export default CalendarLogo;
