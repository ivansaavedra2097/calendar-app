import { useCalendarStore } from "../../hooks"

export const FabDelete = () => {

    const { startDeletingEvent } = useCalendarStore()

    const handleClick = () => startDeletingEvent()

    return (
        <button
            className="btn btn-danger fab-danger"
            onClick={handleClick}
        >
            <i className="fas fa-trash-alt"></i>
        </button>
    )
}
