import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    let auth;
    const user = JSON.parse(localStorage.getItem("user"))
    if (user && user.currentUser === 'admin') {
        auth = { 'token': true }
    }
    else {
        auth = { 'token': false }
    }
    return (<>
        {auth && auth.token ? <Outlet /> : <Navigate to="/login" />}
    </>
    )
}

export default PrivateRoutes;