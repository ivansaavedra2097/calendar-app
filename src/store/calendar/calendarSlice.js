import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

const tempEvent = {
  _id: "fasdrfasdr",
  title: "my wedding",
  notes: "buy the ring",
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: "#fafafa",
  user: {
    _id: "asdf3332",
    name: "Ivan",
  },
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    events: [tempEvent],
    activeEvent: null,
  },
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
        state.activeEvent = payload
    },
  },
});

export const { onSetActiveEvent } = calendarSlice.actions;
