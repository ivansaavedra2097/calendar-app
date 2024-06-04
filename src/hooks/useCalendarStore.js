import { useDispatch, useSelector } from "react-redux";
import { onSetActiveEvent, onAddNewEvent, calendarSlice, onUpdateEvent } from "../store";

export const useCalendarStore = () => {
  const dispatch = useDispatch();

  const { events, activeEvent } = useSelector((state) => state.calendar);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    // TODO LLEGAR AL BACKEND
    if (calendarEvent._id) {
      // actualizando
      dispatch(
        onUpdateEvent({ ...calendarEvent })
      );
    } else {
      // creando
      dispatch(
        onAddNewEvent({
          ...calendarEvent,
          _id: new Date().getTime(),
        })
      );
    }
  };

  return {
    events,
    activeEvent,
    setActiveEvent,
    startSavingEvent
  };
};
