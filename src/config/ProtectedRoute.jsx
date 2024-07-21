import React, { useContext } from 'react';
import { Navigate, Outlet ,useNavigate} from 'react-router-dom';
import Context from './context';


const ProtectedRoute = () => {
    const navigate=useNavigate()
    const data=useContext(Context)
    console.log(data)
    return data.isLogged ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;