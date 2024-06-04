import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

// import { addHours } from 'date-fns'

import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from "../"
import { getMessagesEs, localizer } from '../../helpers'
import { useState } from 'react'
import { useUiStore, useCalendarStore } from '../../hooks'

// const events = [{
//   title: 'my wedding',
//   notes: 'buy the ring',
//   start: new Date(),
//   end: addHours( new Date(), 2),
//   bgColor: '#fafafa',
//   user: {
//     _id: 'asdf3332',
//     name: 'Ivan'
//   }
// }]

export const CalendarPage = () => {

  const [ lastView, setLastView ] = useState(localStorage.getItem('lastView')||'week')
  const { openDateModal } = useUiStore()
  const { events, setActiveEvent } = useCalendarStore()
  const eventStyleGetter = ( event, start, end, isSelected ) => {
    // console.log({event, start, end, isSelected})
    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity:0.8,
      color: 'white'
    }
    return {
      style
    }
  }

  const onDoubleClick = () => openDateModal()

  const onSelect = ( event ) => {
    setActiveEvent(event)
  }

  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event)
    setLastView(event)
  }

  return (
    <>
      <Navbar />
      <Calendar
        culture='es'
        localizer={ localizer }
        events={ events }
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        messages={getMessagesEs()}
        eventPropGetter={ eventStyleGetter }
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChanged }
      />
      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  )
}
