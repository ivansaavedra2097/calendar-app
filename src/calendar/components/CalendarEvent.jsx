export const CalendarEvent = ({ event }) => {
    const { end, start, user,title,notes, bgColor } = event



    return (
        <>
            <strong>{ title }</strong>
            <span>-{ user.name }</span>        
        </>
    )
}
