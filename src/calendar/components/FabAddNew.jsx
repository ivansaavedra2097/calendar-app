import { addHours } from "date-fns"
import { useCalendarStore, useUiStore } from "../../hooks"

export const FabAddNew = () => {

  const { openDateModal } = useUiStore()

  const { setActiveEvent } = useCalendarStore()

  const onHandleClick = () => {
    setActiveEvent({
      title: 'Hola',
      notes: 'Mundo',
      start: new Date(),
      end: addHours( new Date(), 2 ),
      bgColor: '#fafafa',
      user: {
        _id: '123fasdf',
        name: "CaraPerro"
      }
    })
    openDateModal()
  }

  return (
    <button 
        className="btn btn-primary fab"
        onClick={onHandleClick}
    >
        <i className="fas fa-plus"></i>
    </button>
  )
}
