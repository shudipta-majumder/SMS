"use client";
import React, { useEffect, useState } from "react";
import { Box, Modal } from "@mui/material";
import CalendarModal from "./CalendarModal";
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import interactionPlugin from "@fullcalendar/interaction";
import { useOnlyIcon } from "@/Components/Layout/NavContext";
import {CalendarStylesWrapper} from "./CalendarStylesWrapper";
import { useCalendarContext } from "./CalendarContext";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const initialEvent = {
  name: "",
  start_date: "",
  end_date: "",
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  p: 4,
};

const blurBackdrop = {
  backdropFilter: "blur(1px)",
  backgroundColor: "transparent",
  zIndex: 500,
  "& .MuiModal-backdrop": {
    backgroundColor: "transparent",
  },
};

const CalendarEvent = ({ accessToken, holidayTypes }) => {
 
    const {color, colorX, palette } = useOnlyIcon();
  const calendarRef = React.createRef();
  const handleOpen = () => setOpen(true);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [eventsData, setEventsData] = useState([]);
  const [updateEvent, setUpdateEvent] = useState(null);
  const [deleteTrigered, setDeleteTrigered] = useState(false);
  const { isCalendarSaved, resetCalendarSaved } = useCalendarContext();
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);

  const renamedEventsKey = eventsData.map(
    ({ name, start_date, end_date, start_time, end_time, type, ...rest }) => ({
      title: name,
      start: start_date + "T" + start_time,
      end: end_date + "T" + end_time,
      startDateValue: start_date,
      endDateValue: end_date,
      startTimeValue: start_time,
      endTimeValue: end_time,
      type: type?.id,
      color: type?.code,
      allDay: false,
      ...rest,
    })
  );

  console.log("eventsData", eventsData);
  console.log("renamedEventsKey", renamedEventsKey);

  //   const hnadleMultipleSelectEvent = (info) => {
  //     console.log('hnadleMultipleSelectEvent', info);
  //   };

  const handlePrevBtn = () => {
    if (calendarRef.current) {
      calendarRef.current.getApi().prev();
    }
    setCurrentMonth((prevMonth) => (prevMonth === 1 ? 12 : prevMonth - 1));
    setCurrentYear((prevYear) =>
      currentMonth === 1 ? prevYear - 1 : prevYear
    );
  };

  const handleNextBtn = () => {
    if (calendarRef.current) {
      calendarRef.current.getApi().next();
    }
    setCurrentMonth((prevMonth) => (prevMonth === 12 ? 1 : prevMonth + 1));
    setCurrentYear((prevYear) =>
      currentMonth === 12 ? prevYear + 1 : prevYear
    );
  };

  //----------->>> Get EventsData <<<------------
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/hrms/api/holiday/list?month=${currentMonth}&year=${currentYear}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const responseData = await response.json();
        if (responseData.code == 200) {
          setEventsData(responseData?.data);
          resetCalendarSaved();
          setDeleteTrigered(false);
          setIsLoading(false);
        } else if (responseData.code === 400) {
          toast.error(`already exists`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else if (responseData.code === 401) {
          toast.error("Permission denied", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } catch (error) {
        setError("Network response was not ok!");
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [currentMonth, currentYear, isCalendarSaved, deleteTrigered]);

  const formatDateTime = (dateVal) => {
    //format date + add next date
    let dateObj = new Date(dateVal);
    dateObj.setDate(dateObj.getDate() + 1);
    const formattedResult = dateObj.toISOString().split("T")[0];
    return formattedResult;
  };
  const formatDateTime2 = (dateVal) => {
    //only format date
    let dateObj = new Date(dateVal);
    const formattedResult = dateObj.toISOString().split("T")[0];
    return formattedResult;
  };

  //----------->>> Drag&Drop PUT <<<------------
  const handleDragAndDropDataUpdate = async (info) => {
    let dataToSend;
    if (info?.event?.extendedProps?.type === 1) {
      //holiday
      dataToSend = {
        id: info?.event?.id,
        name: info?.event?.title,
        type: info?.event?.extendedProps?.type,
        start_date: formatDateTime(info?.event?.startStr),
        end_date: info?.event?.endStr
          ? formatDateTime2(info?.event?.endStr)
          : formatDateTime(info?.event?.startStr),
        start_time: "00:00:00",
        end_time: "23:59:59",
      };
    } else {
      //event
      dataToSend = {
        id: info?.event?.id,
        name: info?.event?.title,
        type: info?.event?.extendedProps?.type,
        start_date: formatDateTime2(info?.event?.startStr),
        end_date: info?.event?.endStr
          ? formatDateTime2(info?.event?.endStr)
          : formatDateTime2(info?.event?.startStr),
        start_time: info?.event?.extendedProps?.startTimeValue,
        end_time: info?.event?.extendedProps?.endTimeValue,
      };
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/hrms/api/holiday/detail/${info?.event?.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );

      const responseData = await response.json();
      if (responseData.code === 200) {
        toast.success(responseData?.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (responseData.code === 400) {
        toast.error(`already exists`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (responseData.code === 401) {
        toast.error("Permission denied", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {}
  };

  //----------->>> Delete <<<------------
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/hrms/api/holiday/delete/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = await response.json();
      if (responseData.code === 200) {
        handleClose();
        const filterdData = eventsData.filter((event) => event.id !== id);
        setEventsData(filterdData);
        setDeleteTrigered(true);
        toast.success(responseData?.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (responseData.code === 400) {
        toast.error(`already exists`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (responseData.code === 401) {
        toast.error("Permission denied", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {}
  };

  const calendarOptions = {
    events: renamedEventsKey,
    plugins: [
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
      bootstrap5Plugin,
      interactionPlugin,
    ],
    initialView: "dayGridMonth",
    headerToolbar: {
      start: "prev, next, title",
      end: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
    },

    ref: calendarRef,
    customButtons: {
      prev: {
        click: handlePrevBtn,
      },
      next: {
        click: handleNextBtn,
      },
    },

    // eventResizableFromStart: true,
    // dragScroll: true,
    // navLinks: true,
    editable: true,
    selectable: true,
    contentHeight: "auto",
    // height: 800,
    dayMaxEvents: 2,
    //select: hnadleMultipleSelectEvent,
    eventDrop: handleDragAndDropDataUpdate,
    // color: "white",

    eventClick({ event: clickedEvent }) {
      handleClickedEvent(clickedEvent);
    },

    dateClick(info) {
      console.log("dateClick(info)", info);
      const event = { ...initialEvent };
      event.start_date = info.dateStr;
      event.end_date = info.dateStr;
      handleClickedEvent(event);
    },

    dayCellContent: (arg) => {
      const { dayNumberText } = arg;
      return (
        <>
          <p style={{ color: palette.text.secondary }}>{dayNumberText}</p>
        </>
      );
    },
  };

  const handleClickedEvent = (data) => {
    //startStr, endStr for update data
    //start_date, end_date for create data
    console.log("handleClickedEvent", data);

    let endDate;
    if (data.endStr === "") {
      endDate = data.startStr;
    } else {
      endDate = data.end_date;
    }

    if (data?.extendedProps?.type === 1) {
      //holiday
      const dataToUpdate = {
        id: data.id,
        name: data.title,
        type: data?.extendedProps?.type,
        start_date: data.start_date
          ? data.start_date
          : data.extendedProps.startDateValue,
        end_date: data.end_date
          ? data.end_date
          : data.extendedProps.endDateValue,
      };
      setUpdateEvent(dataToUpdate);
    } else {
      //event
      const dataToUpdate = {
        id: data.id,
        name: data.title,
        type: data?.extendedProps?.type,
        start_time: data?.extendedProps?.startTimeValue,
        end_time: data?.extendedProps?.endTimeValue,
        start_date: data.start_date
          ? data.start_date
          : data.extendedProps.startDateValue,
        end_date: data.end_date
          ? data.end_date
          : data.extendedProps.endDateValue,
      };
      setUpdateEvent(dataToUpdate);
    }

    handleOpen();
  };

  return (
    <section>
      <Box
        sx={{
          backgroundColor: palette.customColors.boxBg,
          padding: "20px",
          marginTop: "20px",
        }}
      >
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            <>
              <Box sx={CalendarStylesWrapper}>
                <FullCalendar {...calendarOptions} />
              </Box>
              <Modal
                open={open}
                onClose={handleClose}
                className={blurBackdrop}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <CalendarModal
                    updateEvent={updateEvent}
                    holidayTypes={holidayTypes}
                    accessToken={accessToken}
                    handleClose={handleClose}
                    handleDelete={handleDelete}
                  />
                </Box>
              </Modal>
            </>
          </>
        )}
      </Box>
    </section>
  );
};

export default CalendarEvent;
