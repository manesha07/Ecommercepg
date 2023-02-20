import { Outlet, Navigate } from 'react-router-dom'

const PrivateUserRoutes = () => {
    let auth;
    const user = JSON.parse(localStorage.getItem("user"))
    if (user && user.currentUser === 'user') {
        auth = { 'token': true }
    }
    else {
        auth = { 'token': false }
    }
    return (<>
        {auth && auth.token ? <Outlet /> : <Navigate to="/userLogin" />}
    </>
    )
}

export default PrivateUserRoutes;