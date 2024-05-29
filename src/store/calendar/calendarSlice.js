import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvent = {
    title: 'my wedding',
    notes: 'buy the ring',
    start: new Date(),
    end: addHours( new Date(), 2),
    bgColor: '#fafafa',
    user: {
      _id: 'asdf3332',
      name: 'Ivan'
    }
  }

export const calendarSlice = createSlice({
   name: 'calendar',
   initialState: {
    events: [tempEvent],
    activeEvent: null
   },
   reducers: {
    sayHello: () => {
        console.log('hello')
    }
   }
});

export const {sayHello } = calendarSlice.actions;