"use client";
import React from "react";
import { CalendarStylesWrapper } from "../../HRMS/Holidays/CalendarStylesWrapper";
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import interactionPlugin from "@fullcalendar/interaction";
import { useOnlyIcon } from "@/Components/Layout/NavContext";
import dayjs from "dayjs";
import { Box } from "@mui/material";

const CalenderEvent = ({ TeacherRoutine }) => {
  console.log("TeacherRoutine", TeacherRoutine);
  const calendarRef = React.createRef();
    const {color, colorX, palette } = useOnlyIcon();

  const events = [];

  for (const day in TeacherRoutine) {
    // Determine the day number corresponding to the current day
    let dayNumber = null;
    switch (day) {
      case "Sunday":
        dayNumber = 0; // Sunday
        break;
      case "Monday":
        dayNumber = 1; // Monday
        break;
      case "Tuesday":
        dayNumber = 2; // Tuesday
        break;
      case "Wednesday":
        dayNumber = 3; // Wednesday
        break;
      case "Thursday":
        dayNumber = 4; // Thursday
        break;
      case "Friday":
        dayNumber = 5; // Friday
        break;
      case "Saturday":
        dayNumber = 6; // Saturday
        break;
    }

    // If the current day matches the day being processed, add events
    if (dayNumber !== null) {
      // Loop through each class period for the day
      TeacherRoutine[day].forEach((period) => {
        const startTime = period.class_period.start_time;
        const endTime = period.class_period.end_time;

        const event = {
          title: `${period.subject ? period.subject.name : "No Subject"} - ${
            period.class_name.name
          }`,
          start: dayjs()
            .day(dayNumber)
            .hour(startTime.split(":")[0])
            .minute(startTime.split(":")[1])
            .toISOString(),
          end: dayjs()
            .day(dayNumber)
            .hour(endTime.split(":")[0])
            .minute(endTime.split(":")[1])
            .toISOString(),
          allDay: false,
        };
        events.push(event);
      });
    }
  }

  const today = dayjs().format("YYYY-MM-DD");

  console.log("events ", events);

  const calendarOptions = {
    events: events,
    plugins: [
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
      bootstrap5Plugin,
      interactionPlugin,
    ],
    initialView: "timeGridWeek",
    views: {
      timeGridFourDay: {
        type: "timeGrid",
        duration: { days: 0.4 },
      },
    },
    slotMinTime: "06:00",
    slotDuration: "00:30:00",
    slotMaxTime: "19:00",
    scrollTime: "06:00",
    headerToolbar: {
      end: "prev, title, next",
      start: "timeGridWeek,timeGridDay,dayGridMonth,listMonth,today",
      toolbarClassNames: "sticky-header",
    },

    ref: calendarRef,
    editable: true,
    selectable: true,
    contentHeight: "auto",
    dayMaxEvents: 2,

    dayCellContent: (arg) => {
      const { dayNumberText } = arg;
      return (
        <>
          <p style={{ color: palette.text.secondary }}>{dayNumberText}</p>
        </>
      );
    },
  };

  return (
    <div>
      <Box
        sx={{
          backgroundColor: palette.customColors.boxBg,
          padding: "20px",
          marginTop: "20px",
        }}
      >
        <Box sx={CalendarStylesWrapper}>
          <FullCalendar {...calendarOptions} />
        </Box>
      </Box>
    </div>
  );
};

export default CalenderEvent;
