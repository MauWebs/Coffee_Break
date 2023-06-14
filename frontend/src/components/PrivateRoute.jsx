import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute() {

    const userLogin = useSelector(state => state.userLogin);
    
    const { userInfo } = userLogin;

    return (
        userInfo ? <Outlet/> : <Navigate to='/home'/>
    );

};

export default PrivateRoute;