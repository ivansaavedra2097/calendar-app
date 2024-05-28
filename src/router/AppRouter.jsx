import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom"
import { LoginPage } from "../auth"
import { CalendarPage } from "../calendar"

const publicRouter = createBrowserRouter([
    {
        path: 'auth/login',
        element: <LoginPage />
    },
    {
        path: '*',
        element: <Navigate to={'/auth/login'} />
    }
])

const privateRouter = createBrowserRouter([
    {
        path: '/',
        element: <CalendarPage />
    },
    {
        path: '*',
        element: <Navigate to={'/'} />
    }
])

export const AppRouter = () => {

    const authStatus = 'not-authenticate'

    return (
        <>
            <RouterProvider router={
                authStatus === 'not-authenticated'
                ? publicRouter
                : privateRouter
            } />
        </>

    )
}
