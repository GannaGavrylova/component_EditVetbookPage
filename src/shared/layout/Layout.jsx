import { Outlet } from 'react-router-dom'
import classes from './Layout.module.css'

export const Layout = () => {
    return (
        <main className={classes.box}>
            <Outlet />
        </main>
    )
}

